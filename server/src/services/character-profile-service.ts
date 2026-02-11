/**
 * Character Profile Service
 * Handles single character profile lookups with caching
 */

import { executeQueryOne } from '../lib/mysql-connection-pool.js';
import { getCachedData, setCachedData, deleteCachedData } from '../lib/ranking-cache.js';
import { CharacterClassNames } from '../types/ranking-types.js';
import { logger } from '../utils/winston-logger.js';

/**
 * Character profile data
 */
export interface CharacterProfile {
  name: string;
  class: number;
  className: string;
  level: number;
  resets: number;
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  leadership?: number;
  money?: number;
  mapNumber?: number;
  posX?: number;
  posY?: number;
  guild?: string;
  online: boolean;
}

/**
 * Cache TTL for character profiles (5 minutes)
 */
const CHARACTER_CACHE_TTL = 300;

/**
 * Character profile query
 * Fetches full character data including guild and online status
 * Schema: MuEmu Season 19.2 MySQL (character_info, guild_members, guild_list)
 */
const CHARACTER_PROFILE_QUERY = `
  SELECT
    ci.name,
    ci.race,
    ci.level,
    ci.\`reset\`,
    ci.strength,
    ci.agility,
    ci.vitality,
    ci.energy,
    ci.leadership,
    ci.money,
    ci.world,
    ci.world_x,
    ci.world_y,
    gl.name AS guild_name,
    ci.online
  FROM character_info ci
  LEFT JOIN guild_members gm ON gm.char_id = ci.guid
  LEFT JOIN guild_list gl ON gl.guid = gm.guild_id
  WHERE ci.name = ?
`;

/**
 * Get character profile by name
 * Returns null if character not found
 */
export const getCharacterProfile = async (
  characterName: string
): Promise<CharacterProfile | null> => {
  if (!characterName || characterName.length < 1) {
    return null;
  }

  const cacheKey = `character:${characterName}`;

  // Check cache first
  const cached = await getCachedData<CharacterProfile>(cacheKey);
  if (cached) {
    logger.debug(`Character profile cache hit: ${characterName}`);
    return cached;
  }

  logger.debug(`Character profile cache miss: ${characterName}`);

  try {
    // Query database
    const result = await executeQueryOne<{
      name: string;
      race: number;
      level: number;
      reset: number;
      strength: number;
      agility: number;
      vitality: number;
      energy: number;
      leadership: number;
      money: number;
      world: number;
      world_x: number;
      world_y: number;
      guild_name: string | null;
      online: number;
    }>(CHARACTER_PROFILE_QUERY, [characterName]);

    if (!result) {
      logger.debug(`Character not found: ${characterName}`);
      return null;
    }

    // Map to CharacterProfile
    const profile: CharacterProfile = {
      name: result.name,
      class: result.race,
      className: CharacterClassNames[result.race] || 'Unknown',
      level: result.level,
      resets: result.reset,
      strength: result.strength,
      agility: result.agility,
      vitality: result.vitality,
      energy: result.energy,
      leadership: result.leadership || undefined,
      money: result.money || undefined,
      mapNumber: result.world || undefined,
      posX: result.world_x || undefined,
      posY: result.world_y || undefined,
      guild: result.guild_name || undefined,
      online: result.online === 1,
    };

    // Cache the result
    await setCachedData(cacheKey, profile, CHARACTER_CACHE_TTL);

    logger.info(`Retrieved character profile: ${characterName}`);
    return profile;
  } catch (error) {
    logger.error(`Error fetching character profile for ${characterName}:`, error);
    throw new Error('Failed to fetch character profile');
  }
};

/**
 * Refresh character profile cache
 * Call this when character data is updated
 */
export const refreshCharacterProfileCache = async (
  characterName: string
): Promise<void> => {
  try {
    const cacheKey = `character:${characterName}`;

    // Delete cached data to force refresh on next request
    await deleteCachedData(cacheKey);

    logger.debug(`Character profile cache deleted: ${characterName}`);
  } catch (error) {
    logger.error(`Error refreshing character profile cache for ${characterName}:`, error);
  }
};

export default {
  getCharacterProfile,
  refreshCharacterProfileCache,
};
