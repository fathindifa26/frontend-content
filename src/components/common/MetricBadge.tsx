import React from "react";

interface MetricBadgeProps {
  value: number | undefined;
  type: "numeric" | "categorical";
  avgValue?: number; // Used for categorical avg proportion
  fallback?: number;
  labelOverride?: string;
  benchmarkType?: "frequency" | "views";
}

export function MetricBadge({ 
  value, 
  type, 
  avgValue, 
  fallback = 50, 
  labelOverride,
  benchmarkType = "frequency"
}: MetricBadgeProps) {
  
  const val = (value !== undefined && !isNaN(value)) ? value : fallback;

  // Color Logic
  const getColorClasses = () => {
    if (type === "numeric") {
      // Numerical Logic: Red (Low) - Green (Median) - Blue (High)
      if (val > 65) return "bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(79,70,229,0.2)]";
      if (val > 35) return "bg-success/20 text-success border-success/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]";
      return "bg-error/20 text-error border-error/30 shadow-[0_0_10px_rgba(248,113,113,0.2)]";
    } else {
      // Categorical Logic: Red (Rare) - Blue (Common) - Green (Popular)
      const avg = avgValue ?? 15;
      if (val > avg * 1.2) return "bg-success/20 text-success border-success/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]";
      if (val > avg * 0.8) return "bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(79,70,229,0.2)]";
      return "bg-error/20 text-error border-error/30 shadow-[0_0_10px_rgba(248,113,113,0.2)]";
    }
  };

  // Tooltip Logic
  const getTooltipContent = () => {
    if (type === "numeric") {
      return (
        <div className="space-y-1.5">
          <p className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1">Benchmark Guide</p>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <p className="text-[8px] text-on-surface-variant">Green: Near {benchmarkType === "frequency" ? "Median" : "Top Views"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-[8px] text-on-surface-variant">Blue: Above {benchmarkType === "frequency" ? "Median" : "Average"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-error" />
            <p className="text-[8px] text-on-surface-variant">Red: Below {benchmarkType === "frequency" ? "Median" : "Average"}</p>
          </div>
          <p className="text-[8px] text-primary italic pt-1 border-t border-white/5">
            Tip: {benchmarkType === "frequency" 
              ? "Staying near the median (Green) is generally more stable." 
              : "Aligning with top-performing videos (Green) increases reach potential."}
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-1.5">
          <p className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1">Benchmark Guide</p>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <p className="text-[8px] text-on-surface-variant">Green: {benchmarkType === "frequency" ? "Popular (Above Avg)" : "High View Impact"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-[8px] text-on-surface-variant">Blue: {benchmarkType === "frequency" ? "Common (Near Avg)" : "Neutral View Impact"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-error" />
            <p className="text-[8px] text-on-surface-variant">Red: {benchmarkType === "frequency" ? "Unique (Below Avg)" : "Low View Impact"}</p>
          </div>
          <p className="text-[8px] text-primary italic pt-1 border-t border-white/5">
            Tip: {benchmarkType === "frequency" 
              ? "Features with higher market presence (Green) are more widely proven." 
              : "Categories with higher view averages (Green) are currently trending."}
          </p>
        </div>
      );
    }
  };

  const label = labelOverride || (type === "numeric" ? `${Math.round(val)}th Pctl` : `${Math.round(val)}% market`);

  return (
    <div className="group relative">
      <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded border cursor-help transition-all duration-300 ${getColorClasses()}`}>
        {label}
      </p>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
        {getTooltipContent()}
      </div>
    </div>
  );
}
