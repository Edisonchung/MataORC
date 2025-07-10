import React from 'react'

export function OCRDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          MataOCR Demo
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-4">
          <div className="text-gray-500">
            <div className="mx-auto h-12 w-12 mb-4 text-4xl">📄</div>
            <p className="text-lg">Drop your document here</p>
            <p className="text-sm">or click to browse</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Upload documents in Bahasa Malaysia, English, Chinese, Tamil, or Jawi
        </p>
      </div>
    </div>
  )
}
