import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenTool, Sparkles, ChevronLeft, ChevronRight, FileText, Wand2, RefreshCw, PlusCircle, ArrowLeft, Loader2, Copy, CheckCircle2 } from "lucide-react";

function BriefCard({ 
  index, 
  total, 
  title, 
  hook, 
  story, 
  fullPrompt, 
  isGenerating, 
  onGenerate,
  onRegenerate
}: { 
  index: number; 
  total: number; 
  title: string; 
  hook: string; 
  story: string;
  fullPrompt?: string;
  isGenerating?: boolean;
  onGenerate: () => void;
  onRegenerate?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (fullPrompt) {
      navigator.clipboard.writeText(fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.02] relative overflow-hidden flex flex-col space-y-8 min-h-[500px]"
      >
        {/* Background Icon */}
        <div className="absolute -top-10 -right-10 opacity-[0.03] text-white">
          <PenTool size={240} />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText size={28} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-[0.2em]">Generated Script Concept</span>
              <h3 className="text-3xl font-black text-white tracking-tighter">{title}</h3>
            </div>
          </div>
          
          <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            <span className="text-[11px] font-bold text-white/40 tracking-widest">
              {index + 1} <span className="text-white/10 mx-1">/</span> {total}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 relative z-10 flex-1">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-rose-400/80">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500/60">The Hook Strategy</span>
            </div>
            <p className="text-2xl font-black text-white/95 leading-[1.1] tracking-tight">
              "{hook}"
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-px w-8 bg-indigo-500/30" />
              <span className="text-[10px] font-black text-indigo-400/50 uppercase tracking-widest">Full Storyline & Core Value</span>
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed font-medium">
              {story}
            </p>
          </div>

          {!fullPrompt && (
            <div className="pt-10 mt-auto flex justify-center">
              <div className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-400 to-primary rounded-[32px] blur-xl transition-all duration-1000 ${isGenerating ? 'opacity-40 animate-pulse' : 'opacity-20 group-hover:opacity-60'}`} />
                <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
                  <div className={`absolute inset-[-200%] opacity-100 bg-[conic-gradient(from_0deg,transparent_20%,#f43f5e_30%,#fbbf24_45%,#4f46e5_60%,transparent_70%)] ${isGenerating ? 'animate-[spin_1s_linear_infinite]' : 'animate-[spin_4s_linear_infinite]'}`} />
                </div>
                <button 
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="relative min-w-[280px] px-10 py-3.5 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[30px] flex items-center justify-center space-x-3 transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] hover:bg-white/10 group disabled:opacity-50"
                >
                  {isGenerating ? (
                    <Loader2 size={18} className="text-white animate-spin" />
                  ) : (
                    <Sparkles size={18} className="text-white animate-pulse" />
                  )}
                  <span className="text-[15px] font-bold text-white tracking-tight">
                    {isGenerating ? "Generating Prompt..." : "Generate Full AI Prompt"}
                  </span>
                  {!isGenerating && (
                    <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <Sparkles size={16} className="text-amber-400" />
                    </motion.div>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {fullPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 rounded-[32px] border border-indigo-500/20 bg-indigo-500/[0.03] relative overflow-hidden space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Wand2 size={20} />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">Optimized AI Master Prompt</h4>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onRegenerate}
                  disabled={isGenerating}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl border bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30"
                >
                  <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                  <span className="text-xs font-bold uppercase tracking-widest">Regenerate</span>
                </button>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all ${
                    copied 
                      ? 'bg-success/20 border-success/30 text-success' 
                      : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  <span className="text-xs font-bold uppercase tracking-widest">{copied ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-black/20 border border-white/5 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.02] text-white pointer-events-none">
                <Sparkles size={100} />
              </div>
              <p className="text-[14px] text-white/70 leading-relaxed font-mono whitespace-pre-wrap selection:bg-indigo-500/30">
                {fullPrompt}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-indigo-400/40">
              <Sparkles size={12} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Ready to use with ChatGPT, Claude, or Midjourney</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NewBriefRecommendation({ 
  analysisResults,
  persistedBriefs,
  setPersistedBriefs,
  persistedView,
  setPersistedView
}: { 
  analysisResults: any[],
  persistedBriefs: any[],
  setPersistedBriefs: (b: any[]) => void,
  persistedView: "selection" | "loading" | "result",
  setPersistedView: (v: "selection" | "loading" | "result") => void
}) {
  const [mode, setMode] = useState<"improve" | "new">("new");
  const [current, setCurrent] = useState(0);
  const [generatedPrompts, setGeneratedPrompts] = useState<Record<number, string>>({});
  const [loadingPrompts, setLoadingPrompts] = useState<Record<number, boolean>>({});

  const handleGenerate = async () => {
    setPersistedView("loading");
    try {
      const response = await fetch("http://localhost:8000/api/analysis/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, results: analysisResults })
      });
      const data = await response.json();
      setPersistedBriefs(data);
      setPersistedView("result");
      setGeneratedPrompts({}); // Reset prompts when new briefs are generated
    } catch (error) {
      console.error("Failed to generate brief:", error);
      setPersistedView("selection");
    }
  };

  const handleGenerateFullPrompt = async (index: number) => {
    setLoadingPrompts(prev => ({ ...prev, [index]: true }));
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const brief = persistedBriefs[index];
    const prompt = `ACT AS A SENIOR CREATIVE DIRECTOR. 
    
TASK: Generate a high-retention video script based on this strategy:
TITLE: ${brief.title}

STRATEGY:
1. HOOK: "${brief.hook}"
2. STORYLINE: ${brief.story}

SPECIFIC INSTRUCTIONS:
- Maintain a fast-paced tone.
- Use pattern interrupts every 3-5 seconds.
- Ensure the core value is delivered before the 50% mark.
- End with a specific, low-friction Call to Action.

VIDEO FORMAT: 9:16 (Vertical)
TONE: Energetic, Professional, Insightful.`;

    setGeneratedPrompts(prev => ({ ...prev, [index]: prompt }));
    setLoadingPrompts(prev => ({ ...prev, [index]: false }));
  };

  const next = () => setCurrent((c) => (c + 1) % persistedBriefs.length);
  const prev = () => setCurrent((c) => (c - 1 + persistedBriefs.length) % persistedBriefs.length);

  return (
    <div className="space-y-12 max-w-5xl mx-auto w-full pt-12">
      <AnimatePresence mode="wait">
        {persistedView === "selection" && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-black text-white tracking-tighter">What's the Next Move?</h3>
              <p className="text-white/40 font-medium">Choose your creative direction for the AI to process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "improve", title: "Refine Current Video", desc: "Optimize your existing script and hook for maximum retention", icon: RefreshCw },
                { id: "new", title: "Create New Concept", desc: "Leverage data insights to build a fresh, viral-ready concept from scratch", icon: PlusCircle }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMode(opt.id as any)}
                  className={`glass-panel p-8 rounded-[32px] border text-left transition-all duration-500 group relative overflow-hidden ${
                    mode === opt.id 
                      ? 'bg-indigo-500/10 border-indigo-500/30 ring-2 ring-indigo-500/20' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    mode === opt.id ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/40 group-hover:text-white/60'
                  }`}>
                    <opt.icon size={24} />
                  </div>
                  <h4 className={`text-xl font-bold mb-2 transition-colors ${mode === opt.id ? 'text-white' : 'text-white/60'}`}>
                    {opt.title}
                  </h4>
                  <p className="text-sm text-white/30 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-primary to-blue-500 rounded-[32px] blur-xl opacity-20 group-hover:opacity-60 transition-all duration-1000" />
                <div className="absolute -inset-[1.5px] overflow-hidden rounded-[31px]">
                  <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] opacity-100 bg-[conic-gradient(from_0deg,transparent_20%,#4f46e5_30%,#3b82f6_45%,#6366f1_60%,transparent_70%)]" />
                </div>
                <button 
                  onClick={handleGenerate}
                  className="relative min-w-[280px] px-10 py-4 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[30px] flex items-center justify-center space-x-3 transition-all hover:bg-white/10"
                >
                  <Wand2 size={20} className="text-white" />
                  <span className="text-lg font-bold text-white tracking-tight">Generate Brief</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {persistedView === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[500px] flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-indigo-500/20" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-2 border-t-indigo-500 animate-spin" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500 animate-pulse" size={32} />
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-2xl font-black text-white tracking-tight animate-pulse">Consulting creative director...</h4>
              <p className="text-white/30 text-sm">Crafting your custom content strategy</p>
            </div>
          </motion.div>
        )}

        {persistedView === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 pb-20"
          >
            <div className="flex items-center justify-between px-4">
              <button 
                onClick={() => setPersistedView("selection")}
                className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-widest">Back to Selection</span>
              </button>

              <div className="flex items-center space-x-2">
                <button onClick={prev} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={next} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <BriefCard 
              index={current}
              total={persistedBriefs.length}
              title={persistedBriefs[current]?.title}
              hook={persistedBriefs[current]?.hook}
              story={persistedBriefs[current]?.story}
              fullPrompt={generatedPrompts[current]}
              isGenerating={loadingPrompts[current]}
              onGenerate={() => handleGenerateFullPrompt(current)}
              onRegenerate={() => handleGenerateFullPrompt(current)}
            />

            <div className="flex justify-center space-x-2">
              {persistedBriefs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    current === i ? 'w-10 bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
