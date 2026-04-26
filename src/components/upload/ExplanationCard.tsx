import { Info, BarChart3, PieChart } from "lucide-react";

export function ExplanationCard() {
  return (
    <div className="glass-panel p-6 rounded-[28px] border-white/5 bg-white/2 relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-[0.2em]">
          <span className="text-rose-400">Unique / Low</span>
          <span className="text-emerald-400">Market Average</span>
          <span className="text-indigo-400">Top Performance</span>
        </div>
        
        <div className="relative h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-emerald-500 to-indigo-500 opacity-80" />
        </div>
        
        <div className="flex justify-between text-[8px] font-medium text-on-surface-variant/50 uppercase tracking-widest">
          <span>Lower Proportion / Percentile</span>
          <span>50th Percentile</span>
          <span>Higher Proportion / Percentile</span>
        </div>
      </div>
    </div>
  );
}
