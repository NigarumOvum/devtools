import React, { useState, useEffect } from 'react';
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
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{t('workflow.title')}</h2>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder={t('workflow.inputPlaceholder')}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-2">{t('workflow.chooseAgents')}</h3>
                <div className="flex flex-wrap gap-2">
                    {agents.map(agent => (
                        <button
                            key={agent.id}
                            className={`px-3 py-1 rounded border ${selectedIds.includes(agent.id) ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'}`}
                            onClick={() => toggleSelect(agent.id)}
                        >
                            {agent.icon} {agent.name}
                        </button>
                    ))}
                </div>
                <div className="mt-2 flex gap-2">
                    <button
                        className="text-sm text-blue-400 underline"
                        onClick={() => downloadMarkdown()}
                    >
                        Export workflow
                    </button>
                    <button
                        className="text-sm text-blue-400 underline"
                        onClick={() => setImporting(prev => !prev)}
                    >
                        {importing ? 'Cancel import' : 'Import workflow'}
                    </button>
                </div>
                {importing && (
                    <div className="mt-2">
                        <textarea
                            className="w-full p-2 border rounded"
                            rows={4}
                            placeholder="Paste workflow markdown here"
                            value={importText}
                            onChange={e => setImportText(e.target.value)}
                        />
                        <button
                            className="mt-1 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                            onClick={handleImport}
                        >
                            Import
                        </button>
                    </div>
                )}
            </div>
            <button
                className="px-5 py-2 bg-green-600 text-white rounded"
                onClick={run}
                disabled={loading || selectedIds.length === 0 || input.trim() === ''}
            >
                {loading ? t('workflow.running') : t('workflow.run')}
            </button>
            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t('workflow.results')}</h3>
                    <ol className="list-decimal pl-5">
                        {results.map((r, i) => (
                            <li key={i} className="mb-2">
                                <strong>{r.name}:</strong> {r.response}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};
