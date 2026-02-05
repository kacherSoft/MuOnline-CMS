/**
 * Application Configuration
 * Central config for all app-wide settings
 * JWT_SECRET is required - validated at startup
 */

export const appConfig = {
  port: parseInt(process.env.APP_PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET!, // Required - must be 32+ chars, validated at startup
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '15m') as string,
  refreshTokenExpiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as string,
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '1048576'), // 1MB (reduced from 5MB)
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  isDevelopment: process.env.NODE_ENV !== 'production',
};

export default appConfig;
