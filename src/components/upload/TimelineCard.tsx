import { Video } from "lucide-react";
import { MetricBadge } from "../common/MetricBadge";

interface TimelineCardProps {
  data?: any;
  market?: any;
  benchmarkType?: "frequency" | "views";
}

export function TimelineCard({ data, market, benchmarkType = "frequency" }: TimelineCardProps) {
  const visual = data || {};
  const m = market || {};

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
            <MetricBadge 
              value={m.face_present?.percentile} 
              type="numeric" 
              fallback={45} 
              benchmarkType={benchmarkType}
            />
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Text Overlays</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.text_overlay_count ?? "05"}</p>
            <MetricBadge 
              value={m.text_overlay_count?.percentile} 
              type="numeric" 
              fallback={92} 
              benchmarkType={benchmarkType}
            />
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Editing Pace</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-white">{visual.scene_cut_estimate ?? "12"}</p>
            <MetricBadge 
              value={m.scene_cut_estimate?.percentile} 
              type="numeric" 
              fallback={22} 
              benchmarkType={benchmarkType}
            />
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Face Emotions</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-sm font-bold text-white mt-1 capitalize">{visual.face_emotion || "Surprised"}</p>
            <MetricBadge 
              value={m.face_emotion}
              type="categorical" 
              fallback={25} 
              benchmarkType={benchmarkType}
              labelOverride={m.face_emotion ? (
                benchmarkType === "frequency" 
                  ? `${Math.round(m.face_emotion.frequency.proportion)}% market`
                  : `${(m.face_emotion.views.avg_views / 1000).toFixed(1)}k views`
              ) : (
                benchmarkType === "frequency" ? "25% market" : "12k views"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
