/**
 * useAdminAuth Hook
 * Verifies user has Game Master role for admin access
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

export function useAdminAuth() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isGameMaster = useAuthStore((state) => state.isGameMaster);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (!isGameMaster) {
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, isGameMaster, navigate]);

  return {
    isAuthenticated,
    isGameMaster,
    user,
    canAccessAdmin: isAuthenticated && isGameMaster,
  };
}
