import { Sparkles } from "lucide-react";
import { MetricGauge } from "../common/MetricGauge";

export function MarketComparison() {
  return (
    <div className="col-span-12 glass-panel p-8 rounded-[40px] space-y-8">
       <div className="flex items-center justify-between">
          <div>
             <h3 className="text-lg font-bold text-white">Market Comparison</h3>
             <p className="text-sm text-on-surface-variant">Benchmarking video performance against global standards.</p>
          </div>
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
             <button className="px-5 py-2 bg-white/10 text-white text-xs font-bold rounded-xl shadow-lg shadow-black/20 transition-all">Global Market</button>
             <button className="px-5 py-2 text-on-surface-variant text-xs font-bold rounded-xl hover:text-white transition-all">Filtered Market</button>
          </div>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
          <MetricGauge value={90} label="Retention Rate" color="tertiary" />
          <MetricGauge value={60} label="Click Through" color="secondary" />
          <MetricGauge value={75} label="Engagement" color="tertiary" />
          <MetricGauge value={20} label="Share Frequency" color="secondary" />
       </div>

       <div className="p-6 bg-primary/10 rounded-[28px] border border-primary/20 flex items-start space-x-5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="p-3 bg-primary/20 rounded-2xl text-primary group-hover:scale-110 transition-transform">
             <Sparkles size={24} />
          </div>
          <div className="space-y-2">
             <p className="text-sm font-bold text-white uppercase tracking-widest">AI Recommendation</p>
             <p className="text-sm text-on-surface/90 leading-relaxed font-medium">
               To reach the top 10% in the 'Global Market', consider increasing scene cut frequency by <span className="text-primary font-bold">15%</span> and using a higher-tempo background track to match current trending tutorial formats.
             </p>
          </div>
       </div>
    </div>
  );
}
