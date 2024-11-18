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

  console.log("selectedElements", selectedElements);
  console.log("testScenarios", testScenarios);
  console.log("manualTestCases", manualTestCases);

  return (
    <>
      <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
        <div className="w-1/3 bg-blue-50 p-8 rounded-md h-[calc(100vh-100px)] shadow-lg overflow-y-scroll">
          <h1 className="text-xl font-bold text-black mb-2">
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
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
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
              >
                {mode === "auto"
                  ? "Generate Test Scenarios"
                  : "Generate Manual Test Cases"}
              </button>
            </div>
          )}
          {selectedElements.length > 0 && (
            <pre className="bg-white p-4 rounded-md overflow-x-auto text-black border border-gray-300">
              {JSON.stringify(selectedElements, null, 2)}
            </pre>
          )}
        </div>
        <div className="w-2/3 bg-gray-50 rounded-md h-[calc(100vh-100px)] shadow-lg">
          {browserStarted && (
            <>
              <BrowserView
                url={url}
                onElementsSelected={handleElementsSelected}
              />
            </>
          )}
        </div>
      </div>
      {(testScenarios || manualTestCases) && (
        <div className="w-full bg-gray-50 rounded-md shadow-lg container">
          {testScenarios && mode === "auto" && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-black my-4">
                Generated Test Scenarios
              </h2>
              <pre className="bg-white p-4 rounded-md whitespace-pre-wrap text-black border border-gray-300">
                {testScenarios}
              </pre>
            </div>
          )}
          {manualTestCases && mode === "manual" && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Generated Manual Test Cases
              </h2>
              <pre className="bg-white p-4 rounded-md whitespace-pre-wrap text-black border border-gray-300">
                {manualTestCases}
              </pre>
            </div>
          )}
        </div>
      )}
    </>
  );
}
