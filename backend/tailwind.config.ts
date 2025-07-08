import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mata: {
          blue: '#1e40af',
          purple: '#7c3aed',
          teal: '#14b8a6',
          red: '#cc0000',
        },
      },
    },
  },
  plugins: [],
}
export default config
