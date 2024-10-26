"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function IdentifyEl() {
  const [url, setUrl] = useState("");
  const [outputFileName, setOutputFileName] = useState("elements.csv");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [proxyHtml, setProxyHtml] = useState("");
  const [identifiedElements, setIdentifiedElements] = useState([]);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<>(null);

  const loadUrl = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/proxy", {
        url,
      });
      setProxyHtml(response.data.html);
    } catch (error) {
      console.error("Error loading URL:", error);
      setError(
        "An error occurred while loading the URL. Please check the console for more details."
      );
    }
    setLoading(false);
  };

  const identifyElements = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        setIdentifiedElements([]);
        setProgress(0);
        setLoading(true);
        (
          iframeRef.current.contentWindow as Window & {
            identifyElements: () => void;
          }
        ).identifyElements();
      } catch (error) {
        console.error("Error identifying elements:", error);
        setError(
          "An error occurred while identifying elements. Please check the console for more details."
        );
        setLoading(false);
      }
    }
  };

  const downloadCsv = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-csv",
        { elements: identifiedElements, filename: outputFileName },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setError(
        "An error occurred while downloading the CSV. Please check the console for more details."
      );
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "elementsIdentified") {
        setIdentifiedElements((prev) => [...prev, ...event.data.elements]);
        setProgress(event.data.progress);
      } else if (event.data.type === "identificationComplete") {
        setLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Identify Page Elements
      </h1>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to inspect"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          value={outputFileName}
          onChange={(e) => setOutputFileName(e.target.value)}
          placeholder="Output CSV file name"
          className="w-full p-3 mb-4 bg-transparent border border-pink-300 rounded-md text-white placeholder-pink-200 focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={loadUrl}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-pink-600 hover:to-purple-700 transition duration-300 flex items-center justify-center mb-4"
        >
          {loading ? "Loading..." : "Load URL"}
        </button>
        {proxyHtml && (
          <button
            onClick={identifyElements}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white font-bold py-3 px-6 rounded-md hover:from-blue-600 hover:to-green-700 transition duration-300 flex items-center justify-center"
          >
            {loading
              ? `Identifying Elements (${Math.round(progress * 100)}%)`
              : "Identify Elements"}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-500 text-white p-4 rounded-md">{error}</div>
      )}

      {proxyHtml && (
        <div className="mt-8">
          <iframe
            ref={iframeRef}
            srcDoc={proxyHtml}
            style={{ width: "100%", height: "600px", border: "none" }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}

      {identifiedElements.length > 0 && (
        <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Identified Elements
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tag
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Element ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3">
                    XPath
                  </th>
                </tr>
              </thead>
              <tbody>
                {identifiedElements.map((element, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 border-b border-gray-700"
                  >
                    <td className="px-6 py-4">{element.id}</td>
                    <td className="px-6 py-4">{element.tag}</td>
                    <td className="px-6 py-4">{element.elementId}</td>
                    <td className="px-6 py-4">{element.className}</td>
                    <td className="px-6 py-4">{element.xpath}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={downloadCsv}
            className="mt-4 inline-block bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md hover:from-green-600 hover:to-blue-700 transition duration-300"
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}
