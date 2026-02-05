/**
 * Use Authentication Hook
 * Custom hook for login, logout, and authentication state management
 */

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { apiClient } from '@/lib/api-client';
import { useState, useCallback } from 'react';

export interface LoginResult {
  success: boolean;
  error?: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isGameMaster, setAuth, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Login with username and password
   */
  const login = useCallback(async (username: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      });

      const { user: userData, accessToken, refreshToken } = response.data.data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // Update auth store
      setAuth(userData, accessToken, refreshToken);

      // Redirect to chat
      navigate('/');

      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setAuth]);

  /**
   * Logout and clear authentication
   */
  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    try {
      // Call logout endpoint to invalidate session
      await apiClient.post('/auth/logout', { refreshToken });
    } catch (err) {
      console.error('Logout API error:', err);
      // Continue with local cleanup even if API fails
    } finally {
      // Clear local state
      clearAuth();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Redirect to login
      navigate('/login');
    }
  }, [navigate, clearAuth]);

  /**
   * Get current user info
   */
  const refreshUser = useCallback(async () => {
    try {
      const response = await apiClient.get('/auth/me');
      const userData = response.data.data;
      const accessToken = localStorage.getItem('access_token') || '';
      const refreshToken = localStorage.getItem('refresh_token') || '';
      setAuth(userData, accessToken, refreshToken);
    } catch (err) {
      console.error('Failed to refresh user:', err);
      // Token might be invalid, clear auth
      clearAuth();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }, [setAuth, clearAuth]);

  return {
    user,
    isAuthenticated,
    isGameMaster,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
  };
}

export default useAuth;
