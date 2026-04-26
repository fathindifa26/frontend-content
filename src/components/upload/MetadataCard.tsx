import { HelpCircle, CheckCircle } from "lucide-react";

export function MetadataCard() {
  return (
    <div className="col-span-12 lg:col-span-3 glass-panel p-6 rounded-[32px] space-y-6 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Metadata</h3>
          <HelpCircle size={14} className="text-on-surface-variant" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-white/10" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-white">@creative_nexus</p>
            <p className="text-[10px] text-success font-bold uppercase tracking-tighter">Verified Analyst</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Platform</p>
            <p className="text-sm text-white font-medium">Instagram Reels</p>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Duration</p>
            <p className="text-sm text-white font-medium">00:42.15</p>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Posting Time</p>
            <p className="text-sm text-white font-medium">18:30</p>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Posting Day</p>
            <p className="text-sm text-white font-medium">Monday</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Seasonality</p>
            <p className="text-sm text-white font-medium">Ramadan / Eid Season</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-success bg-success/10 px-3 py-2 rounded-xl border border-success/20">
        <CheckCircle size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Quality Standard Met</span>
      </div>
    </div>
  );
}
