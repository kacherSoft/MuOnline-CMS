-- Rollback 003: Remove deleted_at column from chat_messages
-- Purpose: Rollback soft deletion support

ALTER TABLE chat_messages 
DROP INDEX IF EXISTS idx_deleted_at,
DROP COLUMN IF EXISTS deleted_at;
