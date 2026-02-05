/**
 * Error Handler Middleware
 * Global error handling for Express app
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/winston-logger.js';
import { appConfig } from '../config/app-config.js';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Handle operational errors (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(appConfig.isDevelopment && { stack: err.stack }),
    });
  }

  // Handle unexpected errors
  const statusCode = 500;
  const message = appConfig.isDevelopment
    ? err.message
    : 'Internal server error';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(appConfig.isDevelopment && { stack: err.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`,
  });
};

export default { AppError, errorHandlerMiddleware, notFoundHandler };
