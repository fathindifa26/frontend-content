/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Search, 
  Bell, 
  CloudUpload, 
  Link as LinkIcon, 
  Upload, 
  Video, 
  TrendingUp, 
  Eye, 
  Volume2, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  Users,
  Calendar,
  CheckCircle
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

function SidebarItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <motion.button 
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        active 
          ? "bg-white/10 text-white font-semibold" 
          : "text-on-surface-variant hover:text-white"
      }`}
    >
      <Icon size={18} className={active ? "text-primary" : "text-on-surface-variant group-hover:text-white transition-colors"} />
      <span className="text-sm">{label}</span>
    </motion.button>
  );
}

function DashboardView() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <LayoutDashboard size={48} className="text-white/10 mx-auto" />
        <p className="text-on-surface-variant italic">Dashboard content will be displayed here.</p>
      </div>
    </div>
  );
}

function UploadView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Upload Header Section */}
      <div className="glass-panel p-10 rounded-[40px] flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-white/10">
          <CloudUpload className="text-primary" size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Upload Video for Intelligence Processing</h2>
          <p className="text-on-surface-variant max-w-md">Drag and drop MP4, MOV or AVI. Max file size 2GB.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
            <Upload size={18} />
            <span>Select File</span>
          </button>
          <button className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center space-x-2">
            <LinkIcon size={18} />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Metadata Card */}
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
            </div>
          </div>
          <div className="flex items-center space-x-2 text-success bg-success/10 px-3 py-2 rounded-xl border border-success/20">
            <CheckCircle size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Quality Standard Met</span>
          </div>
        </div>

        {/* Visual Timeline Card */}
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

          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Faces Detected</p>
              <p className="text-3xl font-bold text-white">02</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Text Overlays</p>
              <p className="text-3xl font-bold text-white">05</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Scene Intensity</p>
              <p className="text-3xl font-bold text-success">High</p>
            </div>
          </div>
        </div>

        {/* Audio Intelligence */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-[32px] space-y-6">
           <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Audio Intelligence</h3>
           <div className="p-4 bg-tertiary/20 rounded-2xl border border-tertiary/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <div className="p-1.5 bg-tertiary/20 rounded-lg">
                    <Volume2 size={16} className="text-tertiary" />
                 </div>
                 <span className="text-sm font-bold text-white">Trending Audio</span>
              </div>
              <span className="text-[10px] bg-tertiary text-white px-2.5 py-1 rounded-lg font-bold shadow-lg shadow-tertiary/20">Rank #4</span>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                 <span>Speech Clarity</span>
                 <span className="text-white">94%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]" 
                 />
              </div>
           </div>
           <div className="pt-2">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-2">Voice Sentiment</p>
              <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/5">
                 <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                 <p className="text-sm text-white font-medium">Confident & Energetic</p>
              </div>
           </div>
        </div>

        {/* Content Strategy */}
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

        {/* Account Context */}
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

        {/* Market Comparison */}
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
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload">("upload");

  return (
    <div className="flex min-h-screen bg-transparent selection:bg-primary/30">
      <div className="mesh-bg" />
      
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-y-0 border-l-0 sticky top-0 h-screen flex flex-col z-40">
        <div className="p-8 flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-xl border border-white/10 shadow-lg">
            <Video className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">Lumina</span>
        </div>

        <div className="px-6 mt-4">
          <nav className="space-y-2">
            <SidebarItem 
              icon={CloudUpload} 
              label="Upload Video" 
              active={activeTab === "upload"} 
              onClick={() => setActiveTab("upload")}
            />
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activeTab === "dashboard"} 
              onClick={() => setActiveTab("dashboard")}
            />
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
            <h2 className="text-2xl font-semibold text-white">
              {activeTab === "upload" ? "Video Intelligence" : "Dashboard Overview"}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {activeTab === "upload" ? "Analyze and optimize your video content." : "Your account and project summary."}
            </p>
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

        <main className="px-10 pb-10 max-w-[1600px] w-full">
          {activeTab === "upload" ? <UploadView /> : <DashboardView />}
        </main>
      </div>
    </div>
  );
}
