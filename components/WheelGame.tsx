
import React, { useState, useRef } from 'react';
import { Step } from '../types';
import { translations } from '../translations';

interface Props {
  onWin: (prize: string) => Promise<void>;
  onNext: () => void;
  onNavigate: (step: Step) => void;
  currentStep: Step;
  language: 'zh' | 'en';
}

const prizes = [
  { text: '奖品 #1', color: 'text-white' },
  { text: '免费样品', color: 'text-primary' },
  { text: '奖品 #3', color: 'text-white' },
  { text: '1个月量装', color: 'text-primary' },
  { text: '八折优惠', color: 'text-white' },
  { text: '免费配送', color: 'text-primary' },
];

const WheelGame: React.FC<Props> = ({ onWin, onNext, onNavigate, currentStep, language }) => {
  const [spinning, setSpinning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);

    const extraTurns = 5;
    // 恢复旧版的逻辑：随机旋转但在回调中给固定奖品（或者按视觉逻辑给）
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = rotation + extraTurns * 360 + randomAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      // 保持之前的 1个月量装体验包 奖品
      onWin(language === 'zh' ? '1个月量装体验包' : '1 Month Supply Pack');
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
          <h1 className="text-3xl font-black mb-2 leading-tight">
            {language === 'zh' ? '赢取红甜菜根粉！' : 'Win Beetroot Powder!'}
          </h1>
          <p className="text-slate-500 text-sm max-w-[280px] mx-auto">
            {language === 'zh' ? '转动转盘，赢取专属折扣和免费产品。' : 'Spin the wheel to win exclusive discounts and free products.'}
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

            {/* Prize Labels */}
            <div className="absolute inset-0 pointer-events-none">
              {prizes.map((prize, i) => {
                const angle = i * 60 + 30;
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <span
                      className={`absolute top-[12%] font-black text-[11px] tracking-tight ${prize.color}`}
                    >
                      {prize.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Logo */}
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
          {spinning ? (language === 'zh' ? '转动中...' : 'Spinning...') : (language === 'zh' ? '立即抽奖' : 'Spin Now')}
        </button>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <img
                key={i}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src={`https://picsum.photos/seed/${i + 10}/64/64`}
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold border-2 border-white">+4k</div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
            {language === 'zh' ? '今天已有 4,281 人中奖' : '4,281 people won today'}
          </p>
        </div>
      </main>

      {/* Result Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-5xl">card_giftcard</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">
              {t.game_congrats}
            </h2>
            <div className="bg-primary/5 rounded-2xl py-3 px-4 mb-6">
              <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">
                {t.game_won_prize}
              </p>
              <p className="text-xl font-black text-primary lowercase tracking-tight">
                {language === 'zh' ? '1个月量装体验包' : '1 Month Supply Pack'}
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full bg-primary hover:bg-accent-red text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {t.game_claim}
              <span className="material-icons">arrow_forward</span>
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-slate-400 text-xs font-medium tracking-widest hover:text-slate-600 transition-colors"
            >
              {language === 'zh' ? '不，谢谢' : 'No thanks'}
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
          <span className="text-[10px] mt-1 font-bold">{t.nav_game}</span>
        </button>
        <button
          onClick={() => onNavigate(Step.ORDERS)}
          className={`flex flex-col items-center ${currentStep === Step.ORDERS ? 'text-primary' : 'text-slate-400'}`}
        >
          <span className="material-icons">receipt_long</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_orders}</span>
        </button>
        <button
          onClick={() => onNavigate(Step.PROFILE)}
          className={`flex flex-col items-center ${currentStep === Step.PROFILE ? 'text-primary' : 'text-slate-400'}`}
        >
          <span className="material-icons">person</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_profile}</span>
        </button>
      </nav>
    </div>
  );
};

export default WheelGame;
