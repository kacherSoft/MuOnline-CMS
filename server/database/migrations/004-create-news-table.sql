-- Migration 004: Create news table
-- Purpose: Store server news and announcements with admin management
-- Created: Phase 06 - Page Structure & Authentication

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  author_name VARCHAR(50) NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  INDEX idx_published (is_published),
  INDEX idx_created_at (created_at),
  INDEX idx_author_id (author_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
