require('dotenv').config();

const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { query, withTransaction } = require('./db');
const {
    randomToken,
    hashSessionToken,
    hashPassword,
    verifyPassword,
    normalizeEmailOrUsername,
    isValidEmail,
    isValidUsername,
    hashIpAddress
} = require('./security');

const app = express();

const PORT = Number(process.env.PORT || 3000);
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'csatlas_session';
const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS || 30);
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

function getCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax',
        secure: isProduction,
        path: '/',
        maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
    };
}

function resolveClientIp(req) {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
        return forwardedFor.split(',')[0].trim();
    }
    return req.socket?.remoteAddress || '';
}

function safeString(value, fallback = '') {
    return typeof value === 'string' ? value.trim() : fallback;
}

function assertSameOrigin(req, res, next) {
    const origin = safeString(req.headers.origin);
    const host = safeString(req.headers.host);
    if (!origin || !host) {
        return next();
    }
    try {
        const parsed = new URL(origin);
        if (parsed.host !== host) {
            return res.status(403).json({ error: 'Cross-origin requests are not allowed.' });
        }
    } catch (error) {
        return res.status(403).json({ error: 'Invalid origin header.' });
    }
    return next();
}

function safeTokenCompare(expected, received) {
    const expectedString = String(expected || '');
    const receivedString = String(received || '');
    if (!expectedString || !receivedString) return false;
    const expectedBuffer = Buffer.from(expectedString, 'utf8');
    const receivedBuffer = Buffer.from(receivedString, 'utf8');
    if (expectedBuffer.length !== receivedBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function requireCsrf(req, res, next) {
    const expected = safeString(req.auth?.csrfToken);
    const received = safeString(req.headers['x-csrf-token'] || req.headers['csrf-token']);
    if (!expected) {
        return res.status(401).json({ error: 'Session CSRF token missing.' });
    }
    if (!safeTokenCompare(expected, received)) {
        return res.status(403).json({ error: 'Invalid CSRF token.' });
    }
    return next();
}

async function getSessionFromRequest(req) {
    const token = safeString(req.cookies?.[SESSION_COOKIE_NAME]);
    if (!token) return null;

    const tokenHash = hashSessionToken(token);
    const result = await query(
        `
        SELECT
            s.id AS session_id,
            s.user_id,
            s.csrf_token,
            s.expires_at,
            u.email,
            u.username,
            p.name,
            p.goal,
            p.username AS profile_username
        FROM user_sessions s
        JOIN users u ON u.id = s.user_id
        LEFT JOIN user_profiles p ON p.user_id = u.id
        WHERE s.token_hash = $1
          AND s.expires_at > NOW()
        LIMIT 1
        `,
        [tokenHash]
    );

    const row = result.rows[0];
    if (!row) {
        return null;
    }

    await query('UPDATE user_sessions SET last_seen_at = NOW() WHERE id = $1', [row.session_id]);

    return {
        sessionId: row.session_id,
        userId: row.user_id,
        csrfToken: row.csrf_token,
        user: {
            id: row.user_id,
            email: row.email,
            username: row.profile_username || row.username || row.name || null,
            name: row.name || row.profile_username || row.username || null,
            goal: row.goal || 'exploring'
        }
    };
}

async function requireAuth(req, res, next) {
    try {
        const session = await getSessionFromRequest(req);
        if (!session) {
            return res.status(401).json({ error: 'Not authenticated.' });
        }
        req.auth = session;
        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Session lookup failed.' });
    }
}

async function createSession(res, req, userId) {
    const token = randomToken(48);
    const tokenHash = hashSessionToken(token);
    const csrfToken = randomToken(24);
    const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
    await query(
        `
        INSERT INTO user_sessions (user_id, token_hash, csrf_token, ip_hash, user_agent, expires_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
            userId,
            tokenHash,
            csrfToken,
            hashIpAddress(resolveClientIp(req)),
            safeString(req.headers['user-agent'], null),
            expiresAt.toISOString()
        ]
    );
    res.cookie(SESSION_COOKIE_NAME, token, getCookieOptions());
    return csrfToken;
}

async function clearSession(req, res) {
    const token = safeString(req.cookies?.[SESSION_COOKIE_NAME]);
    if (token) {
        await query('DELETE FROM user_sessions WHERE token_hash = $1', [hashSessionToken(token)]);
    }
    res.clearCookie(SESSION_COOKIE_NAME, {
        ...getCookieOptions(),
        maxAge: undefined,
        expires: new Date(0)
    });
}

function sessionResponsePayload(session) {
    return {
        authenticated: true,
        session: {
            user: {
                id: session.user.id,
                email: session.user.email,
                username: session.user.username,
                name: session.user.name,
                goal: session.user.goal
            }
        },
        user: {
            id: session.user.id,
            email: session.user.email,
            username: session.user.username,
            name: session.user.name,
            goal: session.user.goal
        },
        csrfToken: session.csrfToken
    };
}

app.get('/api/health', async (_req, res) => {
    try {
        await query('SELECT 1');
        return res.json({ ok: true, db: 'connected' });
    } catch (error) {
        return res.status(500).json({ ok: false, error: 'Database unavailable.' });
    }
});

app.get('/api/auth/session', async (req, res) => {
    try {
        const session = await getSessionFromRequest(req);
        if (!session) {
            return res.status(401).json({ authenticated: false, error: 'Not authenticated.' });
        }
        return res.json(sessionResponsePayload(session));
    } catch (error) {
        return res.status(500).json({ error: 'Session check failed.' });
    }
});

app.post('/api/auth/signup', assertSameOrigin, async (req, res) => {
    const email = safeString(req.body?.email).toLowerCase();
    const username = safeString(req.body?.username);
    const password = String(req.body?.password || '');
    const confirmPassword = String(req.body?.confirmPassword || '');

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'A valid email is required for sign up.' });
    }
    if (!isValidUsername(username)) {
        return res.status(400).json({ error: 'Username must be 3+ chars and can include . _ -' });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        const passwordHash = hashPassword(password);
        const userId = await withTransaction(async (client) => {
            const created = await client.query(
                `
                INSERT INTO users (email, password_hash, username)
                VALUES ($1, $2, $3)
                RETURNING id
                `,
                [email, passwordHash, username]
            );
            const nextUserId = created.rows[0].id;
            await client.query(
                `
                INSERT INTO user_profiles (user_id, username, name, email, goal)
                VALUES ($1, $2, $2, $3, 'exploring')
                ON CONFLICT (user_id)
                DO UPDATE SET
                    username = EXCLUDED.username,
                    name = EXCLUDED.name,
                    email = EXCLUDED.email,
                    updated_at = NOW()
                `,
                [nextUserId, username, email]
            );
            return nextUserId;
        });

        const csrfToken = await createSession(res, req, userId);

        return res.status(201).json({
            ok: true,
            user: {
                id: userId,
                email,
                username,
                name: username,
                goal: 'exploring'
            },
            csrfToken
        });
    } catch (error) {
        if (error?.code === '23505') {
            return res.status(409).json({ error: 'An account with that email or username already exists.' });
        }
        return res.status(500).json({ error: 'Failed to create account.' });
    }
});

app.post('/api/auth/login', assertSameOrigin, async (req, res) => {
    const identity = normalizeEmailOrUsername(req.body?.email).toLowerCase();
    const password = String(req.body?.password || '');

    if (!identity || !password) {
        return res.status(400).json({ error: 'Email/username and password are required.' });
    }

    try {
        const found = await query(
            `
            SELECT
                u.id,
                u.email,
                u.password_hash,
                u.username,
                p.username AS profile_username,
                p.name,
                p.goal
            FROM users u
            LEFT JOIN user_profiles p ON p.user_id = u.id
            WHERE LOWER(u.email) = $1
               OR LOWER(COALESCE(u.username, '')) = $1
               OR LOWER(COALESCE(p.username, '')) = $1
            LIMIT 1
            `,
            [identity]
        );

        const user = found.rows[0];
        if (!user || !verifyPassword(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        await query('UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [user.id]);
        const csrfToken = await createSession(res, req, user.id);

        return res.json({
            ok: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.profile_username || user.username || user.name || null,
                name: user.name || user.profile_username || user.username || null,
                goal: user.goal || 'exploring'
            },
            csrfToken
        });
    } catch (error) {
        return res.status(500).json({ error: 'Login failed.' });
    }
});

app.post('/api/auth/logout', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    try {
        await clearSession(req, res);
        return res.json({ ok: true });
    } catch (error) {
        return res.status(500).json({ error: 'Logout failed.' });
    }
});

app.get('/api/profile', requireAuth, async (req, res) => {
    try {
        const result = await query(
            `
            SELECT user_id, username, name, email, goal, created_at, updated_at
            FROM user_profiles
            WHERE user_id = $1
            LIMIT 1
            `,
            [req.auth.userId]
        );
        const profile = result.rows[0] || {
            user_id: req.auth.userId,
            username: req.auth.user.username,
            name: req.auth.user.name,
            email: req.auth.user.email,
            goal: req.auth.user.goal || 'exploring'
        };
        return res.json({ ok: true, profile });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to load profile.' });
    }
});

app.post('/api/profile', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    const profile = req.body?.profile && typeof req.body.profile === 'object' ? req.body.profile : {};
    const username = safeString(profile.username || profile.name || req.auth.user.username);
    const name = safeString(profile.name || username || req.auth.user.name);
    const email = safeString(profile.email || req.auth.user.email).toLowerCase();
    const goal = safeString(profile.goal || req.auth.user.goal || 'exploring') || 'exploring';

    if (username && !isValidUsername(username)) {
        return res.status(400).json({ error: 'Invalid username format.' });
    }
    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        await withTransaction(async (client) => {
            if (username) {
                await client.query('UPDATE users SET username = $2, updated_at = NOW() WHERE id = $1', [req.auth.userId, username]);
            }
            await client.query(
                `
                INSERT INTO user_profiles (user_id, username, name, email, goal)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (user_id)
                DO UPDATE SET
                    username = EXCLUDED.username,
                    name = EXCLUDED.name,
                    email = EXCLUDED.email,
                    goal = EXCLUDED.goal,
                    updated_at = NOW()
                `,
                [req.auth.userId, username || null, name || null, email || null, goal]
            );
        });

        return res.json({
            ok: true,
            profile: {
                userId: req.auth.userId,
                username,
                name,
                email,
                goal
            }
        });
    } catch (error) {
        if (error?.code === '23505') {
            return res.status(409).json({ error: 'That username is already in use.' });
        }
        return res.status(500).json({ error: 'Failed to save profile.' });
    }
});

app.get('/api/user-state', requireAuth, async (req, res) => {
    try {
        const result = await query('SELECT state, updated_at FROM user_states WHERE user_id = $1 LIMIT 1', [req.auth.userId]);
        if (!result.rows[0]) {
            return res.json({ ok: true, state: null, updatedAt: null });
        }
        return res.json({ ok: true, state: result.rows[0].state, updatedAt: result.rows[0].updated_at });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to load learning state.' });
    }
});

app.put('/api/user-state', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    const state = req.body?.state;
    if (!state || typeof state !== 'object' || Array.isArray(state)) {
        return res.status(400).json({ error: 'State payload must be an object.' });
    }
    const serialized = JSON.stringify(state);
    if (serialized.length > 2_000_000) {
        return res.status(413).json({ error: 'State payload is too large.' });
    }

    try {
        await query(
            `
            INSERT INTO user_states (user_id, state)
            VALUES ($1, $2::jsonb)
            ON CONFLICT (user_id)
            DO UPDATE SET state = EXCLUDED.state, updated_at = NOW()
            `,
            [req.auth.userId, serialized]
        );
        return res.json({ ok: true });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to store learning state.' });
    }
});

app.post('/api/support', assertSameOrigin, async (req, res) => {
    const session = await getSessionFromRequest(req).catch(() => null);
    const receivedCsrf = safeString(req.headers['x-csrf-token'] || req.headers['csrf-token']);
    if (session && !safeTokenCompare(session.csrfToken, receivedCsrf)) {
        return res.status(403).json({ error: 'Invalid CSRF token.' });
    }
    const moduleId = safeString(req.body?.moduleId, null);
    const topic = safeString(req.body?.topic, null);
    const message = safeString(req.body?.message);
    const language = safeString(req.body?.language || 'en') || 'en';
    const email = safeString(req.body?.email || session?.user?.email || null, null);

    if (!message) {
        return res.status(400).json({ error: 'Support message is required.' });
    }
    if (message.length > 5000) {
        return res.status(413).json({ error: 'Support message is too long.' });
    }

    try {
        const result = await query(
            `
            INSERT INTO support_requests (user_id, email, module_id, topic, message, language)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, created_at
            `,
            [session?.userId || null, email, moduleId, topic, message, language]
        );
        return res.status(201).json({ ok: true, requestId: result.rows[0].id, createdAt: result.rows[0].created_at });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to submit support request.' });
    }
});

app.use('/api', (_req, res) => {
    return res.status(404).json({ error: 'API endpoint not found.' });
});

const siteRoot = path.resolve(__dirname, '..');
app.use(express.static(siteRoot));

app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found.' });
    }
    return res.sendFile(path.join(siteRoot, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`CS Course Atlas server running on http://localhost:${PORT}`);
});
