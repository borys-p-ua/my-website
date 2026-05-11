import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#1E293B',
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 40,
    paddingRight: 40,
  },

  /* Header */
  header: { flexDirection: 'row', marginBottom: 16 },
  headerPhoto: { width: 72, height: 72, borderRadius: 36, marginRight: 16, objectFit: 'cover' },
  headerDetails: { flex: 1, justifyContent: 'center' },
  headerName: { fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 3 },
  headerHeadline: { fontSize: 11, fontWeight: 400, color: '#334155', marginBottom: 4 },
  headerContact: { fontSize: 9, color: '#64748B' },

  /* Section heading */
  sectionHeading: {
    fontSize: 10,
    fontWeight: 600,
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 16,
  },

  /* Summary */
  summaryParagraph: { fontSize: 9.5, lineHeight: 1.5, color: '#1E293B', marginBottom: 6 },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  skillLabel: { fontSize: 9, fontWeight: 600, color: '#0F172A' },
  skillValue: { fontSize: 9, color: '#1E293B' },

  /* Experience */
  jobEntry: { marginBottom: 10 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  jobCompany: { fontSize: 10, fontWeight: 600, color: '#0F172A' },
  jobDate: { fontSize: 9, color: '#64748B' },
  jobRole: { fontSize: 9.5, fontStyle: 'italic', color: '#334155', marginBottom: 3, marginTop: 2 },
  jobBullet: { fontSize: 9, color: '#1E293B', marginLeft: 12, marginBottom: 2 },
})
