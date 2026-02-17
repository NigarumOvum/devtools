import { useState, useMemo, useEffect } from 'react';

export default function HtmlEditor() {
    const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>Live Preview</title>
    <style>
        body { font-family: system-ui; text-align: center; padding-top: 50px; background: #f0f4f8; }
        h1 { color: #2d3748; }
        .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Hello World! ✨</h1>
        <p>Edit the HTML on the left and see it update here instantly.</p>
    </div>
</body>
</html>`);

    const previewContent = useMemo(() => {
        return html;
    }, [html]);

    return (
        <div className="tool-card overflow-hidden h-[calc(100vh-12rem)] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">&lt;/&gt;</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">HTML Lab</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Live Interactive Editor
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2 shrink-0">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source Code</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative group">
                        <textarea
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            className="w-full h-full p-6 bg-transparent text-red-300 font-mono text-sm outline-none resize-none custom-scrollbar"
                            spellCheck={false}
                        />
                    </div>
                </div>

                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2 shrink-0">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Preview</span>
                        <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        </div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
                        <iframe
                            srcDoc={previewContent}
                            title="Preview"
                            className="w-full h-full border-none"
                            sandbox="allow-scripts"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
