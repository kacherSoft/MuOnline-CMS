/**
 * Authentication Service
 * Business logic for login, logout, session management with MuOnline accounts
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { executeQuery, executeInsert } from '../lib/mysql-connection-pool.js';
import { TokenService } from './jwt-token-service.js';
import type { LoginRequest, AuthResponse, RefreshResponse, AuthUser, RegisterRequest, RegisterResponse } from '../types/auth-types.js';
import { logger } from '../utils/winston-logger.js';

export class AuthService {
  /**
   * Authenticate user with MuOnline account
   * Returns JWT tokens on success
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { username, password } = credentials;

    // Query user from MuOnline accounts table
    const users = await executeQuery<{
      guid: number;
      account: string;
      password: string;
      email: string | null;
    }>(
      'SELECT guid, account, password, email FROM accounts WHERE account = ? LIMIT 1',
      [username]
    );

    if (users.length === 0) {
      logger.warn(`Login attempt with non-existent user: ${username}`);
      throw new Error('Invalid credentials');
    }

    const user = users[0];

    // Verify password using MuOnline hash format
    const isValidPassword = await this.verifyMuOnlinePassword(user.account, password, user.password);

    if (!isValidPassword) {
      logger.warn(`Failed login attempt for user: ${username}`);
      throw new Error('Invalid credentials');
    }

    logger.info(`User logged in successfully: ${username} (ID: ${user.guid})`);

    // Check if user is Game Master
    const isGameMaster = await this.checkGameMasterStatus(user.guid);

    // Generate token payload
    const tokenPayload = {
      userId: user.guid,
      username: user.account,
      accountId: user.guid,
      isGameMaster,
    };

    // Generate tokens
    const accessToken = TokenService.generateAccessToken(tokenPayload);
    const refreshToken = TokenService.generateRefreshToken(tokenPayload);

    // Store session in database
    await this.createSession(user.guid, refreshToken);

    return {
      user: {
        id: user.guid,
        username: user.account,
        accountId: user.guid,
        isGameMaster,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Register new user account
   * Creates account with bcrypt password hashing and returns JWT tokens
   */
  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    const { username, password, email } = data;

    // Check if username already exists
    const existing = await executeQuery<{ guid: number }>(
      'SELECT guid FROM accounts WHERE account = ? LIMIT 1',
      [username]
    );

    if (existing.length > 0) {
      logger.warn(`Registration attempt with existing username: ${username}`);
      throw new Error('Username already exists');
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await executeQuery<{ guid: number }>(
        'SELECT guid FROM accounts WHERE email = ? LIMIT 1',
        [email]
      );

      if (existingEmail.length > 0) {
        logger.warn(`Registration attempt with existing email: ${email}`);
        throw new Error('Email already registered');
      }
    }

    // Hash password using DV Team algorithm: SHA256(username + ":" + password)
    // This allows new accounts to login to both CMS and game server
    const passwordHash = crypto.createHash('sha256').update(`${username}:${password}`).digest('hex');

    // Insert new account
    const accountId = await executeInsert(
      'INSERT INTO accounts (account, password, email, register, created_at) VALUES (?, ?, ?, ?, NOW())',
      [username, passwordHash, email || null, Math.floor(Date.now() / 1000)]
    );

    logger.info(`New user registered: ${username} (ID: ${accountId})`);

    // Check if user is Game Master (unlikely for new registrations)
    const isGameMaster = await this.checkGameMasterStatus(accountId);

    // Auto-login after registration
    const tokenPayload = {
      userId: accountId,
      username: username,
      accountId: accountId,
      isGameMaster,
    };

    const accessToken = TokenService.generateAccessToken(tokenPayload);
    const refreshToken = TokenService.generateRefreshToken(tokenPayload);

    // Store session
    await this.createSession(accountId, refreshToken);

    return {
      user: {
        id: accountId,
        username: username,
        accountId: accountId,
        isGameMaster,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    const payload = TokenService.verifyRefreshToken(refreshToken);

    // Verify session exists in database
    const sessions = await executeQuery<{
      token: string;
    refreshToken: string;
      expires_at: number;
    }>(
      'SELECT * FROM user_sessions WHERE token = ? AND account_id = ? LIMIT 1',
      [refreshToken, payload.userId]
    );

    if (sessions.length === 0) {
      logger.warn(`Refresh token not found for user ID: ${payload.userId}`);
      throw new Error('Invalid or expired refresh token');
    }

    logger.info(`Token refreshed for user: ${payload.username} (ID: ${payload.userId})`);

    // Generate new access token
    const accessToken = TokenService.generateAccessToken({
      userId: payload.userId,
      username: payload.username,
      accountId: payload.accountId,
    });

    return { accessToken };
  }

  /**
   * Logout user and invalidate session
   */
  static async logout(userId: number, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      // Delete specific session
      await executeQuery(
        'DELETE FROM user_sessions WHERE account_id = ? AND token = ?',
        [userId, refreshToken]
      );
      logger.info(`User logged out (with refresh token): ${userId}`);
    } else {
      // Delete all sessions for user
      await executeQuery(
        'DELETE FROM user_sessions WHERE account_id = ?',
        [userId]
      );
      logger.info(`User logged out (all sessions): ${userId}`);
    }
  }

  /**
   * Get current user info
   */
  static async getMe(userId: number): Promise<AuthUser> {
    const users = await executeQuery<{
      guid: number;
      account: string;
      email: string | null;
    }>(
      'SELECT guid, account, email FROM accounts WHERE guid = ? LIMIT 1',
      [userId]
    );

    if (users.length === 0) {
      throw new Error('User not found');
    }

    const user = users[0];

    // Check GM status
    const isGameMaster = await this.checkGameMasterStatus(user.guid);

    return {
      id: user.guid,
      username: user.account,
      accountId: user.guid,
      email: user.email || undefined,
      isGameMaster,
    };
  }

  /**
   * Verify password against MuOnline hash format
   * DV Team uses: SHA256(username + ":" + password)
   * Falls back to bcrypt for CMS-registered accounts
   */
  private static async verifyMuOnlinePassword(
    username: string,
    inputPassword: string,
    storedHash: string
  ): Promise<boolean> {
    // DV Team algorithm: SHA256(username + ":" + password)
    const dvTeamHash = crypto.createHash('sha256').update(`${username}:${inputPassword}`).digest('hex');

    if (dvTeamHash === storedHash) {
      return true;
    }

    // Fallback: Try bcrypt for CMS-registered accounts
    try {
      return await bcrypt.compare(inputPassword, storedHash);
    } catch {
      return false;
    }
  }

  /**
   * Create session in database
   */
  private static async createSession(
    accountId: number,
    refreshToken: string
  ): Promise<void> {
    const now = Date.now();
    const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

    await executeQuery(
      'INSERT INTO user_sessions (account_id, token, refresh_token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)',
      [accountId, refreshToken, refreshToken, expiresAt, now]
    );

    logger.debug(`Session created for account: ${accountId}`);
  }

  /**
   * Clean up expired sessions
   */
  static async cleanupExpiredSessions(): Promise<void> {
    const now = Date.now();

    const result = await executeQuery(
      'DELETE FROM user_sessions WHERE expires_at < ?',
      [now]
    );

    logger.info(`Cleaned up ${result.length} expired sessions`);
  }

  /**
   * Get active session count for a user
   */
  static async getActiveSessionCount(userId: number): Promise<number> {
    const result = await executeQuery<{ count: number }>(
      'SELECT COUNT(*) as count FROM user_sessions WHERE account_id = ? AND expires_at > ?',
      [userId, Date.now()]
    );

    return result[0].count;
  }

  /**
   * Check if user has Game Master status
   * Queries character_info table for admin_flags > 0
   */
  static async checkGameMasterStatus(accountId: number): Promise<boolean> {
    const result = await executeQuery<{ is_gm: number }>(
      'SELECT COUNT(*) as is_gm FROM character_info WHERE account_id = ? AND admin_flags > 0',
      [accountId]
    );

    return result[0].is_gm > 0;
  }
}

export default AuthService;
