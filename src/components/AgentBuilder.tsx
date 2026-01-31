import React, { useState } from 'react';

interface AgentBuilderProps {
    onSave: (agent: any) => Promise<void>;
    onCancel: () => void;
}

const STEPS = [
    { id: 'info', name: 'Basic Info', icon: '📝' },
    { id: 'prompt', name: 'Agent Personality', icon: '🧠' },
    { id: 'capabilities', name: 'Capabilities', icon: '⚡' },
    { id: 'review', name: 'Final Review', icon: '🚀' },
];

const EMOJI_OPTIONS = ['🤖', '🧙‍♂️', '👨‍💻', '🕵️‍♀️', '🔐', '📊', '🏗️', '🎨', '🚀', '🧠', '🛠️', '🔬'];

export const AgentBuilder: React.FC<AgentBuilderProps> = ({ onSave, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        icon: '🤖',
        description: '',
        systemPrompt: '',
        specialties: [] as string[],
        model: 'gpt-4o',
        tools: [] as string[],
        isPublic: false
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-slate-800 bg-gradient-to-br from-blue-600/5 to-purple-600/5">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Create New Agent</h2>
                            <p className="text-slate-400 text-sm">Design a specialized AI assistant with custom logic.</p>
                        </div>
                        <button onClick={onCancel} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Step Progress */}
                    <div className="flex justify-between relative px-2">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
                            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                        />
                        {STEPS.map((step, idx) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 border-4
                                    ${idx <= currentStep
                                        ? 'bg-blue-600 border-slate-900 text-white shadow-xl shadow-blue-500/20 scale-110'
                                        : 'bg-slate-800 border-slate-900 text-slate-500 scale-100'}
                                `}>
                                    {idx < currentStep ? '✓' : step.icon}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-blue-400' : 'text-slate-600'}`}>
                                    {step.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {currentStep === 0 && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Select Icon</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {EMOJI_OPTIONS.map(emoji => (
                                            <button
                                                key={emoji}
                                                onClick={() => setFormData({ ...formData, icon: emoji })}
                                                className={`w-12 h-12 flex items-center justify-center text-xl rounded-xl transition-all
                                                    ${formData.icon === emoji ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-slate-800 hover:bg-slate-700'}
                                                `}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Agent Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Senior Vue Developer"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="What is this agent's main purpose?"
                                            rows={3}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-6 animate-slide-up">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">System Prompt / Instructions</label>
                                <p className="text-xs text-slate-500">Define how the agent should behave, its tone, and its expertise.</p>
                                <textarea
                                    value={formData.systemPrompt}
                                    onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                                    placeholder="You are an expert in... You should always... Focus on..."
                                    rows={12}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">AI Model</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['gpt-4o', 'gpt-4o-mini', 'o1-preview'].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setFormData({ ...formData, model: m })}
                                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all
                                                    ${formData.model === m ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}
                                                `}
                                            >
                                                <span className="text-sm font-bold text-white uppercase">{m}</span>
                                                {formData.model === m && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Enabled Tools</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['Web Search', 'Code Execution', 'File Analysis'].map(tool => (
                                            <div
                                                key={tool}
                                                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 opacity-50 cursor-not-allowed"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">🛠️</span>
                                                    <span className="text-sm font-bold text-slate-400 uppercase">{tool}</span>
                                                </div>
                                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Coming Soon</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-5xl shadow-2xl">
                                        {formData.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white mb-1 uppercase tracking-tight">{formData.name || 'Unnamed Agent'}</h3>
                                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                                            {formData.model}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</h4>
                                        <p className="text-slate-300 text-sm italic">{formData.description || 'No description provided.'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Capabilities</h4>
                                        <p className="text-slate-300 text-sm">Base Reasoning • Multi-modal • Custom Instructions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="p-8 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="px-8 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all disabled:opacity-20 flex items-center gap-2"
                    >
                        <span>←</span> Back
                    </button>

                    <div className="flex items-center gap-3">
                        {currentStep < STEPS.length - 1 ? (
                            <button
                                onClick={nextStep}
                                disabled={!formData.name}
                                className="px-10 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
                            >
                                Next Step <span>→</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-12 py-3 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest transition-all shadow-xl shadow-white/10 hover:bg-slate-100 flex items-center gap-2"
                            >
                                {loading ? 'Saving...' : 'Deploy Agent'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
