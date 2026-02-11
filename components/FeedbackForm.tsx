
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onSubmit: (rating: number, feedback: string) => void;
}

const FeedbackForm: React.FC<Props> = ({ onBack, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [showAmazonModal, setShowAmazonModal] = useState(false);

  // 1-3 stars require 15 chars. 4-5 stars is optional.
  const isMandatory = rating <= 3;
  const canSubmit = isMandatory ? feedback.length >= 15 : true;

  const handleSubmitClick = () => {
    if (rating >= 4) {
      // Show Amazon invitation modal for 4-5 stars
      setShowAmazonModal(true);
    } else {
      // Direct submission for 1-3 stars
      onSubmit(rating, feedback);
    }
  };

  const handleContinueToClaim = () => {
    setShowAmazonModal(false);
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
        <h1 className="text-lg font-bold">产品评价反馈</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32">
        {/* Product Image Card */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-xl shadow-primary/10 group">
          <img 
            alt="Product" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ot6wVf_fbl-25kbLuktTQIzoO_VrGkLSFHk9ciWkytEBtBJ6sX1wh4GXL9jLrxKpp8xujQvSXi_l5WjOw9AS5BLgIfw5HplVIN74gB9MVNAnhwEomm9VET1nrxhhlUukXGWtCia_jfPAmMk7vHP3P7pcmwWm5sP-EIgAOrNkCdeG3be0UeO5qq-PAE_9v1acj48-01JWdE9lAGwK5duLnkBKGEhAGhwUuYkad1pOrKYcjXKWcOE4XWwir7GAubjpBbtKx7V-N9c" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full mb-2 uppercase tracking-widest">您的订单</span>
            <h2 className="text-white text-xl font-bold">纯天然活力红甜菜粉</h2>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">体验如何？</h3>
          <p className="text-slate-500 text-sm">分享您的使用感受，赢取神秘好礼！</p>
        </div>

        {/* Incentive Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-10 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-xl flex items-center justify-center">
            <span className="material-icons">card_giftcard</span>
          </div>
          <div>
            <h4 className="font-bold text-primary text-xs uppercase tracking-wider">待领取奖励</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">完成此反馈即可领取 $25 代金券。</p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">点击评分</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                onClick={() => setRating(star)}
                className={`transition-all duration-200 active:scale-90 ${star <= rating ? 'text-primary' : 'text-slate-200'}`}
              >
                <span className="material-icons text-[56px] leading-none">
                  {star <= rating ? 'star' : 'star_outline'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 ml-1">
            写下您的评价 {isMandatory && <span className="text-primary">*</span>}
          </label>
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full bg-white border-2 rounded-2xl p-4 text-slate-800 placeholder:text-slate-300 focus:outline-none transition-colors resize-none shadow-sm ${isMandatory && feedback.length < 15 ? 'border-primary/20' : 'border-slate-100'} focus:border-primary`} 
            placeholder={isMandatory ? "请至少输入15字评价您的不满意之处..." : "分享关于口感、能量提升以及您喜爱它的原因..."}
            rows={5}
          />
          <div className="flex justify-between items-center px-1">
            <span className={`text-[10px] uppercase font-bold ${isMandatory && feedback.length < 15 ? 'text-primary' : 'text-slate-400'}`}>
              {isMandatory ? `至少需输入 15 个字符 (还差 ${Math.max(0, 15 - feedback.length)} 字)` : '选填评价'}
            </span>
            <span className="text-[10px] text-slate-400">{feedback.length}/500</span>
          </div>
        </div>

        {/* Photo Upload Placeholder */}
        <div className="mt-8">
          <button className="w-full py-5 border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:bg-primary/5 transition-all">
            <span className="material-icons text-xl">add_a_photo</span>
            <span className="text-sm font-medium">添加照片或视频</span>
          </button>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-6 bg-gradient-to-t from-bg-light via-bg-light to-transparent pt-10">
        <button 
          onClick={handleSubmitClick}
          disabled={!canSubmit}
          className={`w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${!canSubmit ? 'opacity-50 grayscale' : ''}`}
        >
          <span>提交并领取奖励</span>
          <span className="material-icons">celebration</span>
        </button>
      </footer>

      {/* Amazon Review Modal */}
      {showAmazonModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md transition-all">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative p-8 text-center flex flex-col items-center border border-white/20">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-primary text-5xl">thumb_up</span>
            </div>
            <h2 className="text-2xl font-black mb-3">太棒了！</h2>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed px-2">
              非常感谢您的好评！您是否愿意移步 <span className="font-bold text-slate-900">亚马逊 (Amazon)</span> 平台为我们留下真实评价？这将极大地帮助其他消费者。
            </p>
            
            <a 
              href="https://www.amazon.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setTimeout(handleContinueToClaim, 500)}
              className="w-full bg-[#FF9900] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#FF9900]/20 flex items-center justify-center gap-3 mb-5 active:scale-[0.98] transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" className="w-6 h-6 invert brightness-0" alt="Amazon" />
              前往亚马逊好评
            </a>
            
            <button 
              onClick={handleContinueToClaim}
              className="text-slate-400 text-xs font-bold uppercase tracking-widest py-2 hover:text-primary transition-colors"
            >
              不愿意，我要继续领奖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
