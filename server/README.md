# CS Course Atlas Neon Backend

This backend enables Neon SQL persistence for auth, profile, support requests, and full learning-state sync.

## Endpoints

- `GET /api/health`
- `GET /api/auth/session`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/recover` (forgot password: a recovery code or an emailed 6-digit code, plus a new password)
- `POST /api/auth/recover/email` (email a 6-digit reset code to a confirmed address)
- `POST /api/auth/email/send-code`, `POST /api/auth/email/confirm` (confirm a new account's email)
- `GET /api/mail/setup?key=MAIL_SETUP_KEY` (site owner only: connect the Gmail account the site sends from)
- `GET /api/profile`
- `POST /api/profile`
- `POST /api/profile/password`
- `GET /api/profile/recovery-codes` (how many are left)
- `POST /api/profile/recovery-codes` (make a new set; needs the current password)
- `POST /api/profile/delete-account`
- `POST /api/profile/email/request-pin`
- `POST /api/profile/email/verify-pin`
- `GET /api/user-state`
- `PUT /api/user-state`
- `POST /api/support`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
# Fill DATABASE_URL with your Neon connection string
# Recommended: include sslmode=require&channel_binding=require
# Optional: set LIANG_JAVA_BOOK_PATH to your local/server PDF path
```

Important for public cross-origin frontend (for example GitHub Pages -> API host):
- Set `ALLOWED_ORIGINS` to trusted frontend origins (comma-separated, include scheme).
- Set `SESSION_COOKIE_SAME_SITE=none`.
- Set `SESSION_COOKIE_SECURE=true`.

3. Run migration:

```bash
npm run db:migrate
```

4. Verify Neon connection + required tables:

```bash
npm run db:doctor
```

5. Start server:

```bash
npm run start
```

The frontend and API are served from the same origin by this server.

If frontend and API are on different domains, point frontend runtime config to this API:
- Update `js/app-config.js` -> `window.__APP_CONFIG.apiBaseUrl = "https://<your-api-domain>"`.

## Render Hosting (Blueprint Included)

The service auto-deploys every commit to `main` (Render's GitHub app must have access to `eddyarriaga00/CS-Course-Atlas`). Migrations run on start (`npm run db:migrate && npm start`).

This repo includes a production `render.yaml` for API hosting as `cs-course-atlas-api`.

1. Open:
   - `https://render.com/deploy?repo=https://github.com/eddyarriaga00/CS-Course-Atlas`
2. Keep service name `cs-course-atlas-api` so frontend default runtime config works.
3. Fill required env vars in Render:
   - `DATABASE_URL`
   - `OAUTH_POST_LOGIN_FALLBACK_PATH=https://eddyarriaga00.github.io/CS-Course-Atlas/index.html`
4. Optional OAuth env vars (set when enabling provider login):
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
   - Blueprint defaults OAuth vars to `__disabled__` so initial deploy is not blocked.
5. Register provider callback URLs:
   - Google: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/google/callback`
   - GitHub: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/github/callback`

## Email

Render's free plan blocks SMTP ports, so mail goes through the Gmail API over HTTPS. Set `MAIL_TOKEN_KEY` (any long random string) and `MAIL_SETUP_KEY`, then open `/api/mail/setup?key=<MAIL_SETUP_KEY>` once and allow Google to send email on your behalf. The refresh token is stored encrypted (AES-256-GCM) in `app_secrets`, and a test email confirms it works. `SMTP_URL` works instead where SMTP is allowed; locally, `MAIL_LOG=1` prints emails to the console. Without any of these, email confirmation stays off and sign-up works as before.

## Security defaults

- Passwords are hashed using async Node `scrypt` with per-user random salt (prevents event-loop blocking under auth load).
- Sessions use random `httpOnly` cookies with configurable `SameSite` / `Secure` policy.
- Session tokens are stored hashed in SQL (SHA-256).
- Active sessions per user are capped (configurable) to reduce token sprawl.
- Authenticated mutating requests enforce same-origin + CSRF token checks.
- Sensitive auth/profile/user-state responses are marked `Cache-Control: no-store`.
- API and auth/support routes have in-memory rate limiting by IP.
- Login/signup also enforce persistent identity+IP lockout windows via SQL-backed throttling.
- A second SQL-backed lockout per IP address (40 failed sign-in, sign-up or reset attempts in 15 minutes blocks that address for 30 minutes; `AUTH_IP_*` env vars) survives restarts and stops one address guessing across many accounts.
- Dependency updates and security fixes arrive as weekly Dependabot pull requests (`.github/dependabot.yml`).
- Login identifier format/length checks reduce abuse and malformed-auth payload pressure before DB work.
- Mutating API payloads are inspected for prototype-pollution keys and abusive JSON shapes (depth/key/array/string caps).
- API request surface limits block oversized headers, overlong request targets, and risky HTTP methods (`TRACE`/`TRACK`/`CONNECT`).
- In-memory IP rate-limit maps now cap tracked key cardinality to reduce memory pressure during distributed abuse bursts.
- Forgotten passwords are reset with one-time recovery codes (8 per account, shown once at sign-up or when regenerated, stored only as SHA-256 hashes). No email provider is needed. A reset signs out every other session, and wrong codes count toward the same lockout as failed logins.
- Email changes use one-time 6-digit PIN verification with expiry + attempt limits.
- Optional host allowlist protection is available via `ALLOWED_HOSTS`.
- Optional Fetch Metadata enforcement blocks cross-site state-changing API requests.
- Optional strict JSON content-type enforcement on mutating API endpoints.
- Books library supports `LIANG_JAVA_BOOK_PATH` plus fallback list `LIANG_JAVA_BOOK_PATHS` for local/server-specific PDF locations.
- Query parser is set to `simple` to avoid nested query object abuse.
- JSON body parser rejects malformed payloads and oversized requests.
- Security headers are set with `helmet`, and `X-Powered-By` is disabled.
- Extra hardening headers are set (`X-Frame-Options`, `X-Content-Type-Options`, `Cross-Origin-Opener-Policy`, `Permissions-Policy`).
- Database pool/query timeouts are explicitly configured to reduce slow-query/resource exhaustion risk.
- Server request/header/keep-alive timeouts are explicitly configured.
- Background cleanup jobs purge expired sessions, PIN requests, and stale throttle records.
- Graceful shutdown handles `SIGINT`/`SIGTERM` and closes the DB pool.
