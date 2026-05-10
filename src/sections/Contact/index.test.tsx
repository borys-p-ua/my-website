import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { Contact } from './index'

function renderContact() {
  return render(
    <ThemeProvider>
      <Contact />
    </ThemeProvider>
  )
}

describe('Contact', () => {
  it('should render the section heading', () => {
    renderContact()
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeInTheDocument()
  })

  it('should render the email link with mailto href', () => {
    renderContact()
    const link = screen.getByRole('link', { name: /email/i })
    expect(link).toHaveAttribute('href', 'mailto:compparty1@gmail.com')
  })

  it('should render the LinkedIn link opening in a new tab', () => {
    renderContact()
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/poletayev')
  })

  it('should render the GitHub link opening in a new tab', () => {
    renderContact()
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
    expect(link).toHaveAttribute('href', 'https://github.com/borys-p-ua')
  })

  it('should have no axe violations', async () => {
    const { container } = renderContact()
    expect(await axe(container)).toHaveNoViolations()
  })
})
