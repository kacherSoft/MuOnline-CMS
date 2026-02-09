/**
 * Ranking Service Orchestrator
 * Main service providing unified interface for all ranking types
 */

import { getIndividualRankings, refreshIndividualRankings } from './individual-ranking-service.js';
import { getGuildRankings, refreshGuildRankings } from './guild-ranking-service.js';
import { getPvPRankings, refreshPvPRankings } from './pvp-ranking-service.js';
import type { IndividualRankingEntry, GuildRankingEntry, PvPRankingEntry, RankingQueryParams } from '../types/ranking-types.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get individual rankings
 */
export const getIndividual = async (
  params?: RankingQueryParams
): Promise<IndividualRankingEntry[]> => {
  try {
    return await getIndividualRankings(params);
  } catch (error) {
    logger.error('RankingService: Failed to get individual rankings', error);
    throw error;
  }
};

/**
 * Get guild rankings
 */
export const getGuild = async (
  params?: RankingQueryParams
): Promise<GuildRankingEntry[]> => {
  try {
    return await getGuildRankings(params);
  } catch (error) {
    logger.error('RankingService: Failed to get guild rankings', error);
    throw error;
  }
};

/**
 * Get PvP rankings
 */
export const getPvP = async (
  params?: RankingQueryParams
): Promise<PvPRankingEntry[]> => {
  try {
    return await getPvPRankings(params);
  } catch (error) {
    logger.error('RankingService: Failed to get PvP rankings', error);
    throw error;
  }
};

/**
 * Refresh all ranking caches
 * Called by background refresh job
 */
export const refreshAllRankings = async (): Promise<void> => {
  const startTime = Date.now();
  
  try {
    await Promise.all([
      refreshIndividualRankings(),
      refreshGuildRankings(),
      refreshPvPRankings(),
    ]);

    const duration = Date.now() - startTime;
    logger.info(`All rankings refreshed in ${duration}ms`);
  } catch (error) {
    logger.error('RankingService: Failed to refresh rankings', error);
  }
};

export default {
  getIndividual,
  getGuild,
  getPvP,
  refreshAllRankings,
};
