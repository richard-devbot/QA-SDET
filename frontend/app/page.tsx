'use client'

import { useState } from 'react'
import TestIdeaGeneration from './components/TestIdeaGeneration'
import ElementInspector from './components/ElementInspector'
import GherkinGenerator from './components/GherkinGenerator'
import AutomationCodeGenerator from './components/AutomationCodeGenerator'
import AgentExplorer from './components/AgentExplorer'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState('test-idea')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <nav className="bg-white bg-opacity-10 p-4">
        <div className="container mx-auto flex justify-center">
          <button
            onClick={() => setActiveFeature('test-idea')}
            className={`mx-2 px-4 py-2 rounded-md ${
              activeFeature === 'test-idea'
                ? 'bg-pink-500 text-white'
                : 'bg-white bg-opacity-10 text-pink-200 hover:bg-opacity-20'
            }`}
          >
            Test Idea Generation
          </button>
          <button
            onClick={() => setActiveFeature('element-inspector')}
            className={`mx-2 px-4 py-2 rounded-md ${
              activeFeature === 'element-inspector'
                ? 'bg-pink-500 text-white'
                : 'bg-white bg-opacity-10 text-pink-200 hover:bg-opacity-20'
            }`}
          >
            Element Inspector
          </button>
          <button
            onClick={() => setActiveFeature('gherkin-generator')}
            className={`mx-2 px-4 py-2 rounded-md ${
              activeFeature === 'gherkin-generator'
                ? 'bg-pink-500 text-white'
                : 'bg-white bg-opacity-10 text-pink-200 hover:bg-opacity-20'
            }`}
          >
            Gherkin Generator
          </button>
          <button
            onClick={() => setActiveFeature('automation-code-generator')}
            className={`mx-2 px-4 py-2 rounded-md ${
              activeFeature === 'automation-code-generator'
                ? 'bg-pink-500 text-white'
                : 'bg-white bg-opacity-10 text-pink-200 hover:bg-opacity-20'
            }`}
          >
            Automation Code Generator
          </button>
          <button
            onClick={() => setActiveFeature('agent-explorer')}
            className={`mx-2 px-4 py-2 rounded-md ${
              activeFeature === 'agent-explorer'
                ? 'bg-pink-500 text-white'
                : 'bg-white bg-opacity-10 text-pink-200 hover:bg-opacity-20'
            }`}
          >
            Agent Explorer
          </button>
        </div>
      </nav>

      <main>
        {activeFeature === 'test-idea' && <TestIdeaGeneration />}
        {activeFeature === 'element-inspector' && <ElementInspector />}
        {activeFeature === 'gherkin-generator' && <GherkinGenerator />}
        {activeFeature === 'automation-code-generator' && <AutomationCodeGenerator />}
        {activeFeature === 'agent-explorer' && <AgentExplorer />}
      </main>
    </div>
  )
}