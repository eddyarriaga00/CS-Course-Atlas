require('dotenv').config();

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const { query, withTransaction, closeDb } = require('./db');
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
const MAX_ACTIVE_SESSIONS_PER_USER = readPositiveInteger(process.env.MAX_ACTIVE_SESSIONS_PER_USER, 6);
const isProduction = process.env.NODE_ENV === 'production';
const siteRoot = path.resolve(__dirname, '..');
const TRUST_PROXY_SETTING = parseTrustProxySetting(process.env.TRUST_PROXY, 0);
const GLOBAL_API_WINDOW_MS = readPositiveInteger(process.env.GLOBAL_API_WINDOW_MS, 60_000);
const GLOBAL_API_MAX_REQUESTS = readPositiveInteger(process.env.GLOBAL_API_MAX_REQUESTS, 240);
const AUTH_WINDOW_MS = readPositiveInteger(process.env.AUTH_WINDOW_MS, 15 * 60 * 1000);
const AUTH_MAX_REQUESTS = readPositiveInteger(process.env.AUTH_MAX_REQUESTS, 12);
const AUTH_IDENTITY_WINDOW_MS = readPositiveInteger(process.env.AUTH_IDENTITY_WINDOW_MS, 15 * 60 * 1000);
const AUTH_IDENTITY_MAX_FAILURES = readPositiveInteger(process.env.AUTH_IDENTITY_MAX_FAILURES, 8);
const AUTH_IDENTITY_BLOCK_MS = readPositiveInteger(process.env.AUTH_IDENTITY_BLOCK_MS, 30 * 60 * 1000);
const SUPPORT_WINDOW_MS = readPositiveInteger(process.env.SUPPORT_WINDOW_MS, 15 * 60 * 1000);
const SUPPORT_MAX_REQUESTS = readPositiveInteger(process.env.SUPPORT_MAX_REQUESTS, 20);
const SUPPORT_MAX_MESSAGE_LENGTH = readPositiveInteger(process.env.SUPPORT_MAX_MESSAGE_LENGTH, 5_000);
const SUPPORT_MAX_FIELD_LENGTH = readPositiveInteger(process.env.SUPPORT_MAX_FIELD_LENGTH, 160);
const PASSWORD_MIN_LENGTH = readPositiveInteger(process.env.PASSWORD_MIN_LENGTH, 8);
const PASSWORD_MAX_LENGTH = readPositiveInteger(process.env.PASSWORD_MAX_LENGTH, 128);
const JSON_MAX_DEPTH = readPositiveInteger(process.env.JSON_MAX_DEPTH, 12);
const JSON_MAX_KEYS = readPositiveInteger(process.env.JSON_MAX_KEYS, 1500);
const JSON_MAX_ARRAY_LENGTH = readPositiveInteger(process.env.JSON_MAX_ARRAY_LENGTH, 250);
const JSON_MAX_STRING_LENGTH = readPositiveInteger(process.env.JSON_MAX_STRING_LENGTH, 10_000);
const SERVER_REQUEST_TIMEOUT_MS = readPositiveInteger(process.env.SERVER_REQUEST_TIMEOUT_MS, 30_000);
const SERVER_HEADERS_TIMEOUT_MS = readPositiveInteger(process.env.SERVER_HEADERS_TIMEOUT_MS, 35_000);
const SERVER_KEEP_ALIVE_TIMEOUT_MS = readPositiveInteger(process.env.SERVER_KEEP_ALIVE_TIMEOUT_MS, 5_000);
const SECURITY_CLEANUP_INTERVAL_MS = readPositiveInteger(process.env.SECURITY_CLEANUP_INTERVAL_MS, 15 * 60 * 1000);
const SECURITY_EVENT_RETENTION_HOURS = readPositiveInteger(process.env.SECURITY_EVENT_RETENTION_HOURS, 48);
const SESSION_COOKIE_SAME_SITE = parseSameSitePolicy(process.env.SESSION_COOKIE_SAME_SITE, 'lax');
const SESSION_COOKIE_SECURE = parseCookieSecureMode(process.env.SESSION_COOKIE_SECURE, isProduction);
const REQUIRE_JSON_MUTATIONS = parseBooleanEnv(process.env.REQUIRE_JSON_MUTATIONS, true);
const ENFORCE_FETCH_METADATA = parseBooleanEnv(process.env.ENFORCE_FETCH_METADATA, true);
const ALLOWED_HOSTS = parseAllowlist(process.env.ALLOWED_HOSTS);
const ALLOWED_ORIGINS = parseOriginAllowlist(process.env.ALLOWED_ORIGINS);
const EMAIL_PIN_EXPIRY_MINUTES = readPositiveInteger(process.env.EMAIL_PIN_EXPIRY_MINUTES, 10);
const EMAIL_PIN_MAX_ATTEMPTS = readPositiveInteger(process.env.EMAIL_PIN_MAX_ATTEMPTS, 5);
const EMAIL_PIN_PEPPER = String(process.env.EMAIL_PIN_PEPPER || '');
const EMAIL_PIN_DELIVERY_MODE_RAW = String(
    process.env.EMAIL_PIN_DELIVERY_MODE || (isProduction ? 'disabled' : 'log')
).trim().toLowerCase();
const EMAIL_PIN_DELIVERY_MODE = isProduction && EMAIL_PIN_DELIVERY_MODE_RAW === 'log'
    ? 'disabled'
    : EMAIL_PIN_DELIVERY_MODE_RAW;
const EMAIL_PIN_DEBUG_RESPONSE = !isProduction
    && String(process.env.EMAIL_PIN_DEBUG_RESPONSE || '').trim().toLowerCase() === 'true';
const OAUTH_STATE_COOKIE_NAME = String(process.env.OAUTH_STATE_COOKIE_NAME || 'csatlas_oauth_state').trim() || 'csatlas_oauth_state';
const OAUTH_STATE_TTL_MS = readPositiveInteger(process.env.OAUTH_STATE_TTL_MS, 10 * 60 * 1000);
const OAUTH_POST_LOGIN_FALLBACK_PATH = String(process.env.OAUTH_POST_LOGIN_FALLBACK_PATH || '/index.html').trim() || '/index.html';
const OAUTH_STATE_SECRET = String(process.env.OAUTH_STATE_SECRET || '').trim();
const OAUTH_STATE_SECRET_RUNTIME = OAUTH_STATE_SECRET || randomToken(48);
const OAUTH_JWKS_CACHE_MAX_AGE_MS = readPositiveInteger(process.env.OAUTH_JWKS_CACHE_MAX_AGE_MS, 30 * 60 * 1000);
const GOOGLE_OAUTH_CLIENT_ID = String(process.env.GOOGLE_OAUTH_CLIENT_ID || '').trim();
const GOOGLE_OAUTH_CLIENT_SECRET = String(process.env.GOOGLE_OAUTH_CLIENT_SECRET || '').trim();
const GOOGLE_OAUTH_REDIRECT_URI = String(process.env.GOOGLE_OAUTH_REDIRECT_URI || '').trim();
const APPLE_OAUTH_CLIENT_ID = String(process.env.APPLE_OAUTH_CLIENT_ID || '').trim();
const APPLE_OAUTH_CLIENT_SECRET = String(process.env.APPLE_OAUTH_CLIENT_SECRET || '').trim();
const APPLE_OAUTH_REDIRECT_URI = String(process.env.APPLE_OAUTH_REDIRECT_URI || '').trim();
const GITHUB_OAUTH_CLIENT_ID = String(process.env.GITHUB_OAUTH_CLIENT_ID || '').trim();
const GITHUB_OAUTH_CLIENT_SECRET = String(process.env.GITHUB_OAUTH_CLIENT_SECRET || '').trim();
const GITHUB_OAUTH_REDIRECT_URI = String(process.env.GITHUB_OAUTH_REDIRECT_URI || '').trim();
const SUPPORTED_OAUTH_PROVIDERS = Object.freeze(['google', 'apple', 'github']);
const OAUTH_PROVIDER_SET = new Set(SUPPORTED_OAUTH_PROVIDERS);
const OAUTH_IDENTITY_PROVIDER_LABELS = Object.freeze({
    google: 'Google',
    apple: 'Apple',
    github: 'GitHub'
});
const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const FORBIDDEN_JSON_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const BLOCKED_STATIC_PREFIXES = Object.freeze([
    '/server',
    '/scripts',
    '/node_modules',
    '/.git',
    '/.github',
    '/output',
    '/.playwright-cli'
]);
const BLOCKED_STATIC_FILES = Object.freeze(new Set([
    '/package.json',
    '/package-lock.json',
    '/tailwind.config.cjs'
]));
const CORS_ALLOWED_METHODS = Object.freeze(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
const CORS_ALLOWED_HEADERS = Object.freeze(['Content-Type', 'X-CSRF-Token', 'X-Requested-With']);
const BOOK_LIBRARY = [
    {
        id: 'liang-java-9e',
        title: 'Introduction to Java Programming (9th Edition)',
        author: 'Y. Daniel Liang',
        subject: 'Java',
        edition: '9th Edition',
        description: 'Core Java textbook with syntax, OOP, data structures, and problem-solving practice.',
        pages: null,
        filePath: process.env.LIANG_JAVA_BOOK_PATH || 'C:\\Users\\Eddy\\OneDrive - UNCG\\Introduction-to-Java-Programming-9th-Edition-Y-Daniel-Liang.pdf'
    }
];

const googleJwksClient = jwksClient({
    jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: OAUTH_JWKS_CACHE_MAX_AGE_MS,
    rateLimit: true,
    jwksRequestsPerMinute: 10
});

const appleJwksClient = jwksClient({
    jwksUri: 'https://appleid.apple.com/auth/keys',
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: OAUTH_JWKS_CACHE_MAX_AGE_MS,
    rateLimit: true,
    jwksRequestsPerMinute: 10
});

app.disable('x-powered-by');
app.set('trust proxy', TRUST_PROXY_SETTING);
app.set('query parser', 'simple');
app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    crossOriginResourcePolicy: { policy: 'same-site' }
}));
app.use(express.json({ limit: '2mb', strict: true }));
app.use(cookieParser());
app.use(attachRequestId);
app.use(setAdditionalSecurityHeaders);
app.use(enforceHostAllowlist);
app.use('/api', applyCorsForApi);
app.use('/api', enforceFetchMetadata);
app.use('/api', enforceJsonMutationContentType);
app.use('/api', enforceSafePayloadShape);

const apiRateLimit = createRateLimiter({
    windowMs: GLOBAL_API_WINDOW_MS,
    maxRequests: GLOBAL_API_MAX_REQUESTS,
    keyPrefix: 'api'
});
const authRateLimit = createRateLimiter({
    windowMs: AUTH_WINDOW_MS,
    maxRequests: AUTH_MAX_REQUESTS,
    keyPrefix: 'auth'
});
const supportRateLimit = createRateLimiter({
    windowMs: SUPPORT_WINDOW_MS,
    maxRequests: SUPPORT_MAX_REQUESTS,
    keyPrefix: 'support'
});

app.use('/api', apiRateLimit);
app.use('/api/auth/session', noStore);
app.use('/api/auth/login', authRateLimit, noStore);
app.use('/api/auth/signup', authRateLimit, noStore);
app.use('/api/auth/logout', noStore);
app.use('/api/auth/oauth/providers', noStore);
app.use('/api/profile/password', authRateLimit, noStore);
app.use('/api/profile/delete-account', authRateLimit, noStore);
app.use('/api/profile/email/request-pin', authRateLimit, noStore);
app.use('/api/profile/email/verify-pin', authRateLimit, noStore);
app.use('/api/profile', noStore);
app.use('/api/user-state', noStore);
app.use('/api/support', supportRateLimit);

function shouldUseSecureSessionCookie(req) {
    if (!SESSION_COOKIE_SECURE) {
        return false;
    }
    if (isProduction) {
        return true;
    }
    const forwardedProtoRaw = safeString(req?.headers?.['x-forwarded-proto']).toLowerCase();
    const forwardedProtoValues = forwardedProtoRaw
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
    const forwardedSecure = forwardedProtoValues.includes('https');
    return Boolean(req?.secure) || forwardedSecure;
}

function getCookieOptions(req) {
    const secureCookie = shouldUseSecureSessionCookie(req);
    const sameSitePolicy = secureCookie && SESSION_COOKIE_SAME_SITE === 'none'
        ? 'none'
        : SESSION_COOKIE_SAME_SITE === 'none'
            ? 'lax'
            : SESSION_COOKIE_SAME_SITE;
    return {
        httpOnly: true,
        sameSite: sameSitePolicy,
        secure: secureCookie,
        path: '/',
        maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
        priority: 'high'
    };
}

function resolveClientIp(req) {
    const trustedIp = typeof req.ip === 'string' ? req.ip.trim() : '';
    if (trustedIp) {
        return trustedIp;
    }
    return typeof req.socket?.remoteAddress === 'string' ? req.socket.remoteAddress : '';
}

function safeString(value, fallback = '') {
    return typeof value === 'string' ? value.trim() : fallback;
}

function readPositiveInteger(value, fallbackValue) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallbackValue;
    }
    return Math.floor(parsed);
}

function parseBooleanEnv(value, fallbackValue) {
    const raw = String(value || '').trim().toLowerCase();
    if (!raw) return Boolean(fallbackValue);
    if (['1', 'true', 'yes', 'on'].includes(raw)) return true;
    if (['0', 'false', 'no', 'off'].includes(raw)) return false;
    return Boolean(fallbackValue);
}

function parseTrustProxySetting(value, fallbackValue = 0) {
    const raw = String(value || '').trim().toLowerCase();
    if (!raw) return fallbackValue;
    if (['true', 'yes', 'on'].includes(raw)) return true;
    if (['false', 'no', 'off'].includes(raw)) return false;
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed >= 0) {
        return Math.floor(parsed);
    }
    return fallbackValue;
}

function parseAllowlist(value) {
    const raw = String(value || '').trim();
    if (!raw) return new Set();
    return new Set(
        raw
            .split(',')
            .map((entry) => entry.trim().toLowerCase())
            .filter(Boolean)
    );
}

function normalizeOriginHeader(value) {
    const raw = safeString(value);
    if (!raw) return '';
    try {
        const parsed = new URL(raw);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return '';
        }
        return `${parsed.protocol}//${parsed.host}`.toLowerCase();
    } catch (_error) {
        return '';
    }
}

function normalizeHostHeaderToHostname(value) {
    const raw = safeString(value).toLowerCase();
    if (!raw) return '';
    try {
        return safeString(new URL(`http://${raw}`).hostname).toLowerCase();
    } catch (_error) {
        return safeString(raw.split(':')[0]).toLowerCase();
    }
}

function isLoopbackHostname(value) {
    const hostname = safeString(value).toLowerCase();
    return hostname === 'localhost'
        || hostname === '127.0.0.1'
        || hostname === '::1'
        || hostname === '[::1]'
        || hostname === '0.0.0.0';
}

function isTrustedLocalDevOrigin(normalizedOrigin, hostHeader) {
    if (isProduction || !normalizedOrigin || !hostHeader) return false;
    try {
        const parsedOrigin = new URL(normalizedOrigin);
        if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
            return false;
        }
        const originHostname = safeString(parsedOrigin.hostname).toLowerCase();
        const hostHostname = normalizeHostHeaderToHostname(hostHeader);
        return isLoopbackHostname(originHostname) && isLoopbackHostname(hostHostname);
    } catch (_error) {
        return false;
    }
}

function parseOriginAllowlist(value) {
    const raw = String(value || '').trim();
    if (!raw) return new Set();
    return new Set(
        raw
            .split(',')
            .map((entry) => normalizeOriginHeader(entry))
            .filter(Boolean)
    );
}

function originHostMatches(normalizedOrigin, hostHeader) {
    if (!normalizedOrigin || !hostHeader) return false;
    try {
        const parsed = new URL(normalizedOrigin);
        return safeString(parsed.host).toLowerCase() === safeString(hostHeader).toLowerCase();
    } catch (_error) {
        return false;
    }
}

function evaluateOriginTrust(req) {
    const originHeader = safeString(req.headers.origin);
    const hostHeader = safeString(req.headers.host).toLowerCase();
    const normalizedOrigin = normalizeOriginHeader(originHeader);
    const sameOrigin = originHostMatches(normalizedOrigin, hostHeader);
    const allowlisted = Boolean(normalizedOrigin && ALLOWED_ORIGINS.has(normalizedOrigin));
    const localDevTrusted = isTrustedLocalDevOrigin(normalizedOrigin, hostHeader);
    const trusted = !originHeader || sameOrigin || allowlisted || localDevTrusted;
    return {
        originHeader,
        hostHeader,
        normalizedOrigin,
        sameOrigin,
        allowlisted,
        localDevTrusted,
        trusted
    };
}

function appendVaryHeader(res, value) {
    const current = safeString(res.getHeader('Vary') || '');
    if (!current) {
        res.setHeader('Vary', value);
        return;
    }
    const existing = new Set(
        current
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean)
            .map((entry) => entry.toLowerCase())
    );
    if (!existing.has(String(value).toLowerCase())) {
        res.setHeader('Vary', `${current}, ${value}`);
    }
}

function applyCorsForApi(req, res, next) {
    const originInfo = evaluateOriginTrust(req);
    if (!originInfo.originHeader) {
        return next();
    }

    if (!originInfo.normalizedOrigin) {
        logSecurityEvent('blocked_invalid_origin_header', {
            origin: originInfo.originHeader,
            host: originInfo.hostHeader || 'missing',
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(403).json({ error: 'Invalid origin header.' });
    }

    if (!originInfo.trusted) {
        logSecurityEvent('blocked_cors_origin', {
            origin: originInfo.normalizedOrigin,
            host: originInfo.hostHeader || 'missing',
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(403).json({ error: 'Origin is not allowed.' });
    }

    appendVaryHeader(res, 'Origin');
    res.setHeader('Access-Control-Allow-Origin', originInfo.normalizedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (safeString(req.method).toUpperCase() === 'OPTIONS') {
        appendVaryHeader(res, 'Access-Control-Request-Headers');
        res.setHeader('Access-Control-Allow-Methods', CORS_ALLOWED_METHODS.join(', '));
        res.setHeader('Access-Control-Allow-Headers', CORS_ALLOWED_HEADERS.join(', '));
        res.setHeader('Access-Control-Max-Age', '600');
        return res.status(204).end();
    }

    return next();
}

function parseSameSitePolicy(value, fallback = 'lax') {
    const normalized = String(value || '').trim().toLowerCase();
    if (['strict', 'lax', 'none'].includes(normalized)) {
        return normalized;
    }
    return fallback;
}

function parseCookieSecureMode(value, fallbackValue) {
    const normalized = String(value || '').trim().toLowerCase();
    if (!normalized || normalized === 'auto') {
        return Boolean(fallbackValue);
    }
    if (['1', 'true', 'yes', 'on'].includes(normalized)) {
        return true;
    }
    if (['0', 'false', 'no', 'off'].includes(normalized)) {
        return false;
    }
    return Boolean(fallbackValue);
}

function logSecurityEvent(eventType, detail = {}) {
    const payload = {
        type: safeString(eventType, 'security_event'),
        at: new Date().toISOString(),
        ...detail
    };
    console.warn('[security-event]', JSON.stringify(payload));
}

function attachRequestId(req, res, next) {
    const requestId = randomToken(12);
    req.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    return next();
}

function setAdditionalSecurityHeaders(_req, res, next) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    return next();
}

function enforceHostAllowlist(req, res, next) {
    if (ALLOWED_HOSTS.size === 0) {
        return next();
    }
    const hostHeader = safeString(req.headers.host).toLowerCase();
    if (!hostHeader || !ALLOWED_HOSTS.has(hostHeader)) {
        logSecurityEvent('blocked_host_header', {
            host: hostHeader || 'missing',
            requestId: req.requestId || ''
        });
        return res.status(400).json({ error: 'Invalid Host header.' });
    }
    return next();
}

function enforceFetchMetadata(req, res, next) {
    if (!ENFORCE_FETCH_METADATA) {
        return next();
    }
    const method = safeString(req.method).toUpperCase();
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        return next();
    }
    const fetchSite = safeString(req.headers['sec-fetch-site']).toLowerCase();
    if (!fetchSite) {
        return next();
    }
    if (fetchSite === 'cross-site') {
        const originInfo = evaluateOriginTrust(req);
        if (originInfo.allowlisted) {
            return next();
        }
        logSecurityEvent('blocked_fetch_metadata', {
            fetchSite,
            method,
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(403).json({ error: 'Cross-site request blocked.' });
    }
    return next();
}

function enforceJsonMutationContentType(req, res, next) {
    if (!REQUIRE_JSON_MUTATIONS) {
        return next();
    }
    const method = safeString(req.method).toUpperCase();
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return next();
    }
    const contentType = safeString(req.headers['content-type']).toLowerCase();
    if (!contentType.startsWith('application/json')) {
        return res.status(415).json({ error: 'Content-Type must be application/json.' });
    }
    return next();
}

function inspectPayloadForSecurity(value, context, depth = 0) {
    if (depth > JSON_MAX_DEPTH) {
        return 'JSON payload exceeds maximum nesting depth.';
    }

    if (typeof value === 'string' && value.length > JSON_MAX_STRING_LENGTH) {
        return 'JSON payload includes an excessively long string value.';
    }

    if (Array.isArray(value)) {
        if (value.length > JSON_MAX_ARRAY_LENGTH) {
            return 'JSON payload includes an excessively large array.';
        }
        for (const item of value) {
            const nestedError = inspectPayloadForSecurity(item, context, depth + 1);
            if (nestedError) return nestedError;
        }
        return null;
    }

    if (!value || typeof value !== 'object') {
        return null;
    }

    const keys = Object.keys(value);
    context.keyCount += keys.length;
    if (context.keyCount > JSON_MAX_KEYS) {
        return 'JSON payload includes too many keys.';
    }

    for (const key of keys) {
        const normalizedKey = safeString(key).toLowerCase();
        if (FORBIDDEN_JSON_KEYS.has(normalizedKey)) {
            return 'JSON payload includes a blocked key name.';
        }
        if (normalizedKey.length > 128) {
            return 'JSON payload includes an excessively long key name.';
        }
        const nestedError = inspectPayloadForSecurity(value[key], context, depth + 1);
        if (nestedError) return nestedError;
    }

    return null;
}

function enforceSafePayloadShape(req, res, next) {
    const method = safeString(req.method).toUpperCase();
    if (!MUTATING_METHODS.has(method)) {
        return next();
    }
    if (req.body == null || req.body === '') {
        return next();
    }
    if (typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ error: 'JSON payload must be an object.' });
    }

    const payloadError = inspectPayloadForSecurity(req.body, { keyCount: 0 });
    if (payloadError) {
        logSecurityEvent('blocked_payload_shape', {
            method,
            path: req.path,
            requestId: req.requestId || '',
            reason: payloadError
        });
        return res.status(400).json({ error: payloadError });
    }

    return next();
}

function noStore(_req, res, next) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return next();
}

function normalizeRequestPathForSecurity(rawPath) {
    const fallback = '/';
    const source = typeof rawPath === 'string' && rawPath.trim() ? rawPath : fallback;
    let decoded = source;
    try {
        decoded = decodeURIComponent(source);
    } catch (_error) {
        decoded = source;
    }
    const normalized = decoded.replace(/\\/g, '/').toLowerCase();
    return normalized.startsWith('/') ? normalized : `/${normalized}`;
}

function isBlockedStaticPath(rawPath) {
    const normalizedPath = normalizeRequestPathForSecurity(rawPath);
    if (BLOCKED_STATIC_FILES.has(normalizedPath)) {
        return true;
    }
    return BLOCKED_STATIC_PREFIXES.some((prefix) => (
        normalizedPath === prefix
        || normalizedPath.startsWith(`${prefix}/`)
    ));
}

function getOAuthStateCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax',
        secure: SESSION_COOKIE_SECURE,
        path: '/api/auth/oauth',
        maxAge: OAUTH_STATE_TTL_MS,
        priority: 'high'
    };
}

function clearOAuthStateCookie(res) {
    res.clearCookie(OAUTH_STATE_COOKIE_NAME, {
        ...getOAuthStateCookieOptions(),
        maxAge: undefined,
        expires: new Date(0)
    });
}

function getOAuthProviderLabel(provider) {
    return OAUTH_IDENTITY_PROVIDER_LABELS[provider] || 'Social';
}

function normalizeOAuthProvider(value) {
    const normalized = safeString(value).toLowerCase();
    return OAUTH_PROVIDER_SET.has(normalized) ? normalized : '';
}

function getOAuthProviderCredentials(provider) {
    switch (provider) {
        case 'google':
            return {
                clientId: GOOGLE_OAUTH_CLIENT_ID,
                clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
                configuredRedirectUri: GOOGLE_OAUTH_REDIRECT_URI
            };
        case 'apple':
            return {
                clientId: APPLE_OAUTH_CLIENT_ID,
                clientSecret: APPLE_OAUTH_CLIENT_SECRET,
                configuredRedirectUri: APPLE_OAUTH_REDIRECT_URI
            };
        case 'github':
            return {
                clientId: GITHUB_OAUTH_CLIENT_ID,
                clientSecret: GITHUB_OAUTH_CLIENT_SECRET,
                configuredRedirectUri: GITHUB_OAUTH_REDIRECT_URI
            };
        default:
            return {
                clientId: '',
                clientSecret: '',
                configuredRedirectUri: ''
            };
    }
}

function resolveOAuthRedirectUri(req, provider, configuredRedirectUri = '') {
    const explicit = safeString(configuredRedirectUri);
    if (/^https?:\/\//i.test(explicit)) {
        return explicit;
    }
    const host = safeString(req.get('host'));
    if (!host) return '';
    const callbackPath = `/api/auth/oauth/${provider}/callback`;
    return `${req.protocol}://${host}${callbackPath}`;
}

function getOAuthProviderStatusMap(req) {
    return SUPPORTED_OAUTH_PROVIDERS.reduce((acc, provider) => {
        const credentials = getOAuthProviderCredentials(provider);
        const redirectUri = resolveOAuthRedirectUri(req, provider, credentials.configuredRedirectUri);
        const enabled = Boolean(credentials.clientId && credentials.clientSecret && /^https?:\/\//i.test(redirectUri));
        acc[provider] = {
            provider,
            label: getOAuthProviderLabel(provider),
            enabled,
            redirectUri,
            reasons: enabled
                ? []
                : [
                    !credentials.clientId ? `${provider.toUpperCase()}_OAUTH_CLIENT_ID is missing.` : '',
                    !credentials.clientSecret ? `${provider.toUpperCase()}_OAUTH_CLIENT_SECRET is missing.` : '',
                    !redirectUri ? `Unable to resolve ${provider} OAuth redirect URI.` : ''
                ].filter(Boolean)
        };
        return acc;
    }, {});
}

function buildOAuthAuthorizationUrl(provider, config, stateToken) {
    const { clientId, redirectUri } = config;
    if (provider === 'google') {
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'openid email profile',
            prompt: 'select_account',
            state: stateToken
        });
        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }
    if (provider === 'apple') {
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            response_mode: 'query',
            scope: 'name email',
            state: stateToken
        });
        return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
    }
    if (provider === 'github') {
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: 'read:user user:email',
            state: stateToken
        });
        return `https://github.com/login/oauth/authorize?${params.toString()}`;
    }
    throw new Error('Unsupported OAuth provider.');
}

function signOAuthState(payload) {
    const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
    const signature = crypto
        .createHmac('sha256', OAUTH_STATE_SECRET_RUNTIME)
        .update(encodedPayload, 'utf8')
        .digest('base64url');
    return `${encodedPayload}.${signature}`;
}

function verifyAndDecodeOAuthState(token) {
    const normalizedToken = safeString(token);
    const [encodedPayload, signature] = normalizedToken.split('.');
    if (!encodedPayload || !signature) {
        return null;
    }
    const expectedSignature = crypto
        .createHmac('sha256', OAUTH_STATE_SECRET_RUNTIME)
        .update(encodedPayload, 'utf8')
        .digest('base64url');
    if (!safeTokenCompare(expectedSignature, signature)) {
        return null;
    }
    try {
        const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
        if (!payload || typeof payload !== 'object') {
            return null;
        }
        return payload;
    } catch (_error) {
        return null;
    }
}

function sanitizeOAuthReturnPath(rawReturnPath) {
    const fallbackPath = OAUTH_POST_LOGIN_FALLBACK_PATH.startsWith('/')
        ? OAUTH_POST_LOGIN_FALLBACK_PATH
        : '/index.html';
    const candidate = safeString(rawReturnPath);
    if (!candidate) {
        return fallbackPath;
    }
    if (candidate.startsWith('//') || !candidate.startsWith('/')) {
        return fallbackPath;
    }
    try {
        const parsed = new URL(candidate, 'http://localhost');
        const normalizedPath = `${parsed.pathname}${parsed.search}${parsed.hash}`;
        if (!normalizedPath.startsWith('/')) {
            return fallbackPath;
        }
        if (normalizedPath.startsWith('/api/')) {
            return fallbackPath;
        }
        if (isBlockedStaticPath(parsed.pathname)) {
            return fallbackPath;
        }
        return normalizedPath;
    } catch (_error) {
        return fallbackPath;
    }
}

function appendOAuthResultToPath(basePath, entries) {
    const parsed = new URL(basePath, 'http://localhost');
    for (const [key, value] of entries) {
        if (!key) continue;
        if (value == null || value === '') {
            parsed.searchParams.delete(key);
            continue;
        }
        parsed.searchParams.set(key, String(value));
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 12_000) {
    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        const payloadText = await response.text();
        let payload = null;
        try {
            payload = payloadText ? JSON.parse(payloadText) : null;
        } catch (_error) {
            payload = payloadText ? { raw: payloadText } : null;
        }
        if (!response.ok) {
            const providerError = safeString(payload?.error_description || payload?.error || payload?.message);
            const statusMessage = response.statusText || `HTTP ${response.status}`;
            throw new Error(providerError || statusMessage || 'Remote OAuth request failed.');
        }
        return payload;
    } finally {
        clearTimeout(timeoutHandle);
    }
}

async function verifyJwtWithProviderJwks(provider, idToken, options = {}) {
    const token = safeString(idToken);
    if (!token) {
        throw new Error('Missing provider token.');
    }
    const jwks = provider === 'apple' ? appleJwksClient : googleJwksClient;
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            (header, callback) => {
                const keyId = safeString(header?.kid);
                if (!keyId) {
                    callback(new Error('Provider key id is missing.'));
                    return;
                }
                jwks.getSigningKey(keyId, (error, key) => {
                    if (error) {
                        callback(error);
                        return;
                    }
                    const publicKey = typeof key?.getPublicKey === 'function'
                        ? key.getPublicKey()
                        : key?.publicKey || key?.rsaPublicKey || '';
                    callback(null, publicKey);
                });
            },
            {
                algorithms: ['RS256'],
                audience: options.audience,
                issuer: options.issuer
            },
            (error, decoded) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(decoded || {});
            }
        );
    });
}

function selectGitHubVerifiedEmail(emails) {
    if (!Array.isArray(emails)) return '';
    const normalized = emails
        .map((item) => ({
            email: normalizeEmail(item?.email || ''),
            primary: Boolean(item?.primary),
            verified: Boolean(item?.verified)
        }))
        .filter((item) => item.email && item.verified);
    const primary = normalized.find((item) => item.primary);
    return (primary || normalized[0] || {}).email || '';
}

function sanitizeUsernameSeed(value, fallback = 'student') {
    const normalized = String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/[-_.]{2,}/g, '-')
        .replace(/^[-_.]+|[-_.]+$/g, '');
    const candidate = normalized || fallback;
    return candidate.slice(0, 24);
}

function buildInitialOAuthUsername(profile) {
    const emailLocalPart = String(profile?.email || '').split('@')[0];
    const subjectSuffix = String(profile?.subject || '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(-6)
        .toLowerCase();
    const seed = sanitizeUsernameSeed(
        profile?.usernameHint
        || profile?.name
        || emailLocalPart
        || `${profile?.provider || 'user'}-student`
    );
    const suffix = subjectSuffix || randomToken(4).toLowerCase();
    const full = `${seed}-${suffix}`.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    return full.slice(0, 32);
}

async function usernameExists(client, username) {
    const result = await client.query(
        `
        SELECT 1
        FROM users
        WHERE LOWER(COALESCE(username, '')) = LOWER($1)
        UNION
        SELECT 1
        FROM user_profiles
        WHERE LOWER(COALESCE(username, '')) = LOWER($1)
        LIMIT 1
        `,
        [username]
    );
    return Boolean(result.rows.length);
}

async function reserveOAuthUsername(client, profile) {
    const base = buildInitialOAuthUsername(profile);
    const attempts = [base];
    for (let i = 0; i < 6; i++) {
        attempts.push(`${base.slice(0, 26)}-${randomToken(3).toLowerCase()}`.slice(0, 32));
    }
    for (const candidate of attempts) {
        const normalizedCandidate = sanitizeUsernameSeed(candidate, 'student').slice(0, 32);
        if (!normalizedCandidate || normalizedCandidate.length < 3) continue;
        const exists = await usernameExists(client, normalizedCandidate);
        if (!exists) {
            return normalizedCandidate;
        }
    }
    return `${sanitizeUsernameSeed(base, 'student').slice(0, 20)}-${randomToken(6).toLowerCase()}`.slice(0, 32);
}

async function exchangeGoogleCodeForProfile(code, redirectUri) {
    const tokenPayload = await fetchJsonWithTimeout(
        'https://oauth2.googleapis.com/token',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_OAUTH_CLIENT_ID,
                client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }).toString()
        }
    );
    const decoded = await verifyJwtWithProviderJwks('google', tokenPayload?.id_token, {
        audience: GOOGLE_OAUTH_CLIENT_ID,
        issuer: ['https://accounts.google.com', 'accounts.google.com']
    });
    const email = normalizeEmail(decoded?.email || '');
    const emailVerified = decoded?.email_verified === true || String(decoded?.email_verified).toLowerCase() === 'true';
    if (!email || !emailVerified) {
        throw createHttpError(400, 'Google account must provide a verified email address.');
    }
    return {
        provider: 'google',
        subject: safeString(decoded?.sub),
        email,
        emailVerified,
        name: safeString(decoded?.name),
        usernameHint: safeString(decoded?.given_name || decoded?.name || email.split('@')[0]),
        avatar: safeString(decoded?.picture)
    };
}

async function exchangeAppleCodeForProfile(code, redirectUri) {
    const tokenPayload = await fetchJsonWithTimeout(
        'https://appleid.apple.com/auth/token',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: APPLE_OAUTH_CLIENT_ID,
                client_secret: APPLE_OAUTH_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }).toString()
        }
    );
    const decoded = await verifyJwtWithProviderJwks('apple', tokenPayload?.id_token, {
        audience: APPLE_OAUTH_CLIENT_ID,
        issuer: 'https://appleid.apple.com'
    });
    const email = normalizeEmail(decoded?.email || '');
    const emailVerified = decoded?.email_verified === true || String(decoded?.email_verified).toLowerCase() === 'true';
    return {
        provider: 'apple',
        subject: safeString(decoded?.sub),
        email,
        emailVerified,
        name: safeString(decoded?.name),
        usernameHint: safeString(email.split('@')[0] || 'apple-student'),
        avatar: ''
    };
}

async function exchangeGitHubCodeForProfile(code, redirectUri) {
    const tokenPayload = await fetchJsonWithTimeout(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
            },
            body: new URLSearchParams({
                code,
                client_id: GITHUB_OAUTH_CLIENT_ID,
                client_secret: GITHUB_OAUTH_CLIENT_SECRET,
                redirect_uri: redirectUri
            }).toString()
        }
    );
    const accessToken = safeString(tokenPayload?.access_token);
    if (!accessToken) {
        throw createHttpError(400, 'GitHub token exchange failed.');
    }
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'User-Agent': 'CSCourseAtlas'
    };
    const userPayload = await fetchJsonWithTimeout('https://api.github.com/user', { headers });
    const emailsPayload = await fetchJsonWithTimeout('https://api.github.com/user/emails', { headers });
    const email = selectGitHubVerifiedEmail(emailsPayload) || normalizeEmail(userPayload?.email || '');
    if (!email) {
        throw createHttpError(400, 'GitHub account must expose at least one verified email.');
    }
    return {
        provider: 'github',
        subject: safeString(userPayload?.id),
        email,
        emailVerified: true,
        name: safeString(userPayload?.name || userPayload?.login),
        usernameHint: safeString(userPayload?.login || email.split('@')[0]),
        avatar: safeString(userPayload?.avatar_url)
    };
}

async function exchangeOAuthCodeForProfile(provider, code, redirectUri) {
    if (provider === 'google') {
        return exchangeGoogleCodeForProfile(code, redirectUri);
    }
    if (provider === 'apple') {
        return exchangeAppleCodeForProfile(code, redirectUri);
    }
    if (provider === 'github') {
        return exchangeGitHubCodeForProfile(code, redirectUri);
    }
    throw createHttpError(400, 'Unsupported OAuth provider.');
}

async function loadUserSummary(client, userId) {
    const result = await client.query(
        `
        SELECT
            u.id,
            u.email,
            u.username,
            p.username AS profile_username,
            p.name,
            p.goal
        FROM users u
        LEFT JOIN user_profiles p ON p.user_id = u.id
        WHERE u.id = $1
        LIMIT 1
        `,
        [userId]
    );
    const row = result.rows[0];
    if (!row) {
        throw createHttpError(500, 'OAuth user lookup failed.');
    }
    return {
        id: row.id,
        email: row.email,
        username: row.profile_username || row.username || row.name || null,
        name: row.name || row.profile_username || row.username || null,
        goal: row.goal || 'exploring'
    };
}

async function resolveOAuthUser(profile) {
    const normalizedSubject = safeString(profile?.subject);
    const normalizedProvider = normalizeOAuthProvider(profile?.provider);
    if (!normalizedProvider || !normalizedSubject) {
        throw createHttpError(400, 'Invalid provider identity.');
    }

    const normalizedEmail = normalizeEmail(profile?.email || '');
    const providerProfileJson = JSON.stringify({
        name: safeString(profile?.name),
        avatar: safeString(profile?.avatar),
        usernameHint: safeString(profile?.usernameHint)
    });

    return withTransaction(async (client) => {
        const identityResult = await client.query(
            `
            SELECT user_id
            FROM oauth_identities
            WHERE provider = $1
              AND provider_subject = $2
            LIMIT 1
            `,
            [normalizedProvider, normalizedSubject]
        );
        let userId = identityResult.rows[0]?.user_id || '';

        if (!userId && normalizedEmail && profile.emailVerified) {
            const existingByEmail = await client.query(
                `
                SELECT id
                FROM users
                WHERE LOWER(email) = $1
                LIMIT 1
                `,
                [normalizedEmail]
            );
            userId = existingByEmail.rows[0]?.id || '';
        }

        if (!userId) {
            if (!normalizedEmail) {
                throw createHttpError(400, 'Provider did not return a usable email address.');
            }
            const generatedPasswordHash = await hashPassword(randomToken(48));
            const username = await reserveOAuthUsername(client, profile);
            const createdUser = await client.query(
                `
                INSERT INTO users (email, password_hash, username)
                VALUES ($1, $2, $3)
                RETURNING id
                `,
                [normalizedEmail, generatedPasswordHash, username]
            );
            userId = createdUser.rows[0].id;
            await client.query(
                `
                INSERT INTO user_profiles (user_id, username, name, email, goal)
                VALUES ($1, $2, $3, $4, 'exploring')
                ON CONFLICT (user_id)
                DO UPDATE SET
                    username = EXCLUDED.username,
                    name = EXCLUDED.name,
                    email = EXCLUDED.email,
                    updated_at = NOW()
                `,
                [userId, username, safeString(profile?.name) || username, normalizedEmail]
            );
        } else {
            await client.query(
                `
                INSERT INTO user_profiles (user_id, username, name, email, goal)
                VALUES (
                    $1,
                    COALESCE(NULLIF($2, ''), NULLIF($3, ''), NULL),
                    COALESCE(NULLIF($3, ''), NULLIF($2, ''), NULL),
                    COALESCE(NULLIF($4, ''), NULL),
                    'exploring'
                )
                ON CONFLICT (user_id)
                DO UPDATE SET
                    username = COALESCE(NULLIF(EXCLUDED.username, ''), user_profiles.username),
                    name = COALESCE(NULLIF(EXCLUDED.name, ''), user_profiles.name),
                    email = COALESCE(NULLIF(EXCLUDED.email, ''), user_profiles.email),
                    updated_at = NOW()
                `,
                [userId, safeString(profile?.usernameHint), safeString(profile?.name), normalizedEmail]
            );
        }

        await client.query(
            `
            INSERT INTO oauth_identities (
                user_id,
                provider,
                provider_subject,
                email,
                email_verified,
                profile_json,
                last_login_at
            )
            VALUES ($1, $2, $3, $4, $5, $6::jsonb, NOW())
            ON CONFLICT (provider, provider_subject)
            DO UPDATE SET
                user_id = EXCLUDED.user_id,
                email = EXCLUDED.email,
                email_verified = EXCLUDED.email_verified,
                profile_json = EXCLUDED.profile_json,
                last_login_at = NOW(),
                updated_at = NOW()
            `,
            [
                userId,
                normalizedProvider,
                normalizedSubject,
                normalizedEmail || null,
                Boolean(profile?.emailVerified),
                providerProfileJson
            ]
        );

        await client.query('UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [userId]);
        return loadUserSummary(client, userId);
    });
}

function createRateLimiter({ windowMs, maxRequests, keyPrefix }) {
    const hits = new Map();
    const cleanupInterval = Math.max(windowMs, 30_000);
    const cleanupTimer = setInterval(() => {
        const now = Date.now();
        for (const [key, value] of hits.entries()) {
            if (value.resetAt <= now) {
                hits.delete(key);
            }
        }
    }, cleanupInterval);
    cleanupTimer.unref();

    return function rateLimitMiddleware(req, res, next) {
        const now = Date.now();
        const clientIp = resolveClientIp(req) || 'unknown';
        const key = `${keyPrefix}:${clientIp}`;
        let state = hits.get(key);

        if (!state || state.resetAt <= now) {
            state = { count: 0, resetAt: now + windowMs };
        }

        state.count += 1;
        hits.set(key, state);

        const retryAfterSeconds = Math.max(1, Math.ceil((state.resetAt - now) / 1000));
        res.setHeader('RateLimit-Limit', String(maxRequests));
        res.setHeader('RateLimit-Remaining', String(Math.max(0, maxRequests - state.count)));
        res.setHeader('RateLimit-Reset', String(retryAfterSeconds));

        if (state.count > maxRequests) {
            res.setHeader('Retry-After', String(retryAfterSeconds));
            logSecurityEvent('rate_limited', {
                keyPrefix,
                path: req.path,
                method: safeString(req.method).toUpperCase(),
                ip: resolveClientIp(req) || 'unknown',
                requestId: req.requestId || ''
            });
            return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
        }

        return next();
    };
}

function resolveBookFilePath(book) {
    const configuredPath = safeString(book?.filePath, '');
    if (!configuredPath) return '';
    return path.isAbsolute(configuredPath)
        ? path.normalize(configuredPath)
        : path.resolve(siteRoot, configuredPath);
}

function getBookById(bookId) {
    return BOOK_LIBRARY.find((book) => book.id === bookId) || null;
}

function toBookClientModel(book) {
    const absolutePath = resolveBookFilePath(book);
    const available = Boolean(absolutePath && fs.existsSync(absolutePath));
    const numericPages = Number(book?.pages);

    return {
        id: book.id,
        title: book.title,
        author: book.author || '',
        description: book.description || '',
        subject: book.subject || '',
        edition: book.edition || '',
        pages: Number.isFinite(numericPages) && numericPages > 0 ? numericPages : null,
        available,
        fileName: path.basename(absolutePath || book.filePath || '')
    };
}

function assertSameOrigin(req, res, next) {
    const originInfo = evaluateOriginTrust(req);
    if (!originInfo.originHeader || !originInfo.hostHeader) {
        return next();
    }
    if (!originInfo.normalizedOrigin) {
        logSecurityEvent('blocked_invalid_origin_header', {
            origin: originInfo.originHeader,
            host: originInfo.hostHeader,
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(403).json({ error: 'Invalid origin header.' });
    }
    if (!originInfo.trusted) {
        logSecurityEvent('blocked_origin_mismatch', {
            origin: originInfo.normalizedOrigin,
            host: originInfo.hostHeader,
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(403).json({ error: 'Cross-origin requests are not allowed.' });
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

function createHttpError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = Number(statusCode) || 500;
    return error;
}

function isMissingRelationError(error) {
    return String(error?.code || '') === '42P01';
}

function normalizeEmail(value) {
    return safeString(value).toLowerCase();
}

function generateNumericPin(length = 6) {
    const size = Number(length);
    const digits = Number.isFinite(size) && size > 0 ? Math.floor(size) : 6;
    const upperBound = 10 ** digits;
    return String(crypto.randomInt(0, upperBound)).padStart(digits, '0');
}

function hashEmailPinCode(userId, email, pin) {
    const data = `${safeString(userId)}|${normalizeEmail(email)}|${String(pin || '')}|${EMAIL_PIN_PEPPER}`;
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function buildAuthThrottleKey(identity, req) {
    const normalizedIdentity = normalizeEmailOrUsername(identity).toLowerCase();
    const identityHash = crypto
        .createHash('sha256')
        .update(normalizedIdentity || 'anonymous', 'utf8')
        .digest('hex');
    const ipHash = hashIpAddress(resolveClientIp(req)) || 'unknown-ip';
    return `auth:${identityHash}:${ipHash}`;
}

async function assertAuthThrottleAllowed(throttleKey) {
    if (!throttleKey) return;
    try {
        const result = await query(
            `
            SELECT blocked_until
            FROM auth_throttles
            WHERE throttle_key = $1
            LIMIT 1
            `,
            [throttleKey]
        );
        const row = result.rows[0];
        if (!row?.blocked_until) {
            return;
        }
        const blockedUntilMs = new Date(row.blocked_until).getTime();
        if (!Number.isFinite(blockedUntilMs)) {
            return;
        }
        const nowMs = Date.now();
        if (blockedUntilMs <= nowMs) {
            await query(
                `
                UPDATE auth_throttles
                SET failure_count = 0, blocked_until = NULL, window_started_at = NOW(), updated_at = NOW()
                WHERE throttle_key = $1
                `,
                [throttleKey]
            );
            return;
        }
        const retryAfterSeconds = Math.max(1, Math.ceil((blockedUntilMs - nowMs) / 1000));
        const error = createHttpError(429, 'Too many authentication attempts. Please try again shortly.');
        error.retryAfterSeconds = retryAfterSeconds;
        throw error;
    } catch (error) {
        if (isMissingRelationError(error)) {
            return;
        }
        throw error;
    }
}

async function recordAuthFailure(throttleKey) {
    if (!throttleKey) return;
    try {
        const result = await query(
            `
            INSERT INTO auth_throttles (throttle_key, failure_count, window_started_at, blocked_until, updated_at)
            VALUES ($1, 1, NOW(), NULL, NOW())
            ON CONFLICT (throttle_key)
            DO UPDATE
            SET
                failure_count = CASE
                    WHEN auth_throttles.window_started_at <= NOW() - ($2::bigint * INTERVAL '1 millisecond')
                        THEN 1
                    ELSE auth_throttles.failure_count + 1
                END,
                window_started_at = CASE
                    WHEN auth_throttles.window_started_at <= NOW() - ($2::bigint * INTERVAL '1 millisecond')
                        THEN NOW()
                    ELSE auth_throttles.window_started_at
                END,
                blocked_until = CASE
                    WHEN (
                        CASE
                            WHEN auth_throttles.window_started_at <= NOW() - ($2::bigint * INTERVAL '1 millisecond')
                                THEN 1
                            ELSE auth_throttles.failure_count + 1
                        END
                    ) >= $3
                    THEN NOW() + ($4::bigint * INTERVAL '1 millisecond')
                    ELSE auth_throttles.blocked_until
                END,
                updated_at = NOW()
            RETURNING failure_count, blocked_until
            `,
            [throttleKey, AUTH_IDENTITY_WINDOW_MS, AUTH_IDENTITY_MAX_FAILURES, AUTH_IDENTITY_BLOCK_MS]
        );
        const row = result.rows[0];
        const blockedUntilMs = row?.blocked_until ? new Date(row.blocked_until).getTime() : 0;
        if (Number.isFinite(blockedUntilMs) && blockedUntilMs > Date.now()) {
            return {
                blocked: true,
                retryAfterSeconds: Math.max(1, Math.ceil((blockedUntilMs - Date.now()) / 1000))
            };
        }
        return { blocked: false, retryAfterSeconds: 0 };
    } catch (error) {
        if (isMissingRelationError(error)) {
            return { blocked: false, retryAfterSeconds: 0 };
        }
        throw error;
    }
}

async function clearAuthThrottle(throttleKey) {
    if (!throttleKey) return;
    try {
        await query('DELETE FROM auth_throttles WHERE throttle_key = $1', [throttleKey]);
    } catch (error) {
        if (!isMissingRelationError(error)) {
            throw error;
        }
    }
}

async function runSecurityCleanup() {
    try {
        await query('DELETE FROM user_sessions WHERE expires_at <= NOW()');
    } catch (error) {
        if (!isMissingRelationError(error)) {
            throw error;
        }
    }
    try {
        await query(
            `
            DELETE FROM email_change_verifications
            WHERE
                (consumed_at IS NOT NULL AND consumed_at < NOW() - ($1::bigint * INTERVAL '1 hour'))
                OR (expires_at < NOW() - ($1::bigint * INTERVAL '1 hour'))
            `,
            [SECURITY_EVENT_RETENTION_HOURS]
        );
    } catch (error) {
        if (!isMissingRelationError(error)) {
            throw error;
        }
    }
    try {
        await query(
            `
            DELETE FROM auth_throttles
            WHERE updated_at < NOW() - ($1::bigint * INTERVAL '1 hour')
            `,
            [SECURITY_EVENT_RETENTION_HOURS]
        );
    } catch (error) {
        if (!isMissingRelationError(error)) {
            throw error;
        }
    }
}

function scheduleSecurityCleanupTask() {
    const timer = setInterval(() => {
        runSecurityCleanup().catch((error) => {
            logSecurityEvent('cleanup_failure', {
                message: safeString(error?.message || String(error || 'cleanup error')),
                source: 'security_cleanup_job'
            });
        });
    }, SECURITY_CLEANUP_INTERVAL_MS);
    timer.unref();
    return timer;
}

function logSecurityConfigurationWarnings() {
    if (!isProduction) {
        return;
    }

    if (!SESSION_COOKIE_SECURE) {
        logSecurityEvent('weak_cookie_security_config', {
            reason: 'SESSION_COOKIE_SECURE=false in production can expose session cookies over plaintext transport.'
        });
    }

    if (ALLOWED_HOSTS.size === 0) {
        logSecurityEvent('host_allowlist_not_set', {
            reason: 'ALLOWED_HOSTS is empty in production; enable it to block hostile Host headers.'
        });
    }

    if (ALLOWED_ORIGINS.size > 0 && SESSION_COOKIE_SAME_SITE !== 'none') {
        logSecurityEvent('cross_origin_cookie_policy_mismatch', {
            reason: 'ALLOWED_ORIGINS is configured but SESSION_COOKIE_SAME_SITE is not "none"; browsers will block cross-site auth cookies.'
        });
    }

    if (ALLOWED_ORIGINS.size > 0 && !SESSION_COOKIE_SECURE) {
        logSecurityEvent('cross_origin_cookie_secure_required', {
            reason: 'ALLOWED_ORIGINS is configured but SESSION_COOKIE_SECURE=false; cross-site cookies require secure transport.'
        });
    }

    if (EMAIL_PIN_DELIVERY_MODE_RAW === 'log') {
        logSecurityEvent('email_pin_log_mode_blocked', {
            reason: 'EMAIL_PIN_DELIVERY_MODE=log was requested in production and was forced to disabled.'
        });
    }

    if (!OAUTH_STATE_SECRET) {
        logSecurityEvent('oauth_state_secret_missing', {
            reason: 'OAUTH_STATE_SECRET is not configured in production; OAuth state signatures reset on each restart.'
        });
    }
}

async function deliverEmailVerificationPin({ toEmail, pin, userId }) {
    if (EMAIL_PIN_DELIVERY_MODE === 'log') {
        console.info(
            `[email-pin] user=${safeString(userId, 'unknown')} email=${toEmail} pin=${pin} expires=${EMAIL_PIN_EXPIRY_MINUTES}m mode=log`
        );
        return { delivered: true, mode: 'log' };
    }
    if (EMAIL_PIN_DELIVERY_MODE === 'disabled') {
        return {
            delivered: false,
            reason: 'Email PIN delivery is not configured. Set EMAIL_PIN_DELIVERY_MODE=log while integrating an email provider.'
        };
    }
    return {
        delivered: false,
        reason: `Unsupported EMAIL_PIN_DELIVERY_MODE "${EMAIL_PIN_DELIVERY_MODE}".`
    };
}

function requireCsrf(req, res, next) {
    const expected = safeString(req.auth?.csrfToken);
    const received = safeString(req.headers['x-csrf-token'] || req.headers['csrf-token']);
    if (!expected) {
        logSecurityEvent('csrf_missing_session_token', {
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(401).json({ error: 'Session CSRF token missing.' });
    }
    if (!safeTokenCompare(expected, received)) {
        logSecurityEvent('csrf_mismatch', {
            path: req.path,
            requestId: req.requestId || ''
        });
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
    await query('DELETE FROM user_sessions WHERE expires_at <= NOW()');
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
    await query(
        `
        DELETE FROM user_sessions
        WHERE user_id = $1
          AND id NOT IN (
              SELECT id
              FROM user_sessions
              WHERE user_id = $1
              ORDER BY created_at DESC
              LIMIT $2
          )
        `,
        [userId, MAX_ACTIVE_SESSIONS_PER_USER]
    );
    res.cookie(SESSION_COOKIE_NAME, token, getCookieOptions(req));
    return csrfToken;
}

async function clearSession(req, res) {
    const token = safeString(req.cookies?.[SESSION_COOKIE_NAME]);
    if (token) {
        await query('DELETE FROM user_sessions WHERE token_hash = $1', [hashSessionToken(token)]);
    }
    res.clearCookie(SESSION_COOKIE_NAME, {
        ...getCookieOptions(req),
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
        return res.json({ ok: true });
    } catch (error) {
        return res.status(503).json({ ok: false, error: 'Service unavailable.' });
    }
});

app.get('/api/auth/session', async (req, res) => {
    try {
        const session = await getSessionFromRequest(req);
        if (!session) {
            return res.json({
                authenticated: false,
                session: null,
                user: null,
                csrfToken: ''
            });
        }
        return res.json(sessionResponsePayload(session));
    } catch (error) {
        return res.status(500).json({ error: 'Session check failed.' });
    }
});

app.get('/api/auth/oauth/providers', (req, res) => {
    const providers = getOAuthProviderStatusMap(req);
    return res.json({ ok: true, providers });
});

app.get('/api/auth/oauth/:provider/start', authRateLimit, noStore, (req, res) => {
    const provider = normalizeOAuthProvider(req.params.provider);
    if (!provider) {
        return res.status(400).json({ error: 'Unsupported OAuth provider.' });
    }

    const providers = getOAuthProviderStatusMap(req);
    const providerStatus = providers[provider];
    if (!providerStatus?.enabled) {
        return res.status(503).json({
            error: `${providerStatus?.label || 'This provider'} sign-in is not configured yet.`,
            details: providerStatus?.reasons || []
        });
    }

    const returnTo = sanitizeOAuthReturnPath(req.query?.returnTo);
    const statePayload = {
        provider,
        returnTo,
        issuedAt: Date.now(),
        nonce: randomToken(16)
    };
    const stateToken = signOAuthState(statePayload);
    const oauthUrl = buildOAuthAuthorizationUrl(
        provider,
        {
            clientId: getOAuthProviderCredentials(provider).clientId,
            redirectUri: providerStatus.redirectUri
        },
        stateToken
    );

    res.cookie(OAUTH_STATE_COOKIE_NAME, stateToken, getOAuthStateCookieOptions());
    return res.redirect(oauthUrl);
});

app.get('/api/auth/oauth/:provider/callback', noStore, async (req, res) => {
    const provider = normalizeOAuthProvider(req.params.provider);
    if (!provider) {
        return res.status(400).json({ error: 'Unsupported OAuth provider.' });
    }

    const providers = getOAuthProviderStatusMap(req);
    const providerStatus = providers[provider];
    const fallbackReturnTo = sanitizeOAuthReturnPath(OAUTH_POST_LOGIN_FALLBACK_PATH);

    if (!providerStatus?.enabled) {
        return res.redirect(
            appendOAuthResultToPath(fallbackReturnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'provider_not_configured']
            ])
        );
    }

    const providerError = safeString(req.query?.error);
    const providerState = safeString(req.query?.state);
    const providerCode = safeString(req.query?.code);
    const cookieState = safeString(req.cookies?.[OAUTH_STATE_COOKIE_NAME]);
    clearOAuthStateCookie(res);

    const decodedState = verifyAndDecodeOAuthState(cookieState);
    const returnTo = sanitizeOAuthReturnPath(decodedState?.returnTo || fallbackReturnTo);

    if (providerError) {
        logSecurityEvent('oauth_provider_rejected', {
            provider,
            reason: providerError,
            requestId: req.requestId || ''
        });
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'provider_rejected']
            ])
        );
    }

    if (!cookieState || !providerState || !safeTokenCompare(cookieState, providerState) || !decodedState) {
        logSecurityEvent('oauth_state_invalid', {
            provider,
            requestId: req.requestId || ''
        });
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'invalid_state']
            ])
        );
    }

    const issuedAtMs = Number(decodedState.issuedAt || 0);
    if (!Number.isFinite(issuedAtMs) || issuedAtMs <= 0 || (Date.now() - issuedAtMs) > OAUTH_STATE_TTL_MS) {
        logSecurityEvent('oauth_state_expired', {
            provider,
            requestId: req.requestId || ''
        });
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'state_expired']
            ])
        );
    }

    if (decodedState.provider !== provider) {
        logSecurityEvent('oauth_state_provider_mismatch', {
            provider,
            expected: decodedState.provider,
            requestId: req.requestId || ''
        });
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'provider_mismatch']
            ])
        );
    }

    if (!providerCode) {
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'missing_code']
            ])
        );
    }

    try {
        const profile = await exchangeOAuthCodeForProfile(provider, providerCode, providerStatus.redirectUri);
        const user = await resolveOAuthUser(profile);
        await createSession(res, req, user.id);
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'success'],
                ['oauth_provider', provider]
            ])
        );
    } catch (error) {
        logSecurityEvent('oauth_callback_failed', {
            provider,
            requestId: req.requestId || '',
            reason: safeString(error?.message || String(error || 'oauth error'))
        });
        return res.redirect(
            appendOAuthResultToPath(returnTo, [
                ['oauth', 'error'],
                ['oauth_provider', provider],
                ['oauth_error', 'authentication_failed']
            ])
        );
    }
});

app.post('/api/auth/signup', assertSameOrigin, async (req, res) => {
    const email = safeString(req.body?.email).toLowerCase();
    const username = safeString(req.body?.username);
    const password = String(req.body?.password || '');
    const confirmPassword = String(req.body?.confirmPassword || '');
    const throttleKey = buildAuthThrottleKey(`${email}|${username}`, req);

    try {
        await assertAuthThrottleAllowed(throttleKey);
    } catch (error) {
        if (error?.statusCode === 429) {
            if (error.retryAfterSeconds) {
                res.setHeader('Retry-After', String(error.retryAfterSeconds));
            }
            return res.status(429).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Sign up temporarily unavailable.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'A valid email is required for sign up.' });
    }
    if (!isValidUsername(username)) {
        return res.status(400).json({ error: 'Username must be 3-32 chars and can include . _ -' });
    }
    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
        return res.status(400).json({
            error: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`
        });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        const passwordHash = await hashPassword(password);
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
        await clearAuthThrottle(throttleKey);

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
            const throttleState = await recordAuthFailure(throttleKey).catch(() => ({ blocked: false, retryAfterSeconds: 0 }));
            if (throttleState.blocked) {
                res.setHeader('Retry-After', String(throttleState.retryAfterSeconds));
            }
            return res.status(409).json({ error: 'An account with that email or username already exists.' });
        }
        return res.status(500).json({ error: 'Failed to create account.' });
    }
});

app.post('/api/auth/login', assertSameOrigin, async (req, res) => {
    const identity = normalizeEmailOrUsername(req.body?.email).toLowerCase();
    const password = String(req.body?.password || '');
    const throttleKey = buildAuthThrottleKey(identity, req);

    try {
        await assertAuthThrottleAllowed(throttleKey);
    } catch (error) {
        if (error?.statusCode === 429) {
            if (error.retryAfterSeconds) {
                res.setHeader('Retry-After', String(error.retryAfterSeconds));
            }
            return res.status(429).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Login temporarily unavailable.' });
    }

    if (!identity || !password) {
        return res.status(400).json({ error: 'Email/username and password are required.' });
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
        return res.status(401).json({ error: 'Invalid credentials.' });
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
        const isPasswordValid = user ? await verifyPassword(password, user.password_hash) : false;
        if (!user || !isPasswordValid) {
            const throttleState = await recordAuthFailure(throttleKey).catch(() => ({ blocked: false, retryAfterSeconds: 0 }));
            if (throttleState.blocked) {
                res.setHeader('Retry-After', String(throttleState.retryAfterSeconds));
            }
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        await query('UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [user.id]);
        const csrfToken = await createSession(res, req, user.id);
        await clearAuthThrottle(throttleKey);

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
    const requestedEmail = normalizeEmail(profile.email || '');
    const goal = safeString(profile.goal || req.auth.user.goal || 'exploring') || 'exploring';

    if (username && !isValidUsername(username)) {
        return res.status(400).json({ error: 'Invalid username format.' });
    }
    if (requestedEmail && !isValidEmail(requestedEmail)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        let savedProfile = null;
        await withTransaction(async (client) => {
            const userResult = await client.query(
                'SELECT email FROM users WHERE id = $1 FOR UPDATE',
                [req.auth.userId]
            );
            const userRow = userResult.rows[0];
            if (!userRow) {
                throw createHttpError(404, 'Authenticated user account was not found.');
            }

            const currentEmail = normalizeEmail(userRow.email || req.auth.user.email);
            if (requestedEmail && requestedEmail !== currentEmail) {
                throw createHttpError(400, 'Use secure email verification (PIN) to change email.');
            }

            if (username) {
                await client.query('UPDATE users SET username = $2, updated_at = NOW() WHERE id = $1', [req.auth.userId, username]);
            }
            const upserted = await client.query(
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
                RETURNING username, name, email, goal
                `,
                [req.auth.userId, username || null, name || null, currentEmail || null, goal]
            );

            const stored = upserted.rows[0] || {};
            const resolvedUsername = safeString(stored.username || stored.name || username || req.auth.user.username);
            savedProfile = {
                userId: req.auth.userId,
                username: resolvedUsername,
                name: safeString(stored.name || resolvedUsername),
                email: normalizeEmail(stored.email || currentEmail),
                goal: safeString(stored.goal || goal) || 'exploring'
            };
        });

        return res.json({ ok: true, profile: savedProfile });
    } catch (error) {
        if (error?.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        if (error?.code === '23505') {
            return res.status(409).json({ error: 'That username is already in use.' });
        }
        return res.status(500).json({ error: 'Failed to save profile.' });
    }
});

app.post('/api/profile/password', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    const currentPassword = String(req.body?.currentPassword || '');
    const newPassword = String(req.body?.newPassword || '');
    const confirmPassword = String(req.body?.confirmPassword || '');
    const currentSessionToken = safeString(req.cookies?.[SESSION_COOKIE_NAME]);
    const currentSessionTokenHash = currentSessionToken ? hashSessionToken(currentSessionToken) : '';

    if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required.' });
    }
    if (currentPassword.length > PASSWORD_MAX_LENGTH) {
        return res.status(400).json({ error: 'Current password is invalid.' });
    }
    if (newPassword.length < PASSWORD_MIN_LENGTH || newPassword.length > PASSWORD_MAX_LENGTH) {
        return res.status(400).json({
            error: `New password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`
        });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New password confirmation does not match.' });
    }
    if (currentPassword === newPassword) {
        return res.status(400).json({ error: 'New password must be different from your current password.' });
    }

    try {
        await withTransaction(async (client) => {
            const found = await client.query(
                'SELECT password_hash FROM users WHERE id = $1 LIMIT 1',
                [req.auth.userId]
            );
            const row = found.rows[0];
            const isPasswordValid = row ? await verifyPassword(currentPassword, row.password_hash) : false;
            if (!row || !isPasswordValid) {
                throw createHttpError(401, 'Current password is incorrect.');
            }

            await client.query(
                'UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1',
                [req.auth.userId, await hashPassword(newPassword)]
            );

            if (currentSessionTokenHash) {
                await client.query(
                    'DELETE FROM user_sessions WHERE user_id = $1 AND token_hash <> $2',
                    [req.auth.userId, currentSessionTokenHash]
                );
            } else {
                await client.query('DELETE FROM user_sessions WHERE user_id = $1', [req.auth.userId]);
            }
        });

        return res.json({ ok: true, message: 'Password updated successfully.' });
    } catch (error) {
        if (error?.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to update password.' });
    }
});

app.post('/api/profile/delete-account', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    const currentPassword = String(req.body?.currentPassword || '');
    const confirmation = safeString(req.body?.confirmation).toUpperCase();

    if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required.' });
    }
    if (currentPassword.length > PASSWORD_MAX_LENGTH) {
        return res.status(400).json({ error: 'Current password is invalid.' });
    }
    if (confirmation !== 'DELETE') {
        return res.status(400).json({ error: 'Type DELETE to confirm account deletion.' });
    }

    try {
        await withTransaction(async (client) => {
            const found = await client.query(
                'SELECT password_hash FROM users WHERE id = $1 LIMIT 1 FOR UPDATE',
                [req.auth.userId]
            );
            const row = found.rows[0];
            const isPasswordValid = row ? await verifyPassword(currentPassword, row.password_hash) : false;
            if (!row || !isPasswordValid) {
                throw createHttpError(401, 'Current password is incorrect.');
            }

            await client.query('DELETE FROM users WHERE id = $1', [req.auth.userId]);
        });

        await clearSession(req, res);
        return res.json({ ok: true, message: 'Account deleted permanently.' });
    } catch (error) {
        if (error?.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to delete account.' });
    }
});

app.post('/api/profile/email/request-pin', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    const newEmail = normalizeEmail(req.body?.newEmail);
    if (!isValidEmail(newEmail)) {
        return res.status(400).json({ error: 'A valid email is required.' });
    }

    const pin = generateNumericPin(6);
    const pinHash = hashEmailPinCode(req.auth.userId, newEmail, pin);
    const expiresAt = new Date(Date.now() + EMAIL_PIN_EXPIRY_MINUTES * 60 * 1000).toISOString();

    try {
        await withTransaction(async (client) => {
            const userResult = await client.query(
                'SELECT email FROM users WHERE id = $1 FOR UPDATE',
                [req.auth.userId]
            );
            const userRow = userResult.rows[0];
            if (!userRow) {
                throw createHttpError(404, 'Authenticated user account was not found.');
            }

            const currentEmail = normalizeEmail(userRow.email);
            if (newEmail === currentEmail) {
                throw createHttpError(400, 'Use a different email from your current one.');
            }

            const conflict = await client.query(
                'SELECT 1 FROM users WHERE LOWER(email) = $1 AND id <> $2 LIMIT 1',
                [newEmail, req.auth.userId]
            );
            if (conflict.rows[0]) {
                throw createHttpError(409, 'That email is already in use by another account.');
            }

            await client.query(
                'DELETE FROM email_change_verifications WHERE user_id = $1 AND consumed_at IS NULL',
                [req.auth.userId]
            );

            await client.query(
                `
                INSERT INTO email_change_verifications
                    (user_id, new_email, pin_hash, attempts, max_attempts, expires_at)
                VALUES ($1, $2, $3, 0, $4, $5)
                `,
                [req.auth.userId, newEmail, pinHash, EMAIL_PIN_MAX_ATTEMPTS, expiresAt]
            );
        });

        const delivery = await deliverEmailVerificationPin({
            toEmail: newEmail,
            pin,
            userId: req.auth.userId
        });
        if (!delivery.delivered) {
            await query(
                'DELETE FROM email_change_verifications WHERE user_id = $1 AND new_email = $2 AND consumed_at IS NULL',
                [req.auth.userId, newEmail]
            );
            return res.status(503).json({
                error: delivery.reason || 'Unable to deliver email verification PIN.'
            });
        }

        const response = {
            ok: true,
            message: `Verification PIN sent to ${newEmail}.`,
            expiresInMinutes: EMAIL_PIN_EXPIRY_MINUTES
        };
        if (EMAIL_PIN_DEBUG_RESPONSE) {
            response.devPin = pin;
        }
        return res.json(response);
    } catch (error) {
        if (error?.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to start email verification.' });
    }
});

app.post('/api/profile/email/verify-pin', assertSameOrigin, requireAuth, requireCsrf, async (req, res) => {
    const newEmail = normalizeEmail(req.body?.newEmail);
    const pin = safeString(req.body?.pin);

    if (!isValidEmail(newEmail)) {
        return res.status(400).json({ error: 'A valid email is required.' });
    }
    if (!/^\d{6}$/.test(pin)) {
        return res.status(400).json({ error: 'PIN must be a 6-digit code.' });
    }

    try {
        let profilePayload = null;
        await withTransaction(async (client) => {
            const verificationResult = await client.query(
                `
                SELECT id, new_email, pin_hash, attempts, max_attempts, expires_at
                FROM email_change_verifications
                WHERE user_id = $1
                  AND LOWER(new_email) = $2
                  AND consumed_at IS NULL
                ORDER BY created_at DESC
                LIMIT 1
                FOR UPDATE
                `,
                [req.auth.userId, newEmail]
            );
            const verification = verificationResult.rows[0];
            if (!verification) {
                throw createHttpError(400, 'No active PIN request was found for this email.');
            }

            const maxAttempts = Number(verification.max_attempts || EMAIL_PIN_MAX_ATTEMPTS);
            const attempts = Number(verification.attempts || 0);
            if (new Date(verification.expires_at).getTime() <= Date.now()) {
                await client.query(
                    'UPDATE email_change_verifications SET consumed_at = NOW(), updated_at = NOW() WHERE id = $1',
                    [verification.id]
                );
                throw createHttpError(400, 'PIN has expired. Request a new code.');
            }
            if (attempts >= maxAttempts) {
                await client.query(
                    'UPDATE email_change_verifications SET consumed_at = NOW(), updated_at = NOW() WHERE id = $1',
                    [verification.id]
                );
                throw createHttpError(429, 'PIN attempt limit reached. Request a new code.');
            }

            const expectedPinHash = hashEmailPinCode(req.auth.userId, newEmail, pin);
            if (!safeTokenCompare(verification.pin_hash, expectedPinHash)) {
                const nextAttempts = attempts + 1;
                const reachedLimit = nextAttempts >= maxAttempts;
                await client.query(
                    `
                    UPDATE email_change_verifications
                    SET
                        attempts = $2,
                        updated_at = NOW(),
                        consumed_at = CASE WHEN $3 THEN NOW() ELSE consumed_at END
                    WHERE id = $1
                    `,
                    [verification.id, nextAttempts, reachedLimit]
                );
                if (reachedLimit) {
                    throw createHttpError(429, 'PIN attempt limit reached. Request a new code.');
                }
                throw createHttpError(401, `Invalid PIN. ${maxAttempts - nextAttempts} attempt(s) remaining.`);
            }

            const conflict = await client.query(
                'SELECT 1 FROM users WHERE LOWER(email) = $1 AND id <> $2 LIMIT 1',
                [newEmail, req.auth.userId]
            );
            if (conflict.rows[0]) {
                throw createHttpError(409, 'That email is already in use by another account.');
            }

            await client.query(
                'UPDATE users SET email = $2, updated_at = NOW() WHERE id = $1',
                [req.auth.userId, newEmail]
            );

            const profileFound = await client.query(
                `
                SELECT username, name, goal
                FROM user_profiles
                WHERE user_id = $1
                LIMIT 1
                `,
                [req.auth.userId]
            );

            if (profileFound.rows[0]) {
                await client.query(
                    'UPDATE user_profiles SET email = $2, updated_at = NOW() WHERE user_id = $1',
                    [req.auth.userId, newEmail]
                );
                const row = profileFound.rows[0];
                const resolvedUsername = safeString(row.username || row.name || req.auth.user.username);
                profilePayload = {
                    userId: req.auth.userId,
                    username: resolvedUsername,
                    name: safeString(row.name || resolvedUsername),
                    email: newEmail,
                    goal: safeString(row.goal || req.auth.user.goal || 'exploring') || 'exploring'
                };
            } else {
                const fallbackUsername = safeString(req.auth.user.username);
                const fallbackName = safeString(req.auth.user.name || fallbackUsername);
                const fallbackGoal = safeString(req.auth.user.goal || 'exploring') || 'exploring';
                const inserted = await client.query(
                    `
                    INSERT INTO user_profiles (user_id, username, name, email, goal)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING username, name, email, goal
                    `,
                    [req.auth.userId, fallbackUsername || null, fallbackName || null, newEmail, fallbackGoal]
                );
                const row = inserted.rows[0];
                const resolvedUsername = safeString(row.username || row.name || fallbackUsername);
                profilePayload = {
                    userId: req.auth.userId,
                    username: resolvedUsername,
                    name: safeString(row.name || resolvedUsername),
                    email: normalizeEmail(row.email || newEmail),
                    goal: safeString(row.goal || fallbackGoal) || 'exploring'
                };
            }

            await client.query(
                'UPDATE email_change_verifications SET consumed_at = NOW(), updated_at = NOW() WHERE user_id = $1 AND consumed_at IS NULL',
                [req.auth.userId]
            );
        });

        return res.json({
            ok: true,
            profile: profilePayload
        });
    } catch (error) {
        if (error?.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to verify PIN.' });
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
        logSecurityEvent('support_csrf_mismatch', {
            path: req.path,
            requestId: req.requestId || ''
        });
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
    if (message.length > SUPPORT_MAX_MESSAGE_LENGTH) {
        return res.status(413).json({ error: 'Support message is too long.' });
    }
    if (moduleId && moduleId.length > SUPPORT_MAX_FIELD_LENGTH) {
        return res.status(400).json({ error: 'Module identifier is too long.' });
    }
    if (topic && topic.length > SUPPORT_MAX_FIELD_LENGTH) {
        return res.status(400).json({ error: 'Topic is too long.' });
    }
    if (!/^[a-z]{2}(?:-[a-z]{2})?$/i.test(language)) {
        return res.status(400).json({ error: 'Language must be an IETF language tag (e.g., en or es-MX).' });
    }
    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Email format is invalid.' });
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

function sendBookFile(req, res, dispositionType) {
    const book = getBookById(req.params.bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    const absolutePath = resolveBookFilePath(book);
    if (!absolutePath || !fs.existsSync(absolutePath)) {
        return res.status(404).json({ error: 'Book file is not available on this server.' });
    }

    const fileName = path.basename(absolutePath).replace(/"/g, '');
    res.setHeader('Content-Disposition', `${dispositionType}; filename="${fileName}"`);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

    return res.sendFile(absolutePath, (error) => {
        if (error && !res.headersSent) {
            res.status(error.statusCode || 500).json({ error: 'Unable to stream book file.' });
        }
    });
}

app.get('/api/books', (_req, res) => {
    return res.json({
        ok: true,
        books: BOOK_LIBRARY.map(toBookClientModel)
    });
});

app.get('/api/books/:bookId/read', (req, res) => {
    return sendBookFile(req, res, 'inline');
});

app.get('/api/books/:bookId/download', (req, res) => {
    return sendBookFile(req, res, 'attachment');
});

app.use('/api', (_req, res) => {
    return res.status(404).json({ error: 'API endpoint not found.' });
});

app.use((req, res, next) => {
    if (isBlockedStaticPath(req.path)) {
        logSecurityEvent('blocked_static_internal_path', {
            path: req.path,
            requestId: req.requestId || ''
        });
        return res.status(404).send('Not found.');
    }
    return next();
});

app.use(express.static(siteRoot));

app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found.' });
    }
    return res.sendFile(path.join(siteRoot, 'index.html'));
});

app.use((error, req, res, next) => {
    if (error?.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Request payload too large.' });
    }
    if (error instanceof SyntaxError && Object.prototype.hasOwnProperty.call(error, 'body')) {
        return res.status(400).json({ error: 'Invalid JSON payload.' });
    }
    return next(error);
});

app.use((error, req, res, _next) => {
    console.error('Unhandled request error:', error);
    if (res.headersSent) {
        return;
    }
    if (req.path.startsWith('/api/')) {
        return res.status(500).json({ error: 'Unexpected server error.' });
    }
    return res.status(500).send('Unexpected server error.');
});

logSecurityConfigurationWarnings();

const server = app.listen(PORT, () => {
    console.log(`CS Course Atlas server running on http://localhost:${PORT}`);
});

server.requestTimeout = SERVER_REQUEST_TIMEOUT_MS;
server.headersTimeout = SERVER_HEADERS_TIMEOUT_MS;
server.keepAliveTimeout = SERVER_KEEP_ALIVE_TIMEOUT_MS;
const securityCleanupTimer = scheduleSecurityCleanupTask();
runSecurityCleanup().catch((error) => {
    logSecurityEvent('cleanup_failure', {
        message: safeString(error?.message || String(error || 'cleanup error')),
        source: 'startup_cleanup'
    });
});

let isShuttingDown = false;

async function shutdown(signal) {
    if (isShuttingDown) {
        return;
    }
    isShuttingDown = true;

    console.log(`${signal} received. Shutting down server...`);
    const forceExitTimer = setTimeout(() => {
        console.error('Shutdown timeout reached. Exiting forcefully.');
        process.exit(1);
    }, 10_000);
    forceExitTimer.unref();

    try {
        await new Promise((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
        });
        clearInterval(securityCleanupTimer);
        await closeDb();
        clearTimeout(forceExitTimer);
        process.exit(0);
    } catch (error) {
        clearTimeout(forceExitTimer);
        console.error('Graceful shutdown failed:', error);
        process.exit(1);
    }
}

process.on('SIGINT', () => {
    void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
});
