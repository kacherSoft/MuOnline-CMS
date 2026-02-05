/**
 * Token Service
 * JWT token generation and verification for authentication
 */

import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app-config.js';
import type { TokenPayload } from '../types/auth-types.js';

export class TokenService {
  /**
   * Generate short-lived access token (15 minutes)
   */
  static generateAccessToken(payload: Omit<TokenPayload, 'type'>): string {
    const tokenPayload: TokenPayload = {
      ...payload,
      type: 'access',
    };

    return jwt.sign(tokenPayload, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    } as jwt.SignOptions);
  }

  /**
   * Generate long-lived refresh token (7 days)
   */
  static generateRefreshToken(payload: Omit<TokenPayload, 'type'>): string {
    const tokenPayload: TokenPayload = {
      ...payload,
      type: 'refresh',
    };

    return jwt.sign(tokenPayload, appConfig.jwtSecret, {
      expiresIn: appConfig.refreshTokenExpiresIn,
    } as jwt.SignOptions);
  }

  /**
   * Verify and decode access token
   * Throws error if invalid or expired
   */
  static verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, appConfig.jwtSecret) as TokenPayload;

      if (decoded.type !== 'access') {
        throw new Error('Invalid token type: expected access token');
      }

      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify and decode refresh token
   * Throws error if invalid or expired
   */
  static verifyRefreshToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, appConfig.jwtSecret) as TokenPayload;

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type: expected refresh token');
      }

      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Extract token without verification (for logging/debugging)
   */
  static decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }
}

export default TokenService;
