import mysql from 'mysql2/promise';

// Database configuration from environment
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3310'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '29051101',
  database: process.env.DB_NAME || 'muonline',
};

let pool: mysql.Pool | null = null;

/**
 * Get or create MySQL connection pool
 * Connection pooling improves performance by reusing connections
 */
export const getConnectionPool = (): mysql.Pool => {
  if (!pool) {
    pool = mysql.createPool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      waitForConnections: true,
      connectionLimit: 10, // Max concurrent connections
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    console.log(`✅ MySQL connection pool created for ${dbConfig.database} on port ${dbConfig.port}`);
  }
  return pool;
};

/**
 * Close connection pool gracefully
 */
export const closeConnectionPool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('✅ MySQL connection pool closed');
  }
};

/**
 * Execute a query with prepared statements (prevents SQL injection)
 * @param query SQL query with ? placeholders
 * @param params Parameters for prepared statement
 * @returns Query results as array of T
 */
export const executeQuery = async <T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> => {
  const currentPool = getConnectionPool();
  try {
    const [rows] = await currentPool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('❌ Database query error:', error);
    throw error;
  }
};

/**
 * Execute a query and return the first row
 * Useful for single record lookups
 */
export const executeQueryOne = async <T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> => {
  const results = await executeQuery<T>(query, params);
  return results.length > 0 ? results[0] : null;
};

/**
 * Execute an INSERT query and return the inserted ID
 */
export const executeInsert = async (
  query: string,
  params: any[] = []
): Promise<number> => {
  const currentPool = getConnectionPool();
  try {
    const [result] = await currentPool.execute(query, params);
    return (result as any).insertId;
  } catch (error) {
    console.error('❌ Database insert error:', error);
    throw error;
  }
};

export default { getConnectionPool, closeConnectionPool, executeQuery, executeQueryOne, executeInsert };
