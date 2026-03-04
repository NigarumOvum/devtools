import type { APIRoute } from 'astro';
import { eq, and } from 'drizzle-orm';
import { openaiAgentsService } from '../../../lib/ai/openai-agents';
import { jsonResponse, errorResponse, requireUser } from '../../../lib/api-utils';
import { fetchUserAgents } from '../../../lib/cache';

async function getCachedAgent(userId: string, agentId: string) {
    const agents = await fetchUserAgents(userId);
    return agents.find((a: any) => a.id === agentId);
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const { agentId, message } = await request.json();

        const dbAgent = await getCachedAgent(userId, agentId);
        if (!dbAgent) {
            return errorResponse('Agent not found', 404);
        }

        const agent = await openaiAgentsService.createAgent({
            name: dbAgent.name,
            instructions: dbAgent.systemPrompt,
            model: dbAgent.model || 'gpt-4o',
        });

        const result = await openaiAgentsService.runAgent(agent, message);
        return jsonResponse({ response: result });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Agent Run Error:', err);
        return errorResponse(err.message);
    }
};
