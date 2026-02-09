/**
 * Audit Log Service
 * Logs all admin actions for security and compliance
 */

import { executeQuery, executeInsert } from '../../lib/mysql-connection-pool.js';
import { logger } from '../../utils/winston-logger.js';
import type { AuditLogEntry, AuditLogQuery } from '../../types/admin-types.js';

export class AuditLogService {
  /**
   * Log an admin action
   */
  static async logAction(params: {
    adminId: number;
    adminUsername: string;
    action: string;
    targetType: 'account' | 'character' | 'server' | 'announcement' | 'ban';
    targetId: string;
    details: string;
    ipAddress: string;
  }): Promise<void> {
    try {
      await executeInsert(
        `INSERT INTO admin_audit_log
        (admin_id, admin_username, action, target_type, target_id, details, ip_address, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          params.adminId,
          params.adminUsername,
          params.action,
          params.targetType,
          params.targetId,
          params.details,
          params.ipAddress,
          Date.now(),
        ]
      );

      logger.debug(`Audit log: ${params.adminUsername} - ${params.action} on ${params.targetType}:${params.targetId}`);
    } catch (error) {
      logger.error('Failed to write audit log:', error);
    }
  }

  /**
   * Query audit logs with filters
   */
  static async getAuditLogs(query: AuditLogQuery = {}): Promise<{ logs: AuditLogEntry[]; total: number }> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (query.adminId) {
      conditions.push('admin_id = ?');
      params.push(query.adminId);
    }

    if (query.action) {
      conditions.push('action LIKE ?');
      params.push(`%${query.action}%`);
    }

    if (query.targetType) {
      conditions.push('target_type = ?');
      params.push(query.targetType);
    }

    if (query.startDate) {
      conditions.push('created_at >= ?');
      params.push(query.startDate);
    }

    if (query.endDate) {
      conditions.push('created_at <= ?');
      params.push(query.endDate);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const limit = query.limit || 100;
    const offset = query.offset || 0;

    params.push(limit, offset);

    const logs = await executeQuery<AuditLogEntry>(
      `SELECT * FROM admin_audit_log ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params
    );

    const countParams = params.slice(0, -2);
    const countResult = await executeQuery<{ total: number }>(
      `SELECT COUNT(*) as total FROM admin_audit_log ${whereClause}`,
      countParams
    );

    return {
      logs,
      total: countResult[0]?.total || 0,
    };
  }

  /**
   * Get audit logs for a specific target
   */
  static async getLogsForTarget(targetType: string, targetId: string, limit = 50): Promise<AuditLogEntry[]> {
    return await executeQuery<AuditLogEntry>(
      `SELECT * FROM admin_audit_log
      WHERE target_type = ? AND target_id = ?
      ORDER BY created_at DESC
      LIMIT ?`,
      [targetType, targetId, limit]
    );
  }

  /**
   * Get recent admin activity
   */
  static async getRecentActivity(limit = 20): Promise<AuditLogEntry[]> {
    return await executeQuery<AuditLogEntry>(
      `SELECT * FROM admin_audit_log
      ORDER BY created_at DESC
      LIMIT ?`,
      [limit]
    );
  }

  /**
   * Clean up old audit logs (older than 90 days)
   */
  static async cleanupOldLogs(daysToKeep = 90): Promise<number> {
    const cutoffTime = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;

    const result = await executeQuery<{ deleted: number }>(
      `DELETE FROM admin_audit_log WHERE created_at < ?`,
      [cutoffTime]
    );

    const deletedCount = result.length;
    logger.info(`Cleaned up ${deletedCount} old audit log entries`);
    return deletedCount;
  }
}

export default AuditLogService;
