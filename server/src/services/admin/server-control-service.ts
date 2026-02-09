/**
 * Server Control Service
 * Server management functions (announcements, maintenance mode, etc.)
 */

import { executeQuery, executeInsert, executeQueryOne } from '../../lib/mysql-connection-pool.js';
import { logger } from '../../utils/winston-logger.js';
import type {
  ServerAnnouncement,
  CreateAnnouncementRequest,
  MaintenanceMode,
} from '../../types/admin-types.js';

let io: any = null;

export function setSocketIOInstance(socketIOInstance: any): void {
  io = socketIOInstance;
}

export class ServerControlService {
  /**
   * Send server announcement to all online players
   */
  static async sendAnnouncement(
    request: CreateAnnouncementRequest,
    adminId: number,
    adminUsername: string
  ): Promise<ServerAnnouncement> {
    const { message, type = 'info', expiresAt } = request;

    if (!message || message.trim().length === 0) {
      throw new Error('Announcement message is required');
    }

    if (message.length > 500) {
      throw new Error('Announcement message too long (max 500 characters)');
    }

    const announcementId = await executeInsert(
      `INSERT INTO server_announcements
      (message, type, created_by, created_at, expires_at)
      VALUES (?, ?, ?, ?, ?)`,
      [message.trim(), type, adminUsername, Date.now(), expiresAt || null]
    );

    const announcement: ServerAnnouncement = {
      id: announcementId,
      message,
      type,
      createdBy: adminUsername,
      createdAt: Date.now(),
      expiresAt: expiresAt || null,
    };

    if (io) {
      io.emit('server-announcement', announcement);
      logger.info(`Server announcement sent by ${adminUsername}: ${message}`);
    }

    return announcement;
  }

  /**
   * Get recent announcements
   */
  static async getAnnouncements(limit = 20): Promise<ServerAnnouncement[]> {
    try {
      const result = await executeQuery<{
        id: number;
        message: string;
        type: 'info' | 'warning' | 'critical';
        created_by: string;
        created_at: number;
        expires_at: number | null;
      }>(
        `SELECT id, message, type, created_by, created_at, expires_at
        FROM server_announcements
        ORDER BY created_at DESC
        LIMIT ?`,
        [limit]
      );

      return result.map(row => ({
        id: row.id,
        message: row.message,
        type: row.type,
        createdBy: row.created_by,
        createdAt: row.created_at,
        expiresAt: row.expires_at,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get active (non-expired) announcements
   */
  static async getActiveAnnouncements(): Promise<ServerAnnouncement[]> {
    try {
      const result = await executeQuery<{
        id: number;
        message: string;
        type: 'info' | 'warning' | 'critical';
        created_by: string;
        created_at: number;
        expires_at: number | null;
      }>(
        `SELECT id, message, type, created_by, created_at, expires_at
        FROM server_announcements
        WHERE expires_at IS NULL OR expires_at > ?
        ORDER BY created_at DESC`,
        [Date.now()]
      );

      return result.map(row => ({
        id: row.id,
        message: row.message,
        type: row.type,
        createdBy: row.created_by,
        createdAt: row.created_at,
        expiresAt: row.expires_at,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Delete announcement
   */
  static async deleteAnnouncement(announcementId: number): Promise<boolean> {
    try {
      await executeQuery(
        'DELETE FROM server_announcements WHERE id = ?',
        [announcementId]
      );
      logger.info(`Announcement deleted: ${announcementId}`);
      return true;
    } catch (error) {
      logger.error('Failed to delete announcement:', error);
      return false;
    }
  }

  /**
   * Enable maintenance mode
   */
  static async enableMaintenanceMode(
    message: string,
    adminId: number,
    adminUsername: string
  ): Promise<void> {
    if (!message || message.trim().length === 0) {
      throw new Error('Maintenance message is required');
    }

    const existing = await this.getMaintenanceMode();

    if (existing.enabled) {
      throw new Error('Maintenance mode is already enabled');
    }

    await executeQuery(
      `INSERT INTO maintenance_mode (enabled, message, updated_by, updated_at)
      VALUES (1, ?, ?, ?)`,
      [message.trim(), adminUsername, Date.now()]
    );

    if (io) {
      io.emit('maintenance-mode-enabled', { message });
    }

    logger.info(`Maintenance mode enabled by ${adminUsername}: ${message}`);
  }

  /**
   * Disable maintenance mode
   */
  static async disableMaintenanceMode(
    adminId: number,
    adminUsername: string
  ): Promise<void> {
    await executeQuery(
      `DELETE FROM maintenance_mode WHERE enabled = 1`
    );

    if (io) {
      io.emit('maintenance-mode-disabled', {});
    }

    logger.info(`Maintenance mode disabled by ${adminUsername}`);
  }

  /**
   * Get maintenance mode status
   */
  static async getMaintenanceMode(): Promise<MaintenanceMode> {
    try {
      const result = await executeQueryOne<{
        enabled: number;
        message: string | null;
        updated_by: string;
        updated_at: number;
      }>(
        'SELECT enabled, message, updated_by, updated_at FROM maintenance_mode WHERE enabled = 1 LIMIT 1'
      );

      if (!result) {
        return {
          enabled: false,
          message: null,
          updatedBy: '',
          updatedAt: 0,
        };
      }

      return {
        enabled: result.enabled === 1,
        message: result.message,
        updatedBy: result.updated_by,
        updatedAt: result.updated_at,
      };
    } catch {
      return {
        enabled: false,
        message: null,
        updatedBy: '',
        updatedAt: 0,
      };
    }
  }

  /**
   * Get server status
   */
  static async getServerStatus(): Promise<{
    online: boolean;
    maintenanceMode: boolean;
    uptime: number;
  }> {
    try {
      const maintenance = await this.getMaintenanceMode();

      const uptime = process.uptime();

      return {
        online: true,
        maintenanceMode: maintenance.enabled,
        uptime,
      };
    } catch {
      return {
        online: false,
        maintenanceMode: false,
        uptime: 0,
      };
    }
  }

  /**
   * Clean up expired announcements
   */
  static async cleanupExpiredAnnouncements(): Promise<number> {
    try {
      const result = await executeQuery(
        'DELETE FROM server_announcements WHERE expires_at IS NOT NULL AND expires_at < ?',
        [Date.now()]
      );

      const count = result.length;
      if (count > 0) {
        logger.info(`Cleaned up ${count} expired announcements`);
      }

      return count;
    } catch (error) {
      logger.error('Failed to cleanup expired announcements:', error);
      return 0;
    }
  }
}

export default ServerControlService;
