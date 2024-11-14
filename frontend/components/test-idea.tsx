"use client";
import React, { useState } from "react";
import axios from "axios";
import BrowserView from "@/components/browser-view";
import { FaRobot, FaCode, FaBug, FaEdit } from "react-icons/fa";

export default function TestIdea() {
  const [url, setUrl] = useState("");
  const [selectedElements, setSelectedElements] = useState<any[]>([]);
  const [testScenarios, setTestScenarios] = useState("");
  const [manualTestCases, setManualTestCases] = useState("");
  const [browserStarted, setBrowserStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("auto"); // 'auto' or 'manual'

  const startBrowser = () => {
    setBrowserStarted(true);
  };

  const handleElementsSelected = (elements: any[]) => {
    setSelectedElements(elements);
  };

  const generateScenarios = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-scenarios",
        {
          url,
          selectedElements,
          mode,
        }
      );
      if (mode === "auto") {
        setTestScenarios(response.data.test_scenarios);
      } else {
        setManualTestCases(response.data.manual_test_cases);
      }
    } catch (error) {
      console.error("Error generating scenarios:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
      <div className="w-1/2 bg-gray-300 p-8 rounded-md h-[calc(100vh-100px)]">
        <h1 className="text-4xl font-bold text-black mb-8">
          Test Idea Generation
        </h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to test"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
        />
        <button
          onClick={startBrowser}
          disabled={loading || browserStarted}
          className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 mb-4"
        >
          Start Testing Magic
        </button>
        {browserStarted && (
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setMode("auto")}
              className={`px-4 py-2 rounded-md ${
                mode === "auto"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <FaRobot className="inline-block mr-2" />
              Automated Scenarios
            </button>
            <button
              onClick={() => setMode("manual")}
              className={`px-4 py-2 rounded-md ${
                mode === "manual"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <FaEdit className="inline-block mr-2" />
              Manual Test Cases
            </button>
          </div>
        )}
        {selectedElements.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Selected Elements
            </h2>
            <button
              onClick={generateScenarios}
              disabled={loading}
              className="mt-4 w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
            >
              {mode === "auto"
                ? "Generate Test Scenarios"
                : "Generate Manual Test Cases"}
            </button>
          </div>
        )}
        {testScenarios && mode === "auto" && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Generated Test Scenarios
            </h2>
          </div>
        )}
        {manualTestCases && mode === "manual" && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Generated Manual Test Cases
            </h2>
          </div>
        )}
      </div>
      <div className="w-1/2 bg-gray-300 rounded-md h-[calc(100vh-100px)]">
        {browserStarted && (
          <>
            <BrowserView
              url={url}
              onElementsSelected={handleElementsSelected}
            />
          </>
        )}
        {selectedElements.length > 0 && (
          <pre className="bg-white p-4 rounded-md overflow-x-auto text-black border border-gray-300">
            {JSON.stringify(selectedElements, null, 2)}
          </pre>
        )}
        {testScenarios && mode === "auto" && (
          <pre className="bg-white p-4 rounded-md whitespace-pre-wrap text-black border border-gray-300">
            {testScenarios}
          </pre>
        )}
        {manualTestCases && mode === "manual" && (
          <pre className="bg-white p-4 rounded-md whitespace-pre-wrap text-black border border-gray-300">
            {manualTestCases}
          </pre>
        )}
      </div>
    </div>
  );
}
