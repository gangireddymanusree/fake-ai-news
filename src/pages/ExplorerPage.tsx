import React, { useState } from 'react';
import { SAMPLE_EXPLORER_ARTICLES } from '../data/sampleArticles';
import { NewsArticleItem, NewsCategory, ClassificationLabel } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Zap, 
  X, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  ArrowUpDown,
  Compass
} from 'lucide-react';
import { classifyNewsArticle } from '../ml/engine';

export const ExplorerPage: React.FC = () => {
  const { setActiveResult } = useApp();
  const navigate = useNavigate();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<'ALL' | ClassificationLabel>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'cred-desc' | 'cred-asc'>('date-desc');
  const [activeModalArticle, setActiveModalArticle] = useState<NewsArticleItem | null>(null);

  const categories: ('ALL' | NewsCategory)[] = [
    'ALL',
    'Politics',
    'Technology',
    'Sports',
    'Entertainment',
    'Business',
    'Health',
    'Science',
    'World News'
  ];

  // Filtering logic
  const filteredArticles = SAMPLE_EXPLORER_ARTICLES.filter((article) => {
    // Label filter
    if (selectedLabel !== 'ALL' && article.label !== selectedLabel) return false;
    // Category filter
    if (selectedCategory !== 'ALL' && article.category !== selectedCategory) return false;
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchHeadline = article.headline.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchSource = article.source.toLowerCase().includes(q);
      if (!matchHeadline && !matchSummary && !matchSource) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'cred-desc') return b.credibilityScore - a.credibilityScore;
    if (sortBy === 'cred-asc') return a.credibilityScore - b.credibilityScore;
    return 0;
  });

  const handleSendToAnalyzer = (article: NewsArticleItem) => {
    const analysis = classifyNewsArticle(article.headline, article.content, 'ensemble');
    setActiveResult(analysis);
    navigate('/analyzer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <span>News Corpus Repository</span>
            <span aria-hidden="true">·</span>
            <span>Ground Truth Articles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            News Explorer & Truth Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Browse verified real journalism and flagged misinformation across eight major news beats. Inspect linguistic markers or test any item in the AI Analyzer.
          </p>
        </div>

        {/* Evaluation Dataset Label */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono self-start sm:self-auto">
          Corpus Source: <span className="text-cyan-400 font-medium">ISOT & WELFake Curated Samples</span>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        
        {/* Search Input Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, headline topics, or media sources..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="date-desc">Sort: Newest First</option>
              <option value="date-asc">Sort: Oldest First</option>
              <option value="cred-desc">Sort: Highest Credibility</option>
              <option value="cred-asc">Sort: Lowest Credibility (Suspicious)</option>
            </select>
          </div>
        </div>

        {/* Filter Badges Row: Real/Fake + Categories */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Label Filter: ALL / REAL / FAKE */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setSelectedLabel('ALL')}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedLabel === 'ALL' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Articles ({SAMPLE_EXPLORER_ARTICLES.length})
            </button>
            <button
              onClick={() => setSelectedLabel('REAL')}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedLabel === 'REAL' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Real News Only
            </button>
            <button
              onClick={() => setSelectedLabel('FAKE')}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedLabel === 'FAKE' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fake News Only
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-cyan-400 border-cyan-500/40 font-semibold'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Article Cards Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <Compass className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-slate-200">No matching articles found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search keywords, category selection, or classification filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLabel('ALL');
              setSelectedCategory('ALL');
            }}
            className="px-4 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const isReal = article.label === 'REAL';

            return (
              <div
                key={article.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category and Verification Label Banner */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-cyan-400 font-medium">
                      {article.category}
                    </span>
                    <span className={`font-mono font-semibold text-[11px] px-2.5 py-0.5 rounded border ${
                      isReal
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-950/60 text-rose-400 border-rose-500/30'
                    }`}>
                      {article.label} NEWS ({article.confidence}%)
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                    {article.headline}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Key Phrases */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {article.keyPhrases.slice(0, 3).map((kp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-slate-400"
                      >
                        #{kp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Strip with Actions */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <div className="truncate max-w-[180px]">
                    <span className="text-slate-400 font-medium block truncate">
                      {article.source}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {article.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalArticle(article)}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleSendToAnalyzer(article)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      Test in AI
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Article Details Modal */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {activeModalArticle.label === 'REAL' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                )}
                <span className={`font-mono font-bold text-xs ${
                  activeModalArticle.label === 'REAL' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {activeModalArticle.label} NEWS VERIFICATION
                </span>
              </div>
              <button
                onClick={() => setActiveModalArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                {activeModalArticle.category} · {activeModalArticle.date}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {activeModalArticle.headline}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Reported by {activeModalArticle.source}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Full Article Content
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 max-h-56 overflow-y-auto whitespace-pre-wrap">
                {activeModalArticle.content}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Model Confidence</span>
                <span className="text-white font-bold tabular-nums text-sm">
                  {activeModalArticle.confidence}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Credibility Index</span>
                <span className="text-white font-bold tabular-nums text-sm">
                  {activeModalArticle.credibilityScore} / 100
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveModalArticle(null)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSendToAnalyzer(activeModalArticle);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                Analyze in AI Studio Engine
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
