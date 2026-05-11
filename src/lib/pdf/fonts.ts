import { Font } from '@react-pdf/renderer'

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/my-website/fonts/inter-400.woff2', fontWeight: 400 },
    { src: '/my-website/fonts/inter-600.woff2', fontWeight: 600 },
    { src: '/my-website/fonts/inter-700.woff2', fontWeight: 700 },
  ],
})
