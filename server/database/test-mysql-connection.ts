/**
 * Test MySQL Connection
 * Purpose: Verify database connection and basic query functionality
 * Usage: npx tsx test-mysql-connection.ts
 */

import { getConnectionPool, executeQuery } from './mysql-connection-pool';

async function testConnection() {
  console.log('🔍 Testing MySQL connection to MuOnline database...');
  console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   Port: ${process.env.DB_PORT || '3310'}`);
  console.log(`   Database: ${process.env.DB_NAME || 'muonline'}`);

  try {
    // Get connection pool
    const pool = getConnectionPool();
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL successfully');

    // Test query on existing accounts table
    const accounts = await executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM accounts LIMIT 1');
    console.log(`✅ Found ${accounts[0].count} accounts in database`);

    // Test query on character_info table
    const characters = await executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM character_info LIMIT 1');
    console.log(`✅ Found ${characters[0].count} characters in database`);

    // Test query on guild_list table
    const guilds = await executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM guild_list LIMIT 1');
    console.log(`✅ Found ${guilds[0].count} guilds in database`);

    connection.release();
    console.log('\n✅ All database tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
