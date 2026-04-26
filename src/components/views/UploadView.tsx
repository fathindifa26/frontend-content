import { UploadHeader } from "../upload/UploadHeader";
import { MetadataCard } from "../upload/MetadataCard";
import { TimelineCard } from "../upload/TimelineCard";
import { AudioIntelligence } from "../upload/AudioIntelligence";
import { ContentStrategy } from "../upload/ContentStrategy";
import { AccountContext } from "../upload/AccountContext";
import { MarketComparison } from "../upload/MarketComparison";

export function UploadView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UploadHeader />

      <div className="grid grid-cols-12 gap-6">
        <MetadataCard />
        <TimelineCard />
        <AudioIntelligence />
        <ContentStrategy />
        <AccountContext />
        <MarketComparison />
      </div>
    </div>
  );
}
