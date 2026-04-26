import { UploadHeader } from "../upload/UploadHeader";
import { ExplanationCard } from "../upload/ExplanationCard";
import { MetadataCard } from "../upload/MetadataCard";
import { TimelineCard } from "../upload/TimelineCard";
import { AudioIntelligence } from "../upload/AudioIntelligence";
import { ContentStrategy } from "../upload/ContentStrategy";
import { AccountContext } from "../upload/AccountContext";
import { MarketComparison } from "../upload/MarketComparison";

interface UploadViewProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
  data: any;
}

export function UploadView({ onUpload, isAnalyzing, data }: UploadViewProps) {
  const analysis = data?.analysis || {};
  const market = data?.market_comparison || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UploadHeader onUpload={onUpload} isAnalyzing={isAnalyzing} />
      
      <ExplanationCard />

      <div className="grid grid-cols-12 gap-6">
        <MetadataCard data={analysis} />
        <TimelineCard data={analysis.visual} market={market.positioning} />
        <AudioIntelligence data={analysis.audio} />
        <ContentStrategy data={analysis.semantic} />
        <AccountContext data={analysis.profile} />
        <MarketComparison data={market} />
      </div>
    </div>
  );
}
