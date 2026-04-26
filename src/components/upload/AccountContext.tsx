import { Users, Eye, Calendar, TrendingUp } from "lucide-react";

export function AccountContext() {
  return (
    <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-[32px] space-y-6">
       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Account Context</h3>
       <div className="space-y-4">
          {[
            { icon: Users, label: "Followers", value: "1.2M" },
            { icon: Eye, label: "Avg. Views", value: "450K" },
            { icon: Calendar, label: "Post Frequency", value: "4.2 / week" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/3 rounded-xl border border-white/5">
               <div className="flex items-center space-x-3 text-on-surface-variant">
                  <item.icon size={16} />
                  <span className="text-xs font-medium">{item.label}</span>
               </div>
               <span className="text-sm font-bold text-white">{item.value}</span>
            </div>
          ))}
       </div>
       <div className="p-4 bg-success/10 rounded-2xl border border-success/20 flex flex-col space-y-1">
          <p className="text-[10px] text-success font-bold uppercase tracking-widest">Growth Vector</p>
          <div className="flex items-center text-success space-x-2">
             <TrendingUp size={16} />
             <span className="text-sm font-bold">+12% vs last 30 days</span>
          </div>
       </div>
    </div>
  );
}
