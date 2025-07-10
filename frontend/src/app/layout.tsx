import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'MataOCR - AI-Powered OCR for Southeast Asia',
  description: 'See Better, Read Smarter. Process documents in Bahasa Malaysia, English, Chinese, Tamil & Jawi with 96% accuracy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
