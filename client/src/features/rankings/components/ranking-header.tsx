/**
 * ranking-header Component
 * Header with title, refresh button, and last update time
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock } from 'lucide-react';
import { formatCountdown, formatLastUpdate } from '../hooks/use-ranking-refresh';

export interface RankingHeaderProps {
  title?: string;
  isRefreshing?: boolean;
  countdown?: number;
  lastUpdate?: string | null;
  onRefresh?: () => void;
  className?: string;
}

export const RankingHeader = React.forwardRef<HTMLDivElement, RankingHeaderProps>(
  ({
    title = 'Rankings',
    isRefreshing = false,
    countdown = 0,
    lastUpdate = null,
    onRefresh,
    className
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Clock className="h-4 w-4" />
            <span>
              Last updated: {formatLastUpdate(lastUpdate)}
            </span>
            {countdown > 0 && (
              <>
                <span>•</span>
                <span className="text-primary">
                  Refresh in {formatCountdown(countdown)}
                </span>
              </>
            )}
          </div>
        </div>

        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            Refresh
          </Button>
        )}
      </div>
    );
  }
);

RankingHeader.displayName = 'RankingHeader';

export default RankingHeader;
