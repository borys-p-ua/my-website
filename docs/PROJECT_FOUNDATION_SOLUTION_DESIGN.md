# Project Foundation — Solution Design

## Overview

A personal website built with React + TypeScript + Vite, hosted on GitHub Pages, with automated CI/CD via GitHub Actions (free tier).

**Repository:** https://github.com/borys-p-ua/my-website  
**Live URL:** https://borys-p-ua.github.io/my-website/

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| UI framework | React 19 | Component model, huge ecosystem |
| Language | TypeScript | Type safety, better DX |
| Bundler / dev server | Vite | Fast HMR, native ESM, simple config |
| Testing | Vitest + React Testing Library | Native Vite integration, Jest-compatible API |
| Styling | Tailwind CSS v4 | Utility-first, no CSS files, purges unused styles at build |
| Hosting | GitHub Pages | Free, static, integrated with repo |
| CI/CD | GitHub Actions | Free for public repos (unlimited minutes), 2 000 min/month on private |

---

## Repository

**URL:** https://github.com/borys-p-ua/my-website

This is a **project page** repo (not `borys-p-ua.github.io`), so GitHub Pages serves from the `gh-pages` branch and the site lives at `https://borys-p-ua.github.io/my-website/`.

Clone:
```bash
git clone https://github.com/borys-p-ua/my-website.git
cd my-website
npm install
npm run dev
```

---

## Project Structure

```
my-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline (test → build → deploy)
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   └── __tests__/          # component unit tests
│   ├── pages/
│   │   └── __tests__/          # page-level tests
│   ├── App.tsx
│   ├── App.test.tsx             # app-level smoke test
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html                   # Vite entry point (project root, not src/)
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

---

## Vite Configuration

The `base` option must match where the site is served from:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-website/',           // matches https://borys-p-ua.github.io/my-website/
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
})
```

> Set `base: '/'` when switching to a custom domain.

---

## Tailwind CSS Setup

Tailwind v4 integrates directly with Vite via its official plugin — no `tailwind.config.js` or PostCSS config needed.

### Dependencies

```bash
npm install tailwindcss @tailwindcss/vite
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-website/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
})
```

### src/index.css

```css
@import "tailwindcss";
```

### src/main.tsx

```tsx
import './index.css'
```

Tailwind scans all files in `src/` automatically and tree-shakes unused utilities at build time — the production CSS bundle stays small.

---

## Testing Setup — Vitest

### Dependencies

```json
"devDependencies": {
  "@testing-library/jest-dom": "^6.x",
  "@testing-library/react": "^16.x",
  "@testing-library/user-event": "^14.x",
  "vitest": "^3.x",
  "jsdom": "^26.x"
}
```

### Setup file

```ts
// src/test-setup.ts
import '@testing-library/jest-dom'
```

### npm scripts

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

### Example test

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders heading', () => {
    render(<App />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
```

### Conventions

- Co-locate tests next to source files (`Component.test.tsx` beside `Component.tsx`), or group in `__tests__/` folders.
- Use `describe` blocks per component/page.
- Target behaviour, not implementation — query by role/text, not CSS class or internal state.

---

## GitHub Actions — CI/CD Pipeline

File: `.github/workflows/deploy.yml`

```yaml
name: CI / Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:             # test + build on PRs, no deploy
    branches: [main]

permissions:
  contents: write           # needed to push to gh-pages branch

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Test
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

`GITHUB_TOKEN` is injected automatically — no manual secret setup needed.  
The `Test` step runs before `Build`, so a failing test blocks the deploy.

---

## GitHub Pages Setup (one-time)

1. Go to https://github.com/borys-p-ua/my-website/settings/pages
2. **Source** → **Deploy from a branch**
3. **Branch** → `gh-pages` / `/ (root)`
4. The `gh-pages` branch is created automatically on the first successful Actions run.

---

## Deployment Flow

```
git push main
  → Actions: npm ci → npm test → npm run build
  → dist/ pushed to gh-pages branch
  → GitHub Pages rebuilds (~1 min)
  → Live at https://borys-p-ua.github.io/my-website/
```

Pull requests run tests + build but do not deploy.

---

## Custom Domain (optional)

1. Add a CNAME DNS record pointing to `borys-p-ua.github.io`
2. Add a `CNAME` file in `public/` containing your domain
3. Settings → Pages → Custom domain
4. Enable **Enforce HTTPS** after DNS propagates
5. Set `base: '/'` in `vite.config.ts`

---

## Free Tier Limits

| Resource | Free allowance | Typical usage |
|---|---|---|
| GitHub Actions minutes | Unlimited (public repo) / 2 000 min/month (private) | ~1–2 min per push |
| GitHub Pages bandwidth | 100 GB/month | Negligible for a personal site |
| GitHub Pages repo size | 1 GB | Negligible |

A public repo gets **unlimited CI minutes** — no cost at all.

---

## Alternative Deployment Options

| Option | Free tier | Notes |
|---|---|---|
| **GitHub Pages + Actions** | Unlimited (public) | Recommended — native, zero extra accounts |
| Vercel | Unlimited hobby tier | Better PR previews, instant rollbacks |
| Netlify | 300 min/month build, 100 GB bandwidth | Easy Git integration |
| Cloudflare Pages | Unlimited builds | Fastest CDN, Workers integration |

---

## Implementation Checklist

- [ ] 1. Scaffold Vite + React + TS project files
- [ ] 2. Add Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`), add `@import "tailwindcss"` to `src/index.css`
- [ ] 3. Add Vitest + React Testing Library dependencies
- [ ] 4. Create `src/test-setup.ts` and wire into `vite.config.ts`
- [ ] 5. Write a smoke test (`App.test.tsx`)
- [ ] 6. Create `.github/workflows/deploy.yml`
- [ ] 7. `git init`, `git remote add origin https://github.com/borys-p-ua/my-website.git`, push to `main`
- [ ] 8. Enable GitHub Pages in repo Settings (branch: `gh-pages`)
- [ ] 9. Verify live URL after first Actions run
- [ ] 10. Build out pages and components (with tests)
