/**
 * Chat Routes
 * REST API endpoints for chat history and online users
 */

import { Router } from 'express';
import { getChatHistory } from '../services/chat-service.js';
import { getOnlineUsers, getOnlineUserCount } from '../services/online-users-service.js';
import { asyncHandler } from '../utils/async-handler-wrapper.js';
import { logger } from '../utils/winston-logger.js';

const router = Router();

// =====================================================
// GET /api/chat/history - Get chat history
// =====================================================

router.get('/history', asyncHandler(async (req, res) => {
  const { channel = 'global', limit = '50', before } = req.query;

  const messages = await getChatHistory({
    channel: channel as string,
    limit: parseInt(limit as string) || 50,
    before: before ? parseInt(before as string) : undefined,
  });

  res.json({
    success: true,
    data: messages,
    count: messages.length,
  });

  logger.debug(`Chat history retrieved: ${messages.length} messages from ${channel}`);
}));

// =====================================================
// GET /api/chat/online-users - Get online users list
// =====================================================

router.get('/online-users', asyncHandler(async (req, res) => {
  const users = await getOnlineUsers();

  res.json({
    success: true,
    data: users,
    count: users.length,
  });

  logger.debug(`Online users retrieved: ${users.length} users`);
}));

// =====================================================
// GET /api/chat/online-count - Get online user count
// =====================================================

router.get('/online-count', asyncHandler(async (req, res) => {
  const count = await getOnlineUserCount();

  res.json({
    success: true,
    data: { count },
  });

  logger.debug(`Online count retrieved: ${count}`);
}));

// =====================================================
// GET /api/channels - Get available channels
// =====================================================

router.get('/channels', asyncHandler(async (_req, res) => {
  // For now, return static channel list
  // In the future, this could be dynamic based on guilds, etc.
  const channels = [
    { id: 'global', name: 'Global Chat', description: 'Chat with all online players' },
    // Future: Guild channels will be added here
    // { id: 'guild', name: 'Guild Chat', description: 'Chat with your guild members' },
  ];

  res.json({
    success: true,
    data: channels,
  });
}));

export default router;
