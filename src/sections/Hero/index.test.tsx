import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { profile } from '../../data/profile'
import { Hero } from './index'

describe('Hero', () => {
  it('renders the profile name as the page title', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
  })

  it('links download resume to the static PDF path', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /download resume/i })).toBeInTheDocument()
  })

  it('links see my work to the projects section', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /see my work/i })).toHaveAttribute('href', '#projects')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Hero />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
