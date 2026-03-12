# CS Course Atlas Neon Backend

This backend enables Neon SQL persistence for auth, profile, support requests, and full learning-state sync.

## Endpoints

- `GET /api/health`
- `GET /api/auth/session`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/profile`
- `POST /api/profile`
- `POST /api/profile/password`
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
```

Important for public cross-origin frontend (for example GitHub Pages -> API host):
- Set `ALLOWED_ORIGINS` to trusted frontend origins (comma-separated, include scheme).
- Set `SESSION_COOKIE_SAME_SITE=none`.
- Set `SESSION_COOKIE_SECURE=true`.

3. Run migration:

```bash
npm run db:migrate
```

4. Start server:

```bash
npm run start
```

The frontend and API are served from the same origin by this server.

If frontend and API are on different domains, point frontend runtime config to this API:
- Update `js/app-config.js` -> `window.__APP_CONFIG.apiBaseUrl = "https://<your-api-domain>"`.

## Security defaults

- Passwords are hashed using async Node `scrypt` with per-user random salt (prevents event-loop blocking under auth load).
- Sessions use random `httpOnly` cookies with configurable `SameSite` / `Secure` policy.
- Session tokens are stored hashed in SQL (SHA-256).
- Active sessions per user are capped (configurable) to reduce token sprawl.
- Authenticated mutating requests enforce same-origin + CSRF token checks.
- Sensitive auth/profile/user-state responses are marked `Cache-Control: no-store`.
- API and auth/support routes have in-memory rate limiting by IP.
- Login/signup also enforce persistent identity+IP lockout windows via SQL-backed throttling.
- Mutating API payloads are inspected for prototype-pollution keys and abusive JSON shapes (depth/key/array/string caps).
- Email changes use one-time 6-digit PIN verification with expiry + attempt limits.
- Optional host allowlist protection is available via `ALLOWED_HOSTS`.
- Optional Fetch Metadata enforcement blocks cross-site state-changing API requests.
- Optional strict JSON content-type enforcement on mutating API endpoints.
- Query parser is set to `simple` to avoid nested query object abuse.
- JSON body parser rejects malformed payloads and oversized requests.
- Security headers are set with `helmet`, and `X-Powered-By` is disabled.
- Extra hardening headers are set (`X-Frame-Options`, `X-Content-Type-Options`, `Cross-Origin-Opener-Policy`, `Permissions-Policy`).
- Database pool/query timeouts are explicitly configured to reduce slow-query/resource exhaustion risk.
- Server request/header/keep-alive timeouts are explicitly configured.
- Background cleanup jobs purge expired sessions, PIN requests, and stale throttle records.
- Graceful shutdown handles `SIGINT`/`SIGTERM` and closes the DB pool.
