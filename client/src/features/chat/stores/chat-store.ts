/**
 * Chat Store
 * Zustand store for chat state management
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatStore, Channel, Message, OnlineUser, TypingUser } from '../types/chat-types';

const GLOBAL_CHANNEL: Channel = {
  id: 'global',
  type: 'global',
  name: 'Global Chat',
  unreadCount: 0,
};

const GUILD_CHANNEL: Channel = {
  id: 'guild',
  type: 'guild',
  name: 'Guild Chat',
  unreadCount: 0,
  disabled: true,
};

const PRIVATE_CHANNEL: Channel = {
  id: 'private',
  type: 'private',
  name: 'Private Messages',
  unreadCount: 0,
  disabled: true,
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      onlineUsers: [],
      currentChannel: GLOBAL_CHANNEL,
      availableChannels: [GLOBAL_CHANNEL, GUILD_CHANNEL, PRIVATE_CHANNEL],
      isConnected: false,
      typingUsers: new Map<number, TypingUser>(),

      // Actions
      addMessage: (message: Message) =>
        set((state) => {
          if (state.messages.some((m) => m.id === message.id)) return state;
          return { messages: [...state.messages, message] };
        }),

      addMessages: (messages: Message[]) =>
        set((state) => {
          const existingIds = new Set(state.messages.map((m) => m.id));
          const newMessages = messages.filter((m) => !existingIds.has(m.id));
          if (newMessages.length === 0) return state;
          return { messages: [...newMessages, ...state.messages] };
        }),

      setOnlineUsers: (users: OnlineUser[]) =>
        set({ onlineUsers: users }),

      addOnlineUser: (user: OnlineUser) =>
        set((state) => {
          const exists = state.onlineUsers.some((u) => u.id === user.id);
          if (exists) return state;
          return { onlineUsers: [...state.onlineUsers, user] };
        }),

      removeOnlineUser: (userId: number) =>
        set((state) => ({
          onlineUsers: state.onlineUsers.filter((u) => u.id !== userId),
        })),

      setCurrentChannel: (channel: Channel) =>
        set((state) => {
          const updatedChannels = state.availableChannels.map((ch) =>
            ch.id === channel.id ? { ...ch, unreadCount: 0 } : ch
          );
          return {
            currentChannel: channel,
            availableChannels: updatedChannels,
          };
        }),

      setConnected: (connected: boolean) =>
        set({ isConnected: connected }),

      setTypingUser: (userId: number, username: string, isTyping: boolean) =>
        set((state) => {
          const newTypingUsers = new Map(state.typingUsers);
          if (isTyping) {
            newTypingUsers.set(userId, { id: userId, username, timestamp: Date.now() });
          } else {
            newTypingUsers.delete(userId);
          }
          return { typingUsers: newTypingUsers };
        }),

      clearTypingUsers: () =>
        set({ typingUsers: new Map<number, TypingUser>() }),

      incrementUnreadCount: (channelId: string) =>
        set((state) => ({
          availableChannels: state.availableChannels.map((ch) =>
            ch.id === channelId ? { ...ch, unreadCount: ch.unreadCount + 1 } : ch
          ),
        })),

      clearUnreadCount: (channelId: string) =>
        set((state) => ({
          availableChannels: state.availableChannels.map((ch) =>
            ch.id === channelId ? { ...ch, unreadCount: 0 } : ch
          ),
        })),
    }),
    {
      name: 'muonline-cms-chat',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentChannel: state.currentChannel,
        availableChannels: state.availableChannels,
        // Don't persist messages, onlineUsers, typingUsers, isConnected
      }),
    }
  )
);

export default useChatStore;
