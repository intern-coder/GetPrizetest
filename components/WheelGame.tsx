
import React, { useState, useRef } from 'react';
import { Step } from '../types';

interface Props {
  onWin: (prize: string) => void;
  onNext: () => void;
  onNavigate: (step: Step) => void;
  currentStep: Step;
}

const prizes = [
  { text: '九折优惠', color: 'text-white' },
  { text: '免费样品', color: 'text-primary' },
  { text: '买一送一', color: 'text-white' },
  { text: '奖品 #2', color: 'text-primary' },
  { text: '八折优惠', color: 'text-white' },
  { text: '免费配送', color: 'text-primary' },
];

const WheelGame: React.FC<Props> = ({ onWin, onNext, onNavigate, currentStep }) => {
  const [spinning, setSpinning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);
    
    const extraTurns = 5;
    // We want to land on "奖品 #2" (Index 3)
    // Each slice is 60 degrees. Index 3 center is at roughly 180 + 30 = 210 degrees.
    // The pointer is at the top (0 deg). To align slice 3 with the top, we need to rotate 
    // the wheel by -(210) degrees or similar.
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = rotation + extraTurns * 360 + randomAngle;
    
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      onWin('1个月量装体验包');
      setShowPopup(true);
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light p-6 pb-24">
      <header className="flex items-center justify-between pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-icons text-lg">electric_bolt</span>
          </div>
          <span className="font-black text-xl tracking-tight">BEET<span className="text-primary">BOOST</span></span>
        </div>
        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-icons">help_outline</span>
        </button>
      </header>

      <main className="flex flex-col items-center flex-grow py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black mb-2 leading-tight">赢取红甜菜根粉！</h1>
          <p className="text-slate-500 text-sm max-w-[280px] mx-auto">
            转动转盘，赢取专属折扣和免费产品。
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative w-80 h-80 mb-12 flex items-center justify-center">
          {/* Pointer */}
          <div className="absolute -top-4 z-20 text-primary drop-shadow-md">
            <span className="material-icons text-5xl">arrow_drop_down</span>
          </div>
          
          <div 
            ref={wheelRef}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)' : 'none'
            }}
            className="w-full h-full rounded-full border-[10px] border-white shadow-2xl shadow-primary/20 overflow-hidden relative bg-white"
          >
            {/* SVG Slices */}
            <svg className="w-full h-full -rotate-[90deg]" viewBox="0 0 100 100">
              <path d="M 50 50 L 100 50 A 50 50 0 0 1 75 93.3 Z" fill="#ec1337"></path>
              <path d="M 50 50 L 75 93.3 A 50 50 0 0 1 25 93.3 Z" fill="#fce7e9"></path>
              <path d="M 50 50 L 25 93.3 A 50 50 0 0 1 0 50 Z" fill="#ec1337" opacity="0.9"></path>
              <path d="M 50 50 L 0 50 A 50 50 0 0 1 25 6.7 Z" fill="#fce7e9"></path>
              <path d="M 50 50 L 25 6.7 A 50 50 0 0 1 75 6.7 Z" fill="#ec1337" opacity="0.8"></path>
              <path d="M 50 50 L 75 6.7 A 50 50 0 0 1 100 50 Z" fill="#fce7e9"></path>
            </svg>

            {/* Prize Labels (Programmatically positioned) */}
            <div className="absolute inset-0 pointer-events-none">
              {prizes.map((prize, i) => {
                // Each slice is 60 degrees. We center the text in each slice.
                const angle = i * 60 + 30; 
                return (
                  <div 
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <span 
                      className={`absolute top-[12%] font-black text-[11px] tracking-tight ${prize.color}`}
                      style={{ transform: 'rotate(0deg)' }}
                    >
                      {prize.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Logo/Button */}
          <div className="absolute w-20 h-20 bg-white rounded-full shadow-xl z-10 flex items-center justify-center border-4 border-bg-light">
            <img 
              alt="Logo" 
              className="w-12 h-12 rounded-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPzo3rHj6Bb-2A2z9p53HmzcX6TuB6w0zIP7_XimskMGdjpfchMBIp7XNT2Z2r-N0otmgBEmzg5f3NM9nNRpfhqf4un2w4XF4GCMJU7FDcBjITBP8Hq9bIeKsoEJlagytWQtz42N594WukQqZS4xMxzqtGP_natEpopr96jZA57k5pt9eQg4LxRjZAQiQqsfPGnwh5nJ8VePJBvsVFsdohCFx2FILpmQeCFsr7JoAFQh4_ewJgzEOctUQCApLqtGyWLmYVNV_ZVdg" 
            />
          </div>
        </div>

        <button 
          onClick={startSpin}
          disabled={spinning}
          className={`w-full max-w-[280px] bg-primary text-white font-black py-5 rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg ${spinning ? 'opacity-50' : 'opacity-100'}`}
        >
          <span className="material-icons">{spinning ? 'autorenew' : 'refresh'}</span>
          {spinning ? '转动中...' : '立即抽奖'}
        </button>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <img 
                key={i}
                alt="User" 
                className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                src={`https://picsum.photos/seed/${i+10}/64/64`} 
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold border-2 border-white">+4k</div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">今天已有 4,281 人中奖</p>
        </div>
      </main>

      {/* Result Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-5xl">card_giftcard</span>
            </div>
            <h2 className="text-2xl font-black mb-2">恭喜中奖！</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              恭喜你抽中<span className="font-bold text-primary underline decoration-2 underline-offset-4">奖品 #2</span>！<br/>
              请提供反馈以领取奖品。
            </p>
            <div className="w-full bg-bg-light border border-primary/10 rounded-2xl p-4 mb-8">
              <p className="text-xs uppercase font-bold text-primary tracking-widest mb-1">您的奖励</p>
              <p className="text-lg font-black text-slate-900">1个月量装体验包</p>
            </div>
            <button 
              onClick={onNext}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-3 active:scale-[0.98] transition-all"
            >
              领奖并撰写反馈
              <span className="material-icons text-sm">chevron_right</span>
            </button>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-slate-400 text-xs font-medium tracking-widest hover:text-slate-600 transition-colors"
            >
              不，谢谢，我不需要
            </button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/80 backdrop-blur-md border-t border-slate-100 px-12 py-4 flex justify-between items-center z-40">
        <button 
          onClick={() => onNavigate(Step.GAME)}
          className={`flex flex-col items-center ${currentStep === Step.GAME ? 'text-primary' : 'text-slate-400'}`}
        >
          <span className="material-icons">auto_awesome</span>
          <span className="text-[10px] mt-1 font-bold">抽奖</span>
        </button>
        <button 
          onClick={() => onNavigate(Step.ORDERS)}
          className={`flex flex-col items-center ${currentStep === Step.ORDERS ? 'text-primary' : 'text-slate-400'}`}
        >
          <span className="material-icons">receipt_long</span>
          <span className="text-[10px] mt-1 font-bold">订单</span>
        </button>
        <button 
          onClick={() => onNavigate(Step.PROFILE)}
          className={`flex flex-col items-center ${currentStep === Step.PROFILE ? 'text-primary' : 'text-slate-400'}`}
        >
          <span className="material-icons">person</span>
          <span className="text-[10px] mt-1 font-bold">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default WheelGame;
