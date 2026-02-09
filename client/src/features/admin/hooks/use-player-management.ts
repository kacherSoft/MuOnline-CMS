/**
 * usePlayerManagement Hook
 * Handles player search, details, and ban operations
 */

import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type {
  PlayerSearchResult,
  PlayerDetails,
  CharacterDetails,
  BanAccountRequest,
} from '../types/admin-types';

interface PlayerManagementData {
  players: PlayerSearchResult[];
  selectedPlayer: PlayerDetails | null;
  selectedCharacter: CharacterDetails | null;
  isSearching: boolean;
  isLoadingDetails: boolean;
  error: string | null;
  searchPlayers: (query: string, limit?: number) => Promise<void>;
  getPlayerDetails: (accountId: number) => Promise<void>;
  getCharacterDetails: (characterName: string) => Promise<void>;
  banAccount: (request: BanAccountRequest) => Promise<void>;
  unbanAccount: (accountId: number) => Promise<void>;
  updateAccount: (accountId: number, data: any) => Promise<void>;
  updateCharacter: (characterName: string, data: any) => Promise<void>;
  clearSelection: () => void;
}

export function usePlayerManagement(): PlayerManagementData {
  const [players, setPlayers] = useState<PlayerSearchResult[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetails | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterDetails | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlayers = useCallback(async (query: string, limit = 20) => {
    if (!query.trim()) {
      setPlayers([]);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      const response = await apiClient.get('/admin/players', {
        params: { q: query, limit },
      });

      setPlayers(response.data.data.players || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to search players');
      setPlayers([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const getPlayerDetails = useCallback(async (accountId: number) => {
    try {
      setIsLoadingDetails(true);
      setError(null);

      const response = await apiClient.get(`/admin/players/${accountId}`);
      setSelectedPlayer(response.data.data.player);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch player details');
    } finally {
      setIsLoadingDetails(false);
    }
  }, []);

  const getCharacterDetails = useCallback(async (characterName: string) => {
    try {
      setIsLoadingDetails(true);
      setError(null);

      const response = await apiClient.get(`/admin/characters/${characterName}`);
      setSelectedCharacter(response.data.data.character);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch character details');
    } finally {
      setIsLoadingDetails(false);
    }
  }, []);

  const banAccount = useCallback(async (request: BanAccountRequest) => {
    try {
      setError(null);
      await apiClient.post(`/admin/players/${request.accountId}/ban`, {
        reason: request.reason,
        duration: request.duration,
        durationUnit: request.durationUnit,
      });

      if (selectedPlayer?.guid === request.accountId) {
        await getPlayerDetails(request.accountId);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to ban account';
      setError(msg);
      throw new Error(msg);
    }
  }, [selectedPlayer, getPlayerDetails]);

  const unbanAccount = useCallback(async (accountId: number) => {
    try {
      setError(null);
      await apiClient.delete(`/admin/players/${accountId}/ban`);

      if (selectedPlayer?.guid === accountId) {
        await getPlayerDetails(accountId);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to unban account';
      setError(msg);
      throw new Error(msg);
    }
  }, [selectedPlayer, getPlayerDetails]);

  const updateAccount = useCallback(async (accountId: number, data: any) => {
    try {
      setError(null);
      await apiClient.put(`/admin/players/${accountId}`, data);

      if (selectedPlayer?.guid === accountId) {
        await getPlayerDetails(accountId);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update account';
      setError(msg);
      throw new Error(msg);
    }
  }, [selectedPlayer, getPlayerDetails]);

  const updateCharacter = useCallback(async (characterName: string, data: any) => {
    try {
      setError(null);
      await apiClient.put(`/admin/characters/${characterName}`, data);

      if (selectedCharacter?.name === characterName) {
        await getCharacterDetails(characterName);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update character';
      setError(msg);
      throw new Error(msg);
    }
  }, [selectedCharacter, getCharacterDetails]);

  const clearSelection = useCallback(() => {
    setSelectedPlayer(null);
    setSelectedCharacter(null);
    setError(null);
  }, []);

  return {
    players,
    selectedPlayer,
    selectedCharacter,
    isSearching,
    isLoadingDetails,
    error,
    searchPlayers,
    getPlayerDetails,
    getCharacterDetails,
    banAccount,
    unbanAccount,
    updateAccount,
    updateCharacter,
    clearSelection,
  };
}
