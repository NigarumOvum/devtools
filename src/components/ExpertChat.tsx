import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AGENTS } from '../lib/ai/agents';
import type { AIProvider, ChatMessage } from '../lib/ai/ai-service';

const PROVIDERS = [
    { id: 'openai' as AIProvider, name: 'GPT-4o', icon: '🟢', color: 'from-emerald-500 to-green-600' },
    { id: 'gemini' as AIProvider, name: 'Gemini Pro', icon: '🔵', color: 'from-blue-500 to-cyan-500' },
    { id: 'claude' as AIProvider, name: 'Claude 3.5', icon: '🟣', color: 'from-purple-500 to-violet-600' },
];

interface ExpertChatProps {
    initialPrompt?: string | null;
    onPromptUsed?: () => void;
}

interface ChatStats {
    messageCount: number;
    tokensEstimate: number;
}

const CHAT_HISTORY_KEY = 'devtools_chat_history';

export const ExpertChat: React.FC<ExpertChatProps> = ({ initialPrompt, onPromptUsed }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('senior_se');
    const [provider, setProvider] = useState<AIProvider>('openai');
    const [loading, setLoading] = useState(false);
    const [streamingText, setStreamingText] = useState('');
    const [stats, setStats] = useState<ChatStats>({ messageCount: 0, tokensEstimate: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Load chat history
    useEffect(() => {
        const saved = localStorage.getItem(CHAT_HISTORY_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setMessages(parsed.messages || []);
                setStats(parsed.stats || { messageCount: 0, tokensEstimate: 0 });
            } catch (e) {
                console.error('Failed to load chat history:', e);
            }
        }
    }, []);

    // Save chat history
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify({ messages, stats }));
        }
    }, [messages, stats]);

    // Handle prompt selection from library
    useEffect(() => {
        if (initialPrompt) {
            setInput(initialPrompt);
            onPromptUsed?.();
            textareaRef.current?.focus();
        }
    }, [initialPrompt, onPromptUsed]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    const estimateTokens = (text: string): number => {
        return Math.ceil(text.split(/\s+/).length * 1.3);
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setStreamingText('');

        const userTokens = estimateTokens(input);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider,
                    roleId: selectedAgent,
                    messages: newMessages,
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const assistantTokens = estimateTokens(data.response);
            setMessages([...newMessages, { role: 'assistant', content: data.response }]);
            setStats(prev => ({
                messageCount: prev.messageCount + 2,
                tokensEstimate: prev.tokensEstimate + userTokens + assistantTokens,
            }));
        } catch (error: any) {
            console.error('Chat Error:', error);
            setMessages([...newMessages, { role: 'assistant', content: `⚠️ Error: ${error.message}` }]);
        } finally {
            setLoading(false);
            setStreamingText('');
        }
    };

    const clearChat = () => {
        setMessages([]);
        setStats({ messageCount: 0, tokensEstimate: 0 });
        localStorage.removeItem(CHAT_HISTORY_KEY);
    };

    const exportChat = () => {
        const agent = AGENTS[selectedAgent];
        const providerInfo = PROVIDERS.find(p => p.id === provider);

        let markdown = `# Chat Export\n\n`;
        markdown += `**Agent:** ${agent?.name || selectedAgent}\n`;
        markdown += `**Model:** ${providerInfo?.name || provider}\n`;
        markdown += `**Date:** ${new Date().toISOString()}\n`;
        markdown += `**Messages:** ${stats.messageCount}\n`;
        markdown += `**Estimated Tokens:** ~${stats.tokensEstimate.toLocaleString()}\n\n---\n\n`;

        messages.forEach((m) => {
            const role = m.role === 'user' ? '**You:**' : `**${agent?.name}:**`;
            markdown += `${role}\n\n${m.content}\n\n---\n\n`;
        });

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const currentAgent = AGENTS[selectedAgent];
    const currentProvider = PROVIDERS.find(p => p.id === provider);

    // Markdown components with syntax highlighting
    const markdownComponents = {
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <div className="relative my-4">
                    <div className="absolute top-0 right-0 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded-bl-lg rounded-tr-xl uppercase">
                        {match[1]}
                    </div>
                    <pre className="bg-slate-950 text-slate-100 rounded-xl p-4 pt-8 overflow-x-auto text-sm font-mono border border-slate-800">
                        <code {...props}>{String(children).replace(/\n$/, '')}</code>
                    </pre>
                </div>
            ) : (
                <code className="px-1.5 py-0.5 bg-slate-700 rounded text-sm font-mono text-emerald-400" {...props}>
                    {children}
                </code>
            );
        },
        p: ({ children }: any) => <p className="mb-3 last:mb-0">{children}</p>,
        ul: ({ children }: any) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>,
        h1: ({ children }: any) => <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-lg font-bold mt-3 mb-2">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-md font-bold mt-2 mb-1">{children}</h3>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-2 italic text-slate-400">{children}</blockquote>
        ),
        table: ({ children }: any) => (
            <div className="overflow-x-auto my-2">
                <table className="min-w-full border-collapse">{children}</table>
            </div>
        ),
        th: ({ children }: any) => <th className="border border-slate-600 px-3 py-2 bg-slate-800 text-left">{children}</th>,
        td: ({ children }: any) => <td className="border border-slate-700 px-3 py-2">{children}</td>,
    };

    return (
        <div className="flex flex-col h-[700px] w-full bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
            {/* Header */}
            <div className="p-5 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Agent Selector */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg ring-2 ring-blue-400/20">
                            {currentAgent?.icon || '🤖'}
                        </div>
                        <div>
                            <select
                                value={selectedAgent}
                                onChange={(e) => setSelectedAgent(e.target.value)}
                                className="bg-transparent text-white text-lg font-bold outline-none cursor-pointer hover:text-blue-400 transition-colors appearance-none pr-6"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '18px' }}
                            >
                                {Object.values(AGENTS).map(agent => (
                                    <option key={agent.id} value={agent.id} className="bg-slate-900 text-white">{agent.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500 font-medium max-w-xs truncate">{currentAgent?.description}</p>
                        </div>
                    </div>

                    {/* Provider & Actions */}
                    <div className="flex items-center gap-2">
                        <div className="flex bg-slate-800 rounded-2xl p-1 border border-slate-700">
                            {PROVIDERS.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setProvider(p.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${provider === p.id
                                        ? `bg-gradient-to-r ${p.color} text-white shadow-lg`
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <span>{p.icon}</span>
                                    <span className="hidden sm:inline">{p.name}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={exportChat}
                            disabled={messages.length === 0}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-xl text-slate-400 hover:text-white transition-colors border border-slate-700"
                            title="Export Chat to Markdown"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                        <button
                            onClick={clearChat}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors border border-slate-700"
                            title="Clear Chat"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stats Bar */}
                {stats.messageCount > 0 && (
                    <div className="flex gap-4 mt-3 pt-3 border-t border-slate-700/50 text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                        <span>💬 {stats.messageCount} messages</span>
                        <span>🎫 ~{stats.tokensEstimate.toLocaleString()} tokens</span>
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-4xl mb-6 shadow-inner border border-slate-700">
                            {currentAgent?.icon || '🤖'}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Start a Conversation</h3>
                        <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-6">
                            Ask the {currentAgent?.name} anything. Get expert advice on architecture, code review, debugging, and best practices.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['Review my code', 'Optimize performance', 'Design patterns', 'Debug this issue'].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setInput(suggestion + ' ')}
                                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'assistant' && (
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${currentProvider?.color || 'from-blue-500 to-indigo-600'} flex items-center justify-center text-sm flex-shrink-0 shadow-lg`}>
                                {currentAgent?.icon || '🤖'}
                            </div>
                        )}
                        <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-lg shadow-blue-500/10'
                            : 'bg-slate-800/50 text-slate-100 border border-slate-700 rounded-bl-sm'
                            }`}>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-2">
                                {m.role === 'user' ? 'You' : currentAgent?.name}
                            </div>
                            {m.role === 'assistant' ? (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={markdownComponents}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                            )}
                        </div>
                        {m.role === 'user' && (
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm flex-shrink-0">
                                👤
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${currentProvider?.color || 'from-blue-500 to-indigo-600'} flex items-center justify-center text-sm flex-shrink-0 animate-pulse shadow-lg`}>
                            {currentAgent?.icon || '🤖'}
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium ml-2">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-slate-800/30 border-t border-slate-700/50">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type your question... (Shift+Enter for new line)"
                            className="w-full bg-slate-900/80 text-white p-4 pr-12 rounded-2xl border border-slate-700 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600 text-sm"
                            rows={3}
                            disabled={loading}
                        />
                        <div className="absolute right-3 bottom-3 text-[10px] text-slate-600 font-medium">
                            ⌘↵
                        </div>
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
