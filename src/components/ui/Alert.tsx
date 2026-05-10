import type { ReactNode } from 'react'

type AlertVariant = 'info' | 'error' | 'success'

interface AlertProps {
  variant: AlertVariant
  children: ReactNode
}

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info: 'border-accent bg-accent-subtle text-accent',
  error: 'border-error bg-error/10 text-error',
  success: 'border-success bg-success/10 text-success',
}

export function Alert({ variant, children }: AlertProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={['rounded-lg border px-4 py-3 text-sm font-medium', VARIANT_CLASSES[variant]].join(
        ' '
      )}
    >
      {children}
    </div>
  )
}
