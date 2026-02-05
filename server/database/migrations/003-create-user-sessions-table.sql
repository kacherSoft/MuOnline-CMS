-- Migration 003: Create user_sessions table
-- Purpose: Store JWT session tokens for authentication
-- Created: Phase 01 - Database Layer

CREATE TABLE IF NOT EXISTS user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  refresh_token VARCHAR(255) DEFAULT NULL,
  expires_at BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  INDEX idx_token (token),
  INDEX idx_account_id (account_id),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
