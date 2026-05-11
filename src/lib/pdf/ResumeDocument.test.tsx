import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { ResumeDocument } from './ResumeDocument'

vi.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="document">{children}</div>
  ),
  Page: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  View: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Image: ({ src }: { src: string }) => <img src={src} alt="" />,
  StyleSheet: { create: (s: Record<string, unknown>) => s },
}))

describe('ResumeDocument', () => {
  it('should render without errors (full resume)', () => {
    render(<ResumeDocument filter={undefined} />)
    expect(screen.getByTestId('document')).toBeInTheDocument()
  })

  it('should render profile name in header', () => {
    render(<ResumeDocument filter={undefined} />)
    expect(screen.getByText('Borys Polietaiev')).toBeInTheDocument()
  })

  it('should render Summary section', () => {
    render(<ResumeDocument filter={undefined} />)
    expect(screen.getByText('Summary')).toBeInTheDocument()
  })

  it('should render Experience section', () => {
    render(<ResumeDocument filter={undefined} />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('should render all experience entries', () => {
    render(<ResumeDocument filter={undefined} />)
    expect(screen.getByText('Expedition Software')).toBeInTheDocument()
    expect(screen.getByText('Sedna S')).toBeInTheDocument()
  })

  it('should filter Technical Skills when filter is active', () => {
    const filter = { selectedSkills: new Set(['TypeScript', 'NestJS']) }
    render(<ResumeDocument filter={filter} />)
    expect(screen.getByText('TypeScript, NestJS')).toBeInTheDocument()
    expect(screen.queryByText(/PostgreSQL/)).not.toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = render(<ResumeDocument filter={undefined} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
