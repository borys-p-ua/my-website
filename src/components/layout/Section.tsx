import type { ReactNode } from 'react'

interface Props {
  id: string
  className?: string
  children: ReactNode
}

export function Section({ id, className, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      {children}
    </section>
  )
}
