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
    // Setup token refresh interceptor on mount
    setupTokenRefreshInterceptor();

    // Restore auth state from localStorage
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) {
      // Verify token is still valid by calling /auth/me
      apiClient.get('/auth/me')
        .then((response) => {
          const userData = response.data.data;
          useAuthStore.getState().setAuth(userData, accessToken, refreshToken || '');
        })
        .catch(() => {
          // Token invalid, clear auth
          useAuthStore.getState().clearAuth();
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        });
    }
  }, []);

  return React.createElement(React.Fragment, null, children);
}

export default AuthProvider;
