# Technical Design Document — Personal Portfolio Website

## Contents

1. [Overview](#1-overview)
2. [System Architecture](#2-system-architecture)
   - [2.1 High-level view](#21-high-level-view)
   - [2.2 Hosting & delivery](#22-hosting--delivery)
   - [2.3 CI/CD pipeline](#23-cicd-pipeline)
3. [Tech Stack](#3-tech-stack)
4. [Repository Structure](#4-repository-structure)
5. [Component Architecture](#5-component-architecture)
   - [5.1 Component categories](#51-component-categories)
   - [5.2 Component rules](#52-component-rules)
   - [5.3 Section lazy loading](#53-section-lazy-loading)
6. [State Management](#6-state-management)
   - [6.1 State ownership](#61-state-ownership)
   - [6.2 SkillFilterContext](#62-skillfiltercontext)
   - [6.3 ThemeContext](#63-themecontext)
7. [Data Layer](#7-data-layer)
   - [7.1 Type definitions](#71-type-definitions-srctypesdatats)
   - [7.2 Public asset paths](#72-public-asset-paths)
8. [Styling Architecture](#8-styling-architecture)
   - [8.1 Tailwind v4 + CSS custom properties](#81-tailwind-v4--css-custom-properties)
   - [8.2 Custom xs: breakpoint](#82-custom-xs-breakpoint)
   - [8.3 Font loading](#83-font-loading)
9. [Browser LLM Integration](#9-browser-llm-integration)
   - [9.1 Requirements recap](#91-requirements-recap)
   - [9.2 Options considered](#92-options-considered)
   - [9.3 Decision: Transformers.js v4](#93-decision-transformersjs-v4)
   - [9.4 Abstraction layer](#94-abstraction-layer-srclibllm)
   - [9.5 Model selection](#95-model-selection)
   - [9.6 Prompt design](#96-prompt-design)
   - [9.7 Streaming output](#97-streaming-output)
   - [9.8 Graceful degradation](#98-graceful-degradation)
   - [9.9 Abuse prevention](#99-abuse-prevention-resolves-brd-d-3)
10. [PDF Generation](#10-pdf-generation)
    - [10.1 Library: @react-pdf/renderer](#101-library-react-pdfrenderer)
    - [10.2 Module boundary](#102-module-boundary-srclibpdf)
    - [10.3 Template component](#103-template-component)
    - [10.4 Public API — useResumePdf hook](#104-public-api--useresumepdf-hook)
    - [10.5 Performance](#105-performance)
    - [10.6 Font registration](#106-font-registration)
    - [10.7 Template specification (resolves BRD D-2)](#107-template-specification-resolves-brd-d-2)
11. [SEO Implementation](#11-seo-implementation)
    - [11.1 Static meta tags](#111-static-meta-tags)
    - [11.2 JSON-LD](#112-json-ld)
    - [11.3 sitemap.xml and robots.txt](#113-sitemapxml-and-robotstxt)
12. [Performance Strategy](#12-performance-strategy)
13. [Accessibility Implementation](#13-accessibility-implementation)
14. [Security](#14-security)
15. [Testing Strategy](#15-testing-strategy)
    - [15.1 Coverage targets](#151-coverage-targets)
    - [15.2 Testing rules](#152-testing-rules)
    - [15.3 LLM test double](#153-llm-test-double)
    - [15.4 Accessibility testing](#154-accessibility-testing)
    - [15.5 Performance CI](#155-performance-ci)
16. [Build Configuration](#16-build-configuration)
    - [16.1 vite.config.ts](#161-viteconfigts)
    - [16.2 TypeScript strict mode](#162-typescript-strict-mode)
17. [Browser Support](#17-browser-support)
18. [Deferred Decisions](#18-deferred-decisions)

---

**Version:** 1.2  
**Date:** 2026-05-10  
**Author:** Borys  
**Status:** Draft  
**Related:** [Business Requirements Document](./BUSINESS_REQUIREMENTS.md) · [Product Requirements Document](./PRODUCT_REQUIREMENTS.md) · [Product Design Specification](./PRODUCT_DESIGN_SPECIFICATION.md)

---

## 1. Overview

This document is the single source of truth for all technical decisions: architecture, module boundaries, runtime behaviour, third-party library choices, and non-negotiable implementation constraints. It completes the document hierarchy:

```
BRD  — Why (goals, constraints, success metrics)
PRD  — What (features, user stories, acceptance criteria)
PDS  — How it looks (design system, component specs)
TDD  — How it works (architecture, data flow, implementation)
```

**Scope:** everything inside the repository. Backend is explicitly out of scope ([BRD §8](./BUSINESS_REQUIREMENTS.md#8-out-of-scope)).

---

## 2. System Architecture

### 2.1 High-level view

```
Browser
 ├── React SPA (single HTML shell + code-split JS chunks)
 │    ├── Static data (src/data/*.ts)          ← typed content, no fetch
 │    ├── PDF generation (@react-pdf/renderer) ← runs in-browser
 │    ├── Browser LLM (Transformers.js)        ← on-device, Llama 3.2 3B
 │    └── Theme / skill-filter state           ← React context only
 │
 └── Static assets (GitHub Pages CDN)
      ├── index.html                           ← Vite entry point
      ├── /assets/  (hashed JS / CSS chunks)
      ├── /fonts/   (self-hosted Inter + JetBrains Mono)
      ├── /images/  (WebP / AVIF rasters)
      ├── Polietaiev_Borys_Resume.pdf          ← pre-generated full resume
      ├── sitemap.xml
      └── robots.txt
```

There is **no backend server**. Every dynamic feature runs in the browser:

| Feature | Runtime | External network |
|---|---|---|
| Full resume download | Static file `<a download>` | None |
| Filtered resume (PDF) | `@react-pdf/renderer` | None |
| Cover letter generation | Transformers.js + Llama 3.2 3B | None |
| Skill filter state | React state | None |

### 2.2 Hosting & delivery

- **Host:** GitHub Pages, served from the `gh-pages` branch.
- **Base path:** `/my-website/` (matches `vite.config.ts base` option). Trivially switchable to `/` for a custom domain ([BRD §9](./BUSINESS_REQUIREMENTS.md#9-assumptions)).
- **CDN:** GitHub's Fastly-backed CDN; all assets are fingerprinted by Vite for maximum-age caching.
- **HTTPS:** enforced by GitHub Pages.

### 2.3 CI/CD pipeline

```
git push → main
  └── GitHub Actions (.github/workflows/deploy.yml)
        1. npm ci
        2. npm test          ← blocks deploy on failure
        3. npm run build     ← tsc -b && vite build
        4. dist/ → gh-pages branch (peaceiris/actions-gh-pages)
```

Pull requests run steps 1–3 only; deploy is skipped.

---

## 3. Tech Stack

| Layer | Library / Tool | Version | Decision rationale |
|---|---|---|---|
| UI framework | React | 19 | Component model, concurrent features (useTransition for PDF generation), huge ecosystem |
| Language | TypeScript | 5.8 | Strict mode; content data files are type-checked at build time |
| Bundler | Vite | 6 | Instant HMR, native ESM, Rollup-based production build with automatic code-splitting |
| Styling | Tailwind CSS | v4 | Zero runtime, utility-first, integrates with Vite via plugin — no PostCSS config needed |
| Testing | Vitest | 3 | Native Vite integration; Jest-compatible API; no config mismatch between test and build |
| DOM testing | React Testing Library | 16 | Encourages behavior testing over implementation testing |
| Icons | Lucide React | latest | Tree-shakeable SVG components; consistent grid; design constraint [PDS DC-09](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries) |
| PDF generation | @react-pdf/renderer | 4.x | React-first: PDF layouts are React components; runs entirely in the browser; no server required |
| Browser LLM | Transformers.js v4 | 4.x | Production-ready; cross-browser; runs Llama 3.2 3B on-device via WebGPU; no API key; fully private ([BRD NF-30–31](./BUSINESS_REQUIREMENTS.md#64-security)) |

**Additions not yet installed** (added when the relevant milestone begins):

| Library | Milestone | Purpose |
|---|---|---|
| `@react-pdf/renderer` | M4 | Client-side PDF generation |
| `@huggingface/transformers` | M5 | Browser LLM for cover letter generation |

No other runtime dependencies are permitted without explicit decision. Rationale: [BRD §7](./BUSINESS_REQUIREMENTS.md#7-technical-constraints) and code-quality goals.

---

## 4. Repository Structure

```
my-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/                          # project documentation
│   ├── BUSINESS_REQUIREMENTS.md
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── PRODUCT_DESIGN_SPECIFICATION.md
│   └── TECHNICAL_DESIGN.md        ← this file
├── public/
│   ├── fonts/                     # self-hosted Inter + JetBrains Mono
│   ├── images/                    # og-image.png, profile.(webp|avif)
│   ├── Polietaiev_Borys_Resume.pdf
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                    # SVG logos, inline assets imported by JS
│   ├── components/                # reusable UI primitives
│   │   ├── ui/                    # Button, Tag, Card, Alert, Spinner, ...
│   │   └── layout/                # Header, Footer, Section, SkipLink
│   ├── sections/                  # one directory per page section
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Experience/
│   │   ├── Projects/
│   │   ├── Resume/
│   │   ├── CoverLetter/
│   │   └── Contact/
│   ├── data/                      # typed content files (owner-editable)
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── contact.ts
│   ├── hooks/                     # shared custom hooks
│   ├── context/                   # React context providers
│   ├── lib/                       # pure utility modules
│   │   ├── pdf/                   # pdf-lib integration
│   │   ├── llm/                   # browser LLM abstraction
│   │   └── seo/                   # JSON-LD builders
│   ├── types/                     # shared TypeScript interfaces
│   ├── index.css                  # @import "tailwindcss"; + CSS custom properties
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   └── test-setup.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

### Co-location rule

Tests live next to the file they test (`Component.test.tsx` beside `Component.tsx`). A `__tests__/` subdirectory is used only when a module generates multiple test files.

---

## 5. Component Architecture

### 5.1 Component categories

| Category | Path | Description |
|---|---|---|
| **UI primitives** | `src/components/ui/` | Stateless, generic: Button, Tag, Card, Alert, Spinner, Input, Textarea, Badge |
| **Layout** | `src/components/layout/` | Header, Footer, Section wrapper, SkipLink, ThemeToggle |
| **Section components** | `src/sections/*/` | Feature-specific, compose primitives. Each folder: `index.tsx` + optional sub-components + `.test.tsx` |
| **Context providers** | `src/context/` | ThemeContext, SkillFilterContext |

### 5.2 Component rules

- Single-responsibility: a component does one thing. If it exceeds ~120 lines, split it.
- No business logic in UI primitives — they accept only presentation props.
- Section components own their local state; they read from context only for cross-section concerns (skill filter, theme).
- `children` prop is preferred over ad-hoc content slots.
- All exported components use named exports (no `export default` except for page-level lazy boundaries).

### 5.3 Section lazy loading

Each section is wrapped with `React.lazy` + `Suspense` so that below-the-fold sections do not block the initial bundle:

```tsx
// src/App.tsx
const Skills    = lazy(() => import('./sections/Skills'));
const Projects  = lazy(() => import('./sections/Projects'));
const CoverLetter = lazy(() => import('./sections/CoverLetter'));
```

The Hero and About sections are imported eagerly (above the fold). All others are lazy. This implements [BRD NF-03](./BUSINESS_REQUIREMENTS.md#61-performance).

---

## 6. State Management

This project uses **React's built-in primitives only** (useState, useReducer, useContext). No external state library is needed at this scale.

### 6.1 State ownership

| State | Owner | Scope |
|---|---|---|
| Active theme (`dark`/`light`) | `ThemeContext` (+ `localStorage`) | Global |
| Selected skills | `SkillFilterContext` | Cross-section (Skills ↔ Resume) |
| Mobile drawer open/closed | `Header` component local state | Local |
| Cover letter form inputs | `CoverLetter` section local state | Local |
| Cover letter output text | `CoverLetter` section local state | Local |
| PDF generation status | `Resume` section local state | Local |
| Scroll-spy active section | `useScrollSpy` custom hook → `Header` | Local |
| "Copied!" transient state | `CoverLetter` section local state | Local |

### 6.2 SkillFilterContext

```ts
// src/context/SkillFilterContext.tsx
interface SkillFilterState {
  selected: Set<string>;            // skill name keys
  toggle: (skill: string) => void;
  selectAll: (category: string) => void;
  clearAll: (category: string) => void;
  reset: () => void;
}
```

State lives in memory only; it resets on page reload ([PRD §5.3](./PRODUCT_REQUIREMENTS.md#53-skills-section-brd-f-03)).

### 6.3 ThemeContext

```ts
// src/context/ThemeContext.tsx
interface ThemeState {
  theme: 'dark' | 'light';
  toggle: () => void;
}
```

On mount, the initial theme is read from `localStorage` (key: `theme`). If absent, `dark` is the default ([PDS §3.1](./PRODUCT_DESIGN_SPECIFICATION.md#31-modes)). The chosen value is written to `data-theme` on `<html>`.

To avoid a flash of wrong theme, a tiny inline `<script>` in `index.html` reads `localStorage` and sets `data-theme` before React hydrates:

```html
<!-- index.html — before </head> -->
<script>
  (function () {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  })();
</script>
```

---

## 7. Data Layer

All content is stored as typed TypeScript modules in `src/data/`. These are compiled into the bundle at build time — there are no runtime API calls for content.

### 7.1 Type definitions (`src/types/data.ts`)

```ts
export interface Profile {
  name: string;
  headline: string;
  summary: string;
  photoPath: string;          // relative to public/
  location: string;
  availability: string;
  resumePdfPath: string;      // relative to public/
}

export interface Skill {
  category: string;
  name: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ExperienceEntry {
  company: string;
  logoPath?: string;
  role: string;
  startDate: string;          // ISO 8601: YYYY-MM
  endDate?: string;           // omit for current role
  achievements: string[];     // 2–5 items
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imagePath?: string;
}

export interface Contact {
  github: string;             // full URL
  linkedin: string;           // full URL
  email: string;
}
```

No `any`. All fields are `string` or explicit unions. Missing optional fields are caught at compile time ([BRD NF-40](./BUSINESS_REQUIREMENTS.md#65-code-quality)).

### 7.2 Public asset paths

Asset paths stored in data files (e.g., `photoPath`) are relative to `public/`. At runtime they are prefixed with Vite's `import.meta.env.BASE_URL` to resolve correctly under the `/my-website/` base path:

```ts
// src/lib/assetUrl.ts
export const assetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
```

---

## 8. Styling Architecture

### 8.1 Tailwind v4 + CSS custom properties

Tailwind v4 no longer uses a JS config file. Configuration is done in CSS. The design tokens defined in [PDS §12](./PRODUCT_DESIGN_SPECIFICATION.md#12-design-tokens--css-custom-properties) are declared in `src/index.css` and referenced by Tailwind's `@theme` block:

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-bg:             var(--color-bg);
  --color-surface:        var(--color-surface);
  --color-accent:         var(--color-accent);
  /* … all tokens mapped */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

/* Dark theme (default) */
[data-theme="dark"] {
  --color-bg:             #0F172A;
  --color-surface:        #1E293B;
  /* … full token set from PDS §12 */
}

/* Light theme */
[data-theme="light"] {
  --color-bg:             #FFFFFF;
  --color-surface:        #F8FAFC;
  /* … full token set from PDS §3.3 */
}
```

Components use only Tailwind utility classes that map to these tokens (e.g., `bg-bg`, `text-accent`, `border-border`). Hard-coded hex values in component files are forbidden ([PDS DC-08](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)).

### 8.2 Custom `xs:` breakpoint

Tailwind v4 allows adding custom breakpoints in CSS:

```css
@theme {
  --breakpoint-xs: 480px;
}
```

This enables the `xs:` prefix used in [PDS §6.1](./PRODUCT_DESIGN_SPECIFICATION.md#61-breakpoints).

### 8.3 Font loading

Inter and JetBrains Mono are self-hosted in `public/fonts/` as `.woff2` files (Latin subset only). They are declared with `@font-face` in `src/index.css` using `font-display: swap`. This satisfies [BRD NF-02](./BUSINESS_REQUIREMENTS.md#61-performance) and [PDS DC-04](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries).

Font files are referenced via `public/fonts/` so Vite copies them to `dist/fonts/` unchanged (no fingerprinting of font files is needed since they are long-lived and rarely change).

---

## 9. Browser LLM Integration

### 9.1 Requirements recap

The cover letter generator must ([BRD NF-30–31](./BUSINESS_REQUIREMENTS.md#64-security)):
- Run entirely in the browser — no API key, no network request.
- Generate a ~250-word professional cover letter from a job description and candidate profile.
- Stream output progressively so the user sees text appear in real time.
- Degrade gracefully when the capability is unavailable.

### 9.2 Options considered

Four approaches were evaluated. All satisfy the privacy constraint (on-device inference, no data sent to any server).

#### Option A — Chrome Prompt API (Gemini Nano)

Chrome's built-in AI exposes `window.ai.languageModel`, backed by Gemini Nano. The model lives inside Chrome; no download is triggered if it is already installed.

| Factor | Assessment |
|---|---|
| API maturity | **Experimental** — in origin trial as of Chrome 131–138; expected stable in Chrome 145–150 (late 2026 / early 2027) |
| Browser support | **Chrome only.** Not available in Firefox, Safari, or Edge. Not available on macOS with Apple M-series chips (confirmed platform limitation). |
| Model download | 4 GB on first use (shared system-level, so may already be present). |
| Bundle impact | Zero — model is part of Chrome, not the app bundle. |
| Implementation complexity | Lowest — ~30 lines of code. |
| Output quality | Adequate for the task; Gemini Nano is a capable instruct model, but no public benchmarks for professional writing. |
| **Verdict** | **Rejected.** The API is not yet stable. Chrome-only coverage eliminates recruiters on Firefox or Safari. The Apple M-chip exclusion is a hard blocker for a significant portion of Mac users. |

#### Option B — Transformers.js v4 (Hugging Face)

`@huggingface/transformers` v4 runs transformer models in the browser via a C++ WebGPU runtime (with WASM fallback). Models are downloaded from Hugging Face Hub on first use and cached in the browser.

| Factor | Assessment |
|---|---|
| API maturity | **Production-ready** — v4 released March 2025, actively maintained by Hugging Face. |
| Browser support | All major browsers with WebGPU (Chrome 113+, Edge 113+, Safari 17.4+, Firefox 141+). WASM fallback for environments without WebGPU. |
| Model download (Llama 3.2 3B, q4) | ~1.9 GB on first visit; cached thereafter. |
| Model download (SmolLM2 1.7B, q4) | ~600 MB on first visit. |
| Bundle impact | ~500 KB (library itself; down 53 % vs v3). Models fetched separately. |
| Implementation complexity | Low — `pipeline()` API; streaming via async generator. |
| Output quality | Llama 3.2 3B scores 63.4 on MMLU; SmolLM2-1.7B scores 56.7 on IFEval. Both produce coherent, professional writing for a 250-word task. |
| **Verdict** | **Selected.** See §9.3. |

#### Option C — WebLLM (@mlc-ai/web-llm)

WebLLM runs models in WebGPU using the MLC inference engine. It exposes an OpenAI-compatible chat completion API.

| Factor | Assessment |
|---|---|
| API maturity | Production-ready, research-backed. |
| Browser support | Same WebGPU coverage as Transformers.js. |
| Model download (Llama 3.2 3B) | ~2.2 GB. |
| Bundle impact | ~400 KB SDK. |
| Implementation complexity | Moderate — models must be in MLC-converted format; smaller model ecosystem than Hugging Face Hub. |
| Output quality | Comparable to Transformers.js for same models. |
| **Verdict** | **Rejected in favour of Transformers.js.** WebLLM's model selection is restricted to pre-converted MLC formats, which limits future flexibility. Transformers.js has direct access to the full Hugging Face Hub catalogue and a larger developer community. |

#### Option D — MediaPipe LLM Inference (Google AI Edge)

MediaPipe's web JS API runs Gemma-family models via WebGPU + WASM.

| Factor | Assessment |
|---|---|
| API maturity | Production, but narrower adoption than competitors. |
| Browser support | Same WebGPU coverage as above. |
| Model selection | Effectively Gemma-only; requires "-Web" suffix variants to stay within browser ArrayBuffer limits. |
| Implementation complexity | Highest of the four — WASM buffer management, model conversion requirements. |
| Output quality | Gemma 2B is adequate but smaller than Llama 3.2 3B; lower quality ceiling. |
| **Verdict** | **Rejected.** Highest complexity, narrowest model selection, no quality advantage. |

---

### 9.3 Decision: Transformers.js v4

**Selected library:** `@huggingface/transformers` v4  
**Primary model:** `meta-llama/Llama-3.2-3B-Instruct` (q4f16 quantisation, ~1.9 GB)  
**Compact fallback model:** `HuggingFaceTB/SmolLM2-1.7B-Instruct` (q4f16, ~600 MB)

**Decision rationale:**

1. **Cross-browser.** Works on Chrome, Edge, Safari, and Firefox — covering the full recruiter/hiring manager audience. The Chrome Prompt API covers only a subset of Chrome users.
2. **Production stability.** v4 is stable and actively maintained. Building on an experimental browser API that ships in stable Chrome 145+ (late 2026) would delay the feature or require a later migration.
3. **Model quality.** Llama 3.2 3B-Instruct produces noticeably more fluent professional prose than 1B models and is the minimum quality bar for a cover letter that a recruiter will read. The q4f16 quantisation keeps the download to ~1.9 GB.
4. **Compact fallback.** SmolLM2-1.7B-Instruct offers a ~600 MB download path for users on slow connections or mobile devices. The UI will detect available GPU memory and select the appropriate model automatically.
5. **Ecosystem flexibility.** Direct access to the full Hugging Face Hub means swapping or upgrading the model requires only a string change, with no library migration.
6. **WASM fallback.** For the minority of users without WebGPU, Transformers.js automatically falls back to a WASM runtime. Generation is slower (~5–10× vs GPU) but still functional.

**Trade-off accepted:** The first-visit model download (600 MB – 1.9 GB) is the main UX cost. This is mitigated by showing a download-progress indicator and storing the model in the browser cache so subsequent visits are instant.

---

### 9.4 Abstraction layer (`src/lib/llm/`)

All LLM calls are isolated behind a module boundary. The rest of the app never imports `@huggingface/transformers` directly.

```
src/lib/llm/
├── index.ts           # public API
├── availability.ts    # WebGPU / WASM detection; model selection
├── engine.ts          # pipeline lifecycle, model loading, caching
├── prompt.ts          # system + user prompt builders
└── types.ts           # shared interfaces
```

**Public API:**

```ts
// src/lib/llm/index.ts

export type LLMStatus =
  | 'unavailable'        // no WebGPU and no WASM fallback available
  | 'needs-download'     // model not cached; download required
  | 'ready';             // model loaded; generation can start immediately

export type ModelTier = 'full' | 'compact';  // Llama 3.2 3B vs SmolLM2 1.7B

export async function getLLMStatus(): Promise<LLMStatus>;

export async function generateCoverLetter(params: {
  jobDescription: string;
  companyName?: string;
  onChunk: (chunk: string) => void;
  onProgress?: (percent: number) => void;  // model download progress
}): Promise<string>;
```

### 9.5 Model selection

The engine selects the model tier based on available GPU memory at startup:

```ts
// src/lib/llm/availability.ts
export async function selectModelTier(): Promise<ModelTier> {
  if (!('gpu' in navigator)) return 'compact';
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) return 'compact';
  const info = await adapter.requestAdapterInfo();
  // requestAdapterInfo().memoryHeapSize is non-standard but available in Chrome/Edge
  const heapGB = (adapter as GPUAdapter & { limits: { maxBufferSize: number } })
    .limits.maxBufferSize / 1e9;
  return heapGB >= 4 ? 'full' : 'compact';
}
```

The selected tier is memoised for the session. The user can override it via a "Use smaller model" toggle in the Cover Letter section UI.

### 9.6 Prompt design

```ts
// src/lib/llm/prompt.ts
export const buildMessages = (params: {
  jobDescription: string;
  companyName?: string;
  profile: Profile;
}): Array<{ role: 'system' | 'user'; content: string }> => {
  const target = params.companyName
    ? `the ${params.companyName} role`
    : 'this role';

  return [
    {
      role: 'system',
      content: `You are writing a professional cover letter on behalf of \
${params.profile.name}, a ${params.profile.headline}. \
Write in first person, confident but not boastful. \
Limit the letter to 3 paragraphs and under 250 words. \
Do not invent facts; use only the information provided.`,
    },
    {
      role: 'user',
      content: `Write a cover letter for ${target}.\n\n\
Job description:\n${params.jobDescription}\n\n\
Candidate summary:\n${params.profile.summary}`,
    },
  ];
};
```

### 9.7 Streaming output

Transformers.js v4 returns an async generator for streaming text generation:

```ts
// src/lib/llm/engine.ts (simplified)
import { pipeline } from '@huggingface/transformers';

export async function streamGeneration(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
): Promise<string> {
  const generator = await pipeline('text-generation', MODEL_ID, {
    device: 'webgpu',
    dtype: 'q4f16',
  });

  let full = '';
  const stream = await generator(messages, { max_new_tokens: 400, do_sample: true });
  for await (const chunk of stream) {
    const text = chunk.generated_text.at(-1)?.content ?? '';
    full += text;
    onChunk(text);
  }
  return full;
}
```

The pipeline instance is created once and reused across generation calls within the same session. It is released (garbage-collected) when the Cover Letter section unmounts.

### 9.8 Graceful degradation

| Status | User-visible behaviour |
|---|---|
| `'unavailable'` | Info banner: "Cover letter generation requires a browser with WebGPU support (Chrome 113+, Edge 113+, Safari 17.4+)." Generate button disabled; form inputs remain editable. |
| `'needs-download'` | Download progress bar shown with estimated size. "Generate" becomes "Download model & generate" on first use. |
| `'ready'` | Normal generation flow ([PRD Flow C](./PRODUCT_REQUIREMENTS.md#flow-c--cover-letter-generation)). |
| Generation error | Error banner with "Try again" button; input values preserved ([PRD §5.9.3](./PRODUCT_REQUIREMENTS.md#593-generation--output)). |

Model download progress is surfaced via Transformers.js's `progress_callback` option and streamed to an `aria-live="polite"` region for screen readers.

---

### 9.9 Abuse prevention (resolves BRD D-3)

#### 9.9.1 Threat model

The cover letter generator runs entirely on the visitor's device. There is no server API, no API key, and no metered resource to protect — generation cost is borne entirely by the visitor's own hardware. The threat to mitigate is **nuisance abuse**: a bot or script repeatedly triggering model loads or generation cycles, which could degrade the page experience and looks unprofessional.

This is a fundamentally different threat model from a server-side LLM endpoint. Solutions that require server-side token verification are incompatible with GitHub Pages and are disproportionate to the risk.

#### 9.9.2 Options considered

All standard captcha providers were evaluated and rejected on the grounds that they require a backend verification call that the static site cannot make.

| Option | Backend required? | Free? | Verdict |
|---|---|---|---|
| **hCaptcha** | Yes — `siteverify` POST | Free tier | **Rejected** — server verification mandatory; token is unverifiable client-side |
| **Cloudflare Turnstile** | Yes — `siteverify` POST | Free | **Rejected** — same reason |
| **reCAPTCHA v2 / v3** | Yes — `siteverify` POST | Free | **Rejected** — same reason; also ships Google tracking |
| **Altcha** | Yes — challenge signing + replay prevention require a server | OSS widget free | **Rejected** — client-only mode has no replay protection; security model explicitly requires backend |
| **Friendly Captcha** | Yes — `api.friendlycaptcha.com` verification | Free tier | **Rejected** — same reason |
| **Client-side PoW (SubtleCrypto)** | No | Free | Raises bar against scripts but bypassable; adds visible delay for real users |
| **Honeypot field** | No | Free | Catches naive bots silently; zero friction |
| **`sessionStorage` rate limiting** | No | Free | Prevents rapid-fire abuse within a session; transparent to real users |
| **Behavioral signals** (`navigator.webdriver`, event timing) | No | Free | Passive detection; no user friction; catches basic automation |

Key finding: **every named captcha provider requires server-side verification**. Without a backend, the token generated by their client widget cannot be authenticated, rendering them security theatre rather than actual protection.

#### 9.9.3 Decision: layered client-side defence

Three lightweight mechanisms are combined. No single mechanism is foolproof, but together they are sufficient for the actual threat model (nuisance prevention on a personal portfolio with no server cost to protect):

**Layer 1 — Honeypot field**

A visually hidden `<input>` named with a plausible-but-irrelevant label (e.g., `website`) is added to the form. It is hidden via an external stylesheet (not `display:none` inline, which bots detect). If the field is non-empty on submit, the generation is silently blocked.

```tsx
{/* Hidden from real users; naive bots fill it */}
<input
  type="text"
  name="website"
  autoComplete="off"
  tabIndex={-1}
  aria-hidden="true"
  className={styles.honeypot}   // position: absolute; opacity: 0; height: 0
/>
```

**Layer 2 — Session rate limit**

Generation attempts are counted in `sessionStorage`. The limit is **3 generations per session** (cleared when the tab closes). When the limit is reached, the Generate button is disabled with a message: "You've reached the generation limit for this session."

```ts
// src/lib/llm/rateLimit.ts
const KEY = 'cl_gen_count';
const LIMIT = 3;

export function canGenerate(): boolean {
  const count = parseInt(sessionStorage.getItem(KEY) ?? '0', 10);
  return count < LIMIT;
}

export function recordGeneration(): void {
  const count = parseInt(sessionStorage.getItem(KEY) ?? '0', 10);
  sessionStorage.setItem(KEY, String(count + 1));
}
```

**Layer 3 — Automation signal check**

Before allowing generation, a passive check flags obvious browser automation:

```ts
// src/lib/llm/botSignals.ts
export function looksLikeBot(): boolean {
  return (
    navigator.webdriver === true ||
    !('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth > 0)
  );
}
```

`navigator.webdriver` is `true` in Selenium, Playwright, and Puppeteer by default (requires explicit patching to hide). This single signal blocks the majority of script-driven abuse.

#### 9.9.4 Combined gate

All three checks are evaluated together in the `useResumePdf`-equivalent hook before generation begins:

```ts
// src/lib/llm/gate.ts
export type GateResult = 'allow' | 'honeypot' | 'rate-limited' | 'bot';

export function evaluateGate(honeypotValue: string): GateResult {
  if (honeypotValue.length > 0) return 'honeypot';
  if (looksLikeBot()) return 'bot';
  if (!canGenerate()) return 'rate-limited';
  return 'allow';
}
```

`'honeypot'` and `'bot'` are silently blocked (no error shown — bots should not know they were detected). `'rate-limited'` shows a user-friendly message.

#### 9.9.5 Acknowledged limitations

This approach does not prevent a determined attacker who reads the source code. It was deliberately chosen because:
1. There is no server cost to protect.
2. The additional friction of a visible captcha would harm legitimate users (recruiters and hiring managers) with no proportionate security benefit.
3. A personal portfolio site is a low-value target; sophisticated attackers have no incentive.

If a backend is added in a future phase, a proper server-verified captcha (Turnstile or hCaptcha) should replace this mechanism.

---

## 10. PDF Generation

### 10.1 Library: @react-pdf/renderer

`@react-pdf/renderer` is a React-first PDF generation library. Resume layouts are defined as React component trees using the library's primitives (`<Document>`, `<Page>`, `<View>`, `<Text>`, `<Image>`). The library compiles them to a PDF byte stream entirely in the browser — no server required ([BRD F-12](./BUSINESS_REQUIREMENTS.md#5-functional-requirements)).

Choosing a React-native API means:
- The resume template is a regular React component, testable with React Testing Library.
- Styling uses a React Native–like `StyleSheet.create()` API (not Tailwind), keeping PDF styles isolated from UI styles.
- Custom fonts are registered once via `Font.register()` and reused across all generated documents.

### 10.2 Module boundary (`src/lib/pdf/`)

```
src/lib/pdf/
├── index.ts           # public API: useResumePdf hook
├── ResumeDocument.tsx # root <Document> component — the PDF template
├── sections/          # <ResumeHeader>, <SummarySection>, <ExperienceSection>
├── styles.ts          # StyleSheet.create() — all PDF styles in one place
├── fonts.ts           # Font.register() calls
└── types.ts           # ResumeData, FilterOptions interfaces
```

### 10.3 Template component

```tsx
// src/lib/pdf/ResumeDocument.tsx
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { FilterOptions } from './types';
import { styles } from './styles';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';

interface Props {
  filter?: FilterOptions;   // undefined = full resume
}

export function ResumeDocument({ filter }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ResumeHeader />
        <SummarySection filter={filter} />
        <ExperienceSection filter={filter} />
      </Page>
    </Document>
  );
}
```

### 10.4 Public API — `useResumePdf` hook

Rather than exposing an imperative `generate()` function, a custom hook drives the download so the component stays declarative:

```ts
// src/lib/pdf/index.ts
export interface FilterOptions {
  selectedSkills: Set<string>;
}

export function useResumePdf(filter?: FilterOptions) {
  const [isGenerating, setGenerating] = useState(false);

  const download = useCallback(async () => {
    setGenerating(true);
    const { pdf } = await import('@react-pdf/renderer');
    const blob = await pdf(<ResumeDocument filter={filter} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filter
      ? 'Polietaiev_Borys_Resume_Tailored.pdf'
      : 'Polietaiev_Borys_Resume.pdf';
    a.click();
    URL.revokeObjectURL(url);
    setGenerating(false);
  }, [filter]);

  return { download, isGenerating };
}
```

### 10.5 Performance

`@react-pdf/renderer` is code-split via a dynamic `import('@react-pdf/renderer')` inside the `download` callback — it is never imported at module scope. Vite automatically emits it as a separate chunk loaded only when the user clicks "Generate". This keeps the initial bundle unaffected.

The `useTransition` hook from React 19 wraps the `download` call in the consuming component so the UI remains interactive during generation:

```tsx
const [isPending, startTransition] = useTransition();
const { download, isGenerating } = useResumePdf(filter);

const handleGenerate = () => {
  startTransition(() => { void download(); });
};
```

### 10.6 Font registration

Inter (the same typeface used on the site) is registered for use inside the PDF so the document matches the brand:

```ts
// src/lib/pdf/fonts.ts
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/my-website/fonts/Inter-Regular.woff2', fontWeight: 400 },
    { src: '/my-website/fonts/Inter-SemiBold.woff2', fontWeight: 600 },
    { src: '/my-website/fonts/Inter-Bold.woff2', fontWeight: 700 },
  ],
});
```

Font files are already committed to `public/fonts/` for self-hosted web use ([PDS DC-04](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)); `@react-pdf/renderer` reuses them at no extra cost.

### 10.7 Template specification (resolves BRD D-2)

#### Page setup

| Property | Value |
|---|---|
| Page size | A4 (595 × 842 pt) |
| Margins | 32 pt top / bottom, 40 pt left / right |
| Default font | Inter (registered in `fonts.ts` — §10.6) |
| Body text color | `#1E293B` |
| Muted text color | `#64748B` |

#### Section layout overview

```
┌────────────────────────────────────────────────────────┐
│ HEADER                                                 │
│  ┌──────────┐  ┌────────────────────────────────────┐  │
│  │  Photo   │  │ Full Name (20 pt, Bold)             │  │
│  │ 72×72 pt │  │ Headline (11 pt, Regular)           │  │
│  └──────────┘  │ Location · Email · GitHub · LinkedIn│  │
│                └────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│ SUMMARY                                                │
│  Profile paragraph                                     │
│  Technical Skills: React, TypeScript, …               │
│  Domain Expertise: Frontend Architecture, …           │
│  Soft Skills: Communication, …                        │
├────────────────────────────────────────────────────────┤
│ EXPERIENCE                                             │
│  Company Name __________________________ Jan 2022 –    │
│  Role / Position                           Present     │
│  • Achievement one                                     │
│  • Achievement two                                     │
│  …                                                     │
└────────────────────────────────────────────────────────┘
```

#### 10.7.1 Header section

Two-column flex row (`flexDirection: 'row'`, no divider):

| Column | Width | Content |
|---|---|---|
| Left (photo) | 88 pt | Profile photo (`<Image src={photoPath}>`), `borderRadius: 44`, padded right 16 pt |
| Right (details) | flex 1 | Name → Headline → contact row |

Contact row items (Location, Email, GitHub URL, LinkedIn URL) separated by ` · `.

**Typography:**

| Element | Size | Weight | Color |
|---|---|---|---|
| Name | 20 pt | 700 | `#0F172A` |
| Headline | 11 pt | 400 | `#334155` |
| Contact row | 9 pt | 400 | `#64748B` |

#### 10.7.2 Section heading style

Shared across all sections:

- Font: Inter SemiBold, 10 pt, `letterSpacing: 1.2`, `textTransform: 'uppercase'`
- Color: `#0F172A`
- Bottom border: 0.5 pt solid `#CBD5E1`
- Margin below heading: 8 pt
- Margin above heading (except first section): 16 pt

#### 10.7.3 Summary section

Sub-blocks rendered in this order:

1. **Profile paragraph** — `profile.summary`, Inter Regular 9.5 pt, `lineHeight: 1.5`, color `#1E293B`. Gap below: 6 pt.
2. **Technical Skills** — label `"Technical Skills: "` (SemiBold) + comma-separated names from `skills` where `category === 'technical' || category === 'language'`. Filtered to `selectedSkills` when a filter is active.
3. **Domain Expertise** — label `"Domain Expertise: "` (SemiBold) + comma-separated names where `category === 'domain'`. Filtered same as above.
4. **Soft Skills** — label `"Soft Skills: "` (SemiBold) + comma-separated names where `category === 'soft'`. Always included — not subject to the skills filter.

Sub-blocks 2–4 use Inter Regular 9 pt, color `#1E293B`; label portion is SemiBold, color `#0F172A`. Sub-blocks are separated by 4 pt gap. If filtering leaves a sub-block with no items, that sub-block is omitted entirely.

#### 10.7.4 Experience section

`ExperienceEntry` items from `experience.ts`, rendered newest-first (data file is kept sorted descending; no runtime re-sort needed).

Per entry:

| Element | Typography | Layout |
|---|---|---|
| Company name | Inter SemiBold, 10 pt, `#0F172A` | Left; same flex row as date (`justifyContent: 'space-between'`) |
| Date range | Inter Regular, 9 pt, `#64748B` | Right-aligned in same row |
| Role / Position | Inter Regular Italic, 9.5 pt, `#334155` | Below company/date row, 2 pt margin top |
| Achievements | Inter Regular, 9 pt, `#1E293B`, `marginLeft: 12 pt`, prefix `"• "` | 2–5 items, 2 pt gap between items |

Date format: `"MMM YYYY"` (e.g., `"Jan 2022"`). Current role: `endDate` absent → render `"Present"`.

Entry gap: 10 pt between consecutive entries.

#### 10.7.5 Filter behavior

| Content | Full resume | Filtered resume |
|---|---|---|
| Header | All fields | All fields |
| Profile paragraph | Included | Included |
| Technical Skills | All `technical` / `language` category skills | Intersected with `selectedSkills` |
| Domain Expertise | All `domain` category skills | Intersected with `selectedSkills` |
| Soft Skills | All `soft` category skills | All (not filtered) |
| Experience entries | All | All |
| Experience achievements | All | All |

Experience entries are never filtered — a recruiter needs the full career history regardless of which skills were selected.

**Output filename:**

| Mode | Filename |
|---|---|
| Full | `Polietaiev_Borys_Resume.pdf` |
| Filtered | `Polietaiev_Borys_Resume_Tailored.pdf` |

---

## 11. SEO Implementation

### 11.1 Static meta tags

All meta tags live in `index.html` (not injected by React) so they are present in the raw HTML served to crawlers.

```html
<!-- index.html -->
<title>Borys Polietaiev — Senior Frontend Engineer</title>
<meta name="description" content="…150–160 chars…">

<!-- Open Graph -->
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://borys-p-ua.github.io/my-website/">
<meta property="og:title"       content="Borys Polietaiev — Senior Frontend Engineer">
<meta property="og:description" content="…">
<meta property="og:image"       content="…/images/og-image.png">

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="Borys Polietaiev — Senior Frontend Engineer">
<meta name="twitter:description" content="…">
<meta name="twitter:image"       content="…/images/og-image.png">

<link rel="canonical" href="https://borys-p-ua.github.io/my-website/">
```

### 11.2 JSON-LD

The `Person` schema is injected into `<head>` as a `<script type="application/ld+json">` block, also in `index.html` (static, not rendered by React):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Borys Polietaiev",
  "jobTitle": "Senior Frontend Engineer",
  "url": "https://borys-p-ua.github.io/my-website/",
  "sameAs": [
    "https://github.com/borys-p-ua",
    "https://linkedin.com/in/…"
  ]
}
```

### 11.3 sitemap.xml and robots.txt

Both files are placed in `public/` and are therefore copied verbatim into `dist/` by Vite at build time.

**robots.txt:**

```
User-agent: *
Allow: /

Sitemap: https://borys-p-ua.github.io/my-website/sitemap.xml
```

**sitemap.xml:** Single URL entry for the SPA root (no additional page URLs). `<lastmod>` is set manually on each release.

---

## 12. Performance Strategy

| Requirement | Implementation |
|---|---|
| LCP < 2.5 s ([BRD §4](./BUSINESS_REQUIREMENTS.md#4-goals-and-success-criteria)) | Hero rendered eagerly; fonts preloaded with `<link rel="preload">`; no above-fold images except profile photo (WebP + `fetchpriority="high"`) |
| CLS < 0.1 | Font space reserved via `font-display: swap` + explicit `line-height` on headings; image dimensions declared with `width`/`height` attributes |
| JS bundle size | Below-fold sections are lazy (`React.lazy`); `@react-pdf/renderer` and `@huggingface/transformers` dynamically imported on demand; Lucide icons tree-shaken by Vite |
| Images | `<picture>` with AVIF + WebP sources; `srcset` + `sizes` on all raster `<img>` elements; decorative SVGs inline |
| Fonts | Self-hosted `.woff2` (Latin subset); `<link rel="preload">` for Inter 400 + 700; `font-display: swap` |
| Caching | Vite fingerprints all JS/CSS/image assets; HTML itself is no-cache (GitHub Pages behaviour) |
| PDF renderer | `@react-pdf/renderer` dynamically imported on demand; cached by browser after first load |

---

## 13. Accessibility Implementation

| PRD requirement | Technical approach |
|---|---|
| Semantic landmarks ([PRD §8](./PRODUCT_REQUIREMENTS.md#8-accessibility-brd-nf-20--nf-23)) | `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` in App structure; each `<section>` has `aria-labelledby` pointing to its `<h2>` |
| Skip link ([PRD §4.3](./PRODUCT_REQUIREMENTS.md#43-skip-link)) | First element in DOM: `<a href="#main-content" className="sr-only focus:not-sr-only …">Skip to main content</a>` |
| Focus management | No `outline: none` without `:focus-visible` replacement ([PDS DC-10](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)); 2 px `accent`-color ring on all interactive elements |
| Skill tag state | `role="checkbox"` + `aria-checked` (or `role="button"` + `aria-pressed`) per tag |
| Loading states | `aria-live="polite"` region updated on LLM generation start/end and PDF generation start/end |
| Error states | `role="alert"` on error banners; errors associated with form fields via `aria-describedby` |
| Drawer close | Escape key closes the mobile drawer; focus returns to the hamburger button |
| Reduced motion | `IntersectionObserver` section reveal animation gated on `window.matchMedia('(prefers-reduced-motion: reduce)')` |
| Color as sole state indicator | Skill tags use both color and `aria-checked`; error inputs use both red border and error icon + text |

---

## 14. Security

| BRD requirement | Implementation |
|---|---|
| No API key in codebase ([NF-30](./BUSINESS_REQUIREMENTS.md#64-security)) | Transformers.js downloads the model to the browser; no key, no `.env` file |
| No data sent to external servers ([NF-31](./BUSINESS_REQUIREMENTS.md#64-security)) | `Content-Security-Policy` `connect-src 'self'` (see below) |
| CSP ([NF-32](./BUSINESS_REQUIREMENTS.md#64-security)) | Delivered via `<meta http-equiv="Content-Security-Policy">` in `index.html` (GitHub Pages does not support custom HTTP headers) |
| No tracking ([NF-33](./BUSINESS_REQUIREMENTS.md#64-security)) | No analytics scripts unless Plausible is added with explicit disclosure |

**CSP (baseline):**

```
default-src 'self';
script-src  'self' 'unsafe-inline';
style-src   'self' 'unsafe-inline';
font-src    'self';
img-src     'self' data:;
connect-src 'self';
frame-src   'none';
object-src  'none';
```

`'unsafe-inline'` is required for the theme-detection inline script and Tailwind's runtime style injection. This is acceptable for a static personal site; a nonce-based approach can be added if requirements change.

---

## 15. Testing Strategy

### 15.1 Coverage targets

| Layer | What to test | Target coverage |
|---|---|---|
| Data types | TypeScript compiler provides full coverage at build time | n/a |
| `src/lib/` utilities | Unit tests for PDF template logic, LLM availability/prompt builders, `assetUrl`, skill-filter logic | ≥ 90 % line coverage |
| Context providers | Unit tests for ThemeContext and SkillFilterContext state transitions | ≥ 90 % |
| UI primitives | Render + interaction tests (Button states, Tag toggle, Alert variants) | ≥ 80 % |
| Section components | Render tests + key user interaction flows (skill toggle updates state, form validation, download trigger) | ≥ 70 % |
| Integration | Full `App` smoke test; scroll-spy active section; theme persistence | Critical paths |

### 15.2 Testing rules

- Query by role/text/label, never by CSS class or test ID ([BRD NF-42](./BUSINESS_REQUIREMENTS.md#65-code-quality)).
- Mock `window.ai` with a test double; do not test the browser LLM itself.
- Mock `@react-pdf/renderer` in section tests; test `ResumeDocument` and its sub-sections as regular React components in isolation.
- `@testing-library/user-event` for all user interactions (clicks, typing) — never `fireEvent` directly.
- Tests must pass in CI before deploy ([BRD NF-43](./BUSINESS_REQUIREMENTS.md#65-code-quality)).
- Tests follow the Arrange–Act–Assert (AAA) pattern; each `it` block has a distinct setup phase, one action, and one assertion group.
- One behavior per test — multiple unrelated assertions in a single `it` block must be split into separate tests.
- Test names follow `describe('<Unit>') + it('should <behavior> [when <condition>]')` convention for readable CI failure output.
- No `test.only`, `describe.only`, or `test.skip` in merged code; enforced by ESLint `vitest/no-focused-tests` and `vitest/no-disabled-tests`.
- Custom hooks are tested via `renderHook` from `@testing-library/react`; hooks must not be tested by coupling them to an arbitrary wrapper component.
- Async assertions use `findBy*` queries or `waitFor`; a bare `await act()` without an assertion inside is forbidden.
- Each test is self-contained: no shared mutable state between `it` blocks; `beforeEach` / `afterEach` resets all fakes and DOM side effects.

### 15.3 LLM test double

```ts
// src/lib/llm/__mocks__/index.ts
export const getLLMStatus = vi.fn().mockResolvedValue('ready');
export const generateCoverLetter = vi.fn().mockResolvedValue('Mock cover letter.');
```

Vitest's automatic mocking (`vi.mock('./lib/llm')`) replaces the real implementation in all component tests that import from `src/lib/llm`.

### 15.4 Accessibility testing

All interactive UI primitives and section components containing forms, buttons, or ARIA widgets are tested for automated accessibility violations using `vitest-axe` (wraps the `axe-core` rule engine):

```ts
// Example: src/components/ui/Button.test.tsx
import { axe } from 'vitest-axe';

it('has no axe violations', async () => {
  const { container } = render(<Button>Download</Button>);
  expect(await axe(container)).toHaveNoViolations();
});
```

The matcher is registered globally in `src/test-setup.ts`:

```ts
import { configureAxe, toHaveNoViolations } from 'vitest-axe';
expect.extend(toHaveNoViolations);
configureAxe({ globalOptions: { rules: [{ id: 'color-contrast', enabled: false }] } });
```

Color-contrast is disabled in the axe config because Tailwind dark-mode utility classes are applied by the browser at runtime; jsdom cannot evaluate them accurately in isolation. Contrast compliance is verified separately via Lighthouse ([§15.5](#155-performance-ci)).

### 15.5 Performance CI

`@lhci/cli` (Lighthouse CI) runs in the GitHub Actions workflow immediately after every successful deploy to GitHub Pages, enforcing the thresholds from [BRD §4](./BUSINESS_REQUIREMENTS.md#4-goals-and-success-criteria):

**`.lighthouserc.json`** (project root):

```json
{
  "ci": {
    "collect": {
      "url": ["https://borys-p-ua.github.io/my-website/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance":   ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:seo":           ["error", { "minScore": 0.95 }],
        "first-contentful-paint":   ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift":  ["error", { "maxNumericValue": 0.1 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

The step is added to `deploy.yml` after the deploy action:

```yaml
- name: Lighthouse CI
  run: npx lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

The workflow fails if any score drops below threshold, catching performance and accessibility regressions before they accumulate.

---

## 16. Build Configuration

### 16.1 vite.config.ts

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-website/',
  build: {
    target: 'es2020',
    sourcemap: false,      // no sourcemaps in production (personal site)
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
```

`manualChunks` ensures React and Lucide are in stable vendor chunks with long cache lifetimes. `@react-pdf/renderer` is not listed here because it is loaded via a dynamic `import()` at runtime and Vite automatically splits it into its own chunk.

### 16.2 TypeScript strict mode

```json
// tsconfig.app.json (additions to the scaffold defaults)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

`noUncheckedIndexedAccess` prevents silent `undefined` bugs when indexing arrays from data files. `exactOptionalPropertyTypes` prevents passing `undefined` where an optional property is absent.

---

## 17. Browser Support

| Browser | Minimum version | Notes |
|---|---|---|
| Chrome / Chromium | 113+ | Full LLM support via WebGPU |
| Edge | 113+ (Chromium) | Full LLM support via WebGPU |
| Safari | 17.4+ | Full LLM support via WebGPU |
| Firefox | 141+ | Full LLM support via WebGPU |
| All browsers < minimum | — | LLM feature unavailable; WASM fallback attempted; graceful degradation shown if WASM also fails |

ES2020 build target covers all the above. The SPA shell and all sections except Cover Letter are fully functional in all listed browsers regardless of WebGPU support.

---

## 18. Deferred Decisions

Inherited from [BRD §11](./BUSINESS_REQUIREMENTS.md#11-open-questions). Technical details to be locked down before the relevant milestone begins.

| ID | Decision | Needed before | Technical impact |
|---|---|---|---|
| ~~D-1~~ | ~~Chrome Prompt API version~~ | **Resolved** — Transformers.js v4 + Llama 3.2 3B-Instruct (q4f16). Minimum browser: WebGPU support (Chrome 113+, Edge 113+, Safari 17.4+, Firefox 141+). WASM fallback for non-WebGPU environments. See §9. | — |
| ~~D-2~~ | ~~PDF template design~~ | **Resolved** — photo + contacts header, summary (profile paragraph, hard/domain/soft skills), experience section. Field inclusion per filter defined in §10.7. | — |
| ~~D-3~~ | ~~Captcha provider~~ | **Resolved** — no third-party captcha. All standard providers require server-side token verification incompatible with GitHub Pages. Replaced with layered client-side defence: honeypot field + session rate limit (3/session) + `navigator.webdriver` signal check. See §9.9. | — |
