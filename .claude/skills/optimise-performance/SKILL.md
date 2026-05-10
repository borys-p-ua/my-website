---
name: optimise-performance
description: Performance targets and techniques — code splitting, image rules, font loading, and Vite bundle config. Auto-invoked when adding images, fonts, heavy dependencies, or new lazy-loaded sections.
when_to_use: Adding raster images, fonts, lazy-loaded sections, or heavy dependencies (@react-pdf/renderer, @huggingface/transformers); reviewing bundle size or Core Web Vitals impact.
---

**Docs:** [TDD §12](../../../docs/TECHNICAL_DESIGN.md#12-performance-strategy) · [BRD §6.1](../../../docs/BUSINESS_REQUIREMENTS.md#61-performance) · [BRD §4](../../../docs/BUSINESS_REQUIREMENTS.md#4-goals-and-success-criteria)

## Targets

Lighthouse Performance ≥ 95 on mobile · LCP < 2.5 s · CLS < 0.1

## Code splitting

- Hero + About: eager imports only.
- All other sections: `React.lazy(() => import('./sections/X'))` + `<Suspense>`.
- `@react-pdf/renderer`: dynamic `import()` inside the download callback — never at module scope.
- `@huggingface/transformers`: dynamic `import()` inside generation callback — never at module scope.

## Images

- Wrap every raster in `<picture>` with AVIF + WebP sources.
- Add `srcset` + `sizes` to every `<img>`.
- Profile photo: add `fetchpriority="high"` (LCP candidate).
- Always declare explicit `width` + `height` attributes to prevent CLS.
- Decorative SVGs: inline them — no extra network request.

## Fonts

- Self-hosted `.woff2` Latin subset in `public/fonts/`.
- `<link rel="preload">` in `index.html` for Inter 400 + 700.
- `font-display: swap` on all `@font-face` declarations.
- Explicit `line-height` on headings prevents layout shift before the font loads.

## Vite bundle

`manualChunks` in `vite.config.ts`: `vendor-react` and `vendor-lucide`. `@react-pdf/renderer` is automatically split by Vite because it is dynamically imported.
