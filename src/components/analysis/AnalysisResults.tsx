import { motion } from "motion/react";
import { Zap, Layout, Video } from "lucide-react";

interface ResultCardProps {
  title: string;
  icon: any;
  theme: "rose" | "blue" | "amber";
  delay: number;
}

function ResultCard({ title, icon: Icon, theme, delay }: ResultCardProps) {
  const themes = {
    rose: {
      base: "bg-rose-500/5 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)] text-rose-500",
      hover: "hover:border-rose-500/50 hover:shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:bg-rose-500/10"
    },
    blue: {
      base: "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(79,70,229,0.1)] text-primary",
      hover: "hover:border-primary/50 hover:shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:bg-primary/10"
    },
    amber: {
      base: "bg-amber-400/5 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)] text-amber-400",
      hover: "hover:border-amber-400/50 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:bg-amber-400/10"
    }
  };

  const currentTheme = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      className={`glass-panel p-8 rounded-[40px] min-h-[300px] flex flex-col items-center justify-center space-y-6 cursor-default transition-all duration-500 ${currentTheme.base} ${currentTheme.hover}`}
    >
      <div className={`p-4 rounded-3xl bg-white/5 border border-white/10 ${theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <div className="w-12 h-1 bg-white/5 rounded-full mx-auto" />
        <p className="text-[11px] text-white/40 font-medium italic">Detailed analysis coming soon</p>
      </div>
    </motion.div>
  );
}

export function AnalysisResults() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
      <ResultCard title="Hook" icon={Zap} theme="rose" delay={0.1} />
      <ResultCard title="Content" icon={Layout} theme="blue" delay={0.2} />
      <ResultCard title="Production" icon={Video} theme="amber" delay={0.3} />
    </div>
  );
}
