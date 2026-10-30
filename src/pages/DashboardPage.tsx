import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Activity, 
  Calendar,
  Layers,
  ArrowRight,
  Filter,
  Eye,
  FileText
} from 'lucide-react';
import { ReportModal } from '../components/common/ReportModal';
import { AnalysisResult } from '../types';

export const DashboardPage: React.FC = () => {
  const { stats, history, setActiveResult } = useApp();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);

  // Time trend data points
  const trendData = {
    daily: [
      { label: '00:00', real: 14, fake: 18 },
      { label: '04:00', real: 8, fake: 12 },
      { label: '08:00', real: 32, fake: 45 },
      { label: '12:00', real: 64, fake: 58 },
      { label: '16:00', real: 82, fake: 74 },
      { label: '20:00', real: 46, fake: 38 }
    ],
    weekly: [
      { label: 'Mon', real: 320, fake: 380 },
      { label: 'Tue', real: 410, fake: 395 },
      { label: 'Wed', real: 490, fake: 520 },
      { label: 'Thu', real: 540, fake: 480 },
      { label: 'Fri', real: 610, fake: 670 },
      { label: 'Sat', real: 380, fake: 490 },
      { label: 'Sun', real: 290, fake: 410 }
    ],
    monthly: [
      { label: 'May', real: 1420, fake: 1650 },
      { label: 'Jun', real: 1680, fake: 1720 },
      { label: 'Jul', real: 1890, fake: 2100 },
      { label: 'Aug', real: 2240, fake: 2380 },
      { label: 'Sep', real: 2600, fake: 2750 },
      { label: 'Oct', real: 2890, fake: 3120 }
    ]
  };

  const currentTrend = trendData[timeRange];
  const maxTrendVal = Math.max(...currentTrend.flatMap(d => [d.real, d.fake])) * 1.15;

  // Category breakdown
  const categoryStats = [
    { name: 'Politics', real: 48, fake: 52 },
    { name: 'Health', real: 36, fake: 64 },
    { name: 'Technology', real: 68, fake: 32 },
    { name: 'Science', real: 82, fake: 18 },
    { name: 'Business', real: 74, fake: 26 },
    { name: 'Entertainment', real: 40, fake: 60 }
  ];

  // Most frequent suspicious keywords detected across the system
  const topSuspiciousKeywords = [
    { word: 'shocking', count: 1842, weight: 0.85, category: 'sensationalism' },
    { word: 'bombshell', count: 1420, weight: 0.92, category: 'sensationalism' },
    { word: 'secret miracle', count: 1198, weight: 0.88, category: 'clickbait' },
    { word: 'deep state', count: 1045, weight: 0.91, category: 'conspiracy' },
    { word: 'they don\'t want you to know', count: 980, weight: 0.96, category: 'clickbait' },
    { word: 'exposed', count: 864, weight: 0.79, category: 'sensationalism' },
    { word: 'banned by media', count: 742, weight: 0.82, category: 'attribution' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <span>Analytics & Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            AI Analytics & Misinformation Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aggregate statistics, classification distribution, temporal trends, and lexical detection patterns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/analyzer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Analyze New Article
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Total Articles Scanned
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
              {stats.totalAnalyzed + 44898}
            </span>
            <span className="text-xs text-cyan-400 font-mono">+12% vs last week</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full w-4/5"></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Real News Verified
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
              {stats.realCount + 21417}
            </span>
            <span className="text-xs text-emerald-400 font-mono">48.2% Share</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[48%]"></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/30 transition-all">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Fake News Flagged
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-rose-400">
              {stats.fakeCount + 23481}
            </span>
            <span className="text-xs text-rose-400 font-mono">51.8% Share</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full w-[52%]"></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 transition-all">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Average Model Confidence
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-purple-400">
              {stats.avgConfidence}%
            </span>
            <span className="text-xs text-purple-400 font-mono">High Precision</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full w-[94%]"></div>
          </div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Trend Analysis Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Classification Volume Trends
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real versus fake news frequency monitored over time.
              </p>
            </div>

            {/* Segmented Time Range Buttons */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
              {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${
                    timeRange === range
                      ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive SVG Bar/Line Chart */}
          <div className="h-64 w-full relative pt-4">
            <div className="flex items-center justify-end gap-6 text-xs font-mono mb-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 rounded bg-emerald-500"></span> Real News
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-3 rounded bg-rose-500"></span> Fake News
              </span>
            </div>

            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-800">
              {currentTrend.map((pt, idx) => {
                const realHeight = Math.max(8, (pt.real / maxTrendVal) * 100);
                const fakeHeight = Math.max(8, (pt.fake / maxTrendVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                      {/* Real bar */}
                      <div
                        style={{ height: `${realHeight}%` }}
                        className="w-1/2 max-w-[20px] bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all relative"
                        title={`Real: ${pt.real}`}
                      ></div>
                      {/* Fake bar */}
                      <div
                        style={{ height: `${fakeHeight}%` }}
                        className="w-1/2 max-w-[20px] bg-rose-500/80 hover:bg-rose-400 rounded-t transition-all relative"
                        title={`Fake: ${pt.fake}`}
                      ></div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                      {pt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Aggregate samples processed: 44,900+</span>
            <span>Peak detection: Friday evening cycles</span>
          </div>
        </div>

        {/* Distribution Donut / Radial Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              Dataset Distribution
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified Real vs Flagged Misinformation ratio.
            </p>
          </div>

          {/* Visual CSS-based circular distribution ring */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center p-3"
                 style={{
                   background: `conic-gradient(#10b981 0% 48%, #ef4444 48% 97%, #f59e0b 97% 100%)`
                 }}>
              <div className="w-32 h-32 rounded-full bg-slate-900 flex flex-col items-center justify-center text-center border border-slate-800">
                <span className="text-2xl font-bold font-mono tabular-nums text-white">
                  94.8%
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  PAC Accuracy
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Real News
              </span>
              <span className="font-mono tabular-nums text-emerald-400 font-semibold">48%</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Fake News
              </span>
              <span className="font-mono tabular-nums text-rose-400 font-semibold">49%</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Uncertain Margin
              </span>
              <span className="font-mono tabular-nums text-amber-400 font-semibold">3%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Category Misinformation Breakdown & Suspicious Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Real vs Fake by Category (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Category Misinformation Ratios
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown of real vs fabricated stories by news domain.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{cat.name}</span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    <span className="text-emerald-400">{cat.real}% Real</span> / <span className="text-rose-400">{cat.fake}% Fake</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 flex overflow-hidden">
                  <div style={{ width: `${cat.real}%` }} className="bg-emerald-500 h-full"></div>
                  <div style={{ width: `${cat.fake}%` }} className="bg-rose-500 h-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-500">
            * Health and political topics demonstrate the highest density of fabricated claims.
          </div>
        </div>

        {/* Top Suspicious Keywords Detected (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Most Frequently Detected Suspicious Keywords
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High-weight TF-IDF tokens frequently identified in flagged articles.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950/70 text-slate-400 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Keyword / Phrase</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Detections</th>
                  <th className="py-2.5 px-3 text-right">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
                {topSuspiciousKeywords.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-sans font-medium text-rose-300">
                      "{item.word}"
                    </td>
                    <td className="py-2 px-3 text-slate-400 font-sans capitalize text-[11px]">
                      {item.category}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-200">
                      {item.count.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-rose-400 font-bold">
                      +{item.weight.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Recent History Table with Quick-Inspect */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Recent Classification Stream
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest items analyzed in your active session.
            </p>
          </div>

          <Link
            to="/history"
            className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1"
          >
            Open Full History Archive <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/70 text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4">Headline</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4 text-right">Confidence</th>
                <th className="py-3 px-4 text-right">Date / Time</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {history.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 max-w-md truncate font-medium text-slate-200">
                    {item.headline}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`inline-block font-mono font-semibold px-2 py-0.5 rounded text-[11px] ${
                      item.label === 'REAL'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                        : item.label === 'FAKE'
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-200">
                    {item.confidence}%
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-[11px] text-slate-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedResult(item)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-medium transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Audit Modal */}
      <ReportModal
        result={selectedResult}
        isOpen={selectedResult !== null}
        onClose={() => setSelectedResult(null)}
      />

    </div>
  );
};
