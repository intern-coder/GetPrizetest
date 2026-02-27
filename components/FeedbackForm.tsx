import React, { useState } from 'react';
import { translations } from '../translations';

interface Props {
  onBack: () => void;
  onSubmit: (rating: number, feedback: string) => void;
  language: 'zh' | 'en';
}

const FeedbackForm: React.FC<Props> = ({ onBack, onSubmit, language }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [showAmazonModal, setShowAmazonModal] = useState(false);
  const [showLowStarModal, setShowLowStarModal] = useState(false);
  const t = translations[language];

  // 1-3 stars require 15 chars. 4-5 stars is optional.
  const isMandatory = rating <= 3;
  const canSubmit = isMandatory ? feedback.length >= 15 : true;

  const handleSubmitClick = () => {
    if (rating >= 4) {
      setShowAmazonModal(true);
    } else {
      setShowLowStarModal(true);
    }
  };

  const handleContinueToClaim = () => {
    setShowAmazonModal(false);
    setShowLowStarModal(false);
    onSubmit(rating, feedback);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <header className="flex items-center justify-between px-6 py-6 pt-12">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <span className="material-icons text-xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">{t.fb_title}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-xl shadow-primary/10">
          <img
            alt="Product"
            className="w-full h-full object-cover"
            src="/stick_box.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.fb_title}</h3>
          <p className="text-slate-500 text-sm">{t.fb_subtitle}</p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <span className={`material-icons text-5xl ${star <= rating ? 'text-primary' : 'text-slate-100'}`}>
                  stars
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full bg-white border ${isMandatory && feedback.length < 15 ? 'border-primary/50' : 'border-slate-100'} rounded-2xl p-4 text-slate-800 placeholder:text-slate-300 focus:outline-none transition-colors resize-none shadow-sm focus:border-primary`}
            placeholder={t.fb_comment_placeholder}
            rows={5}
          />
          {isMandatory && (
            <div className="flex justify-between items-center px-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${feedback.length < 15 ? 'text-primary' : 'text-slate-400'}`}>
                {feedback.length < 15 ? (language === 'zh' ? `还差 ${15 - feedback.length} 字` : `${15 - feedback.length} chars left`) : (language === 'zh' ? '已满足字数要求' : 'Length requirement met')}
              </span>
              <span className="text-[10px] font-bold text-slate-300">{feedback.length} / 500</span>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-6 bg-gradient-to-t from-bg-light via-bg-light to-transparent pt-10">
        <button
          onClick={handleSubmitClick}
          disabled={!canSubmit}
          className={`w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${!canSubmit ? 'opacity-50 grayscale' : ''}`}
        >
          <span>{t.fb_submit}</span>
          <span className="material-icons">celebration</span>
        </button>
      </footer>

      {showAmazonModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md transition-all">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-5xl">thumb_up</span>
            </div>
            <h2 className="text-2xl font-black mb-3">{language === 'zh' ? '太棒了！' : 'Excellent!'}</h2>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed px-2">
              {language === 'zh'
                ? '非常感谢您的好评！您是否愿意移步 亚马逊 (Amazon) 平台为我们留下真实评价？这将极大地帮助其他消费者。'
                : 'Thank you for your feedback! Would you be willing to leave a review on Amazon? It will help other customers a lot.'}
            </p>

            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setTimeout(handleContinueToClaim, 500)}
              className="w-full bg-[#FF9900] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#FF9900]/20 flex items-center justify-center gap-3 mb-5 active:scale-[0.98] transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" className="w-6 h-6 invert brightness-0" alt="Amazon" />
              {language === 'zh' ? '前往亚马逊好评' : 'Review on Amazon'}
            </a>

            <button
              onClick={handleContinueToClaim}
              className="text-slate-400 text-xs font-bold uppercase tracking-widest py-2"
            >
              {language === 'zh' ? '暂不，继续领奖' : 'No thanks, continue'}
            </button>
          </div>
        </div>
      )}

      {showLowStarModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md transition-all">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-5xl">favorite</span>
            </div>
            <h2 className="text-2xl font-black mb-3">{t.fb_low_star_title}</h2>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed px-2">
              {t.fb_low_star_desc}
            </p>

            <button
              onClick={handleContinueToClaim}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 mb-2 active:scale-[0.98] transition-all"
            >
              {t.fb_low_star_btn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
