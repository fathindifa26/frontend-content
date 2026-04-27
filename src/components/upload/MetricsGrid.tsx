import { MetadataCard } from "./MetadataCard";
import { TimelineCard } from "./TimelineCard";
import { AudioIntelligence } from "./AudioIntelligence";
import { ContentStrategy } from "./ContentStrategy";
import { AccountContext } from "./AccountContext";
import { MarketComparison } from "./MarketComparison";

interface MetricsGridProps {
  analysis: any;
  market: any;
  benchmarkType: "frequency" | "views";
}

export function MetricsGrid({ analysis, market, benchmarkType }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <MetadataCard data={analysis} />
      <TimelineCard 
        data={analysis.visual} 
        market={market.positioning} 
        benchmarkType={benchmarkType}
      />
      <AudioIntelligence 
        data={analysis.audio} 
        market={market} 
        benchmarkType={benchmarkType} 
      />
      <ContentStrategy 
        data={analysis.semantic} 
        market={market} 
        benchmarkType={benchmarkType} 
      />
      <AccountContext data={analysis.profile} />
      <MarketComparison data={market} />
    </div>
  );
}
