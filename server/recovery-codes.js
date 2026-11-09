// One-time password recovery codes (no email needed).
// A code looks like "K7QM-3XRP-W9TD": 12 characters from a 31-character alphabet without
// look-alikes (no 0/O, 1/I/L), about 59 random bits each. Only SHA-256 hashes are stored.
const crypto = require('crypto');

const RECOVERY_CODE_COUNT = 8;
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// Rejection sampling keeps every character equally likely.
const BYTE_LIMIT = 256 - (256 % ALPHABET.length);

function randomGroup(length) {
    let out = '';
    while (out.length < length) {
        const byte = crypto.randomBytes(1)[0];
        if (byte < BYTE_LIMIT) out += ALPHABET[byte % ALPHABET.length];
    }
    return out;
}

function generateRecoveryCodes(count = RECOVERY_CODE_COUNT) {
    return Array.from({ length: count }, () => `${randomGroup(4)}-${randomGroup(4)}-${randomGroup(4)}`);
}

// People type codes with spaces, dashes or lower case; compare only the letters and digits.
function normalizeRecoveryCode(code) {
    return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 64);
}

function hashRecoveryCode(code) {
    return crypto.createHash('sha256').update(`atlas-recovery:${normalizeRecoveryCode(code)}`).digest('hex');
}

function findMatchingCode(code, rows) {
    const wanted = Buffer.from(hashRecoveryCode(code), 'hex');
    let match = null;
    for (const row of rows) {
        const have = Buffer.from(String(row.code_hash || ''), 'hex');
        // Check every row (no early exit) so timing does not reveal which one matched.
        if (have.length === wanted.length && crypto.timingSafeEqual(have, wanted) && !match) match = row;
    }
    return match;
}

module.exports = { RECOVERY_CODE_COUNT, generateRecoveryCodes, normalizeRecoveryCode, hashRecoveryCode, findMatchingCode };
