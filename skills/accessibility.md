# Skill: Accessibility

Full spec: [TDD §13](../docs/TECHNICAL_DESIGN.md#13-accessibility-implementation)
Requirements: [BRD §6.3](../docs/BUSINESS_REQUIREMENTS.md#63-accessibility) (NF-20–23)
Hard constraints: [PDS §13](../docs/PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries) DC-03, DC-10

## Landmarks

`<header>`, `<main>`, `<nav>`, `<section aria-labelledby="<h2-id>">`, `<footer>` — required in App structure.

## Skip link

First element in the DOM: `<a href="#main-content" className="sr-only focus:not-sr-only …">Skip to main content</a>`.

## Focus

- Never `outline: none` without a `:focus-visible` replacement.
- All interactive elements: 2 px `accent`-color ring.
- Mobile drawer: Escape key closes it; focus returns to the hamburger button.

## Interactive state communication

| Element | ARIA pattern |
|---|---|
| Skill tags | `role="checkbox"` + `aria-checked`, or `role="button"` + `aria-pressed` |
| LLM/PDF loading | `aria-live="polite"` region |
| Error banners | `role="alert"` |
| Form field errors | `aria-describedby` pointing to error message |

## Reduced motion

Section reveal animations must be gated on:
```ts
window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

## Color as sole indicator

Never use color as the only state signal. Always pair with an icon, text, or ARIA attribute.
