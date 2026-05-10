import { GitBranch, Globe, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { SectionHeader } from '../../components/layout/SectionHeader'
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
    <Section id="contact" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="08 — Contact"
          headingId="contact-heading"
          title="Let's talk."
          lede="Open to Principal / Staff backend and engineering management roles in the UK and remote-EU."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {ITEMS.map(({ icon: Icon, label, displayValue, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-bg p-6 transition-colors duration-base hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-accent-subtle text-accent">
                <Icon size={20} aria-hidden="true" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                {label}
              </span>
              <span className="break-words text-base font-medium text-text-primary">
                {displayValue}
                {external && <span className="sr-only"> (opens in new tab)</span>}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Contact
