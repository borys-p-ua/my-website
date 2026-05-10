import type { MouseEvent } from 'react'
import { profile } from '../../data/profile'

const REPO_URL = 'https://github.com/borys-p-ua/my-website'

export function Footer() {
  const year = new Date().getFullYear()

  const handleBackToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-border-subtle bg-surface py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-text-secondary">
          © {year} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent transition-colors duration-base hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Source on GitHub
          </a>
          <a
            href="#"
            onClick={handleBackToTop}
            className="font-medium text-text-secondary transition-colors duration-base hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
