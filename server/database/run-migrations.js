/**
 * Database Migration Runner
 * Executes SQL migration files against MuOnline database
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, 'migrations');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3310'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '29051101',
  database: process.env.DB_NAME || 'muonline',
};

async function runMigrations() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log('🔄 Connected to database:', dbConfig.database);

    // Get all migration files sorted by name
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log('📋 Found', migrationFiles.length, 'migration files');

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8').trim();

      console.log(`\n⚙️  Running: ${file}`);

      // Split by semicolon and execute each statement
      const statements = sql.split(';').filter(s => s.trim());

      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await connection.execute(statement);
            console.log(`   ✅ Executed`);
          } catch (error) {
            if (error.code === 'ER_TABLE_EXISTS_ERROR') {
              console.log(`   ⏭️  Table already exists, skipping`);
            } else {
              console.error(`   ❌ Error:`, error.message);
              throw error;
            }
          }
        }
      }
    }

    console.log('\n✅ All migrations completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runMigrations();
