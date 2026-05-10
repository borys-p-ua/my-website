import { BookOpen, Briefcase, Calendar, GraduationCap, Globe, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { profile } from '../../data/profile'
import { assetUrl } from '../../lib/assetUrl'

interface Fact {
  icon: LucideIcon
  label: string
  value: string
}

const FACTS: Fact[] = [
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: Briefcase, label: 'Current role', value: profile.heroMeta[2].value },
  { icon: Calendar, label: 'Experience', value: profile.heroMeta[1].value },
  { icon: GraduationCap, label: 'Education', value: profile.education },
  { icon: Globe, label: 'Availability', value: profile.availability },
  { icon: BookOpen, label: 'Currently learning', value: profile.currentlyLearning },
]

export function About() {
  return (
    <Section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14 md:items-start">
        <div className="flex justify-center md:justify-start md:sticky md:top-24">
          <picture>
            <img
              src={assetUrl(profile.photoPath)}
              alt=""
              width={280}
              height={280}
              className="h-40 w-40 rounded-full border border-border-subtle bg-surface-raised object-cover shadow-md md:h-[280px] md:w-[280px]"
            />
          </picture>
        </div>

        <div>
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            About me
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {profile.summary}
          </p>

          <ul className="mt-8 list-none space-y-3">
            {FACTS.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-text-primary">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
