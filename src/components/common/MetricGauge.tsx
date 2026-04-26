import { motion } from "motion/react";

interface MetricGaugeProps {
  value: number;
  label: string;
  color?: "tertiary" | "secondary";
}

export function MetricGauge({ value, label, color = "tertiary" }: MetricGaugeProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  
  const strokeColor = color === "tertiary" ? "text-tertiary" : "text-secondary";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle className="text-white/5" cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" strokeWidth="6" />
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={strokeColor}
            cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" 
            strokeDasharray={circumference} 
            strokeWidth="6" 
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-black tracking-tighter tabular-nums">{value}%</span>
      </div>
      <span className="text-[10px] text-on-surface-variant mt-2 text-center uppercase tracking-wider">{label}</span>
    </div>
  );
}
