/**
 * individual-ranking-row Component
 * Table row for individual character rankings
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { IndividualRanking } from '../types/rankings-types';
import { ClassBadge } from './class-badge';
import { Activity } from 'lucide-react';

export interface IndividualRankingRowProps {
  ranking: IndividualRanking;
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

export const IndividualRankingRow = React.forwardRef<HTMLTableRowElement, IndividualRankingRowProps>(
  ({ ranking, className }, ref) => {
    const {
      rank,
      name,
      class: characterClass,
      level,
      resets,
      guild,
      strength,
      agility,
      vitality,
      energy,
      online,
    } = ranking;

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
          {guild && (
            <div className="text-xs text-text-muted">
              [{guild}]
            </div>
          )}
        </td>

        <td className="px-4 py-3">
          <ClassBadge class={characterClass} showShortName />
        </td>

        <td className="px-4 py-3 text-center">
          <div className="font-mono text-text-primary">{level}</div>
        </td>

        <td className="px-4 py-3 text-center">
          <div className="font-mono text-primary">{resets}</div>
        </td>

        <td className="px-4 py-3 text-center hidden sm:table-cell">
          <div className="flex flex-col gap-0.5 text-xs text-text-muted">
            <div>STR: {strength}</div>
            <div>AGI: {agility}</div>
            <div>VIT: {vitality}</div>
            <div>ENE: {energy}</div>
          </div>
        </td>
      </tr>
    );
  }
);

IndividualRankingRow.displayName = 'IndividualRankingRow';

export default IndividualRankingRow;
