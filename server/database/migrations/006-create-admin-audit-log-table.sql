-- Admin Audit Log Table
-- Tracks all admin actions for security and compliance

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id INT UNSIGNED NOT NULL,
  admin_username VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50) NOT NULL COMMENT 'account, character, server, announcement, ban',
  target_id VARCHAR(50) NOT NULL,
  details TEXT NOT NULL,
  ip_address VARCHAR(50) NOT NULL,
  created_at BIGINT NOT NULL COMMENT 'Unix timestamp in milliseconds',
  INDEX idx_admin_id (admin_id),
  INDEX idx_action (action),
  INDEX idx_target_type (target_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Admin audit log for tracking all administrative actions';
