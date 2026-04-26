import { CloudUpload, Upload, Link as LinkIcon } from "lucide-react";

export function UploadHeader() {
  return (
    <div className="glass-panel p-10 rounded-[40px] flex flex-col items-center text-center space-y-6">
      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-white/10">
        <CloudUpload className="text-primary" size={32} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Upload Video for Intelligence Processing</h2>
        <p className="text-on-surface-variant max-w-md">Drag and drop MP4, MOV or AVI. Max file size 2GB.</p>
      </div>
      <div className="flex space-x-4">
        <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
          <Upload size={18} />
          <span>Select File</span>
        </button>
        <button className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center space-x-2">
          <LinkIcon size={18} />
          <span>Paste URL</span>
        </button>
      </div>
    </div>
  );
}
