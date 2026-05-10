import { ArrowRight, Download } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { profile } from '../../data/profile'
import { assetUrl } from '../../lib/assetUrl'

export function Hero() {
  return (
    <Section id="hero" className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted">
              <span className="h-px w-6 shrink-0 bg-text-muted" aria-hidden="true" />
              {profile.heroEyebrow}
            </div>
            <h1
              id="hero-heading"
              className="text-[60px] font-bold leading-none tracking-[-0.03em] text-text-primary"
            >
              {profile.name}
            </h1>
            <p className="mt-5 text-xl font-normal text-text-secondary">{profile.headline}</p>
            <p className="mt-4 max-w-[480px] text-base leading-[1.625] text-text-secondary">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={assetUrl(profile.resumePdfPath)}
                download
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-bg transition-colors duration-base hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Download size={14} aria-hidden="true" />
                Download résumé
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-text-primary transition-colors duration-base hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                See my work
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap gap-8 font-mono text-xs text-text-muted">
              {profile.heroMeta.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-text-primary">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-accent"
            />
            <picture>
              <source
                type="image/avif"
                srcSet={`${assetUrl('images/profile.avif')} 480w, ${assetUrl('images/profile.avif')} 960w`}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              />
              <source
                type="image/webp"
                srcSet={`${assetUrl('images/profile.webp')} 480w, ${assetUrl('images/profile.webp')} 960w`}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              />
              <img
                src={assetUrl(profile.photoPath)}
                alt=""
                width={480}
                height={600}
                fetchPriority="high"
                className="relative aspect-[4/5] h-auto w-full rounded-2xl border border-border-subtle bg-surface-raised object-cover"
              />
            </picture>
          </div>
        </div>
      </div>
    </Section>
  )
}
