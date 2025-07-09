import APITest from '@/components/APITest'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MataOCR
          </h1>
          <p className="text-2xl text-gray-700 mb-4">Train Smarter OCR. With Less Effort</p>
          <p className="text-lg text-gray-600 mb-8">🇲🇾 AI-Powered OCR for Southeast Asia</p>
          
          <div className="flex gap-4 justify-center mb-12">
            <a href="/demo" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Try Demo
            </a>
            <a href="/docs" className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              API Docs
            </a>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <APITest />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">🌏 Multi-Language</h3>
            <p className="text-gray-600">Support for Malay, English, Chinese, Tamil & Jawi</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">⚡ 90% Faster</h3>
            <p className="text-gray-600">Reduce manual labeling time dramatically</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">🎯 96% Accuracy</h3>
            <p className="text-gray-600">Industry-leading OCR accuracy</p>
          </div>
        </div>
      </div>
    </main>
  )
}
