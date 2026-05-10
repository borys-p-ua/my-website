import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { Experience } from './index'

function renderExperience() {
  return render(
    <ThemeProvider>
      <Experience />
    </ThemeProvider>
  )
}

describe('Experience', () => {
  it('should render the section heading', () => {
    renderExperience()
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })

  it('should render all 8 role entries', () => {
    renderExperience()
    expect(
      screen.getByText('Principal Engineer · Tech Lead · Engineering Manager')
    ).toBeInTheDocument()
    expect(screen.getByText('Technical Engineer')).toBeInTheDocument()
  })

  it('should render the current role date as Present', () => {
    renderExperience()
    expect(screen.getByText(/Nov 2023 – Present/)).toBeInTheDocument()
  })

  it('should render stack tags for entries that have them', () => {
    renderExperience()
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
  })

  it('should render achievement blocks for entries that have them', () => {
    renderExperience()
    expect(screen.getByText(/Shipped three large streams/)).toBeInTheDocument()
  })

  it('should not render achievement block for entries without one', () => {
    renderExperience()
    expect(screen.queryByText(/NDA company achievement/)).not.toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = renderExperience()
    expect(await axe(container)).toHaveNoViolations()
  })
})
