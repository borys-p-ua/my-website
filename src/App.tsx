import { ThemeProvider } from './context/ThemeContext'
import { SkillFilterProvider } from './context/SkillFilterContext'
import { SkipLink } from './components/layout/SkipLink'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/Hero'

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
          </main>
          <Footer />
        </div>
      </SkillFilterProvider>
    </ThemeProvider>
  )
}
