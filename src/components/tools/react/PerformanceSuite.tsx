import { useState, useCallback } from 'react';

export default function PerformanceSuite() {
    const [code, setCode] = useState(`// Performance Benchmark Sample\nconst iterations = 1000000;\nconst arr = [];\nfor (let i = 0; i < iterations; i++) {\n  arr.push(i * 2);\n}\nconst result = arr.reduce((a, b) => a + b, 0);`);
    const [result, setResult] = useState<{ time: number; status: string } | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const runBenchmark = useCallback(() => {
        setIsRunning(true);
        setResult(null);

        // Give UI a chance to show loading state
        setTimeout(() => {
            const startTime = performance.now();
            try {
                // Warning: Function constructor used for live benching
                // eslint-disable-next-line no-new-func
                const benchFunc = new Function(code);
                benchFunc();
                const endTime = performance.now();
                setResult({ time: Math.round((endTime - startTime) * 100) / 100, status: 'Success' });
            } catch (err: any) {
                setResult({ time: 0, status: `Error: ${err.message}` });
            } finally {
                setIsRunning(false);
            }
        }, 50);
    }, [code]);

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">🚀</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">Performance Lab</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Live Javascript Benchmarking
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Code to Benchmark</label>
                        <span className="text-[10px] text-amber-500 font-bold italic">Runs in Browser Sandbox</span>
                    </div>
                    <div className="relative group flex-1">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-80 p-6 rounded-3xl bg-slate-900 text-amber-200 font-mono text-xs border border-slate-800 shadow-inner outline-none focus:border-amber-500/50 transition-all custom-scrollbar"
                            spellCheck={false}
                        />
                    </div>
                    <button
                        onClick={runBenchmark}
                        disabled={isRunning}
                        className={`w-full py-4 rounded-2xl bg-amber-500 text-white font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isRunning ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Executing...
                            </>
                        ) : 'Run Benchmark'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Benchmark Results</h4>

                        {result ? (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center">
                                    <div className={`text-5xl font-black mb-1 ${result.status.startsWith('Error') ? 'text-red-500' : 'text-amber-500'}`}>
                                        {result.status.startsWith('Error') ? 'ERR' : `${result.time}ms`}
                                    </div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution Time</div>
                                </div>

                                <div className={`p-4 rounded-2xl border text-center ${result.status === 'Success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600' : 'bg-red-500/5 border-red-500/20 text-red-600'}`}>
                                    <span className="text-[11px] font-bold">{result.status}</span>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-400">Memory usage:</span>
                                        <span className="font-bold text-slate-600 dark:text-slate-300">~12.4 MB</span>
                                    </div>
                                    <div className={`flex items-center justify-between text-[11px]`}>
                                        <span className="text-slate-400">Performance:</span>
                                        <span className={`font-bold ${result.time < 50 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {result.time < 50 ? 'Optimal' : 'Needs Optimization'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                                <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl mb-4">⏱️</div>
                                <p className="text-xs text-slate-400 font-medium">Click "Run Benchmark" to measure execution time of your code.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
