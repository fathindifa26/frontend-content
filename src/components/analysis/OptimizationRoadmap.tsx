import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wand2, Lightbulb, Sparkles } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  theme: "rose" | "blue" | "amber";
  points: string[];
  delay: number;
}

function RecommendationCard({ title, theme, points, delay }: RecommendationCardProps) {
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

export function OptimizationRoadmap() {
  const [activeRec, setActiveRec] = useState(0);

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
  );
}
