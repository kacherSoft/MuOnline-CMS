-- Maintenance Mode Table
-- Stores server maintenance mode status

CREATE TABLE IF NOT EXISTS maintenance_mode (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  message TEXT NOT NULL,
  updated_by VARCHAR(50) NOT NULL,
  updated_at BIGINT NOT NULL COMMENT 'Unix timestamp in milliseconds',
  INDEX idx_enabled (enabled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Server maintenance mode status';
