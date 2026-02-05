/**
 * Environment Variable Validation
 * Validates all required environment variables at startup
 */

import dotenv from 'dotenv';
import { logger } from '../utils/winston-logger.js';

dotenv.config();

interface EnvVarSpec {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
  validate?: (value: string) => boolean;
}

const envVars: EnvVarSpec[] = [
  // Server
  { name: 'NODE_ENV', description: 'Environment (development/production)', required: false, defaultValue: 'development' },
  { name: 'APP_PORT', description: 'Server port', required: false, defaultValue: '3000' },

  // Database - REQUIRED for security
  { name: 'DB_HOST', description: 'Database host', required: false, defaultValue: 'localhost' },
  { name: 'DB_PORT', description: 'Database port', required: false, defaultValue: '3310' },
  { name: 'DB_USER', description: 'Database user', required: false, defaultValue: 'root' },
  { name: 'DB_PASSWORD', description: 'Database password', required: true }, // No default - must be set
  { name: 'DB_NAME', description: 'Database name', required: false, defaultValue: 'muonline' },

  // JWT - REQUIRED for security
  { name: 'JWT_SECRET', description: 'JWT signing secret', required: true, validate: (v) => v.length >= 32 }, // Minimum 32 chars
  { name: 'JWT_EXPIRES_IN', description: 'Access token expiry', required: false, defaultValue: '15m' },
  { name: 'REFRESH_TOKEN_EXPIRES_IN', description: 'Refresh token expiry', required: false, defaultValue: '7d' },

  // Redis
  { name: 'REDIS_HOST', description: 'Redis host', required: false, defaultValue: 'localhost' },
  { name: 'REDIS_PORT', description: 'Redis port', required: false, defaultValue: '6379' },
  { name: 'REDIS_PASSWORD', description: 'Redis password', required: false },

  // CORS
  { name: 'CORS_ORIGIN', description: 'CORS allowed origin', required: false, defaultValue: 'http://localhost:5173' },

  // Upload
  { name: 'UPLOAD_DIR', description: 'Upload directory', required: false, defaultValue: './uploads' },
  { name: 'MAX_FILE_SIZE', description: 'Max file size in bytes', required: false, defaultValue: '1048576' }, // 1MB
];

const missing: string[] = [];
const invalid: string[] = [];

for (const spec of envVars) {
  const value = process.env[spec.name];

  if (!value) {
    if (spec.required) {
      missing.push(spec.name);
    } else if (spec.defaultValue !== undefined) {
      process.env[spec.name] = spec.defaultValue;
    }
  } else if (spec.validate && !spec.validate(value)) {
    invalid.push(`${spec.name} (${spec.description})`);
  }
}

if (missing.length > 0 || invalid.length > 0) {
  const errors: string[] = [];

  if (missing.length > 0) {
    errors.push(`\n  Missing required environment variables:\n    - ${missing.join('\n    - ')}`);
  }

  if (invalid.length > 0) {
    errors.push(`\n  Invalid environment variables:\n    - ${invalid.join('\n    - ')}`);
  }

  errors.push('\n\n  Please set these in your .env file before starting the server.\n');

  logger.error(`Environment validation failed:${errors.join('')}`);

  throw new Error(`Environment validation failed. Check logs for details.`);
}

logger.info('Environment variables validated successfully');

export const envValidation = {
  validated: true,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: (process.env.NODE_ENV || 'development') !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
};

export default envValidation;
