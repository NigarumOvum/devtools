import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AgentCard } from './AgentCard';
import { ui, defaultLang } from '../i18n/ui';

export const AgentsManager: React.FC<{ lang: string }> = ({ lang }) => {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

    const t = (key: string) => {
        const translations = ui[lang as keyof typeof ui] || ui[defaultLang];
        return (translations as any)[key] || (ui[defaultLang] as any)[key] || key;
    };

    const fetchAgents = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/agents');
            if (res.ok) {
                const data = await res.json();
                setAgents(data);
            }
        } catch (e) {
            console.error('Failed to fetch agents:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-[400px] bg-slate-900/50 rounded-[3rem] animate-pulse border border-slate-800" />
                ))}
            </div>
        );
    }

    const PRESET_IDS = new Set(['senior_se', 'architect', 'manager', 'devops', 'security', 'frontend']);
    const allAgents = agents.map(a => ({
        ...a,
        isPreset: PRESET_IDS.has(a.id)
    }));

    const [importing, setImporting] = useState(false);
    const [importText, setImportText] = useState('');

    const exportAll = async () => {
        const res = await fetch('/api/agents/markdown');
        if (res.ok) {
            const md = await res.text();
            const blob = new Blob([md], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'agents.md';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleImport = async () => {
        try {
            const res = await fetch('/api/agents/markdown', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markdown: importText }),
            });
            if (res.ok) {
                await fetchAgents();
                setImporting(false);
                setImportText('');
            } else {
                console.error('import failed', await res.text());
            }
        } catch (e) {
            console.error('import error', e);
        }
    };

    return (
        <section>
            {/* import/export controls */}
            <div className="flex justify-end items-center mb-4 gap-2">
                {importing && (
                    <textarea
                        className="w-full max-w-lg p-2 border rounded"
                        rows={4}
                        placeholder="Paste agents markdown here"
                        value={importText}
                        onChange={e => setImportText(e.target.value)}
                    />
                )}
                {importing ? (
                    <button
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        onClick={handleImport}
                    >
                        Import
                    </button>
                ) : (
                    <>
                        <button
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                            onClick={exportAll}
                        >
                            Export all
                        </button>
                        <button
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                            onClick={() => setImporting(true)}
                        >
                            Import
                        </button>
                    </>
                )}
            </div>
            <motion.section
                id="agents-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
            >
                <div className="flex flex-col items-center justify-center p-12 glass-card rounded-[3rem] border-2 border-dashed border-slate-700/50 bg-slate-900/20 text-center min-h-[400px] group hover:border-blue-500/50 transition-colors">
                    <div className="w-20 h-20 rounded-3xl bg-slate-800 flex items-center justify-center text-4xl mb-6 text-slate-500 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all duration-500">
                        ➕
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        {t('agents.buildNew')}
                    </h3>
                    <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-8">
                        {t('agents.buildNewDesc')}
                    </p>
                    <a
                        href="/studio"
                        className="px-8 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold hover:bg-blue-600/20 transition-all"
                    >
                        {t('agents.openStudio')}
                    </a>
                </div>

                {allAgents.map((agent, index) => (
                    <motion.div
                        key={agent.id}
                        className="cursor-pointer"
                        onClick={() => window.location.href = `/studio#expert-chat`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                    >
                        <AgentCard
                            agent={agent}
                            isSelected={selectedAgentId === agent.id}
                            onSelect={setSelectedAgentId}
                        />
                    </motion.div>
                ))}
            </motion.section>
        </section>
    );
};
