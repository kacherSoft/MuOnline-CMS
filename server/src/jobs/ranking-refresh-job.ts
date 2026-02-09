/**
 * Ranking Refresh Job
 * Background job to refresh ranking caches every 2 minutes
 */

import { refreshAllRankings } from '../services/ranking-service.js';
import { initRedisCache } from '../lib/ranking-cache.js';
import { getCacheStats } from '../lib/ranking-cache.js';
import { logger } from '../utils/winston-logger.js';

// Job state
let refreshInterval: NodeJS.Timeout | null = null;
let isRunning = false;

/**
 * Initialize ranking refresh job
 * Starts background refresh interval
 */
export const initRankingRefreshJob = async (): Promise<void> => {
  if (refreshInterval) {
    logger.warn('Ranking refresh job already initialized');
    return;
  }

  // Initialize Redis cache
  await initRedisCache();

  // Initial refresh
  logger.info('Running initial ranking refresh...');
  await refreshRankings();

  // Start periodic refresh (every 2 minutes)
  const refreshIntervalMs = parseInt(process.env.RANKING_REFRESH_INTERVAL || '120000');
  refreshInterval = setInterval(async () => {
    await refreshRankings();
  }, refreshIntervalMs);

  logger.info(`✅ Ranking refresh job started (interval: ${refreshIntervalMs}ms)`);
};

/**
 * Stop ranking refresh job
 */
export const stopRankingRefreshJob = (): void => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    logger.info('Ranking refresh job stopped');
  }
};

/**
 * Refresh rankings with lock to prevent concurrent runs
 */
const refreshRankings = async (): Promise<void> => {
  if (isRunning) {
    logger.warn('Ranking refresh already in progress, skipping');
    return;
  }

  isRunning = true;
  const startTime = Date.now();

  try {
    logger.info('Starting ranking cache refresh...');
    await refreshAllRankings();
    
    const duration = Date.now() - startTime;
    const stats = getCacheStats();
    
    logger.info(
      `Ranking cache refreshed successfully in ${duration}ms ` +
      `(hit rate: ${stats.hitRate.toFixed(1)}%, ` +
      `hits: ${stats.hits}, misses: ${stats.misses})`
    );
  } catch (error) {
    logger.error('Ranking refresh failed:', error);
  } finally {
    isRunning = false;
  }
};

/**
 * Manually trigger ranking refresh
 * Can be called via API endpoint
 */
export const triggerRankingRefresh = async (): Promise<{ success: boolean; message: string }> => {
  try {
    await refreshRankings();
    return { success: true, message: 'Ranking refresh triggered successfully' };
  } catch (error) {
    logger.error('Manual ranking refresh failed:', error);
    return { success: false, message: 'Ranking refresh failed' };
  }
};

export default {
  initRankingRefreshJob,
  stopRankingRefreshJob,
  triggerRankingRefresh,
};
