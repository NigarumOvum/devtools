import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ui, defaultLang } from '../i18n/ui';
import { workflowToMarkdown, parseWorkflowsMarkdown } from '../lib/ai/markdown';

interface AgentOption {
    id: string;
    name: string;
    icon: string;
}

export const MultiAgentWorkflow: React.FC<{ lang: string }> = ({ lang }) => {
    const [agents, setAgents] = useState<AgentOption[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const t = (key: string) => {
        const translations = ui[lang as keyof typeof ui] || ui[defaultLang];
        return (translations as any)[key] || (ui[defaultLang] as any)[key] || key;
    };

    useEffect(() => {
        fetch('/api/agents')
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setAgents(data.map((a: any) => ({ id: a.id, name: a.name, icon: a.icon })));
            })
            .catch(e => console.error('failed to fetch agents', e));
    }, []);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const run = async () => {
        if (selectedIds.length === 0 || input.trim() === '') return;
        setLoading(true);
        try {
            const res = await fetch('/api/agents/workflow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agentIds: selectedIds, message: input }),
            });
            if (res.ok) {
                const data = await res.json();
                setResults(data.results || []);
            } else {
                console.error('workflow failed', await res.text());
            }
        } catch (e) {
            console.error('workflow error', e);
        } finally {
            setLoading(false);
        }
    };

    const [importing, setImporting] = useState(false);
    const [importText, setImportText] = useState('');

    const exportMarkdown = () => {
        const spec = { name: 'workflow', agentIds: selectedIds };
        return workflowToMarkdown(spec);
    };

    const downloadMarkdown = () => {
        const blob = new Blob([exportMarkdown()], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflow.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        try {
            const specs = parseWorkflowsMarkdown(importText);
            if (specs.length > 0) {
                setSelectedIds(specs[0].agentIds);
            }
            setImporting(false);
        } catch (e) {
            console.error('import failed', e);
        }
    };

    return (
        <motion.div
            className="p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2 animate-pulse delay-1000" />

            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <span className="text-2xl">⚡</span>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">{t('workflow.title')}</h2>
                    <p className="text-sm text-slate-400 font-medium">Coordinate multiple AI agents for complex tasks</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        {t('workflow.inputPlaceholder') || "Task Description"}
                    </label>
                    <textarea
                        className="w-full h-32 p-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none custom-scrollbar"
                        placeholder="Describe what the agents should accomplish together..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {t('workflow.chooseAgents') || "Select Agents"}
                        </label>
                        <div className="flex gap-3 text-xs">
                            <button className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors" onClick={downloadMarkdown}>
                                Export
                            </button>
                            <button className="text-slate-400 hover:text-white transition-colors" onClick={() => setImporting(prev => !prev)}>
                                {importing ? 'Cancel Import' : 'Import'}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {agents.map(agent => (
                            <button
                                key={agent.id}
                                className={`px-4 py-2.5 rounded-xl border-2 transition-all font-bold text-sm flex items-center gap-2
                                    ${selectedIds.includes(agent.id)
                                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/10'
                                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'
                                    }`}
                                onClick={() => toggleSelect(agent.id)}
                            >
                                <span className={selectedIds.includes(agent.id) ? 'scale-110 transition-transform' : ''}>
                                    {agent.icon}
                                </span>
                                {agent.name}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {importing && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4"
                            >
                                <textarea
                                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-300 focus:border-indigo-500 transition-all"
                                    rows={4}
                                    placeholder="Paste workflow markdown here..."
                                    value={importText}
                                    onChange={e => setImportText(e.target.value)}
                                />
                                <button
                                    className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors"
                                    onClick={handleImport}
                                >
                                    Load Workflow
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-slate-800/50">
                    <button
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex justify-center items-center gap-2 shadow-xl
                            ${loading || selectedIds.length === 0 || input.trim() === ''
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.01] hover:shadow-emerald-500/20'
                            }`}
                        onClick={run}
                        disabled={loading || selectedIds.length === 0 || input.trim() === ''}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t('workflow.running') || "Running Workflow..."}
                            </>
                        ) : (
                            <>
                                <span>🚀</span>
                                {t('workflow.run') || "Start Workflow"}
                            </>
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 space-y-4 pt-8 border-t border-slate-800/50"
                        >
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                {t('workflow.results') || "Execution Results"}
                            </h3>
                            <div className="space-y-4">
                                {results.map((r, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5"
                                    >
                                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-700/50">
                                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex flex-center text-lg">{r.icon || '🤖'}</div>
                                            <span className="font-bold text-white">{r.name}</span>
                                        </div>
                                        <div className="text-sm text-slate-300 prose prose-invert max-w-none prose-p:leading-relaxed">
                                            {r.response}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
