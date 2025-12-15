# ☕ Java DSA Learning Hub

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://eddyarriaga00.github.io/Java-DSA-Helper/)
[![GitHub Stars](https://img.shields.io/github/stars/your-username/java-dsa-learning-hub?style=for-the-badge)](https://github.com/eddyarriaga00/Java-DSA-Helper/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Master Data Structures & Algorithms with interactive Java-first learning.**

Comprehensive modules with runnable code, per-module flashcards, quizzes, glossary links, and a sandbox powered by the Piston API. Built for CS students who want clean explanations, pseudocode, and multi-language examples without leaving the browser.

## 🧭 Table of Contents
- [Features](#-features)
- [Live Demo & Quick Start](#-live-demo--quick-start)
- [How the Platform Works](#-how-the-platform-works)
- [Customization](#-customization)
- [Tech Stack](#-tech-stack)
- [Roadmap](#-roadmap)
- [Support](#-support)
- [Contact](#-contact)

## ✨ Features
- **Interactive modules (20+)** with expanded explanations, step-by-step code breakdowns, and runnable samples.
- **Multi-language code** (Java, Python, C++, JavaScript) with comments + pseudocode mode and comment toggles.
- **Quiz engine**: 15-question banks per module, 4 random per attempt, 100% required to complete.
- **Flashcards & glossary**: Module-tied flashcards plus a searchable glossary with highlighted matches.
- **Progression tools**: Achievements, focus timer, streaks, study plan prompts, daily challenges, and insights.
- **Java playground**: Preloaded module snippets (auto-stubs `main` when missing), Piston API ready; reset/copy/run buttons included.
- **Pagination**: Module grid paginates (5 per page) to keep the page compact on all devices.
- **Accessibility & UX**: Dark/light themes, accent options, font scaling, compact layout, keyboard/Esc/backdrop closing for modals.
- **Responsive**: Optimized for laptops, tablets, and phones.

## 🚀 Live Demo & Quick Start
Live site: **https://eddyarriaga00.github.io/Java-DSA-Helper/**

Local run:
```bash
git clone https://github.com/eddyarriaga00/Java-DSA-Helper.git
cd Java-DSA-Helper
open index.html   # or python -m http.server 8000
```

Java runner (optional): set `CODE_RUNNER_ENDPOINT` and `CODE_RUNNER_VERSION` in `js/script.js` to point to your Piston or local runner if you want playground execution offline.

## 🎯 How the Platform Works
- **Modules**: Organized beginner → advanced, paginated 5 per page. Each module has multi-language code, a detailed breakdown, resources, and runnable Java samples.
- **Playground**: Load any module sample from the dropdown, edit, run, copy output, or reset. Samples include a `main` method stub if one was missing.
- **Quizzes**: Generated from module descriptions, topics, code breakdowns, resources, glossary terms, and flashcards. Four random questions per attempt; perfect score marks completion.
- **Flashcards/Glossary**: Per-module decks and a global glossary keep definitions aligned with quizzes and modules.
- **Progress & Insights**: Tracks completion, streaks, focus time, daily challenges, study plans, and achievements. Settings persist locally (theme, comments, pseudocode, density, etc.).

## 🔧 Customization
- **Add modules**: Extend the `modules` array in `js/script.js` (title, description, topics, codeExamples, explanation, resources, codeBreakdown). Java samples auto-stub `main` if absent.
- **Adjust themes**: Tweak CSS variables in `css/styles.css` for surfaces, accents, and typography. Accent themes are selectable in-app.
- **Runner**: Point `CODE_RUNNER_ENDPOINT` to your own Piston-compatible runner to execute playground code offline.

## 🛠 Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Tailwind-inspired utilities
- **Fonts**: Inter (Google Fonts)
- **Icons**: Emoji-based
- **Hosting**: GitHub Pages–ready, zero build step

## 🗺 Roadmap (snapshot)
- More language snippets for advanced modules
- Additional runnable samples and challenges
- Optional timed quizzes and coding prompts
- Offline/PWA enhancements

## 💝 Support
- ⭐ Star the repo
- 🐛 Open issues/PRs for bugs or content fixes
- ☕ Donate: [PayPal](https://www.paypal.com/paypalme/delamainn)
- ❤️ Sponsor: [GitHub Sponsors](https://github.com/sponsors/eddyarriaga00/)

## 📞 Contact
- **Creator**: Eddy Arriaga-Barrientos  
- **GitHub**: [eddyarriaga00](https://github.com/eddyarriaga00/)  
- **Email**: eddyarriaga123@gmail.com  
- **LinkedIn**: [Eddy Arriaga](https://linkedin.com/in/eddy-arriaga/)

---
<div align="center">

**Made with ❤️ for CS students worldwide**

[⬆ Back to Top](#-java-dsa-learning-hub)

</div>
