-- Migration 003: Add deleted_at column to chat_messages
-- Purpose: Support soft deletion of chat messages
-- Created: 2026-02-09

ALTER TABLE chat_messages 
ADD COLUMN IF NOT EXISTS deleted_at BIGINT DEFAULT NULL,
ADD INDEX IF NOT EXISTS idx_deleted_at (deleted_at);
