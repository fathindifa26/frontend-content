import { Video } from "lucide-react";

interface TimelineCardProps {
  data?: any;
  market?: any;
}

export function TimelineCard({ data, market }: TimelineCardProps) {
  const visual = data || {};
  const m = market || {};

  const getNumericColor = (percentile: number | undefined, fallback: number = 50) => {
    const p = (percentile !== undefined && !isNaN(percentile)) ? percentile : fallback; 
    
    if (p > 65) return "bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(79,70,229,0.2)]"; // Blue (Above Median)
    if (p > 35) return "bg-success/20 text-success border-success/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]"; // Green (Near Median)
    return "bg-error/20 text-error border-error/30 shadow-[0_0_10px_rgba(248,113,113,0.2)]"; // Red (Below Median)
  };

  const getCategoricalColor = (proportion: number | undefined, avgProportion: number | undefined, fallback: number = 15) => {
    const p = (proportion !== undefined && !isNaN(proportion)) ? proportion : fallback;
    const avg = (avgProportion !== undefined && !isNaN(avgProportion)) ? avgProportion : 15;
    
    // Green if significantly above average (> 120% of avg)
    if (p > avg * 1.2) return "bg-success/20 text-success border-success/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]";
    // Blue if near average (80% - 120% of avg)
    if (p > avg * 0.8) return "bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(79,70,229,0.2)]";
    // Red if significantly below average (< 80% of avg)
    return "bg-error/20 text-error border-error/30 shadow-[0_0_10px_rgba(248,113,113,0.2)]";
  };

  return (
    <div className="col-span-12 lg:col-span-9 glass-panel p-6 rounded-[32px] space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Visual Timeline</h3>
        <div className="flex space-x-2">
          <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white border border-white/5">4K HDR</span>
          <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white border border-white/5">60 FPS</span>
        </div>
      </div>
      
      <div className="h-44 bg-black/20 rounded-2xl border border-white/5 relative overflow-hidden group">
         <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
            <Video size={64} />
         </div>
         {/* Timeline Visual Mockup */}
         <div className="absolute inset-0 p-4 flex flex-col justify-end space-y-4">
            <div className="flex justify-between items-end">
               <span className="text-[10px] font-mono text-white/50">00:00.00</span>
               <span className="text-[10px] font-mono text-white/50">00:15.00 (Scene Cut)</span>
               <span className="text-[10px] font-mono text-white/50">{visual.duration_min ? `${visual.duration_min} min` : "00:42.15"}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full relative overflow-hidden">
               <div className="absolute h-full bg-primary w-2/3 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
               <div className="absolute top-0 left-1/3 w-0.5 h-full bg-white/30" />
               <div className="absolute top-0 left-2/3 w-0.5 h-full bg-white/30" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Faces Detected</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.face_present ?? "02"}</p>
            <div className="group relative">
              <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border cursor-help transition-colors ${getNumericColor(m.face_present?.percentile, 88)}`}>
                {m.face_present && !isNaN(m.face_present.percentile) ? `${Math.round(m.face_present.percentile)}th Pctl` : "88th Pctl"}
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                <div className="space-y-1.5">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1">Benchmark Guide</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <p className="text-[8px] text-on-surface-variant">Green: Near Median (Optimal)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[8px] text-on-surface-variant">Blue: Above Median (High)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-error" />
                    <p className="text-[8px] text-on-surface-variant">Red: Below Median (Low)</p>
                  </div>
                  <p className="text-[8px] text-primary italic pt-1 border-t border-white/5">Tip: Staying near the median (Green) is generally more stable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Text Overlays</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.text_overlay_count ?? "05"}</p>
            <div className="group relative">
              <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border cursor-help transition-colors ${getNumericColor(m.text_overlay_count?.percentile, 92)}`}>
                {m.text_overlay_count && !isNaN(m.text_overlay_count.percentile) ? `${Math.round(m.text_overlay_count.percentile)}th Pctl` : "92th Pctl"}
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                <div className="space-y-1.5">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1">Benchmark Guide</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <p className="text-[8px] text-on-surface-variant">Green: Near Median (Optimal)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[8px] text-on-surface-variant">Blue: Above Median (High)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-error" />
                    <p className="text-[8px] text-on-surface-variant">Red: Below Median (Low)</p>
                  </div>
                  <p className="text-[8px] text-primary italic pt-1 border-t border-white/5">Tip: Staying near the median (Green) is generally more stable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Editing Pace</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.scene_cut_estimate ?? "12"}</p>
            <div className="group relative">
              <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border cursor-help transition-colors ${getNumericColor(m.scene_cut_estimate?.percentile, 85)}`}>
                {m.scene_cut_estimate && !isNaN(m.scene_cut_estimate.percentile) ? `${Math.round(m.scene_cut_estimate.percentile)}th Pctl` : "85th Pctl"}
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                <div className="space-y-1.5">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1">Benchmark Guide</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <p className="text-[8px] text-on-surface-variant">Green: Near Median (Optimal)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[8px] text-on-surface-variant">Blue: Above Median (High)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-error" />
                    <p className="text-[8px] text-on-surface-variant">Red: Below Median (Low)</p>
                  </div>
                  <p className="text-[8px] text-primary italic pt-1 border-t border-white/5">Tip: Staying near the median (Green) is generally more stable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Face Emotions</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-sm font-bold text-white mt-1 capitalize">{visual.face_emotion || "Surprised"}</p>
            <div className="group relative">
              <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border cursor-help transition-colors ${getCategoricalColor(m.face_emotion?.proportion, m.face_emotion?.avg_proportion, 18)}`}>
                {m.face_emotion ? `${Math.round(m.face_emotion.proportion)}% market` : "18% market"}
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                <div className="space-y-1.5">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1">Benchmark Guide</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <p className="text-[8px] text-on-surface-variant">Green: Popular (Above Avg)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[8px] text-on-surface-variant">Blue: Common (Near Avg)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-error" />
                    <p className="text-[8px] text-on-surface-variant">Red: Unique (Below Avg)</p>
                  </div>
                  <p className="text-[8px] text-primary italic pt-1 border-t border-white/5">Tip: Features with higher market presence (Green) are more widely proven.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
