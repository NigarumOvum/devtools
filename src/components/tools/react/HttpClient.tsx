import { useState, useCallback } from 'react';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default function HttpClient() {
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
    const [body, setBody] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body'>('params');

    const sendRequest = useCallback(async () => {
        setLoading(true);
        setResponse(null);
        const start = performance.now();
        try {
            const headerObj = headers.reduce((acc, curr) => {
                if (curr.key) acc[curr.key] = curr.value;
                return acc;
            }, {} as any);

            const options: RequestInit = {
                method,
                headers: headerObj,
            };

            if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const data = await res.json();
            const end = performance.now();

            setResponse({
                status: res.status,
                statusText: res.statusText,
                time: Math.round(end - start),
                data,
            });
        } catch (err: any) {
            setResponse({
                error: err.message,
            });
        } finally {
            setLoading(false);
        }
    }, [url, method, headers, body]);

    const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
    const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
        const newHeaders = [...headers];
        newHeaders[index][field] = value;
        setHeaders(newHeaders);
    };
    const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));

    return (
        <div className="tool-card overflow-hidden h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl text-white">
                        <span className="text-2xl font-bold">🌐</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">HTTP Studio</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            API Client & Debugger
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 flex-1 min-h-0">
                <div className="flex gap-2">
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-black uppercase tracking-widest text-indigo-600 outline-none"
                    >
                        {methods.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="flex-1 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm outline-none focus:ring-2 ring-indigo-500/20"
                    />
                    <button
                        onClick={sendRequest}
                        disabled={loading}
                        className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                    <div className="flex-1 space-y-4 flex flex-col min-h-0">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit">
                            {['params', 'headers', 'body'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-lg' : 'text-slate-400'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col p-4">
                            {activeTab === 'headers' && (
                                <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1">
                                    {headers.map((h, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={h.key}
                                                onChange={(e) => updateHeader(i, 'key', e.target.value)}
                                                placeholder="Key"
                                                className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border-none text-xs outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={h.value}
                                                onChange={(e) => updateHeader(i, 'value', e.target.value)}
                                                placeholder="Value"
                                                className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border-none text-xs outline-none"
                                            />
                                            <button onClick={() => removeHeader(i)} className="p-2 text-slate-400 hover:text-red-500">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={addHeader} className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">
                                        + Add Header
                                    </button>
                                </div>
                            )}

                            {activeTab === 'body' && (
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full h-full bg-transparent border-none outline-none font-mono text-xs custom-scrollbar resize-none"
                                    placeholder='{"key": "value"}'
                                />
                            )}

                            {activeTab === 'params' && (
                                <div className="flex items-center justify-center h-full text-slate-400 text-xs italic">
                                    URL Params will be parsed from the URL field.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Response</span>
                            {response && !response.error && (
                                <div className="flex gap-4">
                                    <span className={response.status < 400 ? 'text-emerald-500' : 'text-red-500'}>
                                        Status: {response.status}
                                    </span>
                                    <span className="text-indigo-500">Time: {response.time}ms</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative">
                            <pre className="p-6 text-emerald-400 text-xs font-mono overflow-auto h-full custom-scrollbar">
                                {response ? (
                                    response.error ? (
                                        <span className="text-red-400">Error: {response.error}</span>
                                    ) : (
                                        JSON.stringify(response.data, null, 2)
                                    )
                                ) : (
                                    <span className="text-slate-600 block text-center mt-20 italic">No response yet. Send a request to see results.</span>
                                )}
                            </pre>
                            {response && !response.error && (
                                <button
                                    onClick={() => navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))}
                                    className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-500 hover:text-white text-[9px] font-black uppercase transition-all"
                                >
                                    Copy
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
