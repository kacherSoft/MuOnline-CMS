/**
 * Socket Event Type Definitions
 * Type-safe Socket.io event names and payloads
 */

import type { Socket } from 'socket.io/dist/index';

// =====================================================
// INTERFACES
// =====================================================

/**
 * Chat message data structure
 */
export interface ChatMessage {
  id: number;
  accountId: number;
  characterName: string | null;
  message: string;
  messageType: 'text' | 'image' | 'system';
  channel: string;
  createdAt: number;
}

/**
 * User authentication data from JWT
 */
export interface SocketAuthData {
  accountId: number;
  username: string;
  characterName?: string;
}

/**
 * Extended Socket with auth data
 */
export interface AuthenticatedSocket extends Socket {
  data: {
    user: SocketAuthData;
  };
}

/**
 * Typing indicator data
 */
export interface TypingData {
  characterName: string;
  isTyping: boolean;
}

/**
 * Online user info
 */
export interface OnlineUser {
  accountId: number;
  characterName: string | null;
  socketId: string;
  joinedAt: number;
}

/**
 * Chat history request
 */
export interface ChatHistoryRequest {
  channel?: string;
  limit?: number;
  before?: number;
}

/**
 * Error response
 */
export interface SocketError {
  message: string;
  code?: string;
}

// =====================================================
// CLIENT → SERVER EVENTS
// =====================================================

export interface ClientToServerEvents {
  /**
   * Send a chat message
   */
  'chat:send': (data: {
    message: string;
    channel?: string;
    characterName?: string;
  }, callback: (response: { success: boolean; message?: ChatMessage; error?: string }) => void) => void;

  /**
   * Request chat history
   */
  'chat:history': (request: ChatHistoryRequest, callback: (response: { success: boolean; messages?: ChatMessage[]; error?: string }) => void) => void;

  /**
   * Broadcast typing status
   */
  'chat:typing': (data: TypingData) => void;

  /**
   * Join a chat channel
   */
  'chat:join': (channel: string, callback: (response: { success: boolean; error?: string }) => void) => void;

  /**
   * Leave a chat channel
   */
  'chat:leave': (channel: string, callback: (response: { success: boolean; error?: string }) => void) => void;
}

// =====================================================
// SERVER → CLIENT EVENTS
// =====================================================

export interface ServerToClientEvents {
  /**
   * New chat message received
   */
  'chat:message': (message: ChatMessage) => void;

  /**
   * User typing status
   */
  'chat:typing': (data: TypingData) => void;

  /**
   * User joined channel
   */
  'chat:user-joined': (data: { characterName: string; channel: string }) => void;

  /**
   * User left channel
   */
  'chat:user-left': (data: { characterName: string; channel: string }) => void;

  /**
   * Online users count updated
   */
  'chat:online-count': (count: number) => void;

  /**
   * Online users list
   */
  'chat:online-users': (users: OnlineUser[]) => void;

  /**
   * System message
   */
  'chat:system': (message: string) => void;

  /**
   * Error occurred
   */
  'error': (error: SocketError) => void;
}

// =====================================================
// INTEROP EVENTS (for Socket.IO default)
// =====================================================

export interface InterServerEvents {
  ping: () => void;
}

// =====================================================
// SOCKET DATA
// =====================================================

export interface SocketData {
  user?: SocketAuthData;
}
