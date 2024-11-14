"use client";

import { useState } from "react";
import axios from "axios";

export default function GenerateBDD() {
  const [userStory, setUserStory] = useState("");
  const [detailLevel, setDetailLevel] = useState("Simple");
  const [generationMethod, setGenerationMethod] = useState("direct");
  const [gherkinFeature, setGherkinFeature] = useState("");
  const [manualTestCases, setManualTestCases] = useState("");
  const [loading, setLoading] = useState(false);

  const generateGherkinFeature = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-gherkin",
        {
          userStory,
          detailLevel,
          generationMethod,
        }
      );
      if (generationMethod === "manual-first") {
        setManualTestCases(response.data.manualTestCases);
      }
      setGherkinFeature(response.data.gherkinFeature);
    } catch (error) {
      console.error("Error generating Gherkin feature:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
      <div className="w-1/2 bg-gray-300 p-8 rounded-md h-[calc(100vh-100px)]">
        <h1 className="text-4xl font-bold text-black mb-8">
          Generate BDD Gherkin Feature Steps
        </h1>
        <textarea
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
          placeholder="Enter user story"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
          rows={5}
        />
        <div className="mb-6">
          <h3 className="text-black text-lg mb-2">Generation Method:</h3>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setGenerationMethod("direct")}
              className={`px-4 py-2 rounded-md ${
                generationMethod === "direct"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Direct Gherkin
            </button>
            <button
              onClick={() => setGenerationMethod("manual-first")}
              className={`px-4 py-2 rounded-md ${
                generationMethod === "manual-first"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Manual Test Cases + BDD Gherkin Steps
            </button>
          </div>
        </div>

        {generationMethod === "direct" && (
          <div className="mb-6">
            <h3 className="text-black text-lg mb-2">Detail Level:</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDetailLevel("Simple")}
                className={`px-4 py-2 rounded-md ${
                  detailLevel === "Simple"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => setDetailLevel("Detailed")}
                className={`px-4 py-2 rounded-md ${
                  detailLevel === "Detailed"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
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
          className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {loading ? "Generating..." : "Generate Gherkin Feature"}
        </button>
        {manualTestCases && (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-black mb-4">
              Generated Manual Test Cases
            </h2>
          </div>
        )}
        {gherkinFeature && (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-black mb-4">
              Generated Gherkin Feature
            </h2>
          </div>
        )}
      </div>
      <div className="w-1/2 bg-gray-300 rounded-md h-[calc(100vh-100px)]">
        {manualTestCases && (
          <pre className="bg-white p-4 rounded-md overflow-x-auto text-black border border-gray-300 whitespace-pre-wrap">
            {manualTestCases}
          </pre>
        )}
        {gherkinFeature && (
          <pre className="bg-white p-4 rounded-md overflow-x-auto text-black border border-gray-300 whitespace-pre-wrap">
            {gherkinFeature}
          </pre>
        )}
      </div>
    </div>
  );
}
