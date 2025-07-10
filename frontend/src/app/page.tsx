import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import OCRDemo from '@/components/features/OCRDemo'  // Changed to default import
import { LanguageSelector } from '@/components/features/LanguageSelector'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <span className="mr-2">👁️</span>
            <span className="mr-2">🇲🇾</span>
            Made in Malaysia for Southeast Asia
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            MataOCR
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-6 text-blue-100">
            See Better, Read Smarter
          </h2>
          
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            AI-powered OCR for Southeast Asia. Process documents in multiple languages with 96% accuracy.
          </p>
          
          <div className="mb-12">
            <LanguageSelector />
          </div>
          
          <div className="mb-16">
            <OCRDemo />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur text-white border-white/20">
              <div className="text-3xl mb-4">🌏</div>
              <h3 className="text-lg font-semibold mb-2">Multi-Language</h3>
              <p className="text-sm text-gray-200">
                Native support for Malaysian languages and scripts
              </p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur text-white border-white/20">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">96% Accuracy</h3>
              <p className="text-sm text-gray-200">
                Industry-leading accuracy with AI-powered vision
              </p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur text-white border-white/20">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-sm text-gray-200">
                On-premise deployment and data privacy
              </p>
            </Card>
          </div>
          
          <div className="mt-16">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Coming Soon - Sign Up for Early Access
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-300">
            Built by VisionTech Malaysia • Powered by AI
          </div>
        </div>
      </div>
    </div>
  )
}
