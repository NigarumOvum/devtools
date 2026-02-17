import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../lib/db';
import { agents } from '../../lib/db/auth-schema';
import { eq, and } from 'drizzle-orm';
import { aiService, type AIProvider, type ChatMessage } from '../../lib/ai/ai-service';

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { provider, messages, roleId, model } = await request.json();

        const chatMessages: ChatMessage[] = [];

        // Add system prompt if roleId is provided
        if (roleId) {
            // Fetch agent from DB to get the latest system prompt
            const [agent] = await db.select()
                .from(agents)
                .where(and(eq(agents.id, roleId), eq(agents.userId, session.user.id)));
            
            if (agent && agent.systemPrompt) {
                chatMessages.push({ role: 'system', content: agent.systemPrompt });
            } else {
                 // Fallback or error? If seeded, it should be there. 
                 // If not found, maybe it's a raw ID or something? 
                 // For now, let's proceed without system prompt or log warning.
                 console.warn(`Agent ${roleId} not found in DB for user ${session.user.id}`);
            }
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
