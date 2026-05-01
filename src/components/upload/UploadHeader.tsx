import { CloudUpload, Upload, Link as LinkIcon, Loader2, ArrowLeft, Send } from "lucide-react";
import React, { useRef, useState } from "react";

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

  return (
    <div className="glass-panel p-12 rounded-[48px] flex flex-col items-center text-center space-y-6 relative overflow-hidden backdrop-blur-[80px]">
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center animate-in zoom-in duration-700 h-[180px]">
          {/* Pulsing Core - "Biru yang nyala mati halus" */}
          <div className="relative mb-8 animate-float">
            <div className="absolute inset-[-15px] bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-16 h-16 bg-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.2)]">
              <Loader2 className="text-white/80 animate-spin-slow" size={24} />
            </div>
          </div>

          <div className="text-center space-y-2 relative z-10">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Analyzing<span className="text-primary animate-pulse">...</span>
            </h3>
            <p className="text-[11px] font-medium text-white/30 tracking-tight">
              AI Analysis
            </p>
          </div>
        </div>
      ) : showUrlInput ? (
        <div className="animate-in slide-in-from-right-4 fade-in duration-500 flex flex-col items-center space-y-6 w-full max-w-md">
          <button 
            onClick={() => setShowUrlInput(false)}
            className="absolute top-8 left-8 p-2 text-white/30 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
            <LinkIcon className="text-primary" size={20} />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Analysis via URL</h2>
            <p className="text-[11px] text-white/40 font-medium">Paste Instagram Reels or TikTok video link below</p>
          </div>

          <div className="w-full flex flex-col space-y-3">
            <div className="relative">
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reels/..."
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <button
              onClick={handleUrlSubmit}
              disabled={!url.trim()}
              className="w-full py-3 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2"
            >
              <Send size={14} />
              <span>Analyze Video</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 flex flex-col items-center space-y-6">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-all">
            <CloudUpload className="text-white/40 group-hover:text-primary transition-colors" size={20} />
          </div>

          <div className="space-y-1">
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
              className="group flex flex-col items-center space-y-2 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 w-32"
            >
              <div className="p-2.5 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                <LinkIcon size={20} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-white/40 group-hover:text-white transition-colors">Via URL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

