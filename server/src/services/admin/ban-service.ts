/**
 * Ban Service
 * Account banning and unbanning functionality
 */

import { executeQuery, executeInsert, executeQueryOne } from '../../lib/mysql-connection-pool.js';
import { logger } from '../../utils/winston-logger.js';
import type { BanInfo, BanAccountRequest } from '../../types/admin-types.js';

export class BanService {
  /**
   * Ban an account with reason and duration
   */
  static async banAccount(
    request: BanAccountRequest,
    adminId: number,
    adminUsername: string
  ): Promise<void> {
    const { accountId, reason, duration = 0, durationUnit = 'permanent' } = request;

    if (!reason || reason.trim().length === 0) {
      throw new Error('Ban reason is required');
    }

    const existingBan = await this.getBanInfo(accountId);
    if (existingBan) {
      throw new Error('Account is already banned');
    }

    const isOnline = await this.checkAccountOnline(accountId);
    if (isOnline) {
      logger.warn(`Attempting to ban online account: ${accountId}`);
      throw new Error('Cannot ban online account. Wait for player to disconnect.');
    }

    let expiresAt: number | null = null;

    if (durationUnit !== 'permanent' && duration > 0) {
      const now = Date.now();
      const ms = duration * 60 * 1000;

      if (durationUnit === 'hours') {
        expiresAt = now + ms;
      } else if (durationUnit === 'days') {
        expiresAt = now + (ms * 24);
      }
    }

    await executeInsert(
      `INSERT INTO account_bans
      (account_id, ban_reason, ban_date, expires_at, banned_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [accountId, reason.trim(), Date.now(), expiresAt, adminUsername, Date.now()]
    );

    await executeQuery(
      'UPDATE accounts SET status = ? WHERE guid = ?',
      ['banned', accountId]
    );

    logger.info(`Account banned: ${accountId} by ${adminUsername}, reason: ${reason}`);
  }

  /**
   * Unban an account
   */
  static async unbanAccount(
    accountId: number,
    adminId: number,
    adminUsername: string
  ): Promise<void> {
    const banInfo = await this.getBanInfo(accountId);

    if (!banInfo) {
      throw new Error('Account is not banned');
    }

    await executeQuery(
      'DELETE FROM account_bans WHERE account_id = ?',
      [accountId]
    );

    await executeQuery(
      'UPDATE accounts SET status = ? WHERE guid = ?',
      ['active', accountId]
    );

    logger.info(`Account unbanned: ${accountId} by ${adminUsername}`);
  }

  /**
   * Get ban info for account
   */
  static async getBanInfo(accountId: number): Promise<BanInfo | null> {
    try {
      const ban = await executeQueryOne<{
        ban_reason: string;
        ban_date: number;
        expires_at: number | null;
        banned_by: string;
      }>(
        'SELECT ban_reason, ban_date, expires_at, banned_by FROM account_bans WHERE account_id = ?',
        [accountId]
      );

      if (!ban) {
        return null;
      }

      return {
        banReason: ban.ban_reason,
        banDate: ban.ban_date,
        expiresAt: ban.expires_at,
        bannedBy: ban.banned_by,
      };
    } catch {
      return null;
    }
  }

  /**
   * Check if account is currently banned
   */
  static async isAccountBanned(accountId: number): Promise<boolean> {
    const banInfo = await this.getBanInfo(accountId);

    if (!banInfo) {
      return false;
    }

    if (banInfo.expiresAt && banInfo.expiresAt < Date.now()) {
      await this.unbanAccount(accountId, 0, 'System');
      return false;
    }

    return true;
  }

  /**
   * Get account ban status (active, banned, suspended)
   */
  static async getAccountBanStatus(accountId: number): Promise<'active' | 'banned' | 'suspended'> {
    const isBanned = await this.isAccountBanned(accountId);
    return isBanned ? 'banned' : 'active';
  }

  /**
   * Get all banned accounts
   */
  static async getBannedAccounts(limit = 100): Promise<Array<{
    accountId: number;
    username: string;
    banReason: string;
    banDate: number;
    expiresAt: number | null;
    bannedBy: string;
  }>> {
    try {
      const result = await executeQuery<{
        account_id: number;
        account: string;
        ban_reason: string;
        ban_date: number;
        expires_at: number | null;
        banned_by: string;
      }>(
        `SELECT
          ab.account_id,
          a.account,
          ab.ban_reason,
          ab.ban_date,
          ab.expires_at,
          ab.banned_by
        FROM account_bans ab
        JOIN accounts a ON ab.account_id = a.guid
        ORDER BY ab.ban_date DESC
        LIMIT ?`,
        [limit]
      );

      return result.map(row => ({
        accountId: row.account_id,
        username: row.account,
        banReason: row.ban_reason,
        banDate: row.ban_date,
        expiresAt: row.expires_at,
        bannedBy: row.banned_by,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Clean up expired bans
   */
  static async cleanupExpiredBans(): Promise<number> {
    try {
      const result = await executeQuery(
        'DELETE FROM account_bans WHERE expires_at IS NOT NULL AND expires_at < ?',
        [Date.now()]
      );

      const count = result.length;

      if (count > 0) {
        await executeQuery(
          'UPDATE accounts SET status = ? WHERE guid IN (SELECT account_id FROM account_bans WHERE expires_at < ?)',
          ['active', Date.now()]
        );
        logger.info(`Cleaned up ${count} expired bans`);
      }

      return count;
    } catch (error) {
      logger.error('Failed to cleanup expired bans:', error);
      return 0;
    }
  }

  /**
   * Check if account is online
   */
  static async checkAccountOnline(accountId: number): Promise<boolean> {
    try {
      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM MEMB_STAT WHERE memb___id = (SELECT account FROM accounts WHERE guid = ?) AND ConnectStat = 1',
        [accountId]
      );
      return (result[0]?.count || 0) > 0;
    } catch {
      return false;
    }
  }
}

export default BanService;
