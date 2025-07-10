// frontend/src/components/features/OCRDemo.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Download, Eye, Clock, Zap } from 'lucide-react';

// API Base URL - Updated to always try real API first
const getApiBaseUrl = () => {
  // If we're in browser, check the environment
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    
    // GitHub Codespaces detection - USE REAL API
    if (currentHost.includes('github.dev') || currentHost.includes('gitpod.io')) {
      // For GitHub Codespaces, backend should also be on a forwarded port
      const port = '8000';
      const codespaceName = currentHost.split('-')[0];
      return `https://${codespaceName}-${port}.app.github.dev`;
    }
    
    // Production deployment
    if (currentHost.includes('vercel.app') || currentHost.includes('mataocr.com')) {
      // Update this URL when you deploy backend to production
      return process.env.NEXT_PUBLIC_API_URL || 'https://your-production-backend.com';
    }
  }
  
  // Default to localhost for local development
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();
console.log('API_BASE_URL:', API_BASE_URL); // Debug log

// Types (matching your backend)
interface OCRResult {
  success: boolean;
  text: string;
  confidence: number;
  language_detected: string;
  processing_time: number;
  bounding_boxes: Array<{
    text: string;
    bbox: [number, number, number, number];
    confidence: number;
  }>;
  metadata: {
    file_size: number;
    file_type: string;
    processing_engine: string;
    document_type: string;
    language_requested: string;
    project_id?: string;
    confidence_threshold: number;
    meta_learning_version: string;
  };
  meta_learning_applied: boolean;
}

interface OCRDemoProps {
  className?: string;
}

const OCRDemo: React.FC<OCRDemoProps> = ({ className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('ms'); // Default to Bahasa Malaysia
  const [result, setResult] = useState<OCRResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(false);

  // Language options (matching backend)
  const languages = {
    ms: 'Bahasa Malaysia',
    en: 'English',
    zh: 'Chinese',
    ta: 'Tamil',
    ar: 'Arabic/Jawi'
  };

  // File validation
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: `File too large. Maximum size is 10MB.` 
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `File type not supported. Please use JPG, PNG, or PDF.` 
      };
    }

    return { valid: true };
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError(null);
    setResult(null);
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const processOCR = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      console.log('Processing OCR with API:', API_BASE_URL); // Debug log
      
      // ALWAYS TRY REAL API FIRST - No more demo mode detection
      console.log('Using real OCR API');
      
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('language', selectedLanguage);
      formData.append('confidence_threshold', '0.7');

      const apiUrl = `${API_BASE_URL}/ocr/process`;
      console.log('Making request to:', apiUrl); // Debug log

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `OCR Processing failed: ${response.status}`);
      }

      const ocrResult = await response.json();
      console.log('OCR Result:', ocrResult); // For debugging
      
      // Validate the result structure
      if (!ocrResult.success) {
        throw new Error(ocrResult.error || 'OCR processing was not successful');
      }

      setResult(ocrResult);
      
    } catch (err) {
      console.error('OCR Error:', err);
      
      // Only use mock data if API is completely unavailable
      console.log('Real API failed, showing error instead of mock');
      setError(`Failed to connect to OCR service: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Optional: Uncomment below to show mock data as fallback
      // await simulateMockOCR();
      
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock OCR for absolute fallback (optional)
  const simulateMockOCR = async () => {
    console.log('Demo mode activated - showing sample results');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock Malaysian document result based on selected language
    let mockText = '';
    let documentType = 'general';
    
    if (selectedLanguage === 'ms') {
      mockText = `KERAJAAN MALAYSIA
MyKad No: 123456-78-9012
Nama: Ahmad bin Abdullah
Alamat: No. 123, Jalan Bunga Raya
        Taman Sri Malaysia
        50000 Kuala Lumpur
Tarikh Lahir: 15 Ogos 1985`;
      documentType = 'mykad';
    } else if (selectedLanguage === 'zh') {
      mockText = `马来西亚政府
身份证号码: 123456-78-9012
姓名: 陈小明
地址: 马来西亚吉隆坡
     斯里马来西亚花园
     布嘉拉雅路123号`;
      documentType = 'mykad';
    } else {
      mockText = `GOVERNMENT OF MALAYSIA
ID Card No: 123456-78-9012
Name: Ahmad bin Abdullah
Address: No. 123, Jalan Bunga Raya
         Taman Sri Malaysia
         50000 Kuala Lumpur
Date of Birth: 15 Aug 1985`;
      documentType = 'mykad';
    }

    const mockResult: OCRResult = {
      success: true,
      text: mockText,
      confidence: 0.94,
      language_detected: selectedLanguage,
      processing_time: 2.1,
      bounding_boxes: [
        {
          text: mockText.split('\n')[0],
          bbox: [50, 50, 300, 80],
          confidence: 0.96
        }
      ],
      metadata: {
        file_size: selectedFile?.size || 0,
        file_type: selectedFile?.type || 'image/jpeg',
        processing_engine: 'demo',
        document_type: documentType,
        language_requested: selectedLanguage,
        confidence_threshold: 0.7,
        meta_learning_version: '1.0'
      },
      meta_learning_applied: false
    };

    setResult(mockResult);
  };

  const downloadResults = () => {
    if (!result) return;

    const downloadData = {
      extractedText: result.text,
      confidence: `${Math.round(result.confidence * 100)}%`,
      language: result.language_detected,
      processingTime: `${result.processing_time.toFixed(2)}s`,
      documentType: result.metadata.document_type,
      processingEngine: result.metadata.processing_engine,
      boundingBoxes: result.bounding_boxes,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(downloadData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mataocr-results-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Language Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Language</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => setSelectedLanguage(code)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedLanguage === code
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-gray-500">{code.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : selectedFile
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <div>
              <div className="text-lg font-medium text-gray-900">
                File Selected: {selectedFile.name}
              </div>
              <div className="text-sm text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={processOCR}
                disabled={isProcessing}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Processing with OCR
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Process with OCR
                  </>
                )}
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Choose Different File
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <div className="text-lg font-medium text-gray-900">
                Upload a Malaysian document and see our AI-powered OCR in action. Supports
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Bahasa Malaysia, English, Chinese, Tamil, and Jawi
              </div>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Upload className="h-5 w-5 mr-2" />
              Choose File
            </button>
            <div className="text-xs text-gray-500">
              Drag and drop files here, or click to select • Max 10MB • JPG, PNG, PDF
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-red-800">Processing Error</div>
              <div className="text-sm text-red-700 mt-1">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">OCR Results</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {result.processing_time.toFixed(1)}s
                </div>
                <div className="font-medium">
                  Confidence: {Math.round(result.confidence * 100)}%
                </div>
                <button
                  onClick={downloadResults}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-500">LANGUAGE</div>
                <div className="text-gray-900">{languages[result.language_detected as keyof typeof languages] || result.language_detected}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500">DOCUMENT TYPE</div>
                <div className="text-gray-900 capitalize">{result.metadata.document_type}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500">ENGINE</div>
                <div className="text-gray-900 capitalize">{result.metadata.processing_engine}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500">META-LEARNING</div>
                <div className="text-gray-900">
                  {result.meta_learning_applied ? 'Applied' : 'Not Applied'}
                </div>
              </div>
            </div>

            {/* Extracted Text */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-md font-medium text-gray-900">Extracted Text</h4>
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  {showBoundingBoxes ? 'Hide' : 'Show'} Bounding Boxes
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {result.text}
                </pre>
              </div>
            </div>

            {/* Bounding Boxes */}
            {showBoundingBoxes && result.bounding_boxes.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Detected Text Regions</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {result.bounding_boxes.map((box, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="font-medium text-gray-900">{box.text}</div>
                      <div className="text-gray-500 mt-1">
                        Confidence: {Math.round(box.confidence * 100)}% | 
                        Position: [{box.bbox.join(', ')}]
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Default export
export default OCRDemo;

// Named export for backward compatibility
export { OCRDemo };
