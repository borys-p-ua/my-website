---
name: add-seo
description: Where and how to add SEO markup — meta tags, Open Graph, JSON-LD, sitemap, robots.txt. Auto-invoked when editing index.html head content or public/ SEO files.
when_to_use: Adding or editing meta tags, Open Graph tags, Twitter Card tags, JSON-LD structured data, sitemap.xml, or robots.txt.
---

**Docs:** [TDD §11](../../../docs/TECHNICAL_DESIGN.md#11-seo-implementation) · [PRD §6](../../../docs/PRODUCT_REQUIREMENTS.md#6-seo--discoverability-brd-f-30--f-37)

## Key rule

All SEO markup must be static in `index.html` — never injected by React. Crawlers read raw HTML before JavaScript runs.

## What goes where

| Artifact | Location | Notes |
|---|---|---|
| `<title>`, `<meta name="description">` | `index.html` `<head>` | 150–160 chars for description |
| Open Graph tags | `index.html` `<head>` | `og:type`, `og:url`, `og:title`, `og:description`, `og:image` |
| Twitter Card tags | `index.html` `<head>` | `summary_large_image` card type |
| `<link rel="canonical">` | `index.html` `<head>` | Always points to the GitHub Pages URL |
| JSON-LD `Person` schema | `index.html` `<head>` | `<script type="application/ld+json">` — static |
| `sitemap.xml` | `public/` | Single URL for SPA root; update `<lastmod>` on each release |
| `robots.txt` | `public/` | `Allow: /` + Sitemap directive |

## Canonical URL

`https://borys-p-ua.github.io/my-website/`

## OG image

`public/images/og-image.png` — always reference with the full absolute URL in meta tags.
