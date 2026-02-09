/**
 * Audit Middleware
 * Logs all admin actions to the audit log
 */

import type { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { AuditLogService } from '../services/admin/audit-log-service.js';
import type { AuthRequest } from './auth-middleware.js';

interface AuditOptions {
  action: string;
  targetType: 'account' | 'character' | 'server' | 'announcement' | 'ban';
  getTargetId?: (req: Request) => string;
  getDetails?: (req: Request, res: Response) => string;
}

/**
 * Create audit middleware for specific actions
 */
export const auditLog = (options: AuditOptions) => {
  return asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (data) {
      res.send = originalSend;

      if (res.statusCode >= 200 && res.statusCode < 300 && req.auth) {
        const targetId = options.getTargetId ? options.getTargetId(req) : req.params.id || req.params.accountId || 'unknown';
        const details = options.getDetails ? options.getDetails(req, res) : `${req.method} ${req.path}`;

        AuditLogService.logAction({
          adminId: req.auth.userId,
          adminUsername: req.auth.username,
          action: options.action,
          targetType: options.targetType,
          targetId: String(targetId),
          details,
          ipAddress: getClientIp(req),
        }).catch(err => console.error('Audit log failed:', err));
      }

      return originalSend.call(this, data);
    };

    next();
  });
};

/**
 * Generic audit middleware that logs all requests to admin routes
 */
export const auditAll = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  res.send = function (data) {
    res.send = originalSend;

    if (res.statusCode >= 200 && res.statusCode < 300 && req.auth) {
      const action = `${req.method.toLowerCase()}_${req.route?.path?.split('/').pop() || req.path}`;
      const targetType = getTargetTypeFromPath(req.path);

      AuditLogService.logAction({
        adminId: req.auth.userId,
        adminUsername: req.auth.username,
        action,
        targetType,
        targetId: req.params.id || req.params.accountId || req.params.name || 'unknown',
        details: `${req.method} ${req.path}`,
        ipAddress: getClientIp(req),
      }).catch(err => console.error('Audit log failed:', err));
    }

    return originalSend.call(this, data);
  };

  next();
});

function getTargetTypeFromPath(path: string): 'account' | 'character' | 'server' | 'announcement' | 'ban' {
  if (path.includes('/players') || path.includes('/accounts')) {
    return 'account';
  }
  if (path.includes('/characters')) {
    return 'character';
  }
  if (path.includes('/server') || path.includes('/maintenance')) {
    return 'server';
  }
  if (path.includes('/announcements')) {
    return 'announcement';
  }
  if (path.includes('/ban')) {
    return 'ban';
  }
  return 'server';
}

function getClientIp(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || (req.headers['x-real-ip'] as string)
    || req.socket.remoteAddress
    || 'unknown';
}

export default { auditLog, auditAll };
