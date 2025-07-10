// src/components/layout/Navigation.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown,
  FileText,
  Code,
  BarChart3,
  Users,
  ExternalLink
} from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Product',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Features',
          href: '/#features',
          description: 'See what makes MataOCR special',
          icon: <FileText className="w-5 h-5" />
        },
        {
          name: 'API Documentation',
          href: '/api-docs',
          description: 'Integration guides and examples',
          icon: <Code className="w-5 h-5" />
        },
        {
          name: 'Live Demo',
          href: '/#demo',
          description: 'Try MataOCR in your browser',
          icon: <BarChart3 className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'Pricing',
      href: '/pricing'
    },
    {
      name: 'Dashboard',
      href: '/dashboard'
    },
    {
      name: 'Contact',
      href: '/contact'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={`bg-white shadow-sm border-b sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MataOCR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                  >
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isProductDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            <div className="text-blue-600 mt-1">
                              {dropdownItem.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{dropdownItem.name}</div>
                              <div className="text-sm text-gray-600">{dropdownItem.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`font-medium transition-colors ${
                      isActive(item.href!)
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://docs.mataocr.com"
              target="_blank"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <span>Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="/pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900 px-2">{item.name}</div>
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.icon}
                          <span>{dropdownItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`block px-2 py-2 font-medium transition-colors ${
                        isActive(item.href!)
                          ? 'text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <a
                  href="https://docs.mataocr.com"
                  target="_blank"
                  className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-gray-900"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/pricing"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
