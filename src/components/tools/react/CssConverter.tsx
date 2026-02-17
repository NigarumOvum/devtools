import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const targets = [
    { id: 'scss', label: 'Sass (SCSS)', icon: '🎨' },
    { id: 'sass', label: 'Sass (Indented)', icon: '💅' },
    { id: 'less', label: 'Less', icon: '📉' },
    { id: 'styled', label: 'Styled-Components', icon: '💅' },
    { id: 'modules', label: 'CSS Modules', icon: '📦' },
];

export default function CssConverter() {
    const [input, setInput] = useState('.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.btn {\n  background: #3b82f6;\n  color: white;\n  border-radius: 8px;\n}\n\n.btn:hover {\n  opacity: 0.8;\n}');
    const [target, setTarget] = useState('scss');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const convertCss = useCallback(() => {
        let result = input;

        // Very basic transform logic for visual/demo purposes
        if (target === 'scss' || target === 'less') {
            // Mock nesting for pseudo-classes as a simple transform
            result = input.replace(/\.([\w-]+):(\w+)\s*{([^}]+)}/g, (match, className, pseudo, content) => {
                return `.${className} {\n  ${content.trim()}\n  &:${pseudo} {\n    /* pseudo styles */\n  }\n}`;
            });
        } else if (target === 'sass') {
            // Standard CSS to Indented Sass (remove braces and semicolons)
            result = input
                .replace(/{/g, '')
                .replace(/}/g, '')
                .replace(/;/g, '')
                .split('\n')
                .map(line => line.trimEnd())
                .join('\n');
        } else if (target === 'styled') {
            // Wrap in styled.div template literal
            result = `import styled from 'styled-components';\n\nconst Container = styled.div\`\n${input.split('\n').map(l => `  ${l}`).join('\n')}\n\`;`;
        } else if (target === 'modules') {
            result = `/* In your JS file: */\nimport styles from './styles.module.css';\n\n/* In your CSS: */\n${input}`;
        }

        setOutput(result);
        toast.success('CSS converted successfully!');
    }, [input, target]);

    const copyToClipboard = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('CSS copied to clipboard!');
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">💅</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">CSS Bridge</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Transform Styles Instantly
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Source CSS</label>
                        <button onClick={() => setInput('')} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase">Clear</button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-80 p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-xs font-mono outline-none focus:border-pink-500 transition-all shadow-inner"
                        placeholder="Paste your CSS here..."
                    />
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Preprocessor / Library</label>
                        <div className="grid grid-cols-2 gap-2">
                            {targets.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTarget(t.id)}
                                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${target === t.id
                                            ? 'bg-pink-500/10 border-pink-500 text-pink-600 dark:text-pink-400 font-bold'
                                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className="text-sm">{t.icon}</span>
                                    <span className="text-xs">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={convertCss}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-pink-500/20"
                    >
                        Convert Styles
                    </button>

                    {output && (
                        <div className="animate-fade-in relative group space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Output Content</label>
                            <div className="relative">
                                <pre className="p-5 rounded-3xl bg-slate-900 text-pink-200 text-xs font-mono overflow-auto max-h-60 border border-slate-800 shadow-2xl custom-scrollbar">
                                    {output}
                                </pre>
                                <button
                                    onClick={copyToClipboard}
                                    className={`absolute top-4 right-4 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-xl ${copied ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                                        }`}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
