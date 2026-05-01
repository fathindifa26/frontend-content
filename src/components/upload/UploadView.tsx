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
  analysisData: any[] | null;
  setAnalysisData: (data: any[] | null) => void;
  roadmapData: any[] | null;
  setRoadmapData: (data: any[] | null) => void;
  highlightedComponent?: string | null;
}

type LogStatus = "pending" | "current" | "completed";
interface LogEntry {
  id: string;
  message: string;
  status: LogStatus;
}

export function UploadView({ 
  onUpload, 
  onUrlSubmit, 
  isAnalyzing,
  analysisData,
  setAnalysisData,
  roadmapData,
  setRoadmapData,
  highlightedComponent
}: UploadViewProps) {
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

    const timer = setTimeout(async () => {
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
        // Fetch real data from backend - Trigger FRESH analysis
        try {
          const response = await fetch("http://localhost:8000/api/analysis/generate");
          const data = await response.json();
          if (data.results) {
            setAnalysisData(data.results);
          }
          if (data.roadmap) {
            setRoadmapData(data.roadmap);
          }
        } catch (error) {
          console.error("Failed to fetch analysis data:", error);
        }

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

  const springConfig = { type: "spring", stiffness: 300, damping: 30, mass: 1 } as const;

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
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.005, 
                boxShadow: "0 0 40px rgba(99, 102, 241, 0.12)",
                borderColor: "rgba(255, 255, 255, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="rounded-[48px] overflow-hidden border border-transparent transition-all duration-300"
            >
              <UploadHeader 
                onUpload={onUpload} 
                onUrlSubmit={onUrlSubmit}
                isAnalyzing={isAnalyzing} 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.005, 
                boxShadow: "0 0 40px rgba(99, 102, 241, 0.12)",
                borderColor: "rgba(255, 255, 255, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
              className="rounded-[40px] overflow-hidden border border-transparent transition-all duration-300 max-w-lg mx-auto w-full"
            >
              <BenchmarkConfig />
            </motion.div>
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
        {showResults && (
          <AnalysisResults 
            results={analysisData || undefined} 
            roadmap={roadmapData || undefined} 
            highlightedComponent={highlightedComponent}
          />
        )}
      </AnimatePresence>

      {!isProcessing && !showResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.6 }}
          className="mt-4 flex justify-center pb-12"
        >
          <SatisfyingStartButton 
            isProcessing={false} 
            onClick={handleStart} 
          />
        </motion.div>
      )}
    </div>
  );
}
