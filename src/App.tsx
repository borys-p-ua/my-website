import { ThemeProvider } from './context/ThemeContext'
import { SkillFilterProvider } from './context/SkillFilterContext'
import { SkipLink } from './components/layout/SkipLink'

export function App() {
  return (
    <ThemeProvider>
      <SkillFilterProvider>
        <SkipLink />
        <header />
        <main id="main-content" />
        <footer />
      </SkillFilterProvider>
    </ThemeProvider>
  )
}
