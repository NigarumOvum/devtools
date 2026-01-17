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
        <div className="max-w-md w-full mx-auto p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Forgot Password</h2>
            <p className="text-gray-400 mb-6 text-sm">Enter your email and we'll send you a link to reset your password.</p>

            {message && <div className="p-3 bg-green-900/30 text-green-400 rounded-lg mb-6 border border-green-500/30">{message}</div>}
            {error && <div className="p-3 bg-red-900/30 text-red-400 rounded-lg mb-6 border border-red-500/30">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            <div className="mt-6 text-center">
                <a href="/" className="text-sm text-blue-400 hover:underline">Back to Login</a>
            </div>
        </div>
    );
};
