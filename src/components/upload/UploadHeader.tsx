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
    <div className="glass-panel p-10 rounded-[40px] flex flex-col items-center text-center space-y-6 relative overflow-hidden">
      {isAnalyzing && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-10 flex flex-col items-center justify-center space-y-4">
           <Loader2 className="text-primary animate-spin" size={48} />
           <p className="text-xl font-bold text-white">Analyzing Content...</p>
           <p className="text-on-surface-variant">This may take up to a minute.</p>
        </div>
      )}
      
      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-white/10">
        <CloudUpload className="text-primary" size={32} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Upload Video for Intelligence Processing</h2>
        <p className="text-on-surface-variant max-w-md">Drag and drop MP4, MOV or AVI. Max file size 2GB.</p>
      </div>
      <div className="flex space-x-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="video/*" 
          onChange={handleFileChange}
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center space-x-2 disabled:opacity-50"
        >
          <Upload size={18} />
          <span>Select File</span>
        </button>
        <button 
          disabled={isAnalyzing}
          className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          <LinkIcon size={18} />
          <span>Paste URL</span>
        </button>
      </div>
    </div>
  );
}
