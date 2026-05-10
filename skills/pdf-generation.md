# Skill: PDF Generation

**Docs:** [TDD §10](../docs/TECHNICAL_DESIGN.md#10-pdf-generation) · [TDD §10.7 — template spec](../docs/TECHNICAL_DESIGN.md#107-template-specification-resolves-brd-d-2)

---

## Library

`@react-pdf/renderer` v4 — **not yet installed** (add at milestone M4).
Primitives: `<Document>`, `<Page>`, `<View>`, `<Text>`, `<Image>`.
Styling: `StyleSheet.create()` only — no Tailwind classes inside `src/lib/pdf/`.

## Module boundary

Nothing outside `src/lib/pdf/` imports `@react-pdf/renderer` directly.

```
src/lib/pdf/
├── index.ts              ← public API: useResumePdf hook
├── ResumeDocument.tsx    ← root <Document> component
├── sections/             ← ResumeHeader, SummarySection, ExperienceSection
├── styles.ts             ← all PDF styles via StyleSheet.create()
├── fonts.ts              ← Font.register() for Inter
└── types.ts              ← ResumeData, FilterOptions
```

## Public API

`useResumePdf(filter?: FilterOptions)` — returns `{ download, isGenerating }`.
`@react-pdf/renderer` is dynamically imported inside the `download` callback (code-split, never in the initial bundle).

## Template structure

Header (photo left 88 pt + contacts right) → Summary (profile paragraph, Technical Skills, Domain Expertise, Soft Skills) → Experience (newest-first).

## Filter behavior

| Content | Full | Filtered |
|---|---|---|
| Technical / language skills | All | Intersected with `selectedSkills` |
| Domain skills | All | Intersected with `selectedSkills` |
| Soft skills | All | **Always shown** — not filtered |
| Experience entries + achievements | All | **Always shown** — not filtered |

## Output filenames

- Full: `Polietaiev_Borys_Resume.pdf`
- Filtered: `Polietaiev_Borys_Resume_Tailored.pdf`

## Fonts

Inter registered from `public/fonts/` via `Font.register()` in `fonts.ts` (Regular 400, SemiBold 600, Bold 700).
