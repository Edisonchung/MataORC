// src/app/dashboard/page.tsx - Customer Dashboard Preview
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  FileText, 
  Clock, 
  TrendingUp, 
  Users, 
  Settings, 
  Upload,
  Download,
  Eye,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for demonstration
  const stats = {
    totalDocuments: 2847,
    accuracy: 94.2,
    avgProcessingTime: 1.3,
    creditsUsed: 7540,
    creditsRemaining: 2460
  };

  const recentDocuments = [
    {
      id: '001',
      name: 'Invoice_123.pdf',
      type: 'Invoice',
      language: 'ms',
      accuracy: 96.5,
      processingTime: 1.2,
      timestamp: '2025-07-10 14:30',
      status: 'completed'
    },
    {
      id: '002',
      name: 'Contract_ABC.png',
      type: 'Contract',
      language: 'en',
      accuracy: 93.8,
      processingTime: 1.5,
      timestamp: '2025-07-10 14:15',
      status: 'completed'
    },
    {
      id: '003',
      name: 'Receipt_XYZ.jpg',
      type: 'Receipt',
      language: 'zh',
      accuracy: 91.2,
      processingTime: 1.1,
      timestamp: '2025-07-10 14:00',
      status: 'processing'
    }
  ];

  const usageData = [
    { date: '2025-07-04', documents: 340, accuracy: 93.2 },
    { date: '2025-07-05', documents: 420, accuracy: 94.1 },
    { date: '2025-07-06', documents: 380, accuracy: 93.8 },
    { date: '2025-07-07', documents: 510, accuracy: 94.5 },
    { date: '2025-07-08', documents: 450, accuracy: 94.2 },
    { date: '2025-07-09', documents: 390, accuracy: 94.8 },
    { date: '2025-07-10', documents: 357, accuracy: 94.2 }
  ];

  const languageBreakdown = [
    { language: 'Bahasa Malaysia', count: 1200, percentage: 42 },
    { language: 'English', count: 850, percentage: 30 },
    { language: 'Chinese', count: 510, percentage: 18 },
    { language: 'Tamil', count: 200, percentage: 7 },
    { language: 'Arabic/Jawi', count: 87, percentage: 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to MataOCR</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Professional Plan • {stats.creditsRemaining.toLocaleString()} credits remaining
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Documents Processed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments.toLocaleString()}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm">↗ +12% from last week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
                  </div>
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm">↗ +2.1% improvement</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Processing Time</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgProcessingTime}s</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm">↘ 0.2s faster</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Credits Used</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.creditsUsed.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
                <div className="mt-2">
                  <span className="text-gray-600 text-sm">of 10,000 monthly</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">99.8%</p>
                  </div>
                  <Shield className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm">↗ +0.3% this week</span>
                </div>
              </div>
            </div>

            {/* Usage Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Usage Trends</h3>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              
              <div className="h-64 flex items-end space-x-2">
                {usageData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(day.documents / 600) * 200}px` }}
                    ></div>
                    <div className="text-xs text-gray-600 transform -rotate-45">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Language Distribution</h3>
                <div className="space-y-4">
                  {languageBreakdown.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{lang.language}</span>
                          <span className="text-sm text-gray-600">{lang.count} docs</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${lang.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-900">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentDocuments.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-600">{doc.timestamp}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-600">{doc.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Document Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Languages</option>
                    <option>Bahasa Malaysia</option>
                    <option>English</option>
                    <option>Chinese</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Types</option>
                    <option>Invoice</option>
                    <option>Contract</option>
                    <option>Receipt</option>
                  </select>
                  <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Document</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Type</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Language</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Accuracy</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Time</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <span className="font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{doc.type}</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {doc.language.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900">{doc.accuracy}%</span>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{doc.processingTime}s</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 'analytics' || activeTab === 'settings') && (
          <div className="bg-white rounded-lg p-12 shadow-sm border text-center">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'analytics' ? 'Advanced Analytics' : 'Settings Panel'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'analytics' 
                ? 'Detailed analytics and reporting features coming soon.' 
                : 'Account settings and configuration options coming soon.'
              }
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Get Notified
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
