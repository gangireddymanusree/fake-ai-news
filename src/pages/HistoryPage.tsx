import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  Search, 
  Trash2, 
  Download, 
  Eye, 
  Zap, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle,
  Calendar,
  Clock,
  ArrowUpDown,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { AnalysisResult, ClassificationLabel } from '../types';
import { ReportModal } from '../components/common/ReportModal';

export const HistoryPage: React.FC = () => {
  const { history, deleteFromHistory, clearHistory, setActiveResult, addToast } = useApp();
  const navigate = useNavigate();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [labelFilter, setLabelFilter] = useState<'ALL' | ClassificationLabel>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'conf-high' | 'conf-low'>('newest');
  const [selectedAudit, setSelectedAudit] = useState<AnalysisResult | null>(null);

  // Filtered and sorted history
  const filteredHistory = history.filter((item) => {
    if (labelFilter !== 'ALL' && item.label !== labelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.headline.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.summaryExplanation.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    if (sortBy === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    if (sortBy === 'conf-high') return b.confidence - a.confidence;
    if (sortBy === 'conf-low') return a.confidence - b.confidence;
    return 0;
  });

  const handleReAnalyze = (item: AnalysisResult) => {
    setActiveResult(item);
    navigate('/analyzer');
  };

  const handleExportCsv = () => {
    if (history.length === 0) return;

    let csv = 'ID,Headline,Label,Confidence,CredibilityScore,Model,Timestamp\n';
    history.forEach(item => {
      const cleanHeadline = `"${item.headline.replace(/"/g, '""')}"`;
      csv += `${item.id},${cleanHeadline},${item.label},${item.confidence}%,${item.credibilityScore},${item.primaryModel},${item.timestamp}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `truthguard_history_export_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('success', 'History Exported', 'CSV archive downloaded successfully.');
  };

  const handleExportJson = () => {
    if (history.length === 0) return;

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(history, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `truthguard_history_dump_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'JSON Exported', 'JSON database dump saved to your machine.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <span>Audit Trail & Persistence</span>
            <span aria-hidden="true">·</span>
            <span>Local Storage Memory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Analysis History & Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Review past news evaluations, inspect linguistic vector outputs, and export historical logs for your viva presentation.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCsv}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors disabled:opacity-40"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            Export CSV
          </button>
          <button
            onClick={handleExportJson}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors disabled:opacity-40"
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            Export JSON
          </button>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search previous scans by headline or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Label Filter Tabs */}
          <div className="md:col-span-3 flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            {(['ALL', 'REAL', 'FAKE'] as const).map(lbl => (
              <button
                key={lbl}
                onClick={() => setLabelFilter(lbl)}
                className={`flex-1 py-1 text-center font-medium rounded-lg transition-colors ${
                  labelFilter === lbl
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="md:col-span-3 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="conf-high">Sort: Highest Confidence</option>
              <option value="conf-low">Sort: Lowest Confidence</option>
            </select>
          </div>

        </div>
      </div>

      {/* History Items List / Table */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <History className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-slate-200">No History Records Found</h3>
          <p className="text-xs text-slate-400">
            {history.length === 0 
              ? 'You have not analyzed any articles yet. Head over to the AI Analyzer to run your first evaluation.'
              : 'No past scans match your current filter criteria.'}
          </p>
          {history.length === 0 && (
            <button
              onClick={() => navigate('/analyzer')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              Go to AI Analyzer
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => {
            const isReal = item.label === 'REAL';
            const isFake = item.label === 'FAKE';

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] border ${
                      isReal
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/20'
                        : isFake
                        ? 'bg-rose-950/60 text-rose-400 border-rose-500/20'
                        : 'bg-amber-950/60 text-amber-400 border-amber-500/20'
                    }`}>
                      {item.label} NEWS
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {item.confidence}% Confidence
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-cyan-400/90 font-mono text-[11px]">
                      Credibility: {item.credibilityScore}/100
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500 text-[11px]">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {item.headline}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summaryExplanation}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <button
                    onClick={() => setSelectedAudit(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    Audit
                  </button>
                  <button
                    onClick={() => handleReAnalyze(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Load in AI
                  </button>
                  <button
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Audit Report Modal */}
      <ReportModal
        result={selectedAudit}
        isOpen={selectedAudit !== null}
        onClose={() => setSelectedAudit(null)}
      />

    </div>
  );
};
