// src/app/pricing/page.tsx
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
      target: 'Mid-size companies, agencies, tech teams'
    },
    {
      name: 'Enterprise',
      subtitle: 'For large organizations & government',
      icon: <Building2 className="w-8 h-8 text-green-500" />,
      monthlyPrice: 'RM 899',
      yearlyPrice: 'RM 719',
      documents: '100,000+ documents/month',
      features: [
        'Premium OCR with custom models',
        'All languages + regional dialects',
        'Maximum accuracy (95%+)',
        'Ultra-fast processing (<0.8s)',
        'White-label dashboard',
        'Unlimited API calls',
        'Dedicated account manager',
        'On-premise deployment option',
        'Custom integrations',
        'SLA guarantees',
        'Advanced security & compliance',
        'Training & onboarding'
      ],
      notIncluded: [],
      popular: false,
      ctaText: 'Contact Sales',
      target: 'Enterprises, banks, government agencies'
    }
  ];

  const addOnServices = [
    {
      name: 'Custom Model Training',
      description: 'Train specialized models for your specific document types',
      price: 'From RM 5,000',
      icon: <Award className="w-6 h-6 text-orange-500" />
    },
    {
      name: 'Professional Integration',
      description: 'Full API integration & custom development',
      price: 'From RM 10,000',
      icon: <Globe className="w-6 h-6 text-blue-500" />
    },
    {
      name: 'Dedicated Cloud Instance',
      description: 'Private cloud deployment for maximum security',
      price: 'From RM 2,000/month',
      icon: <Shield className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to MataOCR</span>
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/pricing" className="text-blue-600 font-semibold">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-blue-600">MataOCR</span> Plan
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              See Better, Read Smarter - AI-powered OCR for Southeast Asia
            </p>
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <span>🎉</span>
              <span>14-day free trial • No credit card required</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
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
                
                <div className="p-8">
                  {/* Tier Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      {tier.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 text-sm">{tier.subtitle}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {tier.monthlyPrice}
                      </span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{tier.documents}</p>
                  </div>

                  {/* Features */}
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

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        : tier.name === 'Enterprise'
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {tier.ctaText}
                  </button>

                  {/* Target Audience */}
                  <p className="text-center text-xs text-gray-500 mt-4">
                    Ideal for: {tier.target}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add-on Services */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Professional Services & Add-ons
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {addOnServices.map((service, index) => (
                <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <p className="font-bold text-blue-600">{service.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Advantages */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Why Choose MataOCR Over General AI?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">10x Faster</h4>
                <p className="text-sm opacity-90">1.6s vs 15s compared to ChatGPT</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">5x More Accurate</h4>
                <p className="text-sm opacity-90">96% vs 70% for Malaysian documents</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">100% Data Privacy</h4>
                <p className="text-sm opacity-90">On-premise deployment available</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">10x Cheaper</h4>
                <p className="text-sm opacity-90">90% cost savings vs general AI</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
                <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 text-sm">We accept credit cards, bank transfers, and Malaysian online banking through our secure payment partners.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
                <p className="text-gray-600 text-sm">Absolutely. We're PDPA compliant and offer on-premise deployment for maximum security and data sovereignty.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer custom integrations?</h4>
                <p className="text-gray-600 text-sm">Yes, our Enterprise plan includes custom integrations and dedicated support for seamless system integration.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Document Processing?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 50+ Malaysian organizations already using MataOCR for faster, more accurate document processing.
              Start with a 14-day free trial - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start 14-Day Free Trial
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
