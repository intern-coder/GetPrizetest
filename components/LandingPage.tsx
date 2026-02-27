import React from 'react';
import { translations } from '../translations';

interface Props {
  onStart: () => void;
  language: 'zh' | 'en';
}

const LandingPage: React.FC<Props> = ({ onStart, language }) => {
  const t = translations[language];

  return (
    <div className="flex flex-col min-h-screen bg-bg-light relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-red/10 rounded-full blur-[100px] -ml-40 -mb-20"></div>

      <main className="flex-grow flex flex-col items-center justify-center px-8 relative z-10 pt-20">
        {/* Hero Section */}
        <div className="w-full max-w-xs animate-in fade-in zoom-in duration-1000">
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/30 transition-all duration-700"></div>
            <img
              src="/stick_box.jpg"
              alt="NITRIC OXIDE VITAL"
              className="w-full h-auto drop-shadow-2xl translate-y-0 group-hover:-translate-y-4 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        <div className="text-center space-y-4 mb-20">
          <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            {t.landing_title}
          </h1>
          <p className="text-slate-500 font-medium max-w-[280px] mx-auto text-lg leading-relaxed">
            {t.landing_subtitle}
          </p>
        </div>

        {/* CTAs */}
        <div className="w-full space-y-4">
          <button
            onClick={onStart}
            className="w-full bg-primary hover:bg-accent-red text-white py-5 rounded-3xl font-black text-xl shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <span>{t.landing_start}</span>
            <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>

          <p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-widest opacity-60 px-4 mt-6 leading-relaxed">
            {t.landing_terms}
          </p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
