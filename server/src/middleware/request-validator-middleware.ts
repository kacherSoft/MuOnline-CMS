/**
 * Request Validator Middleware
 * Validates request body using schema
 * Note: Schema validation interface - supports Zod-style schemas
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from './error-handler-middleware.js';

interface Schema {
  safeParse?: (data: any) => { success: boolean; error?: any; data?: any };
}

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Support Zod-style schemas
      if (schema.safeParse) {
        const result = schema.safeParse(req.body);
        if (!result.success) {
          const details = result.error.errors.map((e: any) => e.message).join(', ');
          throw new AppError(400, `Validation error: ${details}`);
        }
        req.body = result.data;
      } else {
        throw new AppError(500, 'Invalid schema provided');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const validateQuery = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Support Zod-style schemas
      if (schema.safeParse) {
        const result = schema.safeParse(req.query);
        if (!result.success) {
          const details = result.error.errors.map((e: any) => e.message).join(', ');
          throw new AppError(400, `Query validation error: ${details}`);
        }
        req.query = result.data;
      } else {
        throw new AppError(500, 'Invalid schema provided');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default { validateRequest, validateQuery };
