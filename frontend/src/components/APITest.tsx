'use client'

import { useEffect, useState } from 'react'

export default function APITest() {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL || '')
      .then(res => res.json())
      .then(data => {
        setApiData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('API Error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading API...</div>

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">API Status</h3>
      {apiData ? (
        <pre className="text-xs">{JSON.stringify(apiData, null, 2)}</pre>
      ) : (
        <p>Failed to connect to API</p>
      )}
    </div>
  )
}
