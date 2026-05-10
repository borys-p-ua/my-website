# Skill: Data Layer + Types

**Docs:** [TDD §7](../docs/TECHNICAL_DESIGN.md#7-data-layer)

---

## Where content lives

All content is typed TypeScript modules in `src/data/` — compiled into the bundle at build time; no runtime fetches.

| File | Type exported |
|---|---|
| `src/data/profile.ts` | `Profile` |
| `src/data/skills.ts` | `Skill[]` |
| `src/data/experience.ts` | `ExperienceEntry[]` (newest-first) |
| `src/data/projects.ts` | `Project[]` |
| `src/data/contact.ts` | `Contact` |

## Type definitions

All interfaces live in `src/types/data.ts`. See [TDD §7.1](../docs/TECHNICAL_DESIGN.md#71-type-definitions-srctypesdatats) for the full shapes.

Key constraints:
- No `any`. All fields are `string` or explicit unions.
- `ExperienceEntry.endDate` omitted = current role (renders as `"Present"` in PDF and UI).
- `ExperienceEntry.achievements`: 2–5 items.
- Skill `category` values: `'technical'`, `'language'`, `'domain'`, `'soft'`.

## Asset paths

Paths in data files (e.g., `Profile.photoPath`) are relative to `public/`.
At runtime, prefix them with the `assetUrl` helper so the `/my-website/` base path resolves correctly:

```ts
import { assetUrl } from '../lib/assetUrl';
// assetUrl('images/profile.webp') → '/my-website/images/profile.webp'
```

See [TDD §7.2](../docs/TECHNICAL_DESIGN.md#72-public-asset-paths).
