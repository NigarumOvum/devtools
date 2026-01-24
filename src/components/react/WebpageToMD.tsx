import { useState, useCallback } from 'react';

export default function WebpageToMD() {
    const [url, setUrl] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const convertToMarkdown = useCallback(async () => {
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError('');
        setMarkdown('');

        try {
            // Validate URL format
            const urlObj = new URL(url);
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                throw new Error('URL must start with http:// or https://');
            }

            const jinaUrl = `https://r.jina.ai/${url}`;
            
            const response = await fetch(jinaUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
            }

            const content = await response.text();
            
            if (!content.trim()) {
                throw new Error('No content received from the URL');
            }

            setMarkdown(content);
        } catch (e) {
            setError((e as Error).message);
            setMarkdown('');
        } finally {
            setLoading(false);
        }
    }, [url]);

    const copyToClipboard = useCallback(async () => {
        if (markdown) {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [markdown]);

    const clearAll = useCallback(() => {
        setUrl('');
        setMarkdown('');
        setError('');
    }, []);

    const loadSampleUrl = useCallback(() => {
        setUrl('https://example.com');
    }, []);

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌐</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Webpage to MD</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Convert any webpage to Markdown</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Webpage URL</label>
                        <button
                            onClick={loadSampleUrl}
                            className="text-xs text-accent-500 hover:text-accent-600 transition-colors"
                        >
                            Load sample
                        </button>
                    </div>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="tool-input"
                        onKeyPress={(e) => e.key === 'Enter' && convertToMarkdown()}
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={convertToMarkdown} 
                        disabled={loading}
                        className="tool-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="mr-2">{loading ? '⏳' : '🔄'}</span>
                        {loading ? 'Converting...' : 'Convert'}
                    </button>
                    <button onClick={clearAll} className="tool-btn-secondary">
                        <span className="mr-2">🗑️</span>Clear
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                        <div className="flex items-center gap-2">
                            <span>❌</span>
                            <span className="font-medium">Error:</span>
                        </div>
                        <p className="mt-1 text-xs">{error}</p>
                    </div>
                )}

                {markdown && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Markdown Output</label>
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
                        <div className="code-block overflow-auto max-h-96">
                            <pre className="whitespace-pre-wrap text-sm">{markdown}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
