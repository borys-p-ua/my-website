# Business Requirements Document — Personal Portfolio Website

## Contents

1. [Purpose](#1-purpose)
2. [Background](#2-background)
3. [Target Audience](#3-target-audience)
4. [Goals and Success Criteria](#4-goals-and-success-criteria)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
   - [6.1 Performance](#61-performance)
   - [6.2 Responsiveness](#62-responsiveness)
   - [6.3 Accessibility](#63-accessibility)
   - [6.4 Security](#64-security)
   - [6.5 Code Quality](#65-code-quality)
7. [Technical Constraints](#7-technical-constraints)
8. [Out of Scope](#8-out-of-scope)
9. [Assumptions](#9-assumptions)
10. [Milestones](#10-milestones)
11. [Open Questions](#11-open-questions)

---

**Version:** 1.3  
**Date:** 2026-05-10  
**Author:** Borys  
**Status:** Approved  
**Related:** [Product Requirements Document](./PRODUCT_REQUIREMENTS.md) · [Product Design Specification](./PRODUCT_DESIGN_SPECIFICATION.md) · [Technical Design](./TECHNICAL_DESIGN.md)

---

## 1. Purpose

This document defines the business requirements for a personal portfolio website. The site has two equally important goals:

1. **Career promotion** — present skills, experience, and contact information to recruiters and hiring managers; provide downloadable resumes (full and role-tailored); generate AI-powered cover letters.
2. **Code showcase** — demonstrate professional engineering craft and responsible AI-assisted development to anyone who reviews the repository.

---

## 2. Background

The site is hosted at `https://borys-p-ua.github.io/my-website/` (GitHub Pages) and built on an existing React 19 + TypeScript + Vite + Tailwind CSS v4 foundation with a GitHub Actions CI/CD pipeline already in place.

---

## 3. Target Audience

| Audience | Primary Need |
|---|---|
| Recruiters / HR | Quick skills overview, one-click resume download |
| Hiring managers | Technical depth, project examples, tailored resume |
| Potential clients / collaborators | Portfolio evidence, contact channel |
| Code reviewers | Clean, well-structured, production-quality source code |

---

## 4. Goals and Success Criteria

| Goal | Success Metric |
|---|---|
| Discoverability | Lighthouse SEO score ≥ 95; indexed by Google within 2 weeks of launch |
| Performance | Lighthouse Performance score ≥ 95 on mobile; LCP < 2.5 s; CLS < 0.1 |
| Accessibility | Lighthouse Accessibility score ≥ 95; WCAG 2.1 AA compliant |
| Resume download | Full PDF available in ≤ 1 click; filtered PDF generated in ≤ 10 s |
| Cover letter UX | Draft generated in ≤ 15 s after user submits job description |
| Code quality | No ESLint errors; 100 % TypeScript strict; meaningful test coverage |
| Mobile experience | Fully usable on 375 px viewport with no horizontal scroll |

---

## 5. Functional Requirements

Full feature specifications, acceptance criteria, and UX flows are defined in the [Product Requirements Document](./PRODUCT_REQUIREMENTS.md). This section provides a traceability index only.

| ID | Feature | PRD Section |
|---|---|---|
| F-01 | Hero / Landing section | [§5.1](./PRODUCT_REQUIREMENTS.md#51-hero-section-brd-f-01) |
| F-02 | About section | [§5.2](./PRODUCT_REQUIREMENTS.md#52-about-section-brd-f-02) |
| F-03 | Skills section (filterable tags) | [§5.3](./PRODUCT_REQUIREMENTS.md#53-skills-section-brd-f-03) |
| F-04 | Experience section | [§5.4](./PRODUCT_REQUIREMENTS.md#54-experience-section-brd-f-04) |
| F-05 | Projects section (card grid, no case studies) | [§5.5](./PRODUCT_REQUIREMENTS.md#55-projects-section-brd-f-05) |
| F-06 | Contact section (details only, no form) | [§5.6](./PRODUCT_REQUIREMENTS.md#56-contact-section-brd-f-06) |
| F-10 | Full resume PDF download (1-click) | [§5.7](./PRODUCT_REQUIREMENTS.md#57-resume-download--full-brd-f-10) |
| F-11 | Filtered resume download (skills + JD input) | [§5.8](./PRODUCT_REQUIREMENTS.md#58-resume-download--filtered-brd-f-11-f-12-f-13) |
| F-12 | Client-side PDF generation (`pdf-lib`) | [§5.8](./PRODUCT_REQUIREMENTS.md#58-resume-download--filtered-brd-f-11-f-12-f-13) |
| F-13 | Both download flows work on mobile and desktop | [§5.8](./PRODUCT_REQUIREMENTS.md#58-resume-download--filtered-brd-f-11-f-12-f-13) |
| F-20 | Cover letter generator section | [§5.9](./PRODUCT_REQUIREMENTS.md#59-cover-letter-generator-brd-f-20--f-26) |
| F-21 | Job description + company name inputs | [§5.9.2](./PRODUCT_REQUIREMENTS.md#592-input-form) |
| F-22 | Browser-native LLM, on-device, no API key | [§5.9.3](./PRODUCT_REQUIREMENTS.md#593-generation--output) |
| F-23 | Editable output textarea | [§5.9.3](./PRODUCT_REQUIREMENTS.md#593-generation--output) |
| F-24 | Copy to clipboard + Download as .txt | [§5.9.4](./PRODUCT_REQUIREMENTS.md#594-post-generation-actions) |
| F-25 | Graceful degradation when LLM unavailable | [§5.9.3](./PRODUCT_REQUIREMENTS.md#593-generation--output) |
| F-26 | Abuse prevention before generation (honeypot + rate limit + bot signal) | [§5.9.2](./PRODUCT_REQUIREMENTS.md#592-input-form) |
| F-30–37 | SEO: meta tags, OG, Twitter Card, JSON-LD, sitemap, robots.txt | [§6](./PRODUCT_REQUIREMENTS.md#6-seo--discoverability-brd-f-30--f-37) |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| ID | Requirement |
|---|---|
| NF-01 | All images must be served in modern formats (WebP / AVIF) with appropriate `srcset` and `sizes`. |
| NF-02 | Fonts must be subset and loaded with `font-display: swap`. |
| NF-03 | JavaScript bundle must be code-split so the above-the-fold content loads without blocking. |
| NF-04 | No render-blocking resources in the critical path. |
| NF-05 | Static assets must be fingerprinted for long-lived cache headers (handled by Vite by default). |

### 6.2 Responsiveness

Breakpoint definitions and grid specs are in [PDS §6](./PRODUCT_DESIGN_SPECIFICATION.md#6-layout--grid). Behavioral acceptance criteria are in [PRD §7](./PRODUCT_REQUIREMENTS.md#7-responsive-design-brd-nf-10--nf-12).

| ID | Requirement |
|---|---|
| NF-10 | Fully functional at 375 px (mobile S) up to 1920 px (large desktop). |
| NF-11 | Navigation must collapse to a hamburger menu on small viewports. |
| NF-12 | Touch targets must be ≥ 44 × 44 px. |

### 6.3 Accessibility

Contrast-compliant palette is defined in [PDS §3](./PRODUCT_DESIGN_SPECIFICATION.md#3-color-system). Behavioral acceptance criteria are in [PRD §8](./PRODUCT_REQUIREMENTS.md#8-accessibility-brd-nf-20--nf-23). Design constraints DC-03 and DC-10 in [PDS §13](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries) enforce implementation rules.

| ID | Requirement |
|---|---|
| NF-20 | All interactive elements are keyboard-navigable with visible focus indicators. |
| NF-21 | Color contrast ratio ≥ 4.5 : 1 for normal text; ≥ 3 : 1 for large text and UI components. |
| NF-22 | Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`). |
| NF-23 | Skip-to-main-content link provided for screen reader users. |

### 6.4 Security

| ID | Requirement |
|---|---|
| NF-30 | The cover letter generator uses a browser-native LLM; no API key is ever present in the codebase or transmitted over the network. |
| NF-31 | All user-supplied text (job description) is passed only to the on-device browser LLM; no data is sent to external servers. |
| NF-32 | Content Security Policy (CSP) headers set to restrict resource origins. |
| NF-33 | No third-party analytics or tracking scripts without disclosure (privacy-respecting analytics only, e.g. Plausible, or none). |

### 6.5 Code Quality

| ID | Requirement |
|---|---|
| NF-40 | Strict TypeScript (`strict: true`, no `any` without explicit suppression comment). |
| NF-41 | ESLint with a recommended rule set; zero violations on CI. |
| NF-42 | Vitest unit and integration tests for all non-trivial logic; components tested with React Testing Library. |
| NF-43 | Tests must pass before any deployment (enforced by the existing CI pipeline). |
| NF-44 | No dead code, no commented-out code, no `TODO` comments in merged code. |
| NF-45 | Components are small, single-responsibility, and easy to read in isolation. |

---

## 7. Technical Constraints

- **Hosting:** GitHub Pages (static files only) — dynamic server logic requires a separate serverless layer.
- **Build pipeline:** The existing GitHub Actions workflow runs `npm test → npm run build → deploy` on every push to `main`.
- **Existing stack:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, Vitest 3 — additions must be compatible.
- **No backend server:** All dynamic features (cover letter generation, filtered PDF) run entirely in the browser; no serverless function is required at this stage. Backend strategy will be revisited if browser LLM support proves insufficient.
- **LLM provider:** Browser-native LLM (Web AI / Prompt API). Specific API and browser support requirements to be defined in the next phase.

---

## 8. Out of Scope

- User accounts or authentication.
- A CMS or admin panel for content management (content is maintained in code / data files).
- Blog or long-form article publishing.
- Server-side rendering (SSR) — the site is fully static with client-side interactivity.
- E-commerce or payment flows.
- Contact form with server-side email delivery — the contact section displays details only.
- Project case studies — portfolio section uses a card-based layout only.

---

## 9. Assumptions

- The owner will supply all content (bio, work history, skills, project descriptions, photo) in a structured data file before the UI is built.
- The cover letter generator is a tool for **visitors** (e.g., a recruiter or hiring manager) to produce a tailored submission draft; it is not a self-service tool for the owner.
- A custom domain may be added later; the design must support a trivial base-path switch (`/my-website/` → `/`).
- Browser LLM availability requires WebGPU support (Chrome 113+, Edge 113+, Safari 17.4+, Firefox 141+) using Transformers.js v4 + Llama 3.2 3B-Instruct. A WASM fallback handles non-WebGPU environments at reduced speed. The UI communicates clearly when the feature is unavailable.

---

## 10. Milestones

| Milestone | Deliverables |
|---|---|
| M1 — Content & Design | Design tokens, color palette, typography; structured data files for all resume content |
| M2 — Core Pages | All sections (Hero → Contact) rendered responsively with real content |
| M3 — SEO & Performance | `robots.txt`, `sitemap.xml`, meta tags, JSON-LD, Lighthouse scores validated |
| M4 — Resume Download | Full PDF download; filtered PDF by skills / job description |
| M5 — Cover Letter Generator | Browser-native LLM integration, streaming/progressive UI, captcha, copy/download, graceful degradation |
| M6 — QA & Polish | Accessibility audit, cross-browser testing, final Lighthouse run, test coverage review |

---

## 11. Open Questions

All initial open questions have been resolved. Remaining decisions deferred to later phases:

| # | Question | Decision |
|---|---|---|
| OQ-1 | Serverless platform for LLM function | **Resolved — no backend.** Browser-native LLM only; serverless strategy revisited if needed. |
| OQ-2 | Abuse prevention for cover letter generator | **Resolved — layered client-side defence** (honeypot + session rate limit + bot signal check). Standard captcha providers require server-side verification incompatible with GitHub Pages. See [TDD §9.9](./TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3). |
| OQ-3 | Contact form with server-side email | **Resolved — out of scope.** Contact section displays details only. |
| OQ-4 | Project case studies | **Resolved — out of scope.** Card-based portfolio list is sufficient. |
| OQ-5 | PDF generation approach | **Resolved — client-side** (`@react-pdf/renderer`). Template details defined in next phase. |

**Remaining deferred decisions (next phase):**

| # | Question | Status |
|---|---|---|
| D-1 | Browser LLM API and minimum browser version requirements | **Resolved** — Transformers.js v4 + Llama 3.2 3B-Instruct. Minimum: WebGPU (Chrome 113+, Edge 113+, Safari 17.4+, Firefox 141+). See [TDD §9](./TECHNICAL_DESIGN.md#9-browser-llm-integration). |
| ~~D-2~~ | ~~PDF template design and which fields are included / excluded per filter~~ | **Resolved** — see [TDD §10.7](./TECHNICAL_DESIGN.md#107-template-specification-resolves-brd-d-2) |
| ~~D-3~~ | ~~Captcha provider selection~~ | **Resolved** — no captcha; honeypot + rate limit + bot signal check. See [TDD §9.9](./TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3). |
