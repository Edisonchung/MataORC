import React from 'react'

export function LanguageSelector() {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🇲🇾 Bahasa</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🇬🇧 English</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🇨🇳 中文</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🇮🇳 தமிழ்</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🕌 جاوي</span>
    </div>
  )
}
