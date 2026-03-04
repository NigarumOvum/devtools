import type { APIRoute } from 'astro';
import { and, eq } from 'drizzle-orm';

import { aiService, type AIProvider, type ChatMessage } from '../../lib/ai/ai-service';
import { jsonResponse, errorResponse, requireUser } from '../../lib/api-utils';
import { fetchUserAgents } from '../../lib/cache';

// helper to read single agent from cache or database
async function getCachedAgent(userId: string, agentId: string) {
    const agents = await fetchUserAgents(userId);
    return agents.find((a: any) => a.id === agentId);
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const { provider, messages, roleId, model } = await request.json();

        const chatMessages: ChatMessage[] = [];
        if (roleId) {
            const agent = await getCachedAgent(userId, roleId);
            if (agent && agent.systemPrompt) {
                chatMessages.push({ role: 'system', content: agent.systemPrompt });
            } else {
                console.warn(`Agent ${roleId} not found in cache/db for user ${userId}`);
            }
        }

        chatMessages.push(...messages);
        const response = await aiService.chat(provider as AIProvider, chatMessages, model);
        return jsonResponse({ response });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('AI API Error:', err);
        return errorResponse(err.message);
    }
};
