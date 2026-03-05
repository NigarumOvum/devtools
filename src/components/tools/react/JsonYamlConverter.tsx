import React, { useState } from 'react';
import yaml from 'js-yaml';
import { toast } from 'sonner';

export default function JsonYamlConverter() {
    const [input, setInput] = useState('{\n  "version": "1.0",\n  "tools": [\n    "json",\n    "yaml"\n  ],\n  "active": true\n}');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');

    const convert = () => {
        try {
            if (!input.trim()) {
                setOutput('');
                return;
            }
            if (mode === 'json-to-yaml') {
                const parsed = JSON.parse(input);
                setOutput(yaml.dump(parsed));
            } else {
                const parsed = yaml.load(input);
                setOutput(JSON.stringify(parsed, null, 2));
            }
        } catch (err: any) {
            setOutput(`Error: ${err.message}`);
        }
    };

    const copyToClipboard = async () => {
        if (!output) return;
        try {
            await navigator.clipboard.writeText(output);
            toast.success("Copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">JY</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">JSON ⇄ YAML Bridge</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Format • Convert • Validate
                        </p>
                    </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                        onClick={() => { setMode('json-to-yaml'); setInput(''); setOutput(''); }}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'json-to-yaml' ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        JSON → YAML
                    </button>
                    <button
                        onClick={() => { setMode('yaml-to-json'); setInput(''); setOutput(''); }}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'yaml-to-json' ? 'bg-white dark:bg-slate-700 text-orange-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        YAML → JSON
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                {/* Input Area */}
                <div className="flex flex-col min-h-0 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 transition-all">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Input {mode === 'json-to-yaml' ? 'JSON' : 'YAML'}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={convert}
                                className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-colors"
                            >
                                Convert
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            // Auto convert if short text
                            if (e.target.value.length < 5000) {
                                setTimeout(convert, 300);
                            }
                        }}
                        placeholder={`Paste your ${mode === 'json-to-yaml' ? 'JSON' : 'YAML'} here...`}
                        className="flex-1 w-full p-4 bg-transparent outline-none text-sm font-mono text-slate-700 dark:text-slate-300 resize-none custom-scrollbar"
                        spellCheck="false"
                    />
                </div>

                {/* Output Area */}
                <div className="flex flex-col min-h-0 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-inner">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Output {mode === 'json-to-yaml' ? 'YAML' : 'JSON'}</span>
                        <button
                            onClick={copyToClipboard}
                            className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
                        <textarea
                            value={output}
                            readOnly
                            placeholder={`Result will appear here...`}
                            className={`flex-1 w-full h-full p-4 bg-transparent outline-none text-sm font-mono resize-none custom-scrollbar ${output.startsWith('Error') ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
