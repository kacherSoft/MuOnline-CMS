/**
 * use-ranking-refresh Hook
 * Auto-refresh logic for rankings with countdown timer
 */

import { useState, useEffect, useCallback, useRef } from 'react';

const REFRESH_INTERVAL = 120; // 2 minutes in seconds

export interface UseRankingRefreshResult {
  countdown: number;
  isRefreshing: boolean;
  lastUpdate: string | null;
  refreshNow: () => void;
  resetTimer: () => void;
}

export function useRankingRefresh(
  refetchFn: () => void | Promise<void>,
  lastUpdate: string | null,
  enabled: boolean = true
): UseRankingRefreshResult {
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [internalLastUpdate, setInternalLastUpdate] = useState<string | null>(lastUpdate);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshNow = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await refetchFn();
      setInternalLastUpdate(new Date().toISOString());
      setCountdown(REFRESH_INTERVAL);
    } catch (error) {
      console.error('Error refreshing rankings:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchFn, isRefreshing]);

  const resetTimer = useCallback(() => {
    setCountdown(REFRESH_INTERVAL);
  }, []);

  useEffect(() => {
    setInternalLastUpdate(lastUpdate);
  }, [lastUpdate]);

  useEffect(() => {
    if (!enabled) return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refreshNow();
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, refreshNow]);

  return {
    countdown,
    isRefreshing,
    lastUpdate: internalLastUpdate,
    refreshNow,
    resetTimer,
  };
}

// Helper function to format countdown time
export function formatCountdown(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Helper function to format last update time
export function formatLastUpdate(isoString: string | null): string {
  if (!isoString) return 'Never';

  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString();
}
