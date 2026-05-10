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
    expect(
      screen.getByRole('heading', {
        name: 'A career split evenly between writing software and growing the people who write it.',
      })
    ).toBeInTheDocument()
  })

  it('should render the bio paragraphs', () => {
    renderAbout()
    expect(screen.getByText(/thirteen years building software/i)).toBeInTheDocument()
  })

  it('should render all six fact items with icons', () => {
    renderAbout()
    expect(screen.getByText('Bath, UK')).toBeInTheDocument()
    expect(screen.getByText('Principal Engineer')).toBeInTheDocument()
    expect(screen.getByText('13+ years')).toBeInTheDocument()
    expect(screen.getByText('remote / hybrid')).toBeInTheDocument()
  })

  it('should render the location', () => {
    renderAbout()
    expect(screen.getByText('Bath, UK')).toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = renderAbout()
    expect(await axe(container)).toHaveNoViolations()
  })
})
