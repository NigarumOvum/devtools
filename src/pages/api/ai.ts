import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { aiService, type AIProvider, type ChatMessage } from '../../lib/ai/ai-service';
import { getAgentPrompt } from '../../lib/ai/agents';

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { provider, messages, roleId, model } = await request.json();

        const chatMessages: ChatMessage[] = [];

        // Add system prompt if roleId is provided
        if (roleId) {
            chatMessages.push({ role: 'system', content: getAgentPrompt(roleId) });
        }

        chatMessages.push(...messages);

        const response = await aiService.chat(provider as AIProvider, chatMessages, model);

        return new Response(JSON.stringify({ response }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('AI API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
