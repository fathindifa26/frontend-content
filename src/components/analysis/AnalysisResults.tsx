import { motion } from "motion/react";
import { Zap, Layout, Video } from "lucide-react";
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

  return (
    <div className="flex flex-col space-y-16 pt-12 pb-32">
      {/* Top Grid: Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {dummyResults.map((res, i) => (
          <ResultCard 
            key={res.title}
            title={res.title}
            icon={res.icon}
            theme={res.theme}
            score={res.score}
            points={res.points}
            delay={0.1 * (i + 1)} 
          />
        ))}
      </div>

      {/* Bottom Section: Carousel Recommendations */}
      <OptimizationRoadmap />

      {/* New Brief Section */}
      <NewBriefRecommendation />
    </div>
  );
}
