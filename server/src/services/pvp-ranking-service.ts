/**
 * PvP Ranking Service
 * Handles PvP rankings (Wins, Losses, Win Rate)
 */

import { executeQuery } from '../lib/mysql-connection-pool.js';
import { getCachedData, setCachedData, CacheKeys } from '../lib/ranking-cache.js';
import type { PvPRankingEntry, RankingQueryParams } from '../types/ranking-types.js';
import { PVP_RANKING_QUERY, PVP_RANKING_QUERY_ALT } from '../lib/ranking-queries.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get PvP rankings
 * Returns top PvP players sorted by Wins DESC, Win Rate DESC
 */
export const getPvPRankings = async (
  params: RankingQueryParams = {}
): Promise<PvPRankingEntry[]> => {
  const limit = params.limit || 100;
  const offset = params.offset || 0;

  // Check cache first
  const cacheKey = CacheKeys.pvp(limit);
  const cached = await getCachedData<PvPRankingEntry[]>(cacheKey);
  if (cached) {
    logger.debug('PvP rankings cache hit');
    return cached.slice(offset, offset + limit);
  }

  logger.debug('PvP rankings cache miss, querying database');

  try {
    // Try primary query first
    let results;
    try {
      results = await executeQuery<{
        CharName: string;
        Wins: number;
        Losses: number;
        WinRate: number;
      }>(PVP_RANKING_QUERY, [limit * 2]);
    } catch (primaryError) {
      // Fallback to alternative query
      logger.warn('Primary PvP query failed, trying alternative query');
      try {
        results = await executeQuery<{
          CharName: string;
          Wins: number;
          Losses: number;
          WinRate: number;
        }>(PVP_RANKING_QUERY_ALT, [limit * 2]);
      } catch (altError) {
        logger.error('Both PvP queries failed:', altError);
        throw new Error('PvP rankings not available');
      }
    }

    // Map to ranking entries
    const rankings: PvPRankingEntry[] = results
      .map((row, index) => ({
        rank: index + 1,
        charName: row.CharName,
        wins: row.Wins || 0,
        losses: row.Losses || 0,
        winRate: Math.round((row.WinRate || 0) * 100) / 100,
      }))
      .slice(offset, offset + limit);

    // Cache the results
    await setCachedData(cacheKey, results.map((row, index) => ({
      rank: index + 1,
      charName: row.CharName,
      wins: row.Wins || 0,
      losses: row.Losses || 0,
      winRate: Math.round((row.WinRate || 0) * 100) / 100,
    })));

    logger.info(`Retrieved ${rankings.length} PvP rankings`);
    return rankings;
  } catch (error) {
    logger.error('Error fetching PvP rankings:', error);
    throw new Error('Failed to fetch PvP rankings');
  }
};

/**
 * Refresh PvP rankings cache
 * Called by background refresh job
 */
export const refreshPvPRankings = async (): Promise<void> => {
  try {
    const cacheKey = CacheKeys.pvp(100);
    
    let results;
    try {
      results = await executeQuery<{
        CharName: string;
        Wins: number;
        Losses: number;
        WinRate: number;
      }>(PVP_RANKING_QUERY, [100]);
    } catch (primaryError) {
      // Fallback to alternative query
      try {
        results = await executeQuery<{
          CharName: string;
          Wins: number;
          Losses: number;
          WinRate: number;
        }>(PVP_RANKING_QUERY_ALT, [100]);
      } catch (altError) {
        logger.warn('PvP rankings refresh failed (table may not exist)');
        return;
      }
    }

    const rankings: PvPRankingEntry[] = results.map((row, index) => ({
      rank: index + 1,
      charName: row.CharName,
      wins: row.Wins || 0,
      losses: row.Losses || 0,
      winRate: Math.round((row.WinRate || 0) * 100) / 100,
    }));

    await setCachedData(cacheKey, rankings);
    logger.debug('PvP rankings cache refreshed');
  } catch (error) {
    logger.error('Error refreshing PvP rankings cache:', error);
  }
};

export default {
  getPvPRankings,
  refreshPvPRankings,
};
