import { useState } from "react";
import { Info, Plus, ChevronDown } from "lucide-react";
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
      
      {/* Benchmark Configuration Card */}
      <div className="w-full">
        <div className={`glass-panel p-6 rounded-[32px] space-y-4 transition-all duration-500 ease-in-out ${
          benchmarkType === "frequency" 
            ? "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]" 
            : "bg-amber-400/5 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)]"
        }`}>
          <div className="flex items-center space-x-2">
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Set Benchmark Configuration</h3>
            <div className="group relative">
              <Info size={14} className="text-on-surface-variant cursor-help hover:text-white transition-colors" />
              {/* Info Tooltip */}
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                <p className="text-[10px] text-on-surface/80 leading-relaxed">
                  Configure how your video is benchmarked. 
                  <strong className="text-white block mt-1">Frequency:</strong> Compares based on how common features are in the market.
                  <strong className="text-white block mt-1">Views:</strong> Compares against the top-performing videos in terms of reach.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Freq/Views Toggle */}
            <div className="p-1 bg-white/5 rounded-xl border border-white/10 flex items-center relative overflow-hidden">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-500 ease-out z-0 ${
                  benchmarkType === "frequency" 
                    ? "left-1 bg-primary/20" 
                    : "left-[calc(50%+1px)] bg-amber-400/20"
                }`}
              />
              <button 
                onClick={() => setBenchmarkType("frequency")}
                className={`relative z-10 px-4 py-1.5 text-[10px] font-bold transition-all duration-500 ${
                  benchmarkType === "frequency" ? "text-white" : "text-white/30 hover:text-white/50"
                }`}
              >
                Freq
              </button>
              <button 
                onClick={() => setBenchmarkType("views")}
                className={`relative z-10 px-4 py-1.5 text-[10px] font-bold transition-all duration-500 ${
                  benchmarkType === "views" ? "text-amber-400" : "text-white/30 hover:text-white/50"
                }`}
              >
                Views
              </button>
            </div>

            {/* Topic Dropdown Mockup */}
            <div className="flex items-center space-x-2 px-4 py-1.5 bg-white/5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Topic:</span>
              <span className="text-[10px] font-bold text-white uppercase">All</span>
              <ChevronDown size={12} className="text-white/30 group-hover:text-white transition-colors" />
            </div>

            {/* Add Filter Button */}
            <button className="p-2 bg-white/5 rounded-xl border border-white/10 text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
              <Plus size={16} />
            </button>
          </div>
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
