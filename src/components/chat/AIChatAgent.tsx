import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, Bot, Maximize2, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function AIChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Creative Assistant. How can I help you optimize your content today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your request. As an agent, I can help you refine your hooks, analyze benchmarks, or even draft new scripts. What specifically would you like to focus on?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center w-full max-w-2xl px-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-panel w-full h-[500px] mb-4 rounded-[32px] border border-white/10 flex flex-col overflow-hidden shadow-2xl origin-bottom"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">AI Agentic Assistant</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg text-white/30 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                      msg.sender === 'user' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'
                    }`}>
                      {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-[13px] font-medium leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar / Toggle */}
      <motion.div
        layout
        className={`glass-panel w-full rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all group ${
          isOpen ? 'bg-white/10 border-white/20' : 'bg-white/5 hover:bg-white/10'
        }`}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div 
          className="flex items-center px-4 py-3 cursor-pointer"
          onClick={() => !isOpen && setIsOpen(true)}
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles size={16} />
          </div>
          
          <div className="flex-1 px-4">
            {isOpen ? (
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="w-full bg-transparent border-none text-sm text-white placeholder:text-white/20 focus:outline-none"
              />
            ) : (
              <span className="text-sm text-white/20 font-medium">Ask AI agent anything...</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isOpen ? (
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-1.5 bg-primary text-white rounded-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send size={16} />
              </button>
            ) : (
              <div className="flex items-center space-x-2 px-2 py-1 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">Agent</span>
                <div className="w-1 h-1 rounded-full bg-success" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
