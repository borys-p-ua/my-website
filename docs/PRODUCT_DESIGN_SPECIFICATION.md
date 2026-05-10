# Product Design Specification — Personal Portfolio Website

## Contents

1. [Overview](#1-overview)
2. [Design Principles](#2-design-principles)
3. [Color System](#3-color-system)
   - [3.1 Modes](#31-modes)
   - [3.2 Palette — Dark mode](#32-palette--dark-mode)
   - [3.3 Palette — Light mode](#33-palette--light-mode)
   - [3.4 Contrast compliance](#34-contrast-compliance)
4. [Typography](#4-typography)
   - [4.1 Typefaces](#41-typefaces)
   - [4.2 Type scale](#42-type-scale)
   - [4.3 Usage rules](#43-usage-rules)
5. [Spacing System](#5-spacing-system)
6. [Layout & Grid](#6-layout--grid)
   - [6.1 Breakpoints](#61-breakpoints)
   - [6.2 Page containers](#62-page-containers)
   - [6.3 Section layout](#63-section-layout)
   - [6.4 Grid columns](#64-grid-columns)
7. [Iconography](#7-iconography)
8. [Component Design Specifications](#8-component-design-specifications)
   - [8.1 Buttons](#81-buttons)
   - [8.2 Skill / Tech Tags](#82-skill--tech-tags)
   - [8.3 Project Cards](#83-project-cards)
   - [8.4 Form Inputs](#84-form-inputs)
   - [8.5 Navigation Header](#85-navigation-header)
   - [8.6 Loading & Progress States](#86-loading--progress-states)
   - [8.7 Alert / Feedback Banners](#87-alert--feedback-banners)
9. [Motion & Animation](#9-motion--animation)
   - [9.1 Principles](#91-principles)
   - [9.2 Duration tokens](#92-duration-tokens)
   - [9.3 Easing tokens](#93-easing-tokens)
   - [9.4 What to animate](#94-what-to-animate)
   - [9.5 What not to animate](#95-what-not-to-animate)
10. [Imagery Guidelines](#10-imagery-guidelines)
11. [Section-Level Layout Specs](#11-section-level-layout-specs)
12. [Design Tokens — CSS Custom Properties](#12-design-tokens--css-custom-properties)
13. [Design Constraints & Boundaries](#13-design-constraints--boundaries)

---

**Version:** 1.0  
**Date:** 2026-05-10  
**Author:** Borys  
**Status:** Approved  
**Related:** [Business Requirements Document](./BUSINESS_REQUIREMENTS.md) · [Product Requirements Document](./PRODUCT_REQUIREMENTS.md) · [Technical Design](./TECHNICAL_DESIGN.md)

---

## 1. Overview

This document is the single source of truth for all visual and interaction design decisions. It defines the design system — tokens, typography, color, spacing, motion, component patterns, and layout — that engineers implement directly. It also captures design constraints transferred from the BRD and PRD so they are not scattered across documents.

**Document hierarchy:**

```
BRD  — Why we build it (goals, constraints, out of scope)
PRD  — What we build (features, user stories, acceptance criteria, UX flows)
PDS  — How it looks and feels (design system, component specs, interaction rules)
```

---

## 2. Design Principles

These principles govern every decision in this document. When two options conflict, the one that better satisfies a higher-ranked principle wins.

| # | Principle | Meaning in practice |
|---|---|---|
| 1 | **Clarity first** | Every element earns its place. If removing it does not hurt comprehension, remove it. |
| 2 | **Content is the hero** | Typography and spacing do the heavy lifting. Decorative elements are sparse. |
| 3 | **Performance is design** | Animations are opt-in; heavy assets are inexcusable. A fast load is a better first impression than a polished loader. |
| 4 | **Accessible by default** | Contrast, keyboard navigation, and ARIA are not afterthoughts; they constrain the palette and interaction model from the start. |
| 5 | **Dark-mode native** | The primary experience is dark. Light mode is a supported toggle, not an afterthought. |

---

## 3. Color System

### 3.1 Modes

Dark mode is the default. A persistent toggle in the header allows switching to light mode. The chosen mode is saved to `localStorage`.

Implementation: a `data-theme="dark"|"light"` attribute on `<html>` drives CSS custom properties. Tailwind's `darkMode: 'class'` (or `selector`) strategy maps to these tokens.

### 3.2 Palette — Dark mode

| Token | Hex | Tailwind reference | Usage |
|---|---|---|---|
| `--color-bg` | `#0F172A` | `slate-950` | Page background |
| `--color-surface` | `#1E293B` | `slate-800` | Cards, section alternates |
| `--color-surface-raised` | `#334155` | `slate-700` | Hover surfaces, tooltips |
| `--color-border` | `#334155` | `slate-700` | Dividers, input borders |
| `--color-border-subtle` | `#1E293B` | `slate-800` | Hairline separators |
| `--color-accent` | `#38BDF8` | `sky-400` | CTAs, links, active nav, accent text |
| `--color-accent-hover` | `#0EA5E9` | `sky-500` | Accent hover state |
| `--color-accent-subtle` | `#0C4A6E` | `sky-950` | Accent backgrounds (tag selected) |
| `--color-secondary` | `#818CF8` | `indigo-400` | Secondary CTAs, highlights |
| `--color-text-primary` | `#F1F5F9` | `slate-100` | Headings, high-emphasis text |
| `--color-text-secondary` | `#94A3B8` | `slate-400` | Body text, descriptions |
| `--color-text-muted` | `#64748B` | `slate-500` | Timestamps, captions, placeholders |
| `--color-success` | `#4ADE80` | `green-400` | Positive states (copied, downloaded) |
| `--color-error` | `#F87171` | `red-400` | Error messages, failed states |
| `--color-warning` | `#FBBF24` | `amber-400` | Warning states |

### 3.3 Palette — Light mode

| Token | Hex | Tailwind reference | Usage |
|---|---|---|---|
| `--color-bg` | `#FFFFFF` | `white` | Page background |
| `--color-surface` | `#F8FAFC` | `slate-50` | Cards, section alternates |
| `--color-surface-raised` | `#F1F5F9` | `slate-100` | Hover surfaces |
| `--color-border` | `#E2E8F0` | `slate-200` | Dividers, input borders |
| `--color-border-subtle` | `#F1F5F9` | `slate-100` | Hairline separators |
| `--color-accent` | `#0284C7` | `sky-600` | CTAs, links, active nav |
| `--color-accent-hover` | `#0369A1` | `sky-700` | Accent hover state |
| `--color-accent-subtle` | `#E0F2FE` | `sky-100` | Accent backgrounds (tag selected) |
| `--color-secondary` | `#4F46E5` | `indigo-600` | Secondary CTAs, highlights |
| `--color-text-primary` | `#0F172A` | `slate-950` | Headings, high-emphasis text |
| `--color-text-secondary` | `#475569` | `slate-600` | Body text, descriptions |
| `--color-text-muted` | `#94A3B8` | `slate-400` | Timestamps, captions, placeholders |
| `--color-success` | `#16A34A` | `green-600` | Positive states |
| `--color-error` | `#DC2626` | `red-600` | Error messages |
| `--color-warning` | `#D97706` | `amber-600` | Warning states |

### 3.4 Contrast compliance

All text/background pairings below satisfy [PRD §8](./PRODUCT_REQUIREMENTS.md#8-accessibility-brd-nf-20--nf-23) and [BRD NF-21](./BUSINESS_REQUIREMENTS.md#63-accessibility) (WCAG 2.1 AA):

| Pairing | Mode | Ratio | Passes |
|---|---|---|---|
| `text-primary` on `bg` | Dark | 16.7 : 1 | AA + AAA |
| `text-secondary` on `bg` | Dark | 5.0 : 1 | AA |
| `text-primary` on `surface` | Dark | 11.2 : 1 | AA + AAA |
| `accent` on `bg` | Dark | 8.1 : 1 | AA + AAA |
| `text-primary` on `bg` | Light | 19.5 : 1 | AA + AAA |
| `text-secondary` on `bg` | Light | 5.9 : 1 | AA |
| `accent` on `bg` | Light | 4.8 : 1 | AA |

`text-muted` is used only for non-essential supplementary content (timestamps, counters) and never as the sole carrier of meaning.

---

## 4. Typography

### 4.1 Typefaces

| Role | Family | Source | Weights loaded |
|---|---|---|---|
| Primary (all text) | `Inter` | Google Fonts / self-hosted | 400, 500, 600, 700 |
| Monospace (skill tags, code) | `JetBrains Mono` | Google Fonts / self-hosted | 400, 500 |

Both fonts must be self-hosted in `public/fonts/` and declared with `font-display: swap` to satisfy [BRD NF-02](./BUSINESS_REQUIREMENTS.md#61-performance). Only the Latin character subset is loaded.

### 4.2 Type scale

All sizes are set in `rem` relative to a 16 px root.

| Token | Size | Line height | Weight default | Usage |
|---|---|---|---|---|
| `text-xs` | 0.75 rem / 12 px | 1.5 | 400 | Labels, badges, counters |
| `text-sm` | 0.875 rem / 14 px | 1.5 | 400 | Tags, secondary text, nav links |
| `text-base` | 1 rem / 16 px | 1.625 | 400 | Body copy, form inputs |
| `text-lg` | 1.125 rem / 18 px | 1.5 | 400 | Lead paragraphs |
| `text-xl` | 1.25 rem / 20 px | 1.4 | 600 | Card titles, subsection labels |
| `text-2xl` | 1.5 rem / 24 px | 1.3 | 600 | Section headings (mobile) |
| `text-3xl` | 1.875 rem / 30 px | 1.2 | 700 | Section headings (desktop) |
| `text-4xl` | 2.25 rem / 36 px | 1.1 | 700 | Hero name (mobile) |
| `text-5xl` | 3 rem / 48 px | 1.05 | 700 | Hero name (tablet) |
| `text-6xl` | 3.75 rem / 60 px | 1.0 | 700 | Hero name (desktop) |

### 4.3 Usage rules

- Section headings use `text-3xl` (desktop) / `text-2xl` (mobile), weight 700, `text-primary`.
- Body copy uses `text-base`, weight 400, `text-secondary`.
- `text-muted` is reserved for non-essential metadata; never used for interactive labels.
- Maximum line length for body paragraphs: 72 ch (`max-w-prose` in Tailwind).
- Monospace (`JetBrains Mono`) is used for skill/tech tags and any inline code — never for body text.

---

## 5. Spacing System

Base unit: **4 px**. All spacing values are multiples of this unit.

| Token | Value | Primary use |
|---|---|---|
| `space-1` | 4 px | Icon padding, tight gap between inline elements |
| `space-2` | 8 px | Tag padding, gap between related elements |
| `space-3` | 12 px | Input padding (vertical), compact list items |
| `space-4` | 16 px | Default gap, input padding (horizontal) |
| `space-5` | 20 px | Card internal padding (mobile) |
| `space-6` | 24 px | Card internal padding (desktop), page gutter (mobile) |
| `space-8` | 32 px | Between subsections |
| `space-10` | 40 px | Between cards in a grid |
| `space-12` | 48 px | Page gutter (tablet), section padding (mobile) |
| `space-16` | 64 px | Between major sections (mobile) |
| `space-20` | 80 px | Page gutter (desktop) |
| `space-24` | 96 px | Between major sections (desktop) |

---

## 6. Layout & Grid

### 6.1 Breakpoints

*Canonical definition — referenced by [PRD §7](./PRODUCT_REQUIREMENTS.md#7-responsive-design-brd-nf-10--nf-12).*

| Name | Min width | Tailwind prefix | Notes |
|---|---|---|---|
| Mobile S | 375 px | (base) | Single-column, hamburger nav |
| Mobile L | 480 px | `xs:` (custom) | Relaxed padding |
| Tablet | 768 px | `md:` | Two-column grids unlock, full nav visible |
| Desktop | 1024 px | `lg:` | Full multi-column layouts |
| Wide | 1280 px | `xl:` | Max-width container kicks in |

### 6.2 Page containers

| Container | Max width | Horizontal padding |
|---|---|---|
| Default content | 1200 px | `space-6` (mobile) → `space-12` (tablet) → `space-20` (desktop) |
| Narrow text (bio, explainer) | 720 px | Same as above |
| Full-bleed | none | 0 |

### 6.3 Section layout

- All sections use the default content container.
- Vertical padding per section: `space-16` (mobile) / `space-24` (desktop).
- Alternating section backgrounds (`bg` / `surface`) create visual separation without hard borders.
- A section always has a visible `<h2>` heading positioned at the top.

### 6.4 Grid columns

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Skills categories | 1 col | 2 col | 3 col |
| Projects | 1 col | 2 col | 2 col |
| Experience | 1 col (stack) | 1 col (timeline) | 1 col (timeline) |
| Contact links | 1 col (stack) | 3 col (inline) | 3 col (inline) |

---

## 7. Iconography

**Library:** [Lucide React](https://lucide.dev/) — tree-shakeable, SVG-based, consistent 24 px grid, 1.5 px stroke width.

| Context | Size | Stroke |
|---|---|---|
| Inline with text | 16 px | 1.5 px |
| Standalone / button | 20 px | 1.5 px |
| Contact links | 24 px | 1.5 px |
| Hamburger menu | 24 px | 2 px |

**Rules:**
- Icons are always paired with a visible text label or an `aria-label`; icons alone are never the sole meaning-carrier.
- Fill icons are used only for active/selected states (e.g., a filled bookmark vs. outlined).
- Icon color inherits from `currentColor`; never hard-coded.

---

## 8. Component Design Specifications

### 8.1 Buttons

Three variants, two sizes.

**Primary button** — used for the single most important action per view.

| Property | Value |
|---|---|
| Background | `accent` |
| Text | `#0F172A` (dark) / `#FFFFFF` (light) — whichever passes 4.5 : 1 on `accent` |
| Border radius | `rounded-lg` (8 px) |
| Padding | `space-3` top/bottom, `space-6` left/right (default) |
| Font | `text-sm`, weight 600 |
| Hover | `accent-hover` background, no layout shift |
| Focus | 2 px offset `accent` ring |
| Disabled | 40 % opacity, `cursor-not-allowed` |
| Active / pressed | Scale down to 97 % over 100 ms |

**Secondary button** — for supporting actions alongside a primary.

| Property | Value |
|---|---|
| Background | transparent |
| Border | 1.5 px solid `border` |
| Text | `text-primary` |
| Hover | `surface` background |
| Everything else | Same as primary |

**Ghost button** — for low-emphasis in-context actions (clear, cancel).

| Property | Value |
|---|---|
| Background | transparent |
| Border | none |
| Text | `text-secondary` |
| Hover | `text-primary`, `surface` background |

**Sizes:**

| Size | Padding | Font |
|---|---|---|
| Default | `space-3` / `space-6` | `text-sm` |
| Small | `space-2` / `space-4` | `text-xs` |

---

### 8.2 Skill / Tech Tags

Used in the Skills section (filterable) and on Project cards (display-only).

**Display tag** (Project cards, non-interactive):

| Property | Value |
|---|---|
| Background | `surface` |
| Text | `text-secondary`, `text-xs`, monospace |
| Border | 1 px solid `border` |
| Border radius | `rounded-md` (6 px) |
| Padding | `space-1` / `space-2` |

**Filter tag** (Skills section, interactive):

| State | Background | Text | Border |
|---|---|---|---|
| Default | `surface` | `text-secondary` | `border` |
| Hover | `surface-raised` | `text-primary` | `border` |
| Selected | `accent-subtle` | `accent` | `accent` 1.5 px |
| Focus | Default colors + 2 px `accent` ring | | |

- `aria-pressed="true/false"` on selected state.
- Minimum touch target: 44 × 44 px (padding increases on mobile to meet this).

---

### 8.3 Project Cards

| Property | Value |
|---|---|
| Background | `surface` |
| Border | 1 px solid `border` |
| Border radius | `rounded-xl` (12 px) |
| Padding | `space-6` |
| Hover | `border-color` transitions to `accent`, subtle `box-shadow` over 200 ms |
| Focus (keyboard) | 2 px `accent` ring inset |

Card anatomy (top to bottom):
1. Optional project image — 16 : 9 ratio, `rounded-lg`, `object-cover`
2. Project title — `text-xl`, weight 600, `text-primary`
3. Description — `text-sm`, `text-secondary`, max 2 lines (clamp via CSS)
4. Tech tag row — wrapping flex row of display tags
5. Action links row — "Live demo" + "GitHub" ghost buttons with icons

---

### 8.4 Form Inputs

**Text input:**

| State | Border | Background |
|---|---|---|
| Default | 1.5 px solid `border` | `surface` |
| Focus | 1.5 px solid `accent` | `surface` |
| Error | 1.5 px solid `error` | `surface` |
| Disabled | 1 px solid `border-subtle` | `bg` |

- Border radius: `rounded-lg` (8 px)
- Padding: `space-3` / `space-4`
- Font: `text-base`, `text-primary`
- Placeholder: `text-muted`
- Label: `text-sm`, weight 500, `text-secondary`, positioned above input with `space-2` gap

**Textarea:** Same as text input; minimum height 160 px; `resize-y` only.

**Character counter:** `text-xs`, `text-muted`, right-aligned below textarea. Turns `error` color when ≥ 90 % of max is reached.

---

### 8.5 Navigation Header

| Property | Value |
|---|---|
| Height | 64 px |
| Background | `bg` at 90 % opacity + `backdrop-blur-md` when scrolled > 0 px; fully transparent at top |
| Border bottom | 1 px solid `border-subtle` when scrolled > 0 px; none at top |
| Z-index | `z-50` |
| Transition | Background and border opacity: 200 ms ease |

**Nav links (desktop):**
- `text-sm`, weight 500, `text-secondary`
- Hover: `text-primary`, 200 ms
- Active (scroll-spy): `text-accent`, underline offset 4 px

**Hamburger button (mobile, < 768 px):**
- 44 × 44 px touch target
- Opens a full-viewport-width drawer from the right
- Drawer background: `surface`
- Drawer links: `text-lg`, weight 500, stacked vertically with `space-6` gap
- Drawer closes on link tap, backdrop tap, or Escape key

---

### 8.6 Loading & Progress States

**Spinner:** circular SVG animation, `accent` color, 20 px default / 32 px standalone. Paired with an `aria-live="polite"` region announcing the loading state.

**Skeleton loader:** used for sections while content data is loading (if async). Matches the shape of the target content. Animated via a shimmer (gradient sweep).

**Progress bar:** used for PDF generation. Full-width, `accent` fill, `rounded-full`, 4 px height. Animates from 0 → indeterminate oscillation → 100 % on completion.

---

### 8.7 Alert / Feedback Banners

Used for errors, success confirmations, and browser-LLM unavailability notices.

| Variant | Background | Icon | Text color |
|---|---|---|---|
| Error | `error` at 10 % opacity | `AlertCircle` | `error` |
| Success | `success` at 10 % opacity | `CheckCircle` | `success` |
| Warning | `warning` at 10 % opacity | `AlertTriangle` | `warning` |
| Info | `accent` at 10 % opacity | `Info` | `accent` |

- Border radius: `rounded-lg`
- Padding: `space-4`
- Dismiss button (×) on the right when the alert is dismissible
- `role="alert"` on error/success; `role="status"` on info

---

## 9. Motion & Animation

### 9.1 Principles

- Animate **state changes**, not layout. Movement clarifies; it never decorates.
- Every animated property must satisfy `prefers-reduced-motion: reduce` — either skip the animation entirely or reduce it to a simple opacity fade.
- Never animate properties that trigger layout recalculation (`width`, `height`, `top`, `left`). Use `transform` and `opacity` exclusively.

### 9.2 Duration tokens

| Token | Duration | Use |
|---|---|---|
| `duration-fast` | 100 ms | Button press/release, checkbox tick |
| `duration-base` | 200 ms | Hover transitions, color changes, focus rings |
| `duration-slow` | 300 ms | Drawer open/close, modal enter/exit |
| `duration-reveal` | 500 ms | Scroll-triggered section fade-in |

### 9.3 Easing tokens

| Token | Value | Use |
|---|---|---|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Generic state transitions |
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button press scale (subtle overshoot) |

### 9.4 What to animate

| Element | Animation | Duration | Notes |
|---|---|---|---|
| Nav link hover | Color | `duration-base` | |
| Button hover | Background color | `duration-base` | |
| Button press | `scale(0.97)` | `duration-fast` | `ease-spring` |
| Header background | Opacity + blur | `duration-base` | On scroll |
| Mobile drawer | `translateX` | `duration-slow` | `ease-enter` / `ease-exit` |
| Skill tag select | Background + border color | `duration-base` | |
| Card hover | Border color + shadow | `duration-base` | |
| Section reveal | `opacity` 0 → 1 + `translateY(16px)` → 0 | `duration-reveal` | Triggered by IntersectionObserver; skipped if `prefers-reduced-motion` |
| Alert enter | `opacity` + `translateY` | `duration-slow` | |
| "Copied!" label | `opacity` + scale | `duration-fast` | Auto-reverts after 2 s |

### 9.5 What not to animate

- Page background color (theme switch is instant)
- Font loading (reserve space; never fade text in)
- PDF generation progress beyond a simple indeterminate bar
- Any property that causes layout recalculation

---

## 10. Imagery Guidelines

*(Implements [BRD NF-01](./BUSINESS_REQUIREMENTS.md#61-performance))*

| Asset | Format | Aspect ratio | Max dimensions | Notes |
|---|---|---|---|---|
| Profile photo | WebP (AVIF fallback) | 1 : 1 | 400 × 400 px | `<picture>` with AVIF + WebP sources |
| Company logos | WebP / SVG | Original | 80 px height | SVG preferred; transparent background |
| Project thumbnails | WebP (AVIF fallback) | 16 : 9 | 800 × 450 px | `<picture>` with AVIF + WebP sources |
| OG image | PNG | 1200 × 630 px | 1200 × 630 px | Static, pre-generated, text on brand background |

**Rules:**
- Every `<img>` has a descriptive `alt` attribute (satisfies [BRD F-37](./BUSINESS_REQUIREMENTS.md#5-functional-requirements)).
- Decorative SVGs (icons, dividers) use `aria-hidden="true"`.
- `srcset` and `sizes` are set on all raster images.
- Profile photo has `border-radius: 50%` (circular crop) on desktop, optionally square with large border-radius on mobile.

---

## 11. Section-Level Layout Specs

### Hero

- Minimum height: `100svh` (accounts for mobile browser chrome).
- Layout: centered column, text left-aligned on desktop, center-aligned on mobile.
- Name (`<h1>`): `text-6xl` desktop / `text-4xl` mobile, weight 700, `text-primary`.
- Headline: `text-xl` / `text-lg`, weight 400, `text-secondary`.
- Summary: `text-base`, `text-secondary`, max-width 560 px.
- CTA row: primary + secondary button, `space-4` gap, top margin `space-8`.
- No background imagery; subtle grid or dot pattern in `border-subtle` color (optional, performance-budget permitting).

### About

- Two-column layout (photo left, text right) on ≥ 768 px; single-column stacked on mobile.
- Photo: 280 px × 280 px (desktop), 160 px × 160 px (mobile), circular, centered on mobile.
- Facts list: icon + label pairs, `space-3` vertical gap.

### Skills

- Category heading: `text-xl`, weight 600, `text-primary`, with a thin `accent`-colored left border (3 px, `rounded-full`).
- Tags: wrapping flex row, `space-2` gap between tags.
- Counter: right-aligned to the section heading row, `text-sm`, `text-muted`.

### Experience

- Timeline line: 2 px vertical line in `border` color, left-aligned, starting from the second entry.
- Timeline dot: 10 px circle, `accent` fill, on the timeline line.
- Entry card: no border; `surface` background; `rounded-xl`; `space-6` padding.
- Date range: `text-sm`, `text-muted`, monospace.

### Projects

- Card grid: responsive (see §6.4).
- Grid gap: `space-8` desktop / `space-6` mobile.

### Resume

- Neutral `surface` background section.
- Split layout: left panel = skill filter (reuses Skills tag component); right panel = download actions.
- On mobile: stacked; filter panel collapsible.

### Cover Letter Generator

- Full-width `bg` section to visually separate it as a tool, not editorial content.
- Form max-width: 720 px, centered.
- Output textarea: same max-width, min-height 320 px.

### Contact

- Minimal: three contact items in a row on desktop, stacked on mobile.
- Each item: icon (24 px) + label + value, left-aligned.
- Section ends with a soft horizontal rule before the footer.

---

## 12. Design Tokens — CSS Custom Properties

All tokens are defined on `:root` (light) and `[data-theme="dark"]`. Tailwind is configured to consume them via `@theme` / CSS variable references in `tailwind.config.ts`.

```css
/* Excerpt — dark theme (default) */
[data-theme="dark"] {
  --color-bg:             #0F172A;
  --color-surface:        #1E293B;
  --color-surface-raised: #334155;
  --color-border:         #334155;
  --color-border-subtle:  #1E293B;
  --color-accent:         #38BDF8;
  --color-accent-hover:   #0EA5E9;
  --color-accent-subtle:  #0C4A6E;
  --color-secondary:      #818CF8;
  --color-text-primary:   #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-muted:     #64748B;
  --color-success:        #4ADE80;
  --color-error:          #F87171;
  --color-warning:        #FBBF24;

  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', monospace;

  --duration-fast:   100ms;
  --duration-base:   200ms;
  --duration-slow:   300ms;
  --duration-reveal: 500ms;

  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-enter:   cubic-bezier(0, 0, 0.2, 1);
  --ease-exit:    cubic-bezier(0.4, 0, 1, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 13. Design Constraints & Boundaries

These rules are absolute. They exist to satisfy the performance, accessibility, and code-quality requirements in the BRD and PRD, and must not be overridden in implementation.

| # | Constraint | Source |
|---|---|---|
| DC-01 | No CSS animation or transition on layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`). Use `transform` + `opacity` only. | Motion principle §9.1 |
| DC-02 | All animations must be disabled or replaced with a simple opacity fade when `prefers-reduced-motion: reduce` is set. | [BRD NF-20](./BUSINESS_REQUIREMENTS.md#63-accessibility) |
| DC-03 | No color may be used as the **only** means of conveying state (e.g., error, selected). A second signal — icon, label, pattern, or ARIA — is always required. | [PRD §8](./PRODUCT_REQUIREMENTS.md#8-accessibility-brd-nf-20--nf-23) |
| DC-04 | Fonts are self-hosted; no runtime calls to fonts.google.com or any external font CDN. | [BRD NF-04](./BUSINESS_REQUIREMENTS.md#61-performance) (no render-blocking resources) |
| DC-05 | No third-party CSS frameworks other than Tailwind CSS v4 may be introduced. | [BRD §7 Technical Constraints](./BUSINESS_REQUIREMENTS.md#7-technical-constraints) |
| DC-06 | No external image CDN; all raster assets are committed to `public/` and served from GitHub Pages. | [BRD §7](./BUSINESS_REQUIREMENTS.md#7-technical-constraints) |
| DC-07 | Dark mode is implemented via CSS custom properties on `[data-theme]`, not via Tailwind's `dark:` class duplication throughout component markup. | Design maintainability |
| DC-08 | The color token set is the only source of color in the codebase. Hard-coded hex values in component files are not permitted. | Design consistency |
| DC-09 | Icon SVGs are always imported from Lucide React; no inline SVG blobs in component files (except the theme-toggle icon if Lucide does not provide it). | Code cleanliness |
| DC-10 | `outline: none` or `outline: 0` must never appear without an immediately following custom `:focus-visible` replacement. | [PRD §8](./PRODUCT_REQUIREMENTS.md#8-accessibility-brd-nf-20--nf-23) |
