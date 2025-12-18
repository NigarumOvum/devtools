import { useState, useCallback } from 'react';

interface TypeScriptInterface {
    name: string;
    content: string;
}

export default function JsonToTypescript() {
    const [json, setJson] = useState('');
    const [rootName, setRootName] = useState('Root');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const sampleJson = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin", "user"],
  "profile": {
    "age": 30,
    "city": "New York"
  },
  "tags": [
    { "id": 1, "name": "developer" }
  ]
}`;

    const getType = (value: unknown): string => {
        if (value === null) return 'null';
        if (Array.isArray(value)) {
            if (value.length === 0) return 'unknown[]';
            const itemType = getType(value[0]);
            return `${itemType}[]`;
        }
        return typeof value;
    };

    const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

    const generateInterface = useCallback((obj: Record<string, unknown>, name: string, interfaces: TypeScriptInterface[]): string => {
        const lines: string[] = [];
        lines.push(`interface ${name} {`);

        for (const [key, value] of Object.entries(obj)) {
            let type: string;

            if (value === null) {
                type = 'null';
            } else if (Array.isArray(value)) {
                if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                    const nestedName = capitalize(key.replace(/s$/, ''));
                    generateInterface(value[0] as Record<string, unknown>, nestedName, interfaces);
                    type = `${nestedName}[]`;
                } else if (value.length > 0) {
                    type = `${getType(value[0])}[]`;
                } else {
                    type = 'unknown[]';
                }
            } else if (typeof value === 'object') {
                const nestedName = capitalize(key);
                generateInterface(value as Record<string, unknown>, nestedName, interfaces);
                type = nestedName;
            } else {
                type = typeof value;
            }

            lines.push(`  ${key}: ${type};`);
        }

        lines.push('}');
        const content = lines.join('\n');

        // Check if this interface already exists
        if (!interfaces.some(i => i.name === name)) {
            interfaces.push({ name, content });
        }

        return content;
    }, []);

    const convert = useCallback(() => {
        try {
            const parsed = JSON.parse(json);
            const interfaces: TypeScriptInterface[] = [];

            if (typeof parsed === 'object' && parsed !== null) {
                if (Array.isArray(parsed)) {
                    if (parsed.length > 0 && typeof parsed[0] === 'object') {
                        generateInterface(parsed[0], rootName, interfaces);
                        setOutput(`// Array of ${rootName}\ntype ${rootName}List = ${rootName}[];\n\n${interfaces.map(i => i.content).reverse().join('\n\n')}`);
                    } else {
                        setOutput(`type ${rootName} = ${getType(parsed)};`);
                    }
                } else {
                    generateInterface(parsed, rootName, interfaces);
                    setOutput(interfaces.map(i => i.content).reverse().join('\n\n'));
                }
            } else {
                setOutput(`type ${rootName} = ${typeof parsed};`);
            }
            setError('');
        } catch (e) {
            setError((e as Error).message);
            setOutput('');
        }
    }, [json, rootName, generateInterface]);

    const copyOutput = useCallback(async () => {
        if (output) {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [output]);

    return (
        <div className="tool-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔷</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">JSON to TypeScript</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Generate TypeScript interfaces from JSON</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Root Interface Name</label>
                        <input
                            type="text"
                            value={rootName}
                            onChange={(e) => setRootName(e.target.value || 'Root')}
                            className="tool-input"
                            placeholder="Root"
                        />
                    </div>
                    <button
                        onClick={() => setJson(sampleJson)}
                        className="text-xs text-accent-500 hover:text-accent-600 transition-colors mb-3"
                    >
                        Load sample
                    </button>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">JSON Input</label>
                    <textarea
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                        placeholder='{"key": "value"}'
                        className="tool-textarea h-40"
                    />
                </div>

                <button onClick={convert} className="tool-btn-primary w-full">
                    <span className="mr-2">⚡</span>Generate TypeScript
                </button>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                        <div className="flex items-center gap-2">
                            <span>❌</span>
                            <span className="font-medium">Invalid JSON:</span>
                        </div>
                        <p className="mt-1 font-mono text-xs">{error}</p>
                    </div>
                )}

                {output && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">TypeScript Output</label>
                            <button
                                onClick={copyOutput}
                                className={`text-xs px-3 py-1 rounded-lg transition-all ${copied
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                            >
                                {copied ? '✓ Copied!' : '📋 Copy'}
                            </button>
                        </div>
                        <pre className="code-block overflow-auto max-h-64 text-sm">{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
