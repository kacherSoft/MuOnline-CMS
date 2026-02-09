/**
 * Character Profile Hook
 * Fetches and manages character profile data
 */

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

export interface CharacterStats {
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  command?: number;
}

export interface CharacterProfile {
  id: string;
  name: string;
  class: string;
  level: number;
  resets: number;
  grandResets: number;
  stats: CharacterStats;
  account: string;
  guildName?: string;
  isOnline: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface UseCharacterProfileResult {
  profile: CharacterProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCharacterProfile(characterName: string): UseCharacterProfileResult {
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!characterName) {
      setError('Character name is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/characters/${encodeURIComponent(characterName)}`);
      setProfile(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load character profile');
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [characterName]);

  return { profile, isLoading, error, refetch: fetchProfile };
}
