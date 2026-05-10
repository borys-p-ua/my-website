import { Section } from '../../components/layout/Section'
import { projects } from '../../data/projects'

interface StatusBadgeProps {
  status: string
}

function StatusBadge({ status }: StatusBadgeProps) {
  const isInProgress = status.startsWith('In progress')
  return (
    <span
      className={[
        'whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold',
        isInProgress
          ? 'bg-accent text-bg'
          : 'border border-border bg-surface-raised text-text-secondary',
      ].join(' ')}
    >
      {status}
    </span>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <h2
        id="projects-heading"
        className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
      >
        Projects
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project) => (
          <article
            key={project.num}
            className="flex flex-col gap-4 rounded-xl bg-surface p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-2xl font-bold text-accent">{project.num}</span>
              <StatusBadge status={project.status} />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{project.title}</h3>
              <p className="mt-1 font-mono text-sm text-text-muted">{project.company}</p>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Projects
