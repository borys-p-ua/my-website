import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../context/ThemeContext'
import { SkillFilterProvider } from '../../context/SkillFilterContext'
import { Skills } from './index'

function renderSkills() {
  return render(
    <ThemeProvider>
      <SkillFilterProvider>
        <Skills />
      </SkillFilterProvider>
    </ThemeProvider>
  )
}

describe('Skills', () => {
  it('should render the section heading', () => {
    renderSkills()
    expect(
      screen.getByRole('heading', {
        name: "The stack I've shipped with — and the practices behind it.",
      })
    ).toBeInTheDocument()
  })

  it('should render all 9 skill categories', () => {
    renderSkills()
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(9)
  })

  it('should render skill tags as toggle buttons', () => {
    renderSkills()
    expect(screen.getByRole('button', { name: 'TypeScript' })).toBeInTheDocument()
  })

  it('should show a tag as not pressed initially', () => {
    renderSkills()
    expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('should toggle a tag to selected on click', async () => {
    const user = userEvent.setup()
    renderSkills()

    await user.click(screen.getByRole('button', { name: 'TypeScript' }))

    expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('should deselect a tag on second click', async () => {
    const user = userEvent.setup()
    renderSkills()

    await user.click(screen.getByRole('button', { name: 'TypeScript' }))
    await user.click(screen.getByRole('button', { name: 'TypeScript' }))

    expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('should select all skills when Select all is clicked', async () => {
    const user = userEvent.setup()
    renderSkills()

    await user.click(screen.getByRole('button', { name: 'Select all' }))

    const pressed = screen.getAllByRole('button', { pressed: true })
    expect(pressed.length).toBeGreaterThan(0)
  })

  it('should clear all selections when Clear all is clicked', async () => {
    const user = userEvent.setup()
    renderSkills()

    await user.click(screen.getByRole('button', { name: 'Select all' }))
    await user.click(screen.getByRole('button', { name: 'Clear all' }))

    const pressed = screen.queryAllByRole('button', { pressed: true })
    expect(pressed).toHaveLength(0)
  })

  it('should have no axe violations', async () => {
    const { container } = renderSkills()
    expect(await axe(container)).toHaveNoViolations()
  })
})
