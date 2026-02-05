/**
 * Registration Form Component
 * User registration form with validation
 */

import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setError(null);

    // Validate username
    if (username.length < 3 || username.length > 20) {
      setValidationError('Username must be 3-20 characters');
      return;
    }

    // Validate password
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    // Validate email format if provided
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setValidationError('Invalid email format');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      const { user, accessToken, refreshToken } = response.data.data;

      // Store tokens
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // Show success state
      setSuccess(true);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
        <div className="text-center space-y-6 p-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Account Created Successfully!
          </h2>
          <p className="text-text-muted mb-6">
            Welcome to MuOnline Season 19.2! Your account is ready and you can now login to play the game.
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
      <Card className="w-full max-w-md border-white/10 bg-bg-secondary/95 backdrop-blur">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
            <p className="text-text-muted">Mu Kacher Season 19.2</p>
            <p className="text-sm text-text-muted mt-4">Register to play and chat</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Validation error */}
            {validationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* API error */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Username field */}
            <div className="space-y-2">
              <label
                htmlFor="reg-username"
                className="text-sm font-medium text-text-primary"
              >
                Username
              </label>
              <Input
                id="reg-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                disabled={isLoading}
                autoComplete="username"
                required
                className="bg-bg-tertiary border-white/10 text-text-primary placeholder:text-text-muted"
              />
            </div>

            {/* Email field (optional) */}
            <div className="space-y-2">
              <label
                htmlFor="reg-email"
                className="text-sm font-medium text-text-primary"
              >
                Email (optional)
              </label>
              <Input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
                autoComplete="email"
                className="bg-bg-tertiary border-white/10 text-text-primary placeholder:text-text-muted"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="reg-password"
                className="text-sm font-medium text-text-primary"
              >
                Password
              </label>
              <Input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password (min 6 chars)"
                disabled={isLoading}
                autoComplete="new-password"
                required
                className="bg-bg-tertiary border-white/10 text-text-primary placeholder:text-text-muted"
              />
            </div>

            {/* Confirm Password field */}
            <div className="space-y-2">
              <label
                htmlFor="reg-confirm"
                className="text-sm font-medium text-text-primary"
              >
                Confirm Password
              </label>
              <Input
                id="reg-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={isLoading}
                autoComplete="new-password"
                required
                className="bg-bg-tertiary border-white/10 text-text-primary placeholder:text-text-muted"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline">
              Login
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default RegisterForm;
