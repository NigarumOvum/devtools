import React, { useState, useEffect, useCallback } from 'react';
import { ExpertChat } from './ExpertChat';
import { PromptLibrary } from './PromptLibrary';
import { AuthButton } from './AuthButton';
import { PROMPT_LIBRARY } from '../lib/ai/prompt-library';
import { AGENTS } from '../lib/ai/agents';

export const StudioSection: React.FC<{ initialSession: any }> = ({ initialSession }) => {
    const [user, setUser] = useState(initialSession?.user || null);
    const [mounted, setMounted] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

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

    const handlePromptSelect = useCallback((template: string) => {
        setSelectedPrompt(template);
        // Scroll to chat
        document.getElementById('expert-chat')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

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
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Unlock Expert AI Insights</h3>
                    <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                        Consult with Senior Software Engineers, Architects, and Security Experts.
                        Get personalized advice powered by GPT-4o, Claude 3.5, and Gemini Pro.
                    </p>
                    <AuthButton session={initialSession} />
                </div>
            </div>
        );
    }

    const advancedPrompts = PROMPT_LIBRARY.filter(p => p.technique && p.technique !== 'standard').length;
    const promptsWithVars = PROMPT_LIBRARY.filter(p => p.variables && p.variables.length > 0).length;

    return (
        <div className="flex flex-col gap-12">
            {/* Main Chat Interface */}
            <div id="expert-chat" className="w-full scroll-mt-24">
                <ExpertChat initialPrompt={selectedPrompt} onPromptUsed={() => setSelectedPrompt(null)} />
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
                            <div className="text-2xl font-black text-white mb-0.5">{Object.keys(AGENTS).length}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Experts</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-white mb-0.5">3</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Models</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-white mb-0.5">{PROMPT_LIBRARY.length}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prompts</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <div className="text-2xl font-black text-purple-400 mb-0.5">{advancedPrompts}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Advanced</div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/10 to-purple-600/5 border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🧠</span>
                                <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider">Chain-of-Thought</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Step-by-step reasoning for complex problems</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-600/10 to-orange-600/5 border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">⚡</span>
                                <h4 className="text-xs font-black text-orange-400 uppercase tracking-wider">ReAct Pattern</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Reason + Act loops for task solving</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">📖</span>
                                <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider">Few-Shot</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Learn from examples for better output</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-emerald-600/5 border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🔧</span>
                                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">{promptsWithVars} Variables</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Interactive placeholders to customize</p>
                        </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">⌨️</span>
                            <h3 className="font-black text-white text-sm">Keyboard Shortcuts</h3>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Quick search prompts</span>
                                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-500 font-mono">⌘K</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Send message</span>
                                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-500 font-mono">⌘↵</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Close modal</span>
                                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-500 font-mono">ESC</kbd>
                            </div>
                        </div>
                    </div>

                    {/* Workspace Info */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20">
                        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                            <span>💡</span> Pro Tips
                        </h3>
                        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">✓</span>
                                Use <strong className="text-white">GPT-4o</strong> for complex logic and reasoning
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">✓</span>
                                Switch to <strong className="text-white">Claude 3.5</strong> for nuanced code
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">✓</span>
                                Click prompts to auto-fill the chat input
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">✓</span>
                                Export your chat history to Markdown
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
