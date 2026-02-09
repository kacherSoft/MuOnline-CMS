/**
 * Socket Middleware
 * JWT authentication middleware for Socket.io connections
 */

import type { Socket } from 'socket.io';
import type { SocketAuthData } from '../types/socket-events.js';
import { logger } from '../utils/winston-logger.js';
import { TokenService } from '../services/jwt-token-service.js';


/**
 * Extract and verify JWT token from socket handshake
 */
export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    let authData: SocketAuthData;

    try {
      const decoded = TokenService.verifyAccessToken(token);
      if (!decoded.accountId || !decoded.username) {
        return next(new Error('Authentication error: Malformed token payload'));
      }
      authData = {
        accountId: decoded.accountId,
        username: decoded.username,
      };
    } catch (parseError) {
      return next(new Error('Authentication error: Invalid token'));
    }

    socket.data.user = authData;

    logger.info(`Socket authenticated: ${authData.username} (${authData.accountId})`);
    next();
  } catch (error) {
    logger.error('Socket authentication error:', error);
    next(new Error('Authentication error'));
  }
};

/**
 * Rate limiting middleware for chat messages
 * Uses in-memory map to track message counts per user
 */
const messageCountMap = new Map<number, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_MESSAGES_PER_MINUTE = 10;

export const chatRateLimitMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const userId = socket.data.user?.accountId;

  if (!userId) {
    return next(new Error('Authentication required'));
  }

  const now = Date.now();
  const userLimit = messageCountMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize counter
    messageCountMap.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return next();
  }

  if (userLimit.count >= MAX_MESSAGES_PER_MINUTE) {
    return next(new Error('Rate limit exceeded: Please wait before sending more messages'));
  }

  userLimit.count++;
  next();
};

/**
 * Clean up expired rate limit entries (run periodically)
 */
export function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [userId, data] of messageCountMap.entries()) {
    if (now > data.resetTime) {
      messageCountMap.delete(userId);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitMap, 5 * 60 * 1000);
}
