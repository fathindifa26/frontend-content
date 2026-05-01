import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Layout, Video, Lightbulb, Sparkles, Wand2 } from "lucide-react";

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

function RecommendationCard({ title, theme, points, delay }: { title: string; theme: "rose" | "blue" | "amber"; points: string[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-panel p-10 rounded-[48px] border flex flex-col space-y-8 w-full min-h-[400px] relative overflow-hidden ${
        theme === 'rose' 
          ? 'bg-rose-500/5 border-rose-500/10' 
          : theme === 'blue' 
            ? 'bg-primary/5 border-primary/10' 
            : 'bg-amber-400/5 border-amber-400/10'
      }`}
    >
      {/* Background Decorative Sparkle */}
      <div className={`absolute top-0 right-0 p-12 opacity-5 ${
        theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'
      }`}>
        <Sparkles size={120} />
      </div>

      <div className="flex items-center space-x-4 relative z-10">
        <div className={`p-4 rounded-3xl bg-white/5 border border-white/10 ${
          theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'
        }`}>
          <Wand2 size={32} strokeWidth={1.5} />
        </div>
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
            theme === 'rose' ? 'text-rose-500/60' : theme === 'blue' ? 'text-primary/60' : 'text-amber-400/60'
          }`}> Roadmap for improvement</span>
          <h3 className="text-3xl font-black text-white tracking-tighter">{title} Optimization</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + (i * 0.1) }}
            className="p-5 rounded-[24px] bg-white/[0.03] border border-white/5 flex items-start space-x-4 hover:bg-white/[0.06] transition-all group"
          >
            <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors ${
              theme === 'rose' ? 'text-rose-500' : theme === 'blue' ? 'text-primary' : 'text-amber-400'
            }`}>
              <Lightbulb size={16} />
            </div>
            <p className="text-[13px] text-white/70 font-medium leading-relaxed">
              {point}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function AnalysisResults() {
  const [activeRec, setActiveRec] = useState(0);

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

  const recommendations = [
    { 
      title: "Hook", 
      theme: "rose" as const, 
      points: [
        "Use a faster cut in the first 2 seconds to match the high-tempo background music.",
        "Add a progress bar at the top to give viewers a visual cue of the video duration.",
        "Increase the size of the initial text hook by at least 20% for better mobile readability.",
        "Ensure the most colorful visual element is centered in the first frame."
      ]
    },
    { 
      title: "Content", 
      theme: "blue" as const, 
      points: [
        "Clarify the transition between the 'Problem' and 'Solution' phases with a distinct sound effect.",
        "Include a 'Save for later' call-to-action midway through the content.",
        "Use more pattern interrupts (zooms, text pops) during longer talking segments.",
        "Synthesize the core message into a 3-point summary card at the 45-second mark."
      ]
    },
    { 
      title: "Production", 
      theme: "amber" as const, 
      points: [
        "Dip background audio level by an additional 5dB during critical educational segments.",
        "Apply a subtle vignette effect to draw focus towards the subject in low-light scenes.",
        "Use a high-pass filter on the voiceover to remove low-end rumble from the recording.",
        "Standardize font weights across all text overlays to maintain brand consistency."
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
      <div className="space-y-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white tracking-tight">Optimization Roadmap</h4>
            <p className="text-[11px] text-white/30 font-medium">Strategic improvements based on AI analysis</p>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
            {recommendations.map((rec, i) => (
              <button
                key={i}
                onClick={() => setActiveRec(i)}
                className={`px-4 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                  activeRec === i 
                    ? rec.theme === 'rose' ? 'bg-rose-500 text-white' : rec.theme === 'blue' ? 'bg-primary text-white' : 'bg-amber-400 text-amber-950'
                    : 'text-white/30 hover:text-white/50'
                }`}
              >
                {rec.title}
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRec}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <RecommendationCard 
              title={recommendations[activeRec].title}
              theme={recommendations[activeRec].theme}
              points={recommendations[activeRec].points}
              delay={0.2}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center space-x-2 pt-2">
          {recommendations.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                activeRec === i ? 'w-8 bg-white/40' : 'w-2 bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
