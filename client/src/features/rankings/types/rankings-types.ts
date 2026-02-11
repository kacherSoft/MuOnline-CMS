/**
 * Rankings Type Definitions
 * Type definitions for ranking system (Individual, Guild, PvP)
 */

// =====================================================
// CHARACTER CLASS TYPES
// =====================================================

export enum CharacterClass {
  // Wizard Class (0-2)
  DARK_WIZARD = 0,
  SOUL_MASTER = 1,
  GRAND_MASTER = 2,

  // Knight Class (16-18)
  DARK_KNIGHT = 16,
  BLADE_KNIGHT = 17,
  BLADE_MASTER = 18,

  // Elf Class (32-34)
  ELF = 32,
  MUSE_ELF = 33,
  HIGH_ELF = 34,

  // Magic Gladiator (48-50)
  MAGIC_GLADIATOR = 48,
  DUEL_MASTER = 49,
  LORD_EMPEROR = 50,

  // Dark Lord (64-65)
  DARK_LORD = 64,
  LORD_EMPEROR_DL = 65,

  // Summoner (80-82)
  SUMMONER = 80,
  BLOODY_SUMMONER = 81,
  DIMENSION_MASTER = 82,

  // Rage Fighter (96-98)
  RAGE_FIGHTER = 96,
  FURY_WARRIOR = 97,
  FIST_MASTER = 98,
}

export interface CharacterClassInfo {
  id: number;
  name: string;
  shortName: string;
  color: string;
  icon: string;
}

export const CHARACTER_CLASS_INFO: Record<number, CharacterClassInfo> = {
  // Wizards
  [CharacterClass.DARK_WIZARD]: {
    id: CharacterClass.DARK_WIZARD,
    name: 'Dark Wizard',
    shortName: 'DW',
    color: '#3b82f6',
    icon: '🔮',
  },
  [CharacterClass.SOUL_MASTER]: {
    id: CharacterClass.SOUL_MASTER,
    name: 'Soul Master',
    shortName: 'SM',
    color: '#3b82f6',
    icon: '🔮',
  },
  [CharacterClass.GRAND_MASTER]: {
    id: CharacterClass.GRAND_MASTER,
    name: 'Grand Master',
    shortName: 'GM',
    color: '#3b82f6',
    icon: '🔮',
  },

  // Knights
  [CharacterClass.DARK_KNIGHT]: {
    id: CharacterClass.DARK_KNIGHT,
    name: 'Dark Knight',
    shortName: 'DK',
    color: '#ef4444',
    icon: '⚔️',
  },
  [CharacterClass.BLADE_KNIGHT]: {
    id: CharacterClass.BLADE_KNIGHT,
    name: 'Blade Knight',
    shortName: 'BK',
    color: '#ef4444',
    icon: '⚔️',
  },
  [CharacterClass.BLADE_MASTER]: {
    id: CharacterClass.BLADE_MASTER,
    name: 'Blade Master',
    shortName: 'BM',
    color: '#ef4444',
    icon: '⚔️',
  },

  // Elves
  [CharacterClass.ELF]: {
    id: CharacterClass.ELF,
    name: 'Elf',
    shortName: 'EL',
    color: '#10b981',
    icon: '🏹',
  },
  [CharacterClass.MUSE_ELF]: {
    id: CharacterClass.MUSE_ELF,
    name: 'Muse Elf',
    shortName: 'ME',
    color: '#10b981',
    icon: '🏹',
  },
  [CharacterClass.HIGH_ELF]: {
    id: CharacterClass.HIGH_ELF,
    name: 'High Elf',
    shortName: 'HE',
    color: '#10b981',
    icon: '🏹',
  },

  // Magic Gladiators
  [CharacterClass.MAGIC_GLADIATOR]: {
    id: CharacterClass.MAGIC_GLADIATOR,
    name: 'Magic Gladiator',
    shortName: 'MG',
    color: '#a855f7',
    icon: '⚡',
  },
  [CharacterClass.DUEL_MASTER]: {
    id: CharacterClass.DUEL_MASTER,
    name: 'Duel Master',
    shortName: 'DM',
    color: '#a855f7',
    icon: '⚡',
  },
  [CharacterClass.LORD_EMPEROR]: {
    id: CharacterClass.LORD_EMPEROR,
    name: 'Lord Emperor',
    shortName: 'LE',
    color: '#a855f7',
    icon: '⚡',
  },

  // Dark Lords
  [CharacterClass.DARK_LORD]: {
    id: CharacterClass.DARK_LORD,
    name: 'Dark Lord',
    shortName: 'DL',
    color: '#f59e0b',
    icon: '👑',
  },
  [CharacterClass.LORD_EMPEROR_DL]: {
    id: CharacterClass.LORD_EMPEROR_DL,
    name: 'Lord Emperor',
    shortName: 'LE',
    color: '#f59e0b',
    icon: '👑',
  },

  // Summoners
  [CharacterClass.SUMMONER]: {
    id: CharacterClass.SUMMONER,
    name: 'Summoner',
    shortName: 'SUM',
    color: '#ec4899',
    icon: '👻',
  },
  [CharacterClass.BLOODY_SUMMONER]: {
    id: CharacterClass.BLOODY_SUMMONER,
    name: 'Bloody Summoner',
    shortName: 'BS',
    color: '#ec4899',
    icon: '👻',
  },
  [CharacterClass.DIMENSION_MASTER]: {
    id: CharacterClass.DIMENSION_MASTER,
    name: 'Dimension Master',
    shortName: 'DSM',
    color: '#ec4899',
    icon: '👻',
  },

  // Rage Fighters
  [CharacterClass.RAGE_FIGHTER]: {
    id: CharacterClass.RAGE_FIGHTER,
    name: 'Rage Fighter',
    shortName: 'RF',
    color: '#6366f1',
    icon: '💪',
  },
  [CharacterClass.FURY_WARRIOR]: {
    id: CharacterClass.FURY_WARRIOR,
    name: 'Fury Warrior',
    shortName: 'FW',
    color: '#6366f1',
    icon: '💪',
  },
  [CharacterClass.FIST_MASTER]: {
    id: CharacterClass.FIST_MASTER,
    name: 'Fist Master',
    shortName: 'FM',
    color: '#6366f1',
    icon: '💪',
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
}
