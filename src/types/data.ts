export interface Profile {
  name: string
  headline: string
  summary: string
  photoPath: string
  location: string
  availability: string
  resumePdfPath: string
}

export interface SkillCategory {
  category: string
  years: string
  items: string[]
}

export interface ExperienceEntry {
  company: string
  domain?: string
  logoPath?: string
  role: string
  startDate: string
  endDate?: string
  stack: string[]
  bullets: string[]
  achievement?: string
}

export interface Project {
  num: string
  title: string
  company: string
  description: string
  tags: string[]
  status: string
  liveUrl?: string
  githubUrl?: string
  imagePath?: string
}

export interface Contact {
  github: string
  linkedin: string
  email: string
}
