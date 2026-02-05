/**
 * TypeScript Extensions for Express
 * Custom type definitions for Express
 */

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      // Auth user attached by JWT middleware (Phase 04)
      user?: {
        id: number;
        username: string;
        accountId: number;
      };
      // Socket.io instance (Phase 06)
      socket?: any;
    }
  }
}

export {};
