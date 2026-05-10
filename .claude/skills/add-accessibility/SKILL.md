---
name: add-accessibility
description: Accessibility requirements — semantic landmarks, ARIA patterns, focus management, and reduced motion. Auto-invoked when adding interactive elements, forms, dynamic content, or reviewing a component for accessibility.
when_to_use: Adding buttons, inputs, modals, toggles, or any interactive element; implementing loading states or error states; reviewing a component for WCAG compliance.
---

**Docs:** [TDD §13](../../../docs/TECHNICAL_DESIGN.md#13-accessibility-implementation) · [BRD §6.3](../../../docs/BUSINESS_REQUIREMENTS.md#63-accessibility) · [PDS §13 — constraints](../../../docs/PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)

## Landmarks

Use semantic elements in the App structure: `<header>`, `<main>`, `<nav>`, `<footer>`. Give every `<section>` an `aria-labelledby` pointing to its `<h2>` id.

## Skip link

The first element in the DOM must be:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only …">
  Skip to main content
</a>
```

## Focus

- Never use `outline: none` without providing a `:focus-visible` replacement.
- All interactive elements must have a 2 px `accent`-color ring on focus.
- Mobile drawer: Escape key must close it and return focus to the hamburger button.

## ARIA patterns

| Element | Pattern |
|---|---|
| Skill tags | `role="checkbox"` + `aria-checked`, or `role="button"` + `aria-pressed` |
| LLM / PDF loading | `aria-live="polite"` region |
| Error banners | `role="alert"` |
| Form field errors | `aria-describedby` pointing to the error element |

## Reduced motion

Gate all section reveal animations on:

```ts
window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

## Color as sole indicator

Never rely on colour alone to communicate state. Always pair with an icon, text label, or ARIA attribute.
