/**
 * Ranking Cache Layer
 * Redis caching for ranking data with TTL management
 */

import { createClient } from 'redis';
import { logger } from '../utils/winston-logger.js';

// Cache configuration
const CACHE_TTL = 300; // 5 minutes in seconds
const REFRESH_INTERVAL = 120; // 2 minutes in seconds

// Redis client
let redisClient: ReturnType<typeof createClient> | null = null;
let isConnected = false;

// Cache statistics
const cacheStats = {
  hits: 0,
  misses: 0,
};

/**
 * Initialize Redis connection
 */
export const initRedisCache = async (): Promise<void> => {
  if (redisClient && isConnected) {
    return;
  }

  try {
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });

    redisClient.on('error', (err: unknown) => {
      logger.error('Redis Client Error:', err);
      isConnected = false;
    });

    redisClient.on('connect', () => {
      logger.info('Redis client connected');
      isConnected = true;
    });

    redisClient.on('disconnect', () => {
      logger.warn('Redis client disconnected');
      isConnected = false;
    });

    await redisClient.connect();
    logger.info('✅ Redis cache initialized');
  } catch (error) {
    logger.error('❌ Failed to initialize Redis cache:', error);
    redisClient = null;
    isConnected = false;
  }
};

/**
 * Close Redis connection gracefully
 */
export const closeRedisCache = async (): Promise<void> => {
  if (redisClient && isConnected) {
    await redisClient.quit();
    redisClient = null;
    isConnected = false;
    logger.info('✅ Redis cache closed');
  }
};

/**
 * Get cached data
 */
export const getCachedData = async <T>(key: string): Promise<T | null> => {
  if (!redisClient || !isConnected) {
    return null;
  }

  try {
    const data = await redisClient.get(key);
    if (data) {
      cacheStats.hits++;
      return JSON.parse(data) as T;
    }
    cacheStats.misses++;
    return null;
  } catch (error) {
    logger.error(`Cache get error for key ${key}:`, error);
    cacheStats.misses++;
    return null;
  }
};

/**
 * Set cached data with TTL
 */
export const setCachedData = async <T>(key: string, data: T, ttl: number = CACHE_TTL): Promise<void> => {
  if (!redisClient || !isConnected) {
    return;
  }

  try {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
  } catch (error) {
    logger.error(`Cache set error for key ${key}:`, error);
  }
};

/**
 * Delete cached data
 */
export const deleteCachedData = async (key: string): Promise<void> => {
  if (!redisClient || !isConnected) {
    return;
  }

  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error(`Cache delete error for key ${key}:`, error);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = (): { hits: number; misses: number; hitRate: number } => {
  const total = cacheStats.hits + cacheStats.misses;
  return {
    hits: cacheStats.hits,
    misses: cacheStats.misses,
    hitRate: total > 0 ? (cacheStats.hits / total) * 100 : 0,
  };
};

/**
 * Reset cache statistics
 */
export const resetCacheStats = (): void => {
  cacheStats.hits = 0;
  cacheStats.misses = 0;
};

/**
 * Cache key generators
 */
export const CacheKeys = {
  individual: (limit: number = 100) => `rankings:individual:top${limit}`,
  guild: (limit: number = 100) => `rankings:guild:top${limit}`,
  pvp: (limit: number = 100) => `rankings:pvp:top${limit}`,
};

export default {
  initRedisCache,
  closeRedisCache,
  getCachedData,
  setCachedData,
  deleteCachedData,
  getCacheStats,
  resetCacheStats,
  CacheKeys,
};
