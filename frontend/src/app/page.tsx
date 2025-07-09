// frontend/src/app/page.tsx - MetaOCR Homepage
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Globe, Zap, Shield, Users, Brain, Layers, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { OCRDemo } from '@/components/features/OCRDemo'
import { LanguageSelector } from '@/components/features/LanguageSelector'

const features = [
  {
    icon: Brain,
    title: 'Meta-Learning AI',
    description: 'AI that learns how to learn better. Every document processed improves accuracy for your specific use case.',
  },
  {
    icon: TrendingUp,
    title: '96% Accuracy & Improving',
    description: 'Industry-leading accuracy that gets better with use. Self-improving models adapt to your documents.',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Native support for Bahasa Malaysia, English, Chinese, Tamil, and Jawi scripts with meta-learning adaptation.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'On-premise deployment options. Your data never leaves your infrastructure while AI learns locally.',
  },
  {
    icon: Layers,
    title: 'Domain Adaptation',
    description: 'Few-shot learning automatically adapts to your document types without manual retraining.',
  },
  {
    icon: Users,
    title: 'Made for SEA',
    description: 'Built specifically for Southeast Asian documents, languages, and business requirements.',
  },
]

const useCases = [
  {
    title: 'Government Agencies',
    description: 'Self-improving OCR for forms, applications, and citizen documents',
    image: '/images/use-case-government.jpg',
    metrics: '90% faster processing',
  },
  {
    title: 'Financial Services',
    description: 'Adaptive AI for invoices, receipts, and banking documents',
    image: '/images/use-case-finance.jpg',
    metrics: '95% accuracy on forms',
  },
  {
    title: 'Healthcare',
    description: 'Learning AI for medical records and prescriptions',
    image: '/images/use-case-healthcare.jpg',
    metrics: '98% prescription accuracy',
  },
  {
    title: 'Education',
    description: 'Meta-learning for textbooks and exam papers',
    image: '/images/use-case-education.jpg',
    metrics: 'Multi-language support',
  },
]

const stats = [
  { label: 'Documents Processed', value: '1M+' },
  { label: 'Languages Supported', value: '5+' },
  { label: 'Accuracy Improvement', value: '96%' },
  { label: 'Processing Speed', value: '90% Faster' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 text-white">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative">
          <div className="container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <Brain className="mr-2 h-4 w-4" />
                <span className="mr-2">🚀</span>
                Meta-Learning AI • Made in Malaysia
              </div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                Beyond Traditional
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  {' '}OCR
                </span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-100">
                <strong>MetaOCR</strong> uses meta-learning AI that gets smarter with every document. 
                Process text in multiple languages with 96% accuracy that improves over time.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    See Demo
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-purple-100">
                No credit card required • 14-day free trial • On-premise available
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-white/10">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-purple-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See Meta-Learning in Action
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload a document and watch MetaOCR learn from it in real-time. 
              Each scan improves accuracy for similar document types.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <OCRDemo />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why MetaOCR is Different
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Traditional OCR reads text. MetaOCR learns how to read better with every document processed.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="p-8">
                  <div className="flex items-center">
                    <feature.icon className="h-8 w-8 text-purple-600" />
                    <h3 className="ml-4 text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
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
              From government agencies to enterprises, MetaOCR's adaptive AI powers document digitization across Southeast Asia.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100" />
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">{useCase.title}</h3>
                    <p className="text-gray-600 mb-3">{useCase.description}</p>
                    <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {useCase.metrics}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready for AI That Learns?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-100">
              Join leading Southeast Asian organizations using MetaOCR's meta-learning AI to process documents smarter and faster.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-purple-100">
              ✨ Meta-learning AI • 🏢 Enterprise ready • 🔒 On-premise available • 🇲🇾 Made in Malaysia
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
