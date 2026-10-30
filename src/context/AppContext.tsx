import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnalysisResult, ToastMessage } from '../types';
import { classifyNewsArticle } from '../ml/engine';
import { SAMPLE_EXPLORER_ARTICLES } from '../data/sampleArticles';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  history: AnalysisResult[];
  addToHistory: (result: AnalysisResult) => void;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
  activeResult: AnalysisResult | null;
  setActiveResult: (result: AnalysisResult | null) => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  stats: {
    totalAnalyzed: number;
    realCount: number;
    fakeCount: number;
    uncertainCount: number;
    avgConfidence: number;
    realPercentage: number;
    fakePercentage: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('truthguard_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // History state
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    const saved = localStorage.getItem('truthguard_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
    // Seed with realistic analyzed articles
    return SAMPLE_EXPLORER_ARTICLES.slice(0, 5).map(art => {
      const res = classifyNewsArticle(art.headline, art.content, 'ensemble');
      return {
        ...res,
        timestamp: new Date(art.date).toISOString(),
        category: art.category
      };
    });
  });

  // Active result state
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme to HTML tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('truthguard_theme', theme);
  }, [theme]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('truthguard_history', JSON.stringify(history));
  }, [history]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToHistory = (result: AnalysisResult) => {
    setHistory(prev => [result, ...prev.filter(item => item.id !== result.id)]);
  };

  const deleteFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Record Removed', 'The analysis record was deleted from your local history.');
  };

  const clearHistory = () => {
    setHistory([]);
    addToast('warning', 'History Cleared', 'All stored classification records have been wiped.');
  };

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Compute live statistics
  const totalAnalyzed = history.length;
  const realCount = history.filter(h => h.label === 'REAL').length;
  const fakeCount = history.filter(h => h.label === 'FAKE').length;
  const uncertainCount = history.filter(h => h.label === 'UNCERTAIN').length;
  const avgConfidence = totalAnalyzed > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.confidence, 0) / totalAnalyzed) 
    : 94;
  const realPercentage = totalAnalyzed > 0 ? Math.round((realCount / totalAnalyzed) * 100) : 50;
  const fakePercentage = totalAnalyzed > 0 ? Math.round((fakeCount / totalAnalyzed) * 100) : 50;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        history,
        addToHistory,
        deleteFromHistory,
        clearHistory,
        activeResult,
        setActiveResult,
        toasts,
        addToast,
        removeToast,
        stats: {
          totalAnalyzed,
          realCount,
          fakeCount,
          uncertainCount,
          avgConfidence,
          realPercentage,
          fakePercentage
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
