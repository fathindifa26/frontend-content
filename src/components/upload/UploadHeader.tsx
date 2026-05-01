import { CloudUpload, Upload, Link as LinkIcon, Loader2, ArrowLeft, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface UploadHeaderProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isAnalyzing: boolean;
}

export function UploadHeader({ onUpload, onUrlSubmit, isAnalyzing }: UploadHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleUrlSubmit = () => {
    if (url.trim()) {
      onUrlSubmit(url);
      setShowUrlInput(false);
      setUrl("");
    }
  };

  const springConfig = { type: "spring", stiffness: 300, damping: 25, mass: 1 } as const;

  return (
    <motion.div 
      layout
      transition={springConfig}
      className={`glass-panel rounded-[48px] relative overflow-hidden backdrop-blur-[80px] mx-auto w-full transition-all duration-700 ease-in-out ${
        showUrlInput ? "p-8 min-h-[160px]" : "p-12 min-h-[300px]"
      }`}
    >
      <AnimatePresence mode="wait">
        {showUrlInput ? (
          <motion.div 
            key="url-input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfig}
            className="flex flex-col space-y-4 w-full"
          >
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-400/10 rounded-2xl flex items-center justify-center border border-amber-400/20">
                  <LinkIcon className="text-amber-400" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Direct Analysis</h3>
                  <p className="text-[10px] text-white/30 font-medium">Paste Instagram or TikTok link</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowUrlInput(false)}
                className="p-2 text-white/20 hover:text-white/60 hover:bg-white/5 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/10 rounded-[24px] p-1.5 focus-within:border-amber-400/40 transition-all">
              <input 
                type="text"
                autoFocus
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reels/..."
                className="flex-1 bg-transparent px-4 py-2 text-[13px] text-white placeholder:text-white/20 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <button
                onClick={handleUrlSubmit}
                disabled={!url.trim()}
                className="px-6 py-2 bg-amber-400 text-amber-950 text-[11px] font-bold rounded-full hover:bg-amber-300 disabled:opacity-30 disabled:grayscale transition-all flex items-center space-x-2 shadow-lg shadow-amber-400/20"
              >
                <span>Enter</span>
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="main-upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfig}
            className="flex flex-col items-center space-y-6"
          >
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
              <CloudUpload className="text-white/40" size={20} />
            </div>

            <div className="space-y-1 text-center">
              <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Engine</h2>
              <p className="text-[11px] text-white/40 font-medium max-w-xs">Drop video file here or select to begin analysis</p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group flex flex-col items-center space-y-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 w-32"
              >
                <div className="p-2.5 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <Upload size={20} className="text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[11px] font-bold text-white/40 group-hover:text-white transition-colors">Upload File</span>
              </button>

              <button
                onClick={() => setShowUrlInput(true)}
                className="group flex flex-col items-center space-y-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-amber-400/10 hover:border-amber-400/30 transition-all duration-500 w-32"
              >
                <div className="p-2.5 bg-white/5 rounded-2xl group-hover:bg-amber-400/20 transition-colors">
                  <LinkIcon size={20} className="text-white/40 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[11px] font-bold text-white/40 group-hover:text-amber-400 transition-colors">Via URL</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

