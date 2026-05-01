import { useState } from "react";
import { MetricBadge } from "../common/MetricBadge";

interface ContentStrategyProps {
  data?: any;
  market?: any;
  benchmarkType?: "frequency" | "views";
}

export function ContentStrategy({ data, market, benchmarkType = "frequency" }: ContentStrategyProps) {
  const semantic = data || {};
  const m = market || {};
  const [msgLang, setMsgLang] = useState<"en" | "id">("en");

  // Handle both string (old) and object (new) content_message formats
  const getContentMessage = () => {
    if (!semantic.content_message) {
      return "Comprehensive review of the latest video intelligence features and their impact on content creation.";
    }
    if (typeof semantic.content_message === "string") {
      return semantic.content_message;
    }
    return semantic.content_message[msgLang] || semantic.content_message["en"] || "No content message available.";
  };

  return (
    <div className="col-span-12 lg:col-span-6 glass-panel p-6 rounded-[32px] space-y-6 relative hover:z-[60] transition-all duration-300">
       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Content Strategy</h3>
       <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Topic</p>
             <div className="flex flex-col space-y-2">
                <p className="text-sm text-white font-bold capitalize truncate">{semantic.topic || "Tech Review"}</p>
                <MetricBadge 
                  value={m.categorical?.topic} 
                  type="categorical" 
                  benchmarkType={benchmarkType}
                  labelOverride={m.categorical?.topic ? (
                    benchmarkType === "frequency" 
                      ? `${Math.round(m.categorical.topic.frequency.proportion)}% market`
                      : `${(m.categorical.topic.views.avg_views / 1000).toFixed(1)}k views`
                  ) : undefined}
                />
             </div>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Format</p>
             <div className="flex flex-col space-y-2">
                <p className="text-sm text-white font-bold capitalize truncate">{semantic.format || "Tutorial"}</p>
                <MetricBadge 
                  value={m.categorical?.format} 
                  type="categorical" 
                  benchmarkType={benchmarkType}
                  labelOverride={m.categorical?.format ? (
                    benchmarkType === "frequency" 
                      ? `${Math.round(m.categorical.format.frequency.proportion)}% market`
                      : `${(m.categorical.format.views.avg_views / 1000).toFixed(1)}k views`
                  ) : undefined}
                />
             </div>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Tone</p>
             <div className="flex flex-col space-y-2">
                <p className="text-sm text-white font-bold capitalize truncate">{semantic.tone || "Educational"}</p>
                <MetricBadge 
                  value={m.categorical?.tone} 
                  type="categorical" 
                  benchmarkType={benchmarkType}
                  labelOverride={m.categorical?.tone ? (
                    benchmarkType === "frequency" 
                      ? `${Math.round(m.categorical.tone.frequency.proportion)}% market`
                      : `${(m.categorical.tone.views.avg_views / 1000).toFixed(1)}k views`
                  ) : undefined}
                />
             </div>
          </div>
       </div>
       <div className="space-y-4">
          <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20 space-y-2">
             <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Hook Message</p>
             <p className="text-sm text-on-surface/90 leading-relaxed font-medium">
                {semantic.hook_message ? `"${semantic.hook_message}"` : '"Wait until you see how this changes everything..."'}
             </p>
          </div>
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
             <div className="flex items-center justify-between">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Content Message</p>
                <div className="flex bg-black/20 p-0.5 rounded-lg border border-white/5">
                   <button 
                      onClick={() => setMsgLang("en")}
                      className={`px-2 py-0.5 text-[8px] font-bold rounded-md transition-all ${msgLang === "en" ? "bg-white/10 text-white" : "text-on-surface-variant hover:text-white/60"}`}
                   >
                      EN
                   </button>
                   <button 
                      onClick={() => setMsgLang("id")}
                      className={`px-2 py-0.5 text-[8px] font-bold rounded-md transition-all ${msgLang === "id" ? "bg-white/10 text-white" : "text-on-surface-variant hover:text-white/60"}`}
                   >
                      ID
                   </button>
                </div>
             </div>
             <p className="text-sm text-on-surface/80 leading-relaxed min-h-[60px]">
                {getContentMessage()}
             </p>
          </div>
       </div>
       <div className="space-y-4 px-2">
          <div className="flex items-center justify-between">
             <p className="text-sm font-bold text-white tracking-tight">Word Density</p>
             <div className="flex items-center space-x-3">
                <MetricBadge 
                   value={m.numeric?.word_density_wps?.percentile} 
                   type="numeric" 
                   benchmarkType={benchmarkType}
                />
                <p className="text-base font-bold text-white tabular-nums">
                   {semantic.word_density_wps ? `${semantic.word_density_wps} w/s` : "3.2 w/s"}
                </p>
             </div>
          </div>
          <div className="flex items-center justify-between">
             <p className="text-sm font-bold text-white tracking-tight">Hook Type</p>
             <div className="flex items-center space-x-3">
                <MetricBadge 
                   value={m.categorical?.hook_type} 
                   type="categorical" 
                   benchmarkType={benchmarkType}
                   labelOverride={m.categorical?.hook_type ? (
                      benchmarkType === "frequency" 
                        ? `${Math.round(m.categorical.hook_type.frequency.proportion)}% market`
                        : `${(m.categorical.hook_type.views.avg_views / 1000).toFixed(1)}k views`
                   ) : undefined}
                />
                <p className="text-sm font-bold text-white capitalize truncate max-w-[150px]">{semantic.hook_type || "Shocking Statement"}</p>
             </div>
          </div>
          <div className="flex items-center justify-between">
             <p className="text-sm font-bold text-white tracking-tight">Hook Duration</p>
             <div className="flex items-center space-x-3">
                <MetricBadge 
                   value={m.numeric?.hook_duration_sec?.percentile} 
                   type="numeric" 
                   benchmarkType={benchmarkType}
                />
                <p className="text-base font-bold text-white tabular-nums">
                   {semantic.hook_duration_sec ? `${semantic.hook_duration_sec}s` : "5s"}
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
