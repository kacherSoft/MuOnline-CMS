-- Server Announcements Table
-- Stores server-wide announcements sent by admins

CREATE TABLE IF NOT EXISTS server_announcements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  type ENUM('info', 'warning', 'critical') NOT NULL DEFAULT 'info',
  created_by VARCHAR(50) NOT NULL,
  created_at BIGINT NOT NULL COMMENT 'Unix timestamp in milliseconds',
  expires_at BIGINT DEFAULT NULL COMMENT 'Unix timestamp in milliseconds, NULL = no expiry',
  INDEX idx_created_at (created_at),
  INDEX idx_expires_at (expires_at),
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Server announcements broadcast to all players';
