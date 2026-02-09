/**
 * Admin Type Definitions
 * TypeScript types for admin dashboard functionality
 */

export interface ServerStatistics {
  onlinePlayers: number;
  totalAccounts: number;
  totalCharacters: number;
  registrationsToday: number;
  registrationsWeek: number;
  registrationsMonth: number;
  serverStatus: 'online' | 'offline';
  lastUpdated: number;
}

export interface OnlinePlayersByServer {
  serverCode: number;
  serverName: string;
  onlineCount: number;
}

export interface PlayerSearchResult {
  guid: number;
  account: string;
  email: string | null;
  createDate: number;
  status: 'active' | 'banned' | 'suspended';
  isOnline: boolean;
  characterCount: number;
}

export interface PlayerDetails {
  guid: number;
  account: string;
  email: string | null;
  createDate: number;
  lastLogin: number | null;
  status: 'active' | 'banned' | 'suspended';
  isOnline: boolean;
  characters: CharacterSummary[];
  banInfo: BanInfo | null;
}

export interface CharacterSummary {
  name: string;
  class: number;
  level: number;
  resets: number;
  isOnline: boolean;
}

export interface BanInfo {
  banReason: string;
  banDate: number;
  expiresAt: number | null;
  bannedBy: string;
}

export interface BanAccountRequest {
  accountId: number;
  reason: string;
  duration?: number;
  durationUnit?: 'hours' | 'days' | 'permanent';
}

export interface UpdateAccountRequest {
  email?: string;
  password?: string;
}

export interface UpdateCharacterRequest {
  level?: number;
  strength?: number;
  dexterity?: number;
  vitality?: number;
  energy?: number;
  leadership?: number;
  resets?: number;
}

export interface CharacterDetails {
  name: string;
  account: string;
  class: number;
  level: number;
  experience: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  leadership: number;
  resets: number;
  money: number;
  pkLevel: number;
  isOnline: boolean;
  mapNumber: number;
  posX: number;
  posY: number;
  createTime: number;
}

export interface ServerAnnouncement {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'critical';
  createdBy: string;
  createdAt: number;
  expiresAt: number | null;
}

export interface CreateAnnouncementRequest {
  message: string;
  type?: 'info' | 'warning' | 'critical';
  expiresAt?: number | null;
}

export interface MaintenanceMode {
  enabled: boolean;
  message: string | null;
  updatedBy: string;
  updatedAt: number;
}

export interface AuditLogEntry {
  id: number;
  adminId: number;
  adminUsername: string;
  action: string;
  targetType: 'account' | 'character' | 'server' | 'announcement' | 'ban';
  targetId: string;
  details: string;
  ipAddress: string;
  createdAt: number;
}

export interface AuditLogQuery {
  adminId?: number;
  action?: string;
  targetType?: string;
  startDate?: number;
  endDate?: number;
  limit?: number;
  offset?: number;
}
