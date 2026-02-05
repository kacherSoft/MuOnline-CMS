/**
 * Database Configuration
 * MySQL connection settings for MuOnline database
 * DB_PASSWORD is required - see .env.example
 */

export const databaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3310'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD!, // Required - validated at startup
  database: process.env.DB_NAME || 'muonline',
} as const;

export default databaseConfig;
