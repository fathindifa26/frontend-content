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
  onUrlSubmit: (url: string) => void;
  isAnalyzing: boolean;
  data: any;
}


export function UploadView({ onUpload, onUrlSubmit, isAnalyzing, data }: UploadViewProps) {

  const [benchmarkType, setBenchmarkType] = useState<"frequency" | "views">("frequency");
  const analysis = data?.analysis || {};
  const market = data?.market_comparison || {};
  
  const defaultPoints = Array(3).fill({ 
    title: "ANALYZING...", 
    description: "Our AI is processing your content relative to current market trends..." 
  });

  // Handle cases where ai_summary might be a string (old version) or missing
  let aiSummary = data?.ai_summary;
  if (!aiSummary || typeof aiSummary === "string") {
    aiSummary = {
      current_condition: defaultPoints,
      recommendation: defaultPoints
    };
  }

  // Double check that current_condition and recommendation are actually arrays
  const currentCondition = Array.isArray(aiSummary.current_condition) ? aiSummary.current_condition : defaultPoints;
  const recommendation = Array.isArray(aiSummary.recommendation) ? aiSummary.recommendation : defaultPoints;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UploadHeader 
        onUpload={onUpload} 
        onUrlSubmit={onUrlSubmit}
        isAnalyzing={isAnalyzing} 
      />

      
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

          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <p className="text-[11px] font-medium text-white/50 leading-relaxed italic">
                  Market-aware insights. Color-coded badges indicate your video's alignment with performance standards:
                </p>
                <div className="flex items-center space-x-2">
                   <span className="px-2 py-0.5 rounded border border-error/30 bg-error/20 text-error text-[9px] font-bold uppercase shadow-[0_0_10px_rgba(248,113,113,0.1)]">Low</span>
                   <span className="px-2 py-0.5 rounded border border-success/30 bg-success/20 text-success text-[9px] font-bold uppercase shadow-[0_0_10px_rgba(74,222,128,0.1)]">Mid</span>
                   <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/20 text-primary text-[9px] font-bold uppercase shadow-[0_0_10px_rgba(79,70,229,0.1)]">High</span>
                </div>
             </div>
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
        <AudioIntelligence 
          data={analysis.audio} 
          market={market} 
          benchmarkType={benchmarkType} 
        />
        <ContentStrategy 
          data={analysis.semantic} 
          market={market} 
          benchmarkType={benchmarkType} 
        />
        <AccountContext data={analysis.profile} />
        <MarketComparison data={market} />
      </div>

      {/* AI Analysis Section */}
      <div className="space-y-8">
        {/* Current Condition Section */}
        <div className="glass-panel p-8 rounded-[40px] space-y-8 bg-white/[0.02] border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber-400/20 transition-all duration-700" />
          
          <div className="px-2">
            <h3 className="text-lg font-bold text-white">Current Condition</h3>
            <p className="text-sm text-on-surface-variant mt-1">Deep analysis of your video's current alignment with market performance data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {currentCondition.map((item: any, idx: number) => (
              <div key={idx} className="glass-panel p-6 rounded-[28px] space-y-3 bg-amber-400/5 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.05)] hover:bg-amber-400/10 hover:border-amber-400/40 transition-all duration-500 group/card">
                <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest group-hover/card:scale-105 transition-transform origin-left">{item.title}</h4>
                <p className="text-sm text-on-surface/80 leading-relaxed font-medium line-clamp-4 group-hover/card:text-white transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="glass-panel p-8 rounded-[40px] space-y-8 bg-white/[0.02] border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-success/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-success/20 transition-all duration-700" />

          <div className="px-2">
            <h3 className="text-lg font-bold text-white">Strategic Recommendation</h3>
            <p className="text-sm text-on-surface-variant mt-1">Actionable steps to optimize your content for maximum reach and engagement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {recommendation.map((item: any, idx: number) => (
              <div key={idx} className="glass-panel p-6 rounded-[28px] space-y-3 bg-success/5 border-success/20 shadow-[0_0_20px_rgba(74,222,128,0.05)] hover:bg-success/10 hover:border-success/40 transition-all duration-500 group/card">
                <h4 className="text-[10px] font-bold text-success uppercase tracking-widest group-hover/card:scale-105 transition-transform origin-left">{item.title}</h4>
                <p className="text-sm text-on-surface/80 leading-relaxed font-medium line-clamp-4 group-hover/card:text-white transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}




