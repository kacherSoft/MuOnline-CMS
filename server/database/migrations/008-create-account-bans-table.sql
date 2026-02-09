-- Account Bans Table
-- Tracks banned accounts with reasons and expiration

CREATE TABLE IF NOT EXISTS account_bans (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  account_id INT UNSIGNED NOT NULL,
  ban_reason VARCHAR(500) NOT NULL,
  ban_date BIGINT NOT NULL COMMENT 'Unix timestamp in milliseconds',
  expires_at BIGINT DEFAULT NULL COMMENT 'Unix timestamp in milliseconds, NULL = permanent',
  banned_by VARCHAR(50) NOT NULL,
  created_at BIGINT NOT NULL COMMENT 'Unix timestamp in milliseconds',
  UNIQUE KEY uk_account_id (account_id),
  INDEX idx_ban_date (ban_date),
  INDEX idx_expires_at (expires_at),
  FOREIGN KEY (account_id) REFERENCES accounts(guid) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Account ban records with reasons and expiration times';
