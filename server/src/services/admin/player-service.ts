/**
 * Player Service
 * Player and character management for admin
 */

import { executeQuery, executeQueryOne } from '../../lib/mysql-connection-pool.js';
import { logger } from '../../utils/winston-logger.js';
import { BanService } from './ban-service.js';
import type {
  PlayerSearchResult,
  PlayerDetails,
  CharacterDetails,
  CharacterSummary,
} from '../../types/admin-types.js';

export class PlayerService {
  /**
   * Search players by username, email, or character name
   */
  static async searchPlayers(query: string, limit = 20): Promise<PlayerSearchResult[]> {
    if (!query || query.length < 2) {
      return [];
    }

    const searchTerm = `%${query}%`;

    try {
      const accounts = await executeQuery<{
        guid: number;
        account: string;
        email: string | null;
        register: number;
      }>(
        `SELECT guid, account, email, register
        FROM accounts
        WHERE account LIKE ? OR email LIKE ?
        LIMIT ?`,
        [searchTerm, searchTerm, limit]
      );

      const results: PlayerSearchResult[] = [];

      for (const account of accounts) {
        const isOnline = await this.checkOnlineStatus(account.guid);
        const status = await BanService.getAccountBanStatus(account.guid);
        const characterCount = await this.getCharacterCount(account.guid);

        results.push({
          guid: account.guid,
          account: account.account,
          email: account.email,
          createDate: account.register,
          status,
          isOnline,
          characterCount,
        });
      }

      return results;
    } catch (error) {
      logger.error('Failed to search players:', error);
      return [];
    }
  }

  /**
   * Get player details by account ID
   */
  static async getPlayerDetails(accountId: number): Promise<PlayerDetails | null> {
    try {
      const account = await executeQueryOne<{
        guid: number;
        account: string;
        email: string | null;
        register: number;
      }>(
        'SELECT guid, account, email, register FROM accounts WHERE guid = ?',
        [accountId]
      );

      if (!account) {
        return null;
      }

      const isOnline = await this.checkOnlineStatus(accountId);
      const status = await BanService.getAccountBanStatus(accountId);
      const characters = await this.getCharacterSummaries(accountId);
      const banInfo = await BanService.getBanInfo(accountId);
      const lastLogin = await this.getLastLogin(accountId);

      return {
        guid: account.guid,
        account: account.account,
        email: account.email,
        createDate: account.register,
        lastLogin,
        status,
        isOnline,
        characters,
        banInfo,
      };
    } catch (error) {
      logger.error('Failed to get player details:', error);
      return null;
    }
  }

  /**
   * Update account details
   */
  static async updateAccount(
    accountId: number,
    updates: { email?: string }
  ): Promise<boolean> {
    try {
      const fields: string[] = [];
      const params: any[] = [];

      if (updates.email !== undefined) {
        fields.push('email = ?');
        params.push(updates.email);
      }

      if (fields.length === 0) {
        return true;
      }

      params.push(accountId);

      await executeQuery(
        `UPDATE accounts SET ${fields.join(', ')} WHERE guid = ?`,
        params
      );

      logger.info(`Account updated: ${accountId}`);
      return true;
    } catch (error) {
      logger.error('Failed to update account:', error);
      return false;
    }
  }

  /**
   * Get character details by name
   */
  static async getCharacterDetails(characterName: string): Promise<CharacterDetails | null> {
    try {
      const character = await executeQueryOne<{
        Name: string;
        AccountId: number;
        Class: number;
        cLevel: number;
        Experience: number;
        Strength: number;
        Dexterity: number;
        Vitality: number;
        Energy: number;
        Leadership: number;
        Resets: number;
        Money: number;
        PkLevel: number;
        ConnectStat: number;
        MapNumber: number;
        MapX: number;
        MapY: number;
      }>(
        `SELECT Name, AccountId, Class, cLevel, Experience, Strength, Dexterity,
        Vitality, Energy, Leadership, Resets, Money, PkLevel, ConnectStat,
        MapNumber, MapX, MapY
        FROM Character WHERE Name = ?`,
        [characterName]
      );

      if (!character) {
        return null;
      }

      const accountName = await this.getAccountName(character.AccountId);

      return {
        name: character.Name,
        account: accountName || 'Unknown',
        class: character.Class,
        level: character.cLevel,
        experience: character.Experience,
        strength: character.Strength,
        dexterity: character.Dexterity,
        vitality: character.Vitality,
        energy: character.Energy,
        leadership: character.Leadership,
        resets: character.Resets,
        money: character.Money,
        pkLevel: character.PkLevel,
        isOnline: character.ConnectStat === 1,
        mapNumber: character.MapNumber,
        posX: character.MapX,
        posY: character.MapY,
        createTime: 0,
      };
    } catch (error) {
      logger.error('Failed to get character details:', error);
      return null;
    }
  }

  /**
   * Update character stats
   */
  static async updateCharacter(
    characterName: string,
    updates: {
      level?: number;
      strength?: number;
      dexterity?: number;
      vitality?: number;
      energy?: number;
      leadership?: number;
      resets?: number;
    }
  ): Promise<boolean> {
    try {
      const isOnline = await this.checkCharacterOnlineStatus(characterName);

      if (isOnline) {
        throw new Error('Cannot modify online character');
      }

      const fields: string[] = [];
      const params: any[] = [];

      if (updates.level !== undefined) {
        fields.push('cLevel = ?');
        params.push(updates.level);
      }

      if (updates.strength !== undefined) {
        fields.push('Strength = ?');
        params.push(updates.strength);
      }

      if (updates.dexterity !== undefined) {
        fields.push('Dexterity = ?');
        params.push(updates.dexterity);
      }

      if (updates.vitality !== undefined) {
        fields.push('Vitality = ?');
        params.push(updates.vitality);
      }

      if (updates.energy !== undefined) {
        fields.push('Energy = ?');
        params.push(updates.energy);
      }

      if (updates.leadership !== undefined) {
        fields.push('Leadership = ?');
        params.push(updates.leadership);
      }

      if (updates.resets !== undefined) {
        fields.push('Resets = ?');
        params.push(updates.resets);
      }

      if (fields.length === 0) {
        return true;
      }

      params.push(characterName);

      await executeQuery(
        `UPDATE Character SET ${fields.join(', ')} WHERE Name = ?`,
        params
      );

      logger.info(`Character updated: ${characterName}`);
      return true;
    } catch (error) {
      logger.error('Failed to update character:', error);
      throw error;
    }
  }

  /**
   * Check if account is online
   */
  static async checkOnlineStatus(accountId: number): Promise<boolean> {
    try {
      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM MEMB_STAT WHERE memb___id = (SELECT account FROM accounts WHERE guid = ?) AND ConnectStat = 1',
        [accountId]
      );
      return (result[0]?.count || 0) > 0;
    } catch {
      return false;
    }
  }

  /**
   * Check if character is online
   */
  static async checkCharacterOnlineStatus(characterName: string): Promise<boolean> {
    try {
      const result = await executeQuery<{ ConnectStat: number }>(
        'SELECT ConnectStat FROM Character WHERE Name = ?',
        [characterName]
      );
      return result[0]?.ConnectStat === 1;
    } catch {
      return false;
    }
  }

  /**
   * Get character count for account
   */
  static async getCharacterCount(accountId: number): Promise<number> {
    try {
      const result = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM Character WHERE AccountId = ?',
        [accountId]
      );
      return result[0]?.count || 0;
    } catch {
      return 0;
    }
  }

  /**
   * Get character summaries for account
   */
  static async getCharacterSummaries(accountId: number): Promise<CharacterSummary[]> {
    try {
      const characters = await executeQuery<{
        Name: string;
        Class: number;
        cLevel: number;
        Resets: number;
        ConnectStat: number;
      }>(
        'SELECT Name, Class, cLevel, Resets, ConnectStat FROM Character WHERE AccountId = ?',
        [accountId]
      );

      return characters.map(char => ({
        name: char.Name,
        class: char.Class,
        level: char.cLevel,
        resets: char.Resets,
        isOnline: char.ConnectStat === 1,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get account name from ID
   */
  static async getAccountName(accountId: number): Promise<string | null> {
    try {
      const result = await executeQueryOne<{ account: string }>(
        'SELECT account FROM accounts WHERE guid = ?',
        [accountId]
      );
      return result?.account || null;
    } catch {
      return null;
    }
  }

  /**
   * Get last login time for account
   */
  static async getLastLogin(accountId: number): Promise<number | null> {
    try {
      const result = await executeQueryOne<{ last_login: number | null }>(
        'SELECT last_login FROM accounts WHERE guid = ?',
        [accountId]
      );
      return result?.last_login || null;
    } catch {
      return null;
    }
  }
}

export default PlayerService;
