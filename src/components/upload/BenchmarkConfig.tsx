import { Users, Link as LinkIcon, Info, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function BenchmarkConfig() {
  const [mode, setMode] = useState<"none" | "usernames" | "urls">("none");

  const springConfig = { type: "spring", stiffness: 300, damping: 25, mass: 1 };

  return (
    <motion.div 
      layout
      transition={springConfig}
      className={`glass-panel p-8 rounded-[40px] mx-auto relative overflow-hidden transition-all duration-500 ease-in-out ${
        mode === "none" 
          ? "w-full max-w-lg min-h-[200px] flex flex-col items-center justify-center text-center border-white/5 bg-white/[0.02]" 
          : mode === "usernames"
            ? "w-full max-w-[1200px] min-h-[300px] bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]"
            : "w-full max-w-[1200px] min-h-[300px] bg-amber-400/5 border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)]"
      }`}
    >
      <AnimatePresence mode="wait">
        {mode === "none" ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfig}
            className="space-y-6 max-w-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-[0.3em]">Benchmark Configuration</h3>
                <Info size={16} className="text-white/20" />
              </div>
              <p className="text-xs text-white/40 font-medium italic">
                Define the competitive set for market-aware insights. 
                Select a mode to begin.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <button 
                onClick={() => setMode("usernames")}
                className="group flex flex-col items-center space-y-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 w-32"
              >
                <div className="p-2.5 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <Users size={20} className="text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-white/40 tracking-wide group-hover:text-white">Usernames</span>
              </button>

              <button 
                onClick={() => setMode("urls")}
                className="group flex flex-col items-center space-y-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-amber-400/20 hover:border-amber-400/50 transition-all duration-500 w-32"
              >
                <div className="p-2.5 bg-white/5 rounded-2xl group-hover:bg-amber-400/20 transition-colors">
                  <LinkIcon size={20} className="text-white/40 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-white/40 tracking-wide group-hover:text-white">Video URLs</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full flex flex-col"
          >
            {/* Top Bar with Mode Switcher */}
            <div className="flex items-center justify-between mb-8">
              <motion.div 
                layoutId="toggle"
                transition={springConfig}
                className="flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/5 relative"
              >
                <div 
                  className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl transition-all duration-500 ease-out z-0 ${
                    mode === "usernames" 
                      ? "left-1.5 bg-primary/20 border border-primary/30" 
                      : "left-[calc(50%+1.5px)] bg-amber-400/20 border border-amber-400/30"
                  }`}
                />
                
                <button 
                  onClick={() => setMode("usernames")}
                  className={`relative z-10 flex items-center space-x-2 px-6 py-2 transition-all duration-500 ${
                    mode === "usernames" ? "text-white" : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <Users size={14} />
                  <span className="text-[11px] font-bold">Usernames</span>
                </button>

                <button 
                  onClick={() => setMode("urls")}
                  className={`relative z-10 flex items-center space-x-2 px-6 py-2 transition-all duration-500 ${
                    mode === "urls" ? "text-white" : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <LinkIcon size={14} />
                  <span className="text-[11px] font-bold">URLs</span>
                </button>
              </motion.div>

              <button 
                onClick={() => setMode("none")}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors group"
              >
                <ChevronLeft size={20} className="text-white/20 group-hover:text-white" />
              </button>
            </div>

            {/* Middle Content Placeholder */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] bg-white/[0.01]"
            >
              <div className="text-center space-y-2">
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">Input Area</p>
                <p className="text-white/40 text-xs italic">Section for entering {mode} will be here</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
