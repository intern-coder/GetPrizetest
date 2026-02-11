
import React from 'react';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen pb-64">
      {/* Hero Header */}
      <div className="relative w-full h-[45vh] overflow-hidden">
        <img 
          alt="Rooted Product" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc32NddWw9tnNIHHTInab6TC6fu9j-LUObPw-tMmW1S_oT021u9fGkvuUWGOK8RWJDO8gDX-1XMJzt1t2B2a9JkDcVRqm-WHypDPITNPincqKIEHt63zNy2BRq9qJekuFjDr_TJ76iHy9VK7HyGmYWKn2_Ja_yRYRIInwlst9ljiiKw2k9cMjwWhoL2f6-Lg1IVsrHo-y34kBsIjJw9ZBgM6VbGouyjdf8bLdwU43wf0mIEWdx4NKWkDBI_Zy6or7S4rr9BKUGatM" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full ios-safe-top px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg">
              <span className="material-icons text-white text-lg leading-none">energy_savings_leaf</span>
            </div>
            <span className="font-black text-lg tracking-wider text-white drop-shadow-md">ROOTED.</span>
          </div>
          <div className="bg-black/20 glass-effect px-3 py-1 rounded-full border border-white/20">
            <span className="text-white text-xs font-medium">品质优选</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 relative z-10 flex-grow">
        <div className="mb-8">
          <h1 className="text-[2.2rem] font-black leading-tight mb-4 tracking-tight">
            用 <span className="text-primary">天然能量</span><br/>开启活力每一天
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            体验有机甜菜根的自然伟力。每一勺都能提升一氧化氮水平，增强耐力，守护心脏健康。
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { icon: 'bolt', title: '天然能量', desc: '持久保持巅峰状态' },
            { icon: 'favorite', title: '心脏健康', desc: '促进血液循环' },
            { icon: 'eco', title: '100% 有机', desc: '纯净配方' },
            { icon: 'verified', title: '品质认证', desc: '非转基因标准' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-all">
              <div className="bg-primary/5 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden bg-primary rounded-3xl p-6 text-white shadow-xl shadow-primary/20 mb-8">
          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-3">
              限时福利
            </span>
            <h2 className="text-xl font-bold mb-2">赢取 6个月 免费供应</h2>
            <p className="text-sm text-white/80 leading-snug">
              分享您对新配方的真实反馈，即可自动参与我们的每月大抽奖！
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto glass-effect bg-white/90 border-t border-slate-200 px-6 pt-5 pb-6 ios-safe-bottom z-50">
        <button 
          onClick={onStart}
          className="w-full bg-primary hover:bg-accent-red text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 mb-5 flex items-center justify-center transition-transform active:scale-[0.98] text-base"
        >
          立即参与抽奖
          <span className="material-icons ml-2 text-xl">arrow_forward</span>
        </button>
        <div className="flex items-center space-x-3 mb-5">
          <div className="h-[1px] bg-slate-200 flex-1"></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">请登录后参与</span>
          <div className="h-[1px] bg-slate-200 flex-1"></div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 py-3.5 rounded-xl active:bg-slate-50 transition-colors">
            <img 
              alt="Google" 
              className="w-5 h-5" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACPdfdLQBuhmDxecGQabPMtcT3UR_gsbqzCahF41rzY-RzSZGXsmhdx98TnZp1quP-WNe1BwaeB9LhHsvC9KNXUx7KsXvwEmSPUPEF8Y_jBzQI8s58K6-afYSDMmy9a1X6r7RjIPZwJh2VwTMdniua_9YMR8_5g3CrF-bHdrbEYQwSycRtF7DwBhKv7CQNOEWYwXfLPveXpnw_pFHMzktSEOnFDDw0Jd012Q9ssy5TOuSWEaXsMhVdILku_9xdeMo4_Ktnq4rbW4o" 
            />
            <span className="text-sm font-bold">Google 登录</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 py-3.5 rounded-xl active:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-slate-600 text-xl">smartphone</span>
            <span className="text-sm font-bold">手机注册</span>
          </button>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            参与即视为您同意我们的 <a className="underline text-slate-500" href="#">服务条款</a> 与 <a className="underline text-slate-500" href="#">隐私政策</a>
            <br/>无需购买即可参加。
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
