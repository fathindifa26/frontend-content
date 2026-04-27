import { useState, useEffect } from "react";
import { UploadHeader } from "../upload/UploadHeader";
import { BenchmarkCard } from "../upload/BenchmarkCard";
import { MetricsGrid } from "../upload/MetricsGrid";
import { AISummarySection } from "../upload/AISummarySection";

interface UploadViewProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  onRegenerate: () => Promise<any>;
  isAnalyzing: boolean;
  data: any;
}

export function UploadView({ onUpload, onUrlSubmit, onRegenerate, isAnalyzing, data }: UploadViewProps) {
  const [benchmarkType, setBenchmarkType] = useState<"frequency" | "views">("frequency");
  const [activeVersion, setActiveVersion] = useState(1);
  const [versionedSummaries, setVersionedSummaries] = useState<Record<number, any>>({});
  const [isRegenerating, setIsRegenerating] = useState(false);

  const defaultPoints = Array(3).fill({ 
    title: "ANALYZING...", 
    description: "Our AI is processing your content relative to current market trends..." 
  });

  const emptyPoints = Array(3).fill({ 
    title: "EMPTY VERSION", 
    description: "Click 'Generate Version' to get a new perspective for this analysis." 
  });

  useEffect(() => {
    if (data?.ai_summary) {
      setVersionedSummaries({ 1: data.ai_summary });
      setActiveVersion(1);
    }
  }, [data]);

  const handleRegenerateClick = async (targetVersion?: number) => {
    const versionToUpdate = targetVersion || activeVersion;
    setIsRegenerating(true);
    const newSummary = await onRegenerate();
    if (newSummary) {
      setVersionedSummaries(prev => ({ ...prev, [versionToUpdate]: newSummary }));
    }
    setIsRegenerating(false);
  };

  const handleVersionChange = (v: number) => {
    setActiveVersion(v);
    if (!versionedSummaries[v] && data) {
      handleRegenerateClick(v);
    }
  };

  const analysis = data?.analysis || {};
  const market = data?.market_comparison || {};
  
  let aiSummary = versionedSummaries[activeVersion];
  if (!aiSummary || typeof aiSummary === "string") {
    aiSummary = {
      current_condition: isRegenerating ? defaultPoints : emptyPoints,
      recommendation: isRegenerating ? defaultPoints : emptyPoints
    };
  }

  const currentCondition = Array.isArray(aiSummary.current_condition) ? aiSummary.current_condition : defaultPoints;
  const recommendation = Array.isArray(aiSummary.recommendation) ? aiSummary.recommendation : defaultPoints;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UploadHeader 
        onUpload={onUpload} 
        onUrlSubmit={onUrlSubmit}
        isAnalyzing={isAnalyzing} 
      />

      <BenchmarkCard 
        benchmarkType={benchmarkType} 
        setBenchmarkType={setBenchmarkType} 
      />

      <MetricsGrid 
        analysis={analysis} 
        market={market} 
        benchmarkType={benchmarkType} 
      />

      <AISummarySection 
        activeVersion={activeVersion}
        setActiveVersion={handleVersionChange}
        isRegenerating={isRegenerating}
        onRegenerate={() => handleRegenerateClick()}
        versionedSummaries={versionedSummaries}
        currentCondition={currentCondition}
        recommendation={recommendation}
        hasData={!!data}
      />
    </div>
  );
}
