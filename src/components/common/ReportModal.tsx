import React from 'react';
import { AnalysisResult } from '../../types';
import { Download, Printer, X, ShieldCheck, ShieldAlert, AlertCircle, FileText, CheckCircle } from 'lucide-react';

interface ReportModalProps {
  result: AnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ result, isOpen, onClose }) => {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const reportText = `=====================================================
TRUTHGUARD AI - CLASSIFICATION AUDIT REPORT
Generated: ${new Date(result.timestamp).toUTCString()}
Report ID: ${result.id}
=====================================================

1. CLASSIFICATION SUMMARY
-----------------------------------------------------
Prediction Label:    ${result.label} NEWS
Model Confidence:    ${result.confidence}%
Credibility Index:   ${result.credibilityScore} / 100
Primary Algorithm:   ${result.primaryModel.toUpperCase()}

2. ARTICLE METADATA
-----------------------------------------------------
Headline:
${result.headline}

Word Count:          ${result.linguisticMetrics.wordCount}
Reading Time:        ~${result.linguisticMetrics.readingTimeMinutes} min
Lexical Diversity:   ${(result.linguisticMetrics.lexicalDiversity * 100).toFixed(1)}%
Sensationalism Rate: ${result.linguisticMetrics.sensationalismScore}/100
Subjectivity Rate:   ${result.linguisticMetrics.subjectivityScore}/100
Sentiment Polarity:  ${result.linguisticMetrics.sentimentPolarity}

3. EXPLANATION & MODEL REASONING
-----------------------------------------------------
${result.summaryExplanation}

4. INFLUENTIAL KEYWORDS & FEATURE VECTORS
-----------------------------------------------------
${result.topKeywords.map(k => `• "${k.word}" -> Weight: ${k.weight > 0 ? '+' : ''}${k.weight.toFixed(2)} (${k.category})`).join('\n')}

5. MULTI-MODEL VOTING MATRIX
-----------------------------------------------------
${result.modelsBreakdown.map(m => `• ${m.name}: ${m.label} (${m.confidence}% confidence, raw score: ${m.rawScore})`).join('\n')}

6. AUDIT NOTICE & DISCLAIMER
-----------------------------------------------------
This report was generated using the TruthGuard AI Multi-Model NLP Pipeline
(Passive-Aggressive Classifier, SVM, Logistic Regression, Naive Bayes).
Model indicators evaluate structural, stylistic, and lexical features.
For formal journalistic fact-checking, corroborate with primary wire services.
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `truthguard-audit-${result.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isReal = result.label === 'REAL';
  const isFake = result.label === 'FAKE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/60 dark:border-cyan-500/20 text-slate-100 shadow-2xl overflow-hidden my-8 print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold tracking-wide text-slate-200">
              Audit Report Preview
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download TXT
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-300 print:text-slate-900 font-sans">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                  TG
                </div>
                <span className="text-xl font-bold tracking-tight text-white print:text-black">
                  TRUTHGUARD AI
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Automated Fake News Detection & Credibility Audit Report
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-400 font-mono">
              <p>Report ID: {result.id}</p>
              <p>Timestamp: {new Date(result.timestamp).toLocaleString()}</p>
              <p>Engine: Multi-Model Ensemble</p>
            </div>
          </div>

          {/* Primary Result Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isReal 
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
              : isFake
              ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
              : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center gap-3">
              {isReal ? (
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              ) : isFake ? (
                <ShieldAlert className="w-8 h-8 text-rose-400 shrink-0" />
              ) : (
                <AlertCircle className="w-8 h-8 text-amber-400 shrink-0" />
              )}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold opacity-80">
                  Primary Classification Result
                </span>
                <h4 className="text-xl font-bold tracking-tight">
                  {result.label} NEWS
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-6 font-mono text-sm">
              <div className="text-center">
                <span className="block text-xs uppercase opacity-75">Confidence</span>
                <span className="text-lg font-bold tabular-nums">{result.confidence}%</span>
              </div>
              <div className="text-center">
                <span className="block text-xs uppercase opacity-75">Credibility</span>
                <span className="text-lg font-bold tabular-nums">{result.credibilityScore}/100</span>
              </div>
            </div>
          </div>

          {/* Headline and Metadata */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Analyzed Article Headline
            </h4>
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200 font-medium text-sm leading-relaxed">
              "{result.headline}"
            </div>
          </div>

          {/* Linguistic Metrics Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Linguistic & Stylistic Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Word Count</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-slate-200">
                  {result.linguisticMetrics.wordCount} words
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Sensationalism</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-slate-200">
                  {result.linguisticMetrics.sensationalismScore} / 100
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Subjectivity</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-slate-200">
                  {result.linguisticMetrics.subjectivityScore} / 100
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Lexical Diversity</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-slate-200">
                  {(result.linguisticMetrics.lexicalDiversity * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* AI Explanation Summary */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Model Reasoning & Explanation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/40 border border-slate-800">
              {result.summaryExplanation}
            </p>
          </div>

          {/* Model Breakdown Table */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Individual Machine Learning Algorithm Results
            </h4>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950/70 text-slate-400 font-medium">
                  <tr>
                    <th className="py-2.5 px-3">Algorithm</th>
                    <th className="py-2.5 px-3">Classification</th>
                    <th className="py-2.5 px-3 text-right">Confidence</th>
                    <th className="py-2.5 px-3 text-right">Raw Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  {result.modelsBreakdown.map(model => (
                    <tr key={model.algorithm} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">
                        {model.name}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`font-semibold ${
                          model.label === 'REAL' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {model.label}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right tabular-nums">
                        {model.confidence}%
                      </td>
                      <td className="py-2 px-3 text-right tabular-nums text-slate-400">
                        {model.rawScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Footer */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed print:text-slate-500">
            TruthGuard AI Academic Verification Engine. Evaluated against Scikit-Learn TF-IDF vectorization models trained on ISOT Fake News & WELFake benchmark corpora. This automated evaluation does not replace human editorial fact-checking.
          </div>
        </div>
      </div>
    </div>
  );
};
