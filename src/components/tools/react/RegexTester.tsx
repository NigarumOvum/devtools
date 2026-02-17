import { useState, useCallback, useMemo } from 'react';

interface Match {
    text: string;
    index: number;
    groups: string[];
}

const presets = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', category: 'Validation' },
    { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]+', category: 'Validation' },
    { name: 'Phone', pattern: '\\+?[1-9]\\d{1,14}', category: 'Validation' },
    { name: 'Date', pattern: '\\d{4}-\\d{2}-\\d{2}', category: 'Validation' },
    { name: 'IPv4', pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b', category: 'Network' },
    { name: 'HTML Tag', pattern: '<([a-z1-6]+)([^>]*)>(.*?)<\\/\\1>', category: 'Parse' },
    { name: 'Slug', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$', category: 'String' },
    { name: 'CamelCase', pattern: '[a-z]+(?:[A-Z][a-z]+)*', category: 'String' },
];

type RegexMode = 'build' | 'test' | 'debug';

export default function RegexTester() {
    const [mode, setMode] = useState<RegexMode>('test');
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('gm');
    const [testString, setTestString] = useState('');
    const [error, setError] = useState('');

    const matches: Match[] = useMemo(() => {
        if (!pattern || !testString) return [];

        try {
            const regex = new RegExp(pattern, flags);
            const results: Match[] = [];
            let match;

            if (flags.includes('g')) {
                let lastIndex = -1;
                while ((match = regex.exec(testString)) !== null) {
                    if (regex.lastIndex === lastIndex) break; // Infinite loop protection
                    lastIndex = regex.lastIndex;
                    results.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1),
                    });
                    if (!match[0]) break; // Prevent infinite loop on zero-width matches
                }
            } else {
                match = regex.exec(testString);
                if (match) {
                    results.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1),
                    });
                }
            }

            setError('');
            return results;
        } catch (e) {
            setError((e as Error).message);
            return [];
        }
    }, [pattern, flags, testString]);

    const highlightedText = useMemo(() => {
        if (!pattern || !testString || error || matches.length === 0) return testString;

        try {
            const regex = new RegExp(pattern, flags.replace('g', '') + 'g');
            let offset = 0;
            let result = testString;

            // Manual highlight to handle overlapping or non-global replacements correctly
            const parts: string[] = [];
            let lastIdx = 0;
            const tempRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
            let m;
            while ((m = tempRegex.exec(testString)) !== null) {
                parts.push(testString.substring(lastIdx, m.index));
                parts.push(`<mark class="bg-blue-500/30 text-blue-900 dark:text-blue-100 px-0.5 rounded ring-1 ring-blue-500/50">${m[0]}</mark>`);
                lastIdx = tempRegex.lastIndex;
                if (!m[0]) break;
                if (!flags.includes('g')) break;
            }
            parts.push(testString.substring(lastIdx));
            return parts.join('');
        } catch {
            return testString;
        }
    }, [pattern, flags, testString, error, matches]);

    const toggleFlag = useCallback((flag: string) => {
        setFlags(prev =>
            prev.includes(flag)
                ? prev.replace(flag, '')
                : prev + flag
        );
    }, []);

    const applyPreset = useCallback((preset: typeof presets[0]) => {
        setPattern(preset.pattern);
        setMode('test');
    }, []);

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">/R/</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                            Regex Assistant
                        </h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Build • Test • Debug
                        </p>
                    </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                    {(['build', 'test', 'debug'] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === m
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {/* Pattern & Flags (Always visible) */}
                <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-lg bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-all">
                        <span className="opacity-50">/</span>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="regex_pattern"
                            className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none"
                        />
                        <span className="opacity-50">/</span>
                        <input
                            type="text"
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                            className="w-12 bg-transparent text-blue-500 focus:outline-none"
                            placeholder="flags"
                        />
                    </div>
                    <div className="flex gap-1 mt-3">
                        {['g', 'i', 'm', 's', 'u'].map(f => (
                            <button
                                key={f}
                                onClick={() => toggleFlag(f)}
                                className={`px-2 py-1 rounded-md text-[10px] font-black uppercase transition-all ${flags.includes(f)
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400'
                                    }`}
                                title={f === 'g' ? 'Global' : f === 'i' ? 'Case Insensitive' : f === 'm' ? 'Multiline' : f === 's' ? 'Dotall' : 'Unicode'}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Build Mode: Presets and Construction */}
                {mode === 'build' && (
                    <div className="animate-fade-in space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => applyPreset(preset)}
                                    className="flex flex-col items-start p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all text-left"
                                >
                                    <span className="text-[10px] font-black text-blue-500 uppercase mb-1">{preset.category}</span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-white truncate w-full">{preset.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                            <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">Cheat Sheet</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-500 font-mono">
                                <div><span className="text-blue-400">\d</span> Digit [0-9]</div>
                                <div><span className="text-blue-400">\w</span> Word char [A-Za-z0-9_]</div>
                                <div><span className="text-blue-400">\s</span> Whitespace</div>
                                <div><span className="text-blue-400">+</span> 1 or more</div>
                                <div><span className="text-blue-400">*</span> 0 or more</div>
                                <div><span className="text-blue-400">?</span> Optional</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Test Mode: String input and Highlights */}
                {mode === 'test' && (
                    <div className="animate-fade-in space-y-4">
                        <textarea
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            placeholder="Enter test string here..."
                            className="w-full h-32 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-sm font-mono focus:border-blue-500 transition-all outline-none"
                        />
                        {matches.length > 0 && (
                            <div
                                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 text-sm font-mono whitespace-pre-wrap break-all border border-slate-200 dark:border-slate-800"
                                dangerouslySetInnerHTML={{ __html: highlightedText }}
                            />
                        )}
                    </div>
                )}

                {/* Debug Mode: Match analysis */}
                {mode === 'debug' && (
                    <div className="animate-fade-in space-y-3">
                        {!error && matches.length > 0 ? (
                            <div className="space-y-2">
                                <p className="text-xs font-black text-slate-500 uppercase mb-4">Total Matches: {matches.length}</p>
                                {matches.slice(0, 10).map((m, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-blue-500">Match #{i + 1}</span>
                                            <span className="text-slate-400 font-mono">index: {m.index}</span>
                                        </div>
                                        <div className="font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded mb-2 break-all">
                                            {m.text}
                                        </div>
                                        {m.groups.length > 0 && (
                                            <div className="space-y-1 pl-2 border-l-2 border-blue-500/20">
                                                {m.groups.map((g, gi) => (
                                                    <div key={gi} className="text-[10px] text-slate-400 font-mono">
                                                        Group {gi + 1}: <span className="text-blue-400">{g || 'null'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-slate-400 italic text-sm">
                                {error ? 'Fix the regex error to see debug info' : 'No matches found to debug'}
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono animate-fade-in">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
