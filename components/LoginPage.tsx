
import React, { useState } from 'react';
import { login, register } from '../api';
import { translations } from '../translations';

interface Props {
    onSuccess: () => void;
    onBack: () => void;
    language: 'zh' | 'en';
}

const LoginPage: React.FC<Props> = ({ onSuccess, onBack, language }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const t = translations[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // 基础校验
        if (!phone || !password) {
            setError(t.login_err_empty);
            return;
        }

        if (isRegister && password !== confirmPassword) {
            setError(t.login_err_pwd);
            return;
        }

        setLoading(true);
        try {
            // 仅保留数字，具体的 +1 补齐逻辑已移至 API 层，确保注册和登录完全一致
            const cleanPhone = phone.replace(/\D/g, '');

            if (isRegister) {
                await register(cleanPhone, password);
            } else {
                await login(cleanPhone, password);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || '操作失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-light p-6">
            <div className="mt-8 mb-12">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 active:scale-95 transition-transform"
                >
                    <span className="material-icons text-slate-400">arrow_back</span>
                </button>
                <h1 className="text-3xl font-black mb-2">
                    {isRegister ? t.login_reg_title : t.login_welcome}
                </h1>
                <p className="text-slate-500 font-medium">
                    {isRegister ? t.login_reg_desc : t.login_desc}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.login_phone} (US +1)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <span className="text-slate-400 font-bold">+1</span>
                        </div>
                        <input
                            type="tel"
                            placeholder={t.login_phone}
                            className="w-full bg-white border border-slate-100 h-14 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-lg"
                            value={phone.replace(/^\+1/, '')}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.login_pwd}</label>
                    <input
                        type="password"
                        placeholder={t.login_pwd}
                        className="w-full bg-white border border-slate-100 h-14 px-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {isRegister && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{t.login_confirm_pwd}</label>
                        <input
                            type="password"
                            placeholder={t.login_confirm_pwd}
                            className="w-full bg-white border border-slate-100 h-14 px-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold flex items-center animate-shake">
                        <span className="material-icons text-base mr-2">error</span>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-accent-red text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 mt-4"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        isRegister ? t.login_reg_btn : t.login_btn
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <button
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setError('');
                    }}
                    className="text-sm font-bold text-slate-500"
                >
                    {isRegister ? t.login_has_acc : t.login_no_acc} <span className="text-primary underline decoration-2 underline-offset-4 ml-1">{isRegister ? t.login_click_login : t.login_click_reg}</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
