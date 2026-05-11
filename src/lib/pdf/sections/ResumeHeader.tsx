import { Image, Text, View } from '@react-pdf/renderer'
import { contact } from '../../../data/contact'
import { profile } from '../../../data/profile'
import { styles } from '../styles'

const PHOTO_URL = '/my-website/images/profile.webp'

export function ResumeHeader() {
  const contactLine = [
    profile.location,
    contact.email,
    contact.github.replace('https://', ''),
    contact.linkedin.replace('https://', ''),
  ].join(' · ')

  return (
    <View style={styles.header}>
      <Image src={PHOTO_URL} style={styles.headerPhoto} />
      <View style={styles.headerDetails}>
        <Text style={styles.headerName}>{profile.name}</Text>
        <Text style={styles.headerHeadline}>{profile.headline}</Text>
        <Text style={styles.headerContact}>{contactLine}</Text>
      </View>
    </View>
  )
}
