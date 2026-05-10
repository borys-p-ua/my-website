import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export type NavItem = { readonly label: string; readonly id: string }

interface MobileDrawerProps {
  open: boolean
  activeId: string | null
  navItems: readonly NavItem[]
  onClose: () => void
}

export function MobileDrawer({ open, activeId, navItems, onClose }: MobileDrawerProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const drawerClasses = [
    'fixed inset-y-0 right-0 z-50 w-full bg-surface shadow-xl',
    'motion-safe:transition-transform motion-safe:duration-slow',
    'motion-reduce:transition-opacity motion-reduce:duration-fast',
    open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
  ].join(' ')

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm',
          'transition-opacity motion-safe:duration-slow',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!open}
        style={{
          transitionTimingFunction: open ? 'var(--ease-enter)' : 'var(--ease-exit)',
        }}
        className={drawerClasses}
      >
        <div className="flex h-16 items-center justify-end px-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors duration-base hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-6 px-8 pt-6" role="list">
            {navItems.map(({ label, id }, index) => (
              <li key={id}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${id}`}
                  onClick={onClose}
                  aria-current={activeId === id ? true : undefined}
                  className={[
                    'text-lg font-medium transition-colors duration-base',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    activeId === id
                      ? 'text-accent underline underline-offset-4'
                      : 'text-text-secondary hover:text-text-primary',
                  ].join(' ')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
