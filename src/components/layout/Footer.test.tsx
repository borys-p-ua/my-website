import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('shows copyright and source link', () => {
    render(<Footer />)
    expect(screen.getByText(/© \d{4} Borys Polietaiev/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Source on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/borys-p-ua/my-website'
    )
  })

  it('scrolls to top when Back to top is activated', async () => {
    const user = userEvent.setup()
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<Footer />)
    await user.click(screen.getByRole('link', { name: 'Back to top' }))
    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo.mock.calls[0]?.[0]).toMatchObject({ top: 0 })
    scrollTo.mockRestore()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Footer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
