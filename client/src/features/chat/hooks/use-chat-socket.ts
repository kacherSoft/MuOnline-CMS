/**
 * Use Chat Socket Hook
 * Socket.io client for real-time chat functionality
 */

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../stores/chat-store';
import { useAuthStore } from '@/stores/auth-store';

function getSocketUrl(): string {
  const envUrl = import.meta.env.VITE_SOCKET_URL;
  if (!envUrl || envUrl === '/') {
    return window.location.origin;
  }
  return envUrl;
}

const TYPING_TIMEOUT = 3000;

let sharedSocket: Socket | null = null;
let sharedSocketToken: string | null = null;
let socketRefCount = 0;
let isRefreshingSocketToken = false;
let didLoadInitialHistory = false;

function getOrCreateSocket(token: string): Socket {
  if (sharedSocket && sharedSocketToken === token && (sharedSocket.connected || sharedSocket.active)) {
    socketRefCount++;
    return sharedSocket;
  }

  if (sharedSocket) {
    sharedSocket.removeAllListeners();
    sharedSocket.disconnect();
    sharedSocket = null;
  }

  didLoadInitialHistory = false;

  const socketUrl = getSocketUrl();
  sharedSocket = io(socketUrl, {
    auth: (cb) => {
      const latestToken = useAuthStore.getState().accessToken || token;
      cb({ token: latestToken });
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10,
  });
  sharedSocketToken = token;
  socketRefCount = 1;
  return sharedSocket;
}

export function emitChatDelete(messageId: number, cb: (resp: { success: boolean; error?: string }) => void) {
  const s = sharedSocket;
  if (!s?.connected) return cb({ success: false, error: 'Not connected to chat server' });
  s.emit('chat:delete', { messageId }, cb);
}

function releaseSocket() {
  socketRefCount--;
  if (socketRefCount <= 0 && sharedSocket) {
    sharedSocket.removeAllListeners();
    sharedSocket.disconnect();
    sharedSocket = null;
    sharedSocketToken = null;
    socketRefCount = 0;
    didLoadInitialHistory = false;
  }
}

export function useChatSocket() {
  const typingTimeoutRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  useEffect(() => {
    if (!isAuthReady || !accessToken || !user) {
      if (sharedSocket) {
        sharedSocket.removeAllListeners();
        sharedSocket.disconnect();
        sharedSocket = null;
        sharedSocketToken = null;
        socketRefCount = 0;
      }
      return;
    }

    const socket = getOrCreateSocket(accessToken);

    if (socketRefCount === 1) {
      socket.on('connect', () => {
        console.log('Chat socket connected');
        useChatStore.getState().setConnected(true);
        if (!didLoadInitialHistory) {
          didLoadInitialHistory = true;
          socket.emit('chat:history', { channel: 'global', limit: 50 }, (response: any) => {
            if (response?.success && response.messages) {
              const messages = response.messages.map((msg: any) => ({
                id: String(msg.id),
                channelId: msg.channel || 'global',
                senderId: msg.accountId,
                senderName: msg.characterName || 'Unknown',
                content: msg.message,
                timestamp: new Date(msg.createdAt),
                isSystemMessage: msg.messageType === 'system',
              }));
              useChatStore.getState().addMessages(messages);
            }
          });
        }
      });

      socket.on('disconnect', () => {
        console.log('Chat socket disconnected');
        useChatStore.getState().setConnected(false);
      });

      socket.on('connect_error', async (error) => {
        console.error('Socket connection error:', error.message);
        if (error.message.includes('Authentication') || error.message.includes('token')) {
          if (isRefreshingSocketToken) return;
          isRefreshingSocketToken = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const apiUrl = import.meta.env.VITE_API_URL || '/api';
              const res = await fetch(`${apiUrl}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
              });
              if (res.ok) {
                const data = await res.json();
                const newToken = data.data?.accessToken;
                if (newToken) {
                  localStorage.setItem('access_token', newToken);
                  useAuthStore.getState().setAuth(
                    useAuthStore.getState().user!,
                    newToken,
                    refreshToken
                  );
                  sharedSocketToken = newToken;
                  if (sharedSocket) {
                    sharedSocket.connect();
                  }
                  return;
                }
              }
            }
            useAuthStore.getState().clearAuth();
          } catch {
            useAuthStore.getState().clearAuth();
          } finally {
            isRefreshingSocketToken = false;
          }
        }
      });

      socket.on('chat:message', (data: any) => {
        const message = {
          id: String(data.id),
          channelId: data.channel || 'global',
          senderId: data.accountId,
          senderName: data.characterName || 'Unknown',
          content: data.message,
          timestamp: new Date(data.createdAt),
          isSystemMessage: data.messageType === 'system',
        };
        useChatStore.getState().addMessage(message);
      });

      socket.on('chat:system', (msg: string) => {
        const message = {
          id: `system-${Date.now()}`,
          channelId: 'global',
          senderId: 0,
          senderName: 'System',
          content: msg,
          timestamp: new Date(),
          isSystemMessage: true,
        };
        useChatStore.getState().addMessage(message);
      });

      socket.on('chat:online-users', (data: any[]) => {
        const users = data.map((u) => ({
          id: u.accountId,
          username: u.characterName || `User-${u.accountId}`,
          characterName: u.characterName || undefined,
          status: 'online' as const,
          channel: 'global' as const,
        }));
        useChatStore.getState().setOnlineUsers(users);
      });

      socket.on('chat:online-count', (_count: number) => {
      });

      socket.on('chat:user-joined', (data: { characterName: string; channel: string }) => {
        const systemMsg = {
          id: `join-${Date.now()}`,
          channelId: data.channel,
          senderId: 0,
          senderName: 'System',
          content: `${data.characterName} joined the chat`,
          timestamp: new Date(),
          isSystemMessage: true,
        };
        useChatStore.getState().addMessage(systemMsg);
      });

      socket.on('chat:user-left', (data: { characterName: string; channel: string }) => {
        const systemMsg = {
          id: `leave-${Date.now()}`,
          channelId: data.channel,
          senderId: 0,
          senderName: 'System',
          content: `${data.characterName} left the chat`,
          timestamp: new Date(),
          isSystemMessage: true,
        };
        useChatStore.getState().addMessage(systemMsg);
      });

      socket.on('chat:typing', (data: { accountId: number; username: string; isTyping: boolean }) => {
        if (!data.accountId) return;
        useChatStore.getState().setTypingUser(data.accountId, data.username, data.isTyping);

        if (data.isTyping) {
          const existingTimeout = typingTimeoutRef.current.get(data.accountId);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }

          const timeout = setTimeout(() => {
            useChatStore.getState().setTypingUser(data.accountId, data.username, false);
            typingTimeoutRef.current.delete(data.accountId);
          }, TYPING_TIMEOUT);

          typingTimeoutRef.current.set(data.accountId, timeout);
        }
      });

      socket.on('chat:message-deleted', (data: { messageId: number; channel: string }) => {
        useChatStore.getState().deleteMessage(String(data.messageId));
      });
    }

    return () => {
      typingTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      typingTimeoutRef.current.clear();
      releaseSocket();
    };
  }, [accessToken, user, isAuthReady]);

  const sendMessage = useCallback((message: string, channelId: string) => {
    if (sharedSocket?.connected) {
      sharedSocket.emit('chat:send', { message, channel: channelId }, (response: any) => {
        if (response?.success && response.message) {
          const msg = response.message;
          useChatStore.getState().addMessage({
            id: String(msg.id),
            channelId: msg.channel || channelId,
            senderId: msg.accountId,
            senderName: msg.characterName || 'Unknown',
            content: msg.message,
            timestamp: new Date(msg.createdAt),
            isSystemMessage: msg.messageType === 'system',
          });
        } else if (response && !response.success) {
          console.error('Failed to send message:', response.error);
        }
      });
    }
  }, []);

  const requestHistory = useCallback((channelId: string, limit: number = 50) => {
    if (sharedSocket?.connected) {
      sharedSocket.emit('chat:history', { channel: channelId, limit }, (response: any) => {
        if (response?.success && response.messages) {
          const messages = response.messages.map((msg: any) => ({
            id: String(msg.id),
            channelId: msg.channel || 'global',
            senderId: msg.accountId,
            senderName: msg.characterName || 'Unknown',
            content: msg.message,
            timestamp: new Date(msg.createdAt),
            isSystemMessage: msg.messageType === 'system',
          }));
          useChatStore.getState().addMessages(messages);
        }
      });
    }
  }, []);

  const sendTyping = useCallback((isTyping: boolean) => {
    if (sharedSocket?.connected) {
      sharedSocket.emit('chat:typing', { isTyping, characterName: '' });
    }
  }, []);

  const joinChannel = useCallback((channelId: string) => {
    if (sharedSocket?.connected) {
      sharedSocket.emit('chat:join', channelId);
    }
  }, []);

  const leaveChannel = useCallback((channelId: string) => {
    if (sharedSocket?.connected) {
      sharedSocket.emit('chat:leave', channelId);
    }
  }, []);

  return {
    isConnected: sharedSocket?.connected ?? false,
    sendMessage,
    requestHistory,
    sendTyping,
    joinChannel,
    leaveChannel,
  };
}

export default useChatSocket;
