
import React from 'react';
import { translations } from '../translations';

interface Props {
  onReset: () => void;
  onViewOrders: () => void;
  language: 'zh' | 'en';
}

const SuccessPage: React.FC<Props> = ({ onReset, onViewOrders, language }) => {
  const t = translations[language];

  return (
    <div className="flex flex-col min-h-screen bg-bg-light p-6">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Animated Success Badge */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 animate-in zoom-in duration-700">
            <span className="material-icons text-white text-6xl">check_circle</span>
          </div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          {t.success_title}
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 max-w-[280px]">
          {t.success_desc}
        </p>

        <div className="w-full space-y-4">
          <button
            onClick={onViewOrders}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-icons">receipt_long</span>
            {t.success_view_orders}
          </button>

          <button
            onClick={onReset}
            className="w-full bg-white border border-slate-100 text-slate-500 font-bold py-5 rounded-3xl shadow-sm active:scale-[0.98] transition-all"
          >
            {t.success_back}
          </button>
        </div>
      </main>

      <footer className="py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-primary opacity-60">
          <span className="material-icons text-sm">verified</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Rooted Quality Guaranteed</span>
        </div>
      </footer>
    </div>
  );
};

export default SuccessPage;
