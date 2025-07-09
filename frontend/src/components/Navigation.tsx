import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            MataOCR
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/demo" className="text-gray-700 hover:text-blue-600">Demo</Link>
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/docs`} target="_blank" className="text-gray-700 hover:text-blue-600">
              API Docs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
