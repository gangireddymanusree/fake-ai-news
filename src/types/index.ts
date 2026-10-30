export type ClassificationLabel = 'REAL' | 'FAKE' | 'UNCERTAIN';

export type ModelAlgorithm = 
  | 'passive_aggressive' 
  | 'logistic_regression' 
  | 'naive_bayes' 
  | 'svm' 
  | 'random_forest' 
  | 'ensemble';

export interface KeywordWeight {
  word: string;
  weight: number; // positive indicates fake marker, negative indicates real marker
  category: 'sensationalism' | 'attribution' | 'sentiment' | 'clickbait' | 'verifiable';
}

export interface ModelPredictionDetail {
  algorithm: ModelAlgorithm;
  name: string;
  label: ClassificationLabel;
  confidence: number; // 0 - 100
  rawScore: number;
}

export interface LinguisticMetrics {
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
  lexicalDiversity: number; // 0 - 1 (unique words / total words)
  sensationalismScore: number; // 0 - 100
  subjectivityScore: number; // 0 - 100
  clickbaitScore: number; // 0 - 100
  sentimentPolarity: 'Negative' | 'Neutral' | 'Positive';
}

export interface AnalysisResult {
  id: string;
  headline: string;
  content: string;
  timestamp: string;
  label: ClassificationLabel;
  confidence: number; // 0 - 100
  credibilityScore: number; // 0 - 100
  primaryModel: ModelAlgorithm;
  modelsBreakdown: ModelPredictionDetail[];
  topKeywords: KeywordWeight[];
  linguisticMetrics: LinguisticMetrics;
  summaryExplanation: string;
  category?: NewsCategory;
  sourceUrl?: string;
}

export type NewsCategory = 
  | 'Politics' 
  | 'Technology' 
  | 'Sports' 
  | 'Entertainment' 
  | 'Business' 
  | 'Health' 
  | 'Science' 
  | 'World News';

export interface NewsArticleItem {
  id: string;
  headline: string;
  summary: string;
  content: string;
  category: NewsCategory;
  date: string;
  source: string;
  label: ClassificationLabel;
  confidence: number;
  credibilityScore: number;
  author?: string;
  keyPhrases: string[];
}

export interface ModelBenchmark {
  id: ModelAlgorithm;
  name: string;
  fullName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTimeSec: number;
  inferenceTimeMs: number;
  description: string;
  strengths: string;
}

export interface ConfusionMatrixData {
  trueReal: number;
  falseFake: number; // Type I error
  falseReal: number; // Type II error
  trueFake: number;
  totalSamples: number;
}

export interface BatchItemResult {
  id: string;
  index: number;
  headline: string;
  contentSnippet: string;
  label: ClassificationLabel;
  confidence: number;
  credibilityScore: number;
  status: 'completed' | 'processing' | 'error';
  errorMessage?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
