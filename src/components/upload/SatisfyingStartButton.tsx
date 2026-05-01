import { Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function SatisfyingStartButton() {
  const springConfig = { type: "spring", stiffness: 300, damping: 25, mass: 1 };

  return (
    <div className="flex justify-center pt-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.4 }}
        className="relative group"
      >
        {/* Animated Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-400 to-primary rounded-[32px] blur-xl opacity-20 group-hover:opacity-60 transition-all duration-1000 group-hover:duration-500 animate-pulse" />
        
        {/* The Rotating AI Gradient Border */}
        <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
          <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_20%,#f43f5e_30%,#fbbf24_45%,#4f46e5_60%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Button Content */}
        <button 
          className="relative px-16 py-5 bg-background/80 backdrop-blur-2xl border border-white/10 rounded-[30px] flex items-center space-x-3 group-hover:bg-white/5 transition-all duration-500"
        >
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse" />
             <Play size={18} className="text-white relative z-10 fill-white" />
          </div>
          
          <span className="text-lg font-bold text-white tracking-tight">Start Engine</span>
          
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

        {/* Bottom subtle reflection */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
      </motion.div>
    </div>
  );
}
