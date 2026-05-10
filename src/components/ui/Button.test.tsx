import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should be disabled and show spinner when loading', () => {
    render(<Button loading>Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>
    )

    await user.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('should have no axe violations for primary variant', async () => {
    const { container } = render(<Button>Primary</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations for secondary variant', async () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations for ghost variant', async () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations when loading', async () => {
    const { container } = render(<Button loading>Loading</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
