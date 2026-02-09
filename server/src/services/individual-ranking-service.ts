/**
 * Individual Ranking Service
 * Handles individual character rankings (Level + Resets)
 */

import { executeQuery } from '../lib/mysql-connection-pool.js';
import { getCachedData, setCachedData, CacheKeys } from '../lib/ranking-cache.js';
import type { IndividualRankingEntry, RankingQueryParams } from '../types/ranking-types.js';
import { CharacterClassNames } from '../types/ranking-types.js';
import { INDIVIDUAL_RANKING_QUERY } from '../lib/ranking-queries.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get individual rankings
 * Returns top characters sorted by Resets DESC, Level DESC
 */
export const getIndividualRankings = async (
  params: RankingQueryParams = {}
): Promise<IndividualRankingEntry[]> => {
  const limit = params.limit || 100;
  const offset = params.offset || 0;

  // Check cache first
  const cacheKey = CacheKeys.individual(limit);
  const cached = await getCachedData<IndividualRankingEntry[]>(cacheKey);
  if (cached) {
    logger.debug('Individual rankings cache hit');
    return cached.slice(offset, offset + limit);
  }

  logger.debug('Individual rankings cache miss, querying database');

  try {
    // Query from database
    const results = await executeQuery<{
      Name: string;
      Class: number;
      cLevel: number;
      Resets: number;
      Strength: number;
      Dexterity: number;
      Vitality: number;
      Energy: number;
    }>(INDIVIDUAL_RANKING_QUERY, [limit * 2]); // Fetch extra for offset

    // Map to ranking entries
    const rankings: IndividualRankingEntry[] = results
      .map((row, index) => ({
        rank: index + 1,
        name: row.Name,
        class: row.Class,
        className: CharacterClassNames[row.Class] || 'Unknown',
        level: row.cLevel,
        resets: row.Resets,
        strength: row.Strength,
        dexterity: row.Dexterity,
        vitality: row.Vitality,
        energy: row.Energy,
      }))
      .slice(offset, offset + limit);

    // Cache the results
    await setCachedData(cacheKey, results.map((row, index) => ({
      rank: index + 1,
      name: row.Name,
      class: row.Class,
      className: CharacterClassNames[row.Class] || 'Unknown',
      level: row.cLevel,
      resets: row.Resets,
      strength: row.Strength,
      dexterity: row.Dexterity,
      vitality: row.Vitality,
      energy: row.Energy,
    })));

    logger.info(`Retrieved ${rankings.length} individual rankings`);
    return rankings;
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
      Name: string;
      Class: number;
      cLevel: number;
      Resets: number;
      Strength: number;
      Dexterity: number;
      Vitality: number;
      Energy: number;
    }>(INDIVIDUAL_RANKING_QUERY, [100]);

    const rankings: IndividualRankingEntry[] = results.map((row, index) => ({
      rank: index + 1,
      name: row.Name,
      class: row.Class,
      className: CharacterClassNames[row.Class] || 'Unknown',
      level: row.cLevel,
      resets: row.Resets,
      strength: row.Strength,
      dexterity: row.Dexterity,
      vitality: row.Vitality,
      energy: row.Energy,
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
