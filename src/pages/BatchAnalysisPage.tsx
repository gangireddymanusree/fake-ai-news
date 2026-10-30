import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { classifyNewsArticle } from '../ml/engine';
import { BatchItemResult, ClassificationLabel } from '../types';
import { 
  Layers, 
  Upload, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  Search, 
  RefreshCw, 
  Filter,
  FileCheck,
  Check
} from 'lucide-react';

export const BatchAnalysisPage: React.FC = () => {
  const { addToast } = useApp();
  
  // States
  const [items, setItems] = useState<BatchItemResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [labelFilter, setLabelFilter] = useState<'ALL' | ClassificationLabel>('ALL');
  const [rawTextBatch, setRawTextBatch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample CSV generator for download
  const handleDownloadSampleCsv = () => {
    const csvContent = `id,headline,content,category
1,"Federal Reserve Confirms 25-Basis Point Rate Adjustment at Monetary Policy Briefing","WASHINGTON (Reuters) - The Federal Reserve approved a quarter-point rate reduction following steady consumer price moderation.",Business
2,"SHOCKING: Underground Miracle Root Eradicates Terminal Diseases Doctors Banned!","Wake up people! Elite doctors don't want you to know this unbelievable miracle secret leaked from private research.",Health
3,"NASA Mars Perseverance Rover Collects Sedimentary Rock Cores in Jezero Delta Crater","PASADENA (Associated Press) - Space agency geologists confirmed the acquisition of river delta sedimentary samples containing organic mineral matrices.",Science
4,"LEAKED MEMO: Secret Government AI Replaces Voting Systems Nationwide Without Congressional Approval","An urgent explosive leak reveals shadow deep state operatives rigged voting servers with mind control scripts.",Politics
5,"Automotive Industry Association Reports 35% Year-Over-Year Surge in Electric Vehicle Registrations","BRUSSELS (Reuters) - European vehicle registration data released on Tuesday showed electrified models reached record market penetration.",Business
6,"Celebrity Disappears After Exposing Ancient Antarctic Pyramids on Live Television Broadcast","Unbelievable video footage supposedly scrubbed from social channels claims television host was arrested for telling the truth.",Entertainment`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'truthguard_sample_batch.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('info', 'Sample CSV Downloaded', 'Use this format to upload bulk news articles for classification.');
  };

  // Load demo batch for instant evaluation
  const handleLoadDemoBatch = () => {
    const demoItems = [
      {
        headline: "Federal Reserve Confirms 25-Basis Point Rate Adjustment at Monetary Policy Briefing",
        snippet: "WASHINGTON (Reuters) - The Federal Reserve approved a quarter-point rate reduction following steady consumer price moderation."
      },
      {
        headline: "SHOCKING: Underground Miracle Root Eradicates Terminal Diseases Doctors Banned!",
        snippet: "Wake up people! Elite doctors don't want you to know this unbelievable miracle secret leaked from private research."
      },
      {
        headline: "NASA Mars Perseverance Rover Collects Sedimentary Rock Cores in Jezero Delta Crater",
        snippet: "PASADENA (Associated Press) - Space agency geologists confirmed the acquisition of river delta sedimentary samples."
      },
      {
        headline: "LEAKED MEMO: Secret Government AI Replaces Voting Systems Nationwide Without Congressional Approval",
        snippet: "An urgent explosive leak reveals shadow deep state operatives rigged voting servers with mind control scripts."
      },
      {
        headline: "Automotive Industry Association Reports 35% Surge in Electric Vehicle Registrations",
        snippet: "BRUSSELS (Reuters) - European vehicle registration data released on Tuesday showed electrified models reached record market penetration."
      },
      {
        headline: "Celebrity Disappears After Exposing Ancient Antarctic Pyramids on Live Television Broadcast",
        snippet: "Unbelievable video footage supposedly scrubbed from social channels claims host was arrested for telling the truth."
      }
    ];

    processArticles(demoItems);
  };

  // Process array of articles through ML pipeline
  const processArticles = (articleList: { headline: string; snippet: string }[]) => {
    if (articleList.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setItems([]);

    const batchResults: BatchItemResult[] = [];
    const total = articleList.length;

    articleList.forEach((art, index) => {
      setTimeout(() => {
        const analysis = classifyNewsArticle(art.headline, art.snippet, 'ensemble');
        batchResults.push({
          id: `batch-${Date.now()}-${index}`,
          index: index + 1,
          headline: art.headline,
          contentSnippet: art.snippet,
          label: analysis.label,
          confidence: analysis.confidence,
          credibilityScore: analysis.credibilityScore,
          status: 'completed'
        });

        const currentProg = Math.round(((index + 1) / total) * 100);
        setProgress(currentProg);
        setItems([...batchResults]);

        if (index === total - 1) {
          setIsProcessing(false);
          addToast('success', 'Batch Processing Finished', `Processed ${total} news articles through the multi-model pipeline.`);
        }
      }, (index + 1) * 250);
    });
  };

  // CSV file parser
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length <= 1) {
        addToast('error', 'Empty File', 'Uploaded file contains no data rows.');
        return;
      }

      const parsed: { headline: string; snippet: string }[] = [];
      // Skip header if contains headline
      const startIndex = lines[0].toLowerCase().includes('headline') ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        // Basic CSV split accounting for quotes
        const match = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (match && match.length >= 2) {
          const rawHeadline = match[1] ? match[1].replace(/^"|"$/g, '') : match[0].replace(/^"|"$/g, '');
          const rawSnippet = match[2] ? match[2].replace(/^"|"$/g, '') : rawHeadline;
          parsed.push({ headline: rawHeadline, snippet: rawSnippet });
        } else {
          // Plain line fallback
          parsed.push({ headline: line.substring(0, 80), snippet: line });
        }
      }

      if (parsed.length > 0) {
        processArticles(parsed);
      } else {
        addToast('error', 'Parse Error', 'Could not parse article columns from uploaded file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Export results as CSV
  const handleExportResultsCsv = () => {
    if (items.length === 0) return;

    let csv = 'ID,Headline,Classification,Confidence,CredibilityScore,Snippet\n';
    items.forEach((item) => {
      const cleanHeadline = `"${item.headline.replace(/"/g, '""')}"`;
      const cleanSnippet = `"${item.contentSnippet.replace(/"/g, '""')}"`;
      csv += `${item.index},${cleanHeadline},${item.label},${item.confidence}%,${item.credibilityScore},${cleanSnippet}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `truthguard_batch_results_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('success', 'Results Exported', 'CSV report downloaded to your local drive.');
  };

  // Filtered results
  const filteredItems = items.filter((item) => {
    if (labelFilter !== 'ALL' && item.label !== labelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.headline.toLowerCase().includes(q) || item.contentSnippet.toLowerCase().includes(q);
    }
    return true;
  });

  const realCount = items.filter(i => i.label === 'REAL').length;
  const fakeCount = items.filter(i => i.label === 'FAKE').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <span>High-Throughput Ingestion</span>
            <span aria-hidden="true">·</span>
            <span>Bulk TF-IDF Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Batch News Classification & Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Upload CSV or text datasets to classify dozens of news articles simultaneously. Generate consolidated truth metrics and export audit results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadSampleCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Sample CSV Template
          </button>
        </div>
      </div>

      {/* Upload and Input Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Drag & Drop Upload Zone (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-cyan-400" />
            Upload File Dataset (CSV or TXT)
          </h3>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="batch-file-input"
          />

          <label
            htmlFor="batch-file-input"
            className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-950/40 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors mb-3">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <span className="text-xs font-semibold text-slate-200">
              Click to browse or drop CSV/TXT dataset here
            </span>
            <span className="text-[11px] text-slate-500 mt-1">
              Supports CSV with headline and content columns, or newline-delimited text
            </span>
          </label>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleLoadDemoBatch}
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors disabled:opacity-50"
            >
              Load Demo Batch (6 Articles)
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Max file size: 5MB
            </span>
          </div>
        </div>

        {/* Right Column: Quick Paste Plaintext Area (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Or Paste Multiple Articles Below
            </h3>
            <p className="text-[11px] text-slate-400">
              Separate headlines or paragraphs with double line breaks.
            </p>
            <textarea
              rows={4}
              value={rawTextBatch}
              onChange={(e) => setRawTextBatch(e.target.value)}
              placeholder="Paste article 1...&#10;&#10;Paste article 2...&#10;&#10;Paste article 3..."
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                const chunks = rawTextBatch.split('\n\n').filter(c => c.trim().length > 15);
                if (chunks.length === 0) {
                  addToast('warning', 'No Text Detected', 'Please paste at least one article snippet separated by empty lines.');
                  return;
                }
                processArticles(chunks.map(c => ({ headline: c.slice(0, 90), snippet: c })));
              }}
              disabled={isProcessing || !rawTextBatch.trim()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors disabled:opacity-40"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Process Pasted Text
            </button>

            {items.length > 0 && (
              <button
                onClick={() => {
                  setItems([]);
                  setRawTextBatch('');
                }}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Table
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Progress Bar (Visible while processing) */}
      {isProcessing && (
        <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Batch TF-IDF Processing in Progress...
            </span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300"
            ></div>
          </div>
        </div>
      )}

      {/* Batch Results Table View */}
      {items.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-white">
                Batch Classification Results ({items.length})
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-emerald-400 font-semibold">{realCount} Real</span>
                <span>·</span>
                <span className="text-rose-400 font-semibold">{fakeCount} Fake</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter rows..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-48"
                />
              </div>

              {/* Label Filter */}
              <select
                value={labelFilter}
                onChange={(e) => setLabelFilter(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Results</option>
                <option value="REAL">Real News Only</option>
                <option value="FAKE">Fake News Only</option>
              </select>

              {/* Export Button */}
              <button
                onClick={handleExportResultsCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950/80 text-slate-400 font-medium font-mono">
                <tr>
                  <th className="py-3 px-3 w-12 text-center">#</th>
                  <th className="py-3 px-4">Headline & Snippet</th>
                  <th className="py-3 px-3">Classification</th>
                  <th className="py-3 px-3 text-right">Confidence</th>
                  <th className="py-3 px-3 text-right">Credibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-center font-mono text-slate-500">
                      {item.index}
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <p className="font-semibold text-slate-100 truncate">
                        {item.headline}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.contentSnippet}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-[11px] border ${
                        item.label === 'REAL'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/20'
                          : item.label === 'FAKE'
                          ? 'bg-rose-950/60 text-rose-400 border-rose-500/20'
                          : 'bg-amber-950/60 text-amber-400 border-amber-500/20'
                      }`}>
                        {item.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-200">
                      {item.confidence}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-cyan-400">
                      {item.credibilityScore} / 100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};
