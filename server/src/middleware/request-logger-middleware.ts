/**
 * Request Logger Middleware
 * Logs all incoming requests with duration
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/winston-logger.js';

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  // Log request
  logger.info(`${req.method} ${req.path} started`);

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const logLevel = status >= 400 ? 'warn' : 'info';

    logger.log(logLevel, `${req.method} ${req.path} ${status} ${duration}ms`);
  });

  next();
};

export default requestLoggerMiddleware;
