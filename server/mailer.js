// Outgoing email: sign-up confirmation codes, password-reset codes and email-change codes.
//
// Render's free plan blocks SMTP ports, so mail goes out through the Gmail API over HTTPS.
// The site owner connects their Gmail once (GET /api/mail/setup?key=MAIL_SETUP_KEY), which
// stores a Gmail refresh token encrypted in the app_secrets table (key: MAIL_TOKEN_KEY).
// SMTP_URL still works where SMTP is allowed (local development, paid hosting).
// With neither configured, email is off and the site works exactly as before.
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const MailComposer = require('nodemailer/lib/mail-composer');

const SMTP_URL = String(process.env.SMTP_URL || '').trim();
const TOKEN_KEY_RAW = String(process.env.MAIL_TOKEN_KEY || '').trim();
const GMAIL_SECRET_NAME = 'gmail_sender';
// Local development and tests: MAIL_LOG=1 prints emails instead of sending them (never in production).
const LOG_MODE = process.env.NODE_ENV !== 'production' && process.env.MAIL_LOG === '1';

let queryFn = null;
let googleClient = { id: '', secret: '' };
let gmail = null; // { email, refreshToken }
let accessToken = { value: '', expiresAt: 0 };
let smtp = null;

function tokenKey() {
    return TOKEN_KEY_RAW ? crypto.createHash('sha256').update(TOKEN_KEY_RAW).digest() : null;
}

function encrypt(text) {
    const key = tokenKey();
    if (!key) throw new Error('MAIL_TOKEN_KEY is not set.');
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const body = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return [iv, cipher.getAuthTag(), body].map((b) => b.toString('base64url')).join('.');
}

function decrypt(packed) {
    const key = tokenKey();
    if (!key) return '';
    const [iv, tag, body] = String(packed || '').split('.').map((p) => Buffer.from(p || '', 'base64url'));
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(body), decipher.final()]).toString('utf8');
}

async function initMailer({ query, googleClientId, googleClientSecret }) {
    queryFn = query;
    googleClient = { id: googleClientId || '', secret: googleClientSecret || '' };
    if (SMTP_URL) {
        try {
            smtp = nodemailer.createTransport(SMTP_URL, { connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000 });
        } catch (error) {
            console.warn('[mail] SMTP_URL is not a valid URL.');
        }
    }
    try {
        const result = await query('SELECT value FROM app_secrets WHERE name = $1', [GMAIL_SECRET_NAME]);
        if (result.rows[0]) {
            const saved = JSON.parse(decrypt(result.rows[0].value));
            if (saved?.refreshToken && saved?.email) gmail = saved;
        }
    } catch (error) {
        console.warn(`[mail] could not load the Gmail sender: ${String(error?.message || error).slice(0, 160)}`);
    }
    console.info(`[mail] ${LOG_MODE && !gmail ? 'printing emails to the log (MAIL_LOG=1)' : gmail ? `sending through the Gmail API as ${gmail.email}` : smtp ? 'sending through SMTP' : 'email is off (connect a sender at /api/mail/setup)'}`);
}

function mailEnabled() {
    return Boolean(gmail || smtp || LOG_MODE);
}

function canConnectGmail() {
    return Boolean(TOKEN_KEY_RAW && googleClient.id && googleClient.secret);
}

async function saveGmailSender({ email, refreshToken }) {
    await queryFn(
        `INSERT INTO app_secrets (name, value, updated_at) VALUES ($1, $2, NOW())
         ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [GMAIL_SECRET_NAME, encrypt(JSON.stringify({ email, refreshToken }))]
    );
    gmail = { email, refreshToken };
    accessToken = { value: '', expiresAt: 0 };
}

async function gmailAccessToken() {
    if (accessToken.value && accessToken.expiresAt > Date.now() + 60_000) return accessToken.value;
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: googleClient.id,
            client_secret: googleClient.secret,
            refresh_token: gmail.refreshToken,
            grant_type: 'refresh_token'
        }).toString(),
        signal: AbortSignal.timeout(12_000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token) throw new Error(`token refresh failed: ${data.error_description || data.error || response.status}`);
    accessToken = { value: data.access_token, expiresAt: Date.now() + Number(data.expires_in || 3000) * 1000 };
    return accessToken.value;
}

async function sendWithGmail({ to, subject, text, html }) {
    const raw = await new MailComposer({ from: `CS Course Atlas <${gmail.email}>`, to, subject, text, html }).compile().build();
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${await gmailAccessToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: raw.toString('base64url') }),
        signal: AbortSignal.timeout(15_000)
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data?.error?.message || `Gmail API returned ${response.status}`);
        error.details = data?.error;
        throw error;
    }
}

async function sendMail({ to, subject, text, html }) {
    try {
        if (LOG_MODE && !gmail) { console.info(`[mail:log] to=${to} subject=${subject}\n${text}`); return { sent: true }; }
        if (gmail) await sendWithGmail({ to, subject, text, html });
        else if (smtp) await smtp.sendMail({ from: process.env.MAIL_FROM || undefined, to, subject, text, html });
        else return { sent: false, reason: 'Email is not configured.' };
        return { sent: true };
    } catch (error) {
        console.warn(`[mail] send failed: ${String(error?.message || error).slice(0, 300)}`);
        return { sent: false, reason: 'Email could not be sent right now.', error: String(error?.message || error) };
    }
}

module.exports = { initMailer, mailEnabled, canConnectGmail, saveGmailSender, sendMail, senderEmail: () => gmail?.email || '' };
