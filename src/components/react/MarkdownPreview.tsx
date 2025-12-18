import { useState, useCallback } from 'react';

export default function MarkdownPreview() {
    const [markdown, setMarkdown] = useState('');
    const [copied, setCopied] = useState(false);

    const sampleMarkdown = `# Hello World

This is a **bold** text and this is *italic*.

## Features
- Live preview
- Syntax highlighting
- Easy to use

### Code Example
\`\`\`javascript
const greeting = "Hello, DevTools!";
console.log(greeting);
\`\`\`

> This is a blockquote

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

[Visit GitHub](https://github.com)`;

    const parseMarkdown = useCallback((text: string): string => {
        let html = text
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block my-2 overflow-x-auto"><code>$2</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-sm font-mono">$1</code>')
            // Headers
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-800 dark:text-white">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-white">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4 text-slate-800 dark:text-white">$1</h1>')
            // Bold & Italic
            .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
            // Blockquotes
            .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-accent-500 pl-4 py-1 my-2 text-slate-600 dark:text-slate-400 italic">$1</blockquote>')
            // Unordered lists
            .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-accent-500 hover:text-accent-600 underline">$1</a>')
            // Tables
            .replace(/\|(.+)\|/g, (match) => {
                const cells = match.split('|').filter(cell => cell.trim() && !cell.includes('---'));
                if (cells.length > 0) {
                    const isHeader = !match.includes('---');
                    const cellTag = isHeader ? 'td' : 'th';
                    return `<tr>${cells.map(cell => `<${cellTag} class="border border-slate-300 dark:border-slate-600 px-3 py-2">${cell.trim()}</${cellTag}>`).join('')}</tr>`;
                }
                return '';
            })
            // Line breaks
            .replace(/\n\n/g, '</p><p class="my-2 text-slate-700 dark:text-slate-300">')
            .replace(/\n/g, '<br/>');

        return `<div class="prose dark:prose-invert max-w-none"><p class="my-2 text-slate-700 dark:text-slate-300">${html}</p></div>`;
    }, []);

    const copyHtml = useCallback(async () => {
        const html = parseMarkdown(markdown);
        await navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [markdown, parseMarkdown]);

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📝</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Markdown Preview</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Live markdown editor & preview</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Markdown</label>
                        <button
                            onClick={() => setMarkdown(sampleMarkdown)}
                            className="text-xs text-accent-500 hover:text-accent-600 transition-colors"
                        >
                            Load sample
                        </button>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="# Write your markdown here..."
                        className="tool-textarea h-64 lg:h-80"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview</label>
                        <button
                            onClick={copyHtml}
                            className={`text-xs px-3 py-1 rounded-lg transition-all ${copied
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }`}
                        >
                            {copied ? '✓ Copied!' : '📋 Copy HTML'}
                        </button>
                    </div>
                    <div
                        className="h-64 lg:h-80 overflow-auto p-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700"
                        dangerouslySetInnerHTML={{ __html: markdown ? parseMarkdown(markdown) : '<p class="text-slate-400">Preview will appear here...</p>' }}
                    />
                </div>
            </div>
        </div>
    );
}
