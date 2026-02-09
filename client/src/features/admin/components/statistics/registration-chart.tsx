/**
 * Registration Chart Component
 * Simple bar chart for registration statistics
 */

import React from 'react';
import type { ServerStatistics } from '../../types/admin-types';

interface RegistrationChartProps {
  statistics: ServerStatistics | null;
  isLoading: boolean;
}

type TimeRange = 'today' | 'week' | 'month';

export function RegistrationChart({ statistics, isLoading }: RegistrationChartProps) {
  const [range, setRange] = React.useState<TimeRange>('week');

  if (isLoading) {
    return React.createElement(
      'div',
      {
        className: 'bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6',
      },
      React.createElement('div', { className: 'h-64 bg-slate-700 rounded animate-pulse' })
    );
  }

  if (!statistics) {
    return null;
  }

  const data = [
    { label: 'Today', value: statistics.registrationsToday, max: 100 },
    { label: 'This Week', value: statistics.registrationsWeek, max: 500 },
    { label: 'This Month', value: statistics.registrationsMonth, max: 2000 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return React.createElement(
    'div',
    {
      className: 'bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6',
    },
    React.createElement(
      'div',
      { className: 'flex items-center justify-between mb-6' },
      React.createElement(
        'h2',
        { className: 'text-lg font-semibold text-white' },
        'New Registrations'
      ),
      React.createElement(
        'div',
        { className: 'flex gap-2' },
        (['today', 'week', 'month'] as TimeRange[]).map((r) =>
          React.createElement(
            'button',
            {
              key: r,
              onClick: () => setRange(r),
              className: `
                px-3 py-1 rounded text-sm capitalize
                ${range === r
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }
              `,
            },
            r
          )
        )
      )
    ),

    React.createElement(
      'div',
      { className: 'space-y-4' },
      ...data.map((item) =>
        React.createElement(
          'div',
          { key: item.label },
          React.createElement(
            'div',
            { className: 'flex justify-between text-sm mb-1' },
            React.createElement('span', { className: 'text-slate-400' }, item.label),
            React.createElement('span', { className: 'text-white font-medium' }, item.value.toLocaleString())
          ),
          React.createElement(
            'div',
            { className: 'h-8 bg-slate-900 rounded overflow-hidden' },
            React.createElement('div', {
              className: 'h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500',
              style: { width: `${(item.value / maxValue) * 100}%` },
            })
          )
        )
      )
    )
  );
}
