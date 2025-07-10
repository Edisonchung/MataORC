// src/components/features/LanguageSelector.tsx - Enhanced with Malaysian Specialization
'use client';

import React, { useState } from 'react';
import { ChevronDown, Check, Globe, Star } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  accuracy: string;
  popular: boolean;
  description: string;
  examples: string[];
}

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  className?: string;
  showAccuracy?: boolean;
  showExamples?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  value, 
  onChange, 
  className = '',
  showAccuracy = true,
  showExamples = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    {
      id: 'ms',
      name: 'Bahasa Malaysia',
      nativeName: 'Bahasa Malaysia',
      flag: '🇲🇾',
      accuracy: '96%',
      popular: true,
      description: 'Optimized for Malaysian official documents',
      examples: ['MyKad', 'Passport Malaysia', 'Surat Rasmi', 'Bil Utiliti']
    },
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      accuracy: '94%',
      popular: true,
      description: 'International documents and business forms',
      examples: ['Contracts', 'Invoices', 'Certificates', 'Legal Documents']
    },
    {
      id: 'zh',
      name: 'Chinese (Simplified)',
      nativeName: '简体中文',
      flag: '🇨🇳',
      accuracy: '93%',
      popular: true,
      description: 'Chinese documents and mixed-language forms',
      examples: ['身份证', 'Business Cards', 'Mixed Documents', 'Forms']
    },
    {
      id: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      accuracy: '91%',
      popular: false,
      description: 'Tamil language documents and forms',
      examples: ['தமிழ் ஆவணங்கள்', 'Certificates', 'Government Forms', 'Personal Documents']
    },
    {
      id: 'ar',
      name: 'Arabic/Jawi',
      nativeName: 'العربية / جاوي',
      flag: '🇸🇦',
      accuracy: '89%',
      popular: false,
      description: 'Arabic script and Jawi documents',
      examples: ['Jawi Text', 'Arabic Documents', 'Religious Texts', 'Historical Documents']
    }
  ];

  const selectedLanguage = languages.find(lang => lang.id === value) || languages[0];

  const handleLanguageSelect = (languageId: string) => {
    onChange(languageId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Current Selection */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedLanguage.flag}</span>
          <div className="text-left">
            <div className="font-medium text-gray-900">{selectedLanguage.name}</div>
            {showAccuracy && (
              <div className="text-sm text-gray-500">
                {selectedLanguage.accuracy} accuracy
                {selectedLanguage.popular && (
                  <span className="ml-2 inline-flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="ml-1 text-yellow-600">Popular</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
              Select Language
            </div>
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => handleLanguageSelect(language.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                  value === language.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{language.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm text-gray-500">{language.nativeName}</div>
                    {showAccuracy && (
                      <div className="text-xs text-gray-400 mt-1">
                        {language.accuracy} accuracy • {language.description}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {language.popular && (
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                  {value === language.id && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Language Examples */}
          {showExamples && selectedLanguage && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Best for these document types:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedLanguage.examples.map((example, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="flex items-center text-xs text-gray-500">
              <Globe className="w-3 h-3 mr-1" />
              <span>Specialized for Malaysian documents and Southeast Asian languages</span>
            </div>
          </div>
        </div>
      )}

      {/* Language Details Card (when examples are shown) */}
      {showExamples && !isOpen && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{selectedLanguage.flag}</div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 mb-1">
                {selectedLanguage.name} ({selectedLanguage.accuracy} accuracy)
              </h3>
              <p className="text-sm text-blue-700 mb-3">{selectedLanguage.description}</p>
              <div>
                <div className="text-xs font-medium text-blue-800 mb-2">Optimized for:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedLanguage.examples.map((example, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
