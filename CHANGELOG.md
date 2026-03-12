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
