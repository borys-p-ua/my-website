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
    expect(
      screen.getByRole('heading', { name: "A handful of projects I'm proud of." })
    ).toBeInTheDocument()
  })

  it('should render all 6 project cards', () => {
    renderProjects()
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('should render project number in 01/06 format', () => {
    renderProjects()
    expect(screen.getByText('01 / 06')).toBeInTheDocument()
  })

  it('should render the project title and company', () => {
    renderProjects()
    expect(
      screen.getByRole('heading', { name: 'Booking Suite — SSO, Ticketing & Booking Management' })
    ).toBeInTheDocument()
    expect(screen.getByText('Expedition Software')).toBeInTheDocument()
  })

  it('should render In progress status indicator', () => {
    renderProjects()
    expect(screen.getByText(/In progress/)).toBeInTheDocument()
  })

  it('should render Shipped status for other projects', () => {
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
