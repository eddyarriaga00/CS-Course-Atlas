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
- `DATABASE_URL` must point to your Postgres/Neon database.

Open: `http://127.0.0.1:3000`

### 2.5) Public auth with GitHub Pages + Neon API
GitHub Pages is static-only, so auth/session + SQL must run on a separate Node host.

1. Deploy this repo backend (`server/index.js`) to a Node host (Render/Railway/Fly/etc).
2. Set backend env:
   - `DATABASE_URL` (Neon production branch connection string)
   - `NODE_ENV=production`
   - `ALLOWED_ORIGINS=https://eddyarriaga00.github.io` (and your custom domain when added)
   - `SESSION_COOKIE_SAME_SITE=none`
   - `SESSION_COOKIE_SECURE=true`
3. Run migrations on the deployed backend: `npm run db:migrate`
4. Verify deployment DB wiring: `npm run db:doctor`
5. Set frontend API base in `js/app-config.js`:
   - `window.__APP_CONFIG.apiBaseUrl = "https://<your-api-domain>"`
6. Push to `main` so GitHub Pages serves frontend updates.

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

## Support
- GitHub: [https://github.com/eddyarriaga00/CS-Course-Atlas](https://github.com/eddyarriaga00/CS-Course-Atlas)
- Donate: [PayPal Support](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=5.00&currency_code=USD&item_name=CS%20Course%20Atlas%20-%20Coffee%20Support)
- Sponsor ($25): [PayPal Sponsor](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=25.00&currency_code=USD&item_name=CS%20Course%20Atlas%20-%20Sponsor%20Support)

## Contact
- Creator: Eddy Arriaga-Barrientos
- GitHub: [https://github.com/eddyarriaga00](https://github.com/eddyarriaga00)
- Email: eddyarriaga123@gmail.com
- LinkedIn: [https://linkedin.com/in/eddy-arriaga/](https://linkedin.com/in/eddy-arriaga/)
