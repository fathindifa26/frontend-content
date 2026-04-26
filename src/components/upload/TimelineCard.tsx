import { Video } from "lucide-react";

export function TimelineCard() {
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
               <span className="text-[10px] font-mono text-white/50">00:42.15</span>
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
          <p className="text-3xl font-bold text-white">02</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Text Overlays</p>
          <p className="text-3xl font-bold text-white">05</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Editing Pace</p>
          <p className="text-3xl font-bold text-white">12</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Face Emotions</p>
          <p className="text-sm font-bold text-white mt-2">Smile, Surprised</p>
        </div>
      </div>
    </div>
  );
}
