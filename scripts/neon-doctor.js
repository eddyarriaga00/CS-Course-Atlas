#!/usr/bin/env node
require('dotenv').config();

const REQUIRED_TABLES = [
    'schema_migrations',
    'users',
    'user_profiles',
    'user_sessions',
    'user_states',
    'support_requests',
    'email_change_verifications',
    'auth_throttles',
    'oauth_identities'
];
const SECURE_SSL_MODES = new Set(['require', 'verify-ca', 'verify-full']);

function fail(message) {
    console.error(`\n[neon-doctor] ${message}`);
    process.exit(1);
}

function validateDatabaseUrl(databaseUrl) {
    if (!databaseUrl) {
        fail('DATABASE_URL is not set. Copy .env.example to .env and paste your Neon connection string.');
    }
    if (/postgres(?:ql)?:\/\/user:password@host\/dbname/i.test(databaseUrl)) {
        fail('DATABASE_URL is still the example placeholder. Paste your real Neon connection string from the Neon dashboard.');
    }

    let parsed;
    try {
        parsed = new URL(databaseUrl);
    } catch (_error) {
        fail('DATABASE_URL is not a valid URL.');
    }

    const protocol = String(parsed.protocol || '').toLowerCase();
    if (protocol !== 'postgres:' && protocol !== 'postgresql:') {
        fail('DATABASE_URL must start with postgres:// or postgresql://.');
    }
    if (!parsed.hostname) {
        fail('DATABASE_URL must include a hostname.');
    }
    if (!parsed.pathname || parsed.pathname === '/') {
        fail('DATABASE_URL must include a database name in the path.');
    }

    const sslMode = String(parsed.searchParams.get('sslmode') || '').toLowerCase();
    if (!SECURE_SSL_MODES.has(sslMode)) {
        fail('DATABASE_URL must include sslmode=require (or stronger).');
    }

    const isNeonHost = String(parsed.hostname || '').toLowerCase().endsWith('.neon.tech');
    if (isNeonHost) {
        const channelBinding = String(parsed.searchParams.get('channel_binding') || '').toLowerCase();
        if (channelBinding !== 'require') {
            fail('Neon DATABASE_URL should include channel_binding=require.');
        }
    }
}

async function run() {
    const databaseUrl = String(process.env.DATABASE_URL || '').trim();
    validateDatabaseUrl(databaseUrl);

    let db;
    try {
        db = require('../server/db');
    } catch (error) {
        fail(`Failed to initialize DB client: ${error.message}`);
    }

    const { query, closeDb } = db;
    try {
        const versionResult = await query(`
            SELECT
                version() AS version,
                current_database() AS database,
                current_user AS role,
                now() AS now_utc
        `);
        const row = versionResult.rows[0] || {};
        console.log('\n[neon-doctor] Connection OK');
        console.log(`- database: ${row.database || 'unknown'}`);
        console.log(`- role: ${row.role || 'unknown'}`);
        console.log(`- server_time_utc: ${row.now_utc || 'unknown'}`);
        console.log(`- postgres: ${String(row.version || '').split(',')[0] || 'unknown'}`);

        const tablesResult = await query(
            `
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name = ANY($1::text[])
            `,
            [REQUIRED_TABLES]
        );
        const found = new Set((tablesResult.rows || []).map((entry) => String(entry.table_name || '')));
        const missing = REQUIRED_TABLES.filter((tableName) => !found.has(tableName));
        if (missing.length) {
            console.log('\n[neon-doctor] Schema check: missing tables detected');
            missing.forEach((tableName) => console.log(`- missing: ${tableName}`));
            console.log('\nRun: npm run db:migrate');
            process.exitCode = 2;
            return;
        }

        const usersResult = await query('SELECT COUNT(*)::int AS count FROM users');
        const userCount = usersResult.rows?.[0]?.count ?? 0;

        console.log('\n[neon-doctor] Schema check: OK');
        console.log(`- required_tables: ${REQUIRED_TABLES.length}`);
        console.log(`- users_count: ${userCount}`);
        console.log('\n[neon-doctor] Ready for app start.');
    } catch (error) {
        fail(`Query failed: ${error.message}`);
    } finally {
        if (typeof closeDb === 'function') {
            await closeDb();
        }
    }
}

run().catch((error) => {
    fail(`Unexpected failure: ${error.message}`);
});
