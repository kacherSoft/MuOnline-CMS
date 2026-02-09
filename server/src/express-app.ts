/**
 * Express Application Setup
 * Main Express app with middleware configuration
 */

import express, { type Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { corsMiddleware } from './middleware/cors-middleware.js';
import { errorHandlerMiddleware, notFoundHandler } from './middleware/error-handler-middleware.js';
import { requestLoggerMiddleware } from './middleware/request-logger-middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app: Application = express();
app.set('trust proxy', 1);

// =====================================================
// MIDDLEWARE
// =====================================================

// CORS - Must be first
app.use(corsMiddleware);

// Body parsers (reduced to 1MB for security)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging
app.use(requestLoggerMiddleware);

// Serve static frontend files
const frontendDist = path.resolve(process.cwd(), 'client/dist');
app.use(express.static(frontendDist, {
  maxAge: '1h',
  etag: true
}));

// =====================================================
// HEALTH CHECK
// =====================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// =====================================================
// API ROUTES (added by other phases)
// =====================================================

// Phase 04: Authentication routes
import { authRouter } from './routes/auth-routes.js';
app.use('/api/auth', authRouter);

// Phase 06: News routes
import { newsRouter } from './routes/news-routes.js';
app.use('/api/news', newsRouter);

// Phase 06: Server settings routes
import serverSettingsRouter from './routes/server-settings-routes.js';
app.use('/api/server-settings', serverSettingsRouter);

// Phase 09: Ranking routes
import { rankingRouter } from './routes/ranking-routes.js';
app.use('/api/rankings', rankingRouter);

// Phase 01: Chat routes (REST + WebSocket)
import chatRoutes from './routes/chat-routes.js';
app.use('/api/chat', chatRoutes);

// Phase 05: Admin routes
import { adminRouter } from './routes/admin-routes.js';
app.use('/api/admin', adminRouter);

// Phase 08: /api/characters/*

// =====================================================
// SPA FALLBACK (serve index.html for non-API routes)
// =====================================================

app.get('*', (req, res, next) => {
  // Skip API routes and WebSocket
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io') || req.path.startsWith('/health')) {
    return next();
  }
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// =====================================================
// ERROR HANDLING (must be last)
// =====================================================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandlerMiddleware);

export { app };
