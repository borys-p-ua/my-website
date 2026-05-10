import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('should render children', () => {
    render(<Alert variant="info">Info message</Alert>)
    expect(screen.getByText('Info message')).toBeInTheDocument()
  })

  it('should have role="alert" on error variant', () => {
    render(<Alert variant="error">Error occurred</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should have role="status" on info variant', () => {
    render(<Alert variant="info">Info</Alert>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should have role="status" on success variant', () => {
    render(<Alert variant="success">Done</Alert>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should have no axe violations for info variant', async () => {
    const { container } = render(<Alert variant="info">Info</Alert>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations for error variant', async () => {
    const { container } = render(<Alert variant="error">Error</Alert>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no axe violations for success variant', async () => {
    const { container } = render(<Alert variant="success">Done</Alert>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
