# CLAUDE.md

Project skills live in `.claude/skills/` — they are auto-invoked based on the task, or trigger one manually with `/skill-name`. Full documentation lives in `docs/` (BRD · PRD · PDS · TDD) — read a doc only when a skill file says to.

---

## Non-negotiable code rules

- No `any` without an explicit suppression comment.
- Zero ESLint violations (`--max-warnings 0`).
- No hardcoded hex values in component files — Tailwind design tokens only.
- No `export default` except at lazy-boundary level.
- No `console.*` in committed code.
- No floating promises — every async call must be awaited or have an error handler.
- No circular module dependencies.
- `import type` for all type-only imports.
- Cyclomatic complexity ≤ 10 per function.
- No `TODO` comments, dead code, or commented-out code in merged files.

## Non-negotiable testing rules

- Query by role / text / label — never by CSS class or `data-testid`.
- `@testing-library/user-event` for all interactions — never `fireEvent`.
- AAA pattern; one behavior per `it` block.
- No `test.only`, `describe.only`, or `test.skip` in merged code.
- `vitest-axe` on all interactive components.
- Test files co-located with source files.

## Architecture invariants

- No backend — all dynamic features run in the browser.
- No external state library — React context + `useState` / `useReducer` only.
- PDF styles isolated in `src/lib/pdf/` — `StyleSheet.create()` only, no Tailwind inside.
- LLM calls isolated in `src/lib/llm/` — nothing outside that module imports `@huggingface/transformers`.
- Hero + About sections eager; every other section via `React.lazy`.
- All asset URLs built via `assetUrl()` helper — never hardcoded paths.
- No new runtime dependency without a decision recorded in the TDD.

## Out of scope

No SSR · no auth · no CMS · no contact form · no project case studies · no blog.

## Current milestone

**M1 — Content & Design** (design tokens, CSS custom properties, `src/data/` files).
Implementation has not started.
