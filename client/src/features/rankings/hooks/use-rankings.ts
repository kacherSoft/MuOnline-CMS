/**
 * use-rankings Hook
 * Custom hook for fetching rankings data from API
 */

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/api-client';
import {
  RankingType,
  RankingResponse,
  IndividualRanking,
  GuildRanking,
  PvPRanking,
  RankingQuery,
} from '../types/rankings-types';

interface UseRankingsResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  lastUpdate: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => void;
}

export function useRankings(
  type: RankingType,
  query: Omit<RankingQuery, 'type'> = {}
): UseRankingsResult<IndividualRanking | GuildRanking | PvPRanking> {
  const [data, setData] = useState<IndividualRanking[] | GuildRanking[] | PvPRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseRankingsResult<never>['pagination']>(null);

  const {
    page = 1,
    limit = 20,
  } = query;

  const fetchRankings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      const response = await apiClient.get<RankingResponse<
        IndividualRanking | GuildRanking | PvPRanking
      >>(`/rankings/${type}`, { params });

      setData(response.data.rankings as IndividualRanking[] | GuildRanking[] | PvPRanking[]);
      setPagination(response.data.pagination);
      setLastUpdate(response.data.lastUpdate);
    } catch (err) {
      console.error('Error fetching rankings:', err);
      setError('Failed to load rankings. Please try again later.');
      setData([]);
      setPagination(null);
      setLastUpdate(null);
    } finally {
      setLoading(false);
    }
  }, [type, page, limit]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    pagination,
    refetch: fetchRankings,
  };
}

// Typed hooks for each ranking type
export function useIndividualRankings(
  query: Omit<RankingQuery, 'type'> = {}
): UseRankingsResult<IndividualRanking> {
  return useRankings('individual', query) as UseRankingsResult<IndividualRanking>;
}

export function useGuildRankings(
  query: Omit<RankingQuery, 'type'> = {}
): UseRankingsResult<GuildRanking> {
  return useRankings('guild', query) as UseRankingsResult<GuildRanking>;
}

export function usePvPRankings(
  query: Omit<RankingQuery, 'type'> = {}
): UseRankingsResult<PvPRanking> {
  return useRankings('pvp', query) as UseRankingsResult<PvPRanking>;
}
