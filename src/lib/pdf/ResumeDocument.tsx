import { Document, Page } from '@react-pdf/renderer'
import type { FilterOptions } from './types'
import { styles } from './styles'
import { ResumeHeader } from './sections/ResumeHeader'
import { SummarySection } from './sections/SummarySection'
import { ExperienceSection } from './sections/ExperienceSection'

interface ResumeDocumentProps {
  filter: FilterOptions | undefined
}

export function ResumeDocument({ filter }: ResumeDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ResumeHeader />
        <SummarySection filter={filter} />
        <ExperienceSection />
      </Page>
    </Document>
  )
}
