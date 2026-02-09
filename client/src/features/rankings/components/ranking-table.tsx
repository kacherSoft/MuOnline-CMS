/**
 * ranking-table Component
 * Generic table component for rankings with sorting support
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { RankingType } from '../types/rankings-types';
import { IndividualRankingRow } from './individual-ranking-row';
import { GuildRankingRow } from './guild-ranking-row';
import { PvPRankingRow } from './pvp-ranking-row';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type SortOrder = 'asc' | 'desc' | null;

export interface RankingTableProps {
  type: RankingType;
  data: any[];
  loading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  className?: string;
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const columnsByType: Record<RankingType, Column[]> = {
  individual: [
    { key: 'rank', label: 'Rank', sortable: true, align: 'center', className: 'w-16' },
    { key: 'name', label: 'Character', sortable: true, align: 'left' },
    { key: 'class', label: 'Class', sortable: true, align: 'left', className: 'w-28' },
    { key: 'level', label: 'Level', sortable: true, align: 'center', className: 'w-20' },
    { key: 'resets', label: 'Resets', sortable: true, align: 'center', className: 'w-20' },
    { key: 'stats', label: 'Stats', sortable: false, align: 'center', className: 'hidden sm:table-cell' },
  ],
  guild: [
    { key: 'rank', label: 'Rank', sortable: true, align: 'center', className: 'w-16' },
    { key: 'name', label: 'Guild', sortable: true, align: 'left' },
    { key: 'level', label: 'Level', sortable: true, align: 'center', className: 'w-24' },
    { key: 'score', label: 'Score', sortable: true, align: 'center', className: 'w-28' },
    { key: 'members', label: 'Members', sortable: true, align: 'center', className: 'w-24' },
  ],
  pvp: [
    { key: 'rank', label: 'Rank', sortable: true, align: 'center', className: 'w-16' },
    { key: 'name', label: 'Character', sortable: true, align: 'left' },
    { key: 'class', label: 'Class', sortable: true, align: 'left', className: 'w-28' },
    { key: 'wins', label: 'Wins', sortable: true, align: 'center', className: 'w-20' },
    { key: 'losses', label: 'Losses', sortable: true, align: 'center', className: 'w-20' },
    { key: 'winRate', label: 'Win Rate', sortable: true, align: 'center', className: 'w-32' },
  ],
};

const getSortIcon = (column: string, sortBy: string, sortOrder: 'asc' | 'desc') => {
  if (sortBy !== column) {
    return <ArrowUpDown className="h-4 w-4 opacity-30" />;
  }
  return sortOrder === 'asc' ? (
    <ArrowUp className="h-4 w-4 text-primary" />
  ) : (
    <ArrowDown className="h-4 w-4 text-primary" />
  );
};

export const RankingTable = React.forwardRef<HTMLTableElement, RankingTableProps>(
  ({ type, data, loading = false, sortBy, sortOrder = 'asc', onSort, className }, ref) => {
    const columns = columnsByType[type];

    if (loading) {
      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-text-muted">No rankings found</p>
            <p className="text-sm text-text-muted">Try adjusting your filters or check back later</p>
          </div>
        </div>
      );
    }

    const renderRow = (item: any, index: number) => {
      const key = `${type}-${item.rank}-${index}`;

      switch (type) {
        case 'individual':
          return <IndividualRankingRow key={key} ranking={item} />;
        case 'guild':
          return <GuildRankingRow key={key} ranking={item} />;
        case 'pvp':
          return <PvPRankingRow key={key} ranking={item} />;
        default:
          return null;
      }
    };

    return (
      <div className="overflow-x-auto scrollbar-dark">
        <table
          ref={ref}
          className={cn('w-full border-collapse', className)}
        >
          <thead>
            <tr className="border-b border-white/10 bg-bg-tertiary">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-sm font-semibold uppercase tracking-wider text-text-muted',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && 'cursor-pointer hover:bg-white/5 transition-colors select-none',
                    column.className
                  )}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  <div className={cn(
                    'flex items-center gap-2',
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    {column.label}
                    {column.sortable && sortBy && (
                      getSortIcon(column.key, sortBy, sortOrder)
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
        </table>
      </div>
    );
  }
);

RankingTable.displayName = 'RankingTable';

export default RankingTable;
