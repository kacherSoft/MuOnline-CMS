/**
 * Socket Server Setup
 * Initialize Socket.io with Redis adapter for multi-server scaling
 */

import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from '../types/socket-events.js';
import { appConfig } from '../config/app-config.js';
import { logger } from '../utils/winston-logger.js';
import { socketAuthMiddleware } from './socket-middleware.js';
import { registerChatHandlers } from './socket-handler.js';
import { initOnlineUsersService } from '../services/online-users-service.js';

// =====================================================
// TYPES
// =====================================================

export type ChatSocketServer = SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

// =====================================================
// SERVER SINGLETON
// =====================================================

let io: ChatSocketServer | null = null;

// =====================================================
// PUBLIC FUNCTIONS
// =====================================================

/**
 * Initialize Socket.io server with Redis adapter
 */
export async function initSocketServer(httpServer: HttpServer): Promise<ChatSocketServer> {
  if (io) {
    return io;
  }

  // Initialize online users service (non-fatal - falls back to in-memory)
  try {
    await initOnlineUsersService();
  } catch (error) {
    logger.warn('Online users service initialization failed, using in-memory fallback:', error);
  }

  // Create Socket.io server
  io = new SocketIOServer(httpServer, {
    path: '/socket.io',
    cors: {
      origin: (origin, callback) => {
        if (!origin || appConfig.corsOrigin === '*' || origin === appConfig.corsOrigin || origin.startsWith('http://localhost')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Setup Redis adapter for multi-server scaling
  try {
    const pubClient = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });

    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    logger.info('Socket.io Redis adapter connected');
  } catch (error) {
    logger.warn('Socket.io Redis adapter failed, running in single-server mode:', error);
  }

  // Apply authentication middleware
  io.use(socketAuthMiddleware);

  // Handle connections
  io.on('connection', (socket) => {
    const user = socket.data.user;

    if (!user) {
      socket.disconnect();
      return;
    }

    logger.info(`Socket connected: ${socket.id} (User: ${user.username})`);

    // Register chat event handlers
    registerChatHandlers(io as ChatSocketServer, socket);

    socket.on('disconnect', async (reason) => {
      logger.info(`Socket disconnected: ${socket.id} (Reason: ${reason})`);

      const { removeOnlineUser } = await import('../services/online-users-service.js');
      await removeOnlineUser(socket.id, user.accountId);

      const { getOnlineUserCount, getOnlineUsers } = await import('../services/online-users-service.js');
      const count = await getOnlineUserCount();
      io?.emit('chat:online-count', count);

      const users = await getOnlineUsers();
      io?.emit('chat:online-users', users);
    });
  });

  logger.info('Socket.io server initialized');
  return io;
}

/**
 * Get Socket.io server instance
 */
export function getSocketServer(): ChatSocketServer | null {
  return io;
}

/**
 * Get current socket connections count
 */
export function getSocketCount(): number {
  return io?.sockets.sockets.size || 0;
}
