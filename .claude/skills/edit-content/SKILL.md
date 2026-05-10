---
name: edit-content
description: How to edit content data files, respect type constraints, and reference assets correctly. Auto-invoked when editing src/data/ files, adding TypeScript types, or using asset paths.
when_to_use: Editing or creating files in src/data/, updating TypeScript interfaces in src/types/data.ts, referencing images or PDFs by path.
---

**Docs:** [TDD §7](../../../docs/TECHNICAL_DESIGN.md#7-data-layer)

## Data files

All content lives in `src/data/` as typed TypeScript modules — compiled into the bundle, no runtime fetches.

| File | Type |
|---|---|
| `src/data/profile.ts` | `Profile` |
| `src/data/skills.ts` | `Skill[]` |
| `src/data/experience.ts` | `ExperienceEntry[]` — keep newest-first |
| `src/data/projects.ts` | `Project[]` |
| `src/data/contact.ts` | `Contact` |

All interfaces are in `src/types/data.ts`. Full shapes: [TDD §7.1](../../../docs/TECHNICAL_DESIGN.md#71-type-definitions-srctypesdatats).

## Type constraints

- No `any`. All fields must be `string` or an explicit union.
- `ExperienceEntry.endDate` omitted = current role → renders as `"Present"`.
- `ExperienceEntry.achievements`: 2–5 items.
- `Skill.category` values: `'technical'`, `'language'`, `'domain'`, `'soft'`.

## Asset paths

Paths in data files (e.g., `Profile.photoPath`) must be relative to `public/`. At runtime always wrap them with the `assetUrl` helper:

```ts
import { assetUrl } from '../lib/assetUrl';
assetUrl('images/profile.webp') // → '/my-website/images/profile.webp'
```
