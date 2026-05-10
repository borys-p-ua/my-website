import { ThemeProvider } from './context/ThemeContext'
import { SkillFilterProvider } from './context/SkillFilterContext'
import { SkipLink } from './components/layout/SkipLink'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Section } from './components/layout/Section'
import { profile } from './data/profile'

export function App() {
  return (
    <ThemeProvider>
      <SkillFilterProvider>
        <div className="flex min-h-screen flex-col">
          <SkipLink />
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 pt-16 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Section
              id="overview"
              className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
            >
              <h2
                id="overview-heading"
                className="text-2xl font-semibold tracking-tight text-text-primary"
              >
                Overview
              </h2>
              <p className="mt-4 max-w-3xl text-text-secondary">{profile.headline}</p>
              <p className="mt-4 max-w-3xl text-text-secondary">{profile.summary}</p>
            </Section>
          </main>
          <Footer />
        </div>
      </SkillFilterProvider>
    </ThemeProvider>
  )
}
