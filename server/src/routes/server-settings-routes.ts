/**
 * Server Settings Routes
 * API endpoints for managing server configuration (download settings, etc.)
 * Admin-only (Game Master required)
 */

import { Router } from 'express';
import { ServerSettingsService } from '../services/server-settings-service';
import { authenticate, requireGameMaster, optionalAuthenticate } from '../middleware/auth-middleware';
import { AuthRequest } from '../middleware/auth-middleware';

const router = Router();

/**
 * Validation schemas
 */
const MAX_STRING_LENGTH = 500;
const MAX_URL_LENGTH = 2048;

function validateDownloadSettings(data: any): { valid: boolean; error?: string } {
  const { download_title, download_description, download_drive_link, download_file_size, download_version } = data;

  // Validate title
  if (download_title !== undefined) {
    if (typeof download_title !== 'string') return { valid: false, error: 'download_title must be a string' };
    if (download_title.length > MAX_STRING_LENGTH) return { valid: false, error: 'download_title too long' };
  }

  // Validate description
  if (download_description !== undefined) {
    if (typeof download_description !== 'string') return { valid: false, error: 'download_description must be a string' };
    if (download_description.length > 1000) return { valid: false, error: 'download_description too long' };
  }

  // Validate drive link
  if (download_drive_link !== undefined) {
    if (typeof download_drive_link !== 'string') return { valid: false, error: 'download_drive_link must be a string' };
    if (download_drive_link.length > MAX_URL_LENGTH) return { valid: false, error: 'download_drive_link too long' };
    if (download_drive_link && !download_drive_link.match(/^https?:\/\//i)) {
      return { valid: false, error: 'download_drive_link must be a valid URL' };
    }
  }

  // Validate file size
  if (download_file_size !== undefined) {
    if (typeof download_file_size !== 'string') return { valid: false, error: 'download_file_size must be a string' };
    if (download_file_size.length > 50) return { valid: false, error: 'download_file_size too long' };
  }

  // Validate version
  if (download_version !== undefined) {
    if (typeof download_version !== 'string') return { valid: false, error: 'download_version must be a string' };
    if (download_version.length > 50) return { valid: false, error: 'download_version too long' };
  }

  return { valid: true };
}

/**
 * GET /api/server-settings/download
 * Get download settings (public)
 */
router.get('/download', optionalAuthenticate, async (req, res, next) => {
  try {
    const settings = await ServerSettingsService.getDownloadSettings();
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/server-settings/download
 * Update download settings (admin only)
 */
router.patch('/download', authenticate, requireGameMaster, async (req: AuthRequest, res, next) => {
  try {
    // Validate input
    const validation = validateDownloadSettings(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { download_title, download_description, download_drive_link, download_file_size, download_version } = req.body;

    await ServerSettingsService.updateDownloadSettings({
      download_title,
      download_description,
      download_drive_link,
      download_file_size,
      download_version,
    });

    const updated = await ServerSettingsService.getDownloadSettings();
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/server-settings/category/:category
 * Get all settings in a category (admin only)
 */
router.get('/category/:category', authenticate, requireGameMaster, async (req: AuthRequest, res, next) => {
  try {
    const { category } = req.params;
    const settings = await ServerSettingsService.getSettingsByCategory(category);
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

export default router;
