import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Section } from './Section'

describe('Section', () => {
  it('associates the region with its heading via aria-labelledby', () => {
    render(
      <Section id="test-section">
        <h2 id="test-section-heading">Title</h2>
      </Section>
    )
    const region = screen.getByRole('region', { name: 'Title' })
    expect(region).toHaveAttribute('aria-labelledby', 'test-section-heading')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Section id="axe-section">
        <h2 id="axe-section-heading">Heading</h2>
        <p>Body</p>
      </Section>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
