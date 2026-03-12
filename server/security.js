const crypto = require('crypto');
const { promisify } = require('util');

const SCRYPT_COST = 16384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const KEY_LENGTH = 64;
const EMAIL_MAX_LENGTH = 254;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 32;
const scryptAsync = promisify(crypto.scrypt);

function randomToken(size = 48) {
    return crypto.randomBytes(size).toString('base64url');
}

function hashSessionToken(token) {
    return crypto.createHash('sha256').update(String(token || ''), 'utf8').digest('hex');
}

async function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedBuffer = await scryptAsync(String(password), salt, KEY_LENGTH, {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION
    });
    const derived = Buffer.from(derivedBuffer).toString('hex');
    return `scrypt$${salt}$${derived}`;
}

async function verifyPassword(password, storedHash) {
    if (typeof storedHash !== 'string' || !storedHash.startsWith('scrypt$')) {
        return false;
    }
    const parts = storedHash.split('$');
    if (parts.length !== 3) return false;
    const [, salt, expected] = parts;
    const scryptResult = await scryptAsync(String(password), salt, KEY_LENGTH, {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION
    });
    const derived = Buffer.from(scryptResult).toString('hex');
    const expectedBuffer = Buffer.from(expected, 'hex');
    const derivedBuffer = Buffer.from(derived, 'hex');
    if (expectedBuffer.length !== derivedBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, derivedBuffer);
}

function normalizeEmailOrUsername(value) {
    return String(value || '').trim();
}

function isValidEmail(value) {
    const email = String(value || '').trim();
    if (!email || email.length > EMAIL_MAX_LENGTH) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(value) {
    const username = String(value || '').trim();
    if (!username) return false;
    if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) return false;
    return /^[a-zA-Z0-9._-]+$/.test(username);
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
