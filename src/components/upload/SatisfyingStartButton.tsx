import { Play, Sparkles, Loader2, Square, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface SatisfyingStartButtonProps {
  isProcessing: boolean;
  isFinished?: boolean;
  onClick: () => void;
  onStop?: () => void;
}

export function SatisfyingStartButton({ isProcessing, isFinished, onClick, onStop }: SatisfyingStartButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const springConfig = { type: "spring", stiffness: 400, damping: 30, mass: 1 };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layoutId="start-action"
        transition={springConfig}
        className="relative group pointer-events-auto z-20"
      >
        {/* Animated Outer Glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r rounded-[32px] blur-xl opacity-20 group-hover:opacity-60 transition-all duration-1000 group-hover:duration-500 ${
          isFinished ? "from-success to-primary animate-pulse" : "from-rose-500 via-amber-400 to-primary"
        } ${isProcessing ? "animate-pulse" : ""}`} />
        
        {/* The Rotating AI Gradient Border */}
        <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
          <div className={`absolute inset-[-200%] animate-[spin_4s_linear_infinite] opacity-100 ${
            isFinished 
              ? "bg-[conic-gradient(from_0deg,transparent_20%,#4ade80_30%,#4f46e5_60%,transparent_70%)]" 
              : "bg-[conic-gradient(from_0deg,transparent_20%,#f43f5e_30%,#fbbf24_45%,#4f46e5_60%,transparent_70%)]"
          }`} />
        </div>

        {/* Button Content */}
        <button 
          onClick={!isProcessing && !isFinished ? onClick : undefined}
          disabled={isProcessing || isFinished}
          className={`relative min-w-[220px] px-10 py-3.5 backdrop-blur-3xl border rounded-[30px] flex items-center justify-center space-x-3 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ${
            isFinished 
              ? "bg-success/10 border-success/30 text-success" 
              : "bg-white/5 border-white/10 text-white"
          } ${!isProcessing && !isFinished ? "hover:bg-white/10" : "cursor-default"}`}
        >
          <div className="relative">
             <div className={`absolute inset-0 blur-md rounded-full ${
               isFinished ? "bg-success/20" : "bg-primary/20"
             } ${isProcessing ? "animate-ping" : "animate-pulse"}`} />
             {isFinished ? (
               <CheckCircle2 size={18} className="text-success relative z-10" />
             ) : isProcessing ? (
               <Loader2 size={18} className="text-white relative z-10 animate-spin" />
             ) : (
               <Play size={18} className="text-white relative z-10 fill-white" />
             )}
          </div>
          
          <span className="text-[15px] font-bold tracking-tight">
            {isFinished ? "Finished" : isProcessing ? "Processing..." : "Start Engine"}
          </span>
          
          {!isProcessing && !isFinished && (
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
          )}
        </button>
      </motion.div>

      {/* Stop Button - Appears on Hover during Processing */}
      <AnimatePresence>
        {isProcessing && isHovered && !isFinished && (
          <motion.button
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 8, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            onClick={onStop}
            className="ml-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 backdrop-blur-xl border border-rose-500/30 rounded-[16px] flex items-center space-x-2 text-rose-500 transition-all duration-300 shadow-lg shadow-rose-500/10 z-10"
          >
            <Square size={12} className="fill-rose-500" />
            <span className="text-[11px] font-bold">Stop</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
