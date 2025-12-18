import { useState, useCallback } from 'react';

export default function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const process = useCallback(() => {
        try {
            if (mode === 'encode') {
                setOutput(btoa(unescape(encodeURIComponent(input))));
            } else {
                setOutput(decodeURIComponent(escape(atob(input))));
            }
            setError('');
        } catch (e) {
            setError(mode === 'decode' ? 'Invalid Base64 string' : 'Encoding failed');
            setOutput('');
        }
    }, [input, mode]);

    const copyToClipboard = useCallback(async () => {
        if (output) {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [output]);

    const swapInputOutput = useCallback(() => {
        setInput(output);
        setOutput('');
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setError('');
    }, [output, mode]);

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔐</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Base64 Codec</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Encode & decode Base64 strings</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Mode Toggle */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button
                        onClick={() => { setMode('encode'); setError(''); }}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'encode'
                                ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                    >
                        <span className="mr-2">📤</span>Encode
                    </button>
                    <button
                        onClick={() => { setMode('decode'); setError(''); }}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'decode'
                                ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                    >
                        <span className="mr-2">📥</span>Decode
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                        className="tool-textarea h-24"
                    />
                </div>

                <div className="flex gap-2">
                    <button onClick={process} className="tool-btn-primary flex-1">
                        <span className="mr-2">{mode === 'encode' ? '📤' : '📥'}</span>
                        {mode === 'encode' ? 'Encode' : 'Decode'}
                    </button>
                    {output && (
                        <button onClick={swapInputOutput} className="tool-btn-secondary" title="Use output as input">
                            <span>🔄</span>
                        </button>
                    )}
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                        <span className="mr-2">❌</span>{error}
                    </div>
                )}

                {output && !error && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                            </label>
                            <button
                                onClick={copyToClipboard}
                                className={`text-xs px-3 py-1 rounded-lg transition-all ${copied
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                            >
                                {copied ? '✓ Copied!' : '📋 Copy'}
                            </button>
                        </div>
                        <div className="result-display break-all">{output}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
