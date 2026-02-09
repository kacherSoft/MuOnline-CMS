/**
 * JWT Token Refresh Handler
 * Automatic token refresh on 401 errors with queue pattern
 */

import { apiClient } from './api-client';
import { useAuthStore } from '@/stores/auth-store';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Refresh state to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
let interceptorInstalled = false;

/**
 * Subscribe to token refresh completion
 * Called when a request arrives during an active refresh
 */
function subscribeTokenRefresh(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

/**
 * Notify all subscribers that token has been refreshed
 */
function onTokenRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

/**
 * Refresh the access token using the stored refresh token
 * @returns New access token
 * @throws Error if no refresh token available or refresh fails
 */
export async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    const { accessToken, user } = response.data.data;

    // Update token in both localStorage and Zustand store
    const store = useAuthStore.getState();
    if (store.user && store.refreshToken) {
      store.setAuth(store.user, accessToken, store.refreshToken);
    } else {
      localStorage.setItem('access_token', accessToken);
    }

    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}

/**
 * Setup axios interceptor for automatic token refresh on 401 errors
 */
export function setupTokenRefreshInterceptor(): void {
  if (interceptorInstalled) return;
  interceptorInstalled = true;

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // If 401 and not already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Wait for the current refresh to complete
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            });
          });
        }

        // Mark as retrying and start refresh
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();

          // Notify all waiting requests
          onTokenRefreshed(newToken);

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return apiClient(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().clearAuth();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}

export default {
  refreshAccessToken,
  setupTokenRefreshInterceptor,
};
