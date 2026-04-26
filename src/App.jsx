import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileVideo, CheckCircle, AlertCircle, Loader2, Play, Code, BarChart3, TrendingUp, Globe, Filter, Eye, Zap, Target } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';
const TOPICS = ["Global", "Food", "Education", "Lifestyle", "Beauty", "Finance", "Entertainment"];

function App() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [marketFilter, setMarketFilter] = useState("Global");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid video file.');
    }
  };

  const uploadAndAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/analyze?filter_topic=${marketFilter}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred during analysis.');
    } finally {
      setAnalyzing(false);
    }
  };

  const formatKey = (key) => key.replace(/text_overlay_/g, 'Overlay ').replace(/_/g, ' ');

  const AnalysisSection = ({ title, data }) => (
    <div className="analysis-item">
      <span className="label">{title}</span>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500">{formatKey(key)}</span>
            <span className="value">
              {typeof value === 'boolean' ? (
                <span className={`status-badge ${value ? 'status-true' : 'status-false'}`}>
                  {value ? 'Yes' : 'No'}
                </span>
              ) : value === null ? (
                <span className="text-gray-600">null</span>
              ) : value
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const PositionCard = ({ field, data }) => (
    <div className="analysis-item border-l-4 border-violet-500 bg-violet-500/5">
      <span className="label">{formatKey(field)}</span>
      <div className="mt-1">
        <div className="flex justify-between items-end mb-1">
          <span className="text-xs font-bold text-gray-300">
            {data.percentile ? "Percentile Rank" : "Market Share"}
          </span>
          <span className="text-violet-400 font-black text-lg">
            {data.percentile ? `${data.percentile.toFixed(0)}th` : `${data.proportion.toFixed(1)}%`}
          </span>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${data.percentile || data.proportion}%` }}
            className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          />
        </div>
        <p className="text-[9px] text-gray-500 mt-2">
          {data.market_avg ? `Market Average: ${data.market_avg}` : `Market Top: ${data.top_value} (${data.top_proportion}%)`}
        </p>
      </div>
    </div>
  );

  const PerformanceCard = ({ field, data }) => {
    const values = Object.values(data);
    const maxVal = Math.max(...values);
    
    return (
      <div className="analysis-item border-l-4 border-emerald-500 bg-emerald-500/5">
        <span className="label">{formatKey(field)} Impact</span>
        <div className="mt-3 space-y-2">
          {Object.entries(data).slice(0, 4).map(([bin, views]) => (
            <div key={bin} className="relative">
              <div className="flex justify-between text-[10px] mb-1 z-10 relative px-1">
                <span className="text-gray-400 truncate max-w-[100px]">{bin}</span>
                <span className="font-bold text-emerald-400">{views.toLocaleString()} views</span>
              </div>
              <div className="w-full bg-white/5 h-4 rounded-md overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(views / maxVal) * 100}%` }}
                  className="h-full bg-emerald-500/20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col items-center">
          <div className="p-3 bg-violet-500/10 rounded-2xl mb-4">
            <FileVideo className="text-violet-500 w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black mb-2">Content Reviewer <span className="text-violet-500">PRO</span></h1>
          <p className="text-gray-500 text-lg">Benchmark your content against the global market</p>
          
          <div className="mt-8 flex items-center gap-4 bg-white/5 p-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 px-3 text-gray-400 border-r border-white/10">
              <Globe size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Context</span>
            </div>
            <select value={marketFilter} onChange={(e) => setMarketFilter(e.target.value)} className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer pr-10">
              {TOPICS.map(t => <option key={t} value={t} className="bg-[#0a0a0c]">{t}</option>)}
            </select>
          </div>
        </header>

        <div className="glass-card">
          {!result && !analyzing && (
            <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
              <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="video/*" />
              <div className="flex flex-col items-center">
                <Upload className="text-violet-500 w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{file ? file.name : "Select Video to Analyze"}</h3>
                <p className="text-gray-500">Compare your metrics with the {marketFilter} market</p>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="py-32 flex flex-col items-center">
              <Loader2 className="w-16 h-16 text-violet-500 animate-spin mb-6" />
              <h3 className="text-2xl font-bold pulse">Generating Intelligence...</h3>
              <p className="text-gray-500 mt-2">Crunching market data for {marketFilter} context</p>
            </div>
          )}

          {result && (
            <div className="text-left space-y-12">
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Zap className="text-yellow-400 fill-yellow-400" size={24} />
                  <h3 className="text-2xl font-bold">Intelligence Report</h3>
                </div>
                <button onClick={() => setShowJson(!showJson)} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                  <Code size={14} /> {showJson ? "Back to UI" : "Raw JSON"}
                </button>
              </div>

              {showJson ? (
                <div className="json-viewer"><pre>{JSON.stringify(result, null, 2)}</pre></div>
              ) : (
                <div className="space-y-16">
                  {/* POSITIONING SECTION */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="text-violet-500" size={24} />
                      <h4 className="text-lg font-black uppercase tracking-tighter">Market Positioning</h4>
                    </div>
                    <div className="grid-analysis">
                      {Object.entries(result.market_comparison.positioning).map(([k, v]) => (
                        <PositionCard key={k} field={k} data={v} />
                      ))}
                    </div>
                  </section>

                  {/* PERFORMANCE SECTION */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="text-emerald-500" size={24} />
                      <h4 className="text-lg font-black uppercase tracking-tighter">Performance Benchmarks</h4>
                    </div>
                    <div className="grid-analysis">
                      {Object.entries(result.market_comparison.performance).map(([k, v]) => (
                        <PerformanceCard key={k} field={k} data={v} />
                      ))}
                    </div>
                  </section>

                  {/* CONTENT DETAILS */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Eye className="text-gray-400" size={24} />
                      <h4 className="text-lg font-black uppercase tracking-tighter">AI Feature Extraction</h4>
                    </div>
                    <div className="grid-analysis">
                      {Object.entries(result.analysis).map(([k, v]) => (
                        <AnalysisSection key={k} title={k} data={v} />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              <div className="pt-8 flex justify-center">
                <button onClick={() => {setResult(null); setFile(null);}} className="btn-primary px-12 py-4 text-lg">
                  Start New Review
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500">
              <AlertCircle size={24} />
              <p className="font-bold">{error}</p>
            </div>
          )}

          {file && !analyzing && !result && (
            <div className="mt-12 flex justify-center">
              <button onClick={uploadAndAnalyze} className="btn-primary flex items-center gap-3 px-12 py-4 text-xl">
                <Play size={24} fill="currentColor" /> Analyze Performance
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
