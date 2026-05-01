import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";

interface LogEntry {
  id: string;
  message: string;
  status: "pending" | "current" | "completed";
}

interface ProcessingLogsProps {
  logs: LogEntry[];
}

export function ProcessingLogs({ logs }: ProcessingLogsProps) {
  return (
    <div className="mt-6 flex flex-col space-y-3">
      <AnimatePresence mode="popLayout">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center space-x-3 px-5 py-3 rounded-2xl glass-panel border-white/5 transition-all duration-500 ${
              log.status === "completed" ? "bg-success/10 border-success/20" : "bg-white/3"
            }`}
          >
            {log.status === "completed" ? (
              <CheckCircle2 size={14} className="text-success" />
            ) : log.status === "current" ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Circle size={14} className="text-primary" strokeDasharray="4 2" />
              </motion.div>
            ) : (
              <Circle size={14} className="text-white/20" />
            )}
            
            <span className={`text-[12px] font-medium tracking-tight ${
              log.status === "completed" ? "text-success/80" : "text-white/60"
            }`}>
              {log.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
