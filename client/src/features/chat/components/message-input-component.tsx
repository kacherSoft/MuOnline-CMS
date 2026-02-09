/**
 * Message Input Component
 * Text input with send button, character counter, keyboard shortcuts
 */

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../stores/chat-store';
import { useChatSocket } from '../hooks/use-chat-socket';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_MESSAGE_LENGTH = 500;
const TYPING_DEBOUNCE = 500;

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const { currentChannel, isConnected } = useChatStore();
  const { sendMessage, sendTyping } = useChatSocket();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Handle typing indicator
  const handleTyping = (value: string) => {
    setMessage(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.length > 0 && !isTyping) {
      setIsTyping(true);
      sendTyping(true);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        sendTyping(false);
      }
    }, TYPING_DEBOUNCE);
  };

  // Handle send message
  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH || !isConnected) return;

    sendMessage(trimmed, currentChannel.id);
    setMessage('');

    // Clear typing indicator
    if (isTyping) {
      setIsTyping(false);
      sendTyping(false);
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Focus back on textarea
    textareaRef.current?.focus();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = !isConnected || message.trim().length === 0;
  const isOverLimit = message.length > MAX_MESSAGE_LENGTH;

  return (
    <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm p-4">
      <div className="flex items-end gap-3">
        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
            disabled={!isConnected}
            className={cn(
              'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl',
              'text-white placeholder-gray-500 resize-none',
              'focus:outline-none focus:ring-2 focus:ring-ice-blue/50 focus:border-ice-blue',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200',
              isOverLimit && 'border-red-500 focus:ring-red-500/50'
            )}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            rows={1}
          />

          {/* Character counter */}
          <div
            className={cn(
              'absolute bottom-2 right-2 text-xs transition-colors',
              isOverLimit ? 'text-red-400' : 'text-gray-500'
            )}
          >
            {message.length}/{MAX_MESSAGE_LENGTH}
          </div>
        </div>

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={isDisabled || isOverLimit}
          size="icon"
          className={cn(
            'h-11 w-11 flex-shrink-0 rounded-xl',
            'bg-gradient-to-br from-ice-blue to-blue-600',
            'hover:from-ice-blue/80 hover:to-blue-600/80',
            'shadow-lg shadow-ice-blue/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>Press Enter to send, Shift+Enter for newline</span>
        {!isConnected && <span className="text-yellow-500">Reconnecting...</span>}
      </div>
    </div>
  );
}

export default MessageInput;
