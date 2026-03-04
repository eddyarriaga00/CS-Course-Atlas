const crypto = require('crypto');

const SCRYPT_COST = 16384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const KEY_LENGTH = 64;

function randomToken(size = 48) {
    return crypto.randomBytes(size).toString('base64url');
}

function hashSessionToken(token) {
    return crypto.createHash('sha256').update(String(token || ''), 'utf8').digest('hex');
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derived = crypto.scryptSync(String(password), salt, KEY_LENGTH, {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION
    }).toString('hex');
    return `scrypt$${salt}$${derived}`;
}

function verifyPassword(password, storedHash) {
    if (typeof storedHash !== 'string' || !storedHash.startsWith('scrypt$')) {
        return false;
    }
    const parts = storedHash.split('$');
    if (parts.length !== 3) return false;
    const [, salt, expected] = parts;
    const derived = crypto.scryptSync(String(password), salt, KEY_LENGTH, {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION
    }).toString('hex');
    const expectedBuffer = Buffer.from(expected, 'hex');
    const derivedBuffer = Buffer.from(derived, 'hex');
    if (expectedBuffer.length !== derivedBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, derivedBuffer);
}

function normalizeEmailOrUsername(value) {
    return String(value || '').trim();
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function isValidUsername(value) {
    return /^[a-zA-Z0-9._-]{3,}$/.test(String(value || '').trim());
}

function hashIpAddress(ipAddress) {
    if (!ipAddress) return null;
    return crypto.createHash('sha256').update(String(ipAddress), 'utf8').digest('hex');
}

module.exports = {
    randomToken,
    hashSessionToken,
    hashPassword,
    verifyPassword,
    normalizeEmailOrUsername,
    isValidEmail,
    isValidUsername,
    hashIpAddress
};
