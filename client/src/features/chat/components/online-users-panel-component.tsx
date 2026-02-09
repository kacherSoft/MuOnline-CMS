/**
 * Online Users Panel Component
 * Sidebar showing online users with status indicators
 */

import * as React from 'react';
import { Users } from 'lucide-react';
import { useChatStore } from '../stores/chat-store';
import { cn } from '@/lib/utils';

const STATUS_COLORS = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const CLASS_ICONS: Record<string, string> = {
  'Dark Wizard': '🔮',
  'Soul Master': '✨',
  'Grand Master': '🌟',
  'Dark Knight': '⚔️',
  'Blade Knight': '🗡️',
  'Blade Master': '💎',
  'Fairy Elf': '🧝',
  'Muse Elf': '🏹',
  'High Elf': '🌿',
  'Magic Gladiator': '🔥',
  'Duel Master': '⚡',
  'Dark Lord': '👑',
  'Lord Emperor': '🏰',
  'Summoner': '🌀',
  'Bloody Summoner': '💀',
  'Dimension Master': '🌌',
  'Rage Fighter': '👊',
  'Fist Master': '🥊',
  'Grow Lancer': '🛡️',
  'Mirage Lancer': '🔱',
};

export function OnlineUsersPanel() {
  const { onlineUsers } = useChatStore();

  return (
    <div className="h-full bg-black/40 border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-ice-blue" />
          <h2 className="text-sm font-semibold text-white">Online Users</h2>
          <span className="ml-auto text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
            {onlineUsers.length}
          </span>
        </div>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto scrollbar-dark p-2">
        {onlineUsers.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm text-center">No users online</p>
          </div>
        ) : (
          <div className="space-y-1">
            {onlineUsers.map((user) => (
              <div
                key={user.id}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg',
                  'hover:bg-white/5 transition-colors',
                  'cursor-pointer'
                )}
              >
                {/* Status indicator */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-ice-blue flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div
                    className={cn(
                      'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a1628]',
                      STATUS_COLORS[user.status]
                    )}
                  />
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{user.username}</p>
                    {user.characterClass && (
                      <span title={user.characterClass} className="text-xs">
                        {CLASS_ICONS[user.characterClass] || '⚔️'}
                      </span>
                    )}
                  </div>
                  {user.characterName && (
                    <p className="text-xs text-gray-500 truncate">{user.characterName}</p>
                  )}
                </div>

                {/* Channel badge */}
                <div className="text-xs text-gray-500 capitalize">{user.channel}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineUsersPanel;
