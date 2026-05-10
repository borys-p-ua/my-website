import { ArrowRight, Download } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { profile } from '../../data/profile'
import { assetUrl } from '../../lib/assetUrl'

export function Hero() {
  return (
    <Section id="hero" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:items-center lg:gap-14 xl:grid-cols-[1fr_minmax(0,24rem)]">
        <div>
          <p className="text-sm font-semibold text-accent">{profile.heroEyebrow}</p>
          <h1
            id="hero-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
          >
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-text-primary sm:text-xl">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <a
              href={assetUrl(profile.resumePdfPath)}
              download
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-bg transition-colors duration-base hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Download size={18} aria-hidden="true" />
              Download résumé
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-text-primary transition-colors duration-base hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              See my work
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {profile.heroMeta.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <picture>
            <img
              src={assetUrl(profile.photoPath)}
              alt=""
              width={480}
              height={600}
              className="aspect-[4/5] h-auto w-full rounded-2xl border border-border-subtle bg-surface-raised object-cover shadow-lg"
            />
          </picture>
        </div>
      </div>
    </Section>
  )
}
