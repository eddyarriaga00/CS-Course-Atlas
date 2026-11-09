// Outgoing email (sign-up confirmation codes, email-change codes). Configured with
//   SMTP_URL   e.g. smtps://you%40gmail.com:app-password@smtp.gmail.com:465
//   MAIL_FROM  e.g. "CS Course Atlas <you@gmail.com>"   (defaults to the SMTP user)
// Without SMTP_URL, email is off and the site works exactly as before.
const nodemailer = require('nodemailer');

const SMTP_URL = String(process.env.SMTP_URL || '').trim();
let transport = null;
let fromAddress = '';
let status = { enabled: false, ready: false, error: '' };

if (SMTP_URL) {
    try {
        transport = nodemailer.createTransport(SMTP_URL, { pool: true, maxConnections: 2, connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000 });
        const user = decodeURIComponent(new URL(SMTP_URL).username || '');
        fromAddress = String(process.env.MAIL_FROM || '').trim() || (user ? `CS Course Atlas <${user}>` : '');
        status = { enabled: true, ready: false, error: '' };
    } catch (error) {
        status = { enabled: false, ready: false, error: 'SMTP_URL is not a valid URL.' };
    }
}

async function verifyMailer() {
    if (!transport) return status;
    try {
        await transport.verify();
        status = { enabled: true, ready: true, error: '' };
        console.info('[mail] SMTP connection ready');
    } catch (error) {
        status = { enabled: true, ready: false, error: String(error?.code || error?.message || 'error') };
        console.warn(`[mail] SMTP connection failed: ${String(error?.message || error).slice(0, 200)}`);
    }
    return status;
}

function mailEnabled() {
    return Boolean(transport);
}

async function sendMail({ to, subject, text, html }) {
    if (!transport) return { sent: false, reason: 'Email is not configured.' };
    try {
        await transport.sendMail({ from: fromAddress, to, subject, text, html });
        return { sent: true };
    } catch (error) {
        console.warn(`[mail] send failed: ${String(error?.message || error).slice(0, 200)}`);
        return { sent: false, reason: 'Email could not be sent right now.' };
    }
}

module.exports = { verifyMailer, mailEnabled, sendMail, mailStatus: () => status };
