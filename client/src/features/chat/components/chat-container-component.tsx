/**
 * Chat Container Component
 * Main layout with message list, input, sidebar, responsive design
 */

import * as React from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useChatSocket } from '../hooks/use-chat-socket';
import { useChatStore } from '../stores/chat-store';
import { MessageList } from './message-list-component';
import { MessageInput } from './message-input-component';
import { OnlineUsersPanel } from './online-users-panel-component';
import { ChannelSelector } from './channel-selector-component';
import { TypingIndicator } from './typing-indicator-component';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ChatContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isConnected, currentChannel } = useChatStore();

  // Initialize socket connection
  useChatSocket();

  return (
    <div className="h-screen flex flex-col bg-[#0a1628]">
      {/* Header with channel selector */}
      <div className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <ChannelSelector />
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                isConnected ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <span className="text-sm text-gray-400">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Mobile sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Message list */}
          <MessageList />

          {/* Typing indicator */}
          <TypingIndicator />

          {/* Message input */}
          <MessageInput />
        </div>

        {/* Sidebar - Online users */}
        <div
          className={cn(
            'fixed inset-y-0 right-0 w-72 z-50 lg:relative lg:z-auto lg:w-80',
            'transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          )}
        >
          <div className="h-full lg:hidden absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative h-full">
            <OnlineUsersPanel />
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default ChatContainer;
