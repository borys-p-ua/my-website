# Roadmap — Personal Portfolio Website

Implementation plan broken into milestones and individually testable tasks.
Each task produces something you can open in a browser and verify manually.

**Visual reference:** `export/` — open `Portfolio Full.html` via `python3 -m http.server 8000` in that folder.  
**Requirements:** [BRD](./BUSINESS_REQUIREMENTS.md) · [PRD](./PRODUCT_REQUIREMENTS.md) · [PDS](./PRODUCT_DESIGN_SPECIFICATION.md) · [TDD](./TECHNICAL_DESIGN.md)  
**Milestones:** [BRD §10](./BUSINESS_REQUIREMENTS.md#10-milestones)

---

## M1 — Content & Design

Design tokens, tooling, fonts, and all structured data files. No UI yet — this milestone produces a compilable, lint-clean, type-safe foundation.

### ✅ T-1.1 Tooling setup

Install and configure the full quality toolchain:

- Prettier with project-wide config (`.prettierrc`)
- ESLint with TypeScript + React + import + vitest plugins, `no-console`, `complexity`, `no-cycle`, `consistent-type-imports`, `no-floating-promises` rules
- Husky + lint-staged (Prettier + ESLint on staged files)
- `commitlint` with Conventional Commits config
- Vitest 3 + jsdom + React Testing Library + `@testing-library/user-event` + `vitest-axe`
- `src/test-setup.ts` registering `vitest-axe` matchers
- TypeScript strict additions in `tsconfig.app.json`: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`

**Delivers:** `npm run lint`, `npm run build`, and `npm test` all pass on a clean repo with zero violations.

---

### ✅ T-1.2 Design tokens + theme system

Implement the full token set from [PDS §12](./PRODUCT_DESIGN_SPECIFICATION.md#12-design-tokens--css-custom-properties) and [PDS §3](./PRODUCT_DESIGN_SPECIFICATION.md#3-color-system):

- `src/index.css`: `@import "tailwindcss"`, `@theme` block mapping all tokens, `[data-theme="dark"]` and `[data-theme="light"]` custom property sets
- Custom `xs: 480px` breakpoint in `@theme`
- Inline theme-detection `<script>` in `index.html` (reads `localStorage` key `theme`, sets `data-theme` on `<html>`, default `dark`)

**Delivers:** Open `index.html` in browser → dark background. Change `data-theme="light"` in DevTools → light background. No flash on reload.

---

### ✅ T-1.3 Self-hosted fonts

- Download Inter (400, 600, 700) and JetBrains Mono (400, 700) `.woff2` Latin-subset files → `public/fonts/`
- `@font-face` + `font-display: swap` declarations in `src/index.css`
- `<link rel="preload">` for Inter 400 + 700 in `index.html`

**Delivers:** Network tab shows fonts loading from `/my-website/fonts/` — no Google Fonts CDN requests.

---

### ✅ T-1.4 Content data files

Populate all structured data from the `export/` reference (CV content is in `sections-1.jsx`):

- `src/types/data.ts` — `Profile`, `Skill`, `ExperienceEntry`, `Project`, `Contact` interfaces (see [TDD §7.1](./TECHNICAL_DESIGN.md#71-type-definitions-srctypesdatats))
- `src/data/profile.ts` — name, headline, summary, location, availability, photo + PDF paths
- `src/data/skills.ts` — 9 skill categories with all items
- `src/data/experience.ts` — 8 roles, newest-first, with stack, bullets, achievements
- `src/data/projects.ts` — 6 projects with tags and status
- `src/data/contact.ts` — email, LinkedIn URL, GitHub URL
- `src/lib/assetUrl.ts` — `BASE_URL` prefix helper

**Delivers:** `npm run build` compiles with zero TypeScript errors. All content is type-checked at build time.

---

## M2 — Core Pages

All eight sections rendered responsively with real content. No PDF generation or LLM yet.

### T-2.1 App shell + layout primitives

- `src/context/ThemeContext.tsx` — `useState` + `localStorage` persistence, writes `data-theme` on `<html>`
- `src/context/SkillFilterContext.tsx` — `Set<string>` state with `toggle`, `selectAll`, `clearAll`, `reset`
- `src/components/layout/SkipLink.tsx` — `sr-only`, unhides on focus, links to `#main-content`
- `src/components/layout/Section.tsx` — reusable wrapper with `aria-labelledby`
- `src/App.tsx` — `<header>` + `<main id="main-content">` + `<footer>`, skip link first in DOM, both contexts provided

**Delivers:** Page loads with dark background, no console errors. Tab once → skip link appears. Tab again → focus enters the page.

---

### T-2.2 Header + navigation

- `src/components/layout/Header.tsx` — logo, nav links, theme toggle button, "Résumé" CTA
- `src/hooks/useScrollSpy.ts` — `IntersectionObserver` tracking active section
- Mobile hamburger + slide-in drawer: opens on click, closes on Escape, focus returns to hamburger
- Active nav link style driven by scroll-spy

**Delivers:** All nav links visible on desktop. Theme toggle switches dark ↔ light and persists on reload. At 375 px: hamburger opens/closes drawer; Escape closes it; active link highlights as you scroll.

---

### T-2.3 Hero section

- `src/sections/Hero/index.tsx` — eyebrow, name `<h1>`, headline, summary paragraph, two CTA buttons, three meta facts, profile photo `<picture>` placeholder
- Eager import in `App.tsx`

**Delivers:** Hero renders with real content. "Download résumé" and "See my work" buttons have correct `href` targets. Layout holds at both 375 px and 1280 px.

---

### T-2.4 About section

- `src/sections/About/index.tsx` — bio paragraphs, six fact items with Lucide icons, photo placeholder
- Eager import in `App.tsx`

**Delivers:** About renders with full bio and all six facts (location, role, years, education, open-to-remote, learning). Two-column layout on desktop collapses to single column on mobile.

---

### T-2.5 Skills section

- `src/sections/Skills/index.tsx` — category grid, tag toggle (reads/writes `SkillFilterContext`), selected counter, "Clear all" / "Select all" toolbar
- `React.lazy` import in `App.tsx`

**Delivers:** All 9 skill categories render. Clicking a tag toggles selected state and updates the counter. "Clear all" deselects everything; "Select all" selects all 40+ items. Selection persists while scrolling away and back.

---

### T-2.6 Experience section

- `src/sections/Experience/index.tsx` — vertical timeline, 8 role entries each with role title, company + domain, date range, stack tag row, bullet list, optional key-achievement block
- `React.lazy` import in `App.tsx`

**Delivers:** All 8 roles render in order with correct dates and stack tags. Key-achievement blocks appear for the 5 roles that have them. Layout is readable at 375 px.

---

### T-2.7 Projects section

- `src/sections/Projects/index.tsx` — 6 project cards with number badge, title, company (mono), description, tag row, status badge
- Status badge style differs for "In progress" vs "Shipped"
- `React.lazy` import in `App.tsx`

**Delivers:** 6 cards render. "In progress" badge is visually distinct. Tags are styled consistently with Skills section.

---

### T-2.8 Contact section + Footer

- `src/sections/Contact/index.tsx` — three contact cards: email (`mailto:`), LinkedIn, GitHub (both `target="_blank" rel="noreferrer"`)
- `src/components/layout/Footer.tsx` — copyright line + repo link + back-to-top
- `React.lazy` import in `App.tsx`

**Delivers:** Clicking email opens mail client. LinkedIn and GitHub links open in a new tab. Footer is visible at the bottom of the page.

---

### T-2.9 UI primitives + shared components

Implement the reusable primitives consumed by the sections above (extract from section code as needed):

- `Button` — variants: primary, secondary, ghost; loading state with spinner
- `Tag` — static and interactive (selected state) variants
- `Input`, `Textarea` — with label, error, and char-counter support
- `Alert` — info, error, success variants with `role="alert"` on error
- `Spinner`

**Delivers:** Each primitive renders its variants in isolation. `npm test` passes (render + interaction tests for each).

---

## M3 — SEO & Performance

Static SEO markup, real images, and Lighthouse score validation.

### T-3.1 Static SEO markup

All in `index.html` — nothing rendered by React:

- `<title>`, `<meta name="description">` (150–160 chars)
- Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`
- Twitter Card: `summary_large_image`
- `<link rel="canonical">`
- JSON-LD `Person` schema as `<script type="application/ld+json">`
- `public/sitemap.xml` and `public/robots.txt`

**Delivers:** `view-source:` on the deployed page shows all tags present. `https://borys-p-ua.github.io/my-website/robots.txt` returns the correct file. JSON-LD validates at the schema.org validator.

---

### T-3.2 Profile photo + OG image

- Add `public/images/profile.webp`, `profile.avif`, `og-image.png`
- Update Hero and About sections: replace placeholders with `<picture>` using AVIF + WebP sources, `srcset`, `sizes`, `width`/`height`; `fetchpriority="high"` on Hero photo

**Delivers:** Profile photo renders in Hero and About. Network tab shows WebP served on Chrome, AVIF where supported. No CLS when photo loads (check in DevTools Performance panel).

---

### T-3.3 Lighthouse audit + fixes

- Run Lighthouse on the deployed site
- Address any metric below threshold
- Iterate until: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, LCP < 2.5 s, CLS < 0.1

**Delivers:** Lighthouse report screenshot with all scores green.

---

## M4 — Resume Download

Full-resume static download and client-side filtered PDF generation.

### T-4.1 Full-resume static download

- Place `public/Polietaiev_Borys_Resume.pdf` (pre-generated)
- Wire "Download résumé" button in Header and Hero to `<a href={assetUrl('Polietaiev_Borys_Resume.pdf')} download>`

**Delivers:** Clicking either download button saves the PDF immediately with the correct filename. Works on both desktop and mobile without a spinner.

---

### T-4.2 Resume section UI

- `src/sections/Resume/index.tsx` — skill filter panel (reads `SkillFilterContext`, synced with Skills section), JD textarea with char counter (4000-char limit), summary sidebar (skills selected / experience count / JD word count), preset-template buttons (Engineering Manager, Backend Lead, Principal Eng.)
- `React.lazy` import in `App.tsx`

**Delivers:** Opening the Resume section shows the same skill selection state as the Skills section. Changing selection in either section updates both. JD counter updates as you type. Preset buttons pre-select the correct skills.

---

### T-4.3 PDF template components

Install `@react-pdf/renderer` v4. Build `src/lib/pdf/`:

- `fonts.ts` — Inter 400/600/700 registered from `public/fonts/`
- `styles.ts` — full `StyleSheet.create()` matching the template spec in [TDD §10.7](./TECHNICAL_DESIGN.md#107-template-specification-resolves-brd-d-2)
- `ResumeHeader` — two-column flex row: photo (88 pt, circle) + name / headline / contact row
- `SummarySection` — profile paragraph + Technical Skills + Domain Expertise (both filterable) + Soft Skills (always shown); omit empty sub-blocks
- `ExperienceSection` — all entries newest-first; company + date row; italic role; bullet list
- `ResumeDocument` — root `<Document><Page>` composing the three sections

**Delivers:** `npm test` on `ResumeDocument` renders without errors. Each section sub-component renders expected text from the data fixtures.

---

### T-4.4 Filtered PDF download

- `src/lib/pdf/index.ts` — `useResumePdf(filter?)` hook with dynamic `import('@react-pdf/renderer')` inside the callback
- Wire "Download tailored PDF" button in Resume section to hook
- Show `<Spinner>` and disable button during generation
- `useTransition` wrapping the download call so the UI stays responsive

**Delivers:** Click "Download tailored PDF" → spinner appears → PDF downloads as `Polietaiev_Borys_Resume_Tailored.pdf`. Opening the PDF: only selected skills appear in Technical Skills / Domain Expertise; Soft Skills always present; all experience entries present. Works on mobile.

---

## M5 — Cover Letter Generator

On-device LLM generation with Transformers.js.

### T-5.1 Cover Letter section UI

- `src/sections/CoverLetter/index.tsx` — form: company, role, salutation, tone selector (Confident / Warm / Concise / Story-led), notes textarea; letter preview panel (paper-style card with date, salutation, body, signature)
- Static placeholder body for now; real generation wired in T-5.3
- Honeypot `<input name="website">` hidden via CSS (`position: absolute; opacity: 0; height: 0; pointer-events: none`)
- `React.lazy` import in `App.tsx`

**Delivers:** Form inputs update preview in real time (company, role, salutation name). Tone selector highlights selection. Paper preview card is styled correctly in both themes.

---

### T-5.2 Abuse prevention gate

- `src/lib/llm/rateLimit.ts` — `canGenerate()` + `recordGeneration()` using `sessionStorage`
- `src/lib/llm/botSignals.ts` — `navigator.webdriver` check
- `src/lib/llm/gate.ts` — `evaluateGate(honeypotValue)` returning `'allow' | 'honeypot' | 'bot' | 'rate-limited'`
- Wire gate to Generate button: `'rate-limited'` shows message + disables button; `'honeypot'` and `'bot'` silently block

**Delivers:** Manually filling the honeypot field and clicking Generate → nothing happens (silently blocked). Clicking Generate 3 times in one session → 4th click shows rate-limit message and button stays disabled.

---

### T-5.3 Browser LLM integration

Install `@huggingface/transformers` v4. Build `src/lib/llm/`:

- `availability.ts` — WebGPU + WASM detection, model tier selection via `maxBufferSize`
- `engine.ts` — pipeline lifecycle, model loading, streaming async generator
- `prompt.ts` — system + user message builders using `Profile` data
- `index.ts` — public API: `getLLMStatus()`, `generateCoverLetter()`

Wire into Cover Letter section:

- Show unavailable / needs-download / ready state banners
- Model download progress bar with estimated size
- Streaming output into preview textarea (token by token)
- Copy to clipboard + Download as `.txt` actions on generated output
- Error banner with "Try again" on failure
- Update CSP `connect-src` to include `https://huggingface.co`

**Delivers:** First run: "Download model & generate" button appears; clicking it shows download progress bar. After download: Generate produces streaming text in the preview. Copy button copies to clipboard. Download button saves a `.txt` file. On a browser without WebGPU: info banner shown, Generate button disabled.

---

## M6 — QA & Polish

Full test coverage, accessibility audit, cross-browser check, and Lighthouse CI.

### T-6.1 Test suite — utilities and contexts

- Unit tests for: `assetUrl`, `rateLimit`, `botSignals`, `gate`, `SkillFilterContext` state transitions, `ThemeContext` persistence, PDF filter logic (`SummarySection` item filtering)
- Target: ≥ 90 % line coverage on `src/lib/` and `src/context/`

**Delivers:** `npm test -- --coverage` reports ≥ 90 % for targeted layers.

---

### T-6.2 Test suite — UI components and sections

- Render + interaction tests for all UI primitives (Button variants, Tag toggle, Alert variants, Input validation, Textarea counter)
- Section smoke tests: each section renders without errors with fixture data
- Key interaction tests: skill toggle updates context, Resume section syncs with Skills, Generate button respects gate, PDF download triggers hook
- `vitest-axe` assertion on every interactive component

**Delivers:** `npm test` passes with zero axe violations. Coverage: UI primitives ≥ 80 %, sections ≥ 70 %.

---

### T-6.3 Accessibility audit

Manual checks against [TDD §13](./TECHNICAL_DESIGN.md#13-accessibility-implementation):

- Tab through entire page — focus indicator visible at every stop, order is logical
- Skip link appears on first tab press and jumps to main content
- Skills section: each tag communicates selected state via `aria-checked` or `aria-pressed`
- Mobile drawer: Escape key closes it, focus returns to hamburger
- Cover letter loading state: announced via `aria-live="polite"` region
- Error states: `role="alert"` on error banners
- Enable OS reduced-motion preference → section animations disabled

**Delivers:** Zero keyboard dead-ends. All interactive states reachable and communicated without a mouse.

---

### T-6.4 Cross-browser + responsive QA

Test at 375 px, 768 px, 1280 px, 1920 px on Chrome, Safari, and Firefox:

- No horizontal scroll at 375 px
- Hamburger navigation works on all browsers
- Fonts render correctly (self-hosted, no CDN fallback needed)
- PDF download works on Safari (blob URL + `<a download>`)
- LLM section shows correct degradation on Firefox (WebGPU status)

**Delivers:** No layout breakage at any tested viewport. PDF download confirmed on mobile Safari.

---

### T-6.5 Lighthouse CI setup + final audit

- Add `.lighthouserc.json` (thresholds: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, FCP < 2500 ms, CLS < 0.1)
- Add Lighthouse CI step to `.github/workflows/deploy.yml` (runs after deploy)
- Final manual Lighthouse run on deployed site

**Delivers:** GitHub Actions deploy workflow runs Lighthouse and passes all thresholds. Green scores in the Actions log.
