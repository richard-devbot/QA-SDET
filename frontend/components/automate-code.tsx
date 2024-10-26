"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AutomationCodeGenerator() {
  const [url, setUrl] = useState("");
  const [featureContent, setFeatureContent] = useState("");
  const [language, setLanguage] = useState("Python");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [browserStarted, setBrowserStarted] = useState(false);

  const startBrowser = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/start-browser");
      setBrowserStarted(true);
    } catch (error) {
      console.error("Error starting browser:", error);
    }
    setLoading(false);
  };

  const stopBrowser = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/stop-browser");
      setBrowserStarted(false);
      setScreenshot("");
    } catch (error) {
      console.error("Error stopping browser:", error);
    }
    setLoading(false);
  };

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-code",
        {
          url,
          featureContent,
          language,
        }
      );
      setGeneratedCode(response.data.code);
    } catch (error) {
      console.error("Error generating code:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (browserStarted) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/get-screenshot"
          );
          setScreenshot(`data:image/png;base64,${response.data.screenshot}`);
        } catch (error) {
          console.error("Error fetching screenshot:", error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [browserStarted]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Generate QA Automation Scripts
      </h1>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
        {!browserStarted ? (
          <button
            onClick={startBrowser}
            disabled={loading}
            className="w-full bg-gradient-to-r from-white to-gray-600 text-black font-bold py-3 px-6 rounded-md hover:from-gray-200 hover:to-gray-700 transition duration-300 mb-4"
          >
            Start Browser
          </button>
        ) : (
          <button
            onClick={stopBrowser}
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-500 to-black text-white font-bold py-3 px-6 rounded-md hover:from-gray-600 hover:to-black transition duration-300 mb-4"
          >
            Stop Browser
          </button>
        )}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="w-full p-3 mb-4 bg-transparent border border-gray-300 rounded-md text-white placeholder-gray-200 focus:outline-none focus:border-gray-500"
        />
        <textarea
          value={featureContent}
          onChange={(e) => setFeatureContent(e.target.value)}
          placeholder="Enter Gherkin Feature Steps"
          className="w-full p-3 mb-4 bg-transparent border border-gray-300 rounded-md text-white placeholder-gray-200 focus:outline-none focus:border-gray-500"
          rows={5}
        />
        <div className="mb-4">
          <label className="text-white mr-4">Language:</label>
          <label className="mr-4">
            <input
              type="radio"
              value="Python"
              checked={language === "Python"}
              onChange={() => setLanguage("Python")}
              className="mr-2"
            />
            <span className="text-white">Python</span>
          </label>
          <label>
            <input
              type="radio"
              value="Java"
              checked={language === "Java"}
              onChange={() => setLanguage("Java")}
              className="mr-2"
            />
            <span className="text-white">Java</span>
          </label>
        </div>
        <button
          onClick={generateCode}
          disabled={loading || !browserStarted}
          className="w-full bg-gradient-to-r from-gray-500 to-black text-white font-bold py-3 px-6 rounded-md hover:from-gray-600 hover:to-black transition duration-300 flex items-center justify-center"
        >
          {loading ? "Generating Code..." : "Generate Code"}
        </button>
      </div>

      {browserStarted && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Browser View</h2>
          {screenshot && (
            <img
              src={screenshot}
              alt="Browser view"
              className="w-full rounded-md"
            />
          )}
        </div>
      )}

      {generatedCode && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Generated {language} Code
          </h2>
          <pre className="bg-black p-4 rounded-md overflow-x-auto text-white whitespace-pre-wrap">
            {generatedCode}
          </pre>
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              generatedCode
            )}`}
            download={`generated_test.${
              language.toLowerCase() === "python" ? "py" : "java"
            }`}
            className="mt-4 inline-block bg-gradient-to-r from-gray-500 to-black text-white font-bold py-2 px-4 rounded-md hover:from-gray-600 hover:to-black transition duration-300"
          >
            Download {language} Code
          </a>
        </div>
      )}
    </div>
  );
}
