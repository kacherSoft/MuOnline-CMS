/**
 * Server Status Component
 * Displays current server status and uptime
 */

import React from 'react';

interface ServerStatusProps {
  isOnline: boolean;
  uptime: number | null;
  lastRestart: number | null;
}

export function ServerStatus({ isOnline, uptime, lastRestart }: ServerStatusProps) {
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return React.createElement(
    'div',
    {
      className: 'bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6',
    },
    React.createElement(
      'h2',
      { className: 'text-lg font-semibold text-white mb-4' },
      'Server Status'
    ),

    React.createElement(
      'div',
      { className: 'space-y-4' },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between p-3 bg-slate-700/50 rounded-lg' },
        React.createElement(
          'span',
          { className: 'text-slate-300' },
          'Connection Status'
        ),
        React.createElement(
          'span',
          {
            className: `
              px-3 py-1 rounded-full text-sm font-medium
              ${isOnline
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
              }
            `,
          },
          isOnline ? '● Online' : '● Offline'
        )
      ),

      uptime !== null &&
        React.createElement(
          'div',
          { className: 'flex items-center justify-between p-3 bg-slate-700/50 rounded-lg' },
          React.createElement(
            'span',
            { className: 'text-slate-300' },
            'Server Uptime'
          ),
          React.createElement(
            'span',
            { className: 'text-amber-400 font-mono' },
            formatUptime(uptime)
          )
        ),

      lastRestart !== null &&
        React.createElement(
          'div',
          { className: 'flex items-center justify-between p-3 bg-slate-700/50 rounded-lg' },
          React.createElement(
            'span',
            { className: 'text-slate-300' },
            'Last Restart'
          ),
          React.createElement(
            'span',
            { className: 'text-slate-400 text-sm' },
            new Date(lastRestart * 1000).toLocaleString()
          )
        )
    )
  );
}
