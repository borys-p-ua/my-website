import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { Header } from './Header'

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      }))
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should render the logo link with the full name', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /Borys Polietaiev/i })).toBeInTheDocument()
  })

  it('should render all main navigation links', () => {
    renderHeader()
    const labels = ['About', 'Skills', 'Experience', 'Projects', 'Resume', 'Contact']
    for (const label of labels) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    }
  })

  it('should render the Resume CTA button', () => {
    renderHeader()
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()
  })

  it('should render the hamburger button with correct initial aria attributes', () => {
    renderHeader()
    const hamburger = screen.getByRole('button', { name: 'Open navigation menu' })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-nav')
  })

  it('should open the mobile drawer when hamburger is clicked', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))

    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(screen.getByRole('dialog', { name: 'Navigation' })).toBeInTheDocument()
  })

  it('should close the drawer when Escape is pressed and return focus to hamburger', async () => {
    const user = userEvent.setup()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(hamburger)
    await user.keyboard('{Escape}')

    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(hamburger).toHaveFocus()
  })

  it('should close the drawer when the close button inside is clicked', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))
    await user.click(screen.getByRole('button', { name: 'Close navigation menu' }))

    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('should have no axe violations when drawer is closed', async () => {
    const { container } = renderHeader()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations when drawer is open', async () => {
    const user = userEvent.setup()
    const { container } = renderHeader()

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))

    expect(await axe(container)).toHaveNoViolations()
  })
})
