/**
 * Admin Type Definitions
 * TypeScript types for admin dashboard functionality
 * Shared types for API responses and UI state
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

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface AdminTab {
  id: string;
  label: string;
  path: string;
}

export const ADMIN_TABS: AdminTab[] = [
  { id: 'statistics', label: 'Statistics', path: '/admin/statistics' },
  { id: 'players', label: 'Players', path: '/admin/players' },
  { id: 'server', label: 'Server', path: '/admin/server' },
  { id: 'audit', label: 'Audit Logs', path: '/admin/audit' },
];
