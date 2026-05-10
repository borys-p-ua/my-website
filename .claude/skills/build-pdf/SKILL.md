---
name: build-pdf
description: How to implement PDF generation — module boundary, template structure, filter logic, and font setup. Auto-invoked when working on the Resume section or anything inside src/lib/pdf/.
when_to_use: Implementing useResumePdf, ResumeDocument, any section inside src/lib/pdf/, or the filtered/full resume download flow.
---

**Docs:** [TDD §10](../../../docs/TECHNICAL_DESIGN.md#10-pdf-generation) · [TDD §10.7 — template spec](../../../docs/TECHNICAL_DESIGN.md#107-template-specification-resolves-brd-d-2)

## Library

`@react-pdf/renderer` v4 — **not yet installed** (add at milestone M4).
Primitives: `<Document>`, `<Page>`, `<View>`, `<Text>`, `<Image>`.
Use `StyleSheet.create()` for all PDF styles — never Tailwind classes inside `src/lib/pdf/`.

## Module boundary

Nothing outside `src/lib/pdf/` may import `@react-pdf/renderer` directly.

```
src/lib/pdf/
├── index.ts              ← public API: useResumePdf hook
├── ResumeDocument.tsx    ← root <Document> component
├── sections/             ← ResumeHeader, SummarySection, ExperienceSection
├── styles.ts             ← all PDF styles
├── fonts.ts              ← Font.register() for Inter
└── types.ts              ← ResumeData, FilterOptions
```

## Public API

`useResumePdf(filter?: FilterOptions)` returns `{ download, isGenerating }`.
Dynamic-import `@react-pdf/renderer` inside the `download` callback only — never at module scope.

## Template structure

Header (photo 88 pt left + contacts right) → Summary (profile paragraph, Technical Skills, Domain Expertise, Soft Skills) → Experience (newest-first).

## Filter behaviour

| Content | Filtered? |
|---|---|
| Technical / language skills | Intersected with `selectedSkills` |
| Domain skills | Intersected with `selectedSkills` |
| Soft skills | **Always shown** |
| Experience entries + achievements | **Always shown** |

Output filenames: `Polietaiev_Borys_Resume.pdf` (full) · `Polietaiev_Borys_Resume_Tailored.pdf` (filtered).

## Fonts

Register Inter from `public/fonts/` in `fonts.ts` (weights 400, 600, 700) before rendering any document.
