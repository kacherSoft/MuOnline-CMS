/**
 * Statistics Service
 * Server statistics and metrics for admin dashboard
 */

import { executeQuery } from '../../lib/mysql-connection-pool.js';
import { logger } from '../../utils/winston-logger.js';
import type { ServerStatistics, OnlinePlayersByServer } from '../../types/admin-types.js';

export class StatisticsService {
  private static cachedStats: ServerStatistics | null = null;
  private static cacheExpiry = 0;
  private static readonly CACHE_TTL = 60 * 1000; // 1 minute

  /**
   * Get comprehensive server statistics
   */
  static async getStatistics(): Promise<ServerStatistics> {
    const now = Date.now();

    if (this.cachedStats && now < this.cacheExpiry) {
      return this.cachedStats;
    }

    const onlinePlayers = await this.getOnlinePlayerCount();
    const totalAccounts = await this.getTotalAccounts();
    const totalCharacters = await this.getTotalCharacters();
    const registrationsToday = await this.getRegistrationsToday();
    const registrationsWeek = await this.getRegistrationsWeek();
    const registrationsMonth = await this.getRegistrationsMonth();
    const serverStatus = await this.getServerStatus();

    this.cachedStats = {
      onlinePlayers,
      totalAccounts,
      totalCharacters,
      registrationsToday,
      registrationsWeek,
      registrationsMonth,
      serverStatus,
      lastUpdated: now,
    };

    this.cacheExpiry = now + this.CACHE_TTL;

    return this.cachedStats;
  }

  /**
   * Get online player count
   */
  static async getOnlinePlayerCount(): Promise<number> {
    try {
      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM MEMB_STAT WHERE ConnectStat = 1'
      );
      return result[0]?.count || 0;
    } catch (error) {
      logger.error('Failed to get online player count:', error);
      return 0;
    }
  }

  /**
   * Get online players by server
   */
  static async getOnlinePlayersByServer(): Promise<OnlinePlayersByServer[]> {
    try {
      const result = await executeQuery<{
        ServerCode: number;
        ServerName: string;
        count: number;
      }>(
        `SELECT
          m.ServerCode,
          COALESCE(s.ServerName, CONCAT('Server ', m.ServerCode)) as ServerName,
          COUNT(*) as count
        FROM MEMB_STAT m
        LEFT JOIN servers s ON m.ServerCode = s.ServerCode
        WHERE m.ConnectStat = 1
        GROUP BY m.ServerCode, s.ServerName`
      );

      return result.map(row => ({
        serverCode: row.ServerCode,
        serverName: row.ServerName,
        onlineCount: row.count,
      }));
    } catch (error) {
      logger.error('Failed to get online players by server:', error);
      return [];
    }
  }

  /**
   * Get total accounts count
   */
  static async getTotalAccounts(): Promise<number> {
    try {
      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM accounts'
      );
      return result[0]?.count || 0;
    } catch (error) {
      logger.error('Failed to get total accounts:', error);
      return 0;
    }
  }

  /**
   * Get total characters count
   */
  static async getTotalCharacters(): Promise<number> {
    try {
      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM Character'
      );
      return result[0]?.count || 0;
    } catch (error) {
      logger.error('Failed to get total characters:', error);
      return 0;
    }
  }

  /**
   * Get new registrations today
   */
  static async getRegistrationsToday(): Promise<number> {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const timestamp = Math.floor(todayStart.getTime() / 1000);

      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM accounts WHERE register >= ?',
        [timestamp]
      );
      return result[0]?.count || 0;
    } catch (error) {
      logger.error('Failed to get registrations today:', error);
      return 0;
    }
  }

  /**
   * Get new registrations this week
   */
  static async getRegistrationsWeek(): Promise<number> {
    try {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      weekStart.setHours(0, 0, 0, 0);
      const timestamp = Math.floor(weekStart.getTime() / 1000);

      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM accounts WHERE register >= ?',
        [timestamp]
      );
      return result[0]?.count || 0;
    } catch (error) {
      logger.error('Failed to get registrations this week:', error);
      return 0;
    }
  }

  /**
   * Get new registrations this month
   */
  static async getRegistrationsMonth(): Promise<number> {
    try {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const timestamp = Math.floor(monthStart.getTime() / 1000);

      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM accounts WHERE register >= ?',
        [timestamp]
      );
      return result[0]?.count || 0;
    } catch (error) {
      logger.error('Failed to get registrations this month:', error);
      return 0;
    }
  }

  /**
   * Check server status
   */
  static async getServerStatus(): Promise<'online' | 'offline'> {
    try {
      const onlineCount = await this.getOnlinePlayerCount();
      return onlineCount > 0 ? 'online' : 'offline';
    } catch {
      return 'offline';
    }
  }

  /**
   * Invalidate cache (call after data changes)
   */
  static invalidateCache(): void {
    this.cachedStats = null;
    this.cacheExpiry = 0;
  }
}

export default StatisticsService;
