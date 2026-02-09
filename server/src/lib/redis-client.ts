/**
 * Redis Client
 * Singleton Redis client with connection management
 */

import { createClient } from 'redis';
import { redisConfig } from '../config/redis-config.js';
import { logger } from '../utils/winston-logger.js';

// =====================================================
// CLIENT SINGLETON
// =====================================================

let client: ReturnType<typeof createClient> | null = null;
let isConnected = false;

// =====================================================
// PUBLIC FUNCTIONS
// =====================================================

/**
 * Get or create Redis client
 */
export async function createRedisClient() {
  if (client && isConnected) {
    return client;
  }

  client = createClient({
    socket: {
      host: redisConfig.host,
      port: redisConfig.port,
    },
    password: redisConfig.password || undefined,
  });

  client.on('error', (error: unknown) => {
    logger.error('Redis Client Error:', error);
    isConnected = false;
  });

  client.on('connect', () => {
    logger.info('Redis Client Connected');
    isConnected = true;
  });

  client.on('disconnect', () => {
    logger.warn('Redis Client Disconnected');
    isConnected = false;
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    isConnected = false;
    throw error;
  }
}

/**
 * Disconnect Redis client
 */
export async function disconnectRedisClient() {
  if (client) {
    await client.quit();
    client = null;
    isConnected = false;
    logger.info('Redis Client Disconnected');
  }
}

/**
 * Check if Redis is connected
 */
export function isRedisConnected(): boolean {
  return isConnected && client !== null;
}

/**
 * Get Redis client instance (without connecting)
 */
export function getRedisClient() {
  return client;
}
