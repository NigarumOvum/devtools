import { useState, useCallback } from 'react';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const formatJson = useCallback(() => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (e) {
            setError((e as Error).message);
            setOutput('');
        }
    }, [input]);

    const minifyJson = useCallback(() => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError('');
        } catch (e) {
            setError((e as Error).message);
            setOutput('');
        }
    }, [input]);

    const copyToClipboard = useCallback(async () => {
        if (output) {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [output]);

    const clearAll = useCallback(() => {
        setInput('');
        setOutput('');
        setError('');
    }, []);

    const sampleJson = '{"name":"DevTools","version":"1.0.0","features":["formatting","validation","minification"]}';

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📋</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">JSON Formatter</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Format, validate & minify JSON</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input JSON</label>
                        <button
                            onClick={() => setInput(sampleJson)}
                            className="text-xs text-accent-500 hover:text-accent-600 transition-colors"
                        >
                            Load sample
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"key": "value"}'
                        className="tool-textarea h-32"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <button onClick={formatJson} className="tool-btn-primary flex-1">
                        <span className="mr-2">✨</span>Format
                    </button>
                    <button onClick={minifyJson} className="tool-btn-secondary flex-1">
                        <span className="mr-2">📦</span>Minify
                    </button>
                    <button onClick={clearAll} className="tool-btn-secondary">
                        <span className="mr-2">🗑️</span>Clear
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                        <div className="flex items-center gap-2">
                            <span>❌</span>
                            <span className="font-medium">Invalid JSON:</span>
                        </div>
                        <p className="mt-1 font-mono text-xs">{error}</p>
                    </div>
                )}

                {output && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label>
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
                        <pre className="code-block overflow-auto max-h-48">{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
