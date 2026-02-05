/**
 * News Routes
 * REST API endpoints for news/announcements management
 */

import { Router } from 'express';
import { NewsService } from '../services/news-service.js';
import { authenticate, requireGameMaster, AuthRequest, optionalAuthenticate } from '../middleware/auth-middleware.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { AppError } from '../middleware/error-handler-middleware.js';
import type { CreateNewsRequest, UpdateNewsRequest } from '../types/news-types.js';

const router = Router();

/**
 * GET /api/news
 * Get all published news (public endpoint)
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await NewsService.getPublishedNews();

    res.json({
      status: 'success',
      data: result,
    });
  })
);

/**
 * GET /api/news/all
 * Get all news including drafts (admin only)
 */
router.get(
  '/all',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const result = await NewsService.getAllNews();

    res.json({
      status: 'success',
      data: result,
    });
  })
);

/**
 * GET /api/news/:id
 * Get single news by ID (public if published, admin can see all)
 */
router.get(
  '/:id',
  optionalAuthenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new AppError(400, 'Invalid news ID');
    }

    const news = await NewsService.getNewsById(id);

    // Only allow viewing published news for non-admin users
    if (!news.isPublished && !req.auth?.isGameMaster) {
      throw new AppError(404, 'News not found');
    }

    res.json({
      status: 'success',
      data: { news },
    });
  })
);

/**
 * POST /api/news
 * Create new news post (admin only)
 */
router.post(
  '/',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req: AuthRequest, res) => {
    const data: CreateNewsRequest = req.body;

    // Validate input
    if (!data?.title || !data?.content) {
      throw new AppError(400, 'Title and content are required');
    }

    if (data.title.length < 3 || data.title.length > 255) {
      throw new AppError(400, 'Title must be 3-255 characters');
    }

    if (data.content.length < 10) {
      throw new AppError(400, 'Content must be at least 10 characters');
    }

    const news = await NewsService.createNews(
      data,
      req.auth!.userId,
      req.auth!.username
    );

    res.status(201).json({
      status: 'success',
      data: { news },
    });
  })
);

/**
 * PATCH /api/news/:id
 * Update news post (admin only)
 */
router.patch(
  '/:id',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new AppError(400, 'Invalid news ID');
    }

    const data: UpdateNewsRequest = req.body;

    // Validate if provided
    if (data.title !== undefined && (data.title.length < 3 || data.title.length > 255)) {
      throw new AppError(400, 'Title must be 3-255 characters');
    }

    if (data.content !== undefined && data.content.length < 10) {
      throw new AppError(400, 'Content must be at least 10 characters');
    }

    const news = await NewsService.updateNews(id, data);

    res.json({
      status: 'success',
      data: { news },
    });
  })
);

/**
 * DELETE /api/news/:id
 * Delete news post (admin only)
 */
router.delete(
  '/:id',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new AppError(400, 'Invalid news ID');
    }

    await NewsService.deleteNews(id);

    res.json({
      status: 'success',
      message: 'News deleted successfully',
    });
  })
);

/**
 * POST /api/news/:id/publish
 * Publish news post (admin only)
 */
router.post(
  '/:id/publish',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new AppError(400, 'Invalid news ID');
    }

    const news = await NewsService.publishNews(id);

    res.json({
      status: 'success',
      data: { news },
    });
  })
);

/**
 * POST /api/news/:id/unpublish
 * Unpublish news post (admin only)
 */
router.post(
  '/:id/unpublish',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new AppError(400, 'Invalid news ID');
    }

    const news = await NewsService.unpublishNews(id);

    res.json({
      status: 'success',
      data: { news },
    });
  })
);

export { router as newsRouter };
export default router;
