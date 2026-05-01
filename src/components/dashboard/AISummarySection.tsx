import { RefreshCw } from "lucide-react";

interface AISummarySectionProps {
  activeVersion: number;
  setActiveVersion: (v: number) => void;
  isRegenerating: boolean;
  onRegenerate: () => void;
  versionedSummaries: Record<number, any>;
  currentCondition: any[];
  recommendation: any[];
  hasData: boolean;
}

export function AISummarySection({
  activeVersion,
  setActiveVersion,
  isRegenerating,
  onRegenerate,
  versionedSummaries,
  currentCondition,
  recommendation,
  hasData
}: AISummarySectionProps) {
  return (
    <div className="space-y-8">
      {/* Version Toggle & Regenerate */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Insight Versions</h3>
          <div className="p-1 bg-white/5 rounded-xl border border-white/10 flex items-center relative overflow-hidden">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(33.33%-4px)] rounded-lg transition-all duration-500 ease-out z-0 bg-primary/20`}
              style={{ left: `calc(${(activeVersion - 1) * 33.33}% + 4px)` }}
            />
            {[1, 2, 3].map((v) => (
              <button 
                key={v}
                onClick={() => setActiveVersion(v)}
                className={`relative z-10 px-4 py-1.5 text-[10px] font-bold transition-all duration-500 w-12 ${
                  activeVersion === v ? "text-white" : "text-white/30 hover:text-white/50"
                }`}
              >
                V{v}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={onRegenerate}
          disabled={isRegenerating || !hasData}
          className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group disabled:opacity-50"
        >
          <RefreshCw size={14} className={`text-primary group-hover:rotate-180 transition-transform duration-500 ${isRegenerating ? "animate-spin" : ""}`} />
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
            {versionedSummaries[activeVersion] ? "Regenerate" : "Generate Version"}
          </span>
        </button>
      </div>

      {/* Current Condition Section */}
      <div className="glass-panel p-8 rounded-[40px] space-y-8 bg-white/[0.02] border-white/10 shadow-2xl relative overflow-hidden group">
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
  );
}
