import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadHeader } from "./UploadHeader";
import { BenchmarkConfig } from "./BenchmarkConfig";
import { SatisfyingStartButton } from "./SatisfyingStartButton";
import { ProcessingLogs } from "./ProcessingLogs";

interface UploadViewProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isAnalyzing: boolean;
}

type LogStatus = "pending" | "current" | "completed";
interface LogEntry {
  id: string;
  message: string;
  status: LogStatus;
}

export function UploadView({ onUpload, onUrlSubmit, isAnalyzing }: UploadViewProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const handleStart = () => {
    setIsProcessing(true);
    setLogs([
      { id: "1", message: "Downloading video...", status: "current" }
    ]);
  };

  useEffect(() => {
    if (!isProcessing || isFinished) return;

    const timer = setTimeout(() => {
      if (logs.length === 1) {
        setLogs([
          { id: "1", message: "Video downloaded.", status: "completed" },
          { id: "2", message: "Analyzing content with AI...", status: "current" }
        ]);
      } else if (logs.length === 2) {
        setLogs([
          { id: "1", message: "Video downloaded.", status: "completed" },
          { id: "2", message: "AI Analysis complete.", status: "completed" },
          { id: "3", message: "Finalizing results...", status: "current" }
        ]);
      } else if (logs.length === 3) {
        setLogs(prev => prev.map((l, i) => i === 2 ? { ...l, status: "completed" as const } : l));
        setIsFinished(true);
        
        // Wait 1.5s before showing results
        setTimeout(() => {
          setShowResults(true);
        }, 1500);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isProcessing, logs, isFinished]);

  const springConfig = { type: "spring", stiffness: 300, damping: 30, mass: 1 };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <AnimatePresence mode="wait">
        {!isProcessing && !showResults && (
          <motion.div 
            key="upload-content"
            exit={{ y: -500, opacity: 0, scale: 0.9 }}
            transition={springConfig}
            className="space-y-8"
          >
            <UploadHeader 
              onUpload={onUpload} 
              onUrlSubmit={onUrlSubmit}
              isAnalyzing={isAnalyzing} 
            />

            <BenchmarkConfig />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProcessing && !showResults && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -500, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed top-24 left-72 z-50 flex flex-col"
          >
            <SatisfyingStartButton 
              isProcessing={!isFinished} 
              isFinished={isFinished}
              onClick={() => {}} 
              onStop={() => {
                setIsProcessing(false);
                setLogs([]);
              }}
            />
            <ProcessingLogs logs={logs} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results View (3 Empty Cards) */}
      <AnimatePresence>
        {showResults && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel h-64 rounded-[32px] border-white/5 bg-white/[0.02] flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 mx-auto animate-pulse" />
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Card {i}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!isProcessing && !showResults && (
        <div className="mt-4 flex justify-center pb-12">
          <SatisfyingStartButton 
            isProcessing={false} 
            onClick={handleStart} 
          />
        </div>
      )}
    </div>
  );
}
