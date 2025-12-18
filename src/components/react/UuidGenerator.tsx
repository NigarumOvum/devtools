import { useState, useCallback } from 'react';

export default function UuidGenerator() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState<number | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    const generateUUID = (): string => {
        // Crypto API for secure UUID v4 generation
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback for older browsers
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generateUUIDs = useCallback(() => {
        const newUuids = Array.from({ length: count }, () => generateUUID());
        setUuids(newUuids);
        setCopied(null);
        setCopiedAll(false);
    }, [count]);

    const copyToClipboard = useCallback(async (uuid: string, index: number) => {
        await navigator.clipboard.writeText(uuid);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    }, []);

    const copyAll = useCallback(async () => {
        await navigator.clipboard.writeText(uuids.join('\n'));
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    }, [uuids]);

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🎲</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">UUID Generator</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Generate secure UUID v4 identifiers</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Count
                        </label>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCount(Math.max(1, count - 1))}
                                className="tool-btn-secondary w-10 h-10 flex items-center justify-center"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={count}
                                onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                                className="tool-input text-center w-20"
                            />
                            <button
                                onClick={() => setCount(Math.min(50, count + 1))}
                                className="tool-btn-secondary w-10 h-10 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            &nbsp;
                        </label>
                        <button onClick={generateUUIDs} className="tool-btn-primary w-full">
                            <span className="mr-2">⚡</span>Generate
                        </button>
                    </div>
                </div>

                {uuids.length > 0 && (
                    <div className="animate-fade-in space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Generated UUIDs ({uuids.length})
                            </span>
                            {uuids.length > 1 && (
                                <button
                                    onClick={copyAll}
                                    className={`text-xs px-3 py-1 rounded-lg transition-all ${copiedAll
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    {copiedAll ? '✓ All Copied!' : '📋 Copy All'}
                                </button>
                            )}
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {uuids.map((uuid, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group"
                                >
                                    <code className="flex-1 text-sm font-mono text-slate-700 dark:text-slate-300">
                                        {uuid}
                                    </code>
                                    <button
                                        onClick={() => copyToClipboard(uuid, index)}
                                        className={`px-2 py-1 rounded-lg text-xs transition-all opacity-0 group-hover:opacity-100 ${copied === index
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100'
                                                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        {copied === index ? '✓' : '📋'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {uuids.length === 0 && (
                    <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                        <div className="text-4xl mb-2">🎲</div>
                        <p className="text-sm">Click Generate to create UUIDs</p>
                    </div>
                )}
            </div>
        </div>
    );
}
