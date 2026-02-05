-- Migration 001: Create chat_messages table
-- Purpose: Store all chat messages for persistence and history
-- Created: Phase 01 - Database Layer

CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  character_name VARCHAR(50) DEFAULT NULL,
  message TEXT NOT NULL,
  message_type ENUM('text', 'image', 'system') DEFAULT 'text',
  channel VARCHAR(50) DEFAULT 'global',
  created_at BIGINT NOT NULL,
  INDEX idx_created_at (created_at),
  INDEX idx_channel (channel),
  INDEX idx_account_id (account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
