import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../../lib/db';
import { agents } from '../../../lib/db/auth-schema';
import { eq, and } from 'drizzle-orm';
import { openaiAgentsService } from '../../../lib/ai/openai-agents';

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { agentId, message } = await request.json();

        // 1. Fetch agent details from DB
        const [dbAgent] = await db.select().from(agents).where(
            and(eq(agents.id, agentId), eq(agents.userId, session.user.id))
        );

        if (!dbAgent) {
            return new Response(JSON.stringify({ error: 'Agent not found' }), { status: 404 });
        }

        // 2. Create Agent instance using our service
        const agent = await openaiAgentsService.createAgent({
            name: dbAgent.name,
            instructions: dbAgent.systemPrompt,
            model: dbAgent.model || 'gpt-4o',
            // tools: JSON.parse(dbAgent.tools || '[]')
        });

        // 3. Run the agent
        const result = await openaiAgentsService.runAgent(agent, message);

        // 4. Return result
        // Note: For now we return the full result, but we might want to return just the text
        return new Response(JSON.stringify({ response: result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Agent Run Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
