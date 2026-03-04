import { aiService, type AIProvider } from './ai-service';
import { AGENTS, AgentRole } from './agents';
import { fetchUserAgents } from '../cache';

export interface WorkflowResult {
    id: string;
    name: string;
    response: string;
}

/**
 * Run a simple linear workflow: feed the initial message to the first agent,
 * then pass each agent's response as the user message to the next agent.
 *
 * User-specified agents (stored in the database) are automatically looked up
 * and cached; fallback to the built-in AGENTS map for presets.
 */
export async function runWorkflow(
    userId: string,
    provider: AIProvider,
    stepIds: string[],
    initialMessage: string,
    model?: string
): Promise<WorkflowResult[]> {
    const results: WorkflowResult[] = [];
    let currentInput = initialMessage;

    // fetch cached DB agents once
    const dbAgents = await fetchUserAgents(userId);

    for (const id of stepIds) {
        // try preset first, then DB list
        let agent: AgentRole | undefined = AGENTS[id];
        if (!agent) {
            agent = dbAgents.find((a: any) => a.id === id);
        }

        if (!agent) {
            console.warn(`Workflow: unknown agent id '${id}', skipping`);
            continue;
        }

        const messages = [
            { role: 'system', content: agent.systemPrompt },
            { role: 'user', content: currentInput },
        ];
        const response = await aiService.chat(provider, messages, model);
        results.push({ id: agent.id, name: agent.name, response });
        currentInput = response;
    }

    return results;
}
