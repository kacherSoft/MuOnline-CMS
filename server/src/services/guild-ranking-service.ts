/**
 * Guild Ranking Service
 * Handles guild rankings (Score, Member Count)
 */

import { executeQuery } from '../lib/mysql-connection-pool.js';
import { getCachedData, setCachedData, CacheKeys } from '../lib/ranking-cache.js';
import type { GuildRankingEntry, RankingQueryParams, RankingResult } from '../types/ranking-types.js';
import { GUILD_RANKING_QUERY, GUILD_COUNT_QUERY } from '../lib/ranking-queries.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get guild rankings with total count
 * Returns top guilds sorted by score DESC
 */
export const getGuildRankings = async (
  params: RankingQueryParams = {}
): Promise<RankingResult<GuildRankingEntry>> => {
  const limit = params.limit || 100;
  const offset = params.offset || 0;

  // Check cache first
  const cacheKey = CacheKeys.guild(limit);
  const cached = await getCachedData<GuildRankingEntry[]>(cacheKey);
  if (cached) {
    logger.debug('Guild rankings cache hit');
    return {
      rankings: cached.slice(offset, offset + limit),
      total: cached.length,
    };
  }

  logger.debug('Guild rankings cache miss, querying database');

  try {
    // Query from database
    const results = await executeQuery<{
      guild_name: string;
      master_name: string | null;
      score: number;
      member_count: number;
    }>(GUILD_RANKING_QUERY, [limit * 2]); // Fetch extra for offset

    // Map to ranking entries
    const rankings: GuildRankingEntry[] = results
      .map((row, index) => ({
        rank: index + 1,
        name: row.guild_name,
        master: row.master_name || 'Unknown',
        score: row.score,
        level: 0,
        memberCount: row.member_count,
      }))
      .slice(offset, offset + limit);

    // Cache the results
    await setCachedData(cacheKey, results.map((row, index) => ({
      rank: index + 1,
      name: row.guild_name,
      master: row.master_name || 'Unknown',
      score: row.score,
      level: 0,
      memberCount: row.member_count,
    })));

    // Get total count
    const countResult = await executeQuery<{ total: number }>(GUILD_COUNT_QUERY);
    const total = countResult[0]?.total || 0;

    logger.info(`Retrieved ${rankings.length} guild rankings (total: ${total})`);
    return { rankings, total };
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
      guild_name: string;
      master_name: string | null;
      score: number;
      member_count: number;
    }>(GUILD_RANKING_QUERY, [100]);

    const rankings: GuildRankingEntry[] = results.map((row, index) => ({
      rank: index + 1,
      name: row.guild_name,
      master: row.master_name || 'Unknown',
      score: row.score,
      level: 0,
      memberCount: row.member_count,
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
