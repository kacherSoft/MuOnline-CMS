/**
 * useStatistics Hook
 * Fetches statistics from admin API with auto-refresh
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { ServerStatistics, OnlinePlayersByServer } from '../types/admin-types';

interface StatisticsData {
  statistics: ServerStatistics | null;
  onlineByServer: OnlinePlayersByServer[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useStatistics(autoRefresh = true): StatisticsData {
  const [statistics, setStatistics] = useState<ServerStatistics | null>(null);
  const [onlineByServer, setOnlineByServer] = useState<OnlinePlayersByServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [statsRes, serverRes] = await Promise.all([
        apiClient.get('/admin/statistics'),
        apiClient.get('/admin/statistics/online-by-server'),
      ]);

      setStatistics(statsRes.data.data);
      setOnlineByServer(serverRes.data.data.servers || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch statistics');
      console.error('Statistics fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();

    if (autoRefresh) {
      const interval = setInterval(fetchStatistics, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchStatistics]);

  return {
    statistics,
    onlineByServer,
    isLoading,
    error,
    refresh: fetchStatistics,
  };
}
