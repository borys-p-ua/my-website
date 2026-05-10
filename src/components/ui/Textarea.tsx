import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  error?: string
  maxLength?: number
}

const BASE_TEXTAREA =
  'w-full resize-y rounded-md border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[120px]'

export function Textarea({ id, label, error, maxLength, value, ...rest }: TextareaProps) {
  const errorId = error ? `${id}-error` : undefined
  const charCount = typeof value === 'string' ? value.length : 0

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
        {maxLength !== undefined && (
          <span className="text-xs text-text-muted" aria-live="polite">
            {charCount} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        maxLength={maxLength}
        value={value}
        aria-describedby={errorId}
        aria-invalid={error ? true : undefined}
        className={[
          BASE_TEXTAREA,
          error ? 'border-error' : 'border-border hover:border-accent',
        ].join(' ')}
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
