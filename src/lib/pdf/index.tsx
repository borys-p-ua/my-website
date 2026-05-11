import { useCallback, useState } from 'react'
import { ResumeDocument } from './ResumeDocument'
import type { FilterOptions } from './types'

export type { FilterOptions }

export function useResumePdf(filter: FilterOptions | undefined) {
  const [isGenerating, setIsGenerating] = useState(false)

  const download = useCallback(async () => {
    setIsGenerating(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const blob = await pdf(<ResumeDocument filter={filter} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filter ? 'Polietaiev_Borys_Resume_Tailored.pdf' : 'Polietaiev_Borys_Resume.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsGenerating(false)
    }
  }, [filter])

  return { download, isGenerating }
}
