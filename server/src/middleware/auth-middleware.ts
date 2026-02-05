/**
 * Authentication Middleware
 * JWT token verification for protected routes
 */

import type { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/jwt-token-service.js';
import { AppError } from './error-handler-middleware.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import type { TokenPayload } from '../types/auth-types.js';

/**
 * Extend Express Request to include authenticated user info
 */
export interface AuthRequest extends Request {
  auth?: {
    userId: number;
    username: string;
    accountId: number;
    isGameMaster?: boolean;
  };
}

/**
 * Authenticate middleware
 * Verifies JWT token and attaches user info to request
 */
export const authenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Missing or invalid authorization header');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const payload: TokenPayload = TokenService.verifyAccessToken(token);

      // Attach user info to request
      req.auth = {
        userId: payload.userId,
        username: payload.username,
        accountId: payload.accountId,
        isGameMaster: payload.isGameMaster,
      };

      next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid or expired token';
      throw new AppError(401, errorMessage);
    }
  }
);

/**
 * Optional authentication middleware
 * Attaches user info if token is valid, but doesn't throw error if not
 */
export const optionalAuthenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      try {
        const payload: TokenPayload = TokenService.verifyAccessToken(token);

        req.auth = {
          userId: payload.userId,
          username: payload.username,
          accountId: payload.accountId,
          isGameMaster: payload.isGameMaster,
        };
      } catch {
        // Token invalid, but we don't throw error for optional auth
        // Just continue without authentication
      }
    }

    next();
  }
);

/**
 * Admin middleware
 * Verifies user is authenticated and has Game Master status
 */
export const requireGameMaster = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // First ensure authenticated
    if (!req.auth) {
      throw new AppError(401, 'Authentication required');
    }

    // Check if user is Game Master
    if (!req.auth.isGameMaster) {
      throw new AppError(403, 'Game Master access required');
    }

    next();
  }
);

export default { authenticate, optionalAuthenticate, requireGameMaster };
