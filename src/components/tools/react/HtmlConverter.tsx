import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const conversionTypes = [
    { id: 'jsx', label: 'JSX (React)', icon: '⚛️' },
    { id: 'vue', label: 'Vue Template', icon: '🖖' },
    { id: 'pug', label: 'Pug (Jade)', icon: '🐶' },
    { id: 'jinja2', label: 'Jinja2/Liquid', icon: '🍶' },
];

export default function HtmlConverter() {
    const [input, setInput] = useState('<div class="container">\n  <h1 id="title">Hello World</h1>\n  <img src="logo.png" alt="Logo" onclick="alert(\'hi\')">\n</div>');
    const [target, setTarget] = useState('jsx');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const convertHtml = useCallback(() => {
        // Simple transformation logic for showcase without heavy libraries
        let result = input;

        if (target === 'jsx') {
            result = input
                .replace(/class=/g, 'className=')
                .replace(/for=/g, 'htmlFor=')
                .replace(/onclick=/g, 'onClick=')
                .replace(/onchange=/g, 'onChange=')
                .replace(/tabindex=/g, 'tabIndex=')
                .replace(/readonly=/g, 'readOnly=');

            // Auto-close self-closing tags if not balanced (simple regex)
            const selfClosing = ['img', 'input', 'br', 'hr', 'link', 'meta'];
            selfClosing.forEach(tag => {
                const regex = new RegExp(`<${tag}([^>]*[^/])>`, 'g');
                result = result.replace(regex, `<${tag}$1 />`);
            });
        } else if (target === 'vue') {
            result = input.replace(/onclick=/g, '@click=');
        } else if (target === 'pug') {
            // Very basic mock pug conversion
            result = input.replace(/<(\w+)([^>]*)>(.*?)<\/\1>/gs, (_, tag, attrs, content) => {
                return `${tag}${attrs.replace(/(\w+)="([^"]*)"/g, '($1="$2")')}\n  ${content.trim()}`;
            });
        }

        setOutput(result);
        toast.success('HTML converted successfully!');
    }, [input, target]);

    const copyToClipboard = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Converted HTML copied to clipboard!');
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">&lt;&gt;</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">HTML Bridge</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Switch between frameworks
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Input HTML</label>
                        <button onClick={() => setInput('')} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase">Clear</button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-xs font-mono outline-none focus:border-emerald-500 transition-all"
                        placeholder="Paste your HTML here..."
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Format</label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {conversionTypes.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setTarget(type.id)}
                                className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${target === type.id
                                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400'
                                    }`}
                            >
                                <span>{type.icon}</span>
                                <span className="text-xs">{type.label}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={convertHtml}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                    >
                        Convert Now
                    </button>
                    {output && (
                        <div className="animate-fade-in relative group">
                            <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 text-xs font-mono overflow-auto max-h-40 custom-scrollbar border border-slate-800">
                                {output}
                            </pre>
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-2 right-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-500 hover:text-white'
                                    }`}
                            >
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
