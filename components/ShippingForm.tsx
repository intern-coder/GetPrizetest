
import React, { useState } from 'react';
import { translations } from '../translations';

interface Props {
  onBack: () => void;
  onSubmit: (info: any) => void;
  language: 'zh' | 'en';
}

const ShippingForm: React.FC<Props> = ({ onBack, onSubmit, language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    address: '',
    zipCode: '',
  });

  const isFormValid = formData.name && formData.phone && formData.address;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md px-6 pt-12 pb-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all"
          >
            <span className="material-icons text-slate-600">chevron_left</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Step 3 of 3</span>
            <span className="font-bold text-sm">{t.ship_title}</span>
          </div>
          <div className="w-10"></div>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-[100%] rounded-full transition-all duration-1000"></div>
        </div>
      </header>

      <main className="flex-grow px-6 pb-32">
        <div className="mt-4 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <span className="material-icons text-primary text-3xl">celebration</span>
          </div>
          <h1 className="text-3xl font-black mb-2">{t.ship_title}</h1>
          <p className="text-slate-500 font-medium">{t.ship_subtitle}</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.ship_name}</label>
            <input
              type="text"
              placeholder={t.ship_name}
              className="w-full bg-white border border-slate-100 h-12 px-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.ship_phone}</label>
            <input
              type="tel"
              placeholder={t.ship_phone}
              className="w-full bg-white border border-slate-100 h-12 px-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.ship_province}</label>
              <input
                type="text"
                placeholder={t.ship_province}
                className="w-full bg-white border border-slate-100 h-12 px-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.ship_city}</label>
              <input
                type="text"
                placeholder={t.ship_city}
                className="w-full bg-white border border-slate-100 h-12 px-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.ship_address}</label>
            <textarea
              placeholder={t.ship_address}
              className="w-full bg-white border border-slate-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium resize-none"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.ship_zip}</label>
            <input
              type="text"
              placeholder={t.ship_zip}
              className="w-full bg-white border border-slate-100 h-12 px-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </form>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 pt-4 pb-8 flex flex-col gap-3">
        <button
          onClick={() => onSubmit(formData)}
          disabled={!isFormValid}
          className={`w-full bg-primary hover:bg-accent-red text-white py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center transition-transform active:scale-[0.98] mt-4 ${!isFormValid ? 'opacity-50 grayscale' : ''}`}
        >
          {t.ship_save}
        </button>
      </footer>
    </div>
  );
};

export default ShippingForm;
