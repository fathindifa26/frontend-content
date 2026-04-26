import { motion } from "motion/react";
import { Volume2 } from "lucide-react";

export function AudioIntelligence() {
  return (
    <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-[32px] space-y-6">
       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Audio Intelligence</h3>
       <div className="p-4 bg-tertiary/20 rounded-2xl border border-tertiary/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="p-1.5 bg-tertiary/20 rounded-lg">
                <Volume2 size={16} className="text-tertiary" />
             </div>
             <span className="text-sm font-bold text-white">Trending Audio</span>
          </div>
          <span className="text-[10px] bg-tertiary text-white px-2.5 py-1 rounded-lg font-bold shadow-lg shadow-tertiary/20">Rank #4</span>
       </div>
       <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
             <span>Speech Percentage</span>
             <span className="text-white">94%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]" 
             />
          </div>
       </div>
       <div className="pt-2">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-2">Voice Sentiment</p>
          <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/5">
             <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
             <p className="text-sm text-white font-medium">Confident & Energetic</p>
          </div>
       </div>
    </div>
  );
}
