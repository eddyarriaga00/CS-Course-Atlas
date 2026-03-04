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

3. Run migration:

```bash
npm run db:migrate
```

4. Start server:

```bash
npm run start
```

The frontend and API are served from the same origin by this server.

## Security defaults

- Passwords are hashed using Node `scrypt` with per-user random salt.
- Sessions use random httpOnly same-site cookies.
- Session tokens are stored hashed in SQL (SHA-256).
- Authenticated mutating requests enforce same-origin + CSRF token checks.
