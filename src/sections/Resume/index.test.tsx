import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { SkillFilterProvider } from '../../context/SkillFilterContext'
import { Resume } from './index'

vi.mock('../../lib/pdf', () => ({
  useResumePdf: () => ({ download: vi.fn().mockResolvedValue(undefined), isGenerating: false }),
}))

function renderResume() {
  return render(
    <ThemeProvider>
      <SkillFilterProvider>
        <Resume />
      </SkillFilterProvider>
    </ThemeProvider>
  )
}

describe('Resume', () => {
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

  it('should render the section heading', () => {
    renderResume()
    expect(
      screen.getByRole('heading', { name: 'Build a résumé tuned to the role.' })
    ).toBeInTheDocument()
  })

  it('should render skill filter tags', () => {
    renderResume()
    expect(screen.getAllByRole('button', { pressed: false }).length).toBeGreaterThan(0)
  })

  it('should render the JD textarea', () => {
    renderResume()
    expect(screen.getByLabelText(/Job description/i)).toBeInTheDocument()
  })

  it('should update char counter when typing in JD textarea', async () => {
    const user = userEvent.setup()
    renderResume()
    await user.type(screen.getByLabelText(/Job description/i), 'Hello')
    expect(screen.getByText(/5 \/ 4000/)).toBeInTheDocument()
  })

  it('should render preset template buttons', () => {
    renderResume()
    expect(screen.getByRole('button', { name: 'Engineering Manager' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backend Lead' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Principal Eng.' })).toBeInTheDocument()
  })

  it('should render download button', () => {
    renderResume()
    expect(screen.getByRole('button', { name: /Download tailored PDF/i })).toBeInTheDocument()
  })

  it('should have no axe violations', async () => {
    const { container } = renderResume()
    expect(await axe(container)).toHaveNoViolations()
  })
})
