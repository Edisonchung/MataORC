'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  FileText, 
  Code, 
  Shield, 
  Zap,
  Clock,
  Users,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Book,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const quickLinks = [
    {
      title: 'Getting Started',
      description: 'New to MataOCR? Learn the basics',
      icon: <Book className="w-6 h-6" />,
      href: '/help/getting-started',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'API Documentation',
      description: 'Complete integration guide',
      icon: <Code className="w-6 h-6" />,
      href: '/api-docs',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Supported Languages',
      description: 'Malaysian language optimization',
      icon: <FileText className="w-6 h-6" />,
      href: '/help/languages',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Security & Compliance',
      description: 'PDPA compliance and data security',
      icon: <Shield className="w-6 h-6" />,
      href: '/help/security',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Performance Guide',
      description: 'Optimize OCR accuracy and speed',
      icon: <Zap className="w-6 h-6" />,
      href: '/help/performance',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Billing & Pricing',
      description: 'Plans, payments, and upgrades',
      icon: <Users className="w-6 h-6" />,
      href: '/help/billing',
      color: 'bg-pink-50 text-pink-600'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is MataOCR for Malaysian documents?',
      answer: 'MataOCR achieves 94%+ accuracy for Malaysian documents, specifically optimized for MyKad, passports, invoices, and official government forms. Our specialized training on Malaysian languages (Bahasa Malaysia, Chinese, Tamil, Arabic/Jawi) provides significantly better results than general OCR solutions.'
    },
    {
      question: 'What file formats and sizes are supported?',
      answer: 'We support JPG, PNG, GIF, and PDF files up to 10MB. For best results, use clear, well-lit images with minimal glare. Passport and MyKad images work best in landscape orientation.'
    },
    {
      question: 'Is my data secure and PDPA compliant?',
      answer: 'Yes, MataOCR is fully PDPA compliant. We offer data sovereignty options including on-premise deployment for government and enterprise customers. All data processing can be kept within Malaysia, and we don\'t store your documents after processing.'
    },
    {
      question: 'How fast is the OCR processing?',
      answer: 'Our average processing time is under 2 seconds for most documents. Professional plan customers get priority processing with average times under 1.2 seconds. This is 10x faster than general AI models like ChatGPT.'
    },
    {
      question: 'Can I integrate MataOCR with my existing system?',
      answer: 'Absolutely! We provide REST APIs with comprehensive documentation, code examples in multiple languages (JavaScript, Python, PHP, cURL), and SDKs. Our technical team offers integration support for enterprise customers.'
    },
    {
      question: 'What languages are supported?',
      answer: 'We support 5 Southeast Asian languages: Bahasa Malaysia (primary optimization), English, Chinese (Simplified), Tamil, and Arabic/Jawi. Each language has specialized models trained on regional document types.'
    },
    {
      question: 'What happens if I exceed my monthly limit?',
      answer: 'We\'ll send notifications when you approach your limit. You can upgrade your plan anytime or purchase additional credits. Processing continues at a reduced priority for overage, ensuring your workflow isn\'t interrupted.'
    },
    {
      question: 'Do you offer enterprise support and custom solutions?',
      answer: 'Yes! Enterprise customers get dedicated account managers, custom model training, on-premise deployment options, SLA guarantees, and priority support. Contact our sales team for custom solutions.'
    },
    {
      question: 'How does MataOCR compare to ChatGPT or Google Vision?',
      answer: 'MataOCR is specifically optimized for Malaysian documents, offering 10x faster processing, 90% cost savings, and 5x better accuracy for local document types. Unlike general AI models, we provide data sovereignty and PDPA compliance.'
    },
    {
      question: 'Can I cancel or change my plan?',
      answer: 'Yes, you can upgrade, downgrade, or cancel your plan anytime. Changes take effect immediately with prorated billing. Cancelled accounts retain data access for 30 days for export purposes.'
    }
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Mon-Fri 9 AM - 6 PM (MYT)',
      action: 'Start Chat',
      icon: <MessageCircle className="w-5 h-5" />,
      href: '/contact'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      icon: <Mail className="w-5 h-5" />,
      href: '/contact'
    },
    {
      title: 'Phone Support',
      description: 'Talk to our technical experts',
      availability: 'Enterprise customers only',
      action: 'Schedule Call',
      icon: <Phone className="w-5 h-5" />,
      href: '/contact'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to MataOCR</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                Contact Support
              </Link>
              <Link 
                href="/api-docs"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find answers to common questions, learn how to use MataOCR effectively, 
            and get the most out of your OCR processing.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Popular Topics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white p-6 rounded-lg border hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h4>
                <p className="text-gray-600 mb-4">{link.description}</p>
                <div className="flex items-center text-blue-600">
                  <span className="text-sm font-medium">Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="bg-white rounded-lg border divide-y">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h4 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h4>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFAQ === index && (
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="bg-white rounded-lg border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Still need help?
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Our support team is here to help you succeed with MataOCR
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className="text-center p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {option.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h4>
                <p className="text-gray-600 mb-2">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
                <Link
                  href={option.href}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {option.action}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to get started?
          </h3>
          <p className="text-blue-100 mb-6">
            Try our live demo or dive into our comprehensive API documentation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#demo"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Live Demo
            </Link>
            <Link 
              href="/api-docs"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
