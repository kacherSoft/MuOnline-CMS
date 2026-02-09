/**
 * Message List Component
 * Displays chat messages with auto-scroll and message grouping
 */

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useChatStore } from '../stores/chat-store';
import { MessageItem } from './message-item-component';
import { cn } from '@/lib/utils';
import type { Message } from '../types/chat-types';

export function MessageList() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, currentChannel } = useChatStore();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter messages for current channel
  const channelMessages = messages.filter((msg) => msg.channelId === currentChannel.id);

  // Group messages by sender for consecutive messages
  const groupedMessages = channelMessages.reduce((acc, msg, index) => {
    const prevMsg = acc[acc.length - 1];
    const isGrouped =
      prevMsg &&
      prevMsg.senderId === msg.senderId &&
      new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() < 60000 && // Within 1 minute
      !prevMsg.isSystemMessage &&
      !msg.isSystemMessage;

    return [...acc, { ...msg, isGrouped }];
  }, [] as Array<Message & { isGrouped: boolean }>);

  // Show avatar only for first message in group
  const getShowAvatar = (msg: Message & { isGrouped: boolean }, index: number) => {
    if (msg.isGrouped) return false;
    return true;
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex-1 overflow-y-auto scrollbar-dark',
        'scroll-smooth'
      )}
    >
      {groupedMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">No messages yet</p>
            <p className="text-sm">Be the first to say hello!</p>
          </div>
        </div>
      ) : (
        <div className="py-4">
          {groupedMessages.map((msg, index) => (
            <MessageItem
              key={msg.id}
              message={msg}
              showAvatar={getShowAvatar(msg, index)}
              isGrouped={msg.isGrouped}
            />
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
