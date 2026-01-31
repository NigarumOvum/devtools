import React from 'react';

interface AgentCardProps {
    agent: {
        id: string;
        name: string;
        icon: string;
        description: string;
        specialties?: string[];
        isPreset?: boolean;
    };
    onSelect: (id: string) => void;
    isSelected?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, isSelected }) => {
    const specialties = typeof agent.specialties === 'string'
        ? JSON.parse(agent.specialties)
        : (agent.specialties || []);

    return (
        <button
            onClick={() => onSelect(agent.id)}
            className={`relative group text-left transition-all duration-500 rounded-3xl p-6 border-2 h-full w-full
                ${isSelected
                    ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/40 border-slate-800/50 hover:border-slate-700/80 hover:bg-slate-900/60'
                }
            `}
        >
            {/* Background Glow */}
            <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br transition-all duration-500 opacity-0 group-hover:opacity-100 blur
                ${isSelected ? 'from-blue-500 to-indigo-600' : 'from-slate-700 to-slate-800'}
            `} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 shadow-lg
                        ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}
                    `}>
                        {agent.icon || '🤖'}
                    </div>
                    {agent.isPreset && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                            Preset
                        </span>
                    )}
                </div>

                <h3 className={`text-lg font-black mb-2 tracking-tight transition-colors
                    ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}
                `}>
                    {agent.name}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {agent.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {specialties.slice(0, 3).map((s: string) => (
                        <span
                            key={s}
                            className="px-2 py-0.5 rounded-lg bg-slate-800/50 text-[10px] font-bold text-slate-500 border border-slate-700/50"
                        >
                            {s}
                        </span>
                    ))}
                    {specialties.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-600 flex items-center px-1">
                            +{specialties.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Selection indicator */}
            <div className={`absolute top-4 right-4 transition-transform duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
        </button>
    );
};
