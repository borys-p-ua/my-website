// @vitest-environment node
import React from 'react'
import { pdf } from '@react-pdf/renderer'
import { describe, expect, it } from 'vitest'
import { ResumeDocument } from './ResumeDocument'

// Helvetica is built-in — no font registration needed.

async function renderPdf(filter?: { selectedSkills: Set<string> }): Promise<Uint8Array> {
  const blob = await pdf(
    React.createElement(ResumeDocument, { filter: filter ?? undefined })
  ).toBlob()
  return new Uint8Array(await blob.arrayBuffer())
}

describe('ResumeDocument PDF generation', () => {
  it('should produce a valid PDF for the full resume', async () => {
    const bytes = await renderPdf()

    // PDF magic bytes: %PDF
    expect(bytes[0]).toBe(0x25) // %
    expect(bytes[1]).toBe(0x50) // P
    expect(bytes[2]).toBe(0x44) // D
    expect(bytes[3]).toBe(0x46) // F
    expect(bytes.length).toBeGreaterThan(1000)
  }, 30_000)

  it('should produce a valid PDF with skill filter applied', async () => {
    const filter = { selectedSkills: new Set(['TypeScript', 'NestJS', 'PostgreSQL']) }
    const bytes = await renderPdf(filter)

    expect(bytes[0]).toBe(0x25)
    expect(bytes[1]).toBe(0x50)
    expect(bytes[2]).toBe(0x44)
    expect(bytes[3]).toBe(0x46)
  }, 30_000)

  it('filtered PDF should be smaller than the full resume PDF', async () => {
    const full = await renderPdf()
    const filtered = await renderPdf({ selectedSkills: new Set(['TypeScript']) })

    expect(filtered.length).toBeLessThan(full.length)
  }, 60_000)
})
