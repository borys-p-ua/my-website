import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('should render with a visible label', () => {
    render(<Textarea id="notes" label="Notes" />)
    expect(screen.getByLabelText('Notes')).toBeInTheDocument()
  })

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea id="notes" label="Notes" onChange={onChange} />)

    await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'Hello')

    expect(onChange).toHaveBeenCalled()
  })

  it('should display char counter when maxLength is provided', () => {
    render(<Textarea id="notes" label="Notes" maxLength={200} value="Hello" onChange={vi.fn()} />)
    expect(screen.getByText('5 / 200')).toBeInTheDocument()
  })

  it('should not display char counter when maxLength is omitted', () => {
    render(<Textarea id="notes" label="Notes" />)
    expect(screen.queryByText(/\/ \d+/)).not.toBeInTheDocument()
  })

  it('should display error message and set aria-invalid when error provided', () => {
    render(<Textarea id="notes" label="Notes" error="Notes are required" />)
    expect(screen.getByText('Notes are required')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('aria-invalid', 'true')
  })

  it('should have no axe violations without error', async () => {
    const { container } = render(<Textarea id="notes" label="Notes" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations with error', async () => {
    const { container } = render(<Textarea id="notes" label="Notes" error="Notes are required" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
