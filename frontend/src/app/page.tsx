// src/app/page.tsx - Enhanced Homepage
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  FileText, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  Clock,
  Award,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';

// Import components
import OCRDemo from '@/components/features/OCRDemo';
import LanguageSelector from '@/components/features/LanguageSelector';

export default function HomePage() {
  const [demoImage, setDemoImage] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('ms');

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "10x Faster Processing",
      description: "Process Malaysian documents in under 2 seconds vs 20+ seconds with general AI models",
      metric: "1.3s avg"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "PDPA Compliant",
      description: "100% data sovereignty with on-premise deployment options for government and enterprise",
      metric: "100% secure"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Malaysian Specialized",
      description: "Optimized for Bahasa Malaysia, Chinese, Tamil, English, and Jawi/Arabic",
      metric: "5 languages"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
      title: "94% Accuracy",
      description: "Superior accuracy for Malaysian documents, MyKad, passports, and official forms",
      metric: "94.2% avg"
    }
  ];

  const stats = [
    { label: "Documents Processed", value: "100K+", icon: <FileText className="w-6 h-6" /> },
    { label: "Accuracy Rate", value: "94.2%", icon: <Award className="w-6 h-6" /> },
    { label: "Processing Speed", value: "1.3s", icon: <Clock className="w-6 h-6" /> },
    { label: "Languages Supported", value: "5", icon: <Globe className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      quote: "MataOCR reduced our document processing time by 85%. The Malaysian language optimization is game-changing.",
      author: "Ahmad Rahman",
      title: "IT Director, Government Agency",
      rating: 5
    },
    {
      quote: "Finally, an OCR solution that understands Malaysian documents. Fast, accurate, and PDPA compliant.",
      author: "Sarah Lim",
      title: "Digital Transformation Lead, Bank",
      rating: 5
    },
    {
      quote: "The API integration was seamless. We're processing 1000+ invoices daily with 95% accuracy.",
      author: "Dr. Rajesh Kumar",
      title: "CTO, Healthcare System",
      rating: 5
    }
  ];

  const useCases = [
    {
      title: "Government Digitization",
      description: "MyKad, passports, official forms, and multi-language documents",
      icon: <Users className="w-12 h-12 text-blue-500" />,
      benefits: ["PDPA Compliant", "Multi-language support", "On-premise options"]
    },
    {
      title: "Financial Services",
      description: "KYC documents, loan applications, insurance claims processing",
      icon: <Shield className="w-12 h-12 text-green-500" />,
      benefits: ["High accuracy", "Fast processing", "Secure handling"]
    },
    {
      title: "Healthcare Systems",
      description: "Patient records, insurance forms, medical certificates",
      icon: <FileText className="w-12 h-12 text-red-500" />,
      benefits: ["Healthcare compliant", "Multi-format support", "API integration"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MataOCR</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600">Demo</a>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
              <Link href="/api-docs" className="text-gray-600 hover:text-blue-600">API Docs</Link>
              <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                See Better,<br />
                <span className="text-yellow-300">Read Smarter</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Malaysia's first AI-powered OCR platform specialized for Southeast Asian languages and documents. 
                10x faster, 90% cheaper, 100% compliant.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="#demo"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Link>
                <Link 
                  href="/pricing"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-yellow-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Quick API Test</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                <div>curl -X POST https://api.mataocr.com/ocr \</div>
                <div className="ml-4">-H "Content-Type: multipart/form-data" \</div>
                <div className="ml-4">-F "file=@mykad.jpg" \</div>
                <div className="ml-4">-F "language=ms"</div>
                <div className="mt-2 text-blue-300">
                  {"{ \"text\": \"MALAYSIA\", \"confidence\": 0.94 }"}
                </div>
              </div>
              <Link 
                href="/api-docs"
                className="inline-flex items-center mt-4 text-yellow-300 hover:text-yellow-200"
              >
                View Full Documentation
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Malaysian Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The only OCR platform specifically optimized for Malaysian languages, 
              compliance requirements, and document types.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-2xl font-bold text-blue-600">{feature.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Try MataOCR Live Demo
            </h2>
            <p className="text-xl text-gray-600">
              Upload a Malaysian document and see instant results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Language</h3>
                  <LanguageSelector 
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                  />
                </div>
                <div>
                  <OCRDemo 
                    language={selectedLanguage}
                    apiEndpoint="https://mataocr-production.up.railway.app"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Malaysian Organizations
            </h2>
            <p className="text-xl text-gray-600">
              From government agencies to financial institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border">
                <div className="mb-6">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Document Processing?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join leading Malaysian organizations using MataOCR
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/api-docs"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold">MataOCR</span>
              </div>
              <p className="text-gray-400">
                Malaysia's leading AI-powered OCR platform for Southeast Asian languages.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/pricing" className="block hover:text-white">Pricing</Link>
                <Link href="/api-docs" className="block hover:text-white">API Docs</Link>
                <Link href="/dashboard" className="block hover:text-white">Dashboard</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-white">About</Link>
                <Link href="/contact" className="block hover:text-white">Contact</Link>
                <Link href="/privacy" className="block hover:text-white">Privacy</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>hello@mataocr.com</p>
                <p>Kuala Lumpur, Malaysia</p>
                <p>PDPA Compliant</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MataOCR. All rights reserved. See Better, Read Smarter.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
