interface SectionHeaderProps {
  eyebrow: string
  headingId: string
  title: string
  lede?: string
  aside?: React.ReactNode
}

export function SectionHeader({ eyebrow, headingId, title, lede, aside }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-wrap items-baseline justify-between gap-8">
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
          <span className="h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
          {eyebrow}
        </div>
        <h2
          id={headingId}
          className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
        >
          {title}
        </h2>
        {lede && (
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-text-secondary">{lede}</p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}
