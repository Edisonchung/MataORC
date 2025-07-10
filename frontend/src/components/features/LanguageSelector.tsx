'use client';

import React, { useState } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  value, 
  onChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    {
      id: 'ms',
      name: 'Bahasa Malaysia',
      nativeName: 'Bahasa Malaysia',
      flag: '🇲🇾',
      description: 'Optimized for Malaysian documents'
    },
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      description: 'International documents'
    },
    {
      id: 'zh',
      name: 'Chinese (Simplified)',
      nativeName: '简体中文',
      flag: '🇨🇳',
      description: 'Chinese documents'
    },
    {
      id: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      description: 'Tamil documents'
    },
    {
      id: 'ar',
      name: 'Arabic/Jawi',
      nativeName: 'العربية / جاوي',
      flag: '🕌',
      description: 'Arabic and Jawi text'
    }
  ];

  const selectedLanguage = languages.find(lang => lang.id === value) || languages[0];

  const handleLanguageSelect = (languageId: string) => {
    onChange(languageId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedLanguage.flag}</span>
          <div className="text-left">
            <div className="font-medium text-gray-900">{selectedLanguage.name}</div>
            <div className="text-sm text-gray-500">{selectedLanguage.description}</div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2">
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
                  </div>
                </div>
                {value === language.id && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
