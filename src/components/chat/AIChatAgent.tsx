import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, User, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface AIChatAgentProps {
  onDataUpdate?: () => void;
  setHighlight?: (component: string | null) => void;
}

export function AIChatAgent({ onDataUpdate, setHighlight }: AIChatAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Creative Strategist. I can help you analyze, edit, and optimize your content data directly. How can I help today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input.trim();
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);
    
    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const response = await fetch("http://localhost:8000/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: history
        })
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);

      // Handle tool updates
      if (data.tool_used && data.tool_used.length > 0) {
        // Refresh data in UI
        if (onDataUpdate) onDataUpdate();

        // Highlight changed component
        const modifiedTool = data.tool_used.find((t: string) => t.includes('modify'));
        if (modifiedTool && setHighlight) {
          if (userText.toLowerCase().includes('hook')) setHighlight('Hook');
          else if (userText.toLowerCase().includes('content')) setHighlight('Content');
          else if (userText.toLowerCase().includes('production')) setHighlight('Production');
          
          setTimeout(() => setHighlight(null), 5000);
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please check if the backend is running.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
                  <h4 className="text-sm font-bold text-white tracking-tight">AI Strategist Agent</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Online & Interactive</span>
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
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown 
                          components={{
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1" {...props} />,
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
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                  </div>
                </div>
              )}
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
                placeholder="Ask agent to edit hooks, remove points, etc..."
                className="w-full bg-transparent border-none text-sm text-white placeholder:text-white/20 focus:outline-none"
              />
            ) : (
              <span className="text-sm text-white/20 font-medium">Chat with AI Agent to modify results...</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isOpen ? (
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
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
