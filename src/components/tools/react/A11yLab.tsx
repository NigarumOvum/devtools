import { useState, useCallback, useMemo } from 'react';

export default function A11yLab() {
    const [fg, setFg] = useState('#ffffff');
    const [bg, setBg] = useState('#3b82f6');

    // Contrast logic helper
    const getContrast = useCallback((hex1: string, hex2: string) => {
        const getRGB = (c: string) => {
            const hex = c.replace('#', '');
            return [
                parseInt(hex.slice(0, 2), 16),
                parseInt(hex.slice(2, 4), 16),
                parseInt(hex.slice(4, 6), 16)
            ];
        };

        const getLuminance = (r: number, g: number, b: number) => {
            const a = [r, g, b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        };

        const l1 = getLuminance(...(getRGB(hex1) as [number, number, number]));
        const l2 = getLuminance(...(getRGB(hex2) as [number, number, number]));

        const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return Math.round(contrast * 100) / 100;
    }, []);

    const contrastRatio = useMemo(() => getContrast(fg, bg), [fg, bg, getContrast]);

    const passes = useMemo(() => ({
        aa: contrastRatio >= 4.5,
        aaa: contrastRatio >= 7,
        aaLarge: contrastRatio >= 3
    }), [contrastRatio]);

    const [ariaTab, setAriaTab] = useState('button');
    const ariaSnippet = useMemo(() => {
        if (ariaTab === 'button') return `<button\n  aria-label="Close modal"\n  aria-expanded="false"\n  type="button"\n>\n  ×\n</button>`;
        if (ariaTab === 'image') return `<img\n  src="image.jpg"\n  alt="Description of image for screen readers"\n/>`;
        return `<div\n  role="alert"\n  aria-live="polite"\n>\n  Success message!\n</div>`;
    }, [ariaTab]);

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">♿</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">A11y Studio</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Accessibility Validator & Helpers
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contrast Checker</h4>

                        <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase">Text Color</label>
                                <div className="flex gap-2">
                                    <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" />
                                    <input type="text" value={fg} onChange={e => setFg(e.target.value)} className="flex-1 h-10 px-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-mono" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase">Background</label>
                                <div className="flex gap-2">
                                    <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" />
                                    <input type="text" value={bg} onChange={e => setBg(e.target.value)} className="flex-1 h-10 px-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-mono" />
                                </div>
                            </div>
                        </div>

                        <div
                            className="p-8 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner transition-colors border border-slate-100 dark:border-slate-800"
                            style={{ backgroundColor: bg, color: fg }}
                        >
                            Sample Text Preview
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="text-center">
                                <div className="text-3xl font-black text-slate-800 dark:text-white">{contrastRatio}:1</div>
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contrast Ratio</div>
                            </div>
                            <div className="flex gap-2">
                                <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${passes.aa ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white opacity-50'}`}>AA</div>
                                <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${passes.aaa ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white opacity-50'}`}>AAA</div>
                                <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${passes.aaLarge ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white opacity-50'}`}>AA Large</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ARIA Attribute Boilerplates</h4>
                        <div className="flex gap-2 mb-4">
                            {['button', 'image', 'alert'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setAriaTab(tab)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ariaTab === tab ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <pre className="p-6 rounded-2xl bg-slate-900 text-emerald-300 text-xs font-mono border border-slate-800 shadow-xl overflow-auto custom-scrollbar">
                                {ariaSnippet}
                            </pre>
                            <button
                                onClick={() => navigator.clipboard.writeText(ariaSnippet)}
                                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-500 hover:text-white text-[9px] font-black uppercase transition-all"
                            >
                                Copy
                            </button>
                        </div>
                    </div>

                    <div className="p-5 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">🛡️</div>
                        <div>
                            <h5 className="text-[10px] font-black text-slate-800 dark:text-white uppercase mb-0.5">A11y Tip</h5>
                            <p className="text-[11px] text-slate-500 leading-tight">Always use hierarchical headings (h1 → h6) to maintain a consistent semantic structure for screen readers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
