// src/components/features/OCRDemo.tsx - Fixed Props Interface
'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Download, Eye, Clock, Zap } from 'lucide-react';

// FIXED API URL - Your Railway deployment
const API_BASE_URL = "https://mataocr-production.up.railway.app";

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
    document_type?: string;
    language_requested: string;
    confidence_threshold: number;
  };
}

// FIXED: Updated props interface to match usage
interface OCRDemoProps {
  className?: string;
  language?: string;  // Added language prop
  apiEndpoint?: string;  // Added apiEndpoint prop
}

const OCRDemo: React.FC<OCRDemoProps> = ({ 
  className = '', 
  language: initialLanguage = 'ms',
  apiEndpoint = API_BASE_URL 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(false);

  const languages = {
    ms: 'Bahasa Malaysia',
    en: 'English',
    zh: 'Chinese',
    ta: 'Tamil',
    ar: 'Arabic/Jawi'
  };

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

    if (file.size > maxSize) {
      return { valid: false, error: `File too large. Maximum size is 10MB.` };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: `File type not supported. Please use JPG, PNG, or PDF.` };
    }

    return { valid: true };
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
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('language', selectedLanguage);
      formData.append('confidence_threshold', '0.7');

      const apiUrl = `${apiEndpoint}/ocr`;
      console.log('Making request to:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `OCR Processing failed: ${response.status}`);
      }

      const ocrResult = await response.json();
      
      if (!ocrResult.success) {
        throw new Error(ocrResult.error || 'OCR processing was not successful');
      }

      setResult(ocrResult);
      
    } catch (err) {
      console.error('OCR Error:', err);
      setError(`Failed to connect to OCR service: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResults = () => {
    if (!result) return;

    const downloadData = {
      extractedText: result.text,
      confidence: `${Math.round(result.confidence * 100)}%`,
      language: result.language_detected,
      processingTime: `${result.processing_time.toFixed(2)}s`,
      documentType: result.metadata.document_type || 'general',
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
                    Processing...
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
                Drop your Malaysian document here
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Supports JPG, PNG, PDF up to 10MB
              </div>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Upload className="h-5 w-5 mr-2" />
              Choose File
            </button>
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
                <div className="font-medium text-gray-500">CONFIDENCE</div>
                <div className="text-gray-900">{Math.round(result.confidence * 100)}%</div>
              </div>
              <div>
                <div className="font-medium text-gray-500">ENGINE</div>
                <div className="text-gray-900 capitalize">{result.metadata.processing_engine}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500">TIME</div>
                <div className="text-gray-900">{result.processing_time.toFixed(2)}s</div>
              </div>
            </div>

            {/* Extracted Text */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-md font-medium text-gray-900">Extracted Text</h4>
                {result.bounding_boxes.length > 0 && (
                  <button
                    onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    {showBoundingBoxes ? 'Hide' : 'Show'} Regions
                  </button>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {result.text || 'No text detected'}
                </pre>
              </div>
            </div>

            {/* Bounding Boxes */}
            {showBoundingBoxes && result.bounding_boxes.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">
                  Detected Text Regions ({result.bounding_boxes.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {result.bounding_boxes.slice(0, 5).map((box, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="font-medium text-gray-900">"{box.text}"</div>
                      <div className="text-gray-500 mt-1">
                        Confidence: {Math.round(box.confidence * 100)}%
                      </div>
                    </div>
                  ))}
                  {result.bounding_boxes.length > 5 && (
                    <div className="text-sm text-gray-600 text-center">
                      ... and {result.bounding_boxes.length - 5} more regions
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRDemo;
