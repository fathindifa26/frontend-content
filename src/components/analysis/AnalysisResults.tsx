import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Layout, Video, ChevronRight } from "lucide-react";
import { OptimizationRoadmap } from "./OptimizationRoadmap";
import { NewBriefRecommendation } from "./NewBriefRecommendation";

interface Point {
  text: string;
  type: "strength" | "weakness";
}

interface ResultCardProps {
  key?: string | number;
  title: string;
  icon: any;
  theme: "rose" | "blue" | "amber";
  score: number;
  points: Point[];
  delay: number;
}

function ResultCard({ title, icon: Icon, theme, score, points, delay }: ResultCardProps) {
  const themes = {
    rose: {
      base: "bg-rose-500/5 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)] text-rose-500",
      hover: "hover:border-rose-500/40 hover:shadow-[0_0_40px_rgba(244,63,94,0.2)] hover:bg-rose-500/10"
    },
    blue: {
      base: "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(79,70,229,0.1)] text-primary",
      hover: "hover:border-primary/40 hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] hover:bg-primary/10"
    },
    amber: {
      base: "bg-amber-400/5 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)] text-amber-400",
      hover: "hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:bg-amber-400/10"
    }
  };

  const currentTheme = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      className={`glass-panel p-6 rounded-[40px] flex flex-col space-y-6 cursor-default transition-all duration-500 border ${currentTheme.base} ${currentTheme.hover}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'}`}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Analysis Result</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className={`text-2xl font-black italic tracking-tighter ${theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'}`}>
            {(score * 10).toFixed(1)}
          </span>
          <span className="text-[8px] text-white/20 font-bold -mt-1 uppercase">Avg Score</span>
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* Points List */}
      <div className="flex flex-col space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-1 custom-scrollbar">
        {points.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + (idx * 0.1) }}
            className={`p-4 rounded-[20px] border glass-panel transition-all duration-300 ${
              point.type === "strength" 
                ? "bg-success/5 border-success/20 hover:bg-success/10" 
                : "bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                point.type === "strength" ? "bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
              }`} />
              <p className={`text-[12px] font-medium leading-relaxed ${
                point.type === "strength" ? "text-success/90" : "text-rose-500/90"
              }`}>
                {point.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function AnalysisResults() {
  const [activeSection, setActiveSection] = useState<"results" | "roadmap" | "brief">("results");
  const [isViewAll, setIsViewAll] = useState(false);

  const showAll = () => {
    setIsViewAll(true);
  };

  const closeViewAll = () => {
    setIsViewAll(false);
  };

  const dummyResults = [
    {
      title: "Hook",
      icon: Zap,
      theme: "rose" as const,
      score: 0.85,
      points: [
        { text: "Strong visual opening with high contrast colors.", type: "strength" as const },
        { text: "Immediate address of the core audience pain point.", type: "strength" as const },
        { text: "Text overlay is slightly too small for mobile viewers.", type: "weakness" as const }
      ]
    },
    {
      title: "Content",
      icon: Layout,
      theme: "blue" as const,
      score: 0.72,
      points: [
        { text: "Clear and logical flow of information.", type: "strength" as const },
        { text: "Engagement spikes during the demonstration phase.", type: "strength" as const },
        { text: "The mid-roll transition feels a bit abrupt.", type: "weakness" as const },
        { text: "Voiceover volume is inconsistent in the middle.", type: "weakness" as const }
      ]
    },
    {
      title: "Production",
      icon: Video,
      theme: "amber" as const,
      score: 0.91,
      points: [
        { text: "Exceptional lighting and camera work.", type: "strength" as const },
        { text: "High-quality color grading that matches the brand.", type: "strength" as const },
        { text: "Background music is well-balanced with the VO.", type: "strength" as const }
      ]
    }
  ];

  const sections = [
    { id: "results", label: "Analysis Results" },
    { id: "roadmap", label: "Optimization Roadmap" },
    { id: "brief", label: "New Brief" }
  ];

  if (isViewAll) {
    return (
      <div className="flex flex-col space-y-24 pt-12 pb-48">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-black text-white tracking-tighter">Full Analysis Report</h2>
          <button 
            onClick={closeViewAll}
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all"
          >
            Back to Focus Mode
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dummyResults.map((res) => (
            <ResultCard key={res.title} {...res} delay={0.1} />
          ))}
        </div>
        <OptimizationRoadmap />
        <NewBriefRecommendation />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-12 pb-48 min-h-[800px]">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12 px-4">
        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-2xl border border-white/5">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeSection === s.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-white/20 hover:text-white/40"
              }`}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>

        <button 
          onClick={showAll}
          className="text-[10px] font-bold text-white/10 hover:text-primary transition-colors uppercase tracking-widest"
        >
          View All
        </button>
      </div>

      {/* Focus Area */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          {activeSection === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {dummyResults.map((res, i) => (
                  <ResultCard 
                    key={res.title}
                    {...res}
                    delay={0.1 * (i + 1)} 
                  />
                ))}
              </div>
              
              <div className="flex justify-center pt-12">
                <button 
                  onClick={() => setActiveSection("roadmap")}
                  className="glass-panel px-10 py-5 rounded-[24px] border-white/10 hover:bg-white/5 transition-all group flex items-center space-x-4"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Next Step</span>
                    <span className="text-lg font-black text-white tracking-tight">Optimization Roadmap</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={20} className="text-primary" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === "roadmap" && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-12"
            >
              <OptimizationRoadmap />
              
              <div className="flex justify-center pt-12">
                <button 
                  onClick={() => setActiveSection("brief")}
                  className="glass-panel px-10 py-5 rounded-[24px] border-white/10 hover:bg-white/5 transition-all group flex items-center space-x-4"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Next Step</span>
                    <span className="text-lg font-black text-white tracking-tight">New Brief Strategy</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={20} className="text-indigo-400" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === "brief" && (
            <motion.div
              key="brief"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <NewBriefRecommendation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
