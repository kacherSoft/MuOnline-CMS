/**
 * HTTP Server Entry Point
 * Starts the Express server on configured port
 */

import './config/env-validation.js'; // Validate environment variables first
import { app } from './express-app.js';
import { appConfig } from './config/app-config.js';
import { logger } from './utils/winston-logger.js';

// Start HTTP server
const server = app.listen(appConfig.port, () => {
  logger.info(`╔══════════════════════════════════════════════════════════╗`);
  logger.info(`║  MuOnline CMS Server - Chat-First Architecture           ║`);
  logger.info(`╠══════════════════════════════════════════════════════════╣`);
  logger.info(`║  Environment: ${appConfig.nodeEnv.padEnd(48)}║`);
  logger.info(`║  Port: ${appConfig.port.toString().padEnd(53)}║`);
  logger.info(`║  Health: http://localhost:${appConfig.port}/health${' '.repeat(23)}║`);
  logger.info(`╚══════════════════════════════════════════════════════════╝`);
});

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================

const gracefulShutdown = (signal: string) => {
  logger.info(`⚠️  ${signal} received, shutting down gracefully...`);

  server.close(() => {
    logger.info('✅ HTTP server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

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
