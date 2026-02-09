/**
 * ranking-tabs Component
 * Tab navigation for different ranking types
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { RankingType } from '../types/rankings-types';
import { Sword, Shield, Swords } from 'lucide-react';

export interface RankingTabsProps {
  activeTab: RankingType;
  onTabChange: (tab: RankingType) => void;
  className?: string;
}

interface Tab {
  value: RankingType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { value: 'individual', label: 'Individual', icon: <Sword className="h-4 w-4" /> },
  { value: 'guild', label: 'Guild', icon: <Shield className="h-4 w-4" /> },
  { value: 'pvp', label: 'PvP', icon: <Swords className="h-4 w-4" /> },
];

export const RankingTabs = React.forwardRef<HTMLDivElement, RankingTabsProps>(
  ({ activeTab, onTabChange, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inline-flex rounded-lg bg-bg-tertiary p-1', className)}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={cn(
                'relative inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  }
);

RankingTabs.displayName = 'RankingTabs';

export default RankingTabs;
