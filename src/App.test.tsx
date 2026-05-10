import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders skip link pointing to main content', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content'
    )
  })

  it('renders main landmark', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<App />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
