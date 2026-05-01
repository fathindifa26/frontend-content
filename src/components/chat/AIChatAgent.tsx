import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Loader2, X } from "lucide-react";

interface AIChatAgentProps {
  onDataUpdate?: () => void;
  setHighlight?: (component: string | null) => void;
}

export function AIChatAgent({ onDataUpdate, setHighlight }: AIChatAgentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input.trim();
    setInput("");
    setIsTyping(true);
    
    try {
      // For now, we only send the latest message as we've hidden the history window
      const response = await fetch("http://localhost:8000/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: [] // History is cleared as per user request to hide conversation
        })
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      
      // Handle tool updates
      if (data.tool_used && data.tool_used.length > 0) {
        if (onDataUpdate) onDataUpdate();

        const modifiedTool = data.tool_used.find((t: string) => t.includes('modify'));
        if (modifiedTool && setHighlight) {
          if (userText.toLowerCase().includes('hook')) setHighlight('Hook');
          else if (userText.toLowerCase().includes('content')) setHighlight('Content');
          else if (userText.toLowerCase().includes('production')) setHighlight('Production');
          
          setTimeout(() => setHighlight(null), 5000);
        }
      }

      // Close after success or keep open? Let's keep it open but show success state if needed
      // For now, let's just reset
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center">
      <motion.div
        layout
        initial={false}
        animate={{ 
          width: isExpanded ? 640 : 240,
          height: 56,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative group pointer-events-auto"
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Animated Outer Glow (Same as Start Button) */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-400 to-primary rounded-[32px] blur-xl opacity-20 group-hover:opacity-50 transition-all duration-1000 ${
          isExpanded ? "opacity-40" : ""
        }`} />
        
        {/* The Rotating AI Gradient Border (Same as Start Button) */}
        <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
          <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] opacity-100 bg-[conic-gradient(from_0deg,transparent_20%,#f43f5e_30%,#fbbf24_45%,#4f46e5_60%,transparent_70%)]" />
        </div>

        {/* Main Bar Body */}
        <div className={`relative h-full w-full backdrop-blur-3xl border border-white/10 rounded-[30px] flex items-center px-6 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ${
          isExpanded ? "bg-white/10 border-white/20" : "bg-white/5 hover:bg-white/10 cursor-pointer"
        }`}>
          <div className="flex-1 overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.input
                  key="expanded-input"
                  ref={inputRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask AI Anything..."
                  className="w-full bg-transparent border-none text-[14px] text-white placeholder:text-white/20 focus:outline-none"
                />
              ) : (
                <motion.div
                  key="collapsed-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span className="text-[13px] text-white/40 font-bold tracking-tight">
                    Ask AI Anything
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center ml-2 space-x-2"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSend();
                  }}
                  disabled={!input.trim() || isTyping}
                  className="p-2 text-white/40 hover:text-white transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center"
                >
                  {isTyping ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} className="hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="p-1 text-white/10 hover:text-white/40 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
