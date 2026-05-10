import { Star } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { SectionHeader } from '../../components/layout/SectionHeader'
import { experience } from '../../data/experience'

function formatDate(iso: string): string {
  const parts = iso.split('-')
  const year = parts[0]
  const month = parts[1]
  if (!year || !month) return iso
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

export function Experience() {
  return (
    <Section id="experience" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="04 — Experience"
          headingId="experience-heading"
          title="A timeline of roles, teams led, and platforms shipped."
          lede="From technical engineer in 2008 to Principal Engineer today — eight roles, six companies, three industries."
        />

        <div className="relative pl-8">
          <div aria-hidden="true" className="absolute left-[5px] top-3 bottom-0 w-0.5 bg-border" />
          {experience.map((entry) => (
            <article
              key={`${entry.company}-${entry.startDate}`}
              className="relative mb-8 last:mb-0"
            >
              <div
                aria-hidden="true"
                className="absolute -left-8 top-8 h-3 w-3 rounded-full bg-accent"
                style={{
                  boxShadow: '0 0 0 3px var(--color-surface), 0 0 0 4px var(--color-accent)',
                }}
              />
              <div className="rounded-xl border border-border-subtle bg-bg p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">
                      {entry.role}
                    </h3>
                    <p className="mt-1 text-sm">
                      <span className="text-accent">{entry.company}</span>
                      {entry.domain && <span className="ml-2 text-text-muted">{entry.domain}</span>}
                    </p>
                  </div>
                  <div className="text-right font-mono text-xs text-text-muted whitespace-nowrap">
                    {formatDate(entry.startDate)} →{' '}
                    {entry.endDate ? formatDate(entry.endDate) : 'Present'}
                  </div>
                </div>

                {entry.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-surface-raised px-2 py-0.5 font-mono text-xs text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {entry.bullets.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="shrink-0 text-text-muted" aria-hidden="true">
                          —
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.achievement && (
                  <div className="mt-4 flex gap-2.5 rounded-lg bg-accent-subtle p-4 text-[13px] text-accent">
                    <Star size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <div>
                      <strong className="mb-0.5 block text-xs font-medium uppercase tracking-widest text-text-primary">
                        Key achievement
                      </strong>
                      {entry.achievement}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience
