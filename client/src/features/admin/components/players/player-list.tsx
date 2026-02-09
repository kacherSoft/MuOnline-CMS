/**
 * Player List Component
 * DataTable displaying search results with actions
 */

import React from 'react';
import type { PlayerSearchResult } from '../../types/admin-types';

interface PlayerListProps {
  players: PlayerSearchResult[];
  isLoading: boolean;
  onSelectPlayer: (accountId: number) => void;
  onBan: (accountId: number, accountName: string) => void;
}

export function PlayerList({ players, isLoading, onSelectPlayer, onBan }: PlayerListProps) {
  if (isLoading) {
    return React.createElement(
      'div',
      { className: 'space-y-2' },
      ...Array(5).fill(null).map((_, i) =>
        React.createElement(
          'div',
          {
            key: i,
            className: 'bg-slate-800/50 rounded-lg p-4 animate-pulse',
          },
          React.createElement('div', { className: 'h-4 bg-slate-700 rounded mb-2' }),
          React.createElement('div', { className: 'h-3 bg-slate-700 rounded w-2/3' })
        )
      )
    );
  }

  if (players.length === 0) {
    return React.createElement(
      'div',
      { className: 'text-center text-slate-400 py-12' },
      React.createElement('p', { className: 'text-lg mb-2' }, 'No players found'),
      React.createElement('p', { className: 'text-sm' }, 'Try searching with a different query')
    );
  }

  return React.createElement(
    'div',
    { className: 'space-y-2' },
    ...players.map((player) =>
      React.createElement(
        'div',
        {
          key: player.guid,
          className: `
            bg-slate-800/50 backdrop-blur border border-slate-700
            rounded-lg p-4 hover:border-amber-500/50 transition-colors
          `,
        },
        React.createElement(
          'div',
          { className: 'flex items-center justify-between' },
          React.createElement(
            'div',
            { className: 'flex-1 cursor-pointer', onClick: () => onSelectPlayer(player.guid) },
            React.createElement(
              'div',
              { className: 'flex items-center gap-3' },
              React.createElement(
                'div',
                { className: 'w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center' },
                React.createElement('span', { className: 'text-lg' }, getPlayerIcon(player.status))
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'p',
                  { className: 'text-white font-medium' },
                  player.account
                ),
                React.createElement(
                  'p',
                  { className: 'text-slate-500 text-sm' },
                  player.email || 'No email'
                )
              )
            ),
            player.isOnline &&
              React.createElement(
                'span',
                { className: 'ml-3 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded' },
                'Online'
              )
          ),
          React.createElement(
            'div',
            { className: 'flex items-center gap-2' },
            React.createElement(
              'div',
              { className: 'text-right text-sm mr-4' },
              React.createElement(
                'p',
                { className: 'text-slate-400' },
                `${player.characterCount} characters`
              ),
              React.createElement(
                'p',
                { className: 'text-slate-500 text-xs' },
                new Date(player.createDate * 1000).toLocaleDateString()
              )
            ),
            React.createElement(
              'button',
              {
                onClick: () => onSelectPlayer(player.guid),
                className: `
                  px-3 py-1.5 text-sm bg-slate-700 text-slate-300 rounded
                  hover:bg-slate-600 transition-colors
                `,
              },
              'View'
            ),
            player.status !== 'banned' &&
              React.createElement(
                'button',
                {
                  onClick: () => onBan(player.guid, player.account),
                  className: `
                    px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded
                    hover:bg-red-500/30 transition-colors
                  `,
                },
                'Ban'
              ),
            player.status === 'banned' &&
              React.createElement(
                'span',
                { className: 'px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded' },
                'Banned'
              )
          )
        )
      )
    )
  );
}

function getPlayerIcon(status: string): string {
  if (status === 'banned') return '🔒';
  if (status === 'suspended') return '⚠️';
  return '👤';
}
