import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Github, 
  MapPin, 
  Phone, 
  FileCheck2, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('model_feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast('error', 'Missing Fields', 'Please complete all required fields before submitting.');
      return;
    }

    // Basic email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      addToast('error', 'Invalid Email', 'Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = `TG-TICKET-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
      addToast('success', 'Feedback Transmitted', `Your submission was logged as ${ticketId}.`);
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 800);
  };

  const faqs = [
    {
      q: 'Can the machine learning model identify real-time breaking news?',
      a: 'The TF-IDF classifier assesses linguistic structures, emotional sensationalism, and attribution patterns rather than relying on an external live knowledge base. For breaking news, stories adhering to journalistic attribution (identifying authors, date-stamps, wire sources) will score high in credibility.'
    },
    {
      q: 'How does TruthGuard AI differentiate between satire and deliberate fake news?',
      a: 'Satirical articles (e.g. The Onion) often deliberately mimic journalistic style while exaggerating premises. Our classifier evaluates sensationalism and hyperbole indices, but nuanced irony occasionally falls into the "UNCERTAIN" range, where human editorial review is suggested.'
    },
    {
      q: 'Can I export the trained Scikit-learn model weights for my own project?',
      a: 'Yes. The Python training scripts and Scikit-learn pipeline specifications are fully documented in the About section and can be exported as a standard joblib/pickle pipeline file.'
    },
    {
      q: 'What benchmark datasets were utilized for cross-validation?',
      a: 'The system is evaluated against the University of Victoria ISOT Fake News Dataset (44,898 articles from Reuters and verified fact-check repositories) and the WELFake 2021 corpus.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
          <span>Feedback & Communications</span>
          <span aria-hidden="true">·</span>
          <span>Academic Project Inquiries</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Contact, Feedback & Verification Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Submit corrections, request dataset expansion, or connect with our academic project development team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Interactive Feedback Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Submit Feedback or Article Verification
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              All submissions are processed through our verification audit queue.
            </p>
          </div>

          {submittedTicket && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Feedback Successfully Received!</p>
                <p className="text-slate-300">
                  Your inquiry has been assigned tracking ticket <strong className="font-mono text-emerald-400">{submittedTicket}</strong>. Thank you for helping improve the TruthGuard AI model.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  Category / Purpose
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="model_feedback">Model Prediction Feedback</option>
                  <option value="verification_request">Article Verification Request</option>
                  <option value="dataset_suggestion">Dataset Suggestion</option>
                  <option value="academic_inquiry">Academic Viva / Collaboration</option>
                  <option value="bug_report">System Bug Report</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Model False Positive on Health Article"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">
                Message & Article Details <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide detailed feedback, URL, or article text you would like evaluated..."
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Transmitting Feedback...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* Right Column: Project & Lab Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-cyan-400" />
              Academic Laboratory Information
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Project Laboratory</strong>
                  <p className="text-slate-400">Department of Computer Science & Engineering, Artificial Intelligence Research Lab</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Contact</strong>
                  <p className="text-slate-400">research@truthguard-ai.ac.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Github className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Project Source Repository</strong>
                  <p className="text-slate-400">github.com/truthguard-ai/fake-news-classification</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed font-mono">
              Designed as a final-year B.Tech / B.E. AI capstone project demonstration under IEEE / ACM guidelines.
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-2 pt-1">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/60 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
