import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { skills } from '../data/skills'
import { SkillFilterProvider, useSkillFilter } from './SkillFilterContext'

const totalSkillCount = skills.reduce((sum, cat) => sum + cat.items.length, 0)

function SkillFilterProbe() {
  const { selected, toggle, selectAll, clearAll, reset, setPreset } = useSkillFilter()
  const firstCategory = skills[0]?.category ?? ''
  const firstSkill = skills[0]?.items[0] ?? ''

  return (
    <div>
      <p>Count: {selected.size}</p>
      <button type="button" onClick={() => toggle(firstSkill)}>
        Toggle first skill
      </button>
      <button type="button" onClick={() => selectAll()}>
        Select all skills
      </button>
      <button type="button" onClick={() => selectAll(firstCategory)}>
        Select category
      </button>
      <button type="button" onClick={() => clearAll()}>
        Clear all skills
      </button>
      <button type="button" onClick={() => clearAll(firstCategory)}>
        Clear category
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <button type="button" onClick={() => setPreset(['TypeScript', 'NestJS'])}>
        Apply preset
      </button>
    </div>
  )
}

describe('SkillFilterContext', () => {
  it('starts with an empty selection', () => {
    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('toggles a skill in and out of the selection', async () => {
    const user = userEvent.setup()
    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Toggle first skill' }))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Toggle first skill' }))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('selects every skill when selectAll is called with no category', async () => {
    const user = userEvent.setup()
    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Select all skills' }))
    expect(screen.getByText(`Count: ${totalSkillCount}`)).toBeInTheDocument()
  })

  it('selects only skills in the given category when a category is passed', async () => {
    const user = userEvent.setup()
    const category = skills[0]
    if (!category) throw new Error('skills fixture must include a category')
    const expected = category.items.length

    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Select category' }))
    expect(screen.getByText(`Count: ${expected}`)).toBeInTheDocument()
  })

  it('clears the entire selection when clearAll is called with no category', async () => {
    const user = userEvent.setup()
    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Select all skills' }))
    await user.click(screen.getByRole('button', { name: 'Clear all skills' }))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('removes only skills in the given category when clearAll receives a category', async () => {
    const user = userEvent.setup()
    const category = skills[0]
    if (!category) throw new Error('skills fixture must include a category')

    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Select all skills' }))
    await user.click(screen.getByRole('button', { name: 'Clear category' }))
    expect(
      screen.getByText(`Count: ${totalSkillCount - category.items.length}`)
    ).toBeInTheDocument()
  })

  it('sets the selection to exactly the provided preset skills', async () => {
    const user = userEvent.setup()
    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Select all skills' }))
    await user.click(screen.getByRole('button', { name: 'Apply preset' }))
    expect(screen.getByText('Count: 2')).toBeInTheDocument()
  })

  it('clears the selection when reset is called', async () => {
    const user = userEvent.setup()
    render(
      <SkillFilterProvider>
        <SkillFilterProbe />
      </SkillFilterProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Select all skills' }))
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
})
