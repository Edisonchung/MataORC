// src/app/page.tsx - Enhanced version with pricing preview and features
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  FileText, 
  Zap, 
  Shield, 
  Globe2, 
  Users, 
  Clock, 
  Award,
  Check,
  ArrowRight,
  Star,
  Building2,
  Target,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

// Import your existing components
import { Card } from '@/components/ui/Card';
import OCRDemo from '@/components/features/OCRDemo';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "10x Faster Processing",
      description: "Process documents in 1.6 seconds vs 15 seconds with general AI models",
      metric: "1.6s",
      comparison: "vs 15s (ChatGPT)"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "5x More Accurate",
      description: "96% accuracy for Malaysian documents vs 70% with general models",
      metric: "96%",
      comparison: "vs 70% (General AI)"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Data Privacy",
      description: "PDPA compliant with on-premise deployment options",
      metric: "100%",
      comparison: "PDPA Compliant"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "10x Cost Effective",
      description: "90% cost savings compared to general AI solutions",
      metric: "90%",
      comparison: "Cost Savings"
    }
  ];

  const languages = [
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic/Jawi', flag: '🕌' }
  ];

  const testimonials = [
    {
      name: "Ahmad Rahman",
      company: "Malaysian Digital Bank",
      quote: "MataOCR processes our Malaysian bank statements 10x faster than our previous solution.",
      avatar: "AR"
    },
    {
      name: "Sarah Lim",
      company: "Government Agency",
      quote: "Finally, an OCR that understands Malaysian documents perfectly. Game changer!",
      avatar: "SL"
    },
    {
      name: "Raj Patel",
      company: "Tech Startup",
      quote: "The API integration was seamless. Our document processing is now fully automated.",
      avatar: "RP"
    }
  ];

  const pricingPreview = [
    {
      name: 'Starter',
      price: 'RM 99',
      features: ['1K docs/month', 'Basic OCR', '89% accuracy'],
      popular: false
    },
    {
      name: 'Professional',
      price: 'RM 299',
      features: ['10K docs/month', 'Advanced OCR', '92% accuracy'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'RM 899',
      features: ['100K+ docs/month', 'Custom models', '95%+ accuracy'],
      popular: false
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
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <a href="#demo" className="text-gray-600 hover:text-gray-900">Demo</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/pricing" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              <span>Trusted by 50+ Malaysian Organizations</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">See Better,</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Read Smarter
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered OCR designed for Southeast Asia. Process Malaysian documents 
              <strong> 10x faster</strong> and <strong>5x more accurately</strong> than general AI models.
            </p>

            {/* Language Support */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#demo"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Try Live Demo</span>
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{feature.metric}</div>
                  <div className="text-sm text-gray-600">{feature.comparison}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why MataOCR Beats General AI Models
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Purpose-built for Southeast Asian languages and documents with unmatched performance and security.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      activeFeature === index ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Demo/Visualization */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="mb-6">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
                <p className="text-blue-100 mb-6">{features[activeFeature].description}</p>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold">{features[activeFeature].metric}</div>
                  <div className="text-sm text-blue-100">{features[activeFeature].comparison}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OCR Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Try MataOCR Live Demo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your Malaysian document and see our AI in action. 
              Process text in seconds with industry-leading accuracy.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <OCRDemo />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core Malaysian OCR technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPreview.map((plan, index) => (
              <Card key={index} className={`relative text-center ${
                plan.popular ? 'border-2 border-purple-500 transform scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</div>
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  Get Started
                </button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/pricing" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>View detailed pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Malaysian Organizations
            </h2>
            <p className="text-gray-600">
              See what our customers are saying about MataOCR
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Document Processing?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join 50+ Malaysian organizations using MataOCR for faster, more accurate OCR.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start 14-Day Free Trial
            </Link>
            <a 
              href="#contact"
              className="border border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                AI-powered OCR for Southeast Asia. See Better, Read Smarter.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#features" className="text-gray-400 hover:text-white block">Features</a>
                <Link href="/pricing" className="text-gray-400 hover:text-white block">Pricing</Link>
                <a href="#demo" className="text-gray-400 hover:text-white block">Demo</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#about" className="text-gray-400 hover:text-white block">About</a>
                <a href="#contact" className="text-gray-400 hover:text-white block">Contact</a>
                <a href="#careers" className="text-gray-400 hover:text-white block">Careers</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#docs" className="text-gray-400 hover:text-white block">Documentation</a>
                <a href="#api" className="text-gray-400 hover:text-white block">API Reference</a>
                <a href="#help" className="text-gray-400 hover:text-white block">Help Center</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 VisionTech Malaysia. All rights reserved. Built with ❤️ in Malaysia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
