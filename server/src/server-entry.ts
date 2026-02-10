/**
 * HTTP Server Entry Point
 * Starts the Express server on configured port
 */

import './config/env-validation.js'; // Validate environment variables first
import { app } from './express-app.js';
import { appConfig } from './config/app-config.js';
import { logger } from './utils/winston-logger.js';
import { initRankingRefreshJob } from './jobs/ranking-refresh-job.js';
import { initSocketServer } from './socket/socket-server.js';
import { createRedisClient } from './lib/redis-client.js';
import { runMigrations } from './lib/auto-migrate.js';

// Start HTTP server
const server = app.listen(appConfig.port, async () => {
  logger.info(`╔══════════════════════════════════════════════════════════╗`);
  logger.info(`║  MuOnline CMS Server - Chat-First Architecture           ║`);
  logger.info(`╠══════════════════════════════════════════════════════════╣`);
  logger.info(`║  Environment: ${appConfig.nodeEnv.padEnd(48)}║`);
  logger.info(`║  Port: ${appConfig.port.toString().padEnd(53)}║`);
  logger.info(`║  Health: http://localhost:${appConfig.port}/health${' '.repeat(23)}║`);
  logger.info(`╚══════════════════════════════════════════════════════════╝`);

  // Run database migrations
  try {
    await runMigrations();
  } catch (error) {
    logger.error('Failed to run migrations:', error);
  }

  // Initialize ranking refresh job
  try {
    await initRankingRefreshJob();
  } catch (error) {
    logger.error('Failed to initialize ranking refresh job:', error);
  }

  // Initialize Socket.io server
  try {
    await initSocketServer(server);
    logger.info('Socket.io server initialized');
  } catch (error) {
    logger.error('Failed to initialize Socket.io server:', error);
  }

  // Initialize Redis client for general use
  try {
    await createRedisClient();
    logger.info('Redis client initialized');
  } catch (error) {
    logger.warn('Redis client initialization failed (continuing without Redis):', error);
  }
});

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================

const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully...`);

  // Stop accepting new connections
  server.close(async () => {
    try {
      // Stop ranking refresh job
      const { stopRankingRefreshJob } = await import('./jobs/ranking-refresh-job.js');
      stopRankingRefreshJob();

      // Close Socket.io
      const { getSocketServer } = await import('./socket/socket-server.js');
      const socketServer = getSocketServer();
      if (socketServer) {
        socketServer.close();
      }

      // Close MySQL pool
      const { closeConnectionPool } = await import('./lib/mysql-connection-pool.js');
      await closeConnectionPool();

      // Close Redis client
      const { disconnectRedisClient } = await import('./lib/redis-client.js');
      await disconnectRedisClient();

      logger.info('All resources closed, exiting');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => { gracefulShutdown('SIGTERM'); });
process.on('SIGINT', () => { gracefulShutdown('SIGINT'); });

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

export default server;
