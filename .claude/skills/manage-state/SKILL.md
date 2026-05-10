---
name: manage-state
description: State ownership rules and context shapes for this project. Auto-invoked when adding state, wiring context consumers, or deciding where state should live.
when_to_use: Adding new state, choosing between local state and context, implementing SkillFilterContext or ThemeContext consumers, handling cross-section state.
---

**Docs:** [TDD §6](../../../docs/TECHNICAL_DESIGN.md#6-state-management)

## Rule

No external state library. Use only React `useState`, `useReducer`, and `useContext`.

## State ownership

| State | Owner | Persisted? |
|---|---|---|
| Active theme | `ThemeContext` | `localStorage` key `theme` |
| Selected skills | `SkillFilterContext` | In-memory only — resets on page reload |
| Mobile drawer open/closed | `Header` local state | No |
| Cover letter form + output | `CoverLetter` section local | No |
| PDF generation status | `Resume` section local | No |
| Scroll-spy active section | `useScrollSpy` → `Header` | No |

If state is only needed within one section, keep it local. Reach for context only when two or more sections need to share it.

## SkillFilterContext shape

```ts
interface SkillFilterState {
  selected: Set<string>;
  toggle: (skill: string) => void;
  selectAll: (category: string) => void;
  clearAll: (category: string) => void;
  reset: () => void;
}
```

## ThemeContext shape

```ts
interface ThemeState {
  theme: 'dark' | 'light';
  toggle: () => void;
}
```

On mount, read `localStorage` key `theme`; write the value to `data-theme` on `<html>`. Default when absent: `dark`.
