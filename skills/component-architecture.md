# Skill: Component Architecture

Full spec: [TDD §5](../docs/TECHNICAL_DESIGN.md#5-component-architecture)

## Categories

| Category | Path | Rules |
|---|---|---|
| UI primitives | `src/components/ui/` | Stateless, presentation-only props, no business logic |
| Layout | `src/components/layout/` | Header, Footer, Section wrapper, SkipLink, ThemeToggle |
| Sections | `src/sections/<Name>/` | Feature-specific; `index.tsx` + sub-components + `.test.tsx` |
| Context providers | `src/context/` | ThemeContext, SkillFilterContext |

## Hard rules

- Single-responsibility. If a component exceeds ~120 lines, split it.
- Named exports everywhere — `export default` only at lazy-boundary level.
- `children` over ad-hoc content slots.
- Sections own their local state; they read from context only for cross-section concerns (skill filter, theme).
- No business logic in UI primitives.

## Lazy loading

Hero and About are imported eagerly. Every other section uses `React.lazy` + `Suspense`.
See [TDD §5.3](../docs/TECHNICAL_DESIGN.md#53-section-lazy-loading).

## Tests

Co-located: `Component.test.tsx` beside `Component.tsx`.
A `__tests__/` subdirectory is used only when a module generates multiple test files.
