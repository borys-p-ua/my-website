import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { About } from './index'

function renderAbout() {
  return render(
    <ThemeProvider>
      <About />
    </ThemeProvider>
  )
}

describe('About', () => {
  it('should render the section heading', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: 'About me' })).toBeInTheDocument()
  })

  it('should render the bio paragraph', () => {
    renderAbout()
    expect(screen.getByText(/leading three teams/i)).toBeInTheDocument()
  })

  it('should render all six facts', () => {
    renderAbout()
    const labels = [
      'Location',
      'Current role',
      'Experience',
      'Education',
      'Availability',
      'Currently learning',
    ]
    for (const label of labels) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('should render the location value', () => {
    renderAbout()
    expect(screen.getByText('Bath, Somerset · United Kingdom')).toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = renderAbout()
    expect(await axe(container)).toHaveNoViolations()
  })
})
