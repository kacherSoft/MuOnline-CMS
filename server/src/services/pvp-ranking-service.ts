/**
 * PvP Ranking Service
 * PvP rankings are not available in MuEmu Season 19.2 schema - Coming Soon
 */

import type { PvPRankingEntry, RankingQueryParams, RankingResult } from '../types/ranking-types.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Get PvP rankings
 * Returns empty results - PvP tables do not exist in this schema
 */
export const getPvPRankings = async (
  params: RankingQueryParams = {}
): Promise<RankingResult<PvPRankingEntry>> => {
  logger.debug('PvP rankings not available - coming soon');
  return { rankings: [], total: 0 };
};

/**
 * Refresh PvP rankings cache
 * No-op since PvP tables do not exist
 */
export const refreshPvPRankings = async (): Promise<void> => {
  logger.debug('PvP rankings refresh skipped - coming soon');
};

export default {
  getPvPRankings,
  refreshPvPRankings,
};
