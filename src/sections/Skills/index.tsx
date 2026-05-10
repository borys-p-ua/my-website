import { useSkillFilter } from '../../context/SkillFilterContext'
import { Section } from '../../components/layout/Section'
import { skills } from '../../data/skills'

const ALL_ITEMS = skills.flatMap((c) => c.items)

export function Skills() {
  const { selected, toggle, selectAll, clearAll } = useSkillFilter()

  return (
    <Section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:justify-between">
        <h2 id="skills-heading" className="text-3xl font-bold tracking-tight text-text-primary">
          Skills
        </h2>
        <div className="flex items-center gap-4">
          {selected.size > 0 && (
            <span className="text-sm text-text-muted">{selected.size} selected</span>
          )}
          <button
            type="button"
            onClick={() => clearAll()}
            className="text-sm text-text-secondary transition-colors duration-base hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={() => selectAll()}
            className="text-sm text-text-secondary transition-colors duration-base hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Select all
          </button>
        </div>
      </div>

      <p className="sr-only">
        {selected.size} of {ALL_ITEMS.length} skills selected
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((cat) => (
          <div key={cat.category}>
            <h3 className="border-l-[3px] border-accent pl-3 text-xl font-semibold text-text-primary">
              {cat.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={cat.category}>
              {cat.items.map((skill) => {
                const isSelected = selected.has(skill)
                return (
                  <button
                    key={skill}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggle(skill)}
                    className={[
                      'rounded-full px-3 py-1 text-sm font-medium transition-colors duration-base',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      isSelected
                        ? 'bg-accent-subtle text-accent border border-accent'
                        : 'border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent',
                    ].join(' ')}
                  >
                    {skill}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
