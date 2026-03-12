# Security Best Practices Report

Date: 2026-03-12
Project: CS Course Atlas (`C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper`)

## Executive Summary

A focused pre-release security audit was completed across the Node/Express backend and browser frontend. One high-impact issue was confirmed and fixed: internal backend/source paths were publicly exposed through static hosting. Core API protections (rate limiting, CSRF checks, JSON mutation enforcement, and security headers) are functioning in runtime smoke tests.

Residual risks remain in frontend XSS hardening posture (CSP is disabled and the app currently relies on inline event handlers and `new Function`), plus supply-chain hardening for CDN scripts.

## Scope and Method

- Backend review: `server/index.js`, `server/security.js`, `server/db.js`
- Frontend review: `index.html`, `js/script.js`
- Dependency audit: `npm audit`
- Runtime smoke tests against a local server instance
- Security guidance baseline: Express + frontend JS best-practices references from `security-best-practices` skill

## Findings

### High

#### SEC-001 (Fixed): Internal source exposure via static file hosting

- Severity: High
- Location:
  - Previous exposure point: `server/index.js` static mount (`app.use(express.static(siteRoot))`)
  - Fix: [server/index.js:71](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:71), [server/index.js:402](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:402), [server/index.js:1638](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:1638)
- Evidence (before fix): `GET /server/index.js` returned `200`.
- Impact: Public users could download backend source and internal project files, increasing attacker reconnaissance surface.
- Fix applied: Added normalized path denylist middleware to block internal prefixes/files (`/server`, `/scripts`, `/node_modules`, `.git`, package manifests, etc.) before static serving.
- Verification after fix:
  - `GET /server/index.js` -> `404`
  - `GET /scripts/build-seo-pages.js` -> `404`
  - `GET /package.json` -> `404`

### Medium

#### SEC-002: CSP not enforced (current app design blocks strict CSP)

- Severity: Medium
- Location:
  - [server/index.js:102](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:102) (`contentSecurityPolicy: false`)
  - Representative inline handlers in [index.html:46](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\index.html:46)
  - Dynamic code execution in [js/script.js:16537](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\js\script.js:16537) (`new Function`)
- Impact: If DOM XSS is introduced, blast radius is higher without a strict CSP barrier.
- Recommended fix path:
  1. Replace inline `onclick`/inline handlers with delegated `addEventListener` wiring.
  2. Refactor playground JS execution to an isolated sandbox model (Web Worker/iframe sandbox).
  3. Enable strict CSP in `helmet` (avoid `unsafe-inline`/`unsafe-eval`).

#### SEC-003: Third-party scripts loaded without SRI

- Severity: Medium
- Location:
  - [index.html:1820](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\index.html:1820)
  - [index.html:1821](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\index.html:1821)
  - [index.html:1822](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\index.html:1822)
- Impact: CDN compromise or dependency tampering can inject malicious script.
- Recommended fix path:
  1. Self-host critical JS vendor bundles, or
  2. Add SRI hashes + pinned versions + `crossorigin` attributes.

#### SEC-004: Rate limiting is process-local in memory

- Severity: Medium
- Location: [server/index.js:410](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:410), [server/index.js:411](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:411)
- Impact: In multi-instance deployment, attackers can bypass limits by spreading requests across instances.
- Recommended fix path: Move global/auth/support rate limits to shared storage (Redis or DB-backed limiter) at app or edge layer.

### Low

#### SEC-005 (Fixed): Health endpoint reduced metadata leakage

- Severity: Low
- Location: [server/index.js:921](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:921)
- Fix applied: Removed explicit DB status string from successful health responses and standardized unavailable status to `503` with generic message.

#### SEC-006 (Fixed hardening): Prevent PIN leakage in production mode

- Severity: Low
- Location:
  - [server/index.js:61](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:61)
  - [server/index.js:67](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:67)
  - [server/index.js:741](C:\Users\Eddy\iCloudDrive\Coding\Java-DSA-Helper\server\index.js:741)
- Fix applied:
  - Forced `EMAIL_PIN_DELIVERY_MODE=log` to `disabled` in production.
  - Disabled `devPin` response behavior in production regardless of env toggle.
  - Added explicit production warning log event when `log` mode was requested.

## Automated and Runtime Checks

- `npm audit --omit=dev --json` -> 0 vulnerabilities
- `npm run check:frontend` -> pass
- `node --check server/index.js` -> pass
- Runtime smoke checks:
  - Internal static files blocked (`404`) for `/server/index.js`, `/scripts/build-seo-pages.js`, `/package.json`
  - Root app still serves (`/` -> `200`)
  - JSON mutation enforcement active (`POST /api/auth/login` with `text/plain` -> `415`)
  - Fetch metadata protection active (`Sec-Fetch-Site: cross-site` -> `403`)
  - Security headers present (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`)

## Priority Next Steps Before Public Launch

1. Eliminate inline event handlers and remove `new Function` execution path so strict CSP can be enabled.
2. Add SRI (or self-host) for all third-party script dependencies.
3. Move rate limiting to shared storage for horizontally scaled production.
4. Run an external DAST pass against the deployed public URL (OWASP ZAP/Burp active scan profile).
