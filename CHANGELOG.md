# Changelog

All notable changes to **CS Course Atlas** are documented in this file.

## 2026-03-12

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
- Added a full audit report at `security_best_practices_report.md`.
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

