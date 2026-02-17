import React, { useState, useEffect, useCallback } from 'react';
import { ExpertChat } from './ExpertChat';
import { PromptLibrary } from './PromptLibrary';
import { AuthButton } from './AuthButton';
import { AgentCard } from './AgentCard';
import { AgentBuilder } from './AgentBuilder';
import { PROMPT_LIBRARY } from '../lib/ai/prompt-library';
import { ui, defaultLang } from '../i18n/ui';

export const StudioSection: React.FC<{ initialSession: any; lang?: keyof typeof ui }> = ({ initialSession, lang = defaultLang }) => {
    const [user, setUser] = useState(initialSession?.user || null);
    const [mounted, setMounted] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [agents, setAgents] = useState<any[]>([]);
    const [showBuilder, setShowBuilder] = useState(false);
    const [selectedAgentId, setSelectedAgentId] = useState('senior_se');
    const [loadingAgents, setLoadingAgents] = useState(false);
    const [expertsSectionOpen, setExpertsSectionOpen] = useState(true);

    const t = (key: keyof typeof ui[typeof defaultLang]) => ui[lang][key] || ui[defaultLang][key];

    const fetchAgents = useCallback(async () => {
        if (!user) return;
        setLoadingAgents(true);
        try {
            const res = await fetch('/api/agents');
            if (res.ok) {
                const data = await res.json();
                setAgents(data);
            }
        } catch (e) {
            console.error('Failed to fetch agents:', e);
        } finally {
            setLoadingAgents(false);
        }
    }, [user]);

    useEffect(() => {
        setMounted(true);
        if (!initialSession?.user) {
            const savedUser = localStorage.getItem('devtools_user');
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (e) {
                    localStorage.removeItem('devtools_user');
                }
            }
        } else {
            setUser(initialSession.user);
        }
    }, [initialSession]);

    useEffect(() => {
        if (user) {
            fetchAgents();
        }
    }, [user, fetchAgents]);

    const handlePromptSelect = useCallback((template: string) => {
        setSelectedPrompt(template);
        // Scroll to chat
        document.getElementById('expert-chat')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const handleCreateAgent = async (agentData: any) => {
        try {
            const res = await fetch('/api/agents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agentData),
            });
            if (res.ok) {
                await fetchAgents();
                setShowBuilder(false);
            }
        } catch (e) {
            console.error('Failed to create agent:', e);
        }
    };

    if (!mounted) return (
        <div className="space-y-6">
            <div className="h-[600px] bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800"></div>
            <div className="h-[400px] bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800"></div>
        </div>
    );

    if (!user) {
        return (
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-slate-700 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-900/80">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
                <div className="relative p-16 text-center">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center text-5xl mb-8 border border-blue-500/10">
                        🔓
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{t('studioSection.unlockTitle')}</h3>
                    <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                        {t('studioSection.unlockDesc')}
                    </p>
                    <AuthButton session={initialSession} lang={lang} />
                </div>
            </div>
        );
    }

    const advancedPrompts = PROMPT_LIBRARY.filter(p => p.technique && p.technique !== 'standard').length;
    const promptsWithVars = PROMPT_LIBRARY.filter(p => p.variables && p.variables.length > 0).length;

    const PRESET_IDS = new Set(['senior_se', 'architect', 'manager', 'devops', 'security', 'frontend']);
    const allAgents = agents.map(a => ({
        ...a,
        isPreset: PRESET_IDS.has(a.id)
    }));

    return (
        <div className="flex flex-col gap-12">
            {/* Agent Selection Row */}
            <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <button
                        onClick={() => setExpertsSectionOpen(prev => !prev)}
                        className="flex items-center gap-3 group text-left"
                    >
                        <svg
                            className={`w-5 h-5 text-slate-400 group-hover:text-white transition-all duration-300 ${expertsSectionOpen ? 'rotate-0' : '-rotate-90'}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <div>
                            <h2 className="text-xl font-black text-white mb-1 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{t('studioSection.chooseExpert')}</h2>
                            <p className="text-slate-500 text-xs">{t('studioSection.chooseExpertDesc')}</p>
                        </div>
                    </button>
                    <button
                        onClick={() => setShowBuilder(true)}
                        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 group"
                    >
                        <span className="text-lg group-hover:rotate-90 transition-transform duration-300">+</span> {t('studioSection.createAgent')}
                    </button>
                </div>

                <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        maxHeight: expertsSectionOpen ? '1000px' : '0px',
                        opacity: expertsSectionOpen ? 1 : 0,
                    }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
                        {allAgents.map(agent => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                isSelected={selectedAgentId === agent.id}
                                onSelect={setSelectedAgentId}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Interface */}
            <div id="expert-chat" className="w-full scroll-mt-24">
                <ExpertChat
                    initialPrompt={selectedPrompt}
                    onPromptUsed={() => setSelectedPrompt(null)}
                    selectedAgentId={selectedAgentId}
                    agents={allAgents}
                />
            </div>

            {/* Prompt Library and Support Info below */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-800/50">
                <div id="prompt-library" className="lg:col-span-1">
                    <PromptLibrary onSelect={handlePromptSelect} />
                </div>

                <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-white mb-0.5">{allAgents.length}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('studioSection.experts')}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-white mb-0.5">3</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('studioSection.aiModels')}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-white mb-0.5">{PROMPT_LIBRARY.length}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('studioSection.prompts')}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-purple-400 mb-0.5">{advancedPrompts}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('studioSection.advanced')}</div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/10 to-purple-600/5 border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🧠</span>
                                <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider">{t('studioSection.chainOfThought')}</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{t('studioSection.chainOfThoughtDesc')}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-600/10 to-orange-600/5 border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">⚡</span>
                                <h4 className="text-xs font-black text-orange-400 uppercase tracking-wider">{t('studioSection.reactPattern')}</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{t('studioSection.reactPatternDesc')}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">📖</span>
                                <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider">{t('studioSection.fewShot')}</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{t('studioSection.fewShotDesc')}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-emerald-600/5 border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🔧</span>
                                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">{promptsWithVars} {t('studioSection.variables')}</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{t('studioSection.variablesDesc')}</p>
                        </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">⌨️</span>
                            <h3 className="font-black text-white text-sm">{t('studioSection.keyboardShortcuts')}</h3>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">{t('studioSection.quickSearch')}</span>
                                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-500 font-mono">⌘K</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">{t('studioSection.sendMessage')}</span>
                                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-500 font-mono">⌘↵</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">{t('studioSection.closeModal')}</span>
                                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-500 font-mono">ESC</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showBuilder && (
                <AgentBuilder
                    onSave={handleCreateAgent}
                    onCancel={() => setShowBuilder(false)}
                />
            )}
        </div>
    );
};
