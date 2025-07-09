import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Globe, Zap, Shield, Users } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { OCRDemo } from '@/components/features/OCRDemo'
import { LanguageSelector } from '@/components/features/LanguageSelector'

const features = [
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Native support for Bahasa Malaysia, English, Chinese, Tamil, and Jawi scripts.',
  },
  {
    icon: Zap,
    title: '96% Accuracy',
    description: 'Industry-leading accuracy powered by ensemble AI models and active learning.',
  },
  {
    icon: Shield,
    title: 'Data Privacy',
    description: 'On-premise deployment options. Your data never leaves your infrastructure.',
  },
  {
    icon: Users,
    title: 'Made for Malaysia',
    description: 'Built specifically for Malaysian documents including MyKad, forms, and receipts.',
  },
]

const useCases = [
  {
    title: 'Government Agencies',
    description: 'Digitize forms, applications, and citizen documents',
    image: '/images/use-case-government.jpg',
  },
  {
    title: 'Financial Services',
    description: 'Process invoices, receipts, and banking documents',
    image: '/images/use-case-finance.jpg',
  },
  {
    title: 'Healthcare',
    description: 'Digitize medical records and prescriptions',
    image: '/images/use-case-healthcare.jpg',
  },
  {
    title: 'Education',
    description: 'Convert textbooks and exam papers to digital',
    image: '/images/use-case-education.jpg',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative">
          <div className="container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur">
                <span className="mr-2">🇲🇾</span>
                Made in Malaysia for Southeast Asia
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                AI-Powered OCR for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-secondary-200">
                  {' '}Southeast Asia
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                See Better, Read Smarter. Process documents in multiple languages with 96% accuracy. 
                Reduce manual data entry by 90% with MataOCR&apos;s intelligent automation.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/demo">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Try Live Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="mt-8">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built for Malaysian Business Needs
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              MataOCR understands the unique requirements of Southeast Asian documents and languages.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="relative p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See MataOCR in Action
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload an image or try our sample documents to experience the power of MataOCR.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <OCRDemo />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted Across Industries
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From government agencies to startups, MataOCR powers document digitization across Malaysia.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Document Processing?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join leading Malaysian organizations using MataOCR to digitize documents 90% faster.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-primary-100">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
