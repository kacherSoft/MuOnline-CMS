/**
 * Authentication Provider Component
 * Wraps app with auth context, sets up token refresh, and restores auth state
 */

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { setupTokenRefreshInterceptor } from '@/lib/jwt-token-refresh-handler';
import { apiClient } from '@/lib/api-client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupTokenRefreshInterceptor();

    const storedState = useAuthStore.getState();
    const accessToken = storedState.accessToken || localStorage.getItem('access_token');

    if (!accessToken) {
      useAuthStore.getState().setAuthReady();
      return;
    }

    apiClient.get('/auth/me')
      .then((response) => {
        const userData = response.data.data;
        const refreshToken = storedState.refreshToken || localStorage.getItem('refresh_token') || '';
        useAuthStore.getState().setAuth(userData, accessToken, refreshToken);
      })
      .catch(() => {
        useAuthStore.getState().clearAuth();
      })
      .finally(() => {
        if (!useAuthStore.getState().isAuthReady) {
          useAuthStore.getState().setAuthReady();
        }
      });
  }, []);

  return React.createElement(React.Fragment, null, children);
}

export default AuthProvider;
