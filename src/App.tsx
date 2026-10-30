/**
 * TRUTHGUARD AI - Intelligent Fake News Classification System
 * Final-Year AI Project Architecture
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';

// 10 Independent Pages
import { HomePage } from './pages/HomePage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { BatchAnalysisPage } from './pages/BatchAnalysisPage';
import { ModelPerformancePage } from './pages/ModelPerformancePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 transition-colors duration-200">
          {/* Top Navigation Bar */}
          <Navbar />

          {/* Main Viewport */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyzer" element={<AnalyzerPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/explorer" element={<ExplorerPage />} />
              <Route path="/batch-analysis" element={<BatchAnalysisPage />} />
              <Route path="/model-performance" element={<ModelPerformancePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Toast Notifications */}
          <ToastContainer />

          {/* Academic & Platform Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
