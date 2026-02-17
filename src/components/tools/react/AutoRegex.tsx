import { useState, useCallback } from 'react';

export default function AutoRegex() {
    const [description, setDescription] = useState('match an email address');
    const [generatedRegex, setGeneratedRegex] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateRegex = async () => {
        setIsGenerating(true);
        try {
            // In a real implementation, this would call an API route that uses Gemini/OpenAI
            // For now, we mock the behavior with common patterns
            await new Promise(r => setTimeout(r, 1500));

            const prompt = description.toLowerCase();
            let pattern = '.*';
            let expl = 'A generic pattern matching everything.';

            if (prompt.includes('email')) {
                pattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
                expl = 'Matches standard email formats with alphanumeric characters, dots, and common TLDs.';
            } else if (prompt.includes('phone')) {
                pattern = '\\+?[1-9]\\d{1,14}';
                expl = 'Matches E.164 international phone number format.';
            } else if (prompt.includes('date')) {
                pattern = '\\d{4}-\\d{2}-\\d{2}';
                expl = 'Matches YYYY-MM-DD date format.';
            } else if (prompt.includes('url')) {
                pattern = 'https?:\\/\\/[^\\s/$.?#].[^\\s]*';
                expl = 'Matches HTTP and HTTPS URLs.';
            } else if (prompt.includes('number')) {
                pattern = '^-?\\d*(\\.\\d+)?$';
                expl = 'Matches integers and decimal numbers, including negative ones.';
            }

            setGeneratedRegex(pattern);
            setExplanation(expl);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(generatedRegex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">AI</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">AutoRegex</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            English to Pattern Intelligence
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">What should it match?</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. match a credit card number..."
                        />
                        <button
                            onClick={generateRegex}
                            disabled={isGenerating || !description.trim()}
                            className="px-6 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                            {isGenerating ? (
                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Generate'}
                        </button>
                    </div>
                </div>

                {generatedRegex && (
                    <div className="animate-fade-in space-y-4">
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative group">
                            <div className="text-[9px] font-black text-indigo-400 uppercase mb-2">Regex Pattern</div>
                            <code className="text-lg font-mono text-white block break-all">/{generatedRegex}/gm</code>
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-500 hover:text-white'
                                    }`}
                            >
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>

                        <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                            <div className="text-[9px] font-black text-indigo-500 uppercase mb-1">How it works</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                                "{explanation}"
                            </p>
                        </div>

                        <a
                            href="/tools/regex"
                            className="block text-center py-3 text-[10px] font-black text-indigo-500 uppercase tracking-widest border border-indigo-500/20 rounded-xl hover:bg-indigo-50 transition-colors"
                        >
                            Try in Regex Assistant →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
