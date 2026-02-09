/**
 * use-character-profile Hook
 * Fetch character profile data from API
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { CharacterProfile } from '../types/profile-types';

interface CharacterProfileResponse {
  success: boolean;
  data?: CharacterProfile;
  message?: string;
}

export function useCharacterProfile(characterName: string) {
  return useQuery({
    queryKey: ['character-profile', characterName],
    queryFn: async () => {
      const response = await apiClient.get<CharacterProfileResponse>(
        `/rankings/character/${characterName}`
      );
      return response.data.data;
    },
    enabled: !!characterName,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
