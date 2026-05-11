import { useSkillFilter } from '../../context/SkillFilterContext'
import { Section } from '../../components/layout/Section'
import { SectionHeader } from '../../components/layout/SectionHeader'
import { skills } from '../../data/skills'

const ALL_ITEMS = skills.flatMap((c) => c.items)

export function Skills() {
  const { selected, toggle, selectAll, clearAll } = useSkillFilter()

  return (
    <Section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="03 — Skills"
          headingId="skills-heading"
          title="The stack I've shipped with — and the practices behind it."
          lede="Tap any tag to flag it; the selected set drives the tailored resume and cover-letter generation below."
          aside={
            <div className="flex items-center gap-3">
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
          }
        />

        <div className="mb-8 flex items-center justify-between border-b border-border-subtle pb-4">
          <p className="font-mono text-xs text-text-muted">
            <span className="font-medium text-accent">{selected.size}</span>
            {' of '}
            {ALL_ITEMS.length} selected
          </p>
        </div>

        <p className="sr-only">
          {selected.size} of {ALL_ITEMS.length} skills selected
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {skills.map((cat) => (
            <div key={cat.category} className="border-l-[3px] border-accent pl-4">
              <h3 className="text-sm font-semibold tracking-[-0.01em] text-text-primary">
                {cat.category}
              </h3>
              <p className="mb-4 mt-1 font-mono text-[11px] text-text-muted">{cat.years}</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={cat.category}>
                {cat.items.map((skill) => {
                  const isSelected = selected.has(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggle(skill)}
                      className={[
                        'rounded-full px-3 py-1 text-sm font-medium transition-all duration-base',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        isSelected
                          ? 'border border-accent bg-accent-subtle text-accent'
                          : 'border border-border bg-surface-raised text-text-secondary hover:bg-surface-raised hover:text-text-primary',
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
      </div>
    </Section>
  )
}

export default Skills
