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

// src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}

// src/app/pricing/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, Zap, Shield, Globe, Users, FileText, Clock, Award, Building2, ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      subtitle: 'Perfect for small businesses',
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      monthlyPrice: 'RM 99',
      yearlyPrice: 'RM 79',
      documents: '1,000 documents/month',
      features: [
        'Basic OCR processing',
        'Malaysian + English support',
        'Standard accuracy (89%)',
        'Web dashboard access',
        'Email support',
        'API access (limited)',
        'PDPA compliant'
      ],
      notIncluded: [
        'Premium languages',
        'Custom models',
        'On-premise deployment',
        'Dedicated support'
      ],
      popular: false,
      ctaText: 'Start Free Trial',
      target: 'SMEs, startups, small organizations'
    },
    {
      name: 'Professional',
      subtitle: 'Most popular for growing businesses',
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      monthlyPrice: 'RM 299',
      yearlyPrice: 'RM 239',
      documents: '10,000 documents/month',
      features: [
        'Advanced OCR processing',
        '5 languages (ms, en, zh, ta, ar)',
        'Enhanced accuracy (92%)',
        'Priority processing (<1.2s)',
        'Advanced dashboard & analytics',
        'Full API access',
        'Phone + email support',
        'Bulk processing tools',
        'Data export features'
      ],
      notIncluded: [
        'Custom model training',
        'On-premise deployment',
        'Dedicated account manager'
      ],
      popular: true,
      ctaText: 'Start Free Trial',
      target: 'Mid-size companies, government agencies'
    },
    {
      name: 'Enterprise',
      subtitle: 'For large organizations',
      icon: <Building2 className="w-8 h-8 text-green-500" />,
      monthlyPrice: 'RM 899',
      yearlyPrice: 'RM 719',
      documents: '100,000+ documents/month',
      features: [
        'Premium OCR processing',
        'All languages + custom models',
        'Maximum accuracy (95%+)',
        'Ultra-fast processing (<1s)',
        'Custom dashboard & reporting',
        'White-label API',
        'Dedicated account manager',
        'On-premise deployment',
        'Custom integrations',
        'SLA guarantees',
        'Training & consulting'
      ],
      notIncluded: [],
      popular: false,
      ctaText: 'Contact Sales',
      target: 'Large enterprises, government ministries'
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Pricing Plans</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact Sales
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your organization's needs. All plans include our 
            specialized Malaysian OCR technology with industry-leading accuracy.
          </p>
          
          <div className="inline-flex items-center bg-blue-50 rounded-lg p-1">
            <button className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium">
              Monthly Billing
            </button>
            <button className="px-4 py-2 text-gray-600 rounded-md font-medium">
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                tier.popular 
                  ? 'border-purple-500 transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm">{tier.subtitle}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{tier.documents}</p>
              </div>

              <div className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {tier.notIncluded.map((feature, idx) => (
                  <div key={idx} className="flex items-start opacity-60">
                    <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : tier.name === 'Enterprise'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {tier.ctaText}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">{tier.target}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Feature Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Features</th>
                  <th className="text-center py-3 px-4">Starter</th>
                  <th className="text-center py-3 px-4">Professional</th>
                  <th className="text-center py-3 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Monthly Documents</td>
                  <td className="py-3 px-4 text-center">1,000</td>
                  <td className="py-3 px-4 text-center">10,000</td>
                  <td className="py-3 px-4 text-center">100,000+</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Processing Speed</td>
                  <td className="py-3 px-4 text-center">~2s</td>
                  <td className="py-3 px-4 text-center">&lt;1.2s</td>
                  <td className="py-3 px-4 text-center">&lt;1s</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Accuracy Rate</td>
                  <td className="py-3 px-4 text-center">89%</td>
                  <td className="py-3 px-4 text-center">92%</td>
                  <td className="py-3 px-4 text-center">95%+</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Languages</td>
                  <td className="py-3 px-4 text-center">2</td>
                  <td className="py-3 px-4 text-center">5</td>
                  <td className="py-3 px-4 text-center">All + Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">API Access</td>
                  <td className="py-3 px-4 text-center">Limited</td>
                  <td className="py-3 px-4 text-center">Full</td>
                  <td className="py-3 px-4 text-center">White-label</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Support</td>
                  <td className="py-3 px-4 text-center">Email</td>
                  <td className="py-3 px-4 text-center">Phone + Email</td>
                  <td className="py-3 px-4 text-center">Dedicated Manager</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">On-premise</td>
                  <td className="py-3 px-4 text-center">-</td>
                  <td className="py-3 px-4 text-center">-</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. 
                Changes take effect immediately with prorated billing.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my monthly limit?
              </h4>
              <p className="text-gray-600">
                We'll notify you when you're approaching your limit. 
                You can upgrade your plan or purchase additional credits.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600">
                Yes! All plans include a 14-day free trial with full access to features. 
                No credit card required to start.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer volume discounts?
              </h4>
              <p className="text-gray-600">
                Yes, we offer custom pricing for high-volume customers and 
                government organizations. Contact our sales team.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h4>
              <p className="text-gray-600">
                Absolutely. We're PDPA compliant with enterprise-grade security. 
                Data can be processed locally in Malaysia for sovereignty.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards, bank transfers, and 
                government purchase orders for Enterprise plans.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-6">
              Join 50+ Malaysian organizations using MataOCR for faster, more accurate document processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#demo"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Try Free Demo
              </Link>
              <Link 
                href="/contact"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Building2,
  Code,
  Headphones
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Sales Inquiries',
      description: 'Pricing, demos, and enterprise solutions',
      contact: 'sales@mataocr.com',
      response: 'Response within 4 hours'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Technical Support',
      description: 'API integration and developer help',
      contact: 'support@mataocr.com',
      response: 'Response within 12 hours'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Enterprise Solutions',
      description: 'Custom implementations for large organizations',
      contact: 'enterprise@mataocr.com',
      response: 'Response within 2 hours'
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your document processing? We're here to help you succeed with MataOCR.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      subject: '',
                      message: '',
                      category: 'general'
                    });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ahmad Rahman"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ahmad@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Methods</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {method.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{method.title}</h4>
                      <p className="text-gray-600 mb-2">{method.description}</p>
                      <p className="text-blue-600 font-medium">{method.contact}</p>
                      <p className="text-sm text-gray-500">{method.response}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help Right Away?</h3>
              <div className="space-y-3">
                <Link href="/api-docs" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → View API Documentation
                </Link>
                <Link href="/pricing" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → Check Pricing Plans
                </Link>
                <Link href="/#demo" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → Try Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
