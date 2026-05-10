import { Section } from '../../components/layout/Section'
import { SectionHeader } from '../../components/layout/SectionHeader'
import { projects } from '../../data/projects'

const TOTAL = String(projects.length).padStart(2, '0')

export function Projects() {
  return (
    <Section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="05 — Selected work"
          headingId="projects-heading"
          title="A handful of projects I'm proud of."
          lede="A condensed view of the work behind the experience timeline — the platforms, services, and tools I led or shipped."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.num}
              className="flex flex-col rounded-xl border border-border bg-bg p-8 transition-colors duration-base hover:border-accent"
            >
              <div className="mb-4 flex items-start justify-between gap-6">
                <span className="font-mono text-xs tracking-widest text-text-muted">
                  {project.num} / {TOTAL}
                </span>
                <StatusIndicator status={project.status} />
              </div>

              <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-text-primary">
                {project.title}
              </h3>
              <p className="mb-3 font-mono text-xs text-text-muted">{project.company}</p>
              <p className="mb-5 flex-1 text-[15px] leading-[1.55] text-text-secondary">
                {project.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-2 border-t border-border-subtle pt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] text-text-secondary transition-colors duration-base hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Case study
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] text-text-secondary transition-colors duration-base hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

interface StatusIndicatorProps {
  status: string
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  const isInProgress = status.startsWith('In progress')
  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest ${isInProgress ? 'text-success' : 'text-text-muted'}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isInProgress ? 'bg-success' : 'bg-text-muted'}`}
        aria-hidden="true"
      />
      {status}
    </div>
  )
}

export default Projects
