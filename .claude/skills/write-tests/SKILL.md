---
name: write-tests
description: Testing stack, coverage targets, hard rules, mocking patterns, vitest-axe setup, and Lighthouse CI config. Auto-invoked when writing or reviewing tests at any layer of the project.
when_to_use: Writing unit tests, integration tests, component tests, hook tests, or accessibility tests; setting up mocks; reviewing test quality or coverage.
---

**Docs:** [TDD §15](../../../docs/TECHNICAL_DESIGN.md#15-testing-strategy)

## Stack

Vitest 3 + React Testing Library 16 + `@testing-library/user-event`. Setup file: `src/test-setup.ts`. Environment: `jsdom`.

## Coverage targets

| Layer | Target |
|---|---|
| `src/lib/` utilities | ≥ 90 % |
| Context providers | ≥ 90 % |
| UI primitives | ≥ 80 % |
| Section components | ≥ 70 % |

## Hard rules

- Query by role / text / label — never by CSS class or `data-testid`.
- Use `userEvent` for all interactions — never `fireEvent` directly.
- Follow AAA: distinct setup → action → assertion in each `it`.
- One behaviour per `it` block — split if testing multiple things.
- Name tests: `describe('<Unit>') + it('should <behaviour> [when <condition>]')`.
- No `test.only`, `describe.only`, or `test.skip` in merged code.
- Test custom hooks with `renderHook` from `@testing-library/react`.
- Async assertions: use `findBy*` or `waitFor` — never a bare `await act()`.
- `beforeEach` / `afterEach` must reset all fakes and DOM side effects.

## Mocking

**LLM** — `src/lib/llm/__mocks__/index.ts` (Vitest auto-mock via `vi.mock`):

```ts
export const getLLMStatus = vi.fn().mockResolvedValue('ready');
export const generateCoverLetter = vi.fn().mockResolvedValue('Mock cover letter.');
```

**PDF renderer** — mock `@react-pdf/renderer` in section tests. Test `ResumeDocument` sub-components as plain React components in isolation.

## Accessibility testing

Register `vitest-axe` in `src/test-setup.ts`:

```ts
import { configureAxe, toHaveNoViolations } from 'vitest-axe';
expect.extend(toHaveNoViolations);
configureAxe({ globalOptions: { rules: [{ id: 'color-contrast', enabled: false }] } });
```

Then add to every interactive component test:

```ts
expect(await axe(container)).toHaveNoViolations();
```

Color-contrast is disabled — jsdom cannot evaluate Tailwind dark-mode classes accurately.

## Lighthouse CI

Runs post-deploy in GitHub Actions via `.lighthouserc.json`.
Thresholds: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, FCP < 2.5 s, CLS < 0.1.
