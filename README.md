# CS Course Atlas

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://eddyarriaga00.github.io/CS-Course-Atlas/)
[![GitHub Stars](https://img.shields.io/github/stars/eddyarriaga00/CS-Course-Atlas?style=for-the-badge)](https://github.com/eddyarriaga00/CS-Course-Atlas/stargazers)
[![Website](https://img.shields.io/badge/Website-Public--Ready-green?style=for-the-badge)](https://eddyarriaga00.github.io/CS-Course-Atlas/)

A public CS learning website for students studying core computer science tracks.

## Mission
CS Course Atlas teaches computer science from zero, for free, in English and Spanish. A nine-course beginner path takes someone who has never programmed through Python, the command line, Git, the web, databases, how computers work, cybersecurity, AI and discrete math, and then on to Java and data structures. Every module has a short lesson, examples you can run in the browser, practice problems, a quiz, flashcards and a hand-picked video for every topic.

## Quick Guide
Use one of these paths depending on what you need.

### 1) Preview the public website (recommended)
This runs the static site exactly like GitHub Pages behavior.

```bash
git clone https://github.com/eddyarriaga00/CS-Course-Atlas.git
cd CS-Course-Atlas
npm install
npm run build:site
python3 -m http.server --directory dist 4173   # or: py -m http.server --directory dist 4173 on Windows
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
- The backend now performs strict startup environment validation and will fail fast with actionable errors if critical variables are malformed.

### 2.5) Public auth with GitHub Pages + Neon API
GitHub Pages is static-only, so auth/session + SQL must run on a separate Node host.

1. Deploy backend using the included Render Blueprint:
   - `render.yaml` is already included in this repo.
   - One-click import URL:
   - `https://render.com/deploy?repo=https://github.com/eddyarriaga00/CS-Course-Atlas`
2. Keep Render web service name as `cs-course-atlas-api` (frontend is prewired to `https://cs-course-atlas-api.onrender.com` in `js/app-config.js`).
3. Fill required Render env vars:
   - `DATABASE_URL` (Neon production connection string with `sslmode=require&channel_binding=require`)
   - `OAUTH_POST_LOGIN_FALLBACK_PATH=https://eddyarriaga00.github.io/CS-Course-Atlas/index.html`
4. Optional OAuth provider env vars:
   - `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`
   - `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`
   - Blueprint defaults OAuth vars to `__disabled__` so initial deploy is not blocked.
5. OAuth callback URLs to register in provider dashboards:
   - Google: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/google/callback`
   - GitHub: `https://cs-course-atlas-api.onrender.com/api/auth/oauth/github/callback`
6. After deployment, verify:
   - `https://cs-course-atlas-api.onrender.com/api/health`
   - `https://cs-course-atlas-api.onrender.com/api/auth/oauth/providers`
7. Push to `main` (GitHub Pages auto-deploy will pick up frontend runtime config updates).

### 3) Common issues
- `DATABASE_URL is required for Neon SQL connection`:
Set `DATABASE_URL` in `.env` before `npm start`.
- `db:doctor` reports missing tables:
Run `npm run db:migrate` on the same environment/branch, then re-run `npm run db:doctor`.
- Styling looks outdated:
Run `npm run build:site` after changes so `dist/` is refreshed.
- Auth not working on static preview:
Use full-stack mode (`npm start`), not `py -m http.server`.

### 4) Build SEO pages (recommended before launch)
This generates a complete static artifact under `dist/`, including crawlable route pages, module pages, `sitemap.xml`, and `robots.txt`.

```bash
npm run build:site
```

Generated outputs:
- `dist/home.html`, `dist/tracks.html`, `dist/dsa.html`, `dist/java.html`, `dist/git.html`, `dist/assembly.html`, `dist/discrete-math.html`, `dist/flashcards.html`, `dist/quizzes.html`, `dist/playground.html`, `dist/notes.html`, `dist/support.html`, `dist/about.html`
- `dist/modules/index.html` and one page per module under `dist/modules/`
- `dist/sitemap.xml`
- `dist/robots.txt`

## Curriculum

The beginner path, in order, then the next level. Courses marked "in progress" show their outline on the site until they are written. The module catalog, study order and published tracks are in `data/module-catalog.json`; unit structure and lesson content live in `js/course-curriculum.js` and `js/course-examples.js`, validated by `npm run check:curriculum` and `npm run check:examples`. Outlines for unwritten courses are in `data/course-outlines.json`.

### The beginner path (9 courses)

#### Intro to Programming with Python (4 modules)
1. **First Steps**: Your First Python Programs
2. **Decisions and Loops**: Decisions and Loops
3. **Organizing Code**: Functions
4. **Working with Data**: Lists and Dictionaries
#### Command Line & Linux (4 modules)
1. **Getting Around**: Files and Folders from the Terminal
2. **Working with Text**: Reading, Searching and Pipes
3. **Permissions and the Environment**: Permissions, Programs and the Environment
4. **Automating with Scripts**: Automating with Shell Scripts
#### Git (2 modules)
1. **Everyday Git**: Git Basics and Collaboration Workflow
2. **Team Collaboration**: Git Branching, Merging and Pull Requests
#### Web Basics: HTML, CSS & JavaScript (4 modules)
1. **Structure with HTML**: HTML: The Structure of a Page
2. **Style with CSS**: CSS: Styling Pages
3. **Interactivity with JavaScript**: JavaScript: Interactive Pages
4. **Build and Publish**: Build and Publish a Site
#### SQL & Databases (4 modules)
1. **Reading Data**: Tables and Your First Queries
2. **Answering Questions**: Summarizing Data
3. **Relationships**: Combining Tables
4. **Building a Database**: Designing and Changing a Database
#### How Computers Work (4 modules)
1. **Bits and Numbers**: Bits, Bytes and Number Systems
2. **Representing Everything**: How Data Is Represented
3. **The Hardware**: Inside the Machine
4. **The Software Stack**: From Code to Running Program
#### Cybersecurity Fundamentals (4 modules)
1. **Protecting Accounts**: Passwords and Authentication
2. **Cryptography**: Encryption Basics
3. **Understanding Attacks**: How Attacks Work
4. **Defending in Practice**: Staying Safe and Building Safely
#### AI Fundamentals (4 modules)
1. **Foundations**: What AI Really Is
2. **Learning from Data**: Your First Models
3. **Neural Networks**: Neural Networks
4. **AI Today**: Language Models and Using AI Well
#### Discrete Math (4 modules)
1. **Logic and Proof**: Propositional Logic and Proofs
2. **Sets, Relations and Functions**: Sets, Relations and Functions
3. **Graph Theory**: Graph Theory
4. **Counting and Probability**: Combinatorics and Discrete Probability
### Next level

#### Java (13 modules)
1. **Java Foundations**: Java Fundamentals, Control Flow Statements
2. **Object-Oriented Java**: Object-Oriented Programming, Exception Handling, Java Generics
3. **Core Libraries**: Java Collections Framework, Lambda Expressions & Streams, File Input/Output
4. **Professional Java**: Unit Testing with JUnit, Database Connectivity (JDBC), Multithreading Basics, Java Memory and JVM Fundamentals, Design Patterns
#### Data Structures & Algorithms (22 modules, in progress)
1. **Getting Started**: Introduction to Coding
2. **Linear Data Structures**: Arrays and Strings, Searching Algorithms, Stacks and Queues, Linked Lists
3. **Recursion and Sorting**: Recursion Fundamentals, Sorting Algorithms, Matrix and Grid Problem Solving, Backtracking Patterns
4. **Hashing, Trees and Heaps**: Hash Tables and Maps, Binary Trees, Heaps and Priority Queues, Tries (Prefix Trees)
5. **Graphs**: Graph Algorithms, Union-Find (Disjoint Set)
6. **Algorithm Design Techniques**: Greedy Algorithms, Dynamic Programming, Bit Manipulation
7. **Advanced Structures and Strings**: Segment Trees, Binary Indexed Trees (Fenwick Trees), Advanced Tree Structures, Advanced String Algorithms
#### x86-64 Assembly (4 modules, in progress)
1. **The Machine Model**: Assembly Registers and Memory Basics
2. **Control Flow and Procedures**: Assembly Control Flow and Procedures, Assembly Addressing Modes and Stack Frames
3. **Data and I/O**: Assembly Arrays, Strings, and Basic I/O


## How the examples are checked
Every example's output on the site is real, recorded by `scripts/run_course_examples.js` and re-checked in CI (`.github/workflows/course-examples.yml`):
- Java, C++, Python, JavaScript and NASM programs are compiled and run.
- Command Line and Git examples are real Bash sessions run in a scratch folder with a fixed home, clock and identity, so the transcript is identical on every machine.
- SQL examples run against a fresh SQLite database (`scripts/lib/run_sql.py`) and print like the `sqlite3` tool.
- Web Basics pages are rendered in headless Chromium and the text they display is compared.

`node scripts/run_course_examples.js --write --module <id>` records new outputs.

## Core Features
- **Beginner path** on the home page and Courses page, with a "where are you starting from?" chooser, per-course progress and next-course links.
- **Lessons** with objectives, key takeaways, common mistakes, practice, self-checks, terms and further reading.
- **Runnable examples in the browser**: Python (Pyodide), JavaScript, SQL (sql.js) and live HTML/CSS/JS previews, each with a Try it button that opens the playground.
- **Auto-graded challenges** in every beginner course: Python (graded in Pyodide), command line and Git (a practice terminal, `js/mini-shell.js`, whose results are checked against real Bash and Git), SQL (result sets compared in sql.js), HTML/CSS (DOM and computed-style checks) and JavaScript (worker tests). The Java course has predict-the-output challenges whose answers are proven by compiling and running each program. `scripts/verify_challenges.js` proves every solution passes and every starter fails.
- **Step-through visualizer** for Python: run any program line by line and watch each variable and call frame change (Playground → Step through, or straight from a Python example).
- **Practice**: per-module quizzes with a best-score board and an optional 30-second timer, mixed review across completed modules, and flashcards with **spaced repetition** (cards come back after 1, 3, 7, 16 and 35 days in a *Due for review* deck).
- **Course certificates**: finish every module and pass every quiz (60%+) to unlock a certificate you can print or save as PDF.
- **Review tools**: a printable cheat sheet per course (key ideas, mistakes and terms), a whole-course review quiz and all-terms deck, retrying only the quiz questions you missed, and a daily challenge on the home page.
- **Your data**: back up progress to a JSON file and restore it (merged, never overwriting), with or without an account.
- **Study plan** for one course or the whole beginner path, exportable to a calendar.
- **Glossary**, per-module notes (downloadable as Markdown), search over courses, modules, terms, challenges and pages (Ctrl/⌘ K), dark mode and a phone layout.
- **Shareable playground links** that carry the code in the URL.
- **Keyboard shortcuts** everywhere (press `?` for the list), and an accessibility pass with zero axe violations in light and dark mode.
- **Installable and offline-ready**: a service worker (`sw.js`) caches the app, the lessons you open and the Python/SQL runtimes.
- **Accounts** (email or Google) that sync progress, notes, quiz scores, flashcard reviews and certificates across devices.

## Live Website
- Main site: [https://eddyarriaga00.github.io/CS-Course-Atlas/](https://eddyarriaga00.github.io/CS-Course-Atlas/)

## Launch SEO Checklist
- Set `GOOGLE_SITE_VERIFICATION_TOKEN` (optional) before building SEO pages:
  - PowerShell: `$env:GOOGLE_SITE_VERIFICATION_TOKEN='your-token'; npm run build:site`
  - If omitted, verification meta tags are not emitted.
- Confirm `sitemap.xml` is reachable on production.
- In Google Search Console:
  - Add property for `https://eddyarriaga00.github.io/CS-Course-Atlas/`
  - Verify meta tag exists on the deployed page after build (if token is set)
  - Submit sitemap URL: `https://eddyarriaga00.github.io/CS-Course-Atlas/sitemap.xml`
- Verify mobile page rendering for `home.html`, `tracks.html`, and `modules/index.html`.

## Local Development Notes
- Public-site checks: use static preview mode from the Quick Guide.
- API/auth checks: use full-stack mode from the Quick Guide.
- Build the deployable static artifact: `npm run build:site`.

## Tech Stack
- Plain HTML, CSS and JavaScript (no framework or bundler) for the site
- Node.js + Express + Postgres (Neon) for the optional accounts API on Render
- Playwright for smoke tests and for rendering web examples in CI

## Project Layout
- `index.html`, `css/atlas.css`, `js/atlas.js`: the single-page app.
- `data/atlas-data.json`: the small course index the site loads first; `data/lessons/<course>.json`: full lessons, loaded on demand. Both are generated by `npm run build:data` (CI checks they are up to date).
- `data/module-catalog.json`, `js/course-curriculum.js`, `js/course-examples.js`, `data/course-videos.json`, `data/course-outlines.json`: course sources.
- `scripts/`: data and SEO page builders, example runner and validators.
- `tests/smoke/`: Playwright smoke tests (`npm run test:smoke`).
- `server/`: accounts API; `render.yaml` deploys it to Render.
- `dist/`: generated static site for GitHub Pages (`npm run build:site`).

## Support
- GitHub: [https://github.com/eddyarriaga00/CS-Course-Atlas](https://github.com/eddyarriaga00/CS-Course-Atlas)
- Donate: [PayPal Support](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=5.00&currency_code=USD&item_name=CS%20Course%20Atlas%20-%20Coffee%20Support)
- Sponsor ($25): [PayPal Sponsor](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=25.00&currency_code=USD&item_name=CS%20Course%20Atlas%20-%20Sponsor%20Support)

## Contact
- Creator: Eddy Arriaga-Barrientos
- GitHub: [https://github.com/eddyarriaga00](https://github.com/eddyarriaga00)
- Email: eddyarriaga123@gmail.com
- LinkedIn: [https://linkedin.com/in/eddy-arriaga/](https://linkedin.com/in/eddy-arriaga/)
