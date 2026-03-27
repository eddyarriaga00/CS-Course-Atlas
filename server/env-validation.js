'use strict';

const OPTIONAL_OAUTH_ENV_PLACEHOLDERS = new Set([
    '__disabled__',
    '__unset__',
    'disabled',
    'unset',
    'placeholder',
    'replace_me',
    'replace-me'
]);

function safeString(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function parseBooleanLike(value) {
    const normalized = safeString(value).toLowerCase();
    if (!normalized) return null;
    if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
    if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
    return null;
}

function readOptionalOAuthEnv(value) {
    const raw = safeString(value);
    if (!raw) return '';
    const normalized = raw.toLowerCase();
    if (OPTIONAL_OAUTH_ENV_PLACEHOLDERS.has(normalized)) {
        return '';
    }
    if (/^<[^>]+>$/.test(raw)) {
        return '';
    }
    return raw;
}

function splitCsv(value) {
    return safeString(value)
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
}

function validateInteger(name, value, { min = null, max = null, required = false } = {}) {
    const raw = safeString(value);
    if (!raw) {
        if (required) {
            return `${name} is required.`;
        }
        return '';
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
        return `${name} must be an integer.`;
    }
    if (min !== null && parsed < min) {
        return `${name} must be >= ${min}.`;
    }
    if (max !== null && parsed > max) {
        return `${name} must be <= ${max}.`;
    }
    return '';
}

function parseHttpUrl(rawValue) {
    const raw = safeString(rawValue);
    if (!raw) return null;
    try {
        const parsed = new URL(raw);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return null;
        }
        return parsed;
    } catch (_error) {
        return null;
    }
}

function validateAllowedOrigins(rawValue) {
    return splitCsv(rawValue)
        .map((entry) => ({ entry, parsed: parseHttpUrl(entry) }))
        .filter((item) => !item.parsed)
        .map((item) => item.entry);
}

function validateOAuthProvider(env, providerPrefix, isProduction) {
    const errors = [];
    const warnings = [];
    const clientId = readOptionalOAuthEnv(env[`${providerPrefix}_OAUTH_CLIENT_ID`]);
    const clientSecret = readOptionalOAuthEnv(env[`${providerPrefix}_OAUTH_CLIENT_SECRET`]);
    const redirectUri = readOptionalOAuthEnv(env[`${providerPrefix}_OAUTH_REDIRECT_URI`]);

    if (Boolean(clientId) !== Boolean(clientSecret)) {
        errors.push(`${providerPrefix}_OAUTH_CLIENT_ID and ${providerPrefix}_OAUTH_CLIENT_SECRET must both be set or both be empty.`);
    }

    if (redirectUri) {
        const parsedRedirect = parseHttpUrl(redirectUri);
        if (!parsedRedirect) {
            errors.push(`${providerPrefix}_OAUTH_REDIRECT_URI must be a valid http(s) URL.`);
        } else if (isProduction && parsedRedirect.protocol !== 'https:') {
            errors.push(`${providerPrefix}_OAUTH_REDIRECT_URI must use https in production.`);
        }
    } else if (clientId && clientSecret) {
        warnings.push(`${providerPrefix}_OAUTH_REDIRECT_URI is not set; callback will be inferred from request host.`);
    }

    return { errors, warnings };
}

function validateOAuthFallbackPath(rawValue, isProduction) {
    const raw = safeString(rawValue);
    if (!raw) {
        return 'OAUTH_POST_LOGIN_FALLBACK_PATH must not be empty.';
    }
    if (raw.startsWith('/')) {
        return '';
    }
    const parsed = parseHttpUrl(raw);
    if (!parsed) {
        return 'OAUTH_POST_LOGIN_FALLBACK_PATH must be an absolute http(s) URL or a relative path starting with "/".';
    }
    if (isProduction && parsed.protocol !== 'https:') {
        return 'OAUTH_POST_LOGIN_FALLBACK_PATH must use https in production when an absolute URL is provided.';
    }
    return '';
}

function validateServerEnvironment(options = {}) {
    const env = options.env || process.env;
    const isProduction = Boolean(options.isProduction);
    const derived = options.derived || {};
    const errors = [];
    const warnings = [];

    const requiredDatabaseUrl = safeString(env.DATABASE_URL);
    if (!requiredDatabaseUrl) {
        errors.push('DATABASE_URL is required.');
    }

    [
        validateInteger('PORT', env.PORT, { min: 1, max: 65535, required: false }),
        validateInteger('SESSION_TTL_DAYS', env.SESSION_TTL_DAYS, { min: 1, max: 365, required: false }),
        validateInteger('OAUTH_STATE_TTL_MS', env.OAUTH_STATE_TTL_MS, { min: 30_000, max: 60 * 60 * 1000, required: false }),
        validateInteger('SERVER_REQUEST_TIMEOUT_MS', env.SERVER_REQUEST_TIMEOUT_MS, { min: 1_000, max: 120_000, required: false }),
        validateInteger('SERVER_HEADERS_TIMEOUT_MS', env.SERVER_HEADERS_TIMEOUT_MS, { min: 1_000, max: 180_000, required: false }),
        validateInteger('SERVER_KEEP_ALIVE_TIMEOUT_MS', env.SERVER_KEEP_ALIVE_TIMEOUT_MS, { min: 1_000, max: 120_000, required: false })
    ].forEach((result) => {
        if (result) errors.push(result);
    });

    const sameSiteRaw = safeString(env.SESSION_COOKIE_SAME_SITE).toLowerCase();
    if (sameSiteRaw && !['strict', 'lax', 'none'].includes(sameSiteRaw)) {
        errors.push('SESSION_COOKIE_SAME_SITE must be one of: strict, lax, none.');
    }

    const secureRaw = safeString(env.SESSION_COOKIE_SECURE).toLowerCase();
    if (secureRaw && !['auto', '1', 'true', 'yes', 'on', '0', 'false', 'no', 'off'].includes(secureRaw)) {
        errors.push('SESSION_COOKIE_SECURE must be one of: auto, true, false.');
    }

    const deliveryModeRaw = safeString(env.EMAIL_PIN_DELIVERY_MODE).toLowerCase();
    if (deliveryModeRaw && !['log', 'disabled'].includes(deliveryModeRaw)) {
        errors.push('EMAIL_PIN_DELIVERY_MODE must be "log" or "disabled".');
    }
    if (isProduction && deliveryModeRaw === 'log') {
        warnings.push('EMAIL_PIN_DELIVERY_MODE=log is automatically downgraded to disabled in production.');
    }

    const oauthFallbackPathValue = safeString(derived.oauthPostLoginFallbackPath) || env.OAUTH_POST_LOGIN_FALLBACK_PATH;
    const fallbackPathError = validateOAuthFallbackPath(oauthFallbackPathValue, isProduction);
    if (fallbackPathError) {
        errors.push(fallbackPathError);
    }

    const invalidOrigins = validateAllowedOrigins(env.ALLOWED_ORIGINS);
    if (invalidOrigins.length) {
        errors.push(`ALLOWED_ORIGINS contains invalid origin(s): ${invalidOrigins.join(', ')}`);
    }

    const googleValidation = validateOAuthProvider(env, 'GOOGLE', isProduction);
    const githubValidation = validateOAuthProvider(env, 'GITHUB', isProduction);
    errors.push(...googleValidation.errors, ...githubValidation.errors);
    warnings.push(...googleValidation.warnings, ...githubValidation.warnings);

    if (isProduction) {
        if (derived.sessionCookieSecure !== true) {
            errors.push('SESSION_COOKIE_SECURE must resolve to true in production.');
        }
        if (!derived.oauthStateSecretConfigured) {
            errors.push('OAUTH_STATE_SECRET must be configured in production.');
        } else if (safeString(env.OAUTH_STATE_SECRET).length < 32) {
            errors.push('OAUTH_STATE_SECRET should be at least 32 characters in production.');
        }
        if (derived.allowedHostsCount === 0) {
            errors.push('ALLOWED_HOSTS must be configured in production.');
        }
        if (derived.allowedOriginsCount > 0 && derived.sessionCookieSameSite !== 'none') {
            errors.push('SESSION_COOKIE_SAME_SITE must resolve to "none" when ALLOWED_ORIGINS is set in production.');
        }
    } else if (safeString(env.OAUTH_STATE_SECRET).length > 0 && safeString(env.OAUTH_STATE_SECRET).length < 32) {
        warnings.push('OAUTH_STATE_SECRET is set but shorter than 32 characters.');
    }

    const sameSiteNoneRequiresSecure = derived.sessionCookieSameSite === 'none' && derived.sessionCookieSecure !== true;
    if (sameSiteNoneRequiresSecure) {
        errors.push('SESSION_COOKIE_SAME_SITE=none requires SESSION_COOKIE_SECURE=true.');
    }

    const strictBooleanChecks = [
        'REQUIRE_JSON_MUTATIONS',
        'ENFORCE_FETCH_METADATA',
        'EMAIL_PIN_DEBUG_RESPONSE'
    ];
    strictBooleanChecks.forEach((key) => {
        const raw = safeString(env[key]);
        if (!raw) return;
        if (parseBooleanLike(raw) === null) {
            errors.push(`${key} must be a boolean-like value (true/false).`);
        }
    });

    return {
        ok: errors.length === 0,
        errors,
        warnings
    };
}

module.exports = {
    validateServerEnvironment
};
