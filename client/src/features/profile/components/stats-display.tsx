/**
 * stats-display Component
 * Grid display of character stats with progress bars
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CharacterStats } from '../types/profile-types';
import { formatNumber } from '@/utils/class-utils';

export interface StatsDisplayProps {
  stats: CharacterStats;
  showLabels?: boolean;
  compact?: boolean;
  className?: string;
}

interface StatItem {
  key: keyof CharacterStats;
  label: string;
  color: string;
  max: number;
}

const STAT_ITEMS: StatItem[] = [
  { key: 'strength', label: 'Strength', color: '#ef4444', max: 32767 },
  { key: 'agility', label: 'Agility', color: '#3b82f6', max: 32767 },
  { key: 'vitality', label: 'Vitality', color: '#22c55e', max: 32767 },
  { key: 'energy', label: 'Energy', color: '#a855f7', max: 32767 },
  { key: 'leadership', label: 'Leadership', color: '#f59e0b', max: 32767 },
];

export const StatsDisplay = React.forwardRef<HTMLDivElement, StatsDisplayProps>(
  ({ stats, showLabels = true, compact = false, className }, ref) => {
    const totalStats = React.useMemo(
      () => stats.strength + stats.agility + stats.vitality + stats.energy + stats.leadership,
      [stats]
    );

    if (compact) {
      return (
        <div ref={ref} className={cn('flex flex-wrap gap-2', className)}>
          {STAT_ITEMS.map((stat) => {
            const value = stats[stat.key] || 0;
            const percentage = Math.min((value / stat.max) * 100, 100);

            return (
              <div
                key={stat.key}
                className="flex items-center gap-2 rounded-lg bg-bg-dark px-3 py-2 border border-white/10"
              >
                <span className="text-sm font-semibold" style={{ color: stat.color }}>
                  {stat.label.slice(0, 3)}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {formatNumber(value)}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Character Stats</h3>
          <span className="text-sm text-text-muted">Total: {formatNumber(totalStats)}</span>
        </div>

        <div className="space-y-2">
          {STAT_ITEMS.map((stat) => {
            const value = stats[stat.key] || 0;
            const percentage = Math.min((value / stat.max) * 100, 100);

            return (
              <div key={stat.key} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-text-muted" style={{ color: stat.color }}>
                    {stat.label}
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatNumber(value)}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-bg-dark">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: stat.color,
                      boxShadow: `0 0 10px ${stat.color}40`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

StatsDisplay.displayName = 'StatsDisplay';

export default StatsDisplay;
