# Skill: Design System + Styling

**Docs:** [TDD §8](../docs/TECHNICAL_DESIGN.md#8-styling-architecture) · [PDS](../docs/PRODUCT_DESIGN_SPECIFICATION.md) · [PDS §13 — constraints](../docs/PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)

---

## Tailwind v4

Config lives in CSS, not a JS file. `@theme` block and CSS custom properties are in `src/index.css`.
Design tokens from [PDS §12](../docs/PRODUCT_DESIGN_SPECIFICATION.md#12-design-tokens--css-custom-properties) are declared under `[data-theme="dark"]` and `[data-theme="light"]`.

**Never hardcode hex values in component files.** Use Tailwind utilities that map to tokens (e.g., `bg-surface`, `text-accent`, `border-border`).

## Themes

Default: `dark`. Initial value set by an inline `<script>` in `index.html` (reads `localStorage` key `theme` before React hydrates — avoids flash).
See [TDD §6.3](../docs/TECHNICAL_DESIGN.md#63-themecontext) for the script and ThemeContext shape.

## Custom breakpoint

`xs: 480px` declared in `@theme` in `src/index.css`. Enables the `xs:` prefix.
Full breakpoint table: [PDS §6.1](../docs/PRODUCT_DESIGN_SPECIFICATION.md#61-breakpoints).

## Fonts

Inter (UI) and JetBrains Mono (code) — self-hosted `.woff2` in `public/fonts/` (Latin subset).
Declared with `@font-face` + `font-display: swap` in `src/index.css`.
`<link rel="preload">` for Inter 400 + 700 in `index.html`.

## Color palette refs

Dark and light palettes: [PDS §3](../docs/PRODUCT_DESIGN_SPECIFICATION.md#3-color-system).
Contrast requirements: [BRD NF-21](../docs/BUSINESS_REQUIREMENTS.md#63-accessibility).
