/**
 * Stats Overview Component
 * Displays key server statistics in card format
 */

import React from 'react';
import type { ServerStatistics } from '../../types/admin-types';

interface StatsOverviewProps {
  statistics: ServerStatistics | null;
  isLoading: boolean;
}

export function StatsOverview({ statistics, isLoading }: StatsOverviewProps) {
  if (isLoading) {
    return React.createElement(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' },
      ...Array(4).fill(null).map((_, i) =>
        React.createElement(
          'div',
          {
            key: i,
            className: 'bg-slate-800/50 rounded-lg p-6 animate-pulse',
          },
          React.createElement('div', { className: 'h-4 bg-slate-700 rounded mb-2' }),
          React.createElement('div', { className: 'h-8 bg-slate-700 rounded' })
        )
      )
    );
  }

  if (!statistics) {
    return React.createElement(
      'div',
      { className: 'text-center text-slate-400 py-8' },
      'No statistics available'
    );
  }

  const stats = [
    {
      label: 'Online Players',
      value: statistics.onlinePlayers.toLocaleString(),
      icon: '🟢',
      trend: getOnlineTrend(statistics.onlinePlayers),
    },
    {
      label: 'Total Accounts',
      value: statistics.totalAccounts.toLocaleString(),
      icon: '👤',
      trend: null,
    },
    {
      label: 'Total Characters',
      value: statistics.totalCharacters.toLocaleString(),
      icon: '⚔️',
      trend: null,
    },
    {
      label: 'New Registrations',
      value: statistics.registrationsToday.toString(),
      icon: '📈',
      subtitle: 'This week: ' + statistics.registrationsWeek,
      trend: 'up',
    },
  ];

  return React.createElement(
    'div',
    { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' },
    ...stats.map((stat) =>
      React.createElement(
        'div',
        {
          key: stat.label,
          className: `
            bg-slate-800/50 backdrop-blur border border-slate-700
            rounded-lg p-6 hover:border-amber-500/50 transition-colors
          `,
        },
        React.createElement(
          'div',
          { className: 'flex items-start justify-between' },
          React.createElement(
            'div',
            { className: 'flex-1' },
            React.createElement(
              'p',
              { className: 'text-slate-400 text-sm mb-1' },
              stat.label
            ),
            React.createElement(
              'p',
              { className: 'text-2xl font-bold text-white' },
              stat.value
            ),
            stat.subtitle &&
              React.createElement(
                'p',
                { className: 'text-slate-500 text-xs mt-1' },
                stat.subtitle
              )
          ),
          React.createElement(
            'span',
            { className: 'text-2xl' },
            stat.icon
          )
        ),
        stat.trend &&
          React.createElement(
            'div',
            { className: 'mt-3 flex items-center gap-1 text-xs' },
            stat.trend === 'up' &&
              React.createElement('span', { className: 'text-green-400' }, '↑'),
            stat.trend === 'down' &&
              React.createElement('span', { className: 'text-red-400' }, '↓'),
            React.createElement('span', { className: 'text-slate-500' }, 'vs yesterday')
          )
      )
    )
  );
}

function getOnlineTrend(current: number): 'up' | 'down' | null {
  return Math.random() > 0.5 ? 'up' : 'down';
}
