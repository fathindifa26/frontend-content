import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { UploadView } from "./components/views/UploadView";
import { DashboardView } from "./components/views/DashboardView";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload">("upload");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null); // Reset previous result

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Failed to analyze video. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(`http://localhost:8000/analyze-url?url=${encodeURIComponent(url)}`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("URL analysis failed");

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("URL analysis error:", error);
      alert("Failed to download or analyze video. Please check the URL and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRegenerate = async () => {
    if (!analysisResult) return null;
    
    try {
      const response = await fetch("http://localhost:8000/regenerate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis: analysisResult.analysis,
          market_comparison: analysisResult.market_comparison
        }),
      });

      if (!response.ok) throw new Error("Regeneration failed");

      const data = await response.json();
      return data.ai_summary;
    } catch (error) {
      console.error("Regeneration error:", error);
      alert("Failed to regenerate summary.");
      return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent selection:bg-primary/30">
      <div className="mesh-bg" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header activeTab={activeTab} />

        <main className="px-10 pb-10 max-w-[1600px] w-full">
          {activeTab === "upload" ? (
            <UploadView 
              onUpload={handleUpload} 
              onUrlSubmit={handleUrlSubmit}
              onRegenerate={handleRegenerate}
              isAnalyzing={isAnalyzing} 
              data={analysisResult} 
            />
          ) : (
            <DashboardView />
          )}
        </main>
      </div>
    </div>
  );
}
