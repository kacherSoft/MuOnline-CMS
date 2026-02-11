/**
 * Ranking SQL Queries
 * Predefined queries for ranking data with proper indexing
 * Schema: MuEmu Season 19.2 MySQL
 */

/**
 * Individual ranking query (Level + Resets)
 * Sorts by reset DESC, then level DESC
 */
export const INDIVIDUAL_RANKING_QUERY = `
  SELECT
    name,
    race,
    level,
    \`reset\`,
    strength,
    agility,
    vitality,
    energy
  FROM character_info
  WHERE name IS NOT NULL
    AND name != ''
  ORDER BY \`reset\` DESC, level DESC
  LIMIT ?
`;

/**
 * Guild ranking query
 * Joins guild_members to find guild master (id=128)
 * Calculates member count via subquery
 * Sorts by score DESC
 */
export const GUILD_RANKING_QUERY = `
  SELECT
    gl.name AS guild_name,
    ci.name AS master_name,
    gl.score,
    (SELECT COUNT(*) FROM guild_members WHERE guild_id = gl.guid) AS member_count
  FROM guild_list gl
  LEFT JOIN guild_members gm ON gm.guild_id = gl.guid AND gm.id = 128
  LEFT JOIN character_info ci ON ci.guid = gm.char_id
  WHERE gl.name IS NOT NULL
    AND gl.name != ''
  ORDER BY gl.score DESC
  LIMIT ?
`;

/**
 * PvP ranking query (no PvP tables exist in this schema)
 * Returns empty result set
 */
export const PVP_RANKING_QUERY = `
  SELECT '' AS char_name, 0 AS kills, 0 AS deaths, 0 AS win_rate
  FROM DUAL WHERE 1=0
`;

/**
 * Alternative PvP ranking query
 * Returns empty result set
 */
export const PVP_RANKING_QUERY_ALT = `
  SELECT '' AS char_name, 0 AS kills, 0 AS deaths, 0 AS win_rate
  FROM DUAL WHERE 1=0
`;

/**
 * Get total count for individual rankings
 */
export const INDIVIDUAL_COUNT_QUERY = `
  SELECT COUNT(*) as total
  FROM character_info
  WHERE name IS NOT NULL
    AND name != ''
`;

/**
 * Get total count for guild rankings
 */
export const GUILD_COUNT_QUERY = `
  SELECT COUNT(*) as total
  FROM guild_list
  WHERE name IS NOT NULL
    AND name != ''
`;

/**
 * Get total count for PvP rankings
 */
export const PVP_COUNT_QUERY = `
  SELECT 0 as total
`;

export default {
  INDIVIDUAL_RANKING_QUERY,
  GUILD_RANKING_QUERY,
  PVP_RANKING_QUERY,
  PVP_RANKING_QUERY_ALT,
  INDIVIDUAL_COUNT_QUERY,
  GUILD_COUNT_QUERY,
  PVP_COUNT_QUERY,
};
