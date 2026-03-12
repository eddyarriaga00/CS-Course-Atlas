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
