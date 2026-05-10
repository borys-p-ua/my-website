import { BookOpen, Briefcase, Check, Clock, GraduationCap, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Section } from '../../components/layout/Section'
import { SectionHeader } from '../../components/layout/SectionHeader'
import { profile } from '../../data/profile'
import { assetUrl } from '../../lib/assetUrl'

interface Fact {
  icon: LucideIcon
  text: ReactNode
}

const FACTS: Fact[] = [
  {
    icon: MapPin,
    text: (
      <>
        Based in <strong className="font-medium text-text-primary">Bath, UK</strong>
      </>
    ),
  },
  {
    icon: Briefcase,
    text: (
      <>
        <strong className="font-medium text-text-primary">Principal Engineer</strong> at Expedition
      </>
    ),
  },
  {
    icon: Clock,
    text: (
      <>
        <strong className="font-medium text-text-primary">13+ years</strong> in software
      </>
    ),
  },
  {
    icon: GraduationCap,
    text: (
      <>
        Bachelor's, <strong className="font-medium text-text-primary">{profile.education}</strong>
      </>
    ),
  },
  {
    icon: Check,
    text: (
      <>
        Open to <strong className="font-medium text-text-primary">remote / hybrid</strong> roles
      </>
    ),
  },
  {
    icon: BookOpen,
    text: (
      <>
        Currently learning{' '}
        <strong className="font-medium text-text-primary">{profile.currentlyLearning}</strong>
      </>
    ),
  },
]

export function About() {
  return (
    <Section id="about" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="02 — About"
          headingId="about-heading"
          title="A career split evenly between writing software and growing the people who write it."
        />

        <div className="grid gap-16 md:grid-cols-[280px_1fr] md:items-start">
          <div className="flex justify-center md:sticky md:top-24 md:justify-start">
            <picture>
              <img
                src={assetUrl(profile.photoPath)}
                alt=""
                width={280}
                height={280}
                className="h-40 w-40 rounded-full border border-border-subtle bg-surface-raised object-cover md:h-[280px] md:w-[280px]"
              />
            </picture>
          </div>

          <div>
            {profile.aboutBio.map((para, i) => (
              <p
                key={i}
                className={[
                  'leading-[1.7] text-text-secondary',
                  i === 0 ? 'mb-5 text-lg text-text-primary' : 'mb-5 text-base',
                ].join(' ')}
              >
                {para}
              </p>
            ))}

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4">
              {FACTS.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                  <Icon size={14} aria-hidden="true" className="shrink-0 text-accent" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
