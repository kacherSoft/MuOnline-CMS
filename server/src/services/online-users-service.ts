import type { OnlineUser } from '../types/socket-events.js';
import { createRedisClient } from '../lib/redis-client.js';
import { logger } from '../utils/winston-logger.js';

let redisClient: Awaited<ReturnType<typeof createRedisClient>> | null = null;
let inMemoryUsers = new Map<number, OnlineUser>();
let redisAvailable = false;

export async function initOnlineUsersService() {
  try {
    redisClient = await createRedisClient();
    redisAvailable = true;
    logger.info('Online users service: Redis connected');
  } catch (error) {
    logger.warn('Online users service: Redis unavailable, using in-memory fallback', error);
    redisAvailable = false;
  }
}

export async function addOnlineUser(user: OnlineUser): Promise<void> {
  try {
    if (redisAvailable && redisClient) {
      const key = getOnlineUsersKey();
      await redisClient.hSet(key, String(user.accountId), JSON.stringify(user));
      await redisClient.expire(key, 300);
    } else {
      inMemoryUsers.set(user.accountId, user);
    }
    logger.debug(`User added to online list: ${user.characterName || user.accountId}`);
  } catch (error) {
    logger.error('Error adding online user:', error);
    inMemoryUsers.set(user.accountId, user);
  }
}

export async function removeOnlineUser(socketId: string, accountId?: number): Promise<void> {
  try {
    if (redisAvailable && redisClient) {
      const key = getOnlineUsersKey();
      if (accountId) {
        const existing = await redisClient.hGet(key, String(accountId));
        if (existing) {
          try {
            const parsed = JSON.parse(existing) as OnlineUser;
            if (parsed.socketId === socketId) {
              await redisClient.hDel(key, String(accountId));
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } else {
      if (accountId) {
        const existing = inMemoryUsers.get(accountId);
        if (existing && existing.socketId === socketId) {
          inMemoryUsers.delete(accountId);
        }
      }
    }
    logger.debug(`User removed from online list: ${socketId}`);
  } catch (error) {
    logger.error('Error removing online user:', error);
    if (accountId) {
      const existing = inMemoryUsers.get(accountId);
      if (existing && existing.socketId === socketId) {
        inMemoryUsers.delete(accountId);
      }
    }
  }
}

export async function getOnlineUsers(): Promise<OnlineUser[]> {
  try {
    if (redisAvailable && redisClient) {
      const key = getOnlineUsersKey();
      const data = await redisClient.hGetAll(key);
      return Object.values(data).map((json: unknown) => {
        try {
          return JSON.parse(json as string) as OnlineUser;
        } catch {
          return null;
        }
      }).filter((user): user is OnlineUser => user !== null);
    } else {
      return Array.from(inMemoryUsers.values());
    }
  } catch (error) {
    logger.error('Error getting online users:', error);
    return Array.from(inMemoryUsers.values());
  }
}

export async function getOnlineUserCount(): Promise<number> {
  try {
    if (redisAvailable && redisClient) {
      const key = getOnlineUsersKey();
      return await redisClient.hLen(key);
    } else {
      return inMemoryUsers.size;
    }
  } catch (error) {
    logger.error('Error getting online user count:', error);
    return inMemoryUsers.size;
  }
}

export async function isUserOnline(accountId: number): Promise<boolean> {
  try {
    if (redisAvailable && redisClient) {
      const key = getOnlineUsersKey();
      const exists = await redisClient.hExists(key, String(accountId));
      return Boolean(exists);
    } else {
      return inMemoryUsers.has(accountId);
    }
  } catch (error) {
    logger.error('Error checking if user is online:', error);
    return false;
  }
}

function getOnlineUsersKey(): string {
  return 'chat:online-users';
}
