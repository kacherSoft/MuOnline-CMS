import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { Message } from '../types/chat-types';
import { useAuthStore } from '@/stores/auth-store';
import { useChatStore } from '../stores/chat-store';
import { emitChatDelete } from '../hooks/use-chat-socket';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog-component';

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
  const { deleteMessage } = useChatStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const isOwnMessage = message.senderId === user?.accountId || message.senderId === user?.id;
  const isSystemMessage = message.isSystemMessage;
  const isDeleted = !!message.deletedAt;
  const timeAgo = formatRelativeTime(new Date(message.timestamp));

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    if (contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isOwnMessage || isDeleted || isDeleting) return;

    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDeleteClick = () => {
    setContextMenu(null);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    setDeleteError(null);
    emitChatDelete(parseInt(message.id, 10), (response) => {
      if (response.success) {
        deleteMessage(message.id);
        setShowDeleteConfirm(false);
      } else {
        setDeleteError(response.error || 'Failed to delete message');
      }
      setIsDeleting(false);
    });
  };

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2 px-4">
        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  if (isDeleted) {
    return (
      <div
        className={cn(
          'flex gap-2 px-4',
          isGrouped ? 'mt-0.5' : 'mt-3',
          'opacity-50'
        )}
      >
        {!isOwnMessage && (
          <div className="flex-shrink-0 w-8">
            {showAvatar ? (
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
                {message.senderName.charAt(0).toUpperCase()}
              </div>
            ) : null}
          </div>
        )}

        <div className={cn('max-w-[70%] min-w-[80px]')}>
          {!isOwnMessage && !isGrouped && (
            <p className="text-xs font-medium text-gray-500 mb-0.5 ml-1">
              {message.senderName}
            </p>
          )}

          <div
            className={cn(
              'relative px-3 py-2 rounded-2xl bg-white/5 text-gray-500',
              isOwnMessage
                ? isGrouped ? 'rounded-tr-md' : 'rounded-tr-sm'
                : isGrouped ? 'rounded-tl-md' : 'rounded-tl-sm'
            )}
          >
            <p className="text-sm italic">Message deleted</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'flex gap-2 px-4',
          isGrouped ? 'mt-0.5' : 'mt-3',
          isOwnMessage ? 'justify-end' : 'justify-start'
        )}
        onContextMenu={handleContextMenu}
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

          <div className="relative">
            <div
              className={cn(
                'relative px-3 py-2 rounded-2xl',
                isOwnMessage
                  ? 'bg-gradient-to-br from-cyan-600/80 to-blue-700/80 text-white'
                  : 'bg-white/10 text-gray-100',
                isOwnMessage
                  ? isGrouped ? 'rounded-tr-md' : 'rounded-tr-sm'
                  : isGrouped ? 'rounded-tl-md' : 'rounded-tl-sm',
                isDeleting && 'opacity-50'
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
      </div>

      {/* Context Menu */}
      {contextMenu && isOwnMessage && (
        <div
          ref={contextMenuRef}
          className="fixed z-50 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl py-1 min-w-[160px]"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
          }}
        >
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Message</span>
          </button>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default MessageItem;
