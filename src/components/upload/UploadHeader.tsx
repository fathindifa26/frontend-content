import { CloudUpload, Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import React, { useRef, ChangeEvent } from "react";

interface UploadHeaderProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function UploadHeader({ onUpload, isAnalyzing }: UploadHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
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
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">
              AI Analysis
            </p>
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

          <div className="flex space-x-3 pt-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2.5 bg-primary/90 text-white text-[11px] font-bold rounded-xl hover:bg-primary transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
            >
              <Upload size={14} />
              <span>Upload File</span>
            </button>
            <button
              className="px-6 py-2.5 bg-white/5 text-white/60 text-[11px] font-bold rounded-xl border border-white/5 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2"
            >
              <LinkIcon size={14} />
              <span>Via URL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
