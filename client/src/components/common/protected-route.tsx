/**
 * Protected Route Component
 * Wraps routes that require authentication
 * Waits for auth verification before rendering or redirecting
 */

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return <LoadingSpinner text="Verifying authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
