import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { SkillFilterProvider } from './context/SkillFilterContext'
import { SkipLink } from './components/layout/SkipLink'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'

const Skills = lazy(() => import('./sections/Skills'))
const Experience = lazy(() => import('./sections/Experience'))
const Projects = lazy(() => import('./sections/Projects'))
const Resume = lazy(() => import('./sections/Resume'))
const Contact = lazy(() => import('./sections/Contact'))

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
            <Hero />
            <About />
            <Suspense fallback={null}>
              <Skills />
            </Suspense>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
            <Suspense fallback={null}>
              <Resume />
            </Suspense>
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </SkillFilterProvider>
    </ThemeProvider>
  )
}
