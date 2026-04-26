import { Video } from "lucide-react";

interface TimelineCardProps {
  data?: any;
  market?: any;
}

export function TimelineCard({ data, market }: TimelineCardProps) {
  const visual = data || {};
  const m = market || {};

  const getPercentileColor = (percentile: number | undefined) => {
    // Default to average (Green) if data is missing for the "DUMMY" state
    const p = percentile !== undefined && !isNaN(percentile) ? percentile : 60;
    
    if (p >= 80) return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]";
    if (p >= 40) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
    return "bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
  };

  const getProportionColor = (proportion: number | undefined) => {
    const p = proportion !== undefined && !isNaN(proportion) ? proportion : 15;
    
    if (p >= 25) return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
    if (p >= 10) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    return "bg-rose-500/20 text-rose-400 border-rose-500/30";
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
            <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${getPercentileColor(m.face_present?.percentile ?? 88)}`}>
              {m.face_present && !isNaN(m.face_present.percentile) ? `Top ${Math.round(100 - m.face_present.percentile)}%` : "Top 12%"}
            </p>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Text Overlays</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.text_overlay_count ?? "05"}</p>
            <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${getPercentileColor(m.text_overlay_count?.percentile ?? 92)}`}>
              {m.text_overlay_count && !isNaN(m.text_overlay_count.percentile) ? `Top ${Math.round(100 - m.text_overlay_count.percentile)}%` : "Top 8%"}
            </p>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Editing Pace</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.scene_cut_estimate ?? "12"}</p>
            <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${getPercentileColor(m.scene_cut_estimate?.percentile ?? 85)}`}>
              {m.scene_cut_estimate && !isNaN(m.scene_cut_estimate.percentile) ? `Top ${Math.round(100 - m.scene_cut_estimate.percentile)}%` : "Top 15%"}
            </p>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Face Emotions</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-sm font-bold text-white mt-1 capitalize">{visual.face_emotion || "Surprised"}</p>
            <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${getProportionColor(m.face_emotion?.proportion ?? 18)}`}>
              {m.face_emotion ? `${Math.round(m.face_emotion.proportion)}% market` : "18% market"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
