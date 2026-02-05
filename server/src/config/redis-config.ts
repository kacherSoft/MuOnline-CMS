/**
 * Redis Configuration
 * Redis connection settings for chat state and caching
 */

import dotenv from 'dotenv';
dotenv.config();

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || '',
  // TTL values in seconds
  ttl: {
    serverStatus: 10,        // Server status cache
    chatHistory: 3600,        // Chat messages (1 hour)
    userSessions: 86400,      // User sessions (24 hours)
    characterData: 300,       // Character data (5 minutes)
    onlineUsers: 60,          // Online users list (1 minute)
  },
} as const;

export default redisConfig;
