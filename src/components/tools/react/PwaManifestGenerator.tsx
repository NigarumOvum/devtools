import { useState, useMemo, useCallback } from 'react';

export default function PwaManifestGenerator() {
    const [manifest, setManifest] = useState({
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'A brief description of my awesome application.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'any',
        scope: '/',
    });

    const [icons, setIcons] = useState([
        { src: 'icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
        { src: 'icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ]);

    const manifestJson = useMemo(() => {
        return JSON.stringify({ ...manifest, icons }, null, 2);
    }, [manifest, icons]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setManifest((prev) => ({ ...prev, [name]: value }));
    };

    const handleIconChange = (index: number, field: string, value: string) => {
        setIcons((prev) => {
            const newIcons = [...prev];
            newIcons[index] = { ...newIcons[index], [field]: value };
            return newIcons;
        });
    };

    const addIcon = () => {
        setIcons((prev) => [...prev, { src: 'icon-new.png', sizes: '192x192', type: 'image/png', purpose: 'any' }]);
    };

    const removeIcon = (index: number) => {
        setIcons((prev) => prev.filter((_, i) => i !== index));
    };

    const downloadManifest = useCallback(() => {
        const blob = new Blob([manifestJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'manifest.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [manifestJson]);

    return (
        <div className="tool-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">PWA</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">PWA Manifest</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Generate & Export Manifest.json
                        </p>
                    </div>
                </div>
                <button
                    onClick={downloadManifest}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                >
                    Download JSON
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Basic Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">App Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={manifest.name}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Short Name</label>
                                <input
                                    type="text"
                                    name="short_name"
                                    value={manifest.short_name}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Description</label>
                            <textarea
                                name="description"
                                value={manifest.description}
                                onChange={handleChange}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all h-20"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Start URL</label>
                                <input
                                    type="text"
                                    name="start_url"
                                    value={manifest.start_url}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Display Mode</label>
                                <select
                                    name="display"
                                    value={manifest.display}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all"
                                >
                                    <option value="fullscreen">Fullscreen</option>
                                    <option value="standalone">Standalone</option>
                                    <option value="minimal-ui">Minimal UI</option>
                                    <option value="browser">Browser</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Design & Branding</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Theme Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="theme_color"
                                        value={manifest.theme_color}
                                        onChange={handleChange}
                                        className="h-9 w-9 p-0 border-0 bg-transparent rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        name="theme_color"
                                        value={manifest.theme_color}
                                        onChange={handleChange}
                                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-mono focus:border-purple-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Background Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="background_color"
                                        value={manifest.background_color}
                                        onChange={handleChange}
                                        className="h-9 w-9 p-0 border-0 bg-transparent rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        name="background_color"
                                        value={manifest.background_color}
                                        onChange={handleChange}
                                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-mono focus:border-purple-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Icons</h4>
                            <button
                                onClick={addIcon}
                                className="text-[10px] font-black text-purple-500 uppercase hover:underline"
                            >
                                + Add Icon
                            </button>
                        </div>
                        <div className="space-y-4">
                            {icons.map((icon, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 relative group">
                                    <button
                                        onClick={() => removeIcon(idx)}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Source</label>
                                            <input
                                                type="text"
                                                value={icon.src}
                                                onChange={(e) => handleIconChange(idx, 'src', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:border-purple-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Sizes</label>
                                            <input
                                                type="text"
                                                value={icon.sizes}
                                                onChange={(e) => handleIconChange(idx, 'sizes', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:border-purple-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Live Preview (JSON)</h4>
                    </div>
                    <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 overflow-hidden shadow-2xl">
                        <pre className="text-xs font-mono text-purple-300 overflow-x-auto max-h-[600px] custom-scrollbar">
                            {manifestJson}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
