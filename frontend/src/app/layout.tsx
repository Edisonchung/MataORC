// frontend/src/app/layout.tsx - Updated for MetaOCR
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'MetaOCR - Beyond Traditional OCR',
    template: '%s | MetaOCR'
  },
  description: 'AI that learns how to read better. Process documents with meta-learning OCR that improves with every scan. 96% accuracy across multiple languages.',
  keywords: [
    'OCR',
    'Meta Learning',
    'Optical Character Recognition',
    'AI OCR',
    'Document Processing',
    'Machine Learning',
    'Artificial Intelligence',
    'Southeast Asia',
    'Malaysia',
    'Multi-language OCR'
  ],
  authors: [{ name: 'VisionTech Malaysia' }],
  creator: 'VisionTech Malaysia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ms_MY', 'zh_CN', 'ta_IN'],
    url: 'https://metaocr.com',
    siteName: 'MetaOCR',
    title: 'MetaOCR - Beyond Traditional OCR',
    description: 'AI that learns how to read better. Meta-learning OCR that improves with every document processed.',
    images: [
      {
        url: 'https://metaocr.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MetaOCR - Beyond Traditional OCR',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetaOCR - Beyond Traditional OCR',
    description: 'AI that learns how to read better. Meta-learning OCR with 96% accuracy.',
    images: ['https://metaocr.com/og-image.png'],
    creator: '@metaocr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}
