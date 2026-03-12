# CS Course Atlas (Java-DSA-Helper)

Live site: [https://eddyarriaga00.github.io/Java-DSA-Helper/](https://eddyarriaga00.github.io/Java-DSA-Helper/)

CS Course Atlas is a multi-track CS learning platform with modules, quizzes, flashcards, glossary tools, notes, and coding playgrounds.

## What Is Included
- Multi-route learning tracks: Home, Course Tracks, DSA, Java, Git, Assembly, Discrete Math, Flashcards, Quizzes, Playground, Notes, Support, About.
- Module system with explanations, code examples, mode/language switching, and progress tracking.
- Interactive quizzes and flashcard practice.
- Glossary, notes library, and books library UI.
- Account and progress sync support through backend APIs when the Node server is running.
- Responsive navigation across laptop, tablet, and mobile.

## Recent Navigation Updates
- Left pages sidebar now has a collapsible `Course Tracks` group that expands to show classes.
- Sidebar behavior is synchronized across devices:
  - Desktop/laptop: inline sidebar with icon-collapse mode.
  - Tablet/iPad: drawer behavior with proper open/close state.
  - Mobile: left rail plus overlay expansion, with auto-close after page selection.
- Laptop sidebar width was increased so empty space is reduced and page labels fit better.

## Project Structure
- `index.html` - app shell and routed page containers.
- `css/styles.css` - full styling, responsive layout, sidebar/menu behavior, themes.
- `js/script.js` - app state, routing, rendering, modules, quizzes, glossary, account/session UI.
- `server/` - Express backend for auth/profile/user-state/support/books APIs.

## Run Locally

### Option 1: Frontend-only (GitHub Pages style)
Use this when you only need static site behavior.

```bash
git clone https://github.com/eddyarriaga00/Java-DSA-Helper.git
cd Java-DSA-Helper
py -m http.server 4173
```

Open `http://127.0.0.1:4173/index.html`

### Option 2: Full stack (frontend + backend APIs)
Use this for auth/session sync, support API, and books streaming endpoints.

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in repo root:

```env
DATABASE_URL=your_neon_connection_string
PORT=3000
NODE_ENV=development
SESSION_COOKIE_NAME=csatlas_session
SESSION_TTL_DAYS=30
LIANG_JAVA_BOOK_PATH=C:\absolute\path\to\book.pdf
```

3. Run migrations:

```bash
npm run db:migrate
```

4. Start server:

```bash
npm start
```

Open `http://localhost:3000`

## NPM Scripts
- `npm start` - run Express server.
- `npm run dev` - run server in watch mode.
- `npm run db:migrate` - apply SQL migrations in `server/sql`.
- `npm run check:frontend` - syntax check `js/script.js`.

## Deployment Notes
- GitHub Pages is good for free static hosting with minimal maintenance.
- Full backend features require deploying the Node server and Neon database separately.
- If deploying full stack, set environment variables on the host and run migrations before first launch.

## Support
- GitHub repo: [https://github.com/eddyarriaga00/Java-DSA-Helper](https://github.com/eddyarriaga00/Java-DSA-Helper)
- Donate (PayPal): [Support this project](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=5.00&currency_code=USD&item_name=Java%20DSA%20Learning%20Hub%20-%20Coffee%20Support)
- Sponsor ($25 preset): [Sponsor this project](https://www.paypal.com/donate?business=eddyarriaga123%40gmail.com&amount=25.00&currency_code=USD&item_name=Java%20DSA%20Learning%20Hub%20-%20Sponsor%20Support)

## Contact
- Creator: Eddy Arriaga-Barrientos
- GitHub: [https://github.com/eddyarriaga00](https://github.com/eddyarriaga00)
- Email: eddyarriaga123@gmail.com
- LinkedIn: [https://linkedin.com/in/eddy-arriaga/](https://linkedin.com/in/eddy-arriaga/)
