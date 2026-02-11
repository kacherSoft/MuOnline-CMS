/**
 * Individual Ranking Service
 * Handles individual character rankings (Level + Resets)
 */

import { executeQuery } from '../lib/mysql-connection-pool.js';
import { getCachedData, setCachedData, CacheKeys } from '../lib/ranking-cache.js';
import type { IndividualRankingEntry, RankingQueryParams, RankingResult } from '../types/ranking-types.js';
import { CharacterClassNames } from '../types/ranking-types.js';
import { INDIVIDUAL_RANKING_QUERY, INDIVIDUAL_COUNT_QUERY } from '../lib/ranking-queries.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get individual rankings with fixed sorting (reset DESC, level DESC)
 * Returns rankings with total count for pagination
 */
export const getIndividualRankings = async (
  params: RankingQueryParams = {}
): Promise<RankingResult<IndividualRankingEntry>> => {
  const limit = params.limit || 100;
  const offset = params.offset || 0;

  // Check cache first (simplified cache key without sort variations)
  const cacheKey = CacheKeys.individual(limit);
  const cached = await getCachedData<IndividualRankingEntry[]>(cacheKey);
  if (cached) {
    logger.debug('Individual rankings cache hit');
    return {
      rankings: cached.slice(offset, offset + limit),
      total: cached.length,
    };
  }

  logger.debug('Individual rankings cache miss, querying database');

  try {
    // Query from database with fixed sorting
    const results = await executeQuery<{
      name: string;
      race: number;
      level: number;
      reset: number;
      strength: number;
      agility: number;
      vitality: number;
      energy: number;
    }>(INDIVIDUAL_RANKING_QUERY, [limit * 2]); // Fetch extra for offset

    // Map to ranking entries
    const rankings: IndividualRankingEntry[] = results
      .map((row, index) => ({
        rank: index + 1,
        name: row.name,
        class: row.race,
        className: CharacterClassNames[row.race] || 'Unknown',
        level: row.level,
        resets: row.reset,
        strength: row.strength,
        dexterity: row.agility,
        vitality: row.vitality,
        energy: row.energy,
      }))
      .slice(offset, offset + limit);

    // Cache the results
    await setCachedData(cacheKey, results.map((row, index) => ({
      rank: index + 1,
      name: row.name,
      class: row.race,
      className: CharacterClassNames[row.race] || 'Unknown',
      level: row.level,
      resets: row.reset,
      strength: row.strength,
      dexterity: row.agility,
      vitality: row.vitality,
      energy: row.energy,
    })));

    // Get total count
    const countResult = await executeQuery<{ total: number }>(INDIVIDUAL_COUNT_QUERY);
    const total = countResult[0]?.total || 0;

    logger.info(`Retrieved ${rankings.length} individual rankings (total: ${total})`);
    return { rankings, total };
  } catch (error) {
    logger.error('Error fetching individual rankings:', error);
    throw new Error('Failed to fetch individual rankings');
  }
};

/**
 * Refresh individual rankings cache
 * Called by background refresh job
 */
export const refreshIndividualRankings = async (): Promise<void> => {
  try {
    const cacheKey = CacheKeys.individual(100);

    const results = await executeQuery<{
      name: string;
      race: number;
      level: number;
      reset: number;
      strength: number;
      agility: number;
      vitality: number;
      energy: number;
    }>(INDIVIDUAL_RANKING_QUERY, [100]);

    const rankings: IndividualRankingEntry[] = results.map((row, index) => ({
      rank: index + 1,
      name: row.name,
      class: row.race,
      className: CharacterClassNames[row.race] || 'Unknown',
      level: row.level,
      resets: row.reset,
      strength: row.strength,
      dexterity: row.agility,
      vitality: row.vitality,
      energy: row.energy,
    }));

    await setCachedData(cacheKey, rankings);
    logger.debug('Individual rankings cache refreshed');
  } catch (error) {
    logger.error('Error refreshing individual rankings cache:', error);
  }
};

export default {
  getIndividualRankings,
  refreshIndividualRankings,
};
