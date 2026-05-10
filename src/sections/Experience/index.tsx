import { Section } from '../../components/layout/Section'
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
    <Section
      id="experience"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <h2
        id="experience-heading"
        className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
      >
        Experience
      </h2>

      <div className="relative ml-2 mt-10 border-l-2 border-border pl-7 sm:pl-9">
        {experience.map((entry) => (
          <div key={`${entry.company}-${entry.startDate}`} className="relative mb-10 last:mb-0">
            <div
              aria-hidden="true"
              className="absolute -left-[13px] top-[18px] h-2.5 w-2.5 rounded-full bg-accent"
            />
            <div className="rounded-xl bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-text-primary">{entry.role}</p>
                  <p className="text-sm text-text-secondary">
                    {entry.company}
                    {entry.domain && <span className="ml-1 text-text-muted">{entry.domain}</span>}
                  </p>
                </div>
                <p className="whitespace-nowrap font-mono text-sm text-text-muted">
                  {formatDate(entry.startDate)}
                  {' – '}
                  {entry.endDate ? formatDate(entry.endDate) : 'Present'}
                </p>
              </div>

              {entry.stack.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface-raised px-2 py-0.5 font-mono text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {entry.bullets.length > 0 && (
                <ul className="mt-4 list-outside list-disc space-y-1 pl-4">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed text-text-secondary">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {entry.achievement && (
                <div className="mt-4 rounded-lg border border-accent bg-accent-subtle px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">{entry.achievement}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Experience
