/**
 * Run Database Migrations
 * Purpose: Execute all SQL migration files to create CMS tables
 * Usage: npx tsx run-migrations.ts
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigrations() {
  console.log('🔄 Running database migrations...\n');

  // Create connection with multiple statements enabled
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3310'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '29051101',
    database: process.env.DB_NAME || 'muonline',
    multipleStatements: true,
  });

  const migrations = [
    '001-create-chat-messages-table.sql',
    '002-create-chat-images-table.sql',
    '003-create-user-sessions-table.sql',
    '004-create-news-table.sql',
    '005-create-server-settings-table.sql',
  ];

  for (const migration of migrations) {
    try {
      const sql = readFileSync(join(__dirname, 'migrations', migration), 'utf-8');
      await conn.query(sql);
      console.log(`✅ Migration ${migration} completed`);
    } catch (error: any) {
      if (error.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log(`⏭️  Migration ${migration} skipped (table already exists)`);
      } else {
        console.error(`❌ Migration ${migration} failed:`, error.message);
        throw error;
      }
    }
  }

  await conn.end();
  console.log('\n✅ All migrations completed successfully!');
  process.exit(0);
}

runMigrations();
