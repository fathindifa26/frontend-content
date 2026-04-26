/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  HelpCircle, 
  Search, 
  Bell, 
  Settings, 
  CloudUpload, 
  Link as LinkIcon, 
  Upload, 
  Video, 
  Timer, 
  TrendingUp, 
  Eye, 
  Volume2, 
  BrainCircuit, 
  ChevronRight,
  Sparkles,
  ArrowRightLeft
} from "lucide-react";

// --- Components ---

function MetricGauge({ value, label, color = "tertiary" }: { value: number, label: string, color?: "tertiary" | "secondary" }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  
  const strokeColor = color === "tertiary" ? "text-tertiary" : "text-secondary";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle className="text-white/5" cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" strokeWidth="6" />
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={strokeColor}
            cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" 
            strokeDasharray={circumference} 
            strokeWidth="6" 
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-black tracking-tighter tabular-nums">{value}%</span>
      </div>
      <span className="text-[10px] text-on-surface-variant mt-2 text-center uppercase tracking-wider">{label}</span>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <motion.a 
      whileHover={{ x: 4 }}
      href="#" 
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        active 
          ? "bg-white/10 text-white font-semibold" 
          : "text-on-surface-variant hover:text-white"
      }`}
    >
      <Icon size={18} className={active ? "text-primary" : "text-on-surface-variant group-hover:text-white transition-colors"} />
      <span className="text-sm">{label}</span>
    </motion.a>
  );
}

// --- Main App ---

export default function App() {
  return (
    <div className="flex min-h-screen bg-transparent selection:bg-primary/30">
      <div className="mesh-bg" />
      
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-y-0 border-l-0 sticky top-0 h-screen flex flex-col z-40">
        <div className="p-8 flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-xl border border-white/10 shadow-lg">
            <BarChart3 className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">Lumina</span>
        </div>

        <div className="px-6 mt-4">
          <nav className="space-y-2">
            <SidebarItem icon={LayoutDashboard} label="Overview" active />
            <SidebarItem icon={BarChart3} label="Analytics" />
            <SidebarItem icon={FileText} label="Projects" />
            <SidebarItem icon={Bell} label="Messages" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>
        </div>

        <div className="mt-auto px-6 pb-8 space-y-6">
          <div className="p-4 bg-primary/20 rounded-2xl border border-white/10 text-[12px] leading-relaxed shadow-inner">
            Upgrade to <span className="font-bold text-white">Pro</span> for advanced team insights and custom workflows.
          </div>

          <div className="p-3 glass-card rounded-full flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 border border-white/20">
              <div className="w-full h-full rounded-full bg-background" />
            </div>
            <span className="text-sm font-medium text-white truncate">Alex Rivera</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">Welcome back, Alex</h2>
            <p className="text-sm text-on-surface-variant">Here is what is happening with your projects today.</p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm focus:outline-none focus:border-white/30 w-48 transition-all focus:w-64"
              />
            </div>
            <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary" />
              <span className="text-sm font-medium text-white">Alex Rivera</span>
            </div>
          </div>
        </header>

        <main className="px-10 pb-10 max-w-[1600px] w-full space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Active Users", value: "12,842", trend: "+14.5% this week", color: "text-success" },
              { label: "Avg. Engagement", value: "84.2%", trend: "+2.1% from last month", color: "text-success" },
              { label: "Cloud Usage", value: "64.8GB", trend: "Approaching limit", color: "text-error" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6">
                <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className={`text-[12px] mt-2 font-medium ${stat.color}`}>{stat.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Project Timeline (Formerly Upload) */}
            <section className="col-span-12 lg:col-span-8">
              <div className="glass-panel p-8 rounded-[32px] h-full">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-semibold text-white">Project Activity</h3>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-primary/20 text-white text-xs font-bold rounded-lg border border-white/10 hover:bg-primary/30 transition-all">Export</button>
                    <button className="px-4 py-2 bg-white text-background text-xs font-bold rounded-lg hover:brightness-90 transition-all shadow-xl shadow-white/5">New Task</button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { label: "Design new component library", due: "Due in 2 days", priority: "High", pColor: "bg-primary", pText: "text-primary-container", pBorder: "border-primary/30" },
                    { label: "Refactor authentication flow", due: "Due tomorrow", priority: "Critical", pColor: "bg-secondary", pText: "text-secondary/80", pBorder: "border-secondary/30" },
                    { label: "Prepare stakeholder presentation", due: "Due in 5 days", priority: "Medium", pColor: "bg-success", pText: "text-success/80", pBorder: "border-success/30" },
                    { label: "QA testing for build v2.4", due: "Due in 1 week", priority: "Low", pColor: "bg-white/20", pText: "text-white/60", pBorder: "border-white/10" },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group cursor-pointer hover:bg-white/3 px-2 rounded-xl transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${task.pColor} shadow-lg shadow-black/20`} />
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{task.label}</p>
                          <p className="text-[12px] text-on-surface-variant">{task.due}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-1.5 ${task.pColor}/20 ${task.pText} text-[11px] font-bold rounded-lg border ${task.pBorder}`}>
                        {task.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Side Widgets */}
            <aside className="col-span-12 lg:col-span-4 space-y-8">
              {/* Analytics Summary */}
              <div className="glass-panel p-8 rounded-[32px]">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 bg-secondary/20 rounded-xl">
                    <Eye size={20} className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">Intelligence</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <MetricGauge value={90} label="Retention" />
                  <MetricGauge value={64} label="Efficiency" color="secondary" />
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-xs text-on-surface-variant font-medium mb-4 uppercase tracking-[0.1em]">AI Insights</p>
                  <p className="text-sm leading-relaxed text-on-surface/80">
                    Your <span className="text-primary font-bold">Retention Rate</span> is exceptional. We recommend scaling cloud storage by <span className="font-bold">12%</span> to accommodate upcoming video datasets.
                  </p>
                </div>
              </div>

              {/* Action Box */}
              <div className="p-8 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-lg font-bold text-white mb-2">Priority Insights</h4>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">System audit complete. No critical vulnerabilities found in recent authentication refactor.</p>
                <button className="flex items-center text-xs font-bold text-white uppercase tracking-widest gap-2 group/btn hover:gap-4 transition-all">
                  View Full Audit
                  <ChevronRight size={14} />
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
