/**
 * Rate Limit Middleware
 * Rate limiting to prevent abuse and brute force attacks
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from './error-handler-middleware.js';
import { logger } from '../utils/winston-logger.js';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitStore {
  [key: string]: RateLimitEntry;
}

// In-memory rate limit stores (consider Redis for production)
const stores = new Map<string, RateLimitStore>();
const CLEANUP_INTERVAL_MS = 60 * 1000; // Clean up expired entries every minute

/**
 * Clean up expired rate limit entries across all stores
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [storeKey, store] of stores.entries()) {
    for (const [key, entry] of Object.entries(store)) {
      if (now > entry.resetTime) {
        delete store[key];
      }
    }
  }
}

// Run cleanup periodically
setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL_MS);

/**
 * Generic rate limiter factory function
 */
function createRateLimiter(maxAttempts: number, windowMs: number, identifier: string) {
  // Get or create store for this limiter
  let store = stores.get(identifier);
  if (!store) {
    store = {};
    stores.set(identifier, store);
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Check existing attempts
    const attempt = store[ip];

    if (!attempt || now > attempt.resetTime) {
      // First attempt or window expired - reset counter
      store[ip] = {
        count: 1,
        resetTime: now + windowMs,
      };

      logger.debug(`${identifier} attempt ${1}/${maxAttempts} from IP: ${ip}`);
      return next();
    }

    // Increment counter
    attempt.count++;

    if (attempt.count > maxAttempts) {
      const waitMinutes = Math.ceil((attempt.resetTime - now) / 60000);

      logger.warn(`Rate limit exceeded for ${identifier}. IP: ${ip}. Attempts: ${attempt.count}`);

      throw new AppError(
        429,
        `Too many ${identifier} attempts. Please try again in ${waitMinutes} minute(s).`
      );
    }

    logger.debug(`${identifier} attempt ${attempt.count}/${maxAttempts} from IP: ${ip}`);
    next();
  };
}

// =====================================================
// RATE LIMITERS
// =====================================================

/**
 * Rate limit middleware for login endpoint (5 per 15 minutes)
 */
export const loginRateLimit = createRateLimiter(5, 15 * 60 * 1000, 'login');

/**
 * Rate limit middleware for register endpoint (3 per hour)
 */
export const registerRateLimit = createRateLimiter(3, 60 * 60 * 1000, 'register');

/**
 * Rate limit middleware for refresh endpoint (10 per minute)
 */
export const refreshRateLimit = createRateLimiter(10, 60 * 1000, 'refresh');

export default { loginRateLimit, registerRateLimit, refreshRateLimit };
