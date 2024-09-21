import React, { useState } from 'react';
import axios from 'axios';
import BrowserView from './BrowserView';
import { FaRobot, FaCode, FaBug } from 'react-icons/fa'

export default function TestIdeaGeneration() {
  const [url, setUrl] = useState('');
  const [selectedElements, setSelectedElements] = useState([]);
  const [testScenarios, setTestScenarios] = useState('');
  const [browserStarted, setBrowserStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const startBrowser = () => {
    setBrowserStarted(true);
  };

  const handleElementsSelected = (elements) => {
    setSelectedElements(elements);
  };

  const generateScenarios = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-scenarios', {
        url,
        selectedElements,
      });
      setTestScenarios(response.data.test_scenarios);
    } catch (error) {
      console.error('Error generating scenarios:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Test Idea Generation</h1>
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
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300"
      >
        Start Testing Magic
      </button>

      {browserStarted && (
        <BrowserView url={url} onElementsSelected={handleElementsSelected} />
      )}

      {selectedElements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Selected Elements</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-pink-200">
            {JSON.stringify(selectedElements, null, 2)}
          </pre>
          <button
            onClick={generateScenarios}
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-6 rounded-md hover:from-green-600 hover:to-blue-700 transition duration-300"
          >
            Generate Test Scenarios
          </button>
        </div>
      )}

      {testScenarios && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Generated Test Scenarios</h2>
          <pre className="bg-gray-800 p-4 rounded-md whitespace-pre-wrap text-pink-200">
            {testScenarios}
          </pre>
        </div>
      )}
    </div>
  );
}
