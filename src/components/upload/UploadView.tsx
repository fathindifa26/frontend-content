import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadHeader } from "./UploadHeader";
import { BenchmarkConfig } from "./BenchmarkConfig";
import { SatisfyingStartButton } from "./SatisfyingStartButton";

interface UploadViewProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isAnalyzing: boolean;
}

export function UploadView({ onUpload, onUrlSubmit, isAnalyzing }: UploadViewProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStart = () => {
    setIsProcessing(true);
  };

  const springConfig = { type: "spring", stiffness: 300, damping: 30, mass: 1 };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <AnimatePresence mode="wait">
        {!isProcessing && (
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

      {isProcessing && (
        <div className="fixed top-24 left-72 z-50">
          <SatisfyingStartButton 
            isProcessing={true} 
            onClick={() => {}} 
            onStop={() => setIsProcessing(false)}
          />
        </div>
      )}

      {!isProcessing && (
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
