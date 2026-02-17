import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function JsMinifier() {
    const [input, setInput] = useState('function helloWorld() {\n  const message = "Hello from DevTools!";\n  console.log(message);\n  return true;\n}');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const minifyJs = useCallback(() => {
        // Basic regex-based minifier (removes comments and whitespace)
        let result = input
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .trim();
        setOutput(result);
        toast.success(`Minified JS! Saved ~${Math.round((1 - result.length / input.length) * 100)}%`);
    }, [input]);

    const copyToClipboard = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Minified code copied to clipboard!');
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">JS</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">JS Minifier</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Optimize & Compress scripts
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Source JavaScript</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-48 p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-xs font-mono outline-none focus:border-amber-500 transition-all custom-scrollbar"
                        placeholder="Paste code here..."
                    />
                </div>

                <button
                    onClick={minifyJs}
                    className="w-full py-4 rounded-2xl bg-amber-500 text-white font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
                >
                    Minify Code
                </button>

                {output && (
                    <div className="animate-fade-in space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Minimized Output</label>
                            <span className="text-[10px] font-bold text-amber-600">Saved ~{Math.round((1 - output.length / input.length) * 100)}%</span>
                        </div>
                        <div className="relative group">
                            <pre className="p-4 rounded-2xl bg-slate-900 text-amber-200 text-xs font-mono overflow-auto max-h-40 custom-scrollbar border border-slate-800">
                                {output}
                            </pre>
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-2 right-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 shadow-xl'
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
