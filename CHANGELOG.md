# Changelog

All notable changes to **CS Course Atlas** are documented in this file.

## 2026-03-12

### Mobile Auth Reliability
- Hardened auth fetch behavior by defaulting Neon API requests to `cache: no-store` (unless explicitly overridden) to reduce stale session reads on mobile browsers.
- Added race-safe session state updates so older in-flight session checks cannot overwrite newer auth state.
- Added session recheck retry logic for login/OAuth/modal-open initialization paths to stabilize cross-site cookie/session propagation timing on mobile.

### Sidebar Route Tool Launch
- Updated left-sidebar route navigation for `/flashcards` and `/quizzes` to auto-launch their tools immediately, removing the extra "open" click step.
- Preserved top-menu behavior (header buttons still open the same modal overlays directly).
- Added route-launch safeguards so direct quiz-open flows (global search and guest sample quiz) can still open module-specific quizzes without interference.
- Updated EN/ES route copy to clarify that sidebar pages open these tools automatically.

### API Security Hardening
- Added API request-surface guards to block risky HTTP methods (`TRACE`/`TRACK`/`CONNECT`), overlong request URIs, and oversized header values.
- Added null-byte payload rejection for mutating JSON requests.
- Hardened login identifier validation with strict length/format checks before database lookup.
- Added rate-limiter key-cap safeguards to reduce memory-pressure risk during high-cardinality IP abuse bursts.
- Added user-agent truncation when storing session metadata to prevent oversized header persistence abuse.

### Module Topics UX
- Updated module cards so `Topics Covered` shows the first 3 topics by default.
- Added per-module `Show all topics` / `Show fewer topics` toggle controls.
- Persisted topic expansion state in local storage, synced user-state snapshots, and progress export/import metadata.

### Detailed Topic Examples UX
- Updated module detailed topic code examples to show the first 4 items by default.
- Added per-module expand/collapse control directly under the visible example list to reveal or hide the remaining detailed examples.
- Persisted detailed-example-list expansion state in local storage, synced user-state snapshots, and progress export/import metadata.

### Books Library Reliability
- Updated backend book resolution to support prioritized path candidates for the Liang Java PDF (env path + fallback list + local defaults).
- Added support for `LIANG_JAVA_BOOK_PATHS` (comma/semicolon/newline-separated) for flexible multi-path server deployment.
- Added safer file-existence checks and candidate-based filename resolution for `/api/books`, read, and download flows.

### Accessibility
- Added a skip link for keyboard users and a persistent screen-reader announcer.
- Converted the primary content wrapper to a semantic `<main>` landmark.
- Fixed Quick Guide accessible naming mismatch so visible label and accessible name align.
- Added/expanded live-region announcements for dynamic status areas (progress, achievements, insights, DS status, playground status).

### Forms and Controls
- Added explicit ARIA labeling for glossary search.
- Upgraded settings toggle controls with switch semantics (`role="switch"`, `aria-checked`).
- Synced language toggle state with `aria-pressed` for EN/ES controls.
- Improved toast messaging accessibility with status/alert semantics and SR announcements.

### Validation
- Ran frontend syntax check: `npm run check:frontend` (pass).
- Ran Lighthouse accessibility audit and reached score **100** with zero failing audits.

### Search
- Added a new global search input in the learning-path panel with grouped results across:
  - terms
  - modules
  - quizzes
  - flashcards
  - notes (including personal draft)
  - playground topics (DS topics + code snippet samples)
- Implemented keyboard navigation for global search results (up/down, enter, escape) with combobox/listbox ARIA wiring.
- Wired each result type to the right destination action:
  - modules focus the target card in its track
  - terms open glossary with the searched term
  - quizzes open module quiz flows
  - flashcards open and select the matched deck
  - notes route to notes and highlight the target
  - playground topics route to playground and load the selected topic/snippet
- Added dedicated global-search styling for desktop/mobile and preserved existing module-only filter search below it.

### Public Roadmap
- Added a visible roadmap section on the interactive home view with three clear statuses: live now, in progress, and planned next.
- Added the same roadmap framing to the standalone crawlable home.html page so public visitors see intentional progress before logging in.
- Added roadmap localization keys for both English and Spanish.

### Upcoming Tracks
- Expanded the `Coming Soon Tracks` panel to include:
  - Operating Systems
  - Computer Networks
  - Advanced Algorithms
  - Programming Languages
  - Software Engineering
  - Computer Architecture
  - Cybersecurity
- Added EN/ES localization keys and subtitles for all new upcoming tracks.
- Updated homepage metadata summary to reflect the expanded upcoming-track lineup.

### Security Hardening
- Fixed static file exposure of internal project paths by blocking direct public access to:
  - `/server`
  - `/scripts`
  - `/node_modules`
  - repository/meta file targets such as `package.json`
- Added path normalization checks before static serving to reduce encoded-path bypass attempts.
- Hardened email PIN behavior for production:
  - forced `EMAIL_PIN_DELIVERY_MODE=log` to `disabled` in production
  - blocked debug PIN response behavior in production
  - added a production warning event if log mode was requested
- Reduced health endpoint metadata leakage (`/api/health` now returns generic service status).
- Added a full audit report at `docs/reports/security_best_practices_report.md`.
### Navigation and UX Fixes
- Fixed the pseudocode mode badge/icon in module controls (`📝`).
- Removed the injected `"Program finished."` line from Java wrapper execution output.
- Added a bottom-left page jump button that flips between down/up behavior based on scroll position and jumps to bottom/top.
- Added safe visibility handling for the page jump button during modal overlays.
- Fixed mobile sidebar alignment so it no longer jumps upward when the header compacts.

### Guest Insights and Account Gating
- Enabled guest study-plan personalization in preview mode (without forced login prompt).
- Updated guest insights CTA copy to clarify preview behavior.
- Added authenticated-only notification persistence for module completion + achievement unlock events.
- Added explicit privacy/support messaging: personalized profile and achievement-notification persistence is account-only.

### Guest Insights UX Patch
- Fixed guest-mode study-plan preview flow so personalization controls are reachable without login:
  - added dedicated guest preview button in the insights lock card
  - bound guest preview button to open the study-plan modal directly
- Updated guest insights summary rendering to reflect selected preview plan choices (pace/focus/style) instead of always showing static defaults.
- Kept account-only sync behavior unchanged while improving immediate feedback for guest selections.

### Learning Content Expansion
- Expanded the `Introduction to Coding` module with deeper topics, richer explanation flow, and additional beginner resources.
- Added new modules for current tracks:
  - `git-branching-merging`
  - `java-memory-jvm`
  - `discrete-graph-theory`
  - `assembly-addressing-modes`
  - `backtracking-patterns`
- Updated module sequencing/category maps (including discrete/assembly defaults) so new modules route and render correctly.

### Validation
- Frontend syntax check: `node --check js/script.js` (pass).
- Backend syntax checks: `node --check server/index.js`, `server/security.js`, `server/db.js` (pass).

### Refactor and Stability Sweep
- Refactored module code-example-set override merging to prioritize stable set IDs and prevent ID collisions when topic counts change.
- Fixed duplicate set-id and coverage regressions in `intro-to-coding` code example sets.
- Added missing quiz coverage for new modules:
  - `git-branching-merging`
  - `java-memory-jvm`
  - `discrete-graph-theory`
  - `assembly-addressing-modes`
  - `backtracking-patterns`
- Rebuilt Spanish localization with full module/quiz parity, including localized module `codeExamples` and preserved resource URL objects.
- Hardened localization generation for iCloud/workspace compatibility:
  - cache path fallback when root dotfile is not writable
  - serialized cache writes to prevent duplicate/conflict cache files
  - block-comment translation support
  - whitespace-tolerant literal translation lookup
  - C/C++ preprocessor directive guard (prevents `#include` corruption)
- Updated localization verifier function-boundary detection to remain stable with updated function signatures.
- Added ignore rules for localization cache artifacts:
  - `.translation-cache-es.json`
  - `scripts/translation-cache-es.cache*.json`
- Validation pass (all green):
  - `node scripts/verify_catalog_integrity.js`
  - `node scripts/verify_module_examples.js`
  - `node scripts/verify_localization.js`
  - `node scripts/verify_css_integrity.js`
  - `node scripts/verify_module_outputs.js`
  - `node scripts/verify_spanish_code_examples.js`

### Neon Public Access Hardening
- Added secure cross-origin API support for public frontend + separate API hosting:
  - explicit `ALLOWED_ORIGINS` allowlist
  - credentialed CORS headers with preflight handling on `/api/*`
  - origin trust evaluation shared across CORS and same-origin protections
  - fetch-metadata cross-site block now permits configured trusted origins
- Updated origin checks so authenticated mutating routes still enforce strict origin trust while allowing configured public frontend domains.
- Added production warnings for cross-origin cookie misconfiguration:
  - warns if `ALLOWED_ORIGINS` is set without `SESSION_COOKIE_SAME_SITE=none`
  - warns if `ALLOWED_ORIGINS` is set while `SESSION_COOKIE_SECURE=false`
- Added public runtime API config file: `js/app-config.js`.
- Added `csatlas-api-base-url` meta config fallback and loaded `js/app-config.js` before app boot.
- Updated docs and env template for Neon public deployment flow:
  - `.env.example` includes `ALLOWED_ORIGINS` guidance
  - `README.md` includes GitHub Pages + external Node API release path
  - `server/README.md` includes required cross-origin cookie/env settings

### Neon Diagnostics
- Added `npm run db:doctor` command (`scripts/neon-doctor.js`) to verify:
  - Neon connection handshake (version/database/role)
  - required schema table presence
  - basic user table query health
- Updated setup docs to include `db:doctor` immediately after migrations for faster production validation.

### Homepage Content Flow
- Repositioned the `Public Roadmap` section lower in the interactive home layout so onboarding and track discovery content stays first.
- Kept roadmap IDs/classes and localization hooks unchanged while moving its rendered placement.

### Auth Provider UI
- Replaced placeholder social login prefixes (`G`, `A`, `GH`) with proper provider icons for Google, Apple, and GitHub.
- Updated auth provider button markup and styling for consistent icon + label alignment across desktop/mobile.

### DB Connection Hardening
- Added strict `DATABASE_URL` validation in backend DB bootstrap:
  - protocol/host/database checks
  - placeholder URL rejection
  - `sslmode` and Neon `channel_binding` enforcement (strict in production)
- Added DB error-message sanitization to avoid leaking credentials in logs.
- Added safer transaction rollback error handling and idle pool error logging.
- Added matching secure URL validation to `scripts/neon-doctor.js`.
- Updated `.env.example`, root `README.md`, and `server/README.md` to document secure Neon URL requirements (`sslmode=require&channel_binding=require`).

### Auth and SQL Reliability
- Fixed local frontend-to-backend auth blocking when frontend runs on a different localhost port (for example `localhost:5500` -> `localhost:3000`) by allowing loopback-only dev origins in non-production.
- Kept hostile non-local origins blocked for mutating auth routes.
- Improved session cookie behavior in development:
  - secure cookies now remain enabled only when the incoming request is actually HTTPS
  - HTTP localhost development no longer receives unusable secure-only cookies
  - automatic SameSite fallback remains in place when `SESSION_COOKIE_SAME_SITE=none` is used without secure transport
- Added local API base auto-detection in frontend runtime:
  - when no API base is configured and app runs on localhost (non-3000 port), API calls now target `http://localhost:3000` (or `https://localhost:3000` when applicable).

### SEO Pages and Sitemap Refresh
- Restyled generated route pages (`home`, `tracks`, track pages, and tool landing pages) to better match the main site visual system with consistent gradient navigation, pill actions, and surface cards.
- Refreshed generated module pages and `modules/index.html` so directory/track navigation and CTA patterns are consistent across desktop/mobile.
- Added a human-readable sitemap page (`sitemap.html`) and linked route/module pages to it.
- Added XML sitemap styling via `sitemap.xsl` and connected it using the `<?xml-stylesheet ...?>` directive in `sitemap.xml`.
- Extended sitemap generation with `changefreq` and `priority` metadata and kept `robots.txt` pointed at the XML sitemap.

### Production Auth Cleanup
- Removed the offline demo/sample auth fallback (`example / example`) from the account flow.
- Removed the corresponding demo hint text from the account modal.
- Removed local demo-session bootstrap logic so auth state now comes only from real backend session checks.
- Connected the `Forgot password` action to a real support request flow by auto-opening/prefilling the Support form instead of showing a “coming soon” placeholder message.


### Account Deletion
- Added a secure account deletion endpoint: `POST /api/profile/delete-account`.
- Enforced authenticated same-origin + CSRF protection and current-password verification before deletion.
- Added permanent account deletion controls in Profile Settings with a required `DELETE` confirmation phrase and clear danger-state messaging.
- Wired frontend cleanup after deletion to clear local profile/auth/session state and return the modal to logged-out mode.
### Backend Hosting and Public Auth Wiring
- Added a Render Blueprint (`render.yaml`) for production API hosting as `cs-course-atlas-api` with Node runtime, health checks, and secure auth/session env defaults.
- Added OAuth secret placeholders in Blueprint (`GOOGLE_*`, `APPLE_*`, `GITHUB_*`) and generated `OAUTH_STATE_SECRET` support.
- Updated frontend runtime config (`js/app-config.js`) to target `https://cs-course-atlas-api.onrender.com` on public hosts (`eddyarriaga00.github.io`, `cscourseatlas.com`, `www.cscourseatlas.com`).
- Updated deployment docs (`README.md`, `server/README.md`) with direct Render Blueprint import URL and exact OAuth callback URLs.
### Repository Organization
- Kept `index.html` at the project root as requested.
- Moved root documentation files into `docs/`:
  - `docs/SEARCH_CONSOLE_SETUP.md`
  - `docs/reports/security_best_practices_report.md`
- Moved archived script snapshot into `backups/js/script.js.bak_interview_patch`.
- Added `docs/README.md` and a new `Project Layout` section in `README.md`.
- Updated GitHub Pages deploy workflow to exclude `docs/` and `backups/` from published site artifacts.

### Render Deploy Reliability
- Updated `render.yaml` so OAuth provider env vars default to `__disabled__`, allowing first deploy with only `DATABASE_URL`.
- Added OAuth placeholder normalization in backend env parsing so placeholder values are treated as not configured (provider remains disabled).
- Updated deployment docs (`README.md`, `server/README.md`) to separate required (`DATABASE_URL`) vs optional OAuth setup.

### Runtime Cleanup
- Removed deprecated `expires` usage from `res.clearCookie(...)` calls for session and OAuth-state cookie clearing.

### OAuth Provider Scope
- Removed Apple sign-in from the public auth UX for now:
  - removed Apple provider button from `index.html`
  - removed Apple provider mapping from frontend auth provider helpers
  - changed backend `SUPPORTED_OAUTH_PROVIDERS` to only `google` and `github` so `/api/auth/oauth/providers` no longer advertises Apple
- Removed Apple OAuth env entries from `render.yaml` and `.env.example`.
- Updated deployment docs (`README.md`, `server/README.md`) to document Google/GitHub-only OAuth setup.

### Auth Status Messaging
- Replaced `Guest mode active` account-status copy with a signed-out message that directs users to log in or create an account.
- Updated unauthenticated session-check status text from `Guest mode active.` to `Not signed in.`
- Updated insights lock status label from `Guest mode active` to `Preview mode active` (EN/ES).

### Motion Enhancements
- Added a progressive scroll-reveal animation system for key route sections, cards, launchpad actions, and module cards.
- Added route-aware animation refresh hooks so new route/module renders animate smoothly without removing existing UI.
- Added subtle ambient panel drift and CTA glow animations for core home/insights surfaces.
- Integrated reduced-motion safeguards so all new effects automatically disable when motion reduction is enabled.

### OAuth Redirect Fix
- Fixed Google OAuth post-login redirect behavior for split frontend/backend hosting:
  - frontend now sends an absolute `returnTo` URL during OAuth start
  - backend now safely accepts absolute callback return URLs only when origin is trusted via `ALLOWED_ORIGINS`
  - OAuth callback now redirects users back to the public frontend origin instead of the API host page

### Quiz Submission and Auth-Gated Progress
- Updated quiz practice last-question behavior to use an explicit `Submit Quiz` action before scoring.
- Added clearer final results copy showing `Overall percentage` in the completion view.
- Added full submit/results flow to the Interactive Quiz Library:
  - final-question `Submit Quiz` button
  - overall percentage summary on completion
  - per-question review with retake option
- Restricted quiz progress persistence to authenticated users only:
  - quiz completion/save now runs only when signed in
  - guest users still see scores but get a sign-in prompt toast instead of saved progress
- Added quiz stats to serialized user-state sync payload so saved signed-in quiz history can sync through Neon user-state endpoints.

### Intro Module Lecture Rewrite
- Rewrote `Introduction to Coding` base code examples into lecture-style walkthroughs with stronger data-flow framing (`Input -> Process -> Output`), workflow structure, and concrete execution steps.
- Expanded the module explanation text into a longer instructional format with:
  - learning outcomes
  - common beginner mistakes
  - workshop-style practice guidance
- Replaced the intro module example-set collection with focused lecture sets that include longer deep explanations and more readable Java teaching snippets:
  - input/process/output mental model
  - source-to-runtime pipeline
  - career-path and first-language strategy
  - environment setup + Git bootstrap
  - debugging loop practicum
  - 30-day execution plan
- Updated code-example normalization for `intro-to-coding` so:
  - curated override sets are used directly (instead of generated filler sets)
  - missing language mirrors are no longer auto-generated for intro sets (prevents low-quality mirrored snippets)
