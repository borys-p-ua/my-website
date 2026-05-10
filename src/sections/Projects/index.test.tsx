import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { Projects } from './index'

function renderProjects() {
  return render(
    <ThemeProvider>
      <Projects />
    </ThemeProvider>
  )
}

describe('Projects', () => {
  it('should render the section heading', () => {
    renderProjects()
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })

  it('should render all 6 project cards', () => {
    renderProjects()
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('should render the project number, title, and company', () => {
    renderProjects()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Booking Suite — SSO, Ticketing & Booking Management' })
    ).toBeInTheDocument()
    expect(screen.getByText('Expedition Software')).toBeInTheDocument()
  })

  it('should render an In progress badge for the personal site project', () => {
    renderProjects()
    expect(screen.getByText(/In progress/)).toBeInTheDocument()
  })

  it('should render Shipped badges for other projects', () => {
    renderProjects()
    const shipped = screen.getAllByText(/Shipped/)
    expect(shipped.length).toBeGreaterThan(0)
  })

  it('should render project tags', () => {
    renderProjects()
    expect(screen.getByText('Architecture')).toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = renderProjects()
    expect(await axe(container)).toHaveNoViolations()
  })
})
