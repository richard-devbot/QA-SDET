"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRobot, FaCode } from "react-icons/fa";

export default function AgentExplorer() {
  const [objective, setObjective] = useState("");
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [browserStarted, setBrowserStarted] = useState(false);
  const [screenshot, setScreenshot] = useState("");

  const startBrowser = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    setScreenshot("");
    try {
      await axios.post(
        "http://localhost:5000/api/agent-explorer/start-browser",
        { url }
      );
      setBrowserStarted(true);
    } catch (error) {
      console.error("Error starting browser:", error);
      setError(
        "An error occurred while starting the browser. Please try again."
      );
    }
    setLoading(false);
  };

  const stopBrowser = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    setScreenshot("");
    try {
      await axios.post("http://localhost:5000/api/agent-explorer/stop-browser");
      setBrowserStarted(false);
      setScreenshot("");
    } catch (error) {
      console.error("Error stopping browser:", error);
      setError(
        "An error occurred while stopping the browser. Please try again."
      );
    }
    setLoading(false);
  };

  const runWebAgent = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    setScreenshot("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/agent-explorer/run-web-agent",
        {
          objective,
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error running web agent:", error);
      setError(
        "An error occurred while running the web agent. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (browserStarted) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/agent-explorer/get-screenshot"
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
      <div className="w-1/3 bg-gray-50 p-8 rounded-md h-[calc(100vh-100px)] shadow-lg overflow-y-auto">
        <h1 className="text-xl font-bold text-black mb-2">
          Web Agent Explorer
        </h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter starting URL"
          className="w-full p-2 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
        />
        <button
          onClick={browserStarted ? stopBrowser : startBrowser}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm mb-4"
        >
          {browserStarted ? "Stop Browser" : "Start Browser"}
        </button>

        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Enter objective for web agent"
          className="w-full p-2 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
        />

        <button
          onClick={runWebAgent}
          disabled={loading || !browserStarted}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
        >
          {loading ? "Running Web Agent..." : "Start Demo"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-black mb-4">Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-md border border-gray-300"
                >
                  <h3 className="font-bold text-black">Step {result.step}</h3>
                  <p className="text-gray-700">URL: {result.current_url}</p>
                  <p className="text-gray-700">Action: {result.action_taken}</p>
                  {result.output && (
                    <p className="text-gray-700">Output: {result.output}</p>
                  )}
                  <p className="text-gray-700">
                    Success: {result.success ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 bg-purple-50 rounded-md h-[calc(100vh-100px)] overflow-y-auto shadow-lg">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 size-24 aspect-square rounded-full">
              <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 backdrop-blur-md"></div>
            </div>
          </div>
        )}
        {browserStarted && screenshot && (
          <img
            src={screenshot}
            alt="Browser view"
            className="w-full rounded-md mb-4"
          />
        )}
        {results.map(
          (result, index) =>
            result.screenshot && (
              <div key={index} className="mb-4">
                <img
                  src={`data:image/png;base64,${result.screenshot}`}
                  alt={`Step ${result.step} Screenshot`}
                  className="w-full rounded-md"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
