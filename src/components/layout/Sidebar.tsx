import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CloudUpload, LayoutDashboard, Video, ChevronRight } from "lucide-react";

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
  isExpanded: boolean;
  hasNotification?: boolean;
}

function SidebarItem({ icon: Icon, label, active = false, onClick, isExpanded, hasNotification }: SidebarItemProps) {
  return (
    <motion.button 
      whileHover={{ x: isExpanded ? 4 : 0 }}
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative ${
        active 
          ? "bg-white/10 text-white font-semibold" 
          : "text-on-surface-variant hover:text-white"
      } ${isExpanded ? "space-x-3" : "justify-center"}`}
    >
      <div className="relative">
        <Icon size={18} className={active ? "text-primary" : "text-on-surface-variant group-hover:text-white transition-colors"} />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-background animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
        )}
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-sm whitespace-nowrap overflow-hidden"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {!isExpanded && active && (
        <motion.div 
          layoutId="active-dot"
          className="absolute right-1 w-1 h-4 bg-primary rounded-full"
        />
      )}
    </motion.button>
  );
}

interface SidebarProps {
  activeTab: "dashboard" | "upload";
  setActiveTab: (tab: "dashboard" | "upload") => void;
  activeHighlights?: string[];
}

export function Sidebar({ activeTab, setActiveTab, activeHighlights = [] }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const hasUploadNotification = activeHighlights.some(h => ['Hook', 'Content', 'Production'].includes(h));

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isHovered ? 256 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel border-y-0 border-l-0 fixed top-0 left-0 h-screen flex flex-col z-[60] overflow-hidden shadow-2xl"
    >
      {/* Logo Section */}
      <div className={`p-6 flex items-center ${isHovered ? "space-x-3" : "justify-center"}`}>
        <div className="p-2 bg-primary/20 rounded-xl border border-white/10 shadow-lg shrink-0">
          <Video className="text-white" size={20} />
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl font-bold tracking-tight text-white lowercase italic whitespace-nowrap"
            >
              viralyn.ai
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="px-3 mt-4">
        <nav className="space-y-2">
          <SidebarItem 
            icon={CloudUpload} 
            label="Upload Video" 
            active={activeTab === "upload"} 
            onClick={() => setActiveTab("upload")}
            isExpanded={isHovered}
            hasNotification={hasUploadNotification}
          />
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")}
            isExpanded={isHovered}
          />
        </nav>
      </div>

      <div className="mt-auto px-4 pb-8 space-y-6">
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 bg-primary/20 rounded-2xl border border-white/10 text-[11px] leading-relaxed shadow-inner"
            >
              Upgrade to <span className="font-bold text-white">Pro</span> for advanced team insights.
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`p-3 glass-card rounded-2xl flex items-center ${isHovered ? "space-x-3" : "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 border border-white/20 shrink-0">
            <div className="w-full h-full rounded-full bg-background" />
          </div>
          {isHovered && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-medium text-white truncate"
            >
              Alex Rivera
            </motion.span>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
