import { useState, useMemo } from 'react';

export default function LayoutGenerator() {
    const [mode, setMode] = useState('flex'); // flex or grid

    // Flex state
    const [flexProps, setFlexProps] = useState({
        direction: 'row',
        justify: 'center',
        align: 'center',
        gap: '20',
        wrap: 'nowrap'
    });

    // Grid state
    const [gridProps, setGridProps] = useState({
        cols: '3',
        rows: '2',
        gap: '20',
        colGap: '20',
        rowGap: '20'
    });

    const [copied, setCopied] = useState(false);

    const generatedCode = useMemo(() => {
        if (mode === 'flex') {
            return `.flex-container {\n  display: flex;\n  flex-direction: ${flexProps.direction};\n  justify-content: ${flexProps.justify};\n  align-items: ${flexProps.align};\n  flex-wrap: ${flexProps.wrap};\n  gap: ${flexProps.gap}px;\n}`;
        } else {
            return `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${gridProps.cols}, 1fr);\n  grid-template-rows: repeat(${gridProps.rows}, 1fr);\n  gap: ${gridProps.gap}px;\n}`;
        }
    }, [mode, flexProps, gridProps]);

    const copyCode = async () => {
        await navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">▢</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">Layout Lab</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Visual Grid & Flexbox Builder
                        </p>
                    </div>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                    <button
                        onClick={() => setMode('flex')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'flex' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-lg' : 'text-slate-400'
                            }`}
                    >
                        Flexbox
                    </button>
                    <button
                        onClick={() => setMode('grid')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'grid' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-lg' : 'text-slate-400'
                            }`}
                    >
                        CSS Grid
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Adjust Properties</h4>

                        {mode === 'flex' ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Direction</label>
                                        <select
                                            value={flexProps.direction}
                                            onChange={(e) => setFlexProps({ ...flexProps, direction: e.target.value })}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-2 ring-indigo-500/20"
                                        >
                                            <option value="row">Row</option>
                                            <option value="column">Column</option>
                                            <option value="row-reverse">Row Reverse</option>
                                            <option value="column-reverse">Column Reverse</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Wrap</label>
                                        <select
                                            value={flexProps.wrap}
                                            onChange={(e) => setFlexProps({ ...flexProps, wrap: e.target.value })}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-2 ring-indigo-500/20"
                                        >
                                            <option value="nowrap">No Wrap</option>
                                            <option value="wrap">Wrap</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Justify Content ({flexProps.justify})</label>
                                    <div className="flex flex-wrap gap-1">
                                        {['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFlexProps({ ...flexProps, justify: opt })}
                                                className={`px-2 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${flexProps.justify === opt ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {opt.replace('flex-', '')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Align Items</label>
                                    <div className="flex flex-wrap gap-1">
                                        {['stretch', 'center', 'flex-start', 'flex-end', 'baseline'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFlexProps({ ...flexProps, align: opt })}
                                                className={`px-2 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${flexProps.align === opt ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {opt.replace('flex-', '')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Columns</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={gridProps.cols}
                                            onChange={(e) => setGridProps({ ...gridProps, cols: e.target.value })}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Rows</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={gridProps.rows}
                                            onChange={(e) => setGridProps({ ...gridProps, rows: e.target.value })}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase mb-1">Gap ({gridProps.gap}px)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={gridProps.gap}
                                        onChange={(e) => setGridProps({ ...gridProps, gap: e.target.value })}
                                        className="w-full accent-indigo-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generated CSS</h4>
                            <button onClick={copyCode} className={`text-[9px] font-black uppercase transition-all ${copied ? 'text-green-500' : 'text-indigo-500 hover:underline'}`}>
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        </div>
                        <pre className="p-5 rounded-3xl bg-slate-900 text-indigo-300 text-xs font-mono border border-slate-800 shadow-xl">
                            {generatedCode}
                        </pre>
                    </div>
                </div>

                <div className="flex flex-col h-full space-y-4 min-h-[400px]">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Preview</h4>
                    <div className="flex-1 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 overflow-hidden relative">
                        <div
                            style={{
                                display: mode === 'flex' ? 'flex' : 'grid',
                                flexDirection: (flexProps.direction as any),
                                justifyContent: (flexProps.justify as any),
                                alignItems: (flexProps.align as any),
                                flexWrap: (flexProps.wrap as any),
                                gap: `${mode === 'flex' ? flexProps.gap : gridProps.gap}px`,
                                gridTemplateColumns: mode === 'grid' ? `repeat(${gridProps.cols}, 1fr)` : undefined,
                                gridTemplateRows: mode === 'grid' ? `repeat(${gridProps.rows}, 1fr)` : undefined,
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            {[...Array(mode === 'flex' ? 4 : (Number(gridProps.cols) * Number(gridProps.rows)) || 1)].slice(0, 12).map((_, i) => (
                                <div key={i} className={`min-w-[60px] min-h-[60px] rounded-2xl bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center text-indigo-600 font-black shadow-lg animate-fade-in`}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
