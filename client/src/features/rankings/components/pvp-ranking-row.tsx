/**
 * pvp-ranking-row Component
 * Table row for PvP rankings
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { PvPRanking } from '../types/rankings-types';
import { ClassBadge } from './class-badge';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

export interface PvPRankingRowProps {
  ranking: PvPRanking;
  className?: string;
}

const getRankStyle = (rank: number) => {
  if (rank === 1) {
    return 'text-yellow-400 font-bold bg-yellow-400/10';
  }
  if (rank === 2) {
    return 'text-gray-300 font-bold bg-gray-300/10';
  }
  if (rank === 3) {
    return 'text-amber-600 font-bold bg-amber-600/10';
  }
  return 'text-text-muted';
};

const getRankIcon = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

const getWinRateStyle = (winRate: number) => {
  if (winRate >= 70) return 'text-success';
  if (winRate >= 50) return 'text-warning';
  return 'text-error';
};

const getWinRateIcon = (winRate: number) => {
  if (winRate >= 70) return <TrendingUp className="h-4 w-4" />;
  if (winRate >= 50) return <TrendingUp className="h-4 w-4 text-warning" />;
  return <TrendingDown className="h-4 w-4" />;
};

export const PvPRankingRow = React.forwardRef<HTMLTableRowElement, PvPRankingRowProps>(
  ({ ranking, className }, ref) => {
    const { rank, name, class: characterClass, wins, losses, winRate, online } = ranking;

    const totalMatches = wins + losses;
    const winRateDisplay = totalMatches > 0 ? winRate : 0;

    return (
      <tr
        ref={ref}
        className={cn(
          'border-b border-white/5 transition-colors hover:bg-white/5',
          className
        )}
      >
        <td className="px-4 py-3">
          <div className={cn('flex items-center justify-center gap-2 text-lg', getRankStyle(rank))}>
            <span className="text-xl">{getRankIcon(rank)}</span>
          </div>
        </td>

        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary">{name}</span>
            {online && (
              <div className="flex items-center gap-1 text-xs text-success">
                <Activity className="h-3 w-3 fill-success" />
                <span>Online</span>
              </div>
            )}
          </div>
        </td>

        <td className="px-4 py-3">
          <ClassBadge class={characterClass} showShortName />
        </td>

        <td className="px-4 py-3 text-center">
          <div className="font-mono text-success">{wins}</div>
        </td>

        <td className="px-4 py-3 text-center">
          <div className="font-mono text-error">{losses}</div>
        </td>

        <td className="px-4 py-3 text-center">
          <div
            className={cn(
              'flex items-center justify-center gap-1.5 font-mono font-bold',
              getWinRateStyle(winRateDisplay)
            )}
          >
            {getWinRateIcon(winRateDisplay)}
            <span>{winRateDisplay.toFixed(1)}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${winRateDisplay}%`,
                backgroundColor: winRateDisplay >= 70 ? '#10b981' : winRateDisplay >= 50 ? '#f59e0b' : '#ef4444',
              }}
            />
          </div>
        </td>
      </tr>
    );
  }
);

PvPRankingRow.displayName = 'PvPRankingRow';

export default PvPRankingRow;
