/**
 * CORS Middleware
 * Cross-Origin Resource Sharing configuration
 */

import cors from 'cors';
import { appConfig } from '../config/app-config.js';

export const corsMiddleware = cors({
  origin: appConfig.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
});

export default corsMiddleware;
