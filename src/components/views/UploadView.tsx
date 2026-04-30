import { UploadHeader } from "../upload/UploadHeader";

interface UploadViewProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isAnalyzing: boolean;
}

export function UploadView({ onUpload, onUrlSubmit, isAnalyzing }: UploadViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UploadHeader 
        onUpload={onUpload} 
        onUrlSubmit={onUrlSubmit}
        isAnalyzing={isAnalyzing} 
      />
    </div>
  );
}
