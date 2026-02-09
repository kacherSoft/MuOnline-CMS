/**
 * Chat Service
 * Business logic for chat message persistence and retrieval
 */

import type { ChatMessage, ChatHistoryRequest } from '../types/socket-events.js';
import { executeQuery, executeInsert } from '../lib/mysql-connection-pool.js';
import { logger } from '../utils/winston-logger.js';

// =====================================================
// CONSTANTS
// =====================================================

const MAX_MESSAGE_LENGTH = 500;
const DEFAULT_HISTORY_LIMIT = 50;
const MAX_HISTORY_LIMIT = 100;

// =====================================================
// SERVICE FUNCTIONS
// =====================================================

/**
 * Save a chat message to the database
 */
export async function saveChatMessage(data: {
  accountId: number;
  characterName: string | null;
  message: string;
  channel: string;
  messageType?: 'text' | 'image' | 'system';
}): Promise<ChatMessage> {
  const { accountId, characterName, message, channel, messageType = 'text' } = data;

  // Validate message length
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`);
  }

  // Sanitize message (basic HTML escaping)
  const sanitizedMessage = escapeHtml(message);

  const createdAt = Date.now();

  try {
    const insertId = await executeInsert(
      `INSERT INTO chat_messages (account_id, character_name, message, message_type, channel, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [accountId, characterName, sanitizedMessage, messageType, channel, createdAt]
    );

    return {
      id: insertId,
      accountId,
      characterName,
      message: sanitizedMessage,
      messageType,
      channel,
      createdAt,
    };
  } catch (error) {
    logger.error('Error saving chat message:', error);
    throw new Error('Failed to save message');
  }
}

/**
 * Retrieve chat history from database
 */
export async function getChatHistory(
  request: ChatHistoryRequest = {}
): Promise<ChatMessage[]> {
  const { channel = 'global', limit = DEFAULT_HISTORY_LIMIT, before } = request;

  // Validate limit
  const validLimit = Math.min(Math.max(1, limit), MAX_HISTORY_LIMIT);

  try {
    let query = `
      SELECT id, account_id, character_name, message, message_type, channel, created_at
      FROM chat_messages
      WHERE channel = ?
    `;
    const params: any[] = [channel];

    if (before) {
      query += ' AND created_at < ?';
      params.push(before);
    }

    query += ` ORDER BY created_at DESC LIMIT ${Number(validLimit)}`;


    const rows = await executeQuery<any>(query, params);

    return rows.reverse().map(row => ({
      id: row.id,
      accountId: row.account_id,
      characterName: row.character_name,
      message: row.message,
      messageType: row.message_type,
      channel: row.channel,
      createdAt: row.created_at,
    }));
  } catch (error) {
    logger.error('Error retrieving chat history:', error);
    throw new Error('Failed to retrieve chat history');
  }
}

/**
 * Get message count for rate limiting
 */
export async function getUserMessageCount(
  accountId: number,
  since: number
): Promise<number> {
  try {
    const rows = await executeQuery<{ count: number }>(
      `SELECT COUNT(*) as count FROM chat_messages
       WHERE account_id = ? AND created_at > ?`,
      [accountId, since]
    );

    return rows[0]?.count || 0;
  } catch (error) {
    logger.error('Error getting user message count:', error);
    return 0;
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Validate message content
 */
export function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message || message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` };
  }

  // Check for excessive whitespace
  if (message.trim().length !== message.length && /\s{10,}/.test(message)) {
    return { valid: false, error: 'Message contains excessive whitespace' };
  }

  return { valid: true };
}
