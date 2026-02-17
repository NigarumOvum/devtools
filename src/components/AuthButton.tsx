import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { signIn, signOut } from 'auth-astro/client';
import { ui, defaultLang } from '../i18n/ui';

export const AuthButton: React.FC<{ session: any; mode?: 'login' | 'register'; label?: string; lang?: keyof typeof ui }> = ({ session, mode = 'login', label, lang = defaultLang }) => {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [isRegister, setIsRegister] = useState(mode === 'register');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);
    const [localUser, setLocalUser] = useState<any>(null);

    const t = (key: keyof typeof ui[typeof defaultLang]) => ui[lang][key] || ui[defaultLang][key];

    useEffect(() => {
        setMounted(true);

        // 1. If server session is available, sync to localStorage
        if (session?.user) {
            const userData = {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                id: session.user.id
            };
            localStorage.setItem('devtools_user', JSON.stringify(userData));
            setLocalUser(userData);
        } else {
            // 2. If no server session, try to restore from localStorage (Sticky Auth)
            const savedUser = localStorage.getItem('devtools_user');
            if (savedUser) {
                try {
                    setLocalUser(JSON.parse(savedUser));
                } catch (e) {
                    localStorage.removeItem('devtools_user');
                }
            }
        }
    }, [session]);

    const handleSignOut = async () => {
        localStorage.removeItem('devtools_user');
        setLocalUser(null);
        await signOut();
    };

    // Use current session USER or Fallback to LOCAL user if server session is still loading/missing
    const activeUser = session?.user || localUser;

    if (activeUser) {
        return (
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white leading-none mb-1">{activeUser.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tighter">{activeUser.email}</span>
                </div>
                {activeUser.image ? (
                    <img src={activeUser.image} alt="Profile" className="w-9 h-9 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-sm" />
                ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {activeUser.name?.charAt(0) || 'U'}
                    </div>
                )}
                <button
                    onClick={handleSignOut}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-rose-500/20"
                >
                    {t('auth.signOut')}
                </button>
            </div>
        );
    }

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (isRegister) {
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessage(t('auth.successVerify'));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            // Credentials sign in
            // With redirect: false + credentials in auth-astro:
            //   - On SUCCESS: auth-astro internally redirects (window.location.href = callbackUrl), returns undefined
            //   - On ERROR: returns the Response object
            try {
                // @ts-ignore
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                    callbackUrl: window.location.href,
                });

                // If we get a response back, it means there was an error
                if (res) {
                    setError(t('auth.invalidCredentials'));
                    setLoading(false);
                }
                // If res is undefined, auth-astro already redirected (success)
            } catch (err: any) {
                setError(t('auth.invalidCredentials'));
                setLoading(false);
            }
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
                onClick={() => setShowEmailForm(false)}
            />

            {/* Modal Container */}
            <div className="relative bg-slate-900 border-t sm:border border-slate-800 w-full sm:max-w-md h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-t-full" />

                {/* Mobile Drag Handle */}
                <div className="sm:hidden self-center w-12 h-1.5 bg-slate-800 rounded-full mt-4 mb-2" />

                <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                    <div className="flex justify-between items-start mb-6 sm:mb-8">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                                {isRegister ? t('auth.newAccount') : t('auth.welcomeBack')}
                            </h3>
                            <p className="text-slate-400 text-sm mt-2 font-medium">
                                {isRegister ? t('auth.joinCommunity') : t('auth.accessToolkit')}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowEmailForm(false)}
                            className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all shadow-inner"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {message && (
                        <div className="p-4 bg-emerald-500/10 text-emerald-400 text-sm rounded-2xl mb-6 border border-emerald-500/20 flex items-center gap-3 animate-in fade-in">
                            <span className="text-lg">✨</span> {message}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 bg-rose-500/10 text-rose-400 text-sm rounded-2xl mb-6 border border-rose-500/20 flex items-center gap-3 animate-in fade-in">
                            <span className="text-lg">🚫</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="space-y-5 sm:space-y-6">
                        {isRegister && (
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{t('auth.fullName')}</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:bg-slate-800 transition-all shadow-sm"
                                />
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{t('auth.email')}</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:bg-slate-800 transition-all shadow-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{t('auth.password')}</label>
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:bg-slate-800 transition-all shadow-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 sm:py-5 rounded-2xl font-black text-white transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 mt-2 active:scale-[0.98] uppercase tracking-widest text-xs"
                        >
                            {loading ? t('auth.processing') : (isRegister ? t('auth.startJourney') : t('auth.logInNow'))}
                        </button>
                    </form>

                    <div className="mt-8 sm:mt-10 pt-8 border-t border-slate-800/50 flex flex-col gap-4 text-center">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            {isRegister ? t('auth.alreadyRegistered') : t('auth.needWorkspace')}
                            <span className="text-blue-500 ml-1 decoration-2 underline-offset-4 hover:underline">
                                {isRegister ? t('auth.signInLink') : t('auth.createAccount')}
                            </span>
                        </button>
                        {!isRegister && (
                            <div className="flex flex-col gap-3">
                                <a href="/auth/forgot-password"
                                    onClick={() => setShowEmailForm(false)}
                                    className="text-xs font-bold text-blue-500/80 hover:text-blue-400 transition-colors py-1"
                                >
                                    {t('auth.forgotPassword')}
                                </a>
                                <p className="text-[10px] text-slate-600">
                                    {t('auth.securityNote')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => {
                    setIsRegister(mode === 'register');
                    setShowEmailForm(true);
                }}
                className={mode === 'register'
                    ? "bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95 shadow-accent-500/25"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
                }
            >
                {label || (mode === 'register' ? t('auth.register') : t('auth.signIn'))}
            </button>

            {showEmailForm && mounted && createPortal(modalContent, document.body)}
        </>
    );
};
