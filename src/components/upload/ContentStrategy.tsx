export function ContentStrategy() {
  return (
    <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-[32px] space-y-6">
       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Content Strategy</h3>
       <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Topic</p>
             <p className="text-sm text-white font-bold">Tech Review</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
             <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Format</p>
             <p className="text-sm text-white font-bold">Tutorial</p>
          </div>
       </div>
       <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20 space-y-3">
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Hook Effectiveness</p>
          <p className="text-sm text-on-surface/90 leading-relaxed font-medium">Strong visual opening with high retention probability in first 3s.</p>
       </div>
       <div className="flex items-center justify-between px-2">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold">Message Density</p>
          <p className="text-sm text-white font-bold tabular-nums">248 wpm</p>
       </div>
    </div>
  );
}
