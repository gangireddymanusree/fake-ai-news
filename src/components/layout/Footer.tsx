import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Github, ExternalLink, Cpu, Terminal, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Col 1: Brand & Academic Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="tracking-wide">TRUTHGUARD AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An intelligent web application that uses Artificial Intelligence and Machine Learning techniques to identify whether a given news article or headline is Real or Fake.
            </p>
            <div className="pt-1 text-[11px] text-slate-500">
              Final-Year B.Tech / B.E. AI Capstone Project Demonstration.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platform Pages
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home Landing</Link>
              </li>
              <li>
                <Link to="/analyzer" className="hover:text-cyan-400 transition-colors">News Detection / AI Analyzer</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">AI Analytics Dashboard</Link>
              </li>
              <li>
                <Link to="/explorer" className="hover:text-cyan-400 transition-colors">News Explorer</Link>
              </li>
              <li>
                <Link to="/batch-analysis" className="hover:text-cyan-400 transition-colors">Batch News Analysis</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Benchmarks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              ML & Evaluation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/model-performance" className="hover:text-cyan-400 transition-colors">Model Performance & ROC</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-cyan-400 transition-colors">How It Works / NLP Pipeline</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-cyan-400 transition-colors">Analysis History Archive</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About Project & Viva Guide</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact & Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Core Tech Stack */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Scikit-Learn</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">TF-IDF NLP</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Passive-Aggressive</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Linear SVM</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">React + TS</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Tailwind CSS</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              Dataset: ISOT News Dataset & WELFake (44,898 records)
            </div>
          </div>
        </div>

        {/* Bottom copyright and academic disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} TRUTHGUARD AI. All rights reserved. Built for Academic Demonstration.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">IEEE / ACM Reference Design</span>
            <span>·</span>
            <span className="hover:text-slate-400">Zero-Fabrication Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
