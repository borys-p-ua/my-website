import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

const BASE_INPUT =
  'w-full rounded-md border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

export function Input({ id, label, error, ...rest }: InputProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={errorId}
        aria-invalid={error ? true : undefined}
        className={[BASE_INPUT, error ? 'border-error' : 'border-border hover:border-accent'].join(
          ' '
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
