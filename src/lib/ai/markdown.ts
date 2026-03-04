
// --- agent <-> markdown helpers ------------------------------------------------
// We use a very simple custom markdown format built on YAML-ish frontmatter
// followed by a fenced code block for the system prompt.  Example:
//
// ---
// id: senior_se
// name: Senior Software Engineer
// icon: 👨‍💻
// description: Expert in architecture, code quality, and best practices.
// specialties: Code Review, Architecture, Performance, Clean Code
// systemPrompt: |
//   You are a Senior Software Engineer with 15+ years…
// ---
//
// Multiple agents can be concatenated; the parser splits on /^---$/m.

interface AgentMarkdownMeta {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    specialties?: string[];
}

export function agentsToMarkdown(agents: any[]): string {
    return agents
        .map(a => {
            const specialties = Array.isArray(a.specialties) ? a.specialties.join(', ') : '';
            return [`---`,
                `id: ${a.id}`,
                `name: ${a.name}`,
                `icon: ${a.icon || ''}`,
                `description: ${a.description || ''}`,
                `specialties: ${specialties}`,
                `systemPrompt: |`,
                ...a.systemPrompt.split('\n').map(l => `  ${l}`)
            ].join('\n');
        })
        .join('\n') + '\n';
}

export function parseAgentsMarkdown(md: string): any[] {
    const pieces = md.split(/^---$/m).map(s => s.trim()).filter(Boolean);
    const results: AgentRole[] = [];

    for (const piece of pieces) {
        const [metaBlock, ...rest] = piece.split(/```/); // support code fences optionally
        const lines = metaBlock.split('\n').map(l => l.trim()).filter(Boolean);
        const data: any = {};
        lines.forEach((line) => {
            const idx = line.indexOf(':');
            if (idx === -1) return;
            const key = line.slice(0, idx).trim();
            let val = line.slice(idx + 1).trim();
            if (key === 'specialties') {
                data.specialties = val.split(',').map((s: string) => s.trim()).filter(Boolean);
            } else if (key === 'systemPrompt') {
                // prefix indicator; rest of the document is prompt
            } else {
                data[key] = val;
            }
        });
        // extract prompt after the block
        const promptMatch = piece.match(/systemPrompt: \|([\s\S]*)$/);
        const systemPrompt = promptMatch ? promptMatch[1].trim() : '';
        data.systemPrompt = systemPrompt;
        if (data.id && data.name) {
            results.push(data as AgentRole);
        }
    }
    return results;
}

// --- workflow <-> markdown ------------------------------------------------------
// Workflow documents are even simpler:
//
// ---
// name: My Workflow
// agents: senior_se, architect, security
// description: Optional human-readable description
// ---

export interface WorkflowSpec {
    name: string;
    agentIds: string[];
    description?: string;
}

export function workflowToMarkdown(spec: WorkflowSpec): string {
    const agentsLine = spec.agentIds.join(', ');
    const lines = [`---`,
        `name: ${spec.name}`,
        `agents: ${agentsLine}`,
    ];
    if (spec.description) {
        lines.push(`description: ${spec.description}`);
    }
    return lines.join('\n') + '\n';
}

export function parseWorkflowsMarkdown(md: string): WorkflowSpec[] {
    const pieces = md.split(/^---$/m).map(s => s.trim()).filter(Boolean);
    const out: WorkflowSpec[] = [];
    for (const piece of pieces) {
        const lines = piece.split('\n').map(l => l.trim()).filter(Boolean);
        const spec: any = { agentIds: [] };
        lines.forEach((line) => {
            const idx = line.indexOf(':');
            if (idx === -1) return;
            const key = line.slice(0, idx).trim();
            const val = line.slice(idx + 1).trim();
            if (key === 'agents') {
                spec.agentIds = val.split(',').map((s: string) => s.trim()).filter(Boolean);
            } else {
                spec[key] = val;
            }
        });
        if (spec.name && spec.agentIds.length > 0) {
            out.push(spec as WorkflowSpec);
        }
    }
    return out;
}
