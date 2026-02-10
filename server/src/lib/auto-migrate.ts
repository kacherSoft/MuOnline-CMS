/**
 * Auto Migration Runner
 * Runs pending SQL migrations on server startup.
 * Tracks applied migrations in a `_migrations` table.
 */

import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getConnectionPool } from './mysql-connection-pool.js';
import { logger } from '../utils/winston-logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, '../../database/migrations');

async function ensureMigrationsTable(): Promise<void> {
  const pool = getConnectionPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

async function getAppliedMigrations(): Promise<Set<string>> {
  const pool = getConnectionPool();
  const [rows] = await pool.execute('SELECT filename FROM _migrations ORDER BY id');
  return new Set((rows as any[]).map(r => r.filename));
}

async function markApplied(filename: string): Promise<void> {
  const pool = getConnectionPool();
  await pool.execute('INSERT INTO _migrations (filename) VALUES (?)', [filename]);
}

export async function runMigrations(): Promise<void> {
  try {
    await ensureMigrationsTable();
    const applied = await getAppliedMigrations();

    const files = await readdir(MIGRATIONS_DIR);
    const sqlFiles = files
      .filter(f => f.endsWith('.sql') && !f.startsWith('.'))
      .sort();

    let count = 0;
    const pool = getConnectionPool();

    for (const file of sqlFiles) {
      if (applied.has(file)) continue;

      const sql = await readFile(join(MIGRATIONS_DIR, file), 'utf-8');
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      logger.info(`Running migration: ${file}`);
      for (const stmt of statements) {
        await pool.execute(stmt);
      }

      await markApplied(file);
      count++;
      logger.info(`Migration applied: ${file}`);
    }

    if (count > 0) {
      logger.info(`Migrations complete: ${count} applied`);
    } else {
      logger.info('Migrations: all up to date');
    }
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
}
