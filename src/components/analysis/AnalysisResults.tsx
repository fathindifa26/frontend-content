import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Layout, Video, ChevronRight, RefreshCw, Loader2 } from "lucide-react";
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
  isHighlighted?: boolean;
  onClearHighlight?: () => void;
  selectedIds?: string[];
  onToggleContext?: (context: { type: string, target: string, text?: string, index?: number }) => void;
  onRegenerate?: (component: string) => Promise<void>;
}

function ResultCard({ title, icon: Icon, theme, score, points, delay, isHighlighted, onClearHighlight, selectedIds = [], onToggleContext, onRegenerate }: ResultCardProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const handleRegenerate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onRegenerate) return;
    setIsRegenerating(true);
    try {
      await onRegenerate(title);
    } finally {
      setIsRegenerating(false);
    }
  };

  const themes = {
    rose: {
      base: "bg-rose-500/5 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)] text-rose-500",
      hover: "hover:border-rose-500/40 hover:shadow-[0_0_40px_rgba(244,63,94,0.2)] hover:bg-rose-500/10",
      glow: "ring-4 ring-rose-500/50 shadow-[0_0_60px_rgba(244,63,94,0.4)] bg-rose-500/20 border-rose-500/60 animate-pulse",
      selected: "border-rose-500 ring-2 ring-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.3)]"
    },
    blue: {
      base: "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(79,70,229,0.1)] text-primary",
      hover: "hover:border-primary/40 hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] hover:bg-primary/10",
      glow: "ring-4 ring-primary/50 shadow-[0_0_60px_rgba(79,70,229,0.4)] bg-primary/20 border-primary/60 animate-pulse",
      selected: "border-primary ring-2 ring-primary/30 shadow-[0_0_30px_rgba(79,70,229,0.3)]"
    },
    amber: {
      base: "bg-amber-400/5 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)] text-amber-400",
      hover: "hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:bg-amber-400/10",
      glow: "ring-4 ring-amber-400/50 shadow-[0_0_60px_rgba(251,191,36,0.4)] bg-amber-400/20 border-amber-400/60 animate-pulse",
      selected: "border-amber-400 ring-2 ring-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
    }
  };

  const currentTheme = themes[theme];
  const cardId = `component-${title}-`;
  const isSelected = selectedIds.includes(cardId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isHighlighted ? 1.02 : isSelected ? 1.01 : 1,
      }}
      whileHover={{ 
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      onClick={() => onToggleContext && onToggleContext({ type: 'component', target: title })}
      onMouseEnter={() => isHighlighted && onClearHighlight && onClearHighlight()}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      className={`glass-panel p-8 rounded-[40px] flex flex-col space-y-8 cursor-pointer transition-all duration-700 border min-h-[550px] group/card ${
        isHighlighted ? currentTheme.glow : isSelected ? currentTheme.selected : `${currentTheme.base} ${currentTheme.hover}`
      }`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'}`}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <p className="text-[11px] text-white/30 font-bold uppercase tracking-wider">Analysis Result</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
            >
              {isRegenerating ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <RefreshCw size={12} />
              )}
              <span>Regenerate</span>
            </button>
            <span className={`text-3xl font-black italic tracking-tighter ${theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'}`}>
              {(score * 10).toFixed(1)}
            </span>
          </div>
          <span className="text-[9px] text-white/20 font-bold -mt-1 uppercase">Avg Score</span>
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* Points List */}
      <div className="flex flex-col space-y-4 flex-1 overflow-y-auto max-h-[500px] pr-1 custom-scrollbar">
        {points.map((point, idx) => {
          const pointId = `point-${title}-idx${idx}-${point.text}`;
          const isPointSelected = selectedIds.includes(pointId);
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 5 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleContext && onToggleContext({ type: 'point', target: title, text: point.text, index: idx });
              }}
              transition={{ delay: delay + (idx * 0.1) }}
              className={`p-4 rounded-[20px] border glass-panel transition-all duration-300 cursor-pointer group/point ${
                isPointSelected 
                  ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
                  : point.type === "strength" 
                    ? "bg-success/5 border-success/20 hover:bg-success/10" 
                    : "bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  isPointSelected ? "bg-primary animate-pulse" : point.type === "strength" ? "bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                }`} />
                <p className={`text-[14px] font-medium leading-relaxed ${
                  isPointSelected ? "text-white" : point.type === "strength" ? "text-success/90 group-hover/point:text-success" : "text-rose-500/90 group-hover/point:text-rose-500"
                }`}>
                  {point.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function AnalysisResults({ 
  results: externalResults, 
  roadmap: externalRoadmap,
  activeHighlights = [],
  removeHighlight,
  selectedContexts = [],
  toggleContext,
  persistedBriefs: externalBriefs = [],
  setPersistedBriefs,
  onDataUpdate
}: { 
  results?: any[], 
  roadmap?: any[],
  activeHighlights?: string[],
  removeHighlight?: (component: string) => void,
  selectedContexts?: { id: string, type: string, target: string, text?: string, index?: number }[],
  toggleContext?: (context: { type: string, target: string, text?: string, index?: number }) => void,
  persistedBriefs?: any[],
  setPersistedBriefs?: (briefs: any[]) => void,
  onDataUpdate?: () => void
}) {
  const [activeSection, setActiveSection] = useState<"results" | "roadmap" | "brief">("results");
  const [isViewAll, setIsViewAll] = useState(false);
  
  // Persisted state for New Briefs
  const generatedBriefs = externalBriefs;
  const setGeneratedBriefs = setPersistedBriefs || (() => {});
  const [briefsView, setBriefsView] = useState<"selection" | "loading" | "result">("selection");

  const handleRegenerateAnalysis = async (component: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/analysis/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ component })
      });
      if (response.ok) {
        if (onDataUpdate) onDataUpdate();
      }
    } catch (error) {
      console.error("Failed to regenerate analysis:", error);
    }
  };

  const selectedIds = selectedContexts.map(c => c.id);

  const showAll = () => {
    setIsViewAll(true);
  };

  const closeViewAll = () => {
    setIsViewAll(false);
  };

  const defaultResults = [
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

  // Map icons and themes to external results if they exist
  const results = externalResults ? externalResults.map(res => {
    const defaultMatch = defaultResults.find(d => d.title === res.title) || defaultResults[0];
    return {
      ...res,
      icon: defaultMatch.icon,
      theme: defaultMatch.theme
    };
  }) : defaultResults;

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
          {results.map((res: any) => (
            <ResultCard 
              key={res.title} 
              {...res} 
              delay={0.1} 
              isHighlighted={activeHighlights.includes(res.title)}
              onClearHighlight={() => removeHighlight && removeHighlight(res.title)}
              selectedIds={selectedIds}
              onToggleContext={toggleContext}
              onRegenerate={handleRegenerateAnalysis}
            />
          ))}
        </div>
        <OptimizationRoadmap data={externalRoadmap} selectedIds={selectedIds} onToggleContext={toggleContext} onDataUpdate={onDataUpdate} />
        <NewBriefRecommendation 
          analysisResults={results} 
          persistedBriefs={generatedBriefs}
          setPersistedBriefs={setGeneratedBriefs}
          persistedView={briefsView}
          setPersistedView={setBriefsView}
          onDataUpdate={onDataUpdate}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-12 pb-48 min-h-[800px]">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12 px-4">
        <div className="relative flex items-center bg-white/[0.03] backdrop-blur-2xl p-1.5 rounded-[24px] border border-white/5 shadow-2xl">
          {sections.map((s, i) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id as any)}
                className={`relative px-8 py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 z-10 ${
                  isActive ? "text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-tab"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-[18px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-[18px]" />
                  </motion.div>
                )}
                <span className="relative z-20 flex items-center space-x-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${
                    isActive ? "border-primary bg-primary/20 text-primary" : "border-white/10 text-white/20"
                  }`}>
                    {i + 1}
                  </span>
                  <span>{s.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button 
          onClick={showAll}
          className="group flex items-center space-x-3 px-6 py-3 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
        >
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">Switch View</span>
            <span className="text-[11px] font-bold text-white/40 group-hover:text-white transition-colors">Show Full Report</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
            <Layout size={14} className="text-white/20 group-hover:text-primary transition-colors" />
          </div>
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
                {results.map((res: any, i: number) => (
                  <ResultCard 
                    key={res.title}
                    {...res}
                    delay={0.1 * (i + 1)} 
                    isHighlighted={activeHighlights.includes(res.title)}
                    onClearHighlight={() => removeHighlight && removeHighlight(res.title)}
                    selectedIds={selectedIds}
                    onToggleContext={toggleContext}
                    onRegenerate={handleRegenerateAnalysis}
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
              <OptimizationRoadmap data={externalRoadmap} selectedIds={selectedIds} onToggleContext={toggleContext} onDataUpdate={onDataUpdate} />
              
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
              key="brief-section"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <NewBriefRecommendation 
                analysisResults={results} 
                persistedBriefs={generatedBriefs}
                setPersistedBriefs={setGeneratedBriefs}
                persistedView={briefsView}
                setPersistedView={setBriefsView}
                selectedIds={selectedIds}
                onToggleContext={toggleContext}
                onDataUpdate={onDataUpdate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
