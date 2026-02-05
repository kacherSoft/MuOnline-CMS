-- Server Settings Table
-- Stores server configuration including download links
CREATE TABLE IF NOT EXISTS server_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(20) NOT NULL DEFAULT 'string',
  category VARCHAR(50) NOT NULL DEFAULT 'general',
  description TEXT,
  updated_at BIGINT NOT NULL,
  INDEX idx_key (setting_key),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default download settings
INSERT INTO server_settings (setting_key, setting_value, setting_type, category, description, updated_at) VALUES
('download_title', 'Download Game Client', 'string', 'download', 'Download page title', UNIX_TIMESTAMP() * 1000),
('download_description', 'Download the Mu Kacher Season 19.2 game client and start your adventure!', 'string', 'download', 'Download page description', UNIX_TIMESTAMP() * 1000),
('download_drive_link', 'https://drive.google.com/your-link-here', 'string', 'download', 'Google Drive download link', UNIX_TIMESTAMP() * 1000),
('download_file_size', '2.5 GB', 'string', 'download', 'File size display', UNIX_TIMESTAMP() * 1000),
('download_version', '1.0.0', 'string', 'download', 'Client version', UNIX_TIMESTAMP() * 1000);
