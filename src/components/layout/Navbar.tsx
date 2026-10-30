import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  BarChart3, 
  Compass, 
  Layers, 
  Cpu, 
  Workflow, 
  History, 
  BookOpen, 
  Mail,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: ShieldCheck },
    { name: 'AI Analyzer', path: '/analyzer', icon: Zap },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'News Explorer', path: '/explorer', icon: Compass },
    { name: 'Batch Analysis', path: '/batch-analysis', icon: Layers },
    { name: 'Model Performance', path: '/model-performance', icon: Cpu },
    { name: 'How It Works', path: '/how-it-works', icon: Workflow },
    { name: 'History', path: '/history', icon: History },
    { name: 'About', path: '/about', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85 light:bg-white/90 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single text element Brand wordmark */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white dark:text-white light:text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              TRUTHGUARD<span className="text-white dark:text-white light:text-slate-900">AI</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-600">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-cyan-400 bg-cyan-950/40 font-semibold border border-cyan-500/20 shadow-sm'
                      : 'hover:text-cyan-300 hover:bg-slate-800/40 light:hover:bg-slate-100 text-slate-300 light:text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Secondary compact menu for medium screens (lg/md) */}
          <nav className="hidden md:flex xl:hidden items-center gap-1 text-xs font-medium text-slate-300">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 py-1.5 rounded-lg whitespace-nowrap shrink-0 text-xs ${
                  isActive(link.path)
                    ? 'text-cyan-400 font-semibold bg-cyan-950/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/model-performance"
              className={`px-2 py-1.5 rounded-lg whitespace-nowrap shrink-0 text-xs ${
                isActive('/model-performance') ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              More...
            </Link>
          </nav>

          {/* Zone 3: Actions (Analyze Button + Theme Toggle + Mobile Menu Trigger) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              aria-label="Toggle color theme"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <Link
              to="/analyzer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Analyze News
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Open mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-cyan-400/80" />
                  <span className="truncate">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <Link
              to="/analyzer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
            >
              <Zap className="w-4 h-4 fill-current" />
              Launch News Analyzer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
