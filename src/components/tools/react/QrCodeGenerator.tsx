import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function QrCodeGenerator() {
    const [text, setText] = useState('');
    const [size, setSize] = useState(256);
    const [copied, setCopied] = useState(false);

    const qrUrl = text
        ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=png&margin=10`
        : '';

    const downloadQr = useCallback(() => {
        if (!qrUrl) return;
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('QR Code download started!');
    }, [qrUrl]);

    const copyQrUrl = useCallback(async () => {
        if (!qrUrl) return;
        await navigator.clipboard.writeText(qrUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('QR Code URL copied to clipboard!');
    }, [qrUrl]);

    const presets = [
        { label: 'URL', value: 'https://example.com' },
        { label: 'Email', value: 'mailto:hello@example.com' },
        { label: 'Phone', value: 'tel:+1234567890' },
        { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:password123;;' },
    ];

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📱</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">QR Code Generator</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Generate QR codes from text or URLs</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Content</label>
                        <div className="flex gap-1">
                            {presets.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => setText(preset.value)}
                                    className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text, URL, email, phone number, or WiFi credentials..."
                        className="tool-textarea h-24"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Size:</label>
                    <input
                        type="range"
                        min="128"
                        max="512"
                        step="64"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                        className="flex-1 accent-accent-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 w-16">{size}px</span>
                </div>

                {text && (
                    <div className="animate-fade-in">
                        <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                            <img
                                src={qrUrl}
                                alt="Generated QR Code"
                                className="rounded-lg shadow-lg"
                                style={{ width: Math.min(size, 256), height: Math.min(size, 256) }}
                            />
                            <div className="flex gap-2">
                                <button onClick={downloadQr} className="tool-btn-primary">
                                    <span className="mr-2">⬇️</span>Download PNG
                                </button>
                                <button
                                    onClick={copyQrUrl}
                                    className={`tool-btn-secondary ${copied ? 'bg-green-100 dark:bg-green-900/30' : ''}`}
                                >
                                    {copied ? '✓ Copied!' : '🔗 Copy URL'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!text && (
                    <div className="text-center py-12 text-slate-400">
                        <span className="text-4xl mb-2 block">📱</span>
                        <p>Enter content above to generate a QR code</p>
                    </div>
                )}
            </div>
        </div>
    );
}
