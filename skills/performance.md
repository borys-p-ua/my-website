# Skill: Performance

Full spec: [TDD §12](../docs/TECHNICAL_DESIGN.md#12-performance-strategy)
Requirements: [BRD §6.1](../docs/BUSINESS_REQUIREMENTS.md#61-performance) (NF-01–05), [BRD §4](../docs/BUSINESS_REQUIREMENTS.md#4-goals-and-success-criteria)

## Targets

Lighthouse Performance ≥ 95 on mobile · LCP < 2.5 s · CLS < 0.1

## Code splitting

- Hero + About: eager imports.
- All other sections: `React.lazy(() => import('./sections/X'))` wrapped in `<Suspense>`.
- `@react-pdf/renderer`: dynamic `import()` inside the download callback — never at module scope.
- `@huggingface/transformers`: dynamic `import()` inside the generation callback — never at module scope.

## Images

- `<picture>` with AVIF + WebP sources on all raster images.
- `srcset` + `sizes` on all `<img>` elements.
- Profile photo: `fetchpriority="high"` (above the fold, LCP candidate).
- Declare explicit `width` + `height` on all images to prevent CLS.
- Decorative SVGs: inline (no extra request).

## Fonts

- Self-hosted `.woff2` (Latin subset) in `public/fonts/`.
- `<link rel="preload">` in `index.html` for Inter 400 + 700.
- `font-display: swap` — prevents render blocking.
- Explicit `line-height` on headings to reserve space before font loads (CLS prevention).

## Vite bundle config

`manualChunks`: `vendor-react` (`react`, `react-dom`), `vendor-lucide` (`lucide-react`).
`@react-pdf/renderer` is automatically split by Vite since it's dynamically imported.
See [TDD §16.1](../docs/TECHNICAL_DESIGN.md#161-viteconfigts).
