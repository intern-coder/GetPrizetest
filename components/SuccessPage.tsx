
import React from 'react';

interface Props {
  onReset: () => void;
  onViewOrders: () => void;
}

const SuccessPage: React.FC<Props> = ({ onReset, onViewOrders }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <span className="material-icons text-green-500 text-6xl">check_circle</span>
      </div>
      
      <h1 className="text-3xl font-black mb-4">领取成功！</h1>
      <p className="text-slate-500 mb-12 leading-relaxed">
        您的奖品已经在准备中了！<br/>
        预计 3-5 个工作日内寄达。<br/>
        感谢您的参与和支持。
      </p>

      <div className="w-full space-y-4">
        <button 
          onClick={onViewOrders}
          className="w-full bg-slate-100 text-slate-900 font-bold py-4 rounded-2xl active:scale-[0.98] transition-all"
        >
          查看订单详情
        </button>
        <button 
          onClick={onReset}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        >
          返回首页
        </button>
      </div>

      <div className="mt-12 text-slate-300">
        <span className="material-icons text-4xl">energy_savings_leaf</span>
        <p className="text-xs uppercase font-black tracking-widest mt-2">Rooted Vitality</p>
      </div>
    </div>
  );
};

export default SuccessPage;
