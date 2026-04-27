import { Eye } from "lucide-react";

interface MarketComparisonProps {
  data?: any;
}

export function MarketComparison({ data }: MarketComparisonProps) {
  const dummyVideos = [
    { id: 1, views: "1.2M", similarity: 98 },
    { id: 2, views: "850K", similarity: 94 },
    { id: 3, views: "2.4M", similarity: 92 },
    { id: 4, views: "1.1M", similarity: 89 },
    { id: 5, views: "920K", similarity: 85 },
  ];

  return (
    <div className="col-span-12 glass-panel p-8 rounded-[40px] space-y-8">
       <div className="flex items-center justify-between">
          <div>
             <h3 className="text-lg font-bold text-white">Market Comparison<span className="dummy-badge">Dummy</span></h3>
             <p className="text-sm text-on-surface-variant">Top performing videos most similar to your content.</p>
          </div>
       </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-4">
          {dummyVideos.map((video) => (
            <div 
              key={video.id} 
              className="aspect-[9/16] rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-300"
            >
              {/* Similarity Badge */}
              <div className="absolute top-3 right-3 z-20">
                <div className="px-2 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-lg flex items-center space-x-2 shadow-lg shadow-primary/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
                  <span className="text-[10px] font-black text-white">{video.similarity}% Match</span>
                </div>
              </div>

              {/* Placeholder Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center space-x-2">
                  <Eye size={12} className="text-white/70" />
                  <span className="text-[11px] font-bold text-white">{video.views} views</span>
                </div>
              </div>
            </div>
          ))}
       </div>
    </div>
  );
}




