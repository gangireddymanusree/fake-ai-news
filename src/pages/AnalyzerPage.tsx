import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { classifyNewsArticle, MODEL_BENCHMARKS } from '../ml/engine';
import { AnalysisResult, ModelAlgorithm } from '../types';
import { TEST_PRESETS } from '../data/sampleArticles';
import { CircularProgress } from '../components/common/CircularProgress';
import { ReportModal } from '../components/common/ReportModal';
import { 
  Zap, 
  Trash2, 
  Upload, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  Download, 
  RefreshCw, 
  Cpu, 
  Eye, 
  Check, 
  Info,
  Clock,
  Layers,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export const AnalyzerPage: React.FC = () => {
  const { addToHistory, activeResult, setActiveResult, addToast } = useApp();

  // Form states
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelAlgorithm>('ensemble');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(activeResult);
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Sync if activeResult was set elsewhere (e.g., from History or Dashboard)
  useEffect(() => {
    if (activeResult) {
      setResult(activeResult);
      setHeadline(activeResult.headline);
      setContent(activeResult.content);
      setSelectedModel(activeResult.primaryModel);
    }
  }, [activeResult]);

  // Real-time text metrics
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const headlineWords = headline.trim() ? headline.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    setHeadline('');
    setContent('');
    setResult(null);
    setActiveResult(null);
    addToast('info', 'Inputs Cleared', 'Text inputs and previous evaluation results cleared.');
  };

  const handleLoadPreset = (preset: typeof TEST_PRESETS[0]) => {
    setHeadline(preset.headline);
    setContent(preset.content);
    setResult(null);
    addToast('info', 'Preset Loaded', `Loaded sample article: ${preset.title}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.txt')) {
      addToast('error', 'Invalid File Format', 'Please upload a plain text (.txt) file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        // Attempt to split first line as headline if separated by double newline
        const lines = text.split('\n\n');
        if (lines.length > 1 && lines[0].length < 200) {
          setHeadline(lines[0].trim());
          setContent(lines.slice(1).join('\n\n').trim());
        } else {
          setContent(text.trim());
          if (!headline) {
            setHeadline('Uploaded Document Article');
          }
        }
        addToast('success', 'File Imported', `Successfully loaded ${file.name} (${text.length} characters)`);
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = () => {
    if (!headline.trim() && !content.trim()) {
      addToast('warning', 'Missing Content', 'Please enter at least a headline or article content to analyze.');
      return;
    }

    if (content.trim().length < 20 && headline.trim().length < 10) {
      addToast('warning', 'Input Too Short', 'Please provide more news content for reliable TF-IDF vectorization.');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Realistic scanning animation delay to simulate vectorization & model inference
    setTimeout(() => {
      const analysis = classifyNewsArticle(
        headline.trim() || 'Untitled News Article',
        content.trim(),
        selectedModel
      );
      setResult(analysis);
      addToHistory(analysis);
      setIsAnalyzing(false);
      addToast('success', 'Analysis Complete', `Article classified as ${analysis.label} NEWS (${analysis.confidence}% confidence).`);
      
      // Smooth scroll to results on mobile/small screens
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1100);
  };

  // Helper to highlight suspicious / credible words in text
  const renderHighlightedContent = () => {
    if (!result || !highlightKeywords || result.topKeywords.length === 0) {
      return <p className="whitespace-pre-wrap leading-relaxed">{content || result?.content}</p>;
    }

    const textToHighlight = content || result.content;
    const wordsMap = new Map<string, number>();
    result.topKeywords.forEach(k => {
      wordsMap.set(k.word.toLowerCase(), k.weight);
    });

    // Create regex matching all keyword phrases
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sortedPhrases = result.topKeywords.map(k => escapeRegExp(k.word)).sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${sortedPhrases.join('|')})`, 'gi');

    const parts = textToHighlight.split(regex);

    return (
      <p className="whitespace-pre-wrap leading-relaxed">
        {parts.map((part, i) => {
          const weight = wordsMap.get(part.toLowerCase());
          if (weight !== undefined) {
            if (weight > 0) {
              return (
                <mark
                  key={i}
                  className="bg-rose-500/20 text-rose-300 border-b-2 border-rose-500 px-0.5 rounded cursor-help font-medium"
                  title={`Suspicious Token (Weight: +${weight.toFixed(2)})`}
                >
                  {part}
                </mark>
              );
            } else {
              return (
                <mark
                  key={i}
                  className="bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-500 px-0.5 rounded cursor-help font-medium"
                  title={`Credible Journalistic Marker (Weight: ${weight.toFixed(2)})`}
                >
                  {part}
                </mark>
              );
            }
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <span>Primary Interface</span>
            <span aria-hidden="true">·</span>
            <span>NLP Classifier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            AI News Detection & Credibility Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Input any headline or news passage to extract TF-IDF linguistic feature vectors and compute multi-model authenticity probabilities.
          </p>
        </div>

        {/* Algorithm Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium whitespace-nowrap">
            ML Engine:
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as ModelAlgorithm)}
            className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="ensemble">TruthGuard Meta-Ensemble (Recommended · 95.6%)</option>
            <option value="passive_aggressive">Passive Aggressive Classifier (94.8%)</option>
            <option value="svm">Support Vector Machine / LinearSVC (94.1%)</option>
            <option value="logistic_regression">Logistic Regression (92.4%)</option>
            <option value="naive_bayes">Multinomial Naive Bayes (89.6%)</option>
            <option value="random_forest">Random Forest 100 Trees (93.2%)</option>
          </select>
        </div>
      </div>

      {/* Input Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Test Sample Articles (1-Click):</span>
              <span className="text-[11px] text-slate-500">Curated Benchmark Presets</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TEST_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors text-left"
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Headline Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="headline-input" className="font-semibold text-slate-300">
                News Headline / Title
              </label>
              <span className="text-slate-500 font-mono text-[11px]">
                {headlineWords} words
              </span>
            </div>
            <input
              id="headline-input"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Federal Reserve Holds Benchmark Interest Rate Steady..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          {/* Article Content Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="content-input" className="font-semibold text-slate-300">
                Complete Article Content or Excerpt
              </label>
              <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                <span>{wordCount} words</span>
                <span>·</span>
                <span>{charCount} chars</span>
              </div>
            </div>
            <textarea
              id="content-input"
              rows={9}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the full news article, body paragraphs, or editorial claim here to evaluate stylistic markers, attribution signals, and credibility..."
              className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm font-sans focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-y leading-relaxed"
            />
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!headline.trim() && !content.trim())}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Extracting Features...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    Analyze News
                  </>
                )}
              </button>

              <button
                onClick={handleClear}
                disabled={isAnalyzing || (!headline && !content && !result)}
                className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-medium transition-colors disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>

            {/* Upload TXT file option */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
                id="txt-upload"
              />
              <label
                htmlFor="txt-upload"
                className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 text-xs font-medium cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload TXT File
              </label>
            </div>
          </div>

          {/* Model information notice */}
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Active Model:</strong> {MODEL_BENCHMARKS[selectedModel].fullName}. Evaluates vocabulary frequency weights, journalistic attribution markers, and sentence subjectivity against the ISOT & WELFake benchmark corpora.
            </p>
          </div>
        </div>

        {/* Right Column: AI Scanning Radar or Classification Result (5 cols) */}
        <div ref={resultsRef} className="lg:col-span-5">
          {isAnalyzing ? (
            /* Holographic Scanning Animation */
            <div className="h-full min-h-[420px] rounded-2xl bg-slate-900/60 border border-cyan-500/40 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyber-grid opacity-30"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse">
                  <Cpu className="w-10 h-10 text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Evaluating Text Vectors
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Tokenizing · Stripping Stopwords · Calculating TF-IDF
                  </p>
                </div>
                <div className="w-48 h-1.5 mx-auto bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse w-3/4"></div>
                </div>
                <span className="text-[11px] text-cyan-400/80 font-mono block">
                  Simulating Multi-Model Decision Boundaries...
                </span>
              </div>
            </div>
          ) : result ? (
            /* Classification Result Card */
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 shadow-xl relative overflow-hidden">
              
              {/* Result Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  {result.label === 'REAL' ? (
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  ) : result.label === 'FAKE' ? (
                    <ShieldAlert className="w-6 h-6 text-rose-400" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-400" />
                  )}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Classification Result
                    </span>
                    <h3 className={`text-2xl font-black tracking-tight font-mono ${
                      result.label === 'REAL' 
                        ? 'text-emerald-400' 
                        : result.label === 'FAKE'
                        ? 'text-rose-400'
                        : 'text-amber-400'
                    }`}>
                      {result.label} NEWS
                    </h3>
                  </div>
                </div>

                {/* Report Download Button */}
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  title="Generate printable audit report"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  Audit Report
                </button>
              </div>

              {/* Gauges Row: Confidence & Credibility */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <CircularProgress
                    value={result.confidence}
                    size={110}
                    strokeWidth={8}
                    color={result.label === 'REAL' ? 'emerald' : result.label === 'FAKE' ? 'red' : 'amber'}
                    sublabel="Confidence"
                  />
                  <span className="text-[11px] text-slate-400 mt-2 font-medium">
                    Model Certainty
                  </span>
                </div>

                <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <CircularProgress
                    value={result.credibilityScore}
                    size={110}
                    strokeWidth={8}
                    color={result.credibilityScore > 65 ? 'emerald' : result.credibilityScore > 35 ? 'amber' : 'red'}
                    sublabel={`${result.credibilityScore}/100`}
                  />
                  <span className="text-[11px] text-slate-400 mt-2 font-medium">
                    Credibility Index
                  </span>
                </div>
              </div>

              {/* AI Explanation & Reasoning */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Explanation & Reasoning
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  {result.summaryExplanation}
                </p>
              </div>

              {/* Top Identified Keywords & Influence Weights */}
              {result.topKeywords.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-slate-400">
                      Top Influential Keywords
                    </span>
                    <button
                      onClick={() => setHighlightKeywords(!highlightKeywords)}
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      {highlightKeywords ? 'Hide in Text' : 'Highlight in Text'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.topKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono border ${
                          kw.weight > 0
                            ? 'bg-rose-950/50 text-rose-300 border-rose-500/20'
                            : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/20'
                        }`}
                        title={`Weight: ${kw.weight > 0 ? '+' : ''}${kw.weight.toFixed(2)} (${kw.category})`}
                      >
                        {kw.word} <span className="opacity-60 text-[10px] tabular-nums">({kw.weight > 0 ? '+' : ''}{kw.weight.toFixed(1)})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-Model Breakdown Accordion/Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Cross-Model Verification
                </span>
                <div className="space-y-1.5">
                  {result.modelsBreakdown.map((m) => (
                    <div
                      key={m.algorithm}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800 text-xs"
                    >
                      <span className="text-slate-300 font-medium">{m.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className={`font-semibold ${
                          m.label === 'REAL' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {m.label}
                        </span>
                        <span className="text-slate-500 tabular-nums">({m.confidence}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timestamp & Reset CTA */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px]">
                  Scanned: {new Date(result.timestamp).toLocaleTimeString()}
                </span>
                <button
                  onClick={handleClear}
                  className="text-cyan-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Analyze Another Article
                </button>
              </div>

            </div>
          ) : (
            /* Idle Placeholder State */
            <div className="h-full min-h-[420px] rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-base font-semibold text-slate-200">
                  Ready for News Analysis
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter an article headline and text on the left, or select one of the benchmark test presets to see the real-time AI classification.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => handleLoadPreset(TEST_PRESETS[0])}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
                >
                  Load Sample Article
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Highlighted Full Text Viewer (Visible when analysis is active) */}
      {result && highlightKeywords && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-200">
                AI Explainability: Visual Keyword Map
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Suspicious Token
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Credible Anchor
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-300 font-sans leading-relaxed p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            {renderHighlightedContent()}
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Disclaimer: Word highlighting indicates statistical correlations within the TF-IDF vocabulary weights, not definitive proof of falsity.
          </p>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        result={result}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

    </div>
  );
};
