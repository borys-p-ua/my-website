import type { ReactNode } from 'react'

const BASE = 'rounded-full px-3 py-1 text-sm font-medium transition-colors duration-base'
const SELECTED = 'border border-accent bg-accent-subtle text-accent'
const UNSELECTED =
  'border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent'
const STATIC = 'border border-border bg-surface-raised text-text-secondary'

interface TagProps {
  children: ReactNode
  selected?: boolean
  onToggle?: () => void
}

export function Tag({ children, selected = false, onToggle }: TagProps) {
  if (onToggle !== undefined) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onToggle}
        className={[
          BASE,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          selected ? SELECTED : UNSELECTED,
        ].join(' ')}
      >
        {children}
      </button>
    )
  }

  return <span className={[BASE, STATIC].join(' ')}>{children}</span>
}
