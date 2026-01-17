import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { signIn, signOut } from 'auth-astro/client';

export const AuthButton: React.FC<{ session: any }> = ({ session }) => {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);
    const [localUser, setLocalUser] = useState<any>(null);

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
                    Exit
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
                setMessage('Success! Check your email to verify.');
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            // Credentials sign in
            // @ts-ignore
            const result = await signIn('credentials', { email, password, redirect: false });
            if (result && (result as any).error) {
                setError('Invalid credentials');
                setLoading(false);
            } else {
                window.location.reload();
            }
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity animate-in fade-in"
                onClick={() => setShowEmailForm(false)}
            />

            {/* Modal Container */}
            <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 zoom-in duration-300">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

                <div className="overflow-y-auto p-8 sm:p-12 custom-scrollbar">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-3xl font-black text-white tracking-tight leading-tight">
                                {isRegister ? 'New Account' : 'Welcome'}
                            </h3>
                            <p className="text-slate-400 text-sm mt-2 font-medium">
                                {isRegister ? 'Access the AI Multi-Agent Studio' : 'Log in to your developer toolkit'}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowEmailForm(false)}
                            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all shadow-inner"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {message && (
                        <div className="p-4 bg-emerald-500/10 text-emerald-400 text-sm rounded-2xl mb-8 border border-emerald-500/20 flex items-center gap-3 animate-in fade-in">
                            <span className="text-lg">✨</span> {message}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 bg-rose-500/10 text-rose-400 text-sm rounded-2xl mb-8 border border-rose-500/20 flex items-center gap-3 animate-in fade-in">
                            <span className="text-lg">🚫</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="space-y-6">
                        {isRegister && (
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all shadow-sm"
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-5 rounded-2xl font-black text-white transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 mt-4 active:scale-[0.98] uppercase tracking-widest text-xs"
                        >
                            {loading ? 'Processing...' : (isRegister ? 'Start Journey' : 'Log In Now')}
                        </button>
                    </form>

                    <div className="mt-12 pt-10 border-t border-slate-800/50 flex flex-col gap-5 text-center">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            {isRegister ? 'Already registered?' : "Need a workspace?"}
                            <span className="text-blue-500 ml-1 decoration-2 underline-offset-4 hover:underline">
                                {isRegister ? 'Sign in' : 'Join for free'}
                            </span>
                        </button>
                        {!isRegister && (
                            <a href="/auth/forgot-password" onClick={() => setShowEmailForm(false)} className="text-xs font-semibold text-slate-600 hover:text-slate-400 transition-colors">
                                Reset forgotten password
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setShowEmailForm(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 sm:px-6 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95"
            >
                Sign In / Register
            </button>

            {showEmailForm && mounted && createPortal(modalContent, document.body)}
        </>
    );
};
