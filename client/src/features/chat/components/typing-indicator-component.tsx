/**
 * Typing Indicator Component
 * Shows "X users typing..." with animated dots
 */

import * as React from 'react';
import { useChatStore } from '../stores/chat-store';
import { cn } from '@/lib/utils';

export function TypingIndicator() {
  const { typingUsers } = useChatStore();
  const typingUserArray = Array.from(typingUsers.values());

  if (typingUserArray.length === 0) return null;

  const getText = () => {
    const count = typingUserArray.length;
    if (count === 1) {
      return `${typingUserArray[0].username} is typing`;
    }
    if (count === 2) {
      return `${typingUserArray[0].username} and ${typingUserArray[1].username} are typing`;
    }
    return `${count} users are typing`;
  };

  return (
    <div className="px-4 py-2 text-xs text-gray-400 flex items-center gap-2 animate-fade-in">
      <span>{getText()}</span>
      <span className="flex gap-1">
        <span className="w-1 h-1 bg-ice-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1 h-1 bg-ice-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1 h-1 bg-ice-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </span>
    </div>
  );
}

export default TypingIndicator;
