const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

const isProduction = String(process.env.NODE_ENV || '').trim().toLowerCase() === 'production';
const SECURE_SSL_MODES = new Set(['require', 'verify-ca', 'verify-full']);
const connectionString = readDatabaseUrl(process.env.DATABASE_URL);
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

function readDatabaseUrl(rawValue) {
    const value = String(rawValue || '').trim();
    if (!value) {
        throw new Error('DATABASE_URL is required for Neon SQL connection.');
    }
    if (/postgres(?:ql)?:\/\/user:password@host\/dbname/i.test(value)) {
        throw new Error('DATABASE_URL is still using the example placeholder value.');
    }

    let parsed;
    try {
        parsed = new URL(value);
    } catch (_error) {
        throw new Error('DATABASE_URL must be a valid postgres connection URL.');
    }

    const protocol = String(parsed.protocol || '').toLowerCase();
    if (protocol !== 'postgres:' && protocol !== 'postgresql:') {
        throw new Error('DATABASE_URL must begin with postgres:// or postgresql://.');
    }
    if (!parsed.hostname) {
        throw new Error('DATABASE_URL must include a hostname.');
    }
    if (!parsed.pathname || parsed.pathname === '/') {
        throw new Error('DATABASE_URL must include the target database name.');
    }

    const sslMode = String(parsed.searchParams.get('sslmode') || '').toLowerCase();
    if (!SECURE_SSL_MODES.has(sslMode)) {
        const message = 'DATABASE_URL should include sslmode=require (or stronger).';
        if (isProduction) {
            throw new Error(message);
        }
        console.warn(`[db] ${message}`);
    }

    const channelBinding = String(parsed.searchParams.get('channel_binding') || '').toLowerCase();
    const isNeonHost = String(parsed.hostname || '').toLowerCase().endsWith('.neon.tech');
    if (isNeonHost && channelBinding !== 'require') {
        const message = 'Neon DATABASE_URL should include channel_binding=require.';
        if (isProduction) {
            throw new Error(message);
        }
        console.warn(`[db] ${message}`);
    }

    return value;
}

function sanitizeDatabaseErrorMessage(message) {
    return String(message || 'database error')
        .replace(/(postgres(?:ql)?:\/\/[^:\s]+:)[^@\s]+@/gi, '$1<redacted>@')
        .replace(/password=[^&\s]+/gi, 'password=<redacted>');
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

pool.on('error', (error) => {
    console.error(`[db] Unexpected idle client error: ${sanitizeDatabaseErrorMessage(error?.message)}`);
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
        try {
            await client.query('ROLLBACK');
        } catch (rollbackError) {
            console.error(
                `[db] Transaction rollback failed: ${sanitizeDatabaseErrorMessage(rollbackError?.message)}`
            );
        }
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

