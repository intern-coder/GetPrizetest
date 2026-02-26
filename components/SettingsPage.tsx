
import React from 'react';
import { translations } from '../translations';

interface Props {
    language: 'zh' | 'en';
    setLanguage: (lang: 'zh' | 'en') => void;
    onBack: () => void;
}

const SettingsPage: React.FC<Props> = ({ language, setLanguage, onBack }) => {
    const t = translations[language];

    return (
        <div className="flex flex-col min-h-screen bg-bg-light">
            <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md px-6 pt-12 pb-4 border-b border-slate-100">
                <div className="flex items-center">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all"
                    >
                        <span className="material-icons text-slate-600">chevron_left</span>
                    </button>
                    <h1 className="flex-1 text-center font-black text-lg tracking-tight mr-10">{t.settings_title}</h1>
                </div>
            </header>

            <main className="p-6 space-y-8">
                <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">{t.settings_common}</h2>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50">
                        <div className="p-4 flex items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <span className="material-icons text-blue-500 text-sm">language</span>
                                </div>
                                <span className="font-bold text-slate-700">{t.settings_lang}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setLanguage('zh')}
                            className="w-full p-4 flex items-center justify-between active:bg-slate-50 transition-colors"
                        >
                            <span className={`text-sm font-medium ${language === 'zh' ? 'text-primary font-bold' : 'text-slate-600'}`}>简体中文</span>
                            {language === 'zh' && <span className="material-icons text-primary">check</span>}
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className="w-full p-4 flex items-center justify-between active:bg-slate-50 transition-colors"
                        >
                            <span className={`text-sm font-medium ${language === 'en' ? 'text-primary font-bold' : 'text-slate-600'}`}>English</span>
                            {language === 'en' && <span className="material-icons text-primary">check</span>}
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">{t.settings_about}</h2>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                    <span className="material-icons text-slate-400 text-sm">info</span>
                                </div>
                                <span className="font-bold text-slate-700">{t.settings_version}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-300">v1.2.5</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
