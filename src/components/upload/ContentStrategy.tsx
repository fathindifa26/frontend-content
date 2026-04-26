interface ContentStrategyProps {
  data?: any;
}

export function ContentStrategy({ data }: ContentStrategyProps) {
  const semantic = data || {};

  return (
    <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-[32px] space-y-6">
       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Content Strategy</h3>
       <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Topic</p>
             <p className="text-sm text-white font-bold capitalize">{semantic.topic || "Tech Review"}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Format</p>
             <p className="text-sm text-white font-bold capitalize">{semantic.format || "Tutorial"}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Tone</p>
             <p className="text-sm text-white font-bold capitalize">{semantic.tone || "Educational"}</p>
          </div>
       </div>
       <div className="space-y-4">
          <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20 space-y-2">
             <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Hook Message</p>
             <p className="text-sm text-on-surface/90 leading-relaxed font-medium">
               {semantic.hook_message ? `"${semantic.hook_message}"` : '"Wait until you see how this changes everything..."'}
             </p>
          </div>
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
             <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Content Message</p>
             <p className="text-sm text-on-surface/80 leading-relaxed">
               {semantic.content_message || "Comprehensive review of the latest video intelligence features and their impact on content creation."}
             </p>
          </div>
       </div>
       <div className="space-y-4 px-2">
          <div className="flex items-center justify-between">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold">Word Density</p>
             <p className="text-sm text-white font-bold tabular-nums">
               {semantic.word_density_wps ? `${semantic.word_density_wps} w/s` : "3.2 w/s"}
             </p>
          </div>
          <div className="flex items-center justify-between">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold">Hook Type</p>
             <p className="text-sm text-white font-bold capitalize">{semantic.hook_type || "Shocking Statement"}</p>
          </div>
          <div className="flex items-center justify-between">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold">Hook Duration</p>
             <p className="text-sm text-white font-bold tabular-nums">
               {semantic.hook_duration_sec ? `${semantic.hook_duration_sec}s` : "5s"}
             </p>
          </div>
       </div>
    </div>
  );
}
