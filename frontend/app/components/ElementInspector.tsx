'use client'

import React, { useState } from 'react'
import axios from 'axios'

export default function ElementInspector() {
  const [url, setUrl] = useState('')
  const [outputFileName, setOutputFileName] = useState('elements.csv')
  const [csvContent, setCsvContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const identifyElements = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/api/identify-elements', { url, outputFileName })
      setCsvContent(response.data.csvContent)
    } catch (error) {
      console.error('Error identifying elements:', error)
      setError('An error occurred while identifying elements. Please check the console for more details.')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Identify Page Elements</h1>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to inspect"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          value={outputFileName}
          onChange={(e) => setOutputFileName(e.target.value)}
          placeholder="Output CSV file name"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={identifyElements}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
        >
          {loading ? 'Identifying Elements...' : 'Identify Elements'}
        </button>
      </div>
      {csvContent && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Identified Elements</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-pink-200 max-h-96">
            {csvContent}
          </pre>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
            download={outputFileName}
            className="mt-4 inline-block bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md hover:from-green-600 hover:to-blue-700 transition duration-300"
          >
            Download CSV
          </a>
        </div>
      )}
    </div>
  )
}