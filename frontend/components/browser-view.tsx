"use client";
import React, { useEffect, useState } from "react";

interface BrowserViewProps {
  url: string;
  onElementsSelected: (elements: any[]) => void;
}

const BrowserView: React.FC<BrowserViewProps> = ({
  url,
  onElementsSelected,
}) => {
  const [proxyUrl, setProxyUrl] = useState("");

  useEffect(() => {
    setProxyUrl(`http://localhost:5000/proxy?url=${encodeURIComponent(url)}`);
  }, [url]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "elementsSelected") {
        onElementsSelected(event.data.elements);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onElementsSelected]);

  return (
    <div className="browser-view rounded-md">
      <iframe
        src={proxyUrl}
        style={{
          width: "100%",
          // height: "100%",
          border: "none",
        }}
        className="rounded-md h-[calc(100vh-100px)]"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default BrowserView;
