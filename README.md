# CS Course Atlas

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://eddyarriaga00.github.io/CS-Course-Atlas/)
[![GitHub Stars](https://img.shields.io/github/stars/eddyarriaga00/CS-Course-Atlas?style=for-the-badge)](https://github.com/eddyarriaga00/CS-Course-Atlas/stargazers)
[![Website](https://img.shields.io/badge/Website-Public--Ready-green?style=for-the-badge)](https://eddyarriaga00.github.io/CS-Course-Atlas/)

A public CS learning website for students studying core computer science tracks.

## Mission
CS Course Atlas is built for computer science students who need one place to learn across multiple classes. It combines structured course tracks, guided explanations, code examples, quizzes, flashcards, and progress tools into one consistent learning experience.

## Quick Guide
Use one of these paths depending on what you need.

### 1) Preview the public website (recommended)
This runs the static site exactly like GitHub Pages behavior.

```bash
git clone https://github.com/eddyarriaga00/CS-Course-Atlas.git
cd CS-Course-Atlas
npm install
npm run build:css
py -m http.server 4173
```

Open: `http://127.0.0.1:4173/index.html`

### 2) Run full stack (API + auth/session features)
Use this if you are testing login/profile/state persistence.

```bash
npm install
copy .env.example .env
npm run db:migrate
npm run db:doctor
npm start
```

Required in `.env`:
- `DATABASE_URL` must point to your Postgres/Neon database and include `sslmode=require` (plus `channel_binding=require` for Neon).

Open: `http://127.0.0.1:3000`

Note for local development:
- If you run the frontend from another localhost port (for example `http://localhost:5500`), auth/API calls will automatically target `http://localhost:3000`.

### 2.5) Public auth with GitHub Pages + Neon API
GitHub Pages is static-only, so auth/session + SQL must run on a separate Node host.

1. Deploy backend using the included Render Blueprint:
   - `render.yaml` is already included in this repo.
   - One-click import URL:
   - `https://render.com/deploy?repo=https://github.com/eddyarriaga00/CS-Course-Atlas`
2. Keep Render web service name as `cs-course-atlas-api` (frontend is prewired to `https://cs-course-atlas-api.onrender.com` in `js/app-config.js`).
3. Fill required Render env vars marked `sync: false`:
   - `DATABASE_URL` (Neon production connection string with `sslmode=require&channel_binding=require`)
   - `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`
   - `APPLE_OAUTH_CLIENT_ID`, `APPLE_OAUTH_CLIENT_SECRET`
   - `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`
4. OAuth callback URLs to register in provider dashboards:
   - Google: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/google/callback`
   - Apple: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/apple/callback`
   - GitHub: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/github/callback`
5. After deployment, verify:
   - `https://cs-course-atlas-api.onrender.com/api/health`
   - `https://cs-course-atlas-api.onrender.com/api/auth/oauth/providers`
6. Push to `main` (GitHub Pages auto-deploy will pick up frontend runtime config updates).

### 3) Common issues
- `DATABASE_URL is required for Neon SQL connection`:
Set `DATABASE_URL` in `.env` before `npm start`.
- `db:doctor` reports missing tables:
Run `npm run db:migrate` on the same environment/branch, then re-run `npm run db:doctor`.
- Styling looks outdated:
Run `npm run build:css` after CSS/Tailwind changes.
- Auth not working on static preview:
Use full-stack mode (`npm start`), not `py -m http.server`.

### 4) Build SEO pages (recommended before launch)
This generates crawlable route pages, module pages, `sitemap.xml`, and `robots.txt`.

```bash
npm run build:seo
```

Generated outputs:
- `home.html`, `tracks.html`, `dsa.html`, `java.html`, `git.html`, `assembly.html`, `discrete-math.html`, `flashcards.html`, `quizzes.html`, `playground.html`, `notes.html`, `support.html`, `about.html`
- `modules/index.html` and one page per module under `modules/`
- `sitemap.xml`
- `robots.txt`

## Overview
CS Course Atlas helps learners study through structured modules, code examples, quizzes, flashcards, glossary tools, and notes in one place.

## Core Features
- Multi-track navigation: Home, Course Tracks, DSA, Java, Git, Assembly, Discrete Math, Flashcards, Quizzes, Playground, Notes, Support, About.
- Course Tracks menu expands to show individual classes.
- Mobile, tablet, and laptop responsive navigation with consistent behavior.
- Module cards with code examples, explanations, resources, and progress tracking.
- Interactive quizzes and flashcards for active recall.
- Glossary and notes support for quick reference and review.
- Theme and appearance controls.

## Live Website
- Main site: [https://eddyarriaga00.github.io/CS-Course-Atlas/](https://eddyarriaga00.github.io/CS-Course-Atlas/)

## Launch SEO Checklist
- Run `npm run build:seo` to refresh crawlable landing pages and sitemap.
- Confirm `sitemap.xml` is reachable on production.
- In Google Search Console:
  - Add property for `https://eddyarriaga00.github.io/CS-Course-Atlas/`
  - Replace the `google-site-verification` meta token in page `<head>` tags
  - Submit sitemap URL: `https://eddyarriaga00.github.io/CS-Course-Atlas/sitemap.xml`
- Verify mobile page rendering for `home.html`, `tracks.html`, and `modules/index.html`.

## Local Development Notes
- Public-site checks: use static preview mode from the Quick Guide.
- API/auth checks: use full-stack mode from the Quick Guide.
- Build CSS after visual changes: `npm run build:css`.

## Tech Stack
- HTML
- CSS
- JavaScript
- Tailwind CSS (compiled locally for production)
- Node.js + Express (optional backend features)

## Project Layout
- `index.html` stays at project root as the primary app entrypoint.
- `modules/` contains crawlable per-module pages.
- `server/` contains backend API/auth/SQL code.
- `scripts/` contains build/verification/diagnostic scripts.
- `docs/` contains project documentation and reports:
  - `docs/SEARCH_CONSOLE_SETUP.md`
  - `docs/reports/security_best_practices_report.md`
- `backups/js/` contains archived JS snapshots (non-runtime).

## Support
- GitHub: [https://github.com/eddyarriaga00/CS-Course-Atlas](https://github.com/eddyarriaga00/CS-Course-Atlas)
- Donate: [PayPal Support](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=5.00&currency_code=USD&item_name=CS%20Course%20Atlas%20-%20Coffee%20Support)
- Sponsor ($25): [PayPal Sponsor](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=25.00&currency_code=USD&item_name=CS%20Course%20Atlas%20-%20Sponsor%20Support)

## Contact
- Creator: Eddy Arriaga-Barrientos
- GitHub: [https://github.com/eddyarriaga00](https://github.com/eddyarriaga00)
- Email: eddyarriaga123@gmail.com
- LinkedIn: [https://linkedin.com/in/eddy-arriaga/](https://linkedin.com/in/eddy-arriaga/)
