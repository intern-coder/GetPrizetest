import React from 'react';
import { UserState, Step } from '../types';
import { logout } from '../api';
import { translations } from '../translations';

interface Props {
  userState: UserState;
  onBack: () => void;
  onNavigate: (step: Step) => void;
  language: 'zh' | 'en';
}

const ProfilePage: React.FC<Props> = ({ userState, onBack, onNavigate, language }) => {
  const phone = localStorage.getItem('rv_user_phone');
  const t = translations[language];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Header with Background */}
      <div className="relative pt-16 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-48 bg-primary rounded-b-[3rem] -z-10 shadow-xl shadow-primary/10"></div>

        <div className="flex items-center justify-between mb-8">
          <div className="w-10"></div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
            <span className="material-icons">notifications_none</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-slate-900">
          <div className="w-20 h-20 rounded-full border-4 border-black/10 overflow-hidden shadow-2xl bg-white/20 flex items-center justify-center text-slate-900">
            <span className="material-icons text-5xl">person</span>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">{phone || '未登录'}</h2>
            <div className="flex items-center gap-1 mt-1 opacity-70">
              <span className="material-icons text-xs">verified</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{t.profile_verified}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 -mt-4 relative z-10 pb-24">
        {/* Stats Grid */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-50 grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <p className="text-xl font-black text-slate-900">{userState.hasSpun ? 1 : 0}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{t.profile_wins}</p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-xl font-black text-slate-900">{userState.rating ? 1 : 0}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{t.profile_feedbacks}</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-slate-900">100</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{t.profile_points}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {[
            { icon: 'place', label: t.profile_address, color: 'text-blue-500', action: () => { } },
            { icon: 'support_agent', label: t.profile_contact, color: 'text-primary', action: () => { } },
            {
              icon: 'settings',
              label: t.profile_settings,
              color: 'text-slate-500',
              action: () => onNavigate(Step.SETTINGS)
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm active:scale-[0.98] transition-all border border-slate-50"
            >
              <div className="flex items-center gap-4">
                <span className={`material-icons ${item.color}`}>{item.icon}</span>
                <span className="font-bold text-slate-700">{item.label}</span>
              </div>
              <span className="material-icons text-slate-300">chevron_right</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full mt-6 p-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest active:bg-slate-50 transition-all"
          >
            {t.profile_logout}
          </button>

          <div className="pt-10 pb-4 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              DOBEL Quality Guaranteed
            </p>
          </div>
        </div>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/80 backdrop-blur-md border-t border-slate-100 px-12 py-4 flex justify-between items-center z-40">
        <button
          onClick={() => onNavigate(Step.GAME)}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="material-icons">auto_awesome</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_game}</span>
        </button>
        <button
          onClick={() => onNavigate(Step.ORDERS)}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="material-icons">receipt_long</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_orders}</span>
        </button>
        <button
          onClick={() => onNavigate(Step.PROFILE)}
          className="flex flex-col items-center text-primary"
        >
          <span className="material-icons">person</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_profile}</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfilePage;
