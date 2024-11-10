"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaCode, FaBug, FaEdit } from "react-icons/fa";

interface IdentifiedElement {
  id: string;
  tag: string;
  elementId: string;
  className: string;
  xpath: string;
}

export default function IdentifyEl() {
  const [url, setUrl] = useState("");
  const [outputFileName, setOutputFileName] = useState("elements.csv");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [proxyHtml, setProxyHtml] = useState("");
  const [identifiedElements, setIdentifiedElements] = useState<IdentifiedElement[]>([]);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    const handleMessage = (event: MessageEvent) => {
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
    <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
      <div className="w-1/2 bg-gray-300 p-8 rounded-md h-[calc(100vh-100px)]">
        <h1 className="text-4xl font-bold text-black mb-8">
          Identify Page Elements
        </h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to inspect"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
        />
        <input
          type="text"
          value={outputFileName}
          onChange={(e) => setOutputFileName(e.target.value)}
          placeholder="Output CSV file name"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
        />
        <button
          onClick={loadUrl}
          disabled={loading}
          className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 mb-4"
        >
          {loading ? "Loading..." : "Load URL"}
        </button>
        {proxyHtml && (
          <button
            onClick={identifyElements}
            disabled={loading}
            className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
          >
            {loading ? (
              <span>
                Identifying Elements ({Math.round(progress * 100)}%)
              </span>
            ) : (
              <span>
                <FaRobot className="inline-block mr-2" />
                Identify Elements
              </span>
            )}
          </button>
        )}

        {error && (
          <div className="mt-4 bg-red-500 text-white p-4 rounded-md">{error}</div>
        )}
      </div>

      <div className="w-1/2 bg-gray-300 rounded-md h-[calc(100vh-100px)]">
        {proxyHtml && (
          <iframe
            ref={iframeRef}
            srcDoc={proxyHtml}
            className="w-full h-1/2 border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        )}

        {identifiedElements.length > 0 && (
          <div className="h-1/2 overflow-auto p-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-2xl font-bold text-black mb-4">
                Identified Elements
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-900">
                  <thead className="text-xs uppercase bg-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">ID</th>
                      <th scope="col" className="px-6 py-3">Tag</th>
                      <th scope="col" className="px-6 py-3">Element ID</th>
                      <th scope="col" className="px-6 py-3">Class</th>
                      <th scope="col" className="px-6 py-3">XPath</th>
                    </tr>
                  </thead>
                  <tbody>
                    {identifiedElements.map((element, index) => (
                      <tr key={index} className="bg-white border-b">
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
                className="mt-4 bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
              >
                <FaCode className="inline-block mr-2" />
                Download CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
