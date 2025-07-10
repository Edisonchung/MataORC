// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MataOCR - See Better, Read Smarter',
  description: 'AI-powered OCR for Southeast Asia. Process Malaysian documents 10x faster with 95% accuracy.',
  keywords: 'OCR, Malaysia, AI, document processing, text extraction, Southeast Asia',
  authors: [{ name: 'VisionTech Malaysia' }],
  openGraph: {
    title: 'MataOCR - AI-powered OCR for Southeast Asia',
    description: 'Process Malaysian documents 10x faster with 95% accuracy',
    url: 'https://mataocr.com',
    siteName: 'MataOCR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MataOCR - See Better, Read Smarter',
    description: 'AI-powered OCR for Southeast Asia',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
