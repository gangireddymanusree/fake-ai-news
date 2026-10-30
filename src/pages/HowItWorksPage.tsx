import React, { useState } from 'react';
import { 
  Workflow, 
  Binary, 
  Cpu, 
  Layers, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  ArrowDown, 
  ArrowRight,
  Code2,
  Terminal,
  Calculator,
  Zap,
  Info
} from 'lucide-react';
import { STOPWORDS, VOCABULARY_WEIGHTS } from '../ml/engine';

export const HowItWorksPage: React.FC = () => {
  // Interactive Live Pipeline Simulator State
  const [simText, setSimText] = useState(
    'SHOCKING: Federal Reserve spokesperson confirmed the secret report leaked on Thursday!'
  );
  const [activeStage, setActiveStage] = useState<number>(1);

  // Compute live pipeline transformations
  // Stage 1: Raw text
  const stage1Raw = simText;

  // Stage 2: Cleaned
  const stage2Cleaned = simText
    .toLowerCase()
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/[^\w\s'-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Stage 3: Tokens
  const stage3Tokens = stage2Cleaned.split(/\s+/).filter(Boolean);

  // Stage 4: Stopwords removed
  const stage4Filtered = stage3Tokens.filter(t => !STOPWORDS.has(t));
  const removedStopwords = stage3Tokens.filter(t => STOPWORDS.has(t));

  // Stage 5: TF-IDF feature mappings
  const stage5TfIdf = stage4Filtered.map(t => {
    const vocabEntry = VOCABULARY_WEIGHTS[t];
    return {
      token: t,
      tf: (stage4Filtered.filter(x => x === t).length / Math.max(1, stage4Filtered.length)).toFixed(3),
      weight: vocabEntry ? vocabEntry.weight : 0.05,
      category: vocabEntry ? vocabEntry.category : 'neutral'
    };
  });

  const pipelineStages = [
    {
      num: '01',
      title: 'Content Ingestion & Regex Preprocessing',
      icon: FileText,
      tag: 'Data Sanitization',
      summary: 'Raw headline and article texts undergo URL stripping, lowercase normalization, and contraction expansion to eliminate typographic noise.',
      tech: 'Python re / Regex pattern matching'
    },
    {
      num: '02',
      title: 'Tokenization & Grammatical Splitting',
      icon: Binary,
      tag: 'Lexical Parsing',
      summary: 'Prose is segmented into discrete lexical units (unigrams and bigrams). Punctuation boundaries are preserved where indicative of sensationalism (e.g., exclamation marks).',
      tech: 'NLTK word_tokenize / Scikit-Learn Analyzer'
    },
    {
      num: '03',
      title: 'Stopword Elimination',
      icon: Layers,
      tag: 'Dimensionality Reduction',
      summary: 'High-frequency function words ("the", "is", "at", "which") are filtered out using the standard NLTK English stopword lexicon, isolating high-entropy semantic content.',
      tech: 'NLTK Corpus / Scikit-Learn stop_words="english"'
    },
    {
      num: '04',
      title: 'TF-IDF Feature Vectorization',
      icon: Calculator,
      tag: 'Mathematical Encoding',
      summary: 'Words are converted into high-dimensional numerical vectors using Term Frequency-Inverse Document Frequency, weighting unique discriminatory terms over generic language.',
      tech: 'TfidfVectorizer(max_features=10000, ngram_range=(1,2))'
    },
    {
      num: '05',
      title: 'Supervised Machine Learning Classification',
      icon: Cpu,
      tag: 'Model Inference',
      summary: 'Vectors are passed to linear and ensemble classifiers (Passive-Aggressive, SVM, Logistic Regression, Naive Bayes) computing hyperplanes and class posteriors.',
      tech: 'PassiveAggressiveClassifier(max_iter=50, C=0.5)'
    },
    {
      num: '06',
      title: 'Decision Boundary & Confidence Computation',
      icon: Zap,
      tag: 'Probability Calibration',
      summary: 'Distance from the decision boundary is mapped via calibrated sigmoid scaling to derive a confidence percentage and a 0-100 journalistic credibility score.',
      tech: 'Sigmoid Probability Calibration'
    },
    {
      num: '07',
      title: 'Explainable AI (XAI) Feature Attribution',
      icon: Sparkles,
      tag: 'Model Transparency',
      summary: 'Influential n-grams and stylistic patterns (sensationalism index, attribution markers, subjectivity) are surfaced with explanatory summaries.',
      tech: 'Feature Weight Backpropagation & Linguistic Metrics'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <span>Natural Language Processing Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Educational Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            How TruthGuard AI Classifies News Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            A comprehensive breakdown of the Natural Language Processing and Machine Learning pipeline that translates raw journalistic text into verified credibility intelligence.
          </p>
        </div>
      </div>

      {/* Interactive Live Pipeline Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              Live Interactive Pipeline Simulator
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Watch Text Transform Through Every NLP Stage
            </h3>
          </div>
          <div className="text-xs text-slate-400">
            Edit text below to see live tokenization & vectorization
          </div>
        </div>

        {/* Input box */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Input Sample Sentence:
          </label>
          <input
            type="text"
            value={simText}
            onChange={(e) => setSimText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Stage Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
          {[
            { id: 1, label: '1. Raw Text' },
            { id: 2, label: '2. Cleaned Regex' },
            { id: 3, label: '3. Tokenized' },
            { id: 4, label: '4. Stopwords Stripped' },
            { id: 5, label: '5. TF-IDF Vectors' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveStage(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                activeStage === tab.id
                  ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Stage Output Display */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-200 min-h-[120px] flex flex-col justify-center">
          {activeStage === 1 && (
            <div>
              <span className="text-slate-500 text-[11px] block mb-1">// Raw prose input</span>
              <p className="text-slate-200">{stage1Raw}</p>
            </div>
          )}

          {activeStage === 2 && (
            <div>
              <span className="text-slate-500 text-[11px] block mb-1">// Normalized & punctuation stripped</span>
              <p className="text-cyan-300">{stage2Cleaned}</p>
            </div>
          )}

          {activeStage === 3 && (
            <div>
              <span className="text-slate-500 text-[11px] block mb-2">
                // Token array ({stage3Tokens.length} discrete tokens)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stage3Tokens.map((tok, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    "{tok}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeStage === 4 && (
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-[11px] block mb-1">
                  // Informative Content Tokens ({stage4Filtered.length} retained)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stage4Filtered.map((tok, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block mb-1">
                  // Removed Function Stopwords ({removedStopwords.length} stripped)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {removedStopwords.map((tok, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 line-through text-[11px]">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStage === 5 && (
            <div>
              <span className="text-slate-500 text-[11px] block mb-2">
                // Computed TF-IDF Weight Matrix
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800">
                      <th className="py-1 px-2">Feature Token</th>
                      <th className="py-1 px-2">Term Frequency (TF)</th>
                      <th className="py-1 px-2">Feature Weight</th>
                      <th className="py-1 px-2">Semantic Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {stage5TfIdf.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-1.5 px-2 text-cyan-300 font-bold">{item.token}</td>
                        <td className="py-1.5 px-2 tabular-nums">{item.tf}</td>
                        <td className={`py-1.5 px-2 tabular-nums font-bold ${
                          item.weight > 0.5 ? 'text-rose-400' : item.weight < 0 ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          {item.weight > 0 ? `+${item.weight}` : item.weight}
                        </td>
                        <td className="py-1.5 px-2 capitalize text-slate-400">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete 7-Stage Architectural Diagram Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            End-to-End System Pipeline Stages
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            7 Sequential Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-cyan-400 font-bold text-xs">
                      PHASE {stage.num}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {stage.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {stage.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">
                    Implementation:
                  </span>
                  <code className="text-[11px] font-mono text-slate-300 block truncate mt-0.5">
                    {stage.tech}
                  </code>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Formulas Reference Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-400" />
          Mathematical & Algorithmic Formulations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold block text-[11px]">
              1. TF-IDF Weight Calculation
            </span>
            <div className="p-3 rounded bg-slate-900 text-center font-bold text-slate-200">
              w(t, d) = TF(t, d) × ln( (1 + N) / (1 + DF(t)) ) + 1
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Where $TF(t, d)$ represents frequency of term $t$ in document $d$, and $DF(t)$ represents the number of documents containing $t$ in corpus of size $N$.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-purple-400 font-bold block text-[11px]">
              2. Passive-Aggressive Update Rule
            </span>
            <div className="p-3 rounded bg-slate-900 text-center font-bold text-slate-200">
              w_{'{t+1}'} = w_t + ( l_t / ||x_t||² ) · y_t · x_t
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Updates weights aggressively if the hinge loss $l_t = \max(0, 1 - y_t(w_t \cdot x_t)) &gt; 0$, ensuring maximum margin convergence in high-speed text streams.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold block text-[11px]">
              3. Sigmoid Probability Calibration
            </span>
            <div className="p-3 rounded bg-slate-900 text-center font-bold text-slate-200">
              P(Fake | x) = 1 / ( 1 + exp( - (w·x + b) ) )
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Transforms raw distance from the separating hyperplane into a strictly calibrated authenticity probability distribution between 0.0 and 1.0.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
