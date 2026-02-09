/**
 * Admin Routes
 * Admin dashboard API endpoints for statistics, player management, and server control
 */

import { Router } from 'express';
import { StatisticsService } from '../services/admin/statistics-service.js';
import { PlayerService } from '../services/admin/player-service.js';
import { BanService } from '../services/admin/ban-service.js';
import { ServerControlService } from '../services/admin/server-control-service.js';
import { AuditLogService } from '../services/admin/audit-log-service.js';
import { authenticate, requireGameMaster, AuthRequest } from '../middleware/auth-middleware.js';
import { auditLog } from '../middleware/audit-middleware.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { AppError } from '../middleware/error-handler-middleware.js';
import type { BanAccountRequest } from '../types/admin-types.js';

const router = Router();

// =====================================================
// STATISTICS ENDPOINTS
// =====================================================

/**
 * GET /api/admin/statistics
 * Get server statistics overview
 */
router.get(
  '/statistics',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const stats = await StatisticsService.getStatistics();

    res.json({
      status: 'success',
      data: stats,
    });
  })
);

/**
 * GET /api/admin/statistics/online
 * Get online player count
 */
router.get(
  '/statistics/online',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const count = await StatisticsService.getOnlinePlayerCount();

    res.json({
      status: 'success',
      data: { onlinePlayers: count },
    });
  })
);

/**
 * GET /api/admin/statistics/online-by-server
 * Get online players by server
 */
router.get(
  '/statistics/online-by-server',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const servers = await StatisticsService.getOnlinePlayersByServer();

    res.json({
      status: 'success',
      data: { servers },
    });
  })
);

/**
 * GET /api/admin/statistics/registrations
 * Get registration statistics
 */
router.get(
  '/statistics/registrations',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const today = await StatisticsService.getRegistrationsToday();
    const week = await StatisticsService.getRegistrationsWeek();
    const month = await StatisticsService.getRegistrationsMonth();

    res.json({
      status: 'success',
      data: { today, week, month },
    });
  })
);

// =====================================================
// PLAYER MANAGEMENT ENDPOINTS
// =====================================================

/**
 * GET /api/admin/players
 * Search players by username, email, or character name
 */
router.get(
  '/players',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const query = req.query.q as string;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!query) {
      throw new AppError(400, 'Search query is required');
    }

    const players = await PlayerService.searchPlayers(query, limit);

    res.json({
      status: 'success',
      data: { players, count: players.length },
    });
  })
);

/**
 * GET /api/admin/players/:accountId
 * Get player details by account ID
 */
router.get(
  '/players/:accountId',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const accountId = parseInt(req.params.accountId, 10);

    if (isNaN(accountId)) {
      throw new AppError(400, 'Invalid account ID');
    }

    const player = await PlayerService.getPlayerDetails(accountId);

    if (!player) {
      throw new AppError(404, 'Player not found');
    }

    res.json({
      status: 'success',
      data: { player },
    });
  })
);

/**
 * PUT /api/admin/players/:accountId
 * Update account details
 */
router.put(
  '/players/:accountId',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'update_account',
    targetType: 'account',
    getTargetId: (req) => req.params.accountId,
    getDetails: (req) => `Updated account: ${JSON.stringify(req.body)}`,
  }),
  asyncHandler(async (req: AuthRequest, res) => {
    const accountId = parseInt(req.params.accountId, 10);

    if (isNaN(accountId)) {
      throw new AppError(400, 'Invalid account ID');
    }

    const success = await PlayerService.updateAccount(accountId, req.body);

    if (!success) {
      throw new AppError(500, 'Failed to update account');
    }

    res.json({
      status: 'success',
      message: 'Account updated successfully',
    });
  })
);

/**
 * POST /api/admin/players/:accountId/ban
 * Ban an account
 */
router.post(
  '/players/:accountId/ban',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'ban_account',
    targetType: 'ban',
    getTargetId: (req) => req.params.accountId,
    getDetails: (req) => `Ban reason: ${req.body.reason}`,
  }),
  asyncHandler(async (req: AuthRequest, res) => {
    const accountId = parseInt(req.params.accountId, 10);

    if (isNaN(accountId)) {
      throw new AppError(400, 'Invalid account ID');
    }

    const banRequest: BanAccountRequest = {
      accountId,
      reason: req.body.reason,
      duration: req.body.duration,
      durationUnit: req.body.durationUnit,
    };

    await BanService.banAccount(
      banRequest,
      req.auth!.userId,
      req.auth!.username
    );

    res.json({
      status: 'success',
      message: 'Account banned successfully',
    });
  })
);

/**
 * DELETE /api/admin/players/:accountId/ban
 * Unban an account
 */
router.delete(
  '/players/:accountId/ban',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'unban_account',
    targetType: 'ban',
    getTargetId: (req) => req.params.accountId,
    getDetails: () => 'Unbanned account',
  }),
  asyncHandler(async (req: AuthRequest, res) => {
    const accountId = parseInt(req.params.accountId, 10);

    if (isNaN(accountId)) {
      throw new AppError(400, 'Invalid account ID');
    }

    await BanService.unbanAccount(
      accountId,
      req.auth!.userId,
      req.auth!.username
    );

    res.json({
      status: 'success',
      message: 'Account unbanned successfully',
    });
  })
);

// =====================================================
// CHARACTER MANAGEMENT ENDPOINTS
// =====================================================

/**
 * GET /api/admin/characters/:name
 * Get character details by name
 */
router.get(
  '/characters/:name',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const characterName = req.params.name;

    if (!characterName) {
      throw new AppError(400, 'Character name is required');
    }

    const character = await PlayerService.getCharacterDetails(characterName);

    if (!character) {
      throw new AppError(404, 'Character not found');
    }

    res.json({
      status: 'success',
      data: { character },
    });
  })
);

/**
 * PUT /api/admin/characters/:name
 * Update character stats
 */
router.put(
  '/characters/:name',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'update_character',
    targetType: 'character',
    getTargetId: (req) => req.params.name,
    getDetails: (req) => `Updated: ${JSON.stringify(req.body)}`,
  }),
  asyncHandler(async (req: AuthRequest, res) => {
    const characterName = req.params.name;

    if (!characterName) {
      throw new AppError(400, 'Character name is required');
    }

    await PlayerService.updateCharacter(characterName, req.body);

    res.json({
      status: 'success',
      message: 'Character updated successfully',
    });
  })
);

/**
 * GET /api/admin/bans
 * Get all banned accounts
 */
router.get(
  '/bans',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 100;
    const bans = await BanService.getBannedAccounts(limit);

    res.json({
      status: 'success',
      data: { bans, count: bans.length },
    });
  })
);

// =====================================================
// SERVER CONTROL ENDPOINTS
// =====================================================

/**
 * POST /api/admin/announcements
 * Send server announcement
 */
router.post(
  '/announcements',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'send_announcement',
    targetType: 'announcement',
    getTargetId: (req) => 'broadcast',
    getDetails: (req) => `Message: ${req.body.message}`,
  }),
  asyncHandler(async (req: AuthRequest, res) => {
    const message = req.body.message;
    const type = req.body.type || 'info';
    const expiresAt = req.body.expiresAt || null;

    if (!message) {
      throw new AppError(400, 'Message is required');
    }

    const announcement = await ServerControlService.sendAnnouncement(
      { message, type, expiresAt },
      req.auth!.userId,
      req.auth!.username
    );

    res.json({
      status: 'success',
      data: { announcement },
    });
  })
);

/**
 * GET /api/admin/announcements
 * Get recent announcements
 */
router.get(
  '/announcements',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 20;
    const announcements = await ServerControlService.getAnnouncements(limit);

    res.json({
      status: 'success',
      data: { announcements, count: announcements.length },
    });
  })
);

/**
 * DELETE /api/admin/announcements/:id
 * Delete announcement
 */
router.delete(
  '/announcements/:id',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'delete_announcement',
    targetType: 'announcement',
    getTargetId: (req) => req.params.id,
    getDetails: () => 'Deleted announcement',
  }),
  asyncHandler(async (req, res) => {
    const announcementId = parseInt(req.params.id, 10);

    if (isNaN(announcementId)) {
      throw new AppError(400, 'Invalid announcement ID');
    }

    await ServerControlService.deleteAnnouncement(announcementId);

    res.json({
      status: 'success',
      message: 'Announcement deleted successfully',
    });
  })
);

/**
 * PUT /api/admin/server/maintenance
 * Toggle maintenance mode
 */
router.put(
  '/server/maintenance',
  authenticate,
  requireGameMaster,
  auditLog({
    action: 'toggle_maintenance',
    targetType: 'server',
    getTargetId: () => 'server',
    getDetails: (req) => `Maintenance mode: ${req.body.enabled ? 'enabled' : 'disabled'}`,
  }),
  asyncHandler(async (req: AuthRequest, res) => {
    const { enabled, message } = req.body;

    if (enabled) {
      if (!message) {
        throw new AppError(400, 'Maintenance message is required');
      }
      await ServerControlService.enableMaintenanceMode(
        message,
        req.auth!.userId,
        req.auth!.username
      );
    } else {
      await ServerControlService.disableMaintenanceMode(
        req.auth!.userId,
        req.auth!.username
      );
    }

    res.json({
      status: 'success',
      message: `Maintenance mode ${enabled ? 'enabled' : 'disabled'} successfully`,
    });
  })
);

/**
 * GET /api/admin/server/maintenance
 * Get maintenance mode status
 */
router.get(
  '/server/maintenance',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const status = await ServerControlService.getMaintenanceMode();

    res.json({
      status: 'success',
      data: { maintenanceMode: status },
    });
  })
);

/**
 * GET /api/admin/server/status
 * Get server status
 */
router.get(
  '/server/status',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const status = await ServerControlService.getServerStatus();

    res.json({
      status: 'success',
      data: { serverStatus: status },
    });
  })
);

// =====================================================
// AUDIT LOG ENDPOINTS
// =====================================================

/**
 * GET /api/admin/audit-logs
 * Get audit logs with filters
 */
router.get(
  '/audit-logs',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const query: any = {};

    if (req.query.adminId) {
      query.adminId = parseInt(req.query.adminId as string, 10);
    }

    if (req.query.action) {
      query.action = req.query.action as string;
    }

    if (req.query.targetType) {
      query.targetType = req.query.targetType as string;
    }

    if (req.query.limit) {
      query.limit = parseInt(req.query.limit as string, 10);
    }

    if (req.query.offset) {
      query.offset = parseInt(req.query.offset as string, 10);
    }

    const result = await AuditLogService.getAuditLogs(query);

    res.json({
      status: 'success',
      data: result,
    });
  })
);

/**
 * GET /api/admin/audit-logs/recent
 * Get recent admin activity
 */
router.get(
  '/audit-logs/recent',
  authenticate,
  requireGameMaster,
  asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 20;
    const logs = await AuditLogService.getRecentActivity(limit);

    res.json({
      status: 'success',
      data: { logs, count: logs.length },
    });
  })
);

export { router as adminRouter };
export default router;
