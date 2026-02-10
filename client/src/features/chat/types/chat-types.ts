/**
 * Chat Type Definitions
 * TypeScript interfaces for chat system
 */

export type ChannelType = 'global' | 'guild' | 'private';

export type CharacterClass =
  | 'Dark Wizard'
  | 'Soul Master'
  | 'Grand Master'
  | 'Dark Knight'
  | 'Blade Knight'
  | 'Blade Master'
  | 'Fairy Elf'
  | 'Muse Elf'
  | 'High Elf'
  | 'Magic Gladiator'
  | 'Duel Master'
  | 'Dark Lord'
  | 'Lord Emperor'
  | 'Summoner'
  | 'Bloody Summoner'
  | 'Dimension Master'
  | 'Rage Fighter'
  | 'Fist Master'
  | 'Grow Lancer'
  | 'Mirage Lancer';

export interface Message {
  id: string;
  channelId: string;
  senderId: number;
  senderName: string;
  senderCharacterClass?: CharacterClass;
  content: string;
  timestamp: Date;
  isSystemMessage?: boolean;
  deletedAt?: number;
}

export interface OnlineUser {
  id: number;
  username: string;
  characterName?: string;
  characterClass?: CharacterClass;
  status: 'online' | 'away' | 'busy';
  channel: ChannelType;
}

export interface Channel {
  id: string;
  type: ChannelType;
  name: string;
  unreadCount: number;
  disabled?: boolean;
}

export interface TypingUser {
  id: number;
  username: string;
  timestamp: number;
}

export interface ChatSocketEvents {
  // Client to Server
  sendMessage: (data: { message: string; channelId: string }) => void;
  sendTyping: (data: { isTyping: boolean }) => void;
  requestHistory: (data: { channelId: string; limit: number }) => void;
  joinChannel: (data: { channelId: string }) => void;
  leaveChannel: (data: { channelId: string }) => void;

  // Server to Client
  onMessage: (callback: (message: Message) => void) => void;
  onMessageHistory: (callback: (messages: Message[]) => void) => void;
  onUserJoined: (callback: (user: OnlineUser) => void) => void;
  onUserLeft: (callback: (userId: number) => void) => void;
  onTyping: (callback: (data: { userId: number; isTyping: boolean }) => void) => void;
  onOnlineCount: (callback: (count: number) => void) => void;
  onOnlineUsers: (callback: (users: OnlineUser[]) => void) => void;
  onConnect: (callback: () => void) => void;
  onDisconnect: (callback: () => void) => void;
  onError: (callback: (error: Error) => void) => void;
}

export interface ChatStore {
  // State
  messages: Message[];
  onlineUsers: OnlineUser[];
  currentChannel: Channel;
  availableChannels: Channel[];
  isConnected: boolean;
  typingUsers: Map<number, TypingUser>;

  // Actions
  addMessage: (message: Message) => void;
  addMessages: (messages: Message[]) => void;
  deleteMessage: (messageId: string) => void;
  setOnlineUsers: (users: OnlineUser[]) => void;
  addOnlineUser: (user: OnlineUser) => void;
  removeOnlineUser: (userId: number) => void;
  setCurrentChannel: (channel: Channel) => void;
  setConnected: (connected: boolean) => void;
  setTypingUser: (userId: number, username: string, isTyping: boolean) => void;
  clearTypingUsers: () => void;
  incrementUnreadCount: (channelId: string) => void;
  clearUnreadCount: (channelId: string) => void;
}
