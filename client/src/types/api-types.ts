/**
 * API Type Definitions
 * TypeScript types for API requests and responses
 */

// =====================================================
// AUTH TYPES
// =====================================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    accountId: number;
    characterName?: string;
  };
  accessToken: string;
  refreshToken: string;
}

// =====================================================
// CHAT TYPES
// =====================================================

export interface ChatMessage {
  id: number;
  accountId: number;
  characterName: string | null;
  message: string;
  messageType: 'text' | 'image' | 'system';
  channel: string;
  createdAt: number;
}

export interface OnlineUser {
  accountId: number;
  username: string;
  characterName?: string;
}

export interface TypingUser {
  accountId: number;
  characterName?: string;
}

// =====================================================
// CHARACTER TYPES
// =====================================================

export interface Character {
  name: string;
  level: number;
  class: number;
  online: number;
  money: number;
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  leadership: number;
  reset: number;
}

// =====================================================
// NEWS TYPES
// =====================================================

export interface NewsItem {
  news_id: number;
  news_title: string;
  news_content: string;
  news_author: string;
  news_date: string;
  allow_comments: number;
}

// =====================================================
// RANKING TYPES
// =====================================================

export interface PlayerRanking {
  rank: number;
  name: string;
  level: number;
  reset: number;
  class: number;
  guild?: string;
  online: boolean;
}

export interface GuildRanking {
  rank: number;
  name: string;
  score: number;
  master: string;
  members: number;
}

// =====================================================
// SERVER STATUS TYPES
// =====================================================

export interface ServerStatus {
  online: boolean;
  playerCount: number;
  maxPlayers: number;
  uptime: number;
}
