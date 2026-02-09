/**
 * Socket.io Client
 * WebSocket connection for real-time chat
 */

import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Get or create Socket.io connection
 */
export const getSocket = (): Socket => {
  if (!socket) {
    const token = localStorage.getItem('access_token');

    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    const url = (!socketUrl || socketUrl === '/') ? window.location.origin : socketUrl;
    socket = io(url, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
    });

    // Connection events
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log(`🔄 Socket reconnected after ${attemptNumber} attempts`);
    });
  }

  return socket;
};

/**
 * Disconnect socket and cleanup
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('✅ Socket disconnected');
  }
};

/**
 * Reconnect socket with new token
 */
export const reconnectSocket = (): void => {
  disconnectSocket();
  getSocket();
};

export { socket };
export default { getSocket, disconnectSocket, reconnectSocket };
