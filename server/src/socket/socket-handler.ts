/**
 * Socket Event Handlers
 * Handle all Socket.io chat events
 */

import type { ChatSocketServer } from './socket-server.js';
import type { Socket } from 'socket.io';
import type { ClientToServerEvents, OnlineUser, TypingData } from '../types/socket-events.js';
import { saveChatMessage, getChatHistory, validateMessage } from '../services/chat-service.js';
import { addOnlineUser, getOnlineUsers, getOnlineUserCount } from '../services/online-users-service.js';
import { logger } from '../utils/winston-logger.js';
import { getRedisClient } from '../lib/redis-client.js';

// =====================================================
// CHANNEL VALIDATION
// =====================================================

const ALLOWED_CHANNELS = ['global', 'trade', 'support'];
const MAX_CHANNEL_LENGTH = 50;

function isValidChannel(channel: string): boolean {
  if (!channel || typeof channel !== 'string') return false;
  if (channel.length > MAX_CHANNEL_LENGTH) return false;
  return ALLOWED_CHANNELS.includes(channel);
}

// =====================================================
// RATE LIMITING
// =====================================================

const MESSAGE_RATE_LIMIT = 10;
const MESSAGE_RATE_WINDOW = 60 * 1000;
const userMessageCounts = new Map<number, { count: number; resetTime: number }>();

function checkMessageRateLimit(accountId: number): boolean {
  const now = Date.now();
  const entry = userMessageCounts.get(accountId);

  if (!entry || now > entry.resetTime) {
    userMessageCounts.set(accountId, { count: 1, resetTime: now + MESSAGE_RATE_WINDOW });
    return true;
  }

  if (entry.count >= MESSAGE_RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// Clean up expired rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [userId, entry] of userMessageCounts.entries()) {
      if (now > entry.resetTime) {
        userMessageCounts.delete(userId);
      }
    }
  }, 60 * 1000);
}

// =====================================================
// TYPING STATE (Redis-backed for distributed scaling)
// =====================================================

const TYPING_TTL_SECONDS = 3;
const TYPING_KEY_PREFIX = 'chat:typing:';

/**
 * Clear typing state in Redis for user
 */
async function clearTypingState(socketId: string) {
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.del(`${TYPING_KEY_PREFIX}${socketId}`);
    } catch (error) {
      logger.error('Failed to clear typing state:', error);
    }
  }
}

// =====================================================
// EVENT HANDLERS
// =====================================================

/**
 * Register all chat event handlers for a socket
 */
export function registerChatHandlers(io: ChatSocketServer, socket: Socket) {
  const user = socket.data.user;
  if (!user) return;

  // =====================================================
  // CONNECTION HANDLING
  // =====================================================

  // Add user to online list and broadcast
  (async () => {
    const onlineUser: OnlineUser = {
      accountId: user.accountId,
      characterName: user.username,
      socketId: socket.id,
      joinedAt: Date.now(),
    };

    await addOnlineUser(onlineUser);

    const count = await getOnlineUserCount();
    io.emit('chat:online-count', count);

    const users = await getOnlineUsers();
    io.emit('chat:online-users', users);

    socket.emit('chat:system', `Welcome to the chat, ${user.username}!`);

    logger.debug(`User added to online list: ${user.username}`);
  })().catch(error => {
    logger.error('Error during connection setup:', error);
  });

  // Join default global channel
  socket.join('global');

  // =====================================================
  // CHAT:SEND - Send a message
  // =====================================================

  socket.on('chat:send', async (data, callback) => {
    try {
      const { message, channel = 'global', characterName } = data;

      if (typeof message !== 'string') {
        if (typeof callback === 'function') callback({ success: false, error: 'Message must be a string' });
        return;
      }

      // Validate message
      const validation = validateMessage(message);
      if (!validation.valid) {
        if (typeof callback === 'function') callback({ success: false, error: validation.error });
        return;
      }

      if (!isValidChannel(channel)) {
        if (typeof callback === 'function') callback({ success: false, error: 'Invalid channel' });
        return;
      }

      if (!socket.rooms.has(channel)) {
        if (typeof callback === 'function') callback({ success: false, error: 'You must join the channel first' });
        return;
      }

      if (!checkMessageRateLimit(user.accountId)) {
        if (typeof callback === 'function') callback({ success: false, error: 'Rate limit exceeded. Please wait before sending more messages.' });
        return;
      }

      const savedMessage = await saveChatMessage({
        accountId: user.accountId,
        characterName: user.username,
        message,
        channel,
        messageType: 'text',
      });

      socket.broadcast.to(channel).emit('chat:message', savedMessage);

      if (typeof callback === 'function') callback({ success: true, message: savedMessage });

      logger.debug(`Message sent by ${user.username} in ${channel}`);
    } catch (error) {
      logger.error('Error handling chat:send:', error);
      if (typeof callback === 'function') callback({ success: false, error: 'Failed to send message' });
    }
  });

  // =====================================================
  // CHAT:HISTORY - Get message history
  // =====================================================

  socket.on('chat:history', async (request, callback) => {
    try {
      const { channel = 'global', limit = 50 } = request;

      const messages = await getChatHistory({ channel, limit });

      if (typeof callback === 'function') callback({ success: true, messages });

      logger.debug(`Chat history sent to ${user.username} (${messages.length} messages)`);
    } catch (error) {
      logger.error('Error handling chat:history:', error);
      if (typeof callback === 'function') callback({ success: false, error: 'Failed to retrieve history' });
    }
  });

  // =====================================================
  // CHAT:TYPING - Broadcast typing status
  // =====================================================

  socket.on('chat:typing', async (data: TypingData) => {
    const typingBroadcast = {
      characterName: user.username,
      isTyping: data.isTyping,
      accountId: user.accountId,
      username: user.username,
    };
    socket.broadcast.emit('chat:typing', typingBroadcast);

    const redis = getRedisClient();
    if (redis && data.isTyping) {
      try {
        await redis.setEx(
          `${TYPING_KEY_PREFIX}${socket.id}`,
          TYPING_TTL_SECONDS,
          JSON.stringify(typingBroadcast)
        );
      } catch (error) {
        logger.error('Failed to store typing state:', error);
      }
    } else if (!data.isTyping) {
      await clearTypingState(socket.id);
    }
  });

  // =====================================================
  // CHAT:JOIN - Join a channel
  // =====================================================

  socket.on('chat:join', (channelArg: string | { channelId: string }, callback?: (response: { success: boolean; error?: string }) => void) => {
    try {
      const channel = typeof channelArg === 'string' ? channelArg : channelArg.channelId;
      if (!isValidChannel(channel)) {
        if (typeof callback === 'function') callback({ success: false, error: 'Invalid channel' });
        return;
      }

      const alreadyInChannel = socket.rooms.has(channel);
      socket.join(channel);

      if (!alreadyInChannel) {
        socket.to(channel).emit('chat:user-joined', {
          characterName: user.username,
          channel,
        });
      }

      if (typeof callback === 'function') callback({ success: true });

      logger.debug(`${user.username} joined channel: ${channel}`);
    } catch (error) {
      logger.error('Error handling chat:join:', error);
      if (typeof callback === 'function') callback({ success: false, error: 'Failed to join channel' });
    }
  });

  // =====================================================
  // CHAT:LEAVE - Leave a channel
  // =====================================================

  socket.on('chat:leave', (channelArg: string | { channelId: string }, callback?: (response: { success: boolean; error?: string }) => void) => {
    try {
      const channel = typeof channelArg === 'string' ? channelArg : channelArg.channelId;
      if (!isValidChannel(channel)) {
        if (typeof callback === 'function') callback({ success: false, error: 'Invalid channel' });
        return;
      }
      socket.leave(channel);

      socket.to(channel).emit('chat:user-left', {
        characterName: user.username,
        channel,
      });

      if (typeof callback === 'function') callback({ success: true });

      logger.debug(`${user.username} left channel: ${channel}`);
    } catch (error) {
      logger.error('Error handling chat:leave:', error);
      if (typeof callback === 'function') callback({ success: false, error: 'Failed to leave channel' });
    }
  });

  // =====================================================
  // CHAT:DELETE - Delete a message
  // =====================================================

  socket.on('chat:delete', async (data, callback) => {
    try {
      const { messageId } = data;

      if (typeof messageId !== 'number') {
        if (typeof callback === 'function') callback({ success: false, error: 'Invalid message ID' });
        return;
      }

      const { deleteMessage } = await import('../services/chat-service.js');
      const result = await deleteMessage(messageId, user.accountId);

      if (!result.success) {
        if (typeof callback === 'function') callback({ success: false, error: result.error });
        return;
      }

      // Broadcast deletion to all users in all channels
      // Since we don't track which channel the message was in, broadcast to all
      io.emit('chat:message-deleted', { messageId, channel: 'global' });

      if (typeof callback === 'function') callback({ success: true });

      logger.debug(`Message ${messageId} deleted by ${user.username} via socket`);
    } catch (error) {
      logger.error('Error handling chat:delete:', error);
      if (typeof callback === 'function') callback({ success: false, error: 'Failed to delete message' });
    }
  });

  // =====================================================
  // DISCONNECT CLEANUP
  // =====================================================

  socket.on('disconnect', async () => {
    await clearTypingState(socket.id);
  });
}
