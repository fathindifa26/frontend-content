import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileVideo, CheckCircle, AlertCircle, Loader2, Play, Code } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

function App() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showJson, setShowJson] = useState(false);
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
      const response = await axios.post(`${API_BASE}/analyze`, formData, {
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

  const AnalysisSection = ({ title, data }) => (
    <div className="analysis-item">
      <span className="label">{title}</span>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500">
              {key.replace(/text_overlay_/g, 'Overlay ').replace(/_/g, ' ')}
            </span>
            <span className="value">
              {typeof value === 'boolean' ? (
                <span className={`status-badge ${value ? 'status-true' : 'status-false'}`}>
                  {value ? 'Yes' : 'No'}
                </span>
              ) : value === null ? (
                <span className="text-gray-600">null</span>
              ) : (
                value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-violet-500/10 rounded-2xl">
              <FileVideo className="text-violet-500 w-8 h-8" />
            </div>
          </div>
          <h1>Content Reviewer</h1>
          <p className="text-gray-400 text-lg">AI-Powered Social Media Video Analysis</p>
        </header>

        <div className="glass-card">
          {!result && !analyzing && (
            <div 
              className="upload-zone"
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                hidden 
                ref={fileInputRef} 
                onChange={handleFileChange}
                accept="video/*"
              />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="text-violet-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {file ? file.name : "Drop your video here"}
                </h3>
                <p className="text-gray-500">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Support MP4, MOV, WEBM up to 20MB"}
                </p>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="py-20 flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-violet-500 animate-spin mb-4" />
              <h3 className="text-xl font-semibold pulse">Analyzing Content...</h3>
              <p className="text-gray-500 mt-2">Our AI is watching the video and extracting features</p>
            </div>
          )}

          {result && (
            <div className="text-left">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500 w-6 h-6" />
                  <h3 className="text-xl font-semibold">Analysis Complete</h3>
                </div>
                <button 
                  onClick={() => setShowJson(!showJson)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Code size={16} />
                  {showJson ? "Show Form" : "Show JSON"}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {showJson ? (
                  <motion.div 
                    key="json"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="json-viewer"
                  >
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid-analysis"
                  >
                    {Object.entries(result).map(([sectionKey, sectionData]) => (
                      <AnalysisSection 
                        key={sectionKey} 
                        title={`${sectionKey} Analysis`} 
                        data={sectionData} 
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => {setResult(null); setFile(null);}}
                  className="btn-primary"
                >
                  Analyze Another Video
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {file && !analyzing && !result && (
            <div className="mt-8">
              <button 
                onClick={uploadAndAnalyze}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                <Play size={18} fill="currentColor" />
                Start Analysis
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
