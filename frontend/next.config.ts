/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [
      'mataocr.com',
      'api.mataocr.com',
      'localhost',
      'images.unsplash.com' // for demo images
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Internationalization for ASEAN expansion
  i18n: {
    locales: ['en', 'ms', 'zh', 'ta'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'MataOCR',
    NEXT_PUBLIC_APP_TAGLINE: 'See Better, Read Smarter',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://mataocr.com',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.mataocr.com',
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/api-docs',
        permanent: false,
      },
    ]
  },

  // Rewrites for API proxy during development
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/:path*`,
      },
    ]
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle canvas for OCR visualization
    if (!isServer) {
      config.externals.push({
        canvas: 'canvas',
      })
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
