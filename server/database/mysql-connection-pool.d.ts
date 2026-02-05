import mysql from 'mysql2/promise';
/**
 * Get or create MySQL connection pool
 * Connection pooling improves performance by reusing connections
 */
export declare const getConnectionPool: () => mysql.Pool;
/**
 * Close connection pool gracefully
 */
export declare const closeConnectionPool: () => Promise<void>;
/**
 * Execute a query with prepared statements (prevents SQL injection)
 * @param query SQL query with ? placeholders
 * @param params Parameters for prepared statement
 * @returns Query results as array of T
 */
export declare const executeQuery: <T = any>(query: string, params?: any[]) => Promise<T[]>;
/**
 * Execute a query and return the first row
 * Useful for single record lookups
 */
export declare const executeQueryOne: <T = any>(query: string, params?: any[]) => Promise<T | null>;
/**
 * Execute an INSERT query and return the inserted ID
 */
export declare const executeInsert: (query: string, params?: any[]) => Promise<number>;
declare const _default: {
    getConnectionPool: () => mysql.Pool;
    closeConnectionPool: () => Promise<void>;
    executeQuery: <T = any>(query: string, params?: any[]) => Promise<T[]>;
    executeQueryOne: <T = any>(query: string, params?: any[]) => Promise<T | null>;
    executeInsert: (query: string, params?: any[]) => Promise<number>;
};
export default _default;
//# sourceMappingURL=mysql-connection-pool.d.ts.map