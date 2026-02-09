/**
 * Message Item Component
 * Single message display with avatar, username, class badge, timestamp
 */

import * as React from 'react';
import type { Message } from '../types/chat-types';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';

// Format relative time helper
function formatRelativeTime(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return timestamp.toLocaleDateString();
}

interface MessageItemProps {
  message: Message;
  showAvatar?: boolean;
  isGrouped?: boolean;
}

const CLASS_COLORS: Record<string, string> = {
  'Dark Wizard': 'text-purple-400',
  'Soul Master': 'text-purple-300',
  'Grand Master': 'text-purple-200',
  'Dark Knight': 'text-red-400',
  'Blade Knight': 'text-red-300',
  'Blade Master': 'text-red-200',
  'Fairy Elf': 'text-green-400',
  'Muse Elf': 'text-green-300',
  'High Elf': 'text-green-200',
  'Magic Gladiator': 'text-yellow-400',
  'Duel Master': 'text-yellow-300',
  'Dark Lord': 'text-blue-400',
  'Lord Emperor': 'text-blue-300',
  'Summoner': 'text-pink-400',
  'Bloody Summoner': 'text-pink-300',
  'Dimension Master': 'text-pink-200',
  'Rage Fighter': 'text-orange-400',
  'Fist Master': 'text-orange-300',
  'Grow Lancer': 'text-cyan-400',
  'Mirage Lancer': 'text-cyan-300',
};

export function MessageItem({ message, showAvatar = true, isGrouped = false }: MessageItemProps) {
  const { user } = useAuthStore();
  const isOwnMessage = message.senderId === user?.accountId || message.senderId === user?.id;
  const isSystemMessage = message.isSystemMessage;

  // Get class color
  const classColor = message.senderCharacterClass
    ? CLASS_COLORS[message.senderCharacterClass] || 'text-gray-400'
    : 'text-gray-400';

  // Format relative time
  const timeAgo = formatRelativeTime(new Date(message.timestamp));

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-3 py-1 px-4 hover:bg-white/5 transition-colors',
        isOwnMessage && 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ice-blue to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-ice-blue/20">
            {message.senderName.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      {/* Message content */}
      <div className={cn('flex-1 min-w-0', isGrouped && 'ml-11')}>
        {/* Header (username, class, time) */}
        {!isGrouped && (
          <div className={cn('flex items-baseline gap-2 mb-1', isOwnMessage && 'justify-end')}>
            <div className="flex items-center gap-2">
              <span className={cn('text-sm font-semibold', isOwnMessage ? 'text-ice-blue' : 'text-white')}>
                {message.senderName}
              </span>
              {message.senderCharacterClass && (
                <span className={cn('text-xs px-2 py-0.5 rounded bg-white/10', classColor)}>
                  {message.senderCharacterClass}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>
        )}

        {/* Message text */}
        <div
          className={cn(
            'inline-block max-w-[80%] px-4 py-2 rounded-2xl',
            isOwnMessage
              ? 'bg-ice-blue/20 text-white rounded-tr-sm'
              : 'bg-white/10 text-gray-100 rounded-tl-sm'
          )}
        >
          <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
