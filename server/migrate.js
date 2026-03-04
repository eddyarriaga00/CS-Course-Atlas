require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { query, closeDb } = require('./db');

const migrationsDir = path.join(__dirname, 'sql');

async function ensureMigrationTable() {
    await query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            id BIGSERIAL PRIMARY KEY,
            filename TEXT NOT NULL UNIQUE,
            executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `);
}

async function getAppliedMigrations() {
    const result = await query('SELECT filename FROM schema_migrations');
    return new Set(result.rows.map((row) => row.filename));
}

async function applyMigration(filename) {
    const filePath = path.join(migrationsDir, filename);
    const sql = fs.readFileSync(filePath, 'utf8');
    await query(sql);
    await query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename]);
    console.log(`Applied migration: ${filename}`);
}

async function run() {
    await ensureMigrationTable();
    const applied = await getAppliedMigrations();
    const files = fs
        .readdirSync(migrationsDir)
        .filter((name) => name.endsWith('.sql'))
        .sort();

    for (const filename of files) {
        if (applied.has(filename)) {
            continue;
        }
        await applyMigration(filename);
    }

    console.log('Migrations complete.');
}

run()
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await closeDb();
    });
