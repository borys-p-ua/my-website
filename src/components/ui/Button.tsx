import type { ReactNode } from 'react'
import { Spinner } from './Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick?: () => void
  className?: string
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-bg hover:bg-accent-hover focus-visible:ring-offset-bg',
  secondary:
    'border border-border text-text-primary hover:border-accent hover:text-accent focus-visible:ring-offset-bg',
  ghost: 'text-text-secondary hover:text-text-primary focus-visible:ring-offset-bg',
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  children,
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold',
        'transition-colors duration-base',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && <Spinner size={16} label="Loading" />}
      {children}
    </button>
  )
}
