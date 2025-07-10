'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle, 
  Code, 
  FileText, 
  Zap, 
  ExternalLink,
  Book,
  Terminal,
  Globe,
  Shield
} from 'lucide-react';

export default function APIDocsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Book className="w-4 h-4" /> },
    { id: 'quickstart', label: 'Quick Start', icon: <Zap className="w-4 h-4" /> },
    { id: 'endpoints', label: 'API Reference', icon: <Terminal className="w-4 h-4" /> },
    { id: 'examples', label: 'Examples', icon: <Code className="w-4 h-4" /> }
  ];

  const languages = [
    { id: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { id: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { id: 'ar', name: 'Arabic/Jawi', flag: '🕌' }
  ];

  const codeExamples = {
    curl: `curl -X POST https://mataocr-production.up.railway.app/ocr \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@document.jpg" \\
  -F "language=ms" \\
  -F "confidence_threshold=0.7"`,
    
    javascript: `const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('language', 'ms');
formData.append('confidence_threshold', '0.7');

const response = await fetch('https://mataocr-production.up.railway.app/ocr', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);`,

    python: `import requests

url = 'https://mataocr-production.up.railway.app/ocr'
files = {'file': open('document.jpg', 'rb')}
data = {
    'language': 'ms',
    'confidence_threshold': 0.7
}

response = requests.post(url, files=files, data=data)
result = response.json()
print(result)`,

    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://mataocr-production.up.railway.app/ocr',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => array(
        'file' => new CURLFile('document.jpg'),
        'language' => 'ms',
        'confidence_threshold' => '0.7'
    ),
));

$response = curl_exec($curl);
curl_close($curl);

$result = json_decode($response, true);
print_r($result);
?>`
  };

  const responseExample = `{
  "success": true,
  "text": "MALAYSIA\\nMYKAD\\n123456-78-9012\\nAHMAD BIN ALI",
  "confidence": 0.942,
  "language_detected": "ms",
  "processing_time": 1.35,
  "bounding_boxes": [
    {
      "text": "MALAYSIA",
      "bbox": [45, 23, 156, 67],
      "confidence": 0.98
    }
  ],
  "metadata": {
    "file_size": 245760,
    "file_type": "image/jpeg",
    "filename": "mykad.jpg",
    "processing_engine": "paddleocr",
    "service_version": "2.0.0"
  }
}`;

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
              <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://mataocr-production.up.railway.app/docs"
                className="text-blue-600 hover:text-blue-700 flex items-center"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Interactive Docs
              </Link>
              <Link 
                href="/pricing"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* API Status */}
            <div className="mt-8 bg-white rounded-lg p-4 border">
              <h3 className="font-semibold text-gray-900 mb-3">API Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Live
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version</span>
                  <span className="text-gray-900">v2.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="text-gray-900">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">MataOCR API</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Powerful OCR API specialized for Malaysian documents and Southeast Asian languages. 
                      Process images with industry-leading accuracy and speed.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                      <p className="text-sm text-gray-600">Processing under 2 seconds</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">PDPA Compliant</h3>
                      <p className="text-sm text-gray-600">Data sovereignty guaranteed</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Multi-Language</h3>
                      <p className="text-sm text-gray-600">5 Southeast Asian languages</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Supported Languages</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl">{lang.flag}</span>
                          <div>
                            <div className="font-medium text-gray-900">{lang.name}</div>
                            <div className="text-sm text-gray-600">Code: {lang.id}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Base URL</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">https://mataocr-production.up.railway.app</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Start Tab */}
              {activeTab === 'quickstart' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
                    <p className="text-lg text-gray-600">
                      Get started with MataOCR API in minutes
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Make Your First Request</h3>
                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(codeExamples.curl, 'curl-quick')}
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                        >
                          {copiedCode === 'curl-quick' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.curl}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Expected Response</h3>
                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(responseExample, 'response-quick')}
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                        >
                          {copiedCode === 'response-quick' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <pre className="text-blue-400 text-sm overflow-x-auto max-h-64 overflow-y-auto">
                          <code>{responseExample}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Reference Tab */}
              {activeTab === 'endpoints' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
                    <p className="text-lg text-gray-600">Complete reference for all endpoints</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        POST
                      </span>
                      <code className="text-lg font-mono text-gray-900">/ocr</code>
                    </div>
                    <p className="text-gray-600 mb-4">Process image for OCR text extraction</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Parameters</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Name</th>
                              <th className="text-left py-2">Type</th>
                              <th className="text-left py-2">Required</th>
                              <th className="text-left py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 font-mono text-blue-600">file</td>
                              <td className="py-2 text-gray-600">File</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">Required</span>
                              </td>
                              <td className="py-2 text-gray-600">Image file (JPG, PNG, etc.)</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-mono text-blue-600">language</td>
                              <td className="py-2 text-gray-600">string</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">Optional</span>
                              </td>
                              <td className="py-2 text-gray-600">Language code (ms, en, zh, ta, ar)</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono text-blue-600">confidence_threshold</td>
                              <td className="py-2 text-gray-600">float</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">Optional</span>
                              </td>
                              <td className="py-2 text-gray-600">Minimum confidence (0.0-1.0)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Examples Tab */}
              {activeTab === 'examples' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Code Examples</h2>
                    <p className="text-lg text-gray-600">Ready-to-use examples in popular languages</p>
                  </div>

                  <div className="space-y-8">
                    {Object.entries(codeExamples).map(([lang, code]) => (
                      <div key={lang}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 capitalize">{lang}</h3>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(code, `${lang}-example`)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                          >
                            {copiedCode === `${lang}-example` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <pre className="text-green-400 text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
