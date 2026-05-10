import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Tag } from './Tag'

describe('Tag', () => {
  it('should render static tag as a span', () => {
    const { container } = render(<Tag>TypeScript</Tag>)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('should render interactive tag as a button with aria-pressed false', () => {
    render(<Tag onToggle={vi.fn()}>TypeScript</Tag>)
    expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('should render interactive tag as pressed when selected', () => {
    render(
      <Tag selected onToggle={vi.fn()}>
        TypeScript
      </Tag>
    )
    expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('should call onToggle when interactive tag is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<Tag onToggle={onToggle}>TypeScript</Tag>)

    await user.click(screen.getByRole('button', { name: 'TypeScript' }))

    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('should have no axe violations for static tag', async () => {
    const { container } = render(<Tag>TypeScript</Tag>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations for interactive tag', async () => {
    const { container } = render(<Tag onToggle={vi.fn()}>TypeScript</Tag>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
