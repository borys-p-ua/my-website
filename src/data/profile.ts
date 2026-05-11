import type { Profile } from '../types/data'

export const profile: Profile = {
  name: 'Borys Polietaiev',
  headline: '13+ years shipping backend systems, web platforms & teams that move.',
  summary:
    'Currently leading three teams and five workstreams at Expedition Software (formerly Regiondo). Background spans booking platforms, fintech, video streaming, and AI-driven product work — across Node, TypeScript, PHP/Symfony, and a growing pile of Go.',
  photoPath: 'images/profile.webp',
  location: 'Bath, Somerset · United Kingdom',
  availability: 'Open to remote / hybrid roles',
  resumePdfPath: 'Polietaiev_Borys_Resume.pdf',
  heroEyebrow: 'Principal Engineer · Tech Lead · Engineering Manager',
  heroMeta: [
    { label: 'Based in', value: 'Bath, UK · GMT' },
    { label: 'Experience', value: '13+ years' },
    { label: 'Currently', value: 'Principal @ Expedition Software' },
  ],
  education: 'National Aviation University',
  currentlyLearning: 'Go, LLM fine-tuning & prompt engineering',
  aboutBio: [
    "I've spent thirteen years building software in earnest — most of it backend, much of it leading teams, and a good chunk of it deep in solution design before code was written.",
    "Right now I'm a Principal Engineer at Expedition Software, formerly Regiondo, where I lead three engineering teams and five workstreams across booking, ticketing, and SSO. Before that I shipped microservices at Evolpay, a Face-ID auth service at Witty Tech, and spent seven years scaling an interactive video streaming platform at Aurora Global — including a refactor that cut average load time from 2 seconds to 600ms.",
    "I care about clean architecture, design-first reviews, and engineers who finish things. I'm actively learning Go, AWS Bedrock, and modern AI tooling because the next decade of software won't be written quite the same way as the last.",
  ],
}
