import { Text, View } from '@react-pdf/renderer'
import { contact } from '../../../data/contact'
import { profile } from '../../../data/profile'
import { styles } from '../styles'

export function ResumeHeader() {
  const contactLine = [
    profile.location,
    contact.email,
    contact.github.replace('https://', ''),
    contact.linkedin.replace('https://', ''),
  ].join(' · ')

  return (
    <View style={styles.header}>
      <Text style={styles.headerName}>{profile.name}</Text>
      <Text style={styles.headerHeadline}>{profile.headline}</Text>
      <Text style={styles.headerContact}>{contactLine}</Text>
    </View>
  )
}
