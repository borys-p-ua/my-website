# Skill: Testing

**Docs:** [TDD §15](../docs/TECHNICAL_DESIGN.md#15-testing-strategy)

---

## Stack

Vitest 3 + React Testing Library 16 + `@testing-library/user-event`.
Setup file: `src/test-setup.ts`. Environment: `jsdom`.

## Coverage targets

| Layer | Target |
|---|---|
| `src/lib/` utilities | ≥ 90 % |
| Context providers | ≥ 90 % |
| UI primitives | ≥ 80 % |
| Section components | ≥ 70 % |

## Hard rules

- Query by role / text / label — never CSS class or `data-testid`.
- `userEvent` for all interactions — never `fireEvent` directly.
- AAA pattern: distinct setup → action → assertion in each `it`.
- One behavior per `it` block.
- `describe('<Unit>') + it('should <behavior> [when <condition>]')` naming.
- No `test.only`, `describe.only`, or `test.skip` in merged code.
- Custom hooks → `renderHook`.
- Async assertions → `findBy*` or `waitFor` (never bare `await act()`).
- `beforeEach` / `afterEach` resets all fakes and DOM side effects.

## Mocking

**LLM** — `src/lib/llm/__mocks__/index.ts` (Vitest auto-mock via `vi.mock`):

```ts
export const getLLMStatus = vi.fn().mockResolvedValue('ready');
export const generateCoverLetter = vi.fn().mockResolvedValue('Mock cover letter.');
```

**PDF renderer** — mock `@react-pdf/renderer` in section tests; test `ResumeDocument` sub-components as regular React components in isolation.

## Accessibility testing

`vitest-axe` on all interactive components. Registered in `src/test-setup.ts`:

```ts
import { configureAxe, toHaveNoViolations } from 'vitest-axe';
expect.extend(toHaveNoViolations);
configureAxe({ globalOptions: { rules: [{ id: 'color-contrast', enabled: false }] } });
```
Color-contrast disabled — jsdom cannot evaluate Tailwind dark-mode classes accurately.
See [TDD §15.4](../docs/TECHNICAL_DESIGN.md#154-accessibility-testing).

## Lighthouse CI

Runs post-deploy in GitHub Actions. Config: `.lighthouserc.json` at project root.
Thresholds: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, FCP < 2.5 s, CLS < 0.1.
See [TDD §15.5](../docs/TECHNICAL_DESIGN.md#155-performance-ci).
