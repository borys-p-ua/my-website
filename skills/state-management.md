# Skill: State Management

Full spec: [TDD §6](../docs/TECHNICAL_DESIGN.md#6-state-management)

## Rule

No external state library. React `useState`, `useReducer`, `useContext` only.

## State ownership map

| State | Owner | Persisted? |
|---|---|---|
| Active theme | `ThemeContext` | `localStorage` key `theme` |
| Selected skills | `SkillFilterContext` | In-memory only — resets on reload |
| Mobile drawer open | `Header` local state | No |
| Cover letter form + output | `CoverLetter` section local | No |
| PDF generation status | `Resume` section local | No |
| Scroll-spy active section | `useScrollSpy` hook → `Header` | No |

## SkillFilterContext shape

```ts
interface SkillFilterState {
  selected: Set<string>;            // skill name keys
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

Initial theme read from `localStorage` on mount; written to `data-theme` on `<html>`.
Default when absent: `dark`.
