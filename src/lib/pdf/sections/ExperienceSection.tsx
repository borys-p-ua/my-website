import { Text, View } from '@react-pdf/renderer'
import type { ExperienceEntry } from '../../../types/data'
import { experience } from '../../../data/experience'
import { styles } from '../styles'

function formatDate(iso: string): string {
  const parts = iso.split('-')
  const year = parts[0]
  const month = parts[1]
  if (!year || !month) return iso
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

function JobEntry({ entry }: { entry: ExperienceEntry }) {
  const dateRange = `${formatDate(entry.startDate)} – ${entry.endDate ? formatDate(entry.endDate) : 'Present'}`
  return (
    <View style={styles.jobEntry}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobCompany}>{entry.company}</Text>
        <Text style={styles.jobDate}>{dateRange}</Text>
      </View>
      <Text style={styles.jobRole}>{entry.role}</Text>
      {entry.bullets.map((bullet) => (
        <Text key={bullet} style={styles.jobBullet}>
          {'• '}
          {bullet}
        </Text>
      ))}
    </View>
  )
}

export function ExperienceSection() {
  return (
    <View>
      <Text style={styles.sectionHeading}>Experience</Text>
      {experience.map((entry) => (
        <JobEntry key={`${entry.company}-${entry.startDate}`} entry={entry} />
      ))}
    </View>
  )
}
