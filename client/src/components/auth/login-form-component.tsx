/**
 * Login Form Component
 * MuOnline account login form with validation
 */

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/hooks/use-auth.hook';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate username length
    if (username.length < 3 || username.length > 20) {
      setValidationError('Username must be 3-20 characters');
      return;
    }

    // Validate password
    if (password.length < 4) {
      setValidationError('Password must be at least 4 characters');
      return;
    }

    setValidationError(null);
    await login(username, password);
  };

  const cardContent = React.createElement(
    'div',
    {
      className: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary'
    },
    React.createElement(
      Card,
      { className: 'w-full max-w-md border-white/10 bg-bg-secondary/95 backdrop-blur' },
      React.createElement(
        'div',
        { className: 'p-8' },
        // Header
        React.createElement(
          'div',
          { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-text-primary mb-2' }, 'Mu Kacher'),
          React.createElement('p', { className: 'text-text-muted' }, 'Season 19.2'),
          React.createElement('p', { className: 'text-sm text-text-muted mt-4' }, 'Enter your MuOnline account credentials')
        ),

        // Form
        React.createElement(
          'form',
          { onSubmit: handleSubmit, className: 'space-y-5' },
          // Validation error
          validationError && React.createElement(
            Alert,
            { variant: 'destructive', className: 'mb-4' },
            React.createElement(AlertDescription, null, validationError)
          ),

          // API error
          error && React.createElement(
            Alert,
            { variant: 'destructive', className: 'mb-4' },
            React.createElement(AlertDescription, null, error)
          ),

          // Username field
          React.createElement(
            'div',
            { className: 'space-y-2' },
            React.createElement(
              'label',
              {
                htmlFor: 'username',
                className: 'text-sm font-medium text-text-primary'
              },
              'Username'
            ),
            React.createElement(Input, {
              id: 'username',
              type: 'text',
              value: username,
              onChange: (e) => setUsername(e.target.value),
              placeholder: 'Enter your username',
              disabled: isLoading,
              autoComplete: 'username',
              required: true,
              className: 'bg-bg-tertiary border-white/10 text-text-primary placeholder:text-text-muted'
            })
          ),

          // Password field
          React.createElement(
            'div',
            { className: 'space-y-2' },
            React.createElement(
              'label',
              {
                htmlFor: 'password',
                className: 'text-sm font-medium text-text-primary'
              },
              'Password'
            ),
            React.createElement(Input, {
              id: 'password',
              type: 'password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: 'Enter your password',
              disabled: isLoading,
              autoComplete: 'current-password',
              required: true,
              className: 'bg-bg-tertiary border-white/10 text-text-primary placeholder:text-text-muted'
            })
          ),

          // Submit button
          React.createElement(
            Button,
            {
              type: 'submit',
              className: 'w-full bg-primary hover:bg-primary/90',
              disabled: isLoading
            },
            isLoading ? 'Logging in...' : 'Login'
          )
        ),

        // Register link
        React.createElement(
          'p',
          { className: 'text-center text-sm text-text-muted mt-6' },
          "Don't have an account? ",
          React.createElement(
            'a',
            {
              href: '/register',
              className: 'text-primary hover:underline'
            },
            'Register'
          )
        )
      )
    )
  );

  return cardContent;
}

export default LoginForm;
