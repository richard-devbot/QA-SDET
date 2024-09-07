'use client'

import { useState } from 'react'
import axios from 'axios'
import { FaRobot, FaCode, FaBug } from 'react-icons/fa'

export default function TestIdeaGeneration() {
  const [url, setUrl] = useState('')
  const [selectedElements, setSelectedElements] = useState([])
  const [testScenarios, setTestScenarios] = useState('')
  const [screenshot, setScreenshot] = useState('')
  const [browserStarted, setBrowserStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const startBrowser = async () => {
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/start-browser', { url })
      setBrowserStarted(true)
    } catch (error) {
      console.error('Error starting browser:', error)
    }
    setLoading(false)
  }

  const checkSelectedElements = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/api/get-selected-elements')
      setSelectedElements(response.data.elements)
    } catch (error) {
      console.error('Error getting selected elements:', error)
    }
    setLoading(false)
  }

  const generateScenarios = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/generate-scenarios', { url })
      setTestScenarios(response.data.test_scenarios)
      setScreenshot(response.data.screenshot)
      setSelectedElements(response.data.selected_elements)
      setBrowserStarted(false)
    } catch (error) {
      console.error('Error generating scenarios:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          The Best Way To Test Your Web Applications
        </h1>
        <p className="text-xl text-pink-200 mb-8">
          Revolutionize your QA process with AI-powered test scenario generation. SDET-Genie makes it happen today!
        </p>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to test"
            className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={startBrowser}
            disabled={loading || browserStarted}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
          >
            <FaRobot className="mr-2" />
            Start Testing Magic
          </button>
        </div>
      </div>

      {browserStarted && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActionCard
            icon={<FaCode className="text-4xl text-purple-400" />}
            title="Check Selected Elements"
            description="Review the web elements you've selected for testing."
            onClick={checkSelectedElements}
            loading={loading}
          />
          <ActionCard
            icon={<FaBug className="text-4xl text-pink-400" />}
            title="Generate Test Scenarios"
            description="Let AI create comprehensive test scenarios based on your selections."
            onClick={generateScenarios}
            loading={loading}
          />
        </div>
      )}

      {selectedElements.length > 0 && (
        <div className="mt-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Selected Elements</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-pink-200">
            {JSON.stringify(selectedElements, null, 2)}
          </pre>
        </div>
      )}

      {screenshot && (
        <div className="mt-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Screenshot</h2>
          <img 
            src={`data:image/png;base64,${screenshot}`} 
            alt="Selected Elements" 
            className="w-full rounded-md"
          />
        </div>
      )}

      {testScenarios && (
        <div className="mt-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Generated Test Scenarios</h2>
          <pre className="bg-gray-800 p-4 rounded-md whitespace-pre-wrap text-pink-200">
            {testScenarios}
          </pre>
        </div>
      )}
    </div>
  )
}

interface ActionCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
  loading: boolean;
}

function ActionCard({ icon, title, description, onClick, loading }: ActionCardProps) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-4 text-2xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-pink-200 mb-4">{description}</p>
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-600 hover:to-indigo-700 transition duration-300"
      >
        {loading ? 'Processing...' : 'Start'}
      </button>
    </div>
  )
}