import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenTool, Sparkles, ChevronLeft, ChevronRight, FileText } from "lucide-react";

function BriefCard({ index, total, title, hook, story }: { key?: any; index: number; total: number; title: string; hook: string; story: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.02] relative overflow-hidden flex flex-col space-y-8 min-h-[550px]"
    >
      {/* Background Icon */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] text-white">
        <PenTool size={240} />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileText size={28} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-[0.2em]">Generated Script Concept</span>
            <h3 className="text-3xl font-black text-white tracking-tighter">{title}</h3>
          </div>
        </div>
        
        <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          <span className="text-[11px] font-bold text-white/40 tracking-widest">
            {index + 1} <span className="text-white/10 mx-1">/</span> {total}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 relative z-10 flex-1">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-rose-400/80">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500/60">The Hook Strategy</span>
          </div>
          <p className="text-2xl font-black text-white/95 leading-[1.1] tracking-tight">
            "{hook}"
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-px w-8 bg-indigo-500/30" />
            <span className="text-[10px] font-black text-indigo-400/50 uppercase tracking-widest">Full Storyline & Core Value</span>
          </div>
          <p className="text-[15px] text-white/60 leading-relaxed font-medium">
            {story}
          </p>
        </div>

        <div className="pt-10 mt-auto flex justify-center">
          <div className="relative group">
            {/* Animated Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-400 to-primary rounded-[32px] blur-xl opacity-20 group-hover:opacity-60 transition-all duration-1000 group-hover:duration-500" />
            
            {/* The Rotating AI Gradient Border */}
            <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
              <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] opacity-100 bg-[conic-gradient(from_0deg,transparent_20%,#f43f5e_30%,#fbbf24_45%,#4f46e5_60%,transparent_70%)]" />
            </div>

            {/* Button Content */}
            <button className="relative min-w-[280px] px-10 py-3.5 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[30px] flex items-center justify-center space-x-3 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] hover:bg-white/10 group">
              <div className="relative">
                <div className="absolute inset-0 blur-md rounded-full bg-primary/20 animate-pulse" />
                <Sparkles size={18} className="text-white relative z-10 animate-pulse" />
              </div>
              
              <span className="text-[15px] font-bold text-white tracking-tight">
                Generate Full AI Prompt
              </span>
              
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1.2, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={16} className="text-amber-400" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NewBriefRecommendation() {
  const [current, setCurrent] = useState(0);

  const briefs = [
    {
      title: "The Silent Transformation",
      hook: "Stop scrolling if you're still doing your skincare like it's 2015.",
      story: "This concept centers on 'Product ASMR' and extreme visual clarity. The video starts in total silence for the first 5 seconds—just the sound of a premium glass bottle clicking open and the rich, thick texture of the cream being applied to skin in macro-detail. No talking, no music. Then, a sharp pattern-interrupt transition hits with a vibrant lo-fi beat. We see a split-screen of the user's skin: 'Before' (dull, textured) and 'After' (glowing, hydrated). The core value is demonstrating results through high-fidelity visual evidence rather than verbal claims, building trust through cinematic production quality."
    },
    {
      title: "The Expert Deep-Dive",
      hook: "I analyzed 100 top-performing ads and found one common secret.",
      story: "Establish immediate authority by positioning the creator as an analyst. Use a dynamic 'Data Overlay' effect where charts and engagement metrics float in the background as you speak directly to the camera. The narrative follows a 'Mystery -> Discovery' arc: why do most products fail where this one succeeds? Use a green screen to 'step inside' the product's ingredient list, explaining the science in a simplified, visually-engaging way. This script targets logic-driven buyers who appreciate transparency and technical depth, wrapping the sales message in an educational documentary style."
    },
    {
      title: "The Relatable Struggle",
      hook: "That feeling when you spend 2 hours on something that should take 5 minutes...",
      story: "This brief leverages the 'Pain-Point Empathy' framework. Start with a chaotic, handheld shot of a common morning frustration—messy, unorganized, and stressful. The lighting should be natural and slightly 'unfiltered' to maintain authenticity. The turning point happens when the product is introduced as a 'Secret Weapon'—the camera stabilizes, the lighting warms up, and the music shifts from frantic to calm. We show the 5-minute solution in real-time, emphasizing ease of use and mental clarity. It's not just about the product; it's about reclaiming your time and peace of mind."
    }
  ];

  const next = () => setCurrent((c) => (c + 1) % briefs.length);
  const prev = () => setCurrent((c) => (c - 1 + briefs.length) % briefs.length);

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full pt-12">
      <div className="flex items-center justify-between px-4">
        <div className="flex flex-col">
          <h4 className="text-xl font-bold text-white tracking-tight">New Brief Recommendations</h4>
          <p className="text-[11px] text-white/30 font-medium">Creative directions for your next masterpiece</p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <BriefCard 
          key={current}
          index={current}
          total={briefs.length}
          title={briefs[current].title}
          hook={briefs[current].hook}
          story={briefs[current].story}
        />
      </AnimatePresence>

      <div className="flex justify-center space-x-2">
        {briefs.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === i ? 'w-10 bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
