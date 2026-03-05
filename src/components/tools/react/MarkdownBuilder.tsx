import React, { useState, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

export default function MarkdownBuilder() {
    const [markdown, setMarkdown] = useState<string>(`# Markdown Builder\n\nWelcome to the Markdown Builder! This tool allows you to write and preview markdown in real-time.\n\n## Features\n- **Live Preview**: See your changes instantly.\n- *Syntax Highlighting*: Code blocks are beautifully highlighted.\n- ~~Strikethrough~~, tables, and task lists are supported via GitHub Flavored Markdown.\n\n### Example Code\n\`\`\`javascript\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet("Developer"));\n\`\`\`\n\n> "The best way to predict the future is to invent it." - Alan Kay\n\n| Feature | Status |\n|---------|--------|\n| Tables | ✅ |\n| Links | ✅ |\n| Images | ✅ |\n`);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertText = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = markdown.substring(start, end);
        const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end);

        setMarkdown(newText);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const handleAction = (action: string) => {
        switch (action) {
            case 'bold': insertText('**', '**'); break;
            case 'italic': insertText('*', '*'); break;
            case 'h1': insertText('# ', ''); break;
            case 'h2': insertText('## ', ''); break;
            case 'h3': insertText('### ', ''); break;
            case 'quote': insertText('> ', ''); break;
            case 'code': insertText('`', '`'); break;
            case 'codeblock': insertText('\n```\n', '\n```\n'); break;
            case 'link': insertText('[', '](https://)'); break;
            case 'image': insertText('![alt text](', ')'); break;
            case 'ul': insertText('- ', ''); break;
            case 'ol': insertText('1. ', ''); break;
            case 'task': insertText('- [ ] ', ''); break;
            case 'table': insertText('\n| Column 1 | Column 2 |\n|---|---|\n| Value | Value |\n', ''); break;
            case 'clear': setMarkdown(''); break;
        }
    };

    const copyToClipboard = async () => {
        if (!markdown) return;
        try {
            await navigator.clipboard.writeText(markdown);
            toast.success("Markdown copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy text.");
        }
    };

    const exportToHtml = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; color: #333; }
        pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
        code { font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace; background-color: rgba(175, 184, 193, 0.2); padding: 0.2em 0.4em; border-radius: 6px; }
        blockquote { border-left: 0.25em solid #d0d7de; padding: 0 1em; color: #656d76; }
        table { border-spacing: 0; border-collapse: collapse; }
        td, th { border: 1px solid #d0d7de; padding: 6px 13px; }
        tr:nth-child(2n) { background-color: #f6f8fa; }
    </style>
</head>
<body>
    <div id="content"></div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        const originalMarkdown = ${JSON.stringify(markdown)};
        document.getElementById('content').innerHTML = marked.parse(originalMarkdown);
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.html';
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Exported to HTML!");
    };

    return (
        <div className="tool-card overflow-hidden flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl">📝</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">Markdown Builder</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Compose • Format • Preview
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                        <span>Copy MSG</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v0m-6 4h8m-6 4h6m-6 4h6" /></svg>
                    </button>
                    <button
                        onClick={exportToHtml}
                        className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border border-indigo-500/20"
                    >
                        <span>Export HTML</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <button
                        onClick={() => handleAction('clear')}
                        className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border border-rose-500/20"
                    >
                        <span>Clear</span>
                    </button>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-1 p-2 bg-slate-100 dark:bg-slate-800/50 rounded-2xl shrink-0">
                <ToolbarButton icon="B" onClick={() => handleAction('bold')} title="Bold" className="font-bold" />
                <ToolbarButton icon="I" onClick={() => handleAction('italic')} title="Italic" className="italic font-serif" />
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center"></div>
                <ToolbarButton icon="H1" onClick={() => handleAction('h1')} title="Heading 1" className="font-bold text-xs" />
                <ToolbarButton icon="H2" onClick={() => handleAction('h2')} title="Heading 2" className="font-bold text-xs" />
                <ToolbarButton icon="H3" onClick={() => handleAction('h3')} title="Heading 3" className="font-bold text-[10px]" />
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center"></div>
                <ToolbarButton icon="”" onClick={() => handleAction('quote')} title="Quote" className="font-serif font-black text-lg leading-none" />
                <ToolbarButton icon="</>" onClick={() => handleAction('code')} title="Inline Code" className="font-mono text-xs" />
                <ToolbarButton icon="[ ]" onClick={() => handleAction('codeblock')} title="Code Block" className="font-mono text-xs" />
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center"></div>
                <ToolbarButton icon="🔗" onClick={() => handleAction('link')} title="Link" />
                <ToolbarButton icon="🖼️" onClick={() => handleAction('image')} title="Image" />
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center"></div>
                <ToolbarButton icon="•" onClick={() => handleAction('ul')} title="Bullet List" className="text-xl leading-none" />
                <ToolbarButton icon="1." onClick={() => handleAction('ol')} title="Numbered List" className="font-bold text-xs" />
                <ToolbarButton icon="☑" onClick={() => handleAction('task')} title="Task List" />
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center"></div>
                <ToolbarButton icon="▦" onClick={() => handleAction('table')} title="Table" className="text-lg leading-none" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Editor Pane */}
                <div className="flex flex-col min-h-0 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Editor</span>
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Type your markdown here..."
                        className="flex-1 w-full p-4 bg-transparent outline-none text-sm font-mono text-slate-700 dark:text-slate-300 resize-none custom-scrollbar"
                        spellCheck="false"
                    />
                </div>

                {/* Preview Pane */}
                <div className="flex flex-col min-h-0 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-inner">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Preview</span>
                    </div>
                    <div className="flex-1 overflow-auto p-6 md:p-8 custom-scrollbar">
                        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-a:text-indigo-500 hover:prose-a:text-indigo-600
                            prose-img:rounded-xl prose-img:shadow-md
                            prose-pre:bg-slate-900 prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-800">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus as any}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {markdown || '*No content to preview*'}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ icon, onClick, title, className = '' }: { icon: string, onClick: () => void, title: string, className?: string }) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors ${className}`}
        >
            {icon}
        </button>
    );
}
