import React, { useState } from 'react';
import axios from 'axios';
import BrowserView from './BrowserView';
import { FaRobot, FaCode, FaBug, FaEdit } from 'react-icons/fa';

export default function TestIdeaGeneration() {
  const [url, setUrl] = useState('');
  const [selectedElements, setSelectedElements] = useState([]);
  const [testScenarios, setTestScenarios] = useState('');
  const [manualTestCases, setManualTestCases] = useState('');
  const [browserStarted, setBrowserStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('auto'); // 'auto' or 'manual'

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
        mode
      });
      if (mode === 'auto') {
        setTestScenarios(response.data.test_scenarios);
      } else {
        setManualTestCases(response.data.manual_test_cases);
      }
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
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300 mb-4"
      >
        Start Testing Magic
      </button>

      {browserStarted && (
        <>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setMode('auto')}
              className={`px-4 py-2 rounded-md ${
                mode === 'auto'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              <FaRobot className="inline-block mr-2" />
              Automated Scenarios
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`px-4 py-2 rounded-md ${
                mode === 'manual'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              <FaEdit className="inline-block mr-2" />
              Manual Test Cases
            </button>
          </div>
          <BrowserView url={url} onElementsSelected={handleElementsSelected} />
        </>
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
            {mode === 'auto' ? 'Generate Test Scenarios' : 'Generate Manual Test Cases'}
          </button>
        </div>
      )}

      {testScenarios && mode === 'auto' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Generated Test Scenarios</h2>
          <pre className="bg-gray-800 p-4 rounded-md whitespace-pre-wrap text-pink-200">
            {testScenarios}
          </pre>
        </div>
      )}

      {manualTestCases && mode === 'manual' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Generated Manual Test Cases</h2>
          <pre className="bg-gray-800 p-4 rounded-md whitespace-pre-wrap text-pink-200">
            {manualTestCases}
          </pre>
        </div>
      )}
    </div>
  );
}
