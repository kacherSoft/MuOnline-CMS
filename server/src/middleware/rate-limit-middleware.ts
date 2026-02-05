/**
 * Rate Limit Middleware
 * Login attempt rate limiting to prevent brute force attacks
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

// In-memory rate limit store (consider Redis for production)
const loginAttempts: RateLimitStore = {};

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const CLEANUP_INTERVAL_MS = 60 * 1000; // Clean up expired entries every minute

/**
 * Clean up expired rate limit entries
 */
function cleanupExpiredEntries() {
  const now = Date.now();

  for (const [key, entry] of Object.entries(loginAttempts)) {
    if (now > entry.resetTime) {
      delete loginAttempts[key];
    }
  }
}

// Run cleanup periodically
setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL_MS);

/**
 * Rate limit middleware for login endpoint
 */
export const loginRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // Check existing attempts
  const attempt = loginAttempts[ip];

  if (!attempt || now > attempt.resetTime) {
    // First attempt or window expired - reset counter
    loginAttempts[ip] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };

    logger.debug(`Login attempt ${1}/${MAX_ATTEMPTS} from IP: ${ip}`);
    return next();
  }

  // Increment counter
  attempt.count++;

  if (attempt.count > MAX_ATTEMPTS) {
    const waitMinutes = Math.ceil((attempt.resetTime - now) / 60000);

    logger.warn(`Rate limit exceeded for IP: ${ip}. Attempts: ${attempt.count}`);

    throw new AppError(
      429,
      `Too many login attempts. Please try again in ${waitMinutes} minute(s).`
    );
  }

  logger.debug(`Login attempt ${attempt.count}/${MAX_ATTEMPTS} from IP: ${ip}`);
  next();
};

/**
 * Get remaining attempts for an IP address
 */
export function getRemainingAttempts(ip: string): {
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const attempt = loginAttempts[ip];

  if (!attempt || now > attempt.resetTime) {
    return { remaining: MAX_ATTEMPTS, resetTime: now + WINDOW_MS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - attempt.count);
  return { remaining, resetTime: attempt.resetTime };
}

export default { loginRateLimit, getRemainingAttempts };
