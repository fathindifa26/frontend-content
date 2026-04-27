import { motion } from "motion/react";
import { CloudUpload, LayoutDashboard, Video } from "lucide-react";

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarItem({ icon: Icon, label, active = false, onClick }: SidebarItemProps) {
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

interface SidebarProps {
  activeTab: "dashboard" | "upload";
  setActiveTab: (tab: "dashboard" | "upload") => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 glass-panel border-y-0 border-l-0 sticky top-0 h-screen flex flex-col z-40">
      <div className="p-8 flex items-center space-x-3">
        <div className="p-2 bg-primary/20 rounded-xl border border-white/10 shadow-lg">
          <Video className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white lowercase italic">viralyn.ai</span>
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
  );
}
