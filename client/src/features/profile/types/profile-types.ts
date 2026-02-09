/**
 * Profile Feature Type Definitions
 * Type definitions for character profile pages
 */

import { CharacterClass } from '@/features/rankings/types/rankings-types';

export interface CharacterProfile {
  name: string;
  class: CharacterClass;
  level: number;
  resets: number;
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  leadership: number;
  online: boolean;
  guild?: string;
  money?: number;
  mapNumber?: number;
  posX?: number;
  posY?: number;
}

export interface CharacterStats {
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  leadership: number;
}

export interface ProfileViewProps {
  characterName: string;
}
