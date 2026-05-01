import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Loader2, X, Bot, ChevronUp, ChevronDown, Zap } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "tool";
  timestamp: Date;
}

interface AIChatAgentProps {
  onDataUpdate?: () => void;
  setHighlight?: (component: string | null) => void;
  selectedContexts?: { id: string, type: string, target: string, text?: string, index?: number }[];
  toggleContext?: (context: { type: string, target: string, text?: string, index?: number }) => void;
  clearContexts?: () => void;
}

export function AIChatAgent({ 
  onDataUpdate, 
  setHighlight,
  selectedContexts = [],
  toggleContext,
  clearContexts
}: AIChatAgentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyHeight, setHistoryHeight] = useState(400);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showHistory]);

  const handleSend = async () => {
    if ((!input.trim() && selectedContexts.length === 0) || isTyping) return;
    
    const userText = input.trim();
    
    // Construct context string from all selected contexts with indices
    const contextString = selectedContexts.length > 0 
      ? `[Contexts: ${selectedContexts.map(c => `${c.type} ${c.target}${c.index !== undefined ? ` (idx: ${c.index})` : ''}${c.text ? ` - "${c.text}"` : ''}`).join('; ')}] `
      : '';

    const userPrompt = `${contextString}${userText}`;
    const displayMessage = userText || (selectedContexts.length > 0 ? `Analyze ${selectedContexts.length} selected items` : "");

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: displayMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);
    setShowHistory(true);
    
    // Clear contexts after sending
    clearContexts?.();
    
    try {
      const history = messages.filter(m => m.sender !== 'tool').map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const response = await fetch("http://localhost:8000/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userPrompt,
          history: history
        })
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      
      // Handle tool updates first
      if (data.tool_used && data.tool_used.length > 0) {
        data.tool_used.forEach((tool: string, index: number) => {
          const toolMsg: Message = {
            id: `tool-${Date.now()}-${index}`,
            text: `Executing Tool: ${tool.replace(/_/g, ' ')}`,
            sender: "tool",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, toolMsg]);
        });

        if (onDataUpdate) onDataUpdate();

        const modifiedTool = data.tool_used.find((t: string) => t.includes('modify'));
        if (modifiedTool && setHighlight) {
          if (userPrompt.toLowerCase().includes('hook')) setHighlight('Hook');
          else if (userPrompt.toLowerCase().includes('content')) setHighlight('Content');
          else if (userPrompt.toLowerCase().includes('production')) setHighlight('Production');
          
          setTimeout(() => setHighlight(null), 5000);
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || data.response || "I couldn't generate a response.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none">
      {/* Conversation Window */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: "blur(0px)",
              height: historyHeight 
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-panel w-[640px] mb-4 rounded-[32px] border border-white/10 flex flex-col overflow-hidden shadow-2xl origin-bottom pointer-events-auto"
          >
            {/* Window Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Bot size={16} />
                </div>
                <span className="text-xs font-bold text-white/60 tracking-wider uppercase">AI Strategist Thread</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setHistoryHeight(h => h === 400 ? 650 : 400)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all"
                >
                  {historyHeight === 400 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'tool' ? (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <div className="flex items-center space-x-2 mb-1 px-1">
                        <Zap size={10} className="text-success animate-pulse" />
                        <span className="text-[10px] font-bold text-success/60 uppercase tracking-widest">Agent Action</span>
                      </div>
                      <div className="px-4 py-2.5 bg-success/5 border border-success/20 rounded-[20px] rounded-tl-none backdrop-blur-md shadow-lg shadow-success/5">
                        <span className="text-[12px] font-bold text-white/70 tracking-tight lowercase">
                          {msg.text.replace('Executing Tool: ', '')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-4 rounded-[24px] text-[13.5px] font-medium leading-relaxed shadow-lg ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none backdrop-blur-md'
                      }`}>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown 
                            components={{
                              ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 mb-2" {...props} />,
                              li: ({node, ...props}) => <li className="marker:text-indigo-400" {...props} />,
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded-full border border-white/5">
                    <Loader2 size={14} className="animate-spin text-indigo-400" />
                    <span className="text-[11px] text-white/40 font-bold uppercase tracking-wider">AI Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-Context Badge Container */}
      <div className="relative w-full flex justify-center h-0 pointer-events-none">
        <div className="absolute bottom-4 flex items-center justify-center space-x-2 px-4 overflow-x-auto custom-scrollbar-hide max-w-[600px] pointer-events-auto">
          <AnimatePresence>
            {selectedContexts.map((ctx) => (
              <motion.div
                key={ctx.id}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="shrink-0 px-3 py-1.5 bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/30 rounded-xl flex items-center space-x-2 shadow-2xl"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200">
                  {ctx.target}
                </span>
                <button 
                  onClick={() => toggleContext?.(ctx)}
                  className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500/20 hover:text-rose-400 transition-all text-white/30"
                >
                  <X size={8} />
                </button>
              </motion.div>
            ))}
            {selectedContexts.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={clearContexts}
                className="shrink-0 px-2 py-1 text-[8px] font-bold text-white/30 hover:text-rose-400 uppercase tracking-tighter transition-colors"
              >
                Clear All
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Bar Container */}
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
        {/* Animated Outer Glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-400 to-primary rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition-all duration-1000 ${
          isExpanded ? "opacity-10 group-hover:opacity-10" : ""
        }`} />
        
        {/* The Rotating AI Gradient Border */}
        <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
          <div className={`absolute inset-[-200%] opacity-100 bg-[conic-gradient(from_0deg,transparent_20%,#f43f5e_30%,#fbbf24_45%,#4f46e5_60%,transparent_70%)] ${
            isExpanded ? "animate-none rotate-45 opacity-20" : "animate-[spin_4s_linear_infinite]"
          }`} />
        </div>

        {/* Main Bar Body */}
        <div className={`relative h-full w-full backdrop-blur-3xl border border-white/10 rounded-[30px] flex items-center px-6 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ${
          isExpanded ? "bg-white/[0.08] border-white/20" : "bg-white/5 hover:bg-white/10 cursor-pointer"
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
                  placeholder={selectedContexts.length > 0 ? `Ask about ${selectedContexts.length} items...` : "Ask AI Anything..."}
                  className="w-full bg-transparent border-none text-[14px] text-white placeholder:text-white/20 focus:outline-none"
                />
              ) : (
                <motion.div
                  key="collapsed-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full flex items-center space-x-3"
                >
                  <Sparkles size={16} className="text-amber-400/60" />
                  <span className="text-[15px] text-white/50 font-medium tracking-tight">
                    Ask AI Anything...
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
                {/* Toggle History Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (messages.length > 0) setShowHistory(!showHistory);
                  }}
                  className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/40'}`}
                >
                  <ChevronUp size={18} className={`transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} />
                </button>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSend();
                  }}
                  disabled={(!input.trim() && selectedContexts.length === 0) || isTyping}
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
                    setShowHistory(false);
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
