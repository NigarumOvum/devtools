import React, { useState } from 'react';

export const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessage('If an account exists with that email, we have sent a reset link.');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full">
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

                <div className="p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Forgot Password?</h2>
                        <p className="text-slate-400 text-sm mt-2">No worries, we'll send you reset instructions.</p>
                    </div>

                    {/* Messages */}
                    {message && (
                        <div className="p-4 bg-emerald-500/10 text-emerald-400 text-sm rounded-2xl mb-6 border border-emerald-500/20 flex items-center gap-3">
                            <span className="text-lg">✨</span> {message}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 bg-rose-500/10 text-rose-400 text-sm rounded-2xl mb-6 border border-rose-500/20 flex items-center gap-3">
                            <span className="text-lg">🚫</span> {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-2xl font-black text-white transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 active:scale-[0.98] uppercase tracking-widest text-xs"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
                        <a
                            href="/"
                            className="text-sm font-semibold text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

