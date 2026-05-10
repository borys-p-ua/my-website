import { GitBranch, Globe, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { contact } from '../../data/contact'

interface ContactItem {
  icon: LucideIcon
  label: string
  displayValue: string
  href: string
  external: boolean
}

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '')
}

const ITEMS: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    displayValue: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    displayValue: displayUrl(contact.linkedin),
    href: contact.linkedin,
    external: true,
  },
  {
    icon: GitBranch,
    label: 'GitHub',
    displayValue: displayUrl(contact.github),
    href: contact.github,
    external: true,
  },
]

export function Contact() {
  return (
    <Section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <h2
        id="contact-heading"
        className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
      >
        Get in touch
      </h2>
      <p className="mt-4 max-w-xl text-base text-text-secondary">
        Open to interesting engineering and leadership roles. Feel free to reach out.
      </p>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-10">
        {ITEMS.map(({ icon: Icon, label, displayValue, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="group flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Icon size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
              <p className="text-sm font-medium text-text-primary transition-colors duration-base group-hover:text-accent">
                {displayValue}
                {external && <span className="sr-only"> (opens in new tab)</span>}
              </p>
            </div>
          </a>
        ))}
      </div>

      <hr className="mt-16 border-border-subtle" />
    </Section>
  )
}

export default Contact
