import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "../../../lib/hooks";
import { JsonTree } from "./JsonTree";

type JsonMode = "format" | "tree";

const SAMPLE_JSON =
  '{"project":"DevTools Pro","version":"2.1.0","active":true,"stats":{"users":1200,"uptime":"99.9%"},"stack":["React","Astro","Tailwind"],"settings":{"theme":"dark","notifications":true}}';

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<JsonMode>("format");
  const [error, setError] = useState("");
  const { copied, copy } = useCopyToClipboard("JSON copied to clipboard!");

  const parsedData = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const parsed = JSON.parse(input);
      setError("");
      return parsed;
    } catch (e) {
      const errorMessage = (e as Error).message;
      setError(errorMessage);
      toast.error("Invalid JSON: " + errorMessage);
      return null;
    }
  }, [input]);

  const formattedJson = useMemo(() => {
    if (parsedData === null) return "";
    return JSON.stringify(parsedData, null, 2);
  }, [parsedData]);

  const minifyJson = useCallback(() => {
    if (parsedData === null) return;
    setInput(JSON.stringify(parsedData));
  }, [parsedData]);

  const prettifyJson = useCallback(() => {
    if (parsedData === null) return;
    setInput(JSON.stringify(parsedData, null, 2));
  }, [parsedData]);

  const copyToClipboard = useCallback(() => {
    const textToCopy =
      mode === "format" ? formattedJson : JSON.stringify(parsedData, null, 2);
    copy(textToCopy);
  }, [formattedJson, parsedData, mode, copy]);

  const clearAll = useCallback(() => {
    setInput("");
    setError("");
  }, []);

  return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">{"{}"}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">JSON Suite</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Format • Validate • Visualize
                        </p>
                    </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                    {(['format', 'tree'] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === m
                                    ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Input Raw JSON</label>
                            {input && !error && <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[10px] font-black uppercase">Valid</span>}
                            {error && <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-[10px] font-black uppercase">Invalid</span>}
                        </div>
                        <button
                            onClick={() => setInput(SAMPLE_JSON)}
                            className="text-[10px] font-black text-orange-500 uppercase hover:text-orange-600 transition-colors"
                        >
                            Load Sample
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"paste": "here"}'
                        className="w-full h-32 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-sm font-mono focus:border-orange-500 transition-all outline-none"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <button onClick={prettifyJson} disabled={!parsedData} className="flex-1 py-3 px-4 rounded-xl bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-600 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-orange-500/20">
                        Prettify
                    </button>
                    <button onClick={minifyJson} disabled={!parsedData} className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition-all active:scale-95">
                        Minify
                    </button>
                    <button onClick={clearAll} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 hover:text-red-500 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
                        <p className="text-[10px] font-black text-red-500 uppercase mb-1">Syntax Error</p>
                        <p className="text-xs text-red-600 dark:text-red-400 font-mono italic">{error}</p>
                    </div>
                )}

                {parsedData && (
                    <div className="animate-fade-in border-t border-slate-100 dark:border-slate-800 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                {mode === 'format' ? 'Formatted Output' : 'Interactive Visualization'}
                            </h4>
                            <button
                                onClick={copyToClipboard}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                    }`}
                            >
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        </div>

                        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden">
                            {mode === 'format' ? (
                                <pre className="p-4 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto max-h-[400px]">
                                    {formattedJson}
                                </pre>
                            ) : (
                                <div className="p-4 overflow-auto max-h-[400px]">
                                    <JsonTree data={parsedData} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
  );
}
