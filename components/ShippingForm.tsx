
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onSubmit: (info: any) => void;
}

const ShippingForm: React.FC<Props> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    address: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name && formData.phone && formData.address;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md px-6 pt-12 pb-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all"
          >
            <span className="material-icons text-slate-600">chevron_left</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary/60">第 3 步 (共 3 步)</span>
            <span className="font-bold text-sm">填写收货信息</span>
          </div>
          <div className="w-10"></div>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-[100%] rounded-full transition-all duration-1000"></div>
        </div>
      </header>

      <main className="flex-grow px-6 pb-32">
        <div className="mt-4 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <span className="material-icons text-primary text-3xl">celebration</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">恭喜您获得奖励！</h1>
          <p className="text-slate-500 text-sm">请填写下方信息，以便我们为您寄送奖品。</p>
        </div>

        {/* Prize Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-xl shadow-primary/5 border border-primary/5 flex items-center gap-4 mb-8">
          <div className="relative w-20 h-20 bg-bg-light rounded-xl flex-shrink-0 overflow-hidden border border-slate-100">
            <img 
              alt="Prize" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-ay3f4vn53HNjnNCFvpPvh7vhG-67y1k1Mols2L0tZv-e4llqqQFyxj4oeWmuRfkNZE2nBP4QvqWlfrAFlNE9ve9uJyvrApaLxu4hD8-mmgtwXL_3k0vHTEHkJp5PW6Y8a9A2koolvrT-tu31Y_xfmZmNpBc5riD622Z1x3XbcwNwgi7rjch_OrNXjufxv16kunbOy8OhzScX_MqOrN5k9QUAbmuU8bRjGocA0HLF9lXieK3i-MtkRG_TQfU4bv4PMCSYNOjRSVU" 
            />
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">免费领取</div>
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-sm mb-1 leading-tight">优质有机红甜菜粉</h3>
            <p className="text-[11px] text-slate-500 mb-2">30天用量 + 赠送摇摇杯</p>
            <div className="flex items-center text-primary text-[10px] font-bold">
              <span className="material-icons text-xs mr-1">check_circle</span>
              资格已确认
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">收货人姓名</label>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
              <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white border-0 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                placeholder="请输入姓名" 
                type="text" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">联系电话</label>
            <div className="relative flex">
              <div className="flex items-center gap-1 bg-slate-50 border-r border-slate-100 rounded-l-2xl px-4 py-4 shadow-sm">
                <span className="text-xs font-bold">+86</span>
                <span className="material-icons text-[16px] text-slate-400">expand_more</span>
              </div>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white border-0 rounded-r-2xl py-4 px-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                placeholder="请输入手机号码" 
                type="tel" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">详细收货地址</label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select 
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full bg-white border-0 rounded-2xl py-4 px-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                  >
                    <option value="">选择省份</option>
                    <option value="1">广东省</option>
                    <option value="2">上海市</option>
                    <option value="3">北京市</option>
                  </select>
                  <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
                <div className="relative">
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border-0 rounded-2xl py-4 px-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                  >
                    <option value="">选择城市</option>
                  </select>
                  <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400 text-lg">location_on</span>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-white border-0 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
                  placeholder="街道、楼牌号等详细信息" 
                  rows={2}
                />
              </div>
              <div>
                <input 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full bg-white border-0 rounded-2xl py-4 px-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                  placeholder="邮政编码 (选填)" 
                  type="text" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 py-4 mt-2">
            {[
              { icon: 'verified_user', label: '安全加密' },
              { icon: 'local_shipping', label: '极速发货' },
              { icon: 'health_and_safety', label: '权威质检' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 opacity-60">
                <span className="material-icons text-primary text-xl">{item.icon}</span>
                <span className="text-[9px] font-bold uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </form>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 pt-4 pb-8 flex flex-col gap-3">
        <button 
          onClick={() => onSubmit(formData)}
          disabled={!isFormValid}
          className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-transform active:scale-[0.98] ${!isFormValid ? 'opacity-50 grayscale' : ''}`}
        >
          立即免费领取
          <span className="material-icons text-lg">arrow_forward</span>
        </button>
        <p className="text-[10px] text-center text-slate-400">
          点击领取即代表您同意我们的
          <a className="underline decoration-primary/30 font-semibold mx-1" href="#">服务协议</a> 与 
          <a className="underline decoration-primary/30 font-semibold mx-1" href="#">隐私政策</a>
        </p>
      </footer>
    </div>
  );
};

export default ShippingForm;
