# Product Requirements Document — Personal Portfolio Website

## Contents

1. [Overview](#1-overview)
2. [User Personas](#2-user-personas)
3. [Information Architecture](#3-information-architecture)
4. [Navigation & Shell](#4-navigation--shell)
   - [4.1 Header](#41-header)
   - [4.2 Footer](#42-footer)
   - [4.3 Skip link](#43-skip-link)
5. [Feature Specifications](#5-feature-specifications)
   - [5.1 Hero Section](#51-hero-section-brd-f-01)
   - [5.2 About Section](#52-about-section-brd-f-02)
   - [5.3 Skills Section](#53-skills-section-brd-f-03)
   - [5.4 Experience Section](#54-experience-section-brd-f-04)
   - [5.5 Projects Section](#55-projects-section-brd-f-05)
   - [5.6 Contact Section](#56-contact-section-brd-f-06)
   - [5.7 Resume Download — Full](#57-resume-download--full-brd-f-10)
   - [5.8 Resume Download — Filtered](#58-resume-download--filtered-brd-f-11-f-12-f-13)
   - [5.9 Cover Letter Generator](#59-cover-letter-generator-brd-f-20--f-26)
6. [SEO & Discoverability](#6-seo--discoverability-brd-f-30--f-37)
7. [Responsive Design](#7-responsive-design-brd-nf-10--nf-12)
8. [Accessibility](#8-accessibility-brd-nf-20--nf-23)
9. [Content Requirements](#9-content-requirements)
10. [Key UX Flows](#10-key-ux-flows)
11. [Deferred Decisions](#11-deferred-decisions)

---

**Version:** 1.1  
**Date:** 2026-05-10  
**Author:** Borys  
**Status:** Approved  
**Related:** [Business Requirements Document](./BUSINESS_REQUIREMENTS.md) · [Product Design Specification](./PRODUCT_DESIGN_SPECIFICATION.md) · [Technical Design](./TECHNICAL_DESIGN.md)

---

## 1. Overview

This document translates the business goals defined in the [BRD](./BUSINESS_REQUIREMENTS.md) into concrete product specifications: user stories, acceptance criteria, UX flows, information architecture, and content requirements. Engineers and designers should use this document as the primary reference for what to build and how it should behave.

---

## 2. User Personas

Derived from [BRD §3 Target Audience](./BUSINESS_REQUIREMENTS.md#3-target-audience).

| Persona | Goal | Key Pain Point |
|---|---|---|
| **Recruiter / HR** | Quickly assess fit and share profile with hiring team | Too much noise; needs a fast path to a downloadable resume |
| **Hiring Manager** | Evaluate technical depth and project quality | Generic resumes don't map to the role; wants a tailored view |
| **Client / Collaborator** | Find evidence of delivery capability and a way to reach out | Can't judge quality from a list of technologies alone |
| **Code Reviewer** | Assess engineering craft and AI-assisted workflow | Messy or AI-bloated code is a red flag |

---

## 3. Information Architecture

The site is a **single-page application** with smooth-scroll anchor navigation. All sections live on one URL to maximize SEO consolidation and reduce navigation friction.

### Section order

```
/ (root)
├── #hero          — Name, headline, primary CTA
├── #about         — Bio, photo, key facts
├── #skills        — Filterable skill tags by category
├── #experience    — Work history timeline
├── #projects      — Portfolio cards
├── #resume        — Download controls (full + filtered)
├── #cover-letter  — AI cover letter generator
└── #contact       — Contact detail links
```

### Navigation

A persistent sticky header provides anchor links to each section. On mobile the links collapse into a hamburger menu drawer. The active section is highlighted via scroll-spy.

---

## 4. Navigation & Shell

### 4.1 Header

**User story:** As any visitor, I want a persistent navigation bar so I can jump to any section without scrolling back to the top.

**Acceptance criteria:**
- [ ] Header is fixed to the top of the viewport on all screen sizes.
- [ ] Contains the owner's name/logo on the left and anchor links on the right.
- [ ] On viewports < 768 px, links collapse into a hamburger icon that opens a full-width drawer.
- [ ] The drawer closes when a link is tapped or when the user taps outside.
- [ ] The active section's link is visually distinguished (e.g., underline or color change) using scroll-spy.
- [ ] Header background has sufficient contrast against page content when scrolled (see [PDS §8.5](./PRODUCT_DESIGN_SPECIFICATION.md#85-navigation-header) for exact treatment).

### 4.2 Footer

**Acceptance criteria:**
- [ ] Contains copyright notice and links to GitHub and LinkedIn.
- [ ] Visible on all screen sizes without horizontal scroll.

### 4.3 Skip link

**Acceptance criteria:**
- [ ] A visually hidden "Skip to main content" link is the first focusable element in the DOM; it becomes visible on keyboard focus (supports NF-23).

---

## 5. Feature Specifications

### 5.1 Hero Section *(BRD F-01)*

**User story:** As a recruiter, I want to immediately understand who this person is and what they do, so I can decide in under 10 seconds whether to read further.

**Acceptance criteria:**
- [ ] Displays full name as the primary `<h1>`.
- [ ] Displays a professional headline (role/title) as secondary text.
- [ ] Displays a one-line summary sentence.
- [ ] Primary CTA button labelled "Download Resume" triggers the full PDF download (links to §5.7).
- [ ] Secondary CTA (e.g., "See My Work") smooth-scrolls to the Projects section.
- [ ] Content is legible and non-overlapping at 375 px viewport width.
- [ ] No layout shift after fonts load (font-display: swap + reserved space).

**Design:** See [PDS §11 Hero layout spec](./PRODUCT_DESIGN_SPECIFICATION.md#hero) for min-height, typography sizing, and animation constraints.

---

### 5.2 About Section *(BRD F-02)*

**User story:** As a hiring manager, I want a brief professional bio so I can understand the candidate's background and personality before reviewing skills.

**Acceptance criteria:**
- [ ] Displays a professional photo or avatar (WebP/AVIF, descriptive `alt` text).
- [ ] Displays a short bio (2–4 sentences).
- [ ] Displays 3–5 key personal/professional facts as a scannable list (e.g., years of experience, location, availability).
- [ ] Photo and text are side-by-side on desktop; stacked vertically on mobile.

---

### 5.3 Skills Section *(BRD F-03)*

**User story:** As a recruiter, I want to see skills organized by category so I can quickly confirm technology alignment without reading a wall of text.

**User story:** As a hiring manager using the resume filter, I want to select specific skills so the downloaded resume is tailored to my open role.

**Acceptance criteria:**
- [ ] Skills are grouped into named categories (e.g., Frontend, Backend, DevOps, Tools, Languages).
- [ ] Each skill is rendered as a tag/chip with the skill name and optionally a proficiency indicator.
- [ ] Each tag has a checkbox or toggle state for use by the resume filter flow (§5.8).
- [ ] "Select all" / "Clear all" controls are available per category.
- [ ] Selected skill count is shown (e.g., "12 of 24 selected").
- [ ] Filter state persists in component memory while the user navigates the page; it resets on page reload.

---

### 5.4 Experience Section *(BRD F-04)*

**User story:** As a hiring manager, I want a clear work history so I can assess seniority and career progression at a glance.

**Acceptance criteria:**
- [ ] Entries are displayed in reverse-chronological order.
- [ ] Each entry shows: company name, role/title, date range, and 2–5 achievement bullets.
- [ ] Company logos are displayed where available (WebP/AVIF, with `alt` fallback to company name).
- [ ] The layout is scannable on mobile (single-column timeline or card stack).

---

### 5.5 Projects Section *(BRD F-05)*

**User story:** As a client or collaborator, I want to see concrete examples of delivered work so I can judge delivery capability.

**Acceptance criteria:**
- [ ] Projects are displayed as a responsive card grid (2 columns on desktop, 1 on mobile).
- [ ] Each card shows: project title, 1–2 sentence description, tech tag list, and action links.
- [ ] Action links include "Live demo" (if available) and "GitHub" — both open in a new tab with `rel="noopener noreferrer"`.
- [ ] Tech tags on project cards are visually consistent with tags in the Skills section.
- [ ] Cards have a visible hover/focus state.
- [ ] No case studies; clicking a card does not navigate to a detail page.

---

### 5.6 Contact Section *(BRD F-06)*

**User story:** As any visitor, I want to find contact details quickly so I can reach out without having to hunt through the page.

**Acceptance criteria:**
- [ ] Displays GitHub profile link, LinkedIn profile link, and email address.
- [ ] Each contact item is an accessible link with a recognizable icon and visible label.
- [ ] Email link uses `mailto:` and reveals the address visually (no obfuscation that breaks accessibility).
- [ ] All links open in a new tab with `rel="noopener noreferrer"` except email.
- [ ] No contact form is present.

---

### 5.7 Resume Download — Full *(BRD F-10)*

**User story:** As a recruiter, I want to download a complete resume PDF in one click so I can share it internally without any friction.

**Acceptance criteria:**
- [ ] A "Download Full Resume" button is present in the Hero section (primary CTA) and in the Resume section.
- [ ] Clicking the button immediately triggers a browser file download of a pre-generated PDF.
- [ ] The PDF filename follows the pattern `[Name]_Resume.pdf`.
- [ ] The PDF is served as a static asset (no client-side generation required for the full version).
- [ ] Works on mobile and desktop browsers.

---

### 5.8 Resume Download — Filtered *(BRD F-11, F-12, F-13)*

**User story:** As a hiring manager, I want to generate a resume tailored to my open role (by selecting relevant skills or pasting the job description) so that I can evaluate fit more efficiently.

**Acceptance criteria:**

*Input — Skills filter:*
- [ ] The Resume section shows the same skill tags as §5.3, pre-populated with the current selection state from the Skills section.
- [ ] User can toggle individual skills or use "Select all" / "Clear all" per category.

*Input — Job description filter:*
- [ ] A text area labelled "Paste job description (optional)" accepts free text.
- [ ] When a job description is provided, the system parses it client-side and pre-selects matching skills automatically.
- [ ] The user can review and adjust the auto-selection before generating.

*Generation:*
- [ ] A "Generate Tailored Resume" button is enabled only when at least one skill is selected.
- [ ] PDF generation runs entirely in the browser (`@react-pdf/renderer`); no data leaves the device.
- [ ] A loading indicator is shown during generation (target: ≤ 10 s per [BRD §4](./BUSINESS_REQUIREMENTS.md#4-goals-and-success-criteria)).
- [ ] The generated PDF includes only the experience bullets and skills relevant to the selection.
- [ ] The PDF filename follows the pattern `[Name]_Resume_Tailored.pdf`.
- [ ] Works on mobile and desktop.

**Template:** Header (photo + contacts), Summary (profile paragraph, hard skills, domain expertise, soft skills), Experience. Field inclusion rules per filter: see [TDD §10.7](./TECHNICAL_DESIGN.md#107-template-specification-resolves-brd-d-2). (Resolves BRD D-2.)

---

### 5.9 Cover Letter Generator *(BRD F-20 – F-26)*

**User story:** As a recruiter or hiring manager, I want to generate a tailored cover letter for this candidate based on a job description, so I can see what a strong application would look like for my role.

**User story:** As any visitor, I want the tool to work without me creating an account or providing an API key.

#### 5.9.1 Entry point

**Acceptance criteria:**
- [ ] The Cover Letter section is accessible via the sticky navigation and the `#cover-letter` anchor.
- [ ] A brief explainer (1–2 sentences) describes what the tool does and that generation is private and on-device.

#### 5.9.2 Input form

**Acceptance criteria:**
- [ ] Text area labelled "Job description" (required); minimum 50 characters before submission is enabled.
- [ ] Input field labelled "Company name" (optional, max 100 chars).
- [ ] Character counter displayed below the job description field.
- [ ] Abuse prevention runs silently before generation: honeypot field check, session rate limit (3 generations per session), and browser-automation signal check. No visible captcha widget is shown to legitimate users (see [TDD §9.9](./TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3)).
- [ ] When the session rate limit is reached, the "Generate" button is disabled with the message "You've reached the generation limit for this session."
- [ ] "Generate" button is disabled while generation is in progress.

#### 5.9.3 Generation & output

**Acceptance criteria:**
- [ ] On submission, the system checks for browser LLM availability; if unavailable, a friendly inline message is shown explaining the limitation and suggesting a compatible browser (e.g., Chrome with Prompt API enabled).
- [ ] While generating, a visible progress indicator (spinner or streaming text) is shown.
- [ ] The generated letter appears in an editable `<textarea>` below the form.
- [ ] Generation must complete in ≤ 15 s (per [BRD §4](./BUSINESS_REQUIREMENTS.md#4-goals-and-success-criteria)).
- [ ] If generation fails, a clear error message is shown with a "Try again" option; the input values are preserved.

#### 5.9.4 Post-generation actions

**Acceptance criteria:**
- [ ] "Copy to clipboard" button copies the full letter text; button label changes to "Copied!" for 2 s.
- [ ] "Download as .txt" button triggers a browser download of the letter as a plain-text file.
- [ ] "Regenerate" button re-runs generation with the same inputs (requires captcha re-solve).
- [ ] "Clear" button resets the form and output.

---

## 6. SEO & Discoverability *(BRD F-30 – F-37)*

**Acceptance criteria:**
- [ ] `<title>` tag: `[Full Name] — [Role/Title]` (e.g., `Borys — Senior Frontend Engineer`).
- [ ] `<meta name="description">` tag: 150–160 characters summarising the site.
- [ ] Open Graph tags present: `og:title`, `og:description`, `og:image` (1200 × 630 px PNG/JPG), `og:url`, `og:type: website`.
- [ ] Twitter Card tags present: `twitter:card: summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] `<link rel="canonical">` pointing to the production URL.
- [ ] JSON-LD `Person` schema embedded in `<head>` with at minimum: `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn).
- [ ] `sitemap.xml` generated at build time, placed in `public/` so Vite copies it to `dist/`.
- [ ] `robots.txt` placed in `public/` with `Sitemap:` directive pointing to the sitemap URL; all crawlers allowed.
- [ ] All `<img>` elements have non-empty, descriptive `alt` attributes.
- [ ] Page passes Google's Rich Results Test for the `Person` schema.

---

## 7. Responsive Design *(BRD NF-10 – NF-12)*

Breakpoint definitions (min widths, Tailwind prefixes, layout changes per breakpoint) are the canonical responsibility of [PDS §6.1](./PRODUCT_DESIGN_SPECIFICATION.md#61-breakpoints). Grid column rules per section are in [PDS §6.4](./PRODUCT_DESIGN_SPECIFICATION.md#64-grid-columns).

**Acceptance criteria:**
- [ ] No horizontal scrollbar at any breakpoint from 375 px to 1920 px.
- [ ] All touch targets (buttons, links, tags) are ≥ 44 × 44 px on mobile.
- [ ] Navigation collapses to hamburger at < 768 px.
- [ ] Project cards stack to 1 column at < 768 px.
- [ ] Skills tags wrap naturally; no overflow clipping.
- [ ] PDF generation and cover letter flows are fully operable on touch devices.

---

## 8. Accessibility *(BRD NF-20 – NF-23)*

Color palette compliance with WCAG contrast ratios is verified in [PDS §3.4](./PRODUCT_DESIGN_SPECIFICATION.md#34-contrast-compliance). Interaction constraints (no `outline: none` without replacement, color not as sole state signal) are enforced via [PDS §13 Design Constraints](./PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries) DC-03 and DC-10.

**Acceptance criteria:**
- [ ] Semantic HTML5 landmarks used throughout: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`.
- [ ] All sections have an `aria-labelledby` pointing to their heading.
- [ ] All interactive elements are reachable and operable by keyboard alone (Tab, Enter, Space, Escape for modals/drawers).
- [ ] Focus indicators are always visible; never removed via `outline: none` without a custom replacement (PDS DC-10).
- [ ] Color contrast ≥ 4.5 : 1 for body text; ≥ 3 : 1 for large text (≥ 18 pt or ≥ 14 pt bold) and UI component boundaries.
- [ ] Skill filter tags indicate selected state via `aria-pressed` or `aria-checked` — not color alone (PDS DC-03).
- [ ] Loading and error states are announced via `aria-live` regions.
- [ ] Skip-to-main-content link is the first focusable element (see §4.3).
- [ ] Lighthouse Accessibility score ≥ 95 on final build.

---

## 9. Content Requirements

All resume and portfolio content must be provided by the owner in structured TypeScript data files (under `src/data/`) before the UI is built. Required data shapes:

| File | Contents |
|---|---|
| `profile.ts` | Name, headline, summary, photo path, location, availability |
| `skills.ts` | Array of `{ category, name, proficiency? }` |
| `experience.ts` | Array of `{ company, logo?, role, startDate, endDate?, achievements[] }` |
| `projects.ts` | Array of `{ title, description, tags[], liveUrl?, githubUrl?, image? }` |
| `contact.ts` | `{ github, linkedin, email }` |
| `resume.pdf` | Pre-generated full resume PDF placed in `public/` |

Content files use TypeScript types (not `any`) so missing fields are caught at build time.

---

## 10. Key UX Flows

### Flow A — Full resume download

```
Visitor lands on Hero
  → clicks "Download Resume"
  → browser downloads [Name]_Resume.pdf immediately
  (no modal, no redirect)
```

### Flow B — Filtered resume download

```
Visitor scrolls to Skills section
  → toggles relevant skill tags (or)
  → scrolls to Resume section, pastes job description
      → system auto-selects matching skills
      → visitor reviews/adjusts selection
  → clicks "Generate Tailored Resume"
  → loading indicator shown (≤ 10 s)
  → browser downloads [Name]_Resume_Tailored.pdf
```

### Flow C — Cover letter generation

```
Visitor scrolls to Cover Letter section
  → reads explainer text
  → pastes job description (required)
  → optionally enters company name
  → solves captcha
  → clicks "Generate"
  → progress indicator shown
  → letter appears in editable textarea (≤ 15 s)
  → visitor edits if desired
  → clicks "Copy to clipboard" or "Download as .txt"
```

### Flow D — Browser LLM unavailable

```
Visitor opens Cover Letter section
  → clicks "Generate" after captcha
  → system detects no browser LLM support
  → inline message: "Cover letter generation requires a browser with
     WebGPU support (Chrome 113+, Edge 113+, Safari 17.4+, Firefox 141+).
     Please try in a compatible browser."
  → form inputs remain intact
```

---

## 11. Deferred Decisions

Carried from [BRD §11](./BUSINESS_REQUIREMENTS.md#11-open-questions). To be resolved before the relevant milestone begins.

| ID | Decision | Needed before |
|---|---|---|
| ~~D-1~~ | ~~Browser LLM API and minimum version~~ | **Resolved** — see [TDD §9](./TECHNICAL_DESIGN.md#9-browser-llm-integration) |
| D-2 | PDF template design and field inclusion/exclusion rules per filter | M4 — Resume Download |
| ~~D-3~~ | ~~Captcha provider~~ | **Resolved** — see [TDD §9.9](./TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3) |
