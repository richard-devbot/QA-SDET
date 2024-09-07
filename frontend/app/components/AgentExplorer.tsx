'use client'

import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function AgentExplorer() {
  const [objective, setObjective] = useState('')
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runWebAgent = async () => {
    setLoading(true)
    setError('')
    setResults([])

    try {
      const response = await axios.post('http://localhost:5000/api/run-web-agent', {
        objective,
        url
      })
      setResults(response.data)
    } catch (error) {
      console.error('Error running web agent:', error)
      setError('An error occurred while running the web agent. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Web Agent Explorer</h1>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Enter objective"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter starting URL"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={runWebAgent}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
        >
          {loading ? 'Running Web Agent...' : 'Start Demo'}
        </button>
      </div>

      {error && (
        <div className="mt-8 bg-red-500 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {results.map((result, index) => (
        <div key={index} className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Step {result.step}</h2>
          <p className="text-white mb-2">Current URL: {result.current_url}</p>
          <p className="text-white mb-2">Action taken: {result.action_taken}</p>
          {result.output && <p className="text-white mb-2">Output: {result.output}</p>}
          <p className="text-white mb-4">Success: {result.success ? 'Yes' : 'No'}</p>
          {result.screenshot && (
            <div className="relative h-64 mb-4">
              <Image
                src={`data:image/png;base64,${result.screenshot}`}
                alt={`Step ${result.step} Screenshot`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}