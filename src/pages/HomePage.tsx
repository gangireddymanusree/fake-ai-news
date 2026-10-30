import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Cpu, 
  CheckCircle, 
  AlertTriangle, 
  Layers, 
  FileCheck2, 
  ArrowRight, 
  Activity,
  Search,
  Sparkles,
  Lock,
  Database,
  Binary,
  Compass
} from 'lucide-react';
import { MODEL_BENCHMARKS } from '../ml/engine';

export const HomePage: React.FC = () => {
  const { stats, history, setActiveResult } = useApp();

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Futuristic glowing backdrop and grid pattern */}
        <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Domain Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 font-mono tracking-wide">
                <span>Final-Year AI Engineering Project</span>
                <span aria-hidden="true">·</span>
                <span>Scikit-Learn NLP Pipeline</span>
                <span aria-hidden="true">·</span>
                <span>Dual Verification</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Uncover the Truth Behind Every Headline.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                An intelligent web application that uses Artificial Intelligence, Natural Language Processing, and Machine Learning techniques to identify whether a given news article or headline is <span className="text-emerald-400 font-medium">REAL</span> or <span className="text-rose-400 font-medium">FAKE</span> with explainable feature weights.
              </p>

              {/* Two Prominent Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/analyzer"
                  className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  Analyze News
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/70 hover:border-cyan-500/40 transition-all hover:scale-[1.02]"
                >
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Explore Dashboard
                </Link>
              </div>

              {/* Technical Trust Strip */}
              <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span>ISOT Benchmark: <strong className="text-cyan-400 tabular-nums">94.8% PAC Accuracy</strong></span>
                <span>·</span>
                <span>Dataset: <strong className="text-slate-300 tabular-nums">44,898 Articles</strong></span>
              </div>
            </div>

            {/* Right Column: High-tech Visual Hero Artwork */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 bg-slate-900 group">
                <img
                  src="/src/assets/images/truthguard_hero_banner_1793348682388.jpg"
                  alt="TruthGuard AI Holographic Verification Command Center"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Floating telemetry summary badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 text-xs">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      Active NLP Vectorizer
                    </span>
                    <span className="font-mono text-cyan-400 text-[11px]">TF-IDF 1-3 Grams</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Classifier</span>
                      <span className="font-mono text-slate-200">PAC + SVM</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Stopwords</span>
                      <span className="font-mono text-slate-200">NLTK Clean</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Status</span>
                      <span className="font-mono text-emerald-400 font-medium">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="py-12 border-y border-slate-800/70 bg-slate-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Total Analyzed */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Total Analyzed
                </span>
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="mt-2 text-3xl font-bold font-mono tabular-nums text-white">
                {stats.totalAnalyzed + 44898}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {stats.totalAnalyzed} live session + 44,898 trained corpus
              </span>
            </div>

            {/* Real News Detected */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Real News Verified
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-3xl font-bold font-mono tabular-nums text-emerald-400">
                {stats.realCount + 21417}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {(stats.realPercentage || 49)}% verified journalistic attribution
              </span>
            </div>

            {/* Fake News Detected */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Fake News Flagged
                </span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <p className="mt-2 text-3xl font-bold font-mono tabular-nums text-rose-400">
                {stats.fakeCount + 23481}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {(stats.fakePercentage || 51)}% flagged for misinformation patterns
              </span>
            </div>

            {/* Model Accuracy (Supported by evaluation) */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  PAC Model Accuracy
                </span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <p className="mt-2 text-3xl font-bold font-mono tabular-nums text-purple-400">
                94.8%
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">
                F1-Score: 0.947 on ISOT test holdout
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Core Features Overview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            System Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Comprehensive Machine Learning & Fact-Checking Stack
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Engineered with transparent NLP feature vectors, multi-model consensus voting, and explainable AI to prevent black-box bias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Multi-Model Ensemble
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simultaneously executes Passive-Aggressive Classifier, Linear SVM, Logistic Regression, Naive Bayes, and Random Forest to provide consensus voting.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <Link to="/model-performance" className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1">
                Compare algorithm metrics <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 mb-4">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Explainable AI (XAI)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exposes exact suspicious linguistic weights, sensationalism scores, subjectivity ratios, and attribution markers that influenced the classification decision.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <Link to="/how-it-works" className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1">
                Inspect NLP pipeline <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Batch & Stream Processing
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload CSV or TXT datasets with dozens of articles at once. Filter, sort, and export comprehensive classification audit sheets in one click.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <Link to="/batch-analysis" className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1">
                Test batch classification <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section Summary */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                System Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                How TruthGuard AI Analyzes Content
              </h2>
            </div>
            <Link
              to="/how-it-works"
              className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1"
            >
              Explore Full 9-Stage Pipeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Workflow Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 relative">
              <span className="font-mono text-cyan-400 text-xs font-bold block mb-1">STEP 01</span>
              <h4 className="text-sm font-semibold text-white mb-1">Content Input & Normalization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raw headline and text articles are parsed, stripped of noise, and lowercased.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 relative">
              <span className="font-mono text-cyan-400 text-xs font-bold block mb-1">STEP 02</span>
              <h4 className="text-sm font-semibold text-white mb-1">Stopword Filtering & TF-IDF</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                NLTK stopwords removed; n-grams converted to term frequency-inverse document vectors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 relative">
              <span className="font-mono text-cyan-400 text-xs font-bold block mb-1">STEP 03</span>
              <h4 className="text-sm font-semibold text-white mb-1">Multi-Model Classification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Passive-Aggressive, SVM, and Logistic Regression evaluate decision margins.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 relative">
              <span className="font-mono text-cyan-400 text-xs font-bold block mb-1">STEP 04</span>
              <h4 className="text-sm font-semibold text-white mb-1">Audit Score & Explainability</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Confidence gauge, credibility index, highlighted keywords, and report exported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Analysis Activity Stream */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Live Evaluation Stream
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Recent Classification Activity
            </h2>
          </div>
          <Link
            to="/history"
            className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1"
          >
            View Complete Archive ({history.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {history.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className={`font-semibold font-mono px-2 py-0.5 rounded text-[11px] ${
                    item.label === 'REAL' 
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                      : item.label === 'FAKE'
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-500/20'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.label} NEWS
                  </span>
                  <span className="text-slate-400 font-mono tabular-nums">
                    {item.confidence}% Confidence
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 line-clamp-2 leading-snug">
                  {item.headline}
                </h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.summaryExplanation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px]">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <Link
                  to="/analyzer"
                  onClick={() => setActiveResult(item)}
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Inspect Audit <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Project Presentation Highlights */}
      <section className="py-16 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                Academic Project Defense Ready
              </span>
              <h3 className="text-2xl font-bold text-white">
                Preparing for your Final-Year AI Project Presentation?
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Review the complete academic viva documentation, mathematical formulas for TF-IDF and Passive-Aggressive loss function, confusion matrices, and model comparison charts.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/about"
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
              >
                Project Documentation & Viva Guide
              </Link>
              <Link
                to="/model-performance"
                className="px-5 py-2.5 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              >
                View ROC Curves
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
