import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

const targets = [
    { id: 'html', label: 'HTML', icon: '🌐' },
    { id: 'text', label: 'Plain Text', icon: '📄' },
];

export default function MarkdownPreview() {
    const [markdown, setMarkdown] = useState('');
    const [target, setTarget] = useState('html');
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

    const plainText = useMemo(() => {
        return markdown.replace(/[#*`>|\[\]()]/g, '').replace(/- /g, '');
    }, [markdown]);

    const copyResult = useCallback(async () => {
        const result = target === 'html' ? parseMarkdown(markdown) : plainText;
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Content copied to clipboard!');
    }, [markdown, target, parseMarkdown, plainText]);

    const exportToPdf = () => {
        toast.info('Preparing PDF export...');
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>DevTools Pro - Markdown Export</title>
                    <style>
                        body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; line-height: 1.6; }
                        pre { background: #f4f4f4; padding: 15px; border-radius: 8px; }
                        code { font-family: monospace; }
                        h1, h2, h3 { color: #1a202c; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
                    </style>
                </head>
                <body>
                    ${parseMarkdown(markdown)}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">MD</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">Markdown Pro</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Edit • Preview • Export
                        </p>
                    </div>
                </div>
                <button
                    onClick={exportToPdf}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                    <span>PDF</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Markdown Source</label>
                        <button
                            onClick={() => setMarkdown(sampleMarkdown)}
                            className="text-[10px] font-black text-blue-500 uppercase hover:underline"
                        >
                            Load Sample
                        </button>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="# Write your markdown here..."
                        className="flex-1 w-full p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-sm font-mono outline-none focus:border-blue-500 transition-all custom-scrollbar resize-none"
                    />
                </div>

                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            {targets.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTarget(t.id)}
                                    className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${target === t.id ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'
                                        }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={copyResult}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div
                        className="flex-1 overflow-auto p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 custom-scrollbar shadow-inner"
                        dangerouslySetInnerHTML={{
                            __html: markdown
                                ? (target === 'html' ? parseMarkdown(markdown) : `<pre class="text-xs font-mono">${plainText}</pre>`)
                                : '<div class="h-full flex items-center justify-center text-slate-300 italic text-sm">Preview will appear here...</div>'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
