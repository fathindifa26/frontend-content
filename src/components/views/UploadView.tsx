import { useState } from "react";
import { UploadHeader } from "../upload/UploadHeader";
import { MetadataCard } from "../upload/MetadataCard";
import { TimelineCard } from "../upload/TimelineCard";
import { AudioIntelligence } from "../upload/AudioIntelligence";
import { ContentStrategy } from "../upload/ContentStrategy";
import { AccountContext } from "../upload/AccountContext";
import { MarketComparison } from "../upload/MarketComparison";

interface UploadViewProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
  data: any;
}

export function UploadView({ onUpload, isAnalyzing, data }: UploadViewProps) {
  const [benchmarkType, setBenchmarkType] = useState<"frequency" | "views">("frequency");
  const analysis = data?.analysis || {};
  const market = data?.market_comparison || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UploadHeader onUpload={onUpload} isAnalyzing={isAnalyzing} />
      
      {/* Benchmark Type Toggle */}
      <div className="flex justify-center relative">
        <div className="glass-panel p-1 rounded-2xl border-white/10 flex items-center bg-white/5 relative overflow-hidden backdrop-blur-2xl">
          {/* Sliding Active Background */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/15 backdrop-blur-md rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 ease-out z-0 ${
              benchmarkType === "frequency" ? "left-1" : "left-[calc(50%+1px)]"
            }`}
          />
          
          <button 
            onClick={() => setBenchmarkType("frequency")}
            className={`relative z-10 px-8 py-2.5 text-xs font-bold transition-all duration-300 ${
              benchmarkType === "frequency" ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Frequency
          </button>
          <button 
            onClick={() => setBenchmarkType("views")}
            className={`relative z-10 px-8 py-2.5 text-xs font-bold transition-all duration-300 ${
              benchmarkType === "views" ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Views
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <MetadataCard data={analysis} />
        <TimelineCard 
          data={analysis.visual} 
          market={market.positioning} 
          benchmarkType={benchmarkType}
        />
        <AudioIntelligence data={analysis.audio} />
        <ContentStrategy data={analysis.semantic} />
        <AccountContext data={analysis.profile} />
        <MarketComparison data={market} />
      </div>
    </div>
  );
}
