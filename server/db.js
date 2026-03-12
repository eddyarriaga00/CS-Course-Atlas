const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
const DB_POOL_MAX = readPositiveInteger(process.env.DB_POOL_MAX, 10);
const DB_IDLE_TIMEOUT_MS = readPositiveInteger(process.env.DB_IDLE_TIMEOUT_MS, 30_000);
const DB_CONNECTION_TIMEOUT_MS = readPositiveInteger(process.env.DB_CONNECTION_TIMEOUT_MS, 10_000);
const DB_STATEMENT_TIMEOUT_MS = readPositiveInteger(process.env.DB_STATEMENT_TIMEOUT_MS, 8_000);
const DB_QUERY_TIMEOUT_MS = readPositiveInteger(process.env.DB_QUERY_TIMEOUT_MS, 10_000);
const DB_IDLE_IN_TX_TIMEOUT_MS = readPositiveInteger(process.env.DB_IDLE_IN_TX_TIMEOUT_MS, 8_000);

function readPositiveInteger(value, fallbackValue) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallbackValue;
    }
    return Math.floor(parsed);
}

if (!connectionString) {
    throw new Error('DATABASE_URL is required for Neon SQL connection.');
}

const pool = new Pool({
    connectionString,
    max: DB_POOL_MAX,
    idleTimeoutMillis: DB_IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: DB_CONNECTION_TIMEOUT_MS,
    statement_timeout: DB_STATEMENT_TIMEOUT_MS,
    query_timeout: DB_QUERY_TIMEOUT_MS,
    idle_in_transaction_session_timeout: DB_IDLE_IN_TX_TIMEOUT_MS,
    application_name: 'cs-course-atlas-server'
});

async function query(text, params = []) {
    return pool.query(text, params);
}

async function withTransaction(fn) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await fn(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function closeDb() {
    await pool.end();
}

module.exports = {
    pool,
    query,
    withTransaction,
    closeDb
};

