/**
 * Guild Ranking Service
 * Handles guild rankings (Score, Level, Member Count)
 */

import { executeQuery } from '../lib/mysql-connection-pool.js';
import { getCachedData, setCachedData, CacheKeys } from '../lib/ranking-cache.js';
import type { GuildRankingEntry, RankingQueryParams } from '../types/ranking-types.js';
import { GUILD_RANKING_QUERY } from '../lib/ranking-queries.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get guild rankings
 * Returns top guilds sorted by Score DESC, Level DESC
 */
export const getGuildRankings = async (
  params: RankingQueryParams = {}
): Promise<GuildRankingEntry[]> => {
  const limit = params.limit || 100;
  const offset = params.offset || 0;

  // Check cache first
  const cacheKey = CacheKeys.guild(limit);
  const cached = await getCachedData<GuildRankingEntry[]>(cacheKey);
  if (cached) {
    logger.debug('Guild rankings cache hit');
    return cached.slice(offset, offset + limit);
  }

  logger.debug('Guild rankings cache miss, querying database');

  try {
    // Query from database
    const results = await executeQuery<{
      G_Name: string;
      G_Master: string;
      G_Score: number;
      G_Level: number;
      MemberCount: number;
    }>(GUILD_RANKING_QUERY, [limit * 2]); // Fetch extra for offset

    // Map to ranking entries
    const rankings: GuildRankingEntry[] = results
      .map((row, index) => ({
        rank: index + 1,
        name: row.G_Name,
        master: row.G_Master,
        score: row.G_Score,
        level: row.G_Level,
        memberCount: row.MemberCount,
      }))
      .slice(offset, offset + limit);

    // Cache the results
    await setCachedData(cacheKey, results.map((row, index) => ({
      rank: index + 1,
      name: row.G_Name,
      master: row.G_Master,
      score: row.G_Score,
      level: row.G_Level,
      memberCount: row.MemberCount,
    })));

    logger.info(`Retrieved ${rankings.length} guild rankings`);
    return rankings;
  } catch (error) {
    logger.error('Error fetching guild rankings:', error);
    throw new Error('Failed to fetch guild rankings');
  }
};

/**
 * Refresh guild rankings cache
 * Called by background refresh job
 */
export const refreshGuildRankings = async (): Promise<void> => {
  try {
    const cacheKey = CacheKeys.guild(100);
    
    const results = await executeQuery<{
      G_Name: string;
      G_Master: string;
      G_Score: number;
      G_Level: number;
      MemberCount: number;
    }>(GUILD_RANKING_QUERY, [100]);

    const rankings: GuildRankingEntry[] = results.map((row, index) => ({
      rank: index + 1,
      name: row.G_Name,
      master: row.G_Master,
      score: row.G_Score,
      level: row.G_Level,
      memberCount: row.MemberCount,
    }));

    await setCachedData(cacheKey, rankings);
    logger.debug('Guild rankings cache refreshed');
  } catch (error) {
    logger.error('Error refreshing guild rankings cache:', error);
  }
};

export default {
  getGuildRankings,
  refreshGuildRankings,
};
