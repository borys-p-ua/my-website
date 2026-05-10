import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { ThemeToggle } from './ThemeToggle'

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  it('should render a button with label to switch to light mode in dark theme', () => {
    renderToggle()
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })

  it('should toggle to light mode and update label on click', async () => {
    const user = userEvent.setup()
    renderToggle()

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })

  it('should toggle back to dark mode on second click', async () => {
    const user = userEvent.setup()
    renderToggle()

    const button = screen.getByRole('button', { name: 'Switch to light mode' })
    await user.click(button)
    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))

    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = renderToggle()
    expect(await axe(container)).toHaveNoViolations()
  })
})
