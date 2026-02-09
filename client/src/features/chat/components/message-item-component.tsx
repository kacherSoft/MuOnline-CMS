import * as React from 'react';
import type { Message } from '../types/chat-types';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';

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

export function MessageItem({ message, showAvatar = true, isGrouped = false }: MessageItemProps) {
  const { user } = useAuthStore();
  const isOwnMessage = message.senderId === user?.accountId || message.senderId === user?.id;
  const isSystemMessage = message.isSystemMessage;
  const timeAgo = formatRelativeTime(new Date(message.timestamp));

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2 px-4">
        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-2 px-4',
        isGrouped ? 'mt-0.5' : 'mt-3',
        isOwnMessage ? 'justify-end' : 'justify-start'
      )}
    >
      {!isOwnMessage && (
        <div className="flex-shrink-0 w-8">
          {showAvatar ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
              {message.senderName.charAt(0).toUpperCase()}
            </div>
          ) : null}
        </div>
      )}

      <div className={cn('max-w-[70%] min-w-[80px]')}>
        {!isOwnMessage && !isGrouped && (
          <p className="text-xs font-medium text-cyan-400 mb-0.5 ml-1">
            {message.senderName}
          </p>
        )}

        <div
          className={cn(
            'relative px-3 py-2 rounded-2xl',
            isOwnMessage
              ? 'bg-gradient-to-br from-cyan-600/80 to-blue-700/80 text-white'
              : 'bg-white/10 text-gray-100',
            isOwnMessage
              ? isGrouped ? 'rounded-tr-md' : 'rounded-tr-sm'
              : isGrouped ? 'rounded-tl-md' : 'rounded-tl-sm'
          )}
        >
          <p className="text-sm break-words whitespace-pre-wrap leading-relaxed pr-12">
            {message.content}
          </p>
          <span className="absolute bottom-1.5 right-2.5 text-[10px] text-white/50 whitespace-nowrap">
            {timeAgo}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
