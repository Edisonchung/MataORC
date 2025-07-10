'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Download, Eye, Clock, Zap } from 'lucide-react';

// API Base URL - handle both local and deployed environments
const getApiBaseUrl = () => {
  // If we're in browser and on Vercel (or any https site), use a deployed backend
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    if (currentHost.includes('vercel.app') || currentHost.includes('mataocr.com')) {
      // For now, we'll use a placeholder - you'll need to deploy your backend
      return 'https://your-backend-url.com'; // Update this when you deploy backend
    }
  }
  
  // Default to localhost for local development
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();
console.log('API_BASE_URL:', API_BASE_URL); // Debug log

// Types (simplified versions)
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
        error: `File too large. Maximum size: ${(maxSize / 1024 / 1024).toFixed(1)}MB` 
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `File type not supported. Allowed: ${allowedTypes.join(', ')}` 
      };
    }

    return { valid: true };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatProcessingTime = (seconds: number): string => {
    if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
    return `${seconds.toFixed(1)}s`;
  };

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
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Reset previous state
    setError(null);
    setResult(null);
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

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
      
      // Check if we can reach the backend
      const isBackendAvailable = await checkBackendAvailability();
      
      if (!isBackendAvailable) {
        // Fallback to mock data for Vercel demo
        console.log('Backend not available, using mock data');
        await simulateMockOCR();
        return;
      }
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const params = new URLSearchParams();
      params.append('language', selectedLanguage);
      params.append('confidence_threshold', '0.8');

      const apiUrl = `${API_BASE_URL}/ocr/process?${params.toString()}`;
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
      setResult(ocrResult);
      console.log('OCR Result:', ocrResult); // For debugging
    } catch (err) {
      console.error('Detailed OCR Error:', err); // More detailed error logging
      
      // Fallback to mock for demo purposes
      console.log('API failed, using mock data for demo');
      await simulateMockOCR();
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to check if backend is available
  const checkBackendAvailability = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { 
        method: 'GET',
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Mock OCR for demo when backend isn't available
  const simulateMockOCR = async () => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock Malaysian document result based on selected language
    let mockText = '';
    if (selectedLanguage === 'ms') {
      mockText = `KERAJAAN MALAYSIA
MyKad No: 123456-78-9012
Nama: Ahmad bin Abdullah
Alamat: No. 123, Jalan Bunga Raya
        Taman Sri Malaysia
        50000 Kuala Lumpur
Tarikh Lahir: 15 Ogos 1985`;
    } else if (selectedLanguage === 'zh') {
      mockText = `马来西亚政府
身份证号码: 123456-78-9012
姓名: 陈小明
地址: 马来西亚吉隆坡
     斯里马来西亚花园
     布嘉拉雅路123号`;
    } else {
      mockText = `GOVERNMENT OF MALAYSIA
ID Card No: 123456-78-9012
Name: Ahmad bin Abdullah
Address: No. 123, Jalan Bunga Raya
         Taman Sri Malaysia
         50000 Kuala Lumpur`;
    }

    const mockResult: OCRResult = {
      success: true,
      text: mockText,
      confidence: 0.94,
      language_detected: selectedLanguage,
      processing_time: 2.1,
      bounding_boxes: [
        { text: "KERAJAAN MALAYSIA", bbox: [10, 10, 200, 30], confidence: 0.96 },
        { text: `MyKad No: 123456-78-9012`, bbox: [10, 40, 250, 60], confidence: 0.93 },
        { text: "Nama: Ahmad bin Abdullah", bbox: [10, 70, 300, 90], confidence: 0.91 }
      ],
      metadata: {
        file_size: selectedFile?.size || 0,
        file_type: selectedFile?.type || 'image/jpeg',
        processing_engine: 'demo_mode_paddleocr',
        document_type: 'malaysian_id',
        language_requested: selectedLanguage,
        confidence_threshold: 0.8,
        meta_learning_version: '1.0_demo'
      },
      meta_learning_applied: true
    };

    setResult(mockResult);
    
    // Show demo notice
    setError('Demo Mode: Backend not available. Showing sample Malaysian OCR results.');
  };

  const resetDemo = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setShowBoundingBoxes(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const data = {
      extractedText: result.text,
      confidence: result.confidence,
      languageDetected: result.language_detected,
      processingTime: result.processing_time,
      metadata: result.metadata,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mataocr-result-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Try MataOCR Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a Malaysian document and see our AI-powered OCR in action. 
          Supports Bahasa Malaysia, English, Chinese, Tamil, and Jawi.
        </p>
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Language
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => setSelectedLanguage(code)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedLanguage === code
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-gray-500 mt-1">{code.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              isDragging
                ? 'border-blue-400 bg-blue-50'
                : selectedFile
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!selectedFile && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}

            {selectedFile ? (
              <div className="space-y-4">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    File Selected: {selectedFile.name}
                  </h3>
                  <p className="text-gray-500">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={processOCR}
                    disabled={isProcessing}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Process with OCR
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Choose Different File
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload Malaysian Document
                  </h3>
                  <p className="text-gray-500">
                    Drag and drop or click to select
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Supports: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="border-t border-gray-200 bg-red-50 p-4">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <div className="border-t border-gray-200 bg-blue-50 p-4">
            <div className="flex items-center gap-3 text-blue-700">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing with MataOCR AI Engine...</span>
            </div>
          </div>
        )}
      </div>

      {/* Results Display */}
      {result && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                OCR Results
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatProcessingTime(result.processing_time)}
                </div>
                <div className="text-sm text-gray-500">
                  Confidence: {Math.round(result.confidence * 100)}%
                </div>
                <button
                  onClick={downloadResult}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Language</div>
                <div className="font-medium">{languages[result.language_detected as keyof typeof languages] || result.language_detected}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Document Type</div>
                <div className="font-medium">{result.metadata.document_type}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Engine</div>
                <div className="font-medium">{result.metadata.processing_engine}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Meta-Learning</div>
                <div className="font-medium text-green-600">
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

// Default export (this fixes the import issue)
export default OCRDemo;

// Named export for backward compatibility
export { OCRDemo };
