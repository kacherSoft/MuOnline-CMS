/**
 * Account Detail Modal Component
 * Displays detailed account information with actions
 */

import React from 'react';
import type { PlayerDetails, BanInfo } from '../../types/admin-types';

interface AccountDetailModalProps {
  player: PlayerDetails | null;
  isLoading: boolean;
  onClose: () => void;
  onBan: () => void;
  onUnban: () => void;
  onSelectCharacter: (name: string) => void;
}

export function AccountDetailModal({ player, isLoading, onClose, onBan, onUnban, onSelectCharacter }: AccountDetailModalProps) {
  if (!player) {
    return null;
  }

  return React.createElement(
    'div',
    {
      className: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4',
      onClick: onClose,
    },
    React.createElement(
      'div',
      {
        className: `
          bg-slate-800 border border-slate-700 rounded-lg
          max-w-2xl w-full max-h-[90vh] overflow-hidden
          flex flex-col
        `,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between p-6 border-b border-slate-700' },
        React.createElement(
          'h2',
          { className: 'text-xl font-bold text-white' },
          'Account Details'
        ),
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: 'text-slate-400 hover:text-white text-2xl',
          },
          '×'
        )
      ),

      isLoading
        ? React.createElement(
            'div',
            { className: 'flex-1 flex items-center justify-center p-12' },
            React.createElement('div', { className: 'text-amber-400' }, 'Loading...')
          )
        : React.createElement(
            'div',
            { className: 'flex-1 overflow-y-auto p-6 scrollbar-dark' },
            renderAccountInfo(player),
            renderBanInfo(player.banInfo, onBan, onUnban),
            renderCharacters(player.characters, onSelectCharacter)
          ),

      React.createElement(
        'div',
        { className: 'p-4 border-t border-slate-700 flex justify-end' },
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: 'px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors',
          },
          'Close'
        )
      )
    )
  );
}

function renderAccountInfo(player: PlayerDetails) {
  return React.createElement(
    'div',
    { className: 'mb-6' },
    React.createElement(
      'h3',
      { className: 'text-sm font-semibold text-slate-400 mb-3' },
      'Account Information'
    ),
    React.createElement(
      'div',
      { className: 'grid grid-cols-2 gap-4' },
      renderInfoRow('Username', player.account),
      renderInfoRow('Account ID', player.guid.toString()),
      renderInfoRow('Email', player.email || 'Not set'),
      renderInfoRow('Status', renderStatusBadge(player.status)),
      renderInfoRow('Created', new Date(player.createDate * 1000).toLocaleString()),
      renderInfoRow('Last Login', player.lastLogin ? new Date(player.lastLogin * 1000).toLocaleString() : 'Never')
    )
  );
}

function renderBanInfo(banInfo: BanInfo | null, onBan: () => void, onUnban: () => void) {
  if (!banInfo) {
    return React.createElement(
      'div',
      { className: 'mb-6 p-4 bg-slate-700/50 rounded-lg flex items-center justify-between' },
      React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-white font-medium' }, 'Account is not banned'),
        React.createElement('p', { className: 'text-slate-400 text-sm' }, 'This account can access the server')
      ),
      React.createElement(
        'button',
        {
          onClick: onBan,
          className: 'px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors',
        },
        'Ban Account'
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg' },
    React.createElement('h4', { className: 'text-red-400 font-medium mb-2' }, 'Account Banned'),
    React.createElement('p', { className: 'text-slate-300 mb-1' }, `Reason: ${banInfo.banReason}`),
    React.createElement('p', { className: 'text-slate-400 text-sm mb-1' }, `Banned by: ${banInfo.bannedBy}`),
    React.createElement(
      'p',
      { className: 'text-slate-400 text-sm mb-4' },
      `Expires: ${banInfo.expiresAt ? new Date(banInfo.expiresAt * 1000).toLocaleString() : 'Never'}`
    ),
    React.createElement(
      'button',
      {
        onClick: onUnban,
        className: 'px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors',
      },
      'Unban Account'
    )
  );
}

function renderCharacters(characters: any[], onSelectCharacter: (name: string) => void) {
  if (characters.length === 0) {
    return React.createElement(
      'div',
      { className: 'p-4 bg-slate-700/50 rounded-lg text-center text-slate-400' },
      'No characters found'
    );
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      { className: 'text-sm font-semibold text-slate-400 mb-3' },
      `Characters (${characters.length})`
    ),
    React.createElement(
      'div',
      { className: 'space-y-2' },
      ...characters.map((char) =>
        React.createElement(
          'div',
          {
            key: char.name,
            className: `
              bg-slate-700/50 rounded-lg p-3 flex items-center justify-between
              hover:bg-slate-700 transition-colors cursor-pointer
            `,
            onClick: () => onSelectCharacter(char.name),
          },
          React.createElement(
            'div',
            { className: 'flex items-center gap-3' },
            React.createElement(
              'span',
              { className: 'text-2xl' },
              getClassIcon(char.class)
            ),
            React.createElement(
              'div',
              null,
              React.createElement('p', { className: 'text-white font-medium' }, char.name),
              React.createElement(
                'p',
                { className: 'text-slate-400 text-sm' },
                `Level ${char.level} • ${char.resets} Reset${char.resets !== 1 ? 's' : ''}`
              )
            )
          ),
          char.isOnline &&
            React.createElement(
              'span',
              { className: 'px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded' },
              'Online'
            ),
          React.createElement('span', { className: 'text-slate-500 ml-2' }, '›')
        )
      )
    )
  );
}

function renderInfoRow(label: string, value: React.ReactNode) {
  return React.createElement(
    'div',
    null,
    React.createElement('p', { className: 'text-slate-500 text-xs mb-1' }, label),
    React.createElement('p', { className: 'text-white text-sm' }, value)
  );
}

function renderStatusBadge(status: string) {
  const colors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400',
    banned: 'bg-red-500/20 text-red-400',
    suspended: 'bg-yellow-500/20 text-yellow-400',
  };

  return React.createElement(
    'span',
    {
      className: `px-2 py-0.5 rounded text-xs ${colors[status] || 'bg-slate-600 text-slate-300'}`,
    },
    status.charAt(0).toUpperCase() + status.slice(1)
  );
}

function getClassIcon(classNum: number): string {
  const icons: Record<number, string> = {
    0: '⚔️',
    1: '🛡️',
    2: '🏹',
    3: '✨',
    16: '🗡️',
    17: '🔮',
    18: '🌀',
    19: '🌙',
    32: '👑',
    33: '🦁',
    48: '🎭',
    64: '🔥',
    65: '💧',
    66: '🌿',
    80: '🌟',
  };
  return icons[classNum] || '⚔️';
}
