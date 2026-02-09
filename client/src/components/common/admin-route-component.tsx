/**
 * Admin Route Component
 * Wraps routes that require Game Master (admin) access
 */

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import type { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const isGameMaster = useAuthStore((state) => state.isGameMaster);

  if (!isAuthReady) {
    return <LoadingSpinner text="Verifying authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isGameMaster) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
