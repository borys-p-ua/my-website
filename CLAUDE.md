# CLAUDE.md — Personal Portfolio Website

## Skill files

For focused implementation work, load only the relevant file from [`SKILLS.md`](SKILLS.md) rather than the full docs.

## Documentation map

All requirements, design decisions, and implementation constraints live in `docs/`.
Read the relevant section before making any non-trivial decision.

| File | Purpose |
|---|---|
| `docs/BUSINESS_REQUIREMENTS.md` (BRD) | Goals, NFRs (NF-01–53), milestones, out of scope |
| `docs/PRODUCT_REQUIREMENTS.md` (PRD) | Feature specs, acceptance criteria, user flows |
| `docs/PRODUCT_DESIGN_SPECIFICATION.md` (PDS) | Design system, tokens, component specs, layout grid |
| `docs/TECHNICAL_DESIGN.md` (TDD) | Architecture, module boundaries, implementation constraints |

---

## Tech stack

React 19 · TypeScript 5.8 · Vite 6 · Tailwind CSS v4 · Vitest 3 · React Testing Library.
See [TDD §3](docs/TECHNICAL_DESIGN.md#3-tech-stack) for version rationale and the list of libraries not yet installed.
No new runtime dependency may be added without an explicit decision recorded in the TDD.

---

## Repository layout

`src/components/ui/` · `src/sections/*/` · `src/data/` · `src/lib/pdf/` · `src/lib/llm/` · `src/lib/seo/`
Full tree and co-location rule: [TDD §4](docs/TECHNICAL_DESIGN.md#4-repository-structure).

---

## Code quality — hard rules

Full requirement set: [BRD §6.5](docs/BUSINESS_REQUIREMENTS.md#65-code-quality) NF-40–53.

The following are invariants that must never be violated:

- No `any` without an explicit suppression comment — [NF-40](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- Zero ESLint violations (`--max-warnings 0`) — [NF-41](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- No hardcoded hex values in component files; Tailwind design tokens only — [PDS DC-08](docs/PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries)
- No `export default` except at lazy-boundary level — [TDD §5.2](docs/TECHNICAL_DESIGN.md#52-component-rules)
- No `console.*` in committed code — [NF-50](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- No floating promises — [NF-49](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- No circular module dependencies — [NF-52](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- `import type` for all type-only imports — [NF-53](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- Cyclomatic complexity ≤ 10 per function — [NF-51](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)
- No `TODO` comments, dead code, or commented-out code in merged files — [NF-44](docs/BUSINESS_REQUIREMENTS.md#65-code-quality)

---

## Testing — hard rules

Full strategy (coverage targets, rules, LLM test double, a11y, Lighthouse CI): [TDD §15](docs/TECHNICAL_DESIGN.md#15-testing-strategy).

The following are invariants that must never be violated:

- Query by role / text / label — never by CSS class or `data-testid`
- `@testing-library/user-event` for all interactions — never `fireEvent`
- AAA pattern; one behavior per `it` block
- No `test.only`, `describe.only`, or `test.skip` in merged code
- `vitest-axe` on all interactive components — [TDD §15.4](docs/TECHNICAL_DESIGN.md#154-accessibility-testing)
- Test files co-located with source files — [TDD §4](docs/TECHNICAL_DESIGN.md#4-repository-structure)

---

## Architecture invariants

- **No backend.** All dynamic features run in the browser — [TDD §2.1](docs/TECHNICAL_DESIGN.md#21-high-level-view)
- **No external state library.** React context + `useState` / `useReducer` only — [TDD §6](docs/TECHNICAL_DESIGN.md#6-state-management)
- **PDF styles isolated.** `StyleSheet.create()` only inside `src/lib/pdf/`; no Tailwind — [TDD §10.1](docs/TECHNICAL_DESIGN.md#101-library-react-pdfrenderer)
- **LLM calls isolated.** Nothing outside `src/lib/llm/` imports `@huggingface/transformers` — [TDD §9.4](docs/TECHNICAL_DESIGN.md#94-abstraction-layer-srclibllm)
- **Lazy loading.** Hero + About eager; every other section via `React.lazy` — [TDD §5.3](docs/TECHNICAL_DESIGN.md#53-section-lazy-loading)
- **Base path.** All asset URLs built via `assetUrl()` helper so the `/my-website/` base is trivially switchable — [TDD §7.2](docs/TECHNICAL_DESIGN.md#72-public-asset-paths)

---

## Design system

Color tokens, typography scale, spacing, breakpoints, and component visual specs: [PDS](docs/PRODUCT_DESIGN_SPECIFICATION.md).
Hard design constraints (things that must not be violated in implementation): [PDS §13](docs/PRODUCT_DESIGN_SPECIFICATION.md#13-design-constraints--boundaries).

---

## Out of scope

No SSR, no auth, no CMS, no contact form (display-only), no project case studies, no blog.
Full list: [BRD §8](docs/BUSINESS_REQUIREMENTS.md#8-out-of-scope).

---

## Current status

Documentation phase complete. Implementation not started.
Next milestone: **M1 — Content & Design** (design tokens, CSS custom properties, structured data files).
Full milestone list: [BRD §10](docs/BUSINESS_REQUIREMENTS.md#10-milestones).
