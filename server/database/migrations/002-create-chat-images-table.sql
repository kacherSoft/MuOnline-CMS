-- Migration 002: Create chat_images table
-- Purpose: Store metadata for images uploaded to chat
-- Created: Phase 01 - Database Layer

CREATE TABLE IF NOT EXISTS chat_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  size INT,
  mime_type VARCHAR(100),
  uploaded_at BIGINT NOT NULL,
  INDEX idx_account_id (account_id),
  INDEX idx_uploaded_at (uploaded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
