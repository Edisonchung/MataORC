// src/app/api-docs/page.tsx - API Documentation and Integration Examples
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code, 
  Copy, 
  Check, 
  ArrowLeft,
  FileText,
  Zap,
  Shield,
  Globe,
  Terminal,
  Book,
  ExternalLink
} from 'lucide-react';

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState('javascript');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    javascript: {
      setup: `// Install the MataOCR SDK
npm install @mataocr/sdk

// Initialize the client
import { MataOCR } from '@mataocr/sdk';

const client = new MataOCR({
  apiKey: 'your-api-key-here',
  baseURL: 'https://api.mataocr.com/v1'
});`
    },
    
    python: {
      setup: `# Install the MataOCR Python SDK
pip install mataocr-python

# Initialize the client
from mataocr import MataOCR

client = MataOCR(
    api_key="your-api-key-here",
    base_url="https://api.mataocr.com/v1"
)`,
      
      basicOCR: `# Basic OCR processing
import asyncio

async def process_document(file_path):
    try:
        with open(file_path, 'rb') as file:
            result = await client.process(
                file=file,
                language='ms',  # Bahasa Malaysia
                confidence_threshold=0.85
            )
        
        print(f"Extracted text: {result.text}")
        print(f"Accuracy: {result.confidence}")
        print(f"Processing time: {result.processing_time}s")
        
        return result
    except Exception as error:
        print(f"OCR failed: {error}")`,
      
      batchProcessing: `# Batch processing with asyncio
async def process_batch(file_paths):
    tasks = []
    for file_path in file_paths:
        task = client.process(
            file=open(file_path, 'rb'),
            language='auto',
            project_id='invoice-processing'
        )
        tasks.append(task)
    
    results = await asyncio.gather(*tasks)
    return [r for r in results if r.success]`,
      
      webhooks: `# Flask webhook handler
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook/mataocr', methods=['POST'])
def handle_webhook():
    data = request.json
    document_id = data.get('document_id')
    status = data.get('status')
    result = data.get('result')
    
    if status == 'completed':
        print(f"Document processed: {document_id}")
        print(f"Extracted text: {result['text']}")
        
        # Process the result
        save_to_database(document_id, result)
    
    return jsonify({"status": "success"})`
    },
    
    curl: {
      setup: `# Direct API calls with cURL
# Set your API key as environment variable
export MATAOCR_API_KEY="your-api-key-here"`,
      
      basicOCR: `# Upload and process a document
curl -X POST "https://api.mataocr.com/v1/process" \\
  -H "Authorization: Bearer $MATAOCR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/document.pdf" \\
  -F "language=ms" \\
  -F "confidence_threshold=0.85"`,
      
      batchProcessing: `# Get processing status
curl -X GET "https://api.mataocr.com/v1/status/doc_123" \\
  -H "Authorization: Bearer $MATAOCR_API_KEY"
  
# Get supported languages
curl -X GET "https://api.mataocr.com/v1/languages" \\
  -H "Authorization: Bearer $MATAOCR_API_KEY"`,
      
      webhooks: `# Configure webhook endpoint
curl -X POST "https://api.mataocr.com/v1/webhooks" \\
  -H "Authorization: Bearer $MATAOCR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourapp.com/webhook/mataocr",
    "events": ["document.completed", "document.failed"]
  }'`
    }
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Fast Processing",
      description: "Sub-2 second processing with real-time results"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Secure & Compliant",
      description: "PDPA compliant with enterprise-grade security"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Multi-Language",
      description: "Support for 5 Southeast Asian languages"
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      title: "Document Types",
      description: "Invoices, contracts, receipts, and more"
    }
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
              <h1 className="text-xl font-semibold text-gray-900">API Documentation</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <a 
                href="https://docs.mataocr.com" 
                target="_blank"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Book className="w-4 h-4" />
                <span>Full Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MataOCR API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate powerful Malaysian OCR capabilities into your applications with our simple REST API.
            Process documents in multiple languages with industry-leading accuracy.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow-sm border mb-12">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Start</h2>
            <p className="text-gray-600">Get started with MataOCR API in minutes</p>
          </div>
          
          {/* Language Selector */}
          <div className="p-6 border-b">
            <div className="flex space-x-4">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeLanguage === lang
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
                </button>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="p-6 space-y-8">
            {/* Setup */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Setup</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples[activeLanguage as keyof typeof codeExamples].setup}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeLanguage as keyof typeof codeExamples].setup, 'setup')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
                >
                  {copiedCode === 'setup' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Basic OCR */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Basic OCR Processing</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples[activeLanguage as keyof typeof codeExamples].basicOCR}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeLanguage as keyof typeof codeExamples].basicOCR, 'basic')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
                >
                  {copiedCode === 'basic' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Batch Processing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Batch Processing</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples[activeLanguage as keyof typeof codeExamples].batchProcessing}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeLanguage as keyof typeof codeExamples].batchProcessing, 'batch')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
                >
                  {copiedCode === 'batch' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Webhooks */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">4. Webhook Integration</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples[activeLanguage as keyof typeof codeExamples].webhooks}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeLanguage as keyof typeof codeExamples].webhooks, 'webhooks')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
                >
                  {copiedCode === 'webhooks' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Response Format */}
        <div className="bg-white rounded-lg shadow-sm border mb-12">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Response Format</h2>
            <p className="text-gray-600">Standard API response structure</p>
          </div>
          
          <div className="p-6">
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`{
  "success": true,
  "text": "Extracted document text in Malaysian languages",
  "confidence": 94.2,
  "language_detected": "ms",
  "processing_time": 1.35,
  "bounding_boxes": [
    {
      "text": "Invoice Number: INV-2025-001",
      "bbox": [100, 200, 400, 220],
      "confidence": 96.5
    }
  ],
  "metadata": {
    "file_size": 2048576,
    "file_type": "application/pdf",
    "processing_engine": "mataocr-v2.1",
    "document_type": "invoice",
    "language_requested": "ms",
    "confidence_threshold": 0.85,
    "meta_learning_version": "1.2.0"
  },
  "meta_learning_applied": true
}`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`{...}`, 'response')}
                className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
              >
                {copiedCode === 'response' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Rate Limits & Pricing */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Rate Limits</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Starter Plan</span>
                <span className="font-medium">100 requests/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Professional Plan</span>
                <span className="font-medium">1,000 requests/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Enterprise Plan</span>
                <span className="font-medium">Unlimited</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Supported Formats</h3>
            </div>
            <div className="p-6 space-y-2">
              <div className="text-gray-600">Images: JPG, PNG, TIFF, BMP</div>
              <div className="text-gray-600">Documents: PDF (multi-page)</div>
              <div className="text-gray-600">Max file size: 50MB</div>
              <div className="text-gray-600">Max resolution: 4K</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-6">
            Get your API key and start processing Malaysian documents in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing"
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get API Key
            </Link>
            <a 
              href="https://docs.mataocr.com"
              target="_blank"
              className="border border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>View Full Documentation</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
},
      
      basicOCR: `// Basic OCR processing
const processDocument = async (file) => {
  try {
    const result = await client.process({
      file: file,
      language: 'ms', // Bahasa Malaysia
      confidence_threshold: 0.85
    });
    
    console.log('Extracted text:', result.text);
    console.log('Accuracy:', result.confidence);
    console.log('Processing time:', result.processing_time);
    
    return result;
  } catch (error) {
    console.error('OCR failed:', error.message);
  }
};`,
      
      batchProcessing: `// Batch processing multiple documents
const processBatch = async (files) => {
  const results = await Promise.all(
    files.map(file => client.process({
      file: file,
      language: 'auto', // Auto-detect language
      project_id: 'invoice-processing'
    }))
  );
  
  return results.filter(result => result.success);
};`,
      
      webhooks: `// Webhook integration for async processing
const express = require('express');
const app = express();

app.post('/webhook/mataocr', (req, res) => {
  const { document_id, status, result } = req.body;
  
  if (status === 'completed') {
    console.log('Document processed:', document_id);
    console.log('Extracted text:', result.text);
    
    // Process the result in your application
    saveToDatabase(document_id, result);
  }
  
  res.status(200).send('OK');
});`
