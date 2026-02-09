/**
 * Ranking System Type Definitions
 * Types for individual, guild, and PvP rankings
 */

/**
 * Character class enum (MuOnline Season 19)
 */
export enum CharacterClass {
  DARK_WIZARD = 0,
  SOUL_MASTER = 1,
  GRAND_MASTER = 2,
  DARK_KNIGHT = 16,
  BLADE_KNIGHT = 17,
  BLADE_MASTER = 18,
  ELF = 32,
  MUSE_ELF = 33,
  HIGH_ELF = 34,
  MAGIC_GLADIATOR = 48,
  DUEL_MASTER = 49,
  LORD_EMPEROR = 50,
  DARK_LORD = 64,
  LORD_EMPEROR_DL = 65,
  SUMMONER = 80,
  BLOODY_SUMMONER = 81,
  DIMENSION_MASTER = 82,
  RAGE_FIGHTER = 96,
  FURY_WARRIOR = 97,
  FIST_MASTER = 98,
}

/**
 * Character class names mapping
 */
export const CharacterClassNames: Record<number, string> = {
  [CharacterClass.DARK_WIZARD]: 'Dark Wizard',
  [CharacterClass.SOUL_MASTER]: 'Soul Master',
  [CharacterClass.GRAND_MASTER]: 'Grand Master',
  [CharacterClass.DARK_KNIGHT]: 'Dark Knight',
  [CharacterClass.BLADE_KNIGHT]: 'Blade Knight',
  [CharacterClass.BLADE_MASTER]: 'Blade Master',
  [CharacterClass.ELF]: 'Elf',
  [CharacterClass.MUSE_ELF]: 'Muse Elf',
  [CharacterClass.HIGH_ELF]: 'High Elf',
  [CharacterClass.MAGIC_GLADIATOR]: 'Magic Gladiator',
  [CharacterClass.DUEL_MASTER]: 'Duel Master',
  [CharacterClass.LORD_EMPEROR]: 'Lord Emperor',
  [CharacterClass.DARK_LORD]: 'Dark Lord',
  [CharacterClass.LORD_EMPEROR_DL]: 'Lord Emperor',
  [CharacterClass.SUMMONER]: 'Summoner',
  [CharacterClass.BLOODY_SUMMONER]: 'Bloody Summoner',
  [CharacterClass.DIMENSION_MASTER]: 'Dimension Master',
  [CharacterClass.RAGE_FIGHTER]: 'Rage Fighter',
  [CharacterClass.FURY_WARRIOR]: 'Fury Warrior',
  [CharacterClass.FIST_MASTER]: 'Fist Master',
};

/**
 * Individual ranking entry
 */
export interface IndividualRankingEntry {
  rank: number;
  name: string;
  class: number;
  className: string;
  level: number;
  resets: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
}

/**
 * Guild ranking entry
 */
export interface GuildRankingEntry {
  rank: number;
  name: string;
  master: string;
  score: number;
  level: number;
  memberCount: number;
}

/**
 * PvP ranking entry
 */
export interface PvPRankingEntry {
  rank: number;
  charName: string;
  wins: number;
  losses: number;
  winRate: number;
}

/**
 * Ranking query params
 */
export interface RankingQueryParams {
  limit?: number;
  offset?: number;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
}
