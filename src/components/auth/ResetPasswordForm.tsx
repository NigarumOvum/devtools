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

            setMessage('Password reset successful! You can now log in.');
            setTimeout(() => window.location.href = '/', 2000);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Reset Password</h2>

            {message && <div className="p-3 bg-green-900/30 text-green-400 rounded-lg mb-6 border border-green-500/30">{message}</div>}
            {error && <div className="p-3 bg-red-900/30 text-red-400 rounded-lg mb-6 border border-red-500/30">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};
