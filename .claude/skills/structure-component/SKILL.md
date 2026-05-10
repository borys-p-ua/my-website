---
name: structure-component
description: Rules for creating, categorising, and organising React components and sections in this project. Auto-invoked when creating a new component, section, or deciding how to split existing ones.
when_to_use: Creating a new UI component or section, deciding on file placement, choosing between splitting or keeping a component together, setting up lazy loading.
---

## Component categories

| Category | Path | Rule |
|---|---|---|
| UI primitives | `src/components/ui/` | Stateless, presentation-only props, no business logic |
| Layout | `src/components/layout/` | Header, Footer, Section wrapper, SkipLink, ThemeToggle |
| Sections | `src/sections/<Name>/` | `index.tsx` + optional sub-components + `.test.tsx` |
| Context providers | `src/context/` | ThemeContext, SkillFilterContext only |

## Hard rules

- Single-responsibility. Split any component that exceeds ~120 lines.
- Named exports everywhere — `export default` only at lazy-boundary level.
- Prefer `children` over ad-hoc content slot props.
- Sections own their local state; read from context only for cross-section concerns (skill filter, theme).
- No business logic inside UI primitives — presentation props only.

## Lazy loading

Import Hero and About eagerly. Wrap every other section with `React.lazy` + `Suspense`:

```tsx
const Skills = lazy(() => import('./sections/Skills'));
```

## Test co-location

Place `Component.test.tsx` beside `Component.tsx`. Use `__tests__/` only when a single module generates multiple test files.
