import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('should render with a visible label', () => {
    render(<Input id="name" label="Full name" />)
    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
  })

  it('should associate label with input via id', () => {
    render(<Input id="name" label="Full name" />)
    expect(screen.getByRole('textbox', { name: 'Full name' })).toBeInTheDocument()
  })

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input id="name" label="Full name" onChange={onChange} />)

    await user.type(screen.getByRole('textbox'), 'Borys')

    expect(onChange).toHaveBeenCalled()
  })

  it('should display error message and set aria-invalid when error provided', () => {
    render(<Input id="name" label="Full name" error="Name is required" />)
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('should link input to error via aria-describedby', () => {
    render(<Input id="name" label="Full name" error="Name is required" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'name-error')
    expect(screen.getByText('Name is required')).toHaveAttribute('id', 'name-error')
  })

  it('should have no axe violations without error', async () => {
    const { container } = render(<Input id="name" label="Full name" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations with error', async () => {
    const { container } = render(<Input id="name" label="Full name" error="Name is required" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
