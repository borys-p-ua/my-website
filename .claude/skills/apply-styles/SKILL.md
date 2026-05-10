---
name: apply-styles
description: How to use the design system — Tailwind v4 tokens, dark/light mode, breakpoints, and typography. Auto-invoked when writing or reviewing any styles, colours, or responsive layout.
when_to_use: Writing Tailwind classes, adding colours or spacing, handling dark/light mode, working with breakpoints or fonts, reviewing component styles.
---

**Docs:** [TDD §8](../../../docs/TECHNICAL_DESIGN.md#8-styling-architecture) · [PDS](../../../docs/PRODUCT_DESIGN_SPECIFICATION.md) · [PDS §13 — constraints](../../../docs/PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)

## Tailwind v4

Config lives in CSS, not a JS file. The `@theme` block and CSS custom properties are in `src/index.css`. Never create a `tailwind.config.js`.

**Never hardcode hex values in component files.** Use only Tailwind utilities that map to design tokens (e.g., `bg-surface`, `text-accent`, `border-border`).

## Dark / light mode

Default theme: `dark`. An inline `<script>` in `index.html` reads `localStorage` key `theme` before React hydrates to avoid a flash of wrong theme. `ThemeContext` manages runtime switching and writes to `data-theme` on `<html>`.

## Breakpoints

| Prefix | Width |
|---|---|
| `xs:` | 480 px (custom — declared in `@theme`) |
| `sm:` | 640 px |
| `md:` | 768 px |
| `lg:` | 1024 px |
| `xl:` | 1280 px |

Full grid and spacing specs: [PDS §6](../../../docs/PRODUCT_DESIGN_SPECIFICATION.md#61-breakpoints).

## Fonts

Inter (UI) and JetBrains Mono (code) — self-hosted `.woff2` in `public/fonts/` (Latin subset only). Declared in `src/index.css` with `@font-face` + `font-display: swap`. `<link rel="preload">` for Inter 400 + 700 lives in `index.html`.
