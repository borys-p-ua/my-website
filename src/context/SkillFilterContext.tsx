import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { skills } from '../data/skills'

interface SkillFilterState {
  selected: Set<string>
  toggle: (skill: string) => void
  selectAll: (category: string) => void
  clearAll: (category: string) => void
  reset: () => void
}

const SkillFilterContext = createContext<SkillFilterState | null>(null)

export function SkillFilterProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set())

  const toggle = useCallback((skill: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(skill)) next.delete(skill)
      else next.add(skill)
      return next
    })
  }, [])

  const selectAll = useCallback((category: string) => {
    const cat = skills.find((c) => c.category === category)
    if (!cat) return
    setSelected((prev) => {
      const next = new Set(prev)
      cat.items.forEach((item) => next.add(item))
      return next
    })
  }, [])

  const clearAll = useCallback((category: string) => {
    const cat = skills.find((c) => c.category === category)
    if (!cat) return
    setSelected((prev) => {
      const next = new Set(prev)
      cat.items.forEach((item) => next.delete(item))
      return next
    })
  }, [])

  const reset = useCallback(() => setSelected(new Set()), [])

  return (
    <SkillFilterContext.Provider value={{ selected, toggle, selectAll, clearAll, reset }}>
      {children}
    </SkillFilterContext.Provider>
  )
}

export function useSkillFilter(): SkillFilterState {
  const ctx = useContext(SkillFilterContext)
  if (!ctx) throw new Error('useSkillFilter must be used within SkillFilterProvider')
  return ctx
}
