/**
 * Authentication Route Component
 * Login page route that displays the login form
 * Redirects already authenticated users to home
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { LoginForm } from '@/components/auth/login-form-component';

export function AuthRoute() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return React.createElement(LoginForm);
}

export default AuthRoute;
