import React, { useState, useEffect } from 'react';
import { PromptLibrary } from './PromptLibrary';
import type { PromptTemplate } from '../lib/ai/prompt-library';
import { ui, defaultLang } from '../i18n/ui';

export const PromptsManager: React.FC<{ lang: string }> = ({ lang }) => {
    const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
    const [loading, setLoading] = useState(true);

    const t = (key: string) => {
        const translations = (ui as any)[lang] || ui[defaultLang];
        return translations[key] || (ui[defaultLang] as any)[key] || key;
    };

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const res = await fetch('/api/prompts');
                if (res.ok) {
                    const data = await res.json();
                    setPrompts(data);
                }
            } catch (e) {
                console.error('Failed to fetch prompts:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchPrompts();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-[600px] bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800"></div>
            </div>
        );
    }

    return (
        <PromptLibrary
            prompts={prompts}
            onSelect={(template) => {
                navigator.clipboard.writeText(template);
                alert(t('common.copied'));
            }}
        />
    );
};
