/**
 * Admin Dashboard Component
 * Main admin dashboard with statistics overview
 */

import React from 'react';
import { Sidebar } from './sidebar';
import { StatsOverview } from './statistics/stats-overview';
import { OnlineCount } from './statistics/online-count';
import { RegistrationChart } from './statistics/registration-chart';
import { useStatistics } from '../hooks/use-statistics';

export function AdminDashboard() {
  const { statistics, onlineByServer, isLoading, error } = useStatistics();

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-[#0a1628]' },
    React.createElement(Sidebar),
    React.createElement(
      'main',
      { className: 'ml-56 p-6' },
      React.createElement(
        'div',
        { className: 'mb-8' },
        React.createElement(
          'h1',
          { className: 'text-3xl font-bold text-white mb-2' },
          'Dashboard'
        ),
        React.createElement(
          'p',
          { className: 'text-slate-400' },
          'Welcome back, Game Master'
        )
      ),

      error &&
        React.createElement(
          'div',
          { className: 'mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg' },
          React.createElement('p', { className: 'text-red-400' }, error)
        ),

      React.createElement(StatsOverview, { statistics, isLoading }),

      React.createElement(
        'div',
        { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6' },
        React.createElement(OnlineCount, { statistics, onlineByServer, isLoading }),
        React.createElement(RegistrationChart, { statistics, isLoading })
      )
    )
  );
}
