import { useState, useCallback, useMemo } from 'react';

interface Match {
    text: string;
    index: number;
    groups: string[];
}

const presets = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]+' },
    { name: 'Phone', pattern: '\\+?[1-9]\\d{1,14}' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: 'IPv4', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
    { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}\\b' },
];

export default function RegexTester() {
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
                while ((match = regex.exec(testString)) !== null) {
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
            return testString.replace(regex, '<mark class="bg-accent-300 dark:bg-accent-600 px-0.5 rounded">$&</mark>');
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
    }, []);

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔍</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Regex Tester</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Test regular expressions with live highlighting</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Pattern Input */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pattern</label>
                        <div className="flex gap-1">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => applyPreset(preset)}
                                    className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                                    title={preset.pattern}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1 flex items-center bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/20 transition-all">
                            <span className="pl-4 text-slate-400">/</span>
                            <input
                                type="text"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                placeholder="Enter regex pattern..."
                                className="flex-1 px-2 py-3 bg-transparent text-slate-800 dark:text-slate-100 font-mono text-sm focus:outline-none"
                            />
                            <span className="text-slate-400">/</span>
                            <input
                                type="text"
                                value={flags}
                                onChange={(e) => setFlags(e.target.value)}
                                className="w-12 px-2 py-3 bg-transparent text-accent-500 font-mono text-sm focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { flag: 'g', label: 'Global', desc: 'Find all matches' },
                        { flag: 'i', label: 'Case Insensitive', desc: 'Ignore case' },
                        { flag: 'm', label: 'Multiline', desc: '^/$ match line start/end' },
                        { flag: 's', label: 'Dotall', desc: '. matches newlines' },
                    ].map(({ flag, label }) => (
                        <button
                            key={flag}
                            onClick={() => toggleFlag(flag)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${flags.includes(flag)
                                    ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 ring-1 ring-accent-500/30'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                }`}
                        >
                            <span className="font-mono mr-1">{flag}</span>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Test String */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Test String
                    </label>
                    <textarea
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        placeholder="Enter text to test against the pattern..."
                        className="tool-textarea h-24"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                        <span className="mr-2">❌</span>{error}
                    </div>
                )}

                {/* Results */}
                {!error && pattern && testString && (
                    <div className="space-y-3 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Matches: <span className={`font-bold ${matches.length > 0 ? 'text-green-500' : 'text-slate-400'}`}>{matches.length}</span>
                            </span>
                        </div>

                        {/* Highlighted Preview */}
                        <div
                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm font-mono whitespace-pre-wrap break-all text-slate-700 dark:text-slate-300"
                            dangerouslySetInnerHTML={{ __html: highlightedText }}
                        />

                        {/* Match Details */}
                        {matches.length > 0 && (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {matches.slice(0, 10).map((match, index) => (
                                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-xs">
                                        <span className="text-slate-400">#{index + 1}</span>
                                        <code className="flex-1 text-accent-600 dark:text-accent-400">{match.text}</code>
                                        <span className="text-slate-400">@{match.index}</span>
                                    </div>
                                ))}
                                {matches.length > 10 && (
                                    <p className="text-xs text-slate-400 text-center">...and {matches.length - 10} more matches</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
