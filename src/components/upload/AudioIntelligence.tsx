import { motion } from "motion/react";
import { Volume2, Activity } from "lucide-react";
import { MetricBadge } from "../common/MetricBadge";

interface AudioIntelligenceProps {
  data?: any;
  market?: any;
  benchmarkType?: "frequency" | "views";
}

export function AudioIntelligence({ data, market, benchmarkType = "frequency" }: AudioIntelligenceProps) {
  const audio = data || {};
  const m = market || {};
  const speechPercent = audio.speech_ratio !== undefined ? Math.round(audio.speech_ratio * 100) : 94;

  return (
    <div className="col-span-12 lg:col-span-3 glass-panel p-6 rounded-[32px] space-y-6 relative hover:z-[60] transition-all duration-300">
       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Audio Intelligence</h3>
       <div className="p-4 bg-tertiary/20 rounded-2xl border border-tertiary/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="p-1.5 bg-tertiary/20 rounded-lg">
                <Volume2 size={16} className="text-tertiary" />
             </div>
             <span className="text-sm font-bold text-white">Trending Audio</span>
          </div>
          <span className="text-[8px] bg-tertiary/80 text-white px-1.5 py-0.5 rounded-md font-black tracking-tight shadow-sm shadow-tertiary/10 border border-white/10 uppercase">Rank #4</span>
       </div>
       <div className="space-y-3">
          <div className="flex justify-between items-center mb-1">
             <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Speech Percentage</span>
             <MetricBadge 
                value={m.numeric?.speech_ratio?.percentile} 
                type="numeric" 
                benchmarkType={benchmarkType}
             />
          </div>
          <div className="flex justify-between text-xs font-bold text-white mb-1">
             <span>{speechPercent}% Ratio</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${speechPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]" 
             />
          </div>
       </div>
       <div className="pt-2">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-2">Voice Sentiment</p>
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
             <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-bold text-white capitalize">{audio.voice_sentiment || "Energetic"}</span>
             </div>
             <MetricBadge 
                value={m.categorical?.voice_sentiment} 
                type="categorical" 
                benchmarkType={benchmarkType}
                labelOverride={m.categorical?.voice_sentiment ? (
                   benchmarkType === "frequency" 
                     ? `${Math.round(m.categorical.voice_sentiment.frequency.proportion)}% market`
                     : `${(m.categorical.voice_sentiment.views.avg_views / 1000).toFixed(1)}k views`
                ) : undefined}
             />
          </div>
       </div>
    </div>
  );
}
