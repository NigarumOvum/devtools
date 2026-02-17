import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { PROMPT_LIBRARY, PROMPT_CATEGORIES, type PromptTemplate, type PromptVariable } from '../lib/ai/prompt-library';

interface PromptLibraryProps {
    onSelect: (template: string) => void;
    prompts?: PromptTemplate[];
}

// Local storage keys
const FAVORITES_KEY = 'devtools_prompt_favorites';
const HISTORY_KEY = 'devtools_prompt_history';

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ onSelect, prompts: initialPrompts }) => {
    const [prompts, setPrompts] = useState<PromptTemplate[]>(initialPrompts || PROMPT_LIBRARY);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<{ title: string; template: string; tags: string }>({ title: '', template: '', tags: '' });
    const [variableValues, setVariableValues] = useState<Record<string, string>>({});
    const [showQuickSearch, setShowQuickSearch] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

    const toggleCardExpand = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setExpandedCards(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleCopyTemplate = async (template: string, id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        try {
            await navigator.clipboard.writeText(template);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Update prompts if initialPrompts changes
    useEffect(() => {
        if (initialPrompts) {
            setPrompts(initialPrompts);
        }
    }, [initialPrompts]);

    // Load favorites and history from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem(FAVORITES_KEY);
        const savedHistory = localStorage.getItem(HISTORY_KEY);
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowQuickSearch(true);
            }
            if (e.key === 'Escape') {
                setShowQuickSearch(false);
                setSelectedPrompt(null);
                setIsEditing(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleFavorite = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const newFavorites = favorites.includes(id)
            ? favorites.filter(f => f !== id)
            : [...favorites, id];
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    };

    const addToHistory = (id: string) => {
        const newHistory = [id, ...history.filter(h => h !== id)].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    };

    const filteredPrompts = useMemo(() => {
        let currentPrompts = prompts;

        if (activeCategory === 'favorites') {
            currentPrompts = currentPrompts.filter(p => favorites.includes(p.id));
        } else if (activeCategory === 'history') {
            currentPrompts = history.map(id => currentPrompts.find(p => p.id === id)).filter(Boolean) as PromptTemplate[];
        } else if (activeCategory !== 'all') {
            currentPrompts = currentPrompts.filter(p => p.category === activeCategory);
        }

        if (search) {
            const s = search.toLowerCase();
            currentPrompts = currentPrompts.filter(p =>
                p.title.toLowerCase().includes(s) ||
                p.template.toLowerCase().includes(s) ||
                p.tags.some(t => t.toLowerCase().includes(s))
            );
        }

        return currentPrompts;
    }, [search, activeCategory, favorites, history, prompts]);

    const handleCopy = async (template: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        try {
            await navigator.clipboard.writeText(template);
            setCopiedId('copy');
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCardClick = (prompt: PromptTemplate) => {
        setSelectedPrompt(prompt);
        setVariableValues({});
        setIsEditing(false);
        setEditForm({
            title: prompt.title,
            template: prompt.template,
            tags: prompt.tags.join(', ')
        });
    };

    const handleUsePrompt = (prompt: PromptTemplate) => {
        if (prompt.variables && prompt.variables.length > 0) {
            // Variables handling remains inside the modal flow if needed, 
            // but here we just select it directly if no variables or from modal
            onSelect(prompt.template);
            addToHistory(prompt.id);
            setSelectedPrompt(null);
        } else {
            onSelect(prompt.template);
            addToHistory(prompt.id);
            setSelectedPrompt(null);
        }
    };

    const handleSaveEdit = async () => {
        if (!selectedPrompt) return;
        setIsSaving(true);
        try {
            const newTags = editForm.tags.split(',').map(t => t.trim()).filter(Boolean);

            const response = await fetch('/api/prompts/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedPrompt.id,
                    title: editForm.title,
                    template: editForm.template,
                    tags: newTags,
                    category: selectedPrompt.category // We don't edit category here for now
                })
            });

            if (response.ok) {
                // Update local state
                const updatedPrompt = {
                    ...selectedPrompt,
                    title: editForm.title,
                    template: editForm.template,
                    tags: newTags
                };

                setPrompts(prev => prev.map(p => p.id === selectedPrompt.id ? updatedPrompt : p));
                setSelectedPrompt(updatedPrompt);
                setIsEditing(false);
            } else {
                alert('Failed to save changes');
            }
        } catch (error) {
            console.error('Error saving prompt:', error);
            alert('Error saving prompt');
        } finally {
            setIsSaving(false);
        }
    };

    const processTemplate = (template: string, values: Record<string, string>): string => {
        let result = template;
        Object.entries(values).forEach(([key, value]) => {
            result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
        });
        return result;
    };

    const handleSubmitVariables = () => {
        if (!selectedPrompt) return;
        const processed = processTemplate(selectedPrompt.template, variableValues);
        onSelect(processed);
        addToHistory(selectedPrompt.id);
        setSelectedPrompt(null);
        setVariableValues({});
    };

    const getTechniqueLabel = (technique?: string) => {
        switch (technique) {
            case 'chain-of-thought': return { label: 'CoT', color: 'bg-purple-500/20 text-purple-400' };
            case 'react': return { label: 'ReAct', color: 'bg-orange-500/20 text-orange-400' };
            case 'few-shot': return { label: 'Few-Shot', color: 'bg-blue-500/20 text-blue-400' };
            default: return null;
        }
    };

    const categories = useMemo(() => {
        const cats = new Map<string, number>();
        prompts.forEach(p => {
            cats.set(p.category, (cats.get(p.category) || 0) + 1);
        });

        const sortedCats = Array.from(cats.keys()).sort().map(c => ({
            id: c,
            name: c,
            icon: '📁',
            count: cats.get(c) || 0
        }));

        return [
            { id: 'all', name: 'All Prompts', icon: '📚', count: prompts.length },
            ...sortedCats
        ];
    }, [prompts]);

    const allCategories = [
        ...categories,
        { id: 'favorites', name: 'Favorites', icon: '⭐', count: favorites.length },
        { id: 'history', name: 'Recent', icon: '🕐', count: history.length },
    ];

    return (
        <>
            <div className="bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
                {/* Header */}
                <div className="p-6 bg-slate-800/50 border-b border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-lg shadow-lg">
                                📚
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight">Prompt Library</h2>
                                <p className="text-xs text-slate-500 font-medium">{(initialPrompts || PROMPT_LIBRARY).length} templates • ⌘K to search</p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search prompts, categories, or tags..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-400 font-mono">⌘K</kbd>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="px-4 py-3 border-b border-slate-800/50 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {allCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                                {cat.id === 'favorites' && favorites.length > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-[10px]">{favorites.length}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Prompts Grid */}
                <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {filteredPrompts.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <div className="text-4xl mb-3">🔍</div>
                            <p className="text-sm font-medium">No prompts found</p>
                            <p className="text-xs text-slate-600 mt-1">Try a different search or category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {filteredPrompts.map((item) => {
                                const technique = getTechniqueLabel(item.technique);
                                const isExpanded = expandedCards.has(item.id);
                                return (
                                    <div
                                        key={item.id}
                                        className="group p-5 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/30 rounded-2xl cursor-pointer transition-all duration-200"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0" onClick={() => handleUsePrompt(item)}>
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <span className="text-lg">{item.icon}</span>
                                                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                                                    {technique && (
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${technique.color}`}>
                                                            {technique.label}
                                                        </span>
                                                    )}
                                                    {item.variables && item.variables.length > 0 && (
                                                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                                            {item.variables.length} vars
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                                    {item.template.substring(0, 120).replace(/\{\{.*?\}\}/g, '[...]')}...
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 rounded-md bg-slate-700/50 text-[10px] font-medium text-slate-400 uppercase tracking-wider"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={(e) => toggleCardExpand(item.id, e)}
                                                    className={`p-2 rounded-xl transition-all ${isExpanded
                                                        ? 'bg-blue-500/20 text-blue-400'
                                                        : 'bg-slate-700/50 text-slate-500 hover:text-blue-400 opacity-0 group-hover:opacity-100'
                                                        }`}
                                                    title={isExpanded ? 'Hide Template' : 'View Template'}
                                                >
                                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                                                    className={`p-2 rounded-xl transition-all ${favorites.includes(item.id)
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-slate-700/50 text-slate-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100'
                                                        }`}
                                                    title={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                                                >
                                                    <svg className="w-4 h-4" fill={favorites.includes(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleUsePrompt(item); }}
                                                    className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors shadow-lg shadow-blue-500/20 opacity-0 group-hover:opacity-100"
                                                    title="Use Template"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expandable Template Preview */}
                                        <div
                                            className="overflow-hidden transition-all duration-300 ease-in-out"
                                            style={{ maxHeight: isExpanded ? '600px' : '0px', opacity: isExpanded ? 1 : 0 }}
                                        >
                                            <div className="mt-4 pt-4 border-t border-slate-700/50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Template</span>
                                                    <button
                                                        onClick={(e) => handleCopyTemplate(item.template, item.id, e)}
                                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-[10px] font-bold text-slate-400 hover:text-white transition-colors"
                                                    >
                                                        {copiedId === item.id ? (
                                                            <>
                                                                <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                <span className="text-emerald-400">Copied!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                                Copy
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                <pre className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                                                    {item.template}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50">
                    <p className="text-[10px] text-slate-600 text-center font-medium uppercase tracking-widest">
                        {filteredPrompts.length} of {PROMPT_LIBRARY.length} prompts • ⭐ {favorites.length} favorites
                    </p>
                </div>
            </div>

            {/* Variable Input / Edit Modal */}
            {selectedPrompt && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => !isEditing && setSelectedPrompt(null)}>
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
                    <div
                        className="relative bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

                        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                            <div className="flex-1 mr-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{selectedPrompt.icon}</span>
                                    {isEditing ? (
                                        <input
                                            value={editForm.title}
                                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-xl font-black text-white outline-none focus:border-blue-500"
                                            placeholder="Prompt Title"
                                        />
                                    ) : (
                                        <h3 className="text-xl font-black text-white">{selectedPrompt.title}</h3>
                                    )}
                                </div>
                                {!isEditing && <p className="text-sm text-slate-400">Fill in the variables below to customize your prompt</p>}
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setEditForm({
                                            title: selectedPrompt.title,
                                            template: selectedPrompt.template,
                                            tags: selectedPrompt.tags.join(', ')
                                        });
                                    }}
                                    className="p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                                    title="Edit Prompt"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Template</label>
                                        <textarea
                                            value={editForm.template}
                                            onChange={e => setEditForm({ ...editForm, template: e.target.value })}
                                            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all resize-none font-mono"
                                            placeholder="Enter prompt template..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Tags (comma separated)</label>
                                        <input
                                            value={editForm.tags}
                                            onChange={e => setEditForm({ ...editForm, tags: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all"
                                            placeholder="e.g. coding, debug, react"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {selectedPrompt.variables?.map((variable) => (
                                        <div key={variable.id} className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                                {variable.name}
                                                {variable.required && <span className="text-rose-400">*</span>}
                                            </label>

                                            {variable.type === 'select' ? (
                                                <select
                                                    value={variableValues[variable.id] || ''}
                                                    onChange={(e) => setVariableValues({ ...variableValues, [variable.id]: e.target.value })}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all"
                                                >
                                                    <option value="">{variable.placeholder}</option>
                                                    {variable.options?.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : variable.type === 'code' || variable.type === 'multiline' ? (
                                                <textarea
                                                    value={variableValues[variable.id] || ''}
                                                    onChange={(e) => setVariableValues({ ...variableValues, [variable.id]: e.target.value })}
                                                    placeholder={variable.placeholder}
                                                    className={`w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all resize-none ${variable.type === 'code' ? 'font-mono text-xs' : ''
                                                        }`}
                                                    rows={variable.type === 'code' ? 8 : 4}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={variableValues[variable.id] || ''}
                                                    onChange={(e) => setVariableValues({ ...variableValues, [variable.id]: e.target.value })}
                                                    placeholder={variable.placeholder}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {(!selectedPrompt.variables || selectedPrompt.variables.length === 0) && (
                                        <div className="text-center py-8 text-slate-500">
                                            <p>No variables to configure.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-800 flex gap-3">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold hover:bg-slate-700 transition-colors"
                                    >
                                        Cancel Edit
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        disabled={isSaving}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setSelectedPrompt(null)}
                                        className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold hover:bg-slate-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitVariables}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        Use Prompt →
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Search Modal (⌘K) */}
            {showQuickSearch && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]" onClick={() => setShowQuickSearch(false)}>
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <div
                        className="relative bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search prompts..."
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
                            />
                            <kbd className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-500">ESC</kbd>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {filteredPrompts.slice(0, 8).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => { handleUsePrompt(item); setShowQuickSearch(false); }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{item.title}</div>
                                        <div className="text-xs text-slate-500">{item.category}</div>
                                    </div>
                                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
