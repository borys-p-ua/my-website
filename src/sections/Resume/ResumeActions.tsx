import { Spinner } from '../../components/ui/Spinner'
import { experience } from '../../data/experience'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import type { Preset } from './presets'

const ALL_SKILLS = skills.flatMap((c) => c.items)

interface ResumeActionsProps {
  selectedCount: number
  jd: string
  isGenerating: boolean
  presets: readonly Preset[]
  onDownloadTailored: () => void
  onPreset: (skills: string[]) => void
}

export function ResumeActions({
  selectedCount,
  jd,
  isGenerating,
  presets,
  onDownloadTailored,
  onPreset,
}: ResumeActionsProps) {
  const wordCount = jd.split(/\s+/).filter(Boolean).length

  return (
    <div className="rounded-xl border border-border-subtle bg-bg p-7 lg:sticky lg:top-24">
      <h3 className="text-base font-semibold text-text-primary">Generate PDF</h3>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
        Filtered client-side — no server round-trip.
      </p>

      <dl className="mt-5 rounded-lg bg-surface-raised p-4 text-sm text-text-secondary">
        {[
          ['Skills selected', `${selectedCount} / ${ALL_SKILLS.length}`],
          ['Experience entries', String(experience.length)],
          ['Projects', String(projects.length)],
          ['JD context', wordCount > 0 ? `${wordCount} words` : '—'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between py-1">
            <dt>{label}</dt>
            <dd className="font-medium text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onDownloadTailored}
        disabled={isGenerating}
        aria-busy={isGenerating || undefined}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-accent py-2.5 text-sm font-semibold text-bg transition-colors duration-base hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isGenerating && <Spinner size={14} label="Generating PDF" />}
        {isGenerating ? 'Generating…' : 'Download tailored PDF'}
      </button>

      <div className="mt-6 border-t border-border-subtle pt-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
          Preset templates
        </p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onPreset(preset.skills)}
              className="rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-text-secondary transition-colors duration-base hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
