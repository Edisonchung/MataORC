'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  Code,
  CreditCard,
  Settings,
  Shield,
  Zap,
  ExternalLink,
  Globe
} from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    category: 'technical',
    message: '',
    planType: 'starter'
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

  const supportCategories = [
    {
      id: 'technical',
      label: 'Technical Issues',
      description: 'API integration, OCR accuracy, processing errors',
      icon: <Code className="w-5 h-5" />,
      responseTime: '4-12 hours'
    },
    {
      id: 'billing',
      label: 'Billing & Account',
      description: 'Payment issues, plan changes, usage questions',
      icon: <CreditCard className="w-5 h-5" />,
      responseTime: '2-6 hours'
    },
    {
      id: 'feature',
      label: 'Feature Request',
      description: 'New features, improvements, custom solutions',
      icon: <Settings className="w-5 h-5" />,
      responseTime: '1-3 days'
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      description: 'PDPA compliance, data security, audit questions',
      icon: <Shield className="w-5 h-5" />,
      responseTime: '2-8 hours'
    },
    {
      id: 'performance',
      label: 'Performance Issues',
      description: 'Slow processing, accuracy problems, optimization',
      icon: <Zap className="w-5 h-5" />,
      responseTime: '4-12 hours'
    },
    {
      id: 'general',
      label: 'General Support',
      description: 'General questions, how-to guides, best practices',
      icon: <MessageCircle className="w-5 h-5" />,
      responseTime: '6-24 hours'
    }
  ];

  const quickActions = [
    {
      title: 'Check System Status',
      description: 'View current API status and known issues',
      icon: <Globe className="w-6 h-6" />,
      href: 'https://status.mataocr.com',
      external: true
    },
    {
      title: 'Browse Help Center',
      description: 'Find answers to common questions',
      icon: <FileText className="w-6 h-6" />,
      href: '/help'
    },
    {
      title: 'API Documentation',
      description: 'Complete integration guides and examples',
      icon: <Code className="w-6 h-6" />,
      href: '/api-docs'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other MataOCR developers',
      icon: <MessageCircle className="w-6 h-6" />,
      href: 'https://community.mataocr.com',
      external: true
    }
  ];

  const supportTiers = [
    {
      plan: 'Starter',
      features: ['Email support', 'Help center access', 'Community forum'],
      responseTime: '24-48 hours'
    },
    {
      plan: 'Professional',
      features: ['Priority email support', 'Live chat', 'Phone support', 'Technical consultation'],
      responseTime: '4-12 hours'
    },
    {
      plan: 'Enterprise',
      features: ['Dedicated account manager', '24/7 priority support', 'Custom SLA', 'Direct phone line'],
      responseTime: '1-4 hours'
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
              <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help" className="text-gray-600 hover:text-gray-900">
                Help Center
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We're Here to Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get expert support for MataOCR. Our team of Malaysian OCR specialists 
            is ready to help you succeed.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Try These First</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="bg-white p-6 rounded-lg border hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  {action.external && <ExternalLink className="w-4 h-4 text-gray-400" />}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Support Form */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Support Request Sent!</h3>
                <p className="text-gray-600 mb-4">
                  We've received your request and will respond within the expected timeframe for your plan.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Ticket ID:</strong> #SUP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      priority: 'medium',
                      category: 'technical',
                      message: '',
                      planType: 'starter'
                    });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submit Support Request</h3>
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {supportCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
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
                      placeholder="Brief description of your issue"
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
                      placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and your expected outcome..."
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-yellow-800 font-medium">For faster resolution:</p>
                        <ul className="text-yellow-700 mt-1 space-y-1">
                          <li>• Include specific error messages or codes</li>
                          <li>• Mention your plan type and usage details</li>
                          <li>• Attach relevant screenshots or documents</li>
                          <li>• Provide steps to reproduce the issue</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Support Request
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Support Information */}
          <div className="space-y-8">
            {/* Support Categories */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Support Categories</h3>
              <div className="space-y-4">
                {supportCategories.map((category) => (
                  <div key={category.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {category.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{category.label}</h4>
                      <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        Response: {category.responseTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Tiers */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Support by Plan</h3>
              <div className="space-y-4">
                {supportTiers.map((tier, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{tier.plan}</h4>
                      <span className="text-sm text-green-600 font-medium">
                        {tier.responseTime}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Support</h3>
              <p className="text-red-800 text-sm mb-4">
                For critical production issues affecting Enterprise customers
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-red-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+60 3-2123-4567 (24/7 hotline)</span>
                </div>
                <div className="flex items-center text-red-700">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>emergency@mataocr.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
