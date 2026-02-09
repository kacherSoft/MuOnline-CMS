/**
 * Rankings Type Definitions
 * Type definitions for ranking system (Individual, Guild, PvP)
 */

// =====================================================
// CHARACTER CLASS TYPES
// =====================================================

export enum CharacterClass {
  DARK_KNIGHT = 0,
  DARK_WIZARD = 1,
  FAIRY_ELF = 2,
  MAGIC_GLADIATOR = 3,
  DARK_LORD = 4,
  SUMMONER = 5,
  RAGE_FIGHTER = 6,
  GROW_LANCER = 7,
}

export interface CharacterClassInfo {
  id: CharacterClass;
  name: string;
  shortName: string;
  color: string;
  icon: string;
}

export const CHARACTER_CLASS_INFO: Record<CharacterClass, CharacterClassInfo> = {
  [CharacterClass.DARK_KNIGHT]: {
    id: CharacterClass.DARK_KNIGHT,
    name: 'Dark Knight',
    shortName: 'DK',
    color: '#ef4444',
    icon: '⚔️',
  },
  [CharacterClass.DARK_WIZARD]: {
    id: CharacterClass.DARK_WIZARD,
    name: 'Dark Wizard',
    shortName: 'DW',
    color: '#3b82f6',
    icon: '🔮',
  },
  [CharacterClass.FAIRY_ELF]: {
    id: CharacterClass.FAIRY_ELF,
    name: 'Fairy Elf',
    shortName: 'FE',
    color: '#10b981',
    icon: '🏹',
  },
  [CharacterClass.MAGIC_GLADIATOR]: {
    id: CharacterClass.MAGIC_GLADIATOR,
    name: 'Magic Gladiator',
    shortName: 'MG',
    color: '#a855f7',
    icon: '⚡',
  },
  [CharacterClass.DARK_LORD]: {
    id: CharacterClass.DARK_LORD,
    name: 'Dark Lord',
    shortName: 'DL',
    color: '#f59e0b',
    icon: '👑',
  },
  [CharacterClass.SUMMONER]: {
    id: CharacterClass.SUMMONER,
    name: 'Summoner',
    shortName: 'SM',
    color: '#ec4899',
    icon: '👻',
  },
  [CharacterClass.RAGE_FIGHTER]: {
    id: CharacterClass.RAGE_FIGHTER,
    name: 'Rage Fighter',
    shortName: 'RF',
    color: '#f97316',
    icon: '👊',
  },
  [CharacterClass.GROW_LANCER]: {
    id: CharacterClass.GROW_LANCER,
    name: 'Grow Lancer',
    shortName: 'GL',
    color: '#06b6d4',
    icon: '🛡️',
  },
};

// =====================================================
// RANKING TYPE TYPES
// =====================================================

export type RankingType = 'individual' | 'guild' | 'pvp';

export interface RankingPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RankingResponse<T> {
  rankings: T[];
  pagination: RankingPagination;
  lastUpdate: string;
}

// =====================================================
// INDIVIDUAL RANKING TYPES
// =====================================================

export interface IndividualRanking {
  rank: number;
  name: string;
  class: CharacterClass;
  level: number;
  resets: number;
  guild?: string;
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  online: boolean;
}

// =====================================================
// GUILD RANKING TYPES
// =====================================================

export interface GuildRanking {
  rank: number;
  name: string;
  master: string;
  level: number;
  score: number;
  members: number;
  logo?: string;
}

// =====================================================
// PVP RANKING TYPES
// =====================================================

export interface PvPRanking {
  rank: number;
  name: string;
  class: CharacterClass;
  wins: number;
  losses: number;
  winRate: number;
  online: boolean;
}

// =====================================================
// RANKING QUERY TYPES
// =====================================================

export interface RankingQuery {
  type: RankingType;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
