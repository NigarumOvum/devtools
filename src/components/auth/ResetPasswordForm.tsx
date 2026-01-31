import React, { useState } from 'react';

interface ResetPasswordFormProps {
    token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => window.location.href = '/', 2000);
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
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500" />

                <div className="p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 mb-4">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Create New Password</h2>
                        <p className="text-slate-400 text-sm mt-2">Your new password must be different from previous ones.</p>
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
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">New Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 transition-all shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 transition-all shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 py-4 rounded-2xl font-black text-white transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 active:scale-[0.98] uppercase tracking-widest text-xs"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

