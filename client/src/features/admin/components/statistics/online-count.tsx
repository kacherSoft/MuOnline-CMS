/**
 * Online Count Component
 * Large display of online players with server breakdown
 */

import React from 'react';
import type { ServerStatistics, OnlinePlayersByServer } from '../../types/admin-types';

interface OnlineCountProps {
  statistics: ServerStatistics | null;
  onlineByServer: OnlinePlayersByServer[];
  isLoading: boolean;
}

export function OnlineCount({ statistics, onlineByServer, isLoading }: OnlineCountProps) {
  if (isLoading) {
    return React.createElement(
      'div',
      {
        className: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-8',
      },
      React.createElement('div', { className: 'h-20 bg-slate-700 rounded animate-pulse' })
    );
  }

  if (!statistics) {
    return null;
  }

  const isOnline = statistics.serverStatus === 'online';

  return React.createElement(
    'div',
    {
      className: `
        bg-gradient-to-br from-slate-800/50 to-slate-900/50
        backdrop-blur border border-slate-700 rounded-lg p-8
      `,
    },
    React.createElement(
      'div',
      { className: 'flex items-center justify-between mb-6' },
      React.createElement(
        'h2',
        { className: 'text-lg font-semibold text-white' },
        'Server Status'
      ),
      React.createElement(
        'span',
        {
          className: `
            px-3 py-1 rounded-full text-sm font-medium
            ${isOnline
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }
          `,
        },
        isOnline ? '● Online' : '● Offline'
      )
    ),

    React.createElement(
      'div',
      { className: 'text-center mb-8' },
      React.createElement(
        'p',
        { className: 'text-slate-400 text-sm mb-2' },
        'Players Online'
      ),
      React.createElement(
        'p',
        { className: 'text-6xl font-bold text-amber-400' },
        statistics.onlinePlayers.toLocaleString()
      )
    ),

    onlineByServer.length > 0 &&
      React.createElement(
        'div',
        { className: 'space-y-2' },
        React.createElement(
          'p',
          { className: 'text-slate-400 text-sm mb-3' },
          'By Server'
        ),
        ...onlineByServer.map((server) =>
          React.createElement(
            'div',
            {
              key: server.serverCode,
              className: `
                flex items-center justify-between
                bg-slate-800/50 rounded-lg px-4 py-3
              `,
            },
            React.createElement(
              'span',
              { className: 'text-slate-300' },
              `${server.serverName} (${server.serverCode})`
            ),
            React.createElement(
              'span',
              { className: 'text-amber-400 font-semibold' },
              server.onlineCount.toLocaleString()
            )
          )
        )
      )
  );
}
