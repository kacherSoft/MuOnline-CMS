/**
 * Authentication Type Definitions
 * TypeScript types for JWT auth and requests/responses
 */

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    username: string;
    accountId: number;
    isGameMaster?: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    accountId: number;
    isGameMaster?: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface TokenPayload {
  userId: number;
  username: string;
  accountId: number;
  isGameMaster?: boolean;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: number;
  username: string;
  accountId: number;
  email?: string;
  isGameMaster?: boolean;
}

export interface UserSession {
  id: number;
  accountId: number;
  token: string;
  refreshToken: string;
  expiresAt: number;
  createdAt: number;
}
