/**
 * Ranking Routes
 * REST API endpoints for ranking data
 */

import { Router } from 'express';
import { getIndividual, getGuild, getPvP } from '../services/ranking-service.js';
import { getCharacterProfile } from '../services/character-profile-service.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { AppError } from '../middleware/error-handler-middleware.js';
import type { RankingQueryParams } from '../types/ranking-types.js';

const router = Router();

/**
 * GET /api/rankings/individual
 * Get individual character rankings (fixed sorting: reset DESC, level DESC)
 * Query params: page (default: 1), limit (default: 20, max: 1000)
 */
router.get(
  '/individual',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 1000);
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const offset = (page - 1) * limit;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };
    const result = await getIndividual(params);

    res.json({
      rankings: result.rankings,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
      lastUpdate: new Date().toISOString(),
    });
  })
);

/**
 * GET /api/rankings/guild
 * Get guild rankings (Score, Level, Member Count)
 * Query params: page (default: 1), limit (default: 20, max: 1000)
 */
router.get(
  '/guild',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 1000);
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const offset = (page - 1) * limit;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };
    const result = await getGuild(params);

    res.json({
      rankings: result.rankings,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
      lastUpdate: new Date().toISOString(),
    });
  })
);

/**
 * GET /api/rankings/pvp
 * Get PvP rankings (Wins, Losses, Win Rate)
 * Query params: page (default: 1), limit (default: 20, max: 1000)
 */
router.get(
  '/pvp',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 1000);
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const offset = (page - 1) * limit;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };
    const result = await getPvP(params);

    res.json({
      rankings: result.rankings,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
      lastUpdate: new Date().toISOString(),
    });
  })
);

/**
 * GET /api/rankings/all
 * Get all ranking types in single request (individual uses fixed sorting: reset DESC, level DESC)
 * Query params: page (default: 1), limit (default: 20, max: 1000)
 */
router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 1000);
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const offset = (page - 1) * limit;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };

    const [individual, guild, pvp] = await Promise.all([
      getIndividual(params),
      getGuild(params),
      getPvP(params),
    ]);

    res.json({
      individual: individual.rankings,
      guild: guild.rankings,
      pvp: pvp.rankings,
      pagination: {
        page,
        limit,
        totals: {
          individual: individual.total,
          guild: guild.total,
          pvp: pvp.total,
        },
      },
      lastUpdate: new Date().toISOString(),
    });
  })
);

/**
 * GET /api/rankings/character/:name
 * Get single character profile (public endpoint)
 */
router.get(
  '/character/:name',
  asyncHandler(async (req, res) => {
    const { name } = req.params;

    if (!name || name.length < 1) {
      throw new AppError(400, 'Character name is required');
    }

    const profile = await getCharacterProfile(name);

    if (!profile) {
      throw new AppError(404, 'Character not found');
    }

    res.json({
      success: true,
      data: profile,
    });
  })
);

export { router as rankingRouter };
export default router;
