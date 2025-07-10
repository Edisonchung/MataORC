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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
              <Link 
                href="/pricing"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Processed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments.toLocaleString()}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgProcessingTime}s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Used</p>
                <p className="text-2xl font-bold text-gray-900">{stats.creditsUsed.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
                <p className="text-2xl font-bold text-gray-900">{stats.creditsRemaining.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'documents', label: 'Recent Documents', icon: <FileText className="w-4 h-4" /> },
                { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Usage Chart */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Daily Usage</h3>
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
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Distribution</h3>
                    <div className="space-y-3">
                      {languageBreakdown.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">{lang.language}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{lang.count}</span>
                            <span className="text-sm text-gray-500">({lang.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link 
                      href="/#demo"
                      className="flex items-center space-x-3 p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900">Process Document</div>
                        <div className="text-sm text-gray-600">Upload and extract text</div>
                      </div>
                    </Link>

                    <Link 
                      href="/api-docs"
                      className="flex items-center space-x-3 p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                    >
                      <FileText className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900">API Documentation</div>
                        <div className="text-sm text-gray-600">Integration guides</div>
                      </div>
                    </Link>

                    <Link 
                      href="/contact"
                      className="flex items-center space-x-3 p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                    >
                      <Users className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="font-medium text-gray-900">Get Support</div>
                        <div className="text-sm text-gray-600">Contact our team</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Language
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Accuracy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Processing Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentDocuments.map((doc) => (
                        <tr key={doc.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                <div className="text-sm text-gray-500">{doc.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {doc.language.toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {doc.accuracy}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {doc.processingTime}s
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              doc.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Accuracy Trends</h4>
                    <div className="h-32 flex items-end space-x-1">
                      {usageData.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-green-500 rounded-t"
                            style={{ height: `${(day.accuracy / 100) * 100}px` }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-1">{day.accuracy}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Document Types</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Invoices</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Contracts</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ID Cards</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Others</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Plan Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
            <Link 
              href="/pricing"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Upgrade Plan
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900">Professional Plan</div>
                <div className="text-sm text-gray-600">RM 299/month</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">10,000 documents/month</div>
                <div className="text-sm text-gray-600">7,540 used • 2,460 remaining</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-purple-500" />
              <div>
                <div className="font-medium text-gray-900">All 5 languages</div>
                <div className="text-sm text-gray-600">Premium accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
