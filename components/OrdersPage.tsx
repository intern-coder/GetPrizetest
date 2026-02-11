
import React from 'react';
import { UserState, Step } from '../types';

interface Props {
  userState: UserState;
  onBack: () => void;
  onNavigate: (step: Step) => void;
}

const OrdersPage: React.FC<Props> = ({ userState, onBack, onNavigate }) => {
  const hasOrder = !!userState.shippingInfo;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md px-6 pt-12 pb-4 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all"
          >
            <span className="material-icons text-slate-600">chevron_left</span>
          </button>
          <h1 className="font-black text-lg tracking-tight">我的订单</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow p-6 pb-24">
        <div className="flex gap-4 mb-8">
          {['全部', '待收货', '待评价', '退换/售后'].map((tab, idx) => (
            <button 
              key={tab} 
              className={`text-sm font-bold pb-1 transition-all ${idx === 1 ? 'text-primary border-b-2 border-primary' : 'text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {!hasOrder ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <span className="material-icons text-4xl">receipt_long</span>
            </div>
            <p className="text-slate-400 font-medium">暂无订单记录</p>
            <button 
              onClick={() => onNavigate(Step.GAME)}
              className="mt-4 text-primary font-bold text-sm underline underline-offset-4"
            >
              去参与活动赢奖励
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-xl shadow-primary/5 border border-slate-50">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-primary text-sm">local_shipping</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">订单编号: RTD-20240325</span>
                </div>
                <span className="text-primary font-black text-xs uppercase">待发货</span>
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 bg-bg-light rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img 
                    alt="Product" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ot6wVf_fbl-25kbLuktTQIzoO_VrGkLSFHk9ciWkytEBtBJ6sX1wh4GXL9jLrxKpp8xujQvSXi_l5WjOw9AS5BLgIfw5HplVIN74gB9MVNAnhwEomm9VET1nrxhhlUukXGWtCia_jfPAmMk7vHP3P7pcmwWm5sP-EIgAOrNkCdeG3be0UeO5qq-PAE_9v1acj48-01JWdE9lAGwK5duLnkBKGEhAGhwUuYkad1pOrKYcjXKWcOE4XWwir7GAubjpBbtKx7V-N9c" 
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-slate-900 leading-tight mb-1">天然能量活力红甜菜粉</h3>
                  <p className="text-[11px] text-slate-500 mb-1">规格: 30天量装体验包</p>
                  <div className="flex items-center text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full w-fit">
                    奖品兑换
                  </div>
                </div>
              </div>

              <div className="bg-bg-light/50 rounded-2xl p-4 mb-6 space-y-2">
                <div className="flex gap-3">
                  <span className="material-icons text-slate-400 text-sm mt-0.5">place</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{userState.shippingInfo?.name} {userState.shippingInfo?.phone}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">{userState.shippingInfo?.province}{userState.shippingInfo?.city}{userState.shippingInfo?.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 active:bg-slate-50 transition-colors">
                  修改地址
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-[11px] font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
                  查看进度
                </button>
              </div>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 mt-8">
              只显示近 3 个月的订单记录
            </p>
          </div>
        )}
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
          className="flex flex-col items-center text-primary"
        >
          <span className="material-icons">receipt_long</span>
          <span className="text-[10px] mt-1 font-bold">订单</span>
        </button>
        <button 
          onClick={() => onNavigate(Step.PROFILE)}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="material-icons">person</span>
          <span className="text-[10px] mt-1 font-bold">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default OrdersPage;
