/**
 * Server Settings Service
 * Manages server configuration settings (download links, etc.)
 */

import { executeQuery } from '../lib/mysql-connection-pool.js';

export interface ServerSetting {
  id: number;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  category: string;
  description: string | null;
  updated_at: number;
}

export interface DownloadSettings {
  download_title: string;
  download_description: string;
  download_drive_link: string;
  download_file_size: string;
  download_version: string;
}

export class ServerSettingsService {
  /**
   * Get a single setting by key
   */
  static async getSetting(key: string): Promise<string | null> {
    const result = await executeQuery<{ setting_value: string }>(
      'SELECT setting_value FROM server_settings WHERE setting_key = ?',
      [key]
    );
    return result[0]?.setting_value || null;
  }

  /**
   * Get multiple settings by keys
   */
  static async getSettings(keys: string[]): Promise<Record<string, string>> {
    const placeholders = keys.map(() => '?').join(',');
    const result = await executeQuery<{ setting_key: string; setting_value: string }>(
      `SELECT setting_key, setting_value FROM server_settings WHERE setting_key IN (${placeholders})`,
      keys
    );

    const settings: Record<string, string> = {};
    for (const row of result) {
      settings[row.setting_key] = row.setting_value || '';
    }
    return settings;
  }

  /**
   * Get all settings in a category
   */
  static async getSettingsByCategory(category: string): Promise<ServerSetting[]> {
    return await executeQuery<ServerSetting>(
      'SELECT * FROM server_settings WHERE category = ? ORDER BY setting_key',
      [category]
    );
  }

  /**
   * Get download settings
   */
  static async getDownloadSettings(): Promise<DownloadSettings> {
    const keys = ['download_title', 'download_description', 'download_drive_link', 'download_file_size', 'download_version'];
    const settings = await this.getSettings(keys);

    return {
      download_title: settings.download_title || 'Download Game Client',
      download_description: settings.download_description || '',
      download_drive_link: settings.download_drive_link || '',
      download_file_size: settings.download_file_size || '',
      download_version: settings.download_version || '',
    };
  }

  /**
   * Update a setting
   */
  static async updateSetting(key: string, value: string): Promise<void> {
    await executeQuery(
      'UPDATE server_settings SET setting_value = ?, updated_at = ? WHERE setting_key = ?',
      [value, Date.now(), key]
    );
  }

  /**
   * Update multiple settings
   */
  static async updateSettings(settings: Record<string, string>): Promise<void> {
    const timestamp = Date.now();
    for (const [key, value] of Object.entries(settings)) {
      await executeQuery(
        'UPDATE server_settings SET setting_value = ?, updated_at = ? WHERE setting_key = ?',
        [value, timestamp, key]
      );
    }
  }

  /**
   * Update download settings
   */
  static async updateDownloadSettings(data: Partial<DownloadSettings>): Promise<void> {
    const updates: Record<string, string> = {};
    if (data.download_title !== undefined) updates.download_title = data.download_title;
    if (data.download_description !== undefined) updates.download_description = data.download_description;
    if (data.download_drive_link !== undefined) updates.download_drive_link = data.download_drive_link;
    if (data.download_file_size !== undefined) updates.download_file_size = data.download_file_size;
    if (data.download_version !== undefined) updates.download_version = data.download_version;

    await this.updateSettings(updates);
  }
}
