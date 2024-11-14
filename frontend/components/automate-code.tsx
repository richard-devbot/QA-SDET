"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaCode } from "react-icons/fa";

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
    <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
      <div className="w-1/2 bg-gray-300 p-8 rounded-md h-[calc(100vh-100px)]">
        <h1 className="text-4xl font-bold text-black mb-8">
          Generate QA Automation Scripts
        </h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
        />
        <button
          onClick={browserStarted ? stopBrowser : startBrowser}
          disabled={loading}
          className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 mb-4"
        >
          {browserStarted ? "Stop Browser" : "Start Browser"}
        </button>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setLanguage("Python")}
            className={`px-4 py-2 rounded-md ${
              language === "Python"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <FaCode className="inline-block mr-2" />
            Python
          </button>
          <button
            onClick={() => setLanguage("Java")}
            className={`px-4 py-2 rounded-md ${
              language === "Java"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <FaRobot className="inline-block mr-2" />
            Java
          </button>
        </div>

        <textarea
          value={featureContent}
          onChange={(e) => setFeatureContent(e.target.value)}
          placeholder="Enter Gherkin Feature Steps"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
          rows={5}
        />

        <button
          onClick={generateCode}
          disabled={loading || !browserStarted}
          className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {loading ? "Generating Code..." : "Generate Code"}
        </button>

        {generatedCode && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Generated {language} Code
            </h2>
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                generatedCode
              )}`}
              download={`generated_test.${
                language.toLowerCase() === "python" ? "py" : "java"
              }`}
              className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 inline-block text-center"
            >
              Download {language} Code
            </a>
          </div>
        )}
      </div>

      <div className="w-1/2 bg-gray-300 rounded-md h-[calc(100vh-100px)]">
        {browserStarted && screenshot && (
          <img
            src={screenshot}
            alt="Browser view"
            className="w-full rounded-md mb-4"
          />
        )}
        {generatedCode && (
          <pre className="bg-white p-4 rounded-md overflow-x-auto text-black border border-gray-300 whitespace-pre-wrap">
            {generatedCode}
          </pre>
        )}
      </div>
    </div>
  );
}
