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
          width: isExpanded ? 600 : 220,
          height: 52,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`glass-panel rounded-full border border-white/10 shadow-2xl overflow-hidden flex items-center px-4 relative ${
          isExpanded ? "bg-white/10" : "bg-white/5 hover:bg-white/10 cursor-pointer"
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="flex-1 overflow-hidden">
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
                placeholder="Type your command..."
                className="w-full bg-transparent border-none text-[13px] text-white placeholder:text-white/20 focus:outline-none py-2"
              />
            ) : (
              <motion.span
                key="collapsed-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[12px] text-white/30 font-medium whitespace-nowrap block text-center"
              >
                Ask AI Strategist...
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center space-x-2"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSend();
                }}
                disabled={!input.trim() || isTyping}
                className="p-2.5 glass-card rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 disabled:opacity-30 group"
              >
                {isTyping ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="p-1 text-white/10 hover:text-white/40 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
