'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function AgentExplorer() {
  const [objective, setObjective] = useState('')
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [browserStarted, setBrowserStarted] = useState(false)
  const [screenshot, setScreenshot] = useState('')

  const startBrowser = async () => {
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/agent-explorer/start-browser', { url })
      setBrowserStarted(true)
    } catch (error) {
      console.error('Error starting browser:', error)
      setError('An error occurred while starting the browser. Please try again.')
    }
    setLoading(false)
  }

  const stopBrowser = async () => {
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/agent-explorer/stop-browser')
      setBrowserStarted(false)
      setScreenshot('')
    } catch (error) {
      console.error('Error stopping browser:', error)
      setError('An error occurred while stopping the browser. Please try again.')
    }
    setLoading(false)
  }

  const runWebAgent = async () => {
    setLoading(true)
    setError('')
    setResults([])

    try {
      const response = await axios.post('http://localhost:5000/api/agent-explorer/run-web-agent', {
        objective,
      })
      setResults(response.data)
    } catch (error) {
      console.error('Error running web agent:', error)
      setError('An error occurred while running the web agent. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (browserStarted) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/agent-explorer/get-screenshot')
          setScreenshot(`data:image/png;base64,${response.data.screenshot}`)
        } catch (error) {
          console.error('Error fetching screenshot:', error)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [browserStarted])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Web Agent Explorer</h1>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter starting URL"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        {!browserStarted ? (
          <button
            onClick={startBrowser}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-6 rounded-md hover:from-green-600 hover:to-blue-700 transition duration-300 mb-4"
          >
            Start Browser
          </button>
        ) : (
          <button
            onClick={stopBrowser}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-md hover:from-red-600 hover:to-yellow-700 transition duration-300 mb-4"
          >
            Stop Browser
          </button>
        )}
        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Enter objective"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={runWebAgent}
          disabled={loading || !browserStarted}
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

      {browserStarted && screenshot && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Browser View</h2>
          <Image src={screenshot} alt="Browser view" width={800} height={600} layout="responsive" />
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
