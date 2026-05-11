import { useMemo, useState, useTransition } from 'react'
import { Section } from '../../components/layout/Section'
import { SectionHeader } from '../../components/layout/SectionHeader'
import { useSkillFilter } from '../../context/SkillFilterContext'
import { useResumePdf } from '../../lib/pdf'
import type { FilterOptions } from '../../lib/pdf'
import { skills } from '../../data/skills'
import { ResumeActions } from './ResumeActions'
import { PRESETS } from './presets'

const MAX_JD = 4000

export function Resume() {
  const { selected, toggle, setPreset } = useSkillFilter()
  const [jd, setJd] = useState('')
  const [, startTransition] = useTransition()

  const filter = useMemo<FilterOptions | undefined>(
    () => (selected.size > 0 ? { selectedSkills: selected } : undefined),
    [selected]
  )
  const { download, isGenerating } = useResumePdf(filter)

  const handleDownload = () => {
    startTransition(() => {
      void download()
    })
  }

  return (
    <Section id="resume" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="06 — Tailored résumé"
          headingId="resume-heading"
          title="Build a résumé tuned to the role."
          lede="Pick the skills you want emphasised and paste the job description — the generator filters the PDF client-side."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="rounded-xl border border-border-subtle bg-bg p-7">
            <h3 className="mb-1 text-base font-semibold text-text-primary">
              Filter skills to highlight
            </h3>
            <p className="mb-5 text-sm text-text-secondary">
              Selected skills surface first in the PDF's Technical Skills and Domain Expertise rows.
            </p>

            <div className="flex flex-col gap-5">
              {skills.map((cat) => (
                <div key={cat.category}>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    {cat.category}
                  </p>
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
                            'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-base',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                            isSelected
                              ? 'border border-accent bg-accent-subtle text-accent'
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

            <div className="mt-6 border-t border-border-subtle pt-6">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="resume-jd" className="text-sm font-medium text-text-secondary">
                  Job description
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    Optional
                  </span>
                </label>
                <span className="font-mono text-[11px] text-text-muted" aria-live="polite">
                  {jd.length} / {MAX_JD}
                </span>
              </div>
              <textarea
                id="resume-jd"
                maxLength={MAX_JD}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the JD or a few key responsibilities here…"
                className="mt-1 min-h-[120px] w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-base focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
            </div>
          </div>

          <ResumeActions
            selectedCount={selected.size}
            jd={jd}
            isGenerating={isGenerating}
            presets={PRESETS}
            onDownloadTailored={handleDownload}
            onPreset={setPreset}
          />
        </div>
      </div>
    </Section>
  )
}

export default Resume
