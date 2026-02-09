/**
 * Ranking SQL Queries
 * Predefined queries for ranking data with proper indexing
 */

/**
 * Individual ranking query (Level + Resets)
 * Sorts by Resets DESC, then Level DESC
 */
export const INDIVIDUAL_RANKING_QUERY = `
  SELECT
    Name,
    Class,
    cLevel,
    Resets,
    Strength,
    Dexterity,
    Vitality,
    Energy
  FROM Character
  WHERE Name IS NOT NULL
    AND Name != ''
  ORDER BY Resets DESC, cLevel DESC
  LIMIT ?
`;

/**
 * Guild ranking query
 * Calculates member count via subquery
 * Sorts by G_Score DESC, then G_Level DESC
 */
export const GUILD_RANKING_QUERY = `
  SELECT
    G_Name,
    G_Master,
    G_Score,
    G_Level,
    (SELECT COUNT(*) FROM GuildMember WHERE G_Name = g.G_Name) as MemberCount
  FROM Guild g
  WHERE G_Name IS NOT NULL
    AND G_Name != ''
  ORDER BY G_Score DESC, G_Level DESC
  LIMIT ?
`;

/**
 * PvP ranking query (from ExtShipData or custom table)
 * Calculates win rate
 */
export const PVP_RANKING_QUERY = `
  SELECT
    CharName,
    Wins,
    Losses,
    (Wins * 100.0 / NULLIF(Wins + Losses, 0)) as WinRate
  FROM PvPStats
  WHERE CharName IS NOT NULL
    AND CharName != ''
  ORDER BY Wins DESC, WinRate DESC
  LIMIT ?
`;

/**
 * Alternative PvP ranking query using ExtShipData
 * Fallback if custom PvPStats table doesn't exist
 */
export const PVP_RANKING_QUERY_ALT = `
  SELECT
    AccountID as CharName,
    Wins,
    Losses,
    (Wins * 100.0 / NULLIF(Wins + Losses, 0)) as WinRate
  FROM ExtShipData
  WHERE AccountID IS NOT NULL
    AND AccountID != ''
  ORDER BY Wins DESC, WinRate DESC
  LIMIT ?
`;

/**
 * Get total count for individual rankings
 */
export const INDIVIDUAL_COUNT_QUERY = `
  SELECT COUNT(*) as total
  FROM Character
  WHERE Name IS NOT NULL
    AND Name != ''
`;

/**
 * Get total count for guild rankings
 */
export const GUILD_COUNT_QUERY = `
  SELECT COUNT(*) as total
  FROM Guild
  WHERE G_Name IS NOT NULL
    AND G_Name != ''
`;

/**
 * Get total count for PvP rankings
 */
export const PVP_COUNT_QUERY = `
  SELECT COUNT(*) as total
  FROM PvPStats
  WHERE CharName IS NOT NULL
    AND CharName != ''
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
