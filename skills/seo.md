# Skill: SEO

Full spec: [TDD §11](../docs/TECHNICAL_DESIGN.md#11-seo-implementation)
Feature requirements: [PRD §6](../docs/PRODUCT_REQUIREMENTS.md#6-seo--discoverability-brd-f-30--f-37)

## Key principle

All SEO tags live in `index.html` as static markup — not injected by React — so they are present in the raw HTML served to crawlers.

## What goes where

| Artifact | Location | Notes |
|---|---|---|
| `<title>`, `<meta name="description">` | `index.html` `<head>` | 150–160 chars for description |
| Open Graph tags | `index.html` `<head>` | `og:type`, `og:url`, `og:title`, `og:description`, `og:image` |
| Twitter Card tags | `index.html` `<head>` | `summary_large_image` card type |
| `<link rel="canonical">` | `index.html` `<head>` | Points to the GitHub Pages URL |
| JSON-LD `Person` schema | `index.html` `<head>` | `<script type="application/ld+json">` — static, not rendered by React |
| `sitemap.xml` | `public/` | Single URL for the SPA root; `<lastmod>` updated manually on each release |
| `robots.txt` | `public/` | `Allow: /` + Sitemap directive |

## Canonical URL

`https://borys-p-ua.github.io/my-website/`

## OG image

`public/images/og-image.png` — referenced with the full absolute URL in meta tags.
