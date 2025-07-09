<<<<<<< HEAD
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MataOCR - Train Smarter OCR. With Less Effort",
  description: "AI-powered OCR for Southeast Asian languages",
};
=======
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
    default: 'MataOCR - AI-Powered OCR for Southeast Asia',
    template: '%s | MataOCR'
  },
  description: 'See Better, Read Smarter. Process documents in Bahasa Malaysia, English, Chinese, Tamil & Jawi with 96% accuracy.',
  keywords: [
    'OCR',
    'Optical Character Recognition',
    'Malaysia',
    'Bahasa Malaysia',
    'Jawi',
    'AI',
    'Machine Learning',
    'Document Processing',
    'MyKad',
    'Southeast Asia'
  ],
  authors: [{ name: 'VisionTech Malaysia' }],
  creator: 'VisionTech Malaysia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ms_MY', 'zh_CN', 'ta_IN'],
    url: 'https://mataocr.com',
    siteName: 'MataOCR',
    title: 'MataOCR - AI-Powered OCR for Southeast Asia',
    description: 'See Better, Read Smarter. Process documents in multiple Southeast Asian languages with high accuracy.',
    images: [
      {
        url: 'https://mataocr.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MataOCR - AI-Powered OCR',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MataOCR - AI-Powered OCR for Southeast Asia',
    description: 'See Better, Read Smarter. Process documents in multiple languages with 96% accuracy.',
    images: ['https://mataocr.com/og-image.png'],
    creator: '@mataocr',
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
>>>>>>> 61e2d6470e16575b47b3785e3000e32d2e01ab9d

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        {children}
=======
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </ThemeProvider>
        <Analytics />
>>>>>>> 61e2d6470e16575b47b3785e3000e32d2e01ab9d
      </body>
    </html>
  )
}
