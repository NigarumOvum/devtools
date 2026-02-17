import { useState, useCallback } from 'react';

export default function CssUtils() {
    const [input, setInput] = useState('.container {\n  display: flex;\n  border-radius: 10px;\n  transform: rotate(45deg);\n}');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const processCss = useCallback(() => {
        // Basic AutoPrefixer mock
        let result = input;

        // Add prefixes
        result = result
            .replace(/transform:\s*([^;]+);/g, '-webkit-transform: $1;\n  -ms-transform: $1;\n  transform: $1;')
            .replace(/user-select:\s*([^;]+);/g, '-webkit-user-select: $1;\n  -moz-user-select: $1;\n  -ms-user-select: $1;\n  user-select: $1;')
            .replace(/display:\s*flex;/g, 'display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;')
            .replace(/flex:\s*([^;]+);/g, '-webkit-box-flex: $1;\n  -ms-flex: $1;\n  flex: $1;');

        // Formatting (normalize whitespace)
        result = result
            .replace(/\s*{\s*/g, ' {\n  ')
            .replace(/;\s*/g, ';\n  ')
            .replace(/\n\s*}/g, '\n}')
            .replace(/}\s*/g, '}\n\n');

        setOutput(result.trim());
    }, [input]);

    const copyToClipboard = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">CSS</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">CSS Utilities</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Prefix • Format • Optimize
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Source CSS</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-48 p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-xs font-mono outline-none focus:border-blue-500 transition-all custom-scrollbar"
                        placeholder=".class { ... }"
                    />
                </div>

                <button
                    onClick={processCss}
                    className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                    Process CSS
                </button>

                {output && (
                    <div className="animate-fade-in space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prefixed & Formatted</label>
                        <div className="relative group">
                            <pre className="p-4 rounded-2xl bg-slate-900 text-blue-300 text-xs font-mono overflow-auto max-h-60 custom-scrollbar border border-slate-800">
                                {output}
                            </pre>
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-2 right-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white shadow-xl'
                                    }`}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
