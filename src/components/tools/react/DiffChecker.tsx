import { useState, useCallback, useMemo } from 'react';

export default function DiffChecker() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

    const sampleText1 = `function greet(name) {
    console.log("Hello, " + name);
    return true;
}

const users = ["Alice", "Bob"];`;

    const sampleText2 = `function greet(name, title) {
    console.log("Hello, " + title + " " + name);
    return true;
}

const users = ["Alice", "Bob", "Charlie"];`;

    const diff = useMemo(() => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLength = Math.max(lines1.length, lines2.length);
        const result: Array<{
            line1: string;
            line2: string;
            type: 'equal' | 'modified' | 'added' | 'removed';
            lineNum1: number | null;
            lineNum2: number | null;
        }> = [];

        for (let i = 0; i < maxLength; i++) {
            const l1 = lines1[i];
            const l2 = lines2[i];

            if (l1 === undefined && l2 !== undefined) {
                result.push({ line1: '', line2: l2, type: 'added', lineNum1: null, lineNum2: i + 1 });
            } else if (l1 !== undefined && l2 === undefined) {
                result.push({ line1: l1, line2: '', type: 'removed', lineNum1: i + 1, lineNum2: null });
            } else if (l1 === l2) {
                result.push({ line1: l1, line2: l2, type: 'equal', lineNum1: i + 1, lineNum2: i + 1 });
            } else {
                result.push({ line1: l1, line2: l2, type: 'modified', lineNum1: i + 1, lineNum2: i + 1 });
            }
        }

        return result;
    }, [text1, text2]);

    const stats = useMemo(() => {
        const added = diff.filter(d => d.type === 'added').length;
        const removed = diff.filter(d => d.type === 'removed').length;
        const modified = diff.filter(d => d.type === 'modified').length;
        return { added, removed, modified };
    }, [diff]);

    const loadSample = useCallback(() => {
        setText1(sampleText1);
        setText2(sampleText2);
    }, []);

    const clearAll = useCallback(() => {
        setText1('');
        setText2('');
    }, []);

    const getLineStyle = (type: string) => {
        switch (type) {
            case 'added':
                return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
            case 'removed':
                return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
            case 'modified':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
            default:
                return 'text-slate-700 dark:text-slate-300';
        }
    };

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📊</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Diff Checker</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Compare two texts side-by-side</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex gap-2">
                        <button onClick={loadSample} className="tool-btn-secondary text-sm">
                            📄 Load Sample
                        </button>
                        <button onClick={clearAll} className="tool-btn-secondary text-sm">
                            🗑️ Clear
                        </button>
                    </div>
                    <div className="flex gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <button
                            onClick={() => setViewMode('split')}
                            className={`px-3 py-1 text-sm rounded-md transition-all ${viewMode === 'split'
                                ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400'}`}
                        >
                            Split
                        </button>
                        <button
                            onClick={() => setViewMode('unified')}
                            className={`px-3 py-1 text-sm rounded-md transition-all ${viewMode === 'unified'
                                ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400'}`}
                        >
                            Unified
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Original</label>
                        <textarea
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste original text here..."
                            className="tool-textarea h-40"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Modified</label>
                        <textarea
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste modified text here..."
                            className="tool-textarea h-40"
                        />
                    </div>
                </div>

                {(text1 || text2) && (
                    <>
                        <div className="flex gap-4 text-sm">
                            <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                +{stats.added} added
                            </span>
                            <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                                -{stats.removed} removed
                            </span>
                            <span className="px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                                ~{stats.modified} modified
                            </span>
                        </div>

                        <div className="max-h-64 overflow-auto rounded-xl border-2 border-slate-200 dark:border-slate-700">
                            {viewMode === 'split' ? (
                                <table className="w-full text-sm font-mono">
                                    <tbody>
                                        {diff.map((d, i) => (
                                            <tr key={i} className={getLineStyle(d.type)}>
                                                <td className="px-2 py-0.5 text-slate-400 text-right w-8 border-r border-slate-300 dark:border-slate-600">
                                                    {d.lineNum1 || ''}
                                                </td>
                                                <td className="px-2 py-0.5 whitespace-pre-wrap break-all w-1/2 border-r border-slate-300 dark:border-slate-600">
                                                    {d.line1}
                                                </td>
                                                <td className="px-2 py-0.5 text-slate-400 text-right w-8 border-r border-slate-300 dark:border-slate-600">
                                                    {d.lineNum2 || ''}
                                                </td>
                                                <td className="px-2 py-0.5 whitespace-pre-wrap break-all">
                                                    {d.line2}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="font-mono text-sm">
                                    {diff.map((d, i) => (
                                        <div key={i} className={`px-3 py-0.5 ${getLineStyle(d.type)}`}>
                                            <span className="text-slate-400 mr-2">
                                                {d.type === 'added' ? '+' : d.type === 'removed' ? '-' : d.type === 'modified' ? '~' : ' '}
                                            </span>
                                            {d.type === 'removed' ? d.line1 : d.line2}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
