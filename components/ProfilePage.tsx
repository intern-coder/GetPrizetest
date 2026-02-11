
import React from 'react';
import { UserState, Step } from '../types';

interface Props {
  userState: UserState;
  onBack: () => void;
  onNavigate: (step: Step) => void;
}

const ProfilePage: React.FC<Props> = ({ userState, onBack, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Header with Background */}
      <div className="relative pt-16 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-48 bg-primary rounded-b-[3rem] -z-10 shadow-xl shadow-primary/10"></div>
        
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md"
          >
            <span className="material-icons">settings</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
            <span className="material-icons">notifications_none</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
            <img 
              alt="Avatar" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/profile/128/128" 
            />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">活力新星</h2>
            <div className="flex items-center gap-1 mt-1 opacity-80">
              <span className="material-icons text-xs">verified</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">高级会员 · LV.2</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 -mt-4 relative z-10 pb-24">
        {/* Stats Grid */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-50 grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <p className="text-xl font-black text-slate-900">1</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">中奖次数</p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-xl font-black text-slate-900">{userState.rating ? 1 : 0}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">已发评价</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-slate-900">250</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">累计积分</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {[
            { icon: 'favorite', label: '我的收藏', color: 'text-pink-500' },
            { icon: 'place', label: '收货地址', color: 'text-blue-500' },
            { icon: 'card_giftcard', label: '优惠券', color: 'text-orange-500' },
            { icon: 'support_agent', label: '联系客服', color: 'text-primary' },
            { icon: 'info', label: '关于品牌', color: 'text-slate-400' },
          ].map((item, idx) => (
            <button 
              key={idx}
              className="w-full bg-white px-5 py-4 rounded-2xl flex items-center justify-between shadow-sm active:bg-slate-50 transition-all border border-slate-50/50"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${item.color}`}>
                  <span className="material-icons">{item.icon}</span>
                </div>
                <span className="font-bold text-slate-700 text-sm">{item.label}</span>
              </div>
              <span className="material-icons text-slate-300">chevron_right</span>
            </button>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-8 relative overflow-hidden bg-bg-dark rounded-3xl p-6 text-white shadow-2xl">
          <div className="relative z-10">
            <h3 className="font-black text-lg mb-1 italic">VITALITY CLUB</h3>
            <p className="text-[10px] text-white/60 mb-4 tracking-widest uppercase">邀请好友加入，双方均可获得积分</p>
            <button className="bg-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/30">
              立即分享
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-full opacity-20">
            <span className="material-icons text-[120px] absolute -right-4 -top-4">groups</span>
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
          <span className="text-[10px] mt-1 font-bold">抽奖</span>
        </button>
        <button 
          onClick={() => onNavigate(Step.ORDERS)}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="material-icons">receipt_long</span>
          <span className="text-[10px] mt-1 font-bold">订单</span>
        </button>
        <button 
          onClick={() => onNavigate(Step.PROFILE)}
          className="flex flex-col items-center text-primary"
        >
          <span className="material-icons">person</span>
          <span className="text-[10px] mt-1 font-bold">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfilePage;
