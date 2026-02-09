/**
 * guild-ranking-row Component
 * Table row for guild rankings
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { GuildRanking } from '../types/rankings-types';
import { Shield, Users, Trophy } from 'lucide-react';

export interface GuildRankingRowProps {
  ranking: GuildRanking;
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

export const GuildRankingRow = React.forwardRef<HTMLTableRowElement, GuildRankingRowProps>(
  ({ ranking, className }, ref) => {
    const { rank, name, master, level, score, members, logo } = ranking;

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
          <div className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="h-10 w-10 rounded object-cover ring-2 ring-white/10"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-tertiary ring-2 ring-white/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <div className="font-semibold text-text-primary">{name}</div>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <Users className="h-3 w-3" />
                <span>Master: {master}</span>
              </div>
            </div>
          </div>
        </td>

        <td className="px-4 py-3 text-center">
          <div className="font-mono text-lg font-bold text-primary">Lv. {level}</div>
        </td>

        <td className="px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <Trophy className="h-4 w-4 text-secondary" />
            <span className="font-mono font-semibold text-secondary">{score.toLocaleString()}</span>
          </div>
        </td>

        <td className="px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-1 text-text-primary">
            <Users className="h-4 w-4" />
            <span className="font-mono">{members}</span>
          </div>
        </td>
      </tr>
    );
  }
);

GuildRankingRow.displayName = 'GuildRankingRow';

export default GuildRankingRow;
