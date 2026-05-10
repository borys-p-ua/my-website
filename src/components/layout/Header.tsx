import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { MobileDrawer } from './MobileDrawer'
import type { NavItem } from './MobileDrawer'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { profile } from '../../data/profile'
import { assetUrl } from '../../lib/assetUrl'

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Resume', id: 'resume' },
  { label: 'Contact', id: 'contact' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const sectionIds = useMemo(() => SECTION_IDS, [])
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const openDrawer = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  const headerClasses = [
    'fixed inset-x-0 top-0 z-50 h-16 transition-all duration-base',
    scrolled
      ? 'border-b border-border-subtle bg-bg/90 backdrop-blur-md'
      : 'border-b border-transparent bg-transparent',
  ].join(' ')

  return (
    <header className={headerClasses}>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#"
          aria-label={`${profile.name} — back to top`}
          className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-bold text-sm text-bg">
            B
          </span>
          <span className="font-mono text-sm text-text-primary">borys-p.dev</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6" role="list">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeId === id ? true : undefined}
                  className={[
                    'text-sm font-medium transition-colors duration-base',
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
          <ThemeToggle />
          <a
            href={assetUrl(profile.resumePdfPath)}
            download
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors duration-base hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Résumé
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            type="button"
            onClick={openDrawer}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label="Open navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors duration-base hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <MobileDrawer
        open={drawerOpen}
        activeId={activeId}
        navItems={NAV_ITEMS}
        onClose={closeDrawer}
      />
    </header>
  )
}
