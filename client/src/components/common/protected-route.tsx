/**
 * Protected Route Component
 * Wraps routes that require authentication
 */

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
