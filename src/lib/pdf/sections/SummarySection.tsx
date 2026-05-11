import { Text, View } from '@react-pdf/renderer'
import { profile } from '../../../data/profile'
import { skills } from '../../../data/skills'
import type { FilterOptions } from '../types'
import { styles } from '../styles'

interface SummarySectionProps {
  filter: FilterOptions | undefined
}

function getItems(types: string[], filter: FilterOptions | undefined): string[] {
  const items = skills.filter((c) => types.includes(c.type)).flatMap((c) => c.items)
  if (!filter) return items
  return items.filter((s) => filter.selectedSkills.has(s))
}

function SkillRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillLabel}>{label} </Text>
      <Text style={styles.skillValue}>{items.join(', ')}</Text>
    </View>
  )
}

export function SummarySection({ filter }: SummarySectionProps) {
  const technical = getItems(['technical', 'language'], filter)
  const domain = getItems(['domain'], filter)
  const soft = getItems(['soft'], undefined)

  return (
    <View>
      <Text style={styles.sectionHeading}>Summary</Text>
      <Text style={styles.summaryParagraph}>{profile.summary}</Text>
      <SkillRow label="Technical Skills:" items={technical} />
      <SkillRow label="Domain Expertise:" items={domain} />
      <SkillRow label="Soft Skills:" items={soft} />
    </View>
  )
}
