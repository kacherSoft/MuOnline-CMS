/**
 * Channel Selector Component
 * Tab-based channel navigation (Global, Guild, Private)
 */

import * as React from 'react';
import { Hash, Users, MessageSquare } from 'lucide-react';
import { useChatStore } from '../stores/chat-store';
import { cn } from '@/lib/utils';

const CHANNEL_ICONS = {
  global: Hash,
  guild: Users,
  private: MessageSquare,
};

export function ChannelSelector() {
  const { availableChannels, currentChannel, setCurrentChannel } = useChatStore();

  return (
    <div className="flex items-center gap-1 p-2 bg-black/20 border-b border-white/10">
      {availableChannels.map((channel) => {
        const Icon = CHANNEL_ICONS[channel.type];
        const isActive = currentChannel.id === channel.id;
        const hasUnread = channel.unreadCount > 0;

        return (
          <button
            key={channel.id}
            onClick={() => !channel.disabled && setCurrentChannel(channel)}
            disabled={channel.disabled}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              'relative',
              isActive
                ? 'bg-ice-blue/20 text-ice-blue shadow-lg shadow-ice-blue/10'
                : channel.disabled
                ? 'text-gray-600 cursor-not-allowed opacity-50'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{channel.name}</span>

            {/* Unread badge */}
            {hasUnread && !isActive && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {channel.unreadCount > 9 ? '9+' : channel.unreadCount}
              </span>
            )}

            {/* Disabled indicator */}
            {channel.disabled && (
              <span className="ml-1 text-xs">(Soon)</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ChannelSelector;
