/**
 * rankings-page Component
 * Main rankings page with tabs, filters, and table
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { RankingType } from '../types/rankings-types';
import { useIndividualRankings, useGuildRankings, usePvPRankings } from '../hooks/use-rankings';
import { useRankingRefresh } from '../hooks/use-ranking-refresh';
import { RankingHeader } from './ranking-header';
import { RankingTabs } from './ranking-tabs';
import { SearchFilter } from './search-filter';
import { RankingTable } from './ranking-table';
import { Pagination } from './pagination';
import { Card } from '@/components/ui/card';

export interface RankingsPageProps {
  className?: string;
}

export const RankingsPage = React.forwardRef<HTMLDivElement, RankingsPageProps>(
  ({ className }, ref) => {
    const [activeTab, setActiveTab] = React.useState<RankingType>('individual');
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [sortBy, setSortBy] = React.useState('rank');
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    const query = React.useMemo(
      () => ({ page, limit: 20, search, sortBy, sortOrder }),
      [page, search, sortBy, sortOrder]
    );

    const individualRankings = useIndividualRankings(query);
    const guildRankings = useGuildRankings(query);
    const pvpRankings = usePvPRankings(query);

    const currentRankings = React.useMemo(() => {
      switch (activeTab) {
        case 'individual':
          return individualRankings;
        case 'guild':
          return guildRankings;
        case 'pvp':
          return pvpRankings;
        default:
          return individualRankings;
      }
    }, [activeTab, individualRankings, guildRankings, pvpRankings]);

    const { countdown, isRefreshing, lastUpdate, refreshNow } = useRankingRefresh(
      () => currentRankings.refetch(),
      currentRankings.lastUpdate,
      !currentRankings.loading
    );

    const handleTabChange = (tab: RankingType) => {
      setActiveTab(tab);
      setPage(1);
      setSearch('');
      setSortBy('rank');
      setSortOrder('asc');
    };

    const handleSort = (column: string) => {
      if (sortBy === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    };

    const handlePageChange = (newPage: number) => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getTitle = () => {
      switch (activeTab) {
        case 'individual':
          return 'Individual Rankings';
        case 'guild':
          return 'Guild Rankings';
        case 'pvp':
          return 'PvP Rankings';
        default:
          return 'Rankings';
      }
    };

    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        <RankingHeader
          title={getTitle()}
          isRefreshing={isRefreshing}
          countdown={countdown}
          lastUpdate={lastUpdate}
          onRefresh={refreshNow}
        />

        <Card className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <RankingTabs activeTab={activeTab} onTabChange={handleTabChange} />
            <SearchFilter
              value={search}
              onChange={setSearch}
              placeholder={`Search ${activeTab} rankings...`}
              className="w-full sm:w-64"
            />
          </div>

          {currentRankings.error && (
            <div className="mb-4 rounded-lg bg-error/10 p-4 text-error">
              {currentRankings.error}
            </div>
          )}

          <RankingTable
            type={activeTab}
            data={currentRankings.data}
            loading={currentRankings.loading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />

          {currentRankings.pagination && currentRankings.pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentRankings.pagination.page}
                totalPages={currentRankings.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </Card>

        <div className="text-center text-sm text-text-muted">
          Showing {currentRankings.data.length} of {currentRankings.pagination?.total || 0} rankings
        </div>
      </div>
    );
  }
);

RankingsPage.displayName = 'RankingsPage';

export default RankingsPage;
