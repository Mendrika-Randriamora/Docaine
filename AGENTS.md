# AGENTS.md

Docaine is a French static documentation site for Python 3.15. Content is Markdown; the React app is a small renderer around it.

## Commands

```bash
npm install
npm run dev      # Vite, http://localhost:5173
npm run build    # static output in dist/
npm run preview
```

- There are no test, lint, typecheck, or formatting scripts. Do not invent them; verify changes with `npm run build`.
- Vite 8 requires Node `^20.19.0 || >=22.12.0`. The README's "Node 18+" is stale.

## Content is the product

- `content/<lang>/_language.json` = `{ name, version, order, tagline }`.
- `content/<lang>/<section>/_section.json` = `{ title, order }`.
- A page is `content/<lang>/<section>/<page>.md`, served at `/docs/<lang>/<section>/<page>`. Adding files needs no code change; discovery is an eager `import.meta.glob('/content/**/*.{md,json}')` in `src/lib/content.js`.
- The frontmatter parser in `src/lib/content.js` is intentionally naive: flat `key: value` lines only. No nested YAML, arrays, or multiline values. Quote strings.
- Missing metadata falls back to slug/filename/`order: 999`.
- Documentation content and UI copy are in French. Follow `docs/MODELE-PAGE.md` and `src/pages/contribuer.md` for page structure and tone.
- Content is reformulated from the official Python 3.15 docs, not copied verbatim.
- Use absolute internal links (`[x](/docs/python/...)`) so `src/components/Markdown.jsx` renders a React Router `<Link>`; other hrefs open in a new tab.
- Only `##` and `###` headings enter the right-hand TOC (`extractToc`); fenced code is skipped. TOC IDs must stay consistent with `rehype-slug`/`github-slugger`.
- Always tag code fences with a language (e.g. ` ```python `). Highlighting uses `detect: false`; unknown languages are ignored.

## Code map

- `src/App.jsx` — routes: `/`, `/docs`, `/docs/:lang`, `/docs/:lang/:section/:page`, `/a-propos`, `/contribuer`.
- `src/lib/content.js` — content tree, frontmatter parsing, TOC extraction, search plain text.
- `src/components/Layout.jsx` — header, fullscreen menu, footer, `/` and Ctrl/Cmd+K search shortcuts.
- `src/components/Markdown.jsx` — Markdown rendering, anchors, copy button.
- `src/components/Search.jsx` — MiniSearch index built in memory at load.
- `src/styles.css` — design tokens, light/dark themes. Body font is local URW Gothic; only JetBrains Mono is loaded from Google Fonts.
- React Router is v7 in `package.json`, used with v6-style `<Routes>`; the README's v6 claim is stale.

## Deployment quirks

- The site is an SPA: the host must fall back to `index.html` for unknown paths (Netlify does this via `public/_redirects`).
- For sub-path deployment (e.g. GitHub Pages), change `base` in `vite.config.js`; `src/main.jsx` derives the router `basename` from `BASE_URL`.
- Theme is bootstrapped inline in `index.html` from `localStorage['docaine-theme']`/`prefers-color-scheme` to avoid a flash. Keep `src/components/ThemeToggle.jsx` in sync with that key.
