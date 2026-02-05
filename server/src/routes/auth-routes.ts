/**
 * Authentication Routes
 * REST API endpoints for login, logout, refresh, and user info
 */

import { Router } from 'express';
import { AuthService } from '../services/muonline-auth-service.js';
import { loginRateLimit } from '../middleware/rate-limit-middleware.js';
import { authenticate, AuthRequest } from '../middleware/auth-middleware.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { AppError } from '../middleware/error-handler-middleware.js';
import type { LoginRequest, RefreshRequest, RegisterRequest } from '../types/auth-types.js';

const router = Router();

/**
 * POST /api/auth/login
 * Authenticate user and return JWT tokens
 */
router.post(
  '/login',
  loginRateLimit,
  asyncHandler(async (req, res) => {
    const credentials: LoginRequest = req.body;

    // Validate input manually (no Joi dependency)
    if (!credentials?.username || !credentials?.password) {
      throw new AppError(400, 'Username and password are required');
    }

    if (credentials.username.length < 3 || credentials.username.length > 20) {
      throw new AppError(400, 'Username must be 3-20 characters');
    }

    if (credentials.password.length < 4) {
      throw new AppError(400, 'Password must be at least 4 characters');
    }

    const result = await AuthService.login(credentials);

    res.json({
      status: 'success',
      data: result,
    });
  })
);

/**
 * POST /api/auth/register
 * Register new user account and return JWT tokens
 */
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const data: RegisterRequest = req.body;

    // Validate input
    if (!data?.username || !data?.password) {
      throw new AppError(400, 'Username and password are required');
    }

    if (data.username.length < 3 || data.username.length > 20) {
      throw new AppError(400, 'Username must be 3-20 characters');
    }

    if (data.password.length < 6) {
      throw new AppError(400, 'Password must be at least 6 characters');
    }

    if (data.email && !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new AppError(400, 'Invalid email format');
    }

    if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
      throw new AppError(400, 'Passwords do not match');
    }

    const result = await AuthService.register(data);

    res.status(201).json({
      status: 'success',
      data: result,
    });
  })
);

/**
 * POST /api/auth/refresh
 * Get new access token using refresh token
 */
router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const { refreshToken }: RefreshRequest = req.body;

    if (!refreshToken) {
      throw new AppError(400, 'Refresh token is required');
    }

    const result = await AuthService.refreshToken(refreshToken);

    res.json({
      status: 'success',
      data: result,
    });
  })
);

/**
 * POST /api/auth/logout
 * Invalidate session and logout user
 */
router.post(
  '/logout',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { refreshToken } = req.body;

    await AuthService.logout(req.auth!.userId, refreshToken);

    res.json({
      status: 'success',
      message: 'Logged out successfully',
    });
  })
);

/**
 * GET /api/auth/me
 * Get current authenticated user info
 */
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await AuthService.getMe(req.auth!.userId);

    res.json({
      status: 'success',
      data: user,
    });
  })
);

/**
 * GET /api/auth/sessions
 * Get active session count for current user
 */
router.get(
  '/sessions',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const count = await AuthService.getActiveSessionCount(req.auth!.userId);

    res.json({
      status: 'success',
      data: { activeSessions: count },
    });
  })
);

/**
 * POST /api/auth/cleanup
 * Clean up expired sessions (admin endpoint)
 */
router.post(
  '/cleanup',
  asyncHandler(async (req, res) => {
    await AuthService.cleanupExpiredSessions();

    res.json({
      status: 'success',
      message: 'Expired sessions cleaned up',
    });
  })
);

export { router as authRouter };
export default router;
