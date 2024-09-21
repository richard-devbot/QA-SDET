'use client'

import { useState } from 'react'
import axios from 'axios'

export default function GherkinGenerator() {
  const [userStory, setUserStory] = useState('')
  const [detailLevel, setDetailLevel] = useState('Simple')
  const [generationMethod, setGenerationMethod] = useState('direct')
  const [gherkinFeature, setGherkinFeature] = useState('')
  const [manualTestCases, setManualTestCases] = useState('')
  const [loading, setLoading] = useState(false)

  const generateGherkinFeature = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/generate-gherkin', {
        userStory,
        detailLevel,
        generationMethod
      })
      if (generationMethod === 'manual-first') {
        setManualTestCases(response.data.manualTestCases)
      }
      setGherkinFeature(response.data.gherkinFeature)
    } catch (error) {
      console.error('Error generating Gherkin feature:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Generate BDD Gherkin Feature Steps</h1>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <textarea
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
          placeholder="Enter user story"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
          rows={5}
        />
        <div className="mb-6">
          <h3 className="text-white text-lg mb-2">Generation Method:</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setGenerationMethod('direct')}
              className={`px-4 py-2 rounded-md ${
                generationMethod === 'direct'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Direct Gherkin
            </button>
            <button
              onClick={() => setGenerationMethod('manual-first')}
              className={`px-4 py-2 rounded-md ${
                generationMethod === 'manual-first'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Manual Test Cases + BBD Gherkin Steps
            </button>
          </div>
        </div>
        
        {generationMethod === 'direct' && (
          <div className="mb-6">
            <h3 className="text-white text-lg mb-2">Detail Level:</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setDetailLevel('Simple')}
                className={`px-4 py-2 rounded-md ${
                  detailLevel === 'Simple'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => setDetailLevel('Detailed')}
                className={`px-4 py-2 rounded-md ${
                  detailLevel === 'Detailed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        )}
        
        <button
          onClick={generateGherkinFeature}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
        >
          {loading ? 'Generating...' : 'Generate Gherkin Feature'}
        </button>
      </div>
      {manualTestCases && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Generated Manual Test Cases</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-pink-200 whitespace-pre-wrap">
            {manualTestCases}
          </pre>
        </div>
      )}
      {gherkinFeature && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Generated Gherkin Feature</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-pink-200 whitespace-pre-wrap">
            {gherkinFeature}
          </pre>
        </div>
      )}
    </div>
  )
}
