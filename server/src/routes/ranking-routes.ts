/**
 * Ranking Routes
 * REST API endpoints for ranking data
 */

import { Router } from 'express';
import { getIndividual, getGuild, getPvP } from '../services/ranking-service.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { AppError } from '../middleware/error-handler-middleware.js';
import type { RankingQueryParams } from '../types/ranking-types.js';

const router = Router();

/**
 * GET /api/rankings/individual
 * Get individual character rankings (Level + Resets)
 * Query params: limit (default: 100, max: 1000), offset (default: 0)
 */
router.get(
  '/individual',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000);
    const offset = parseInt(req.query.offset as string) || 0;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };
    const rankings = await getIndividual(params);

    res.json({
      status: 'success',
      data: rankings,
      meta: {
        type: 'individual',
        limit,
        offset,
        count: rankings.length,
      },
    });
  })
);

/**
 * GET /api/rankings/guild
 * Get guild rankings (Score, Level, Member Count)
 * Query params: limit (default: 100, max: 1000), offset (default: 0)
 */
router.get(
  '/guild',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000);
    const offset = parseInt(req.query.offset as string) || 0;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };
    const rankings = await getGuild(params);

    res.json({
      status: 'success',
      data: rankings,
      meta: {
        type: 'guild',
        limit,
        offset,
        count: rankings.length,
      },
    });
  })
);

/**
 * GET /api/rankings/pvp
 * Get PvP rankings (Wins, Losses, Win Rate)
 * Query params: limit (default: 100, max: 1000), offset (default: 0)
 */
router.get(
  '/pvp',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000);
    const offset = parseInt(req.query.offset as string) || 0;

    if (limit < 1 || offset < 0) {
      throw new AppError(400, 'Invalid query parameters');
    }

    const params: RankingQueryParams = { limit, offset };
    const rankings = await getPvP(params);

    res.json({
      status: 'success',
      data: rankings,
      meta: {
        type: 'pvp',
        limit,
        offset,
        count: rankings.length,
      },
    });
  })
);

/**
 * GET /api/rankings/all
 * Get all ranking types in single request
 * Query params: limit (default: 100, max: 1000), offset (default: 0)
 */
router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000);
    const offset = parseInt(req.query.offset as string) || 0;

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
      status: 'success',
      data: {
        individual,
        guild,
        pvp,
      },
      meta: {
        limit,
        offset,
        counts: {
          individual: individual.length,
          guild: guild.length,
          pvp: pvp.length,
        },
      },
    });
  })
);

export { router as rankingRouter };
export default router;
