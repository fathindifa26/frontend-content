import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadHeader } from "./UploadHeader";
import { BenchmarkConfig } from "./BenchmarkConfig";
import { SatisfyingStartButton } from "./SatisfyingStartButton";
import { ProcessingLogs } from "./ProcessingLogs";

import { AnalysisResults } from "../analysis/AnalysisResults";

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
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              filter: "blur(20px)",
              transition: { duration: 1.2, ease: "easeInOut" } 
            }}
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

      {/* Results View */}
      <AnimatePresence>
        {showResults && <AnalysisResults />}
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
