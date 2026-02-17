import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../../lib/db';
import { agents } from '../../../lib/db/auth-schema';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { AGENTS } from '../../../lib/ai/agents';

export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        // Fetch existing agents for the user
        let userAgents = await db.select().from(agents).where(eq(agents.userId, session.user.id));
        
        // Check for missing default agents and seed them
        const existingAgentIds = new Set(userAgents.map(a => a.id));
        const defaultAgents = Object.values(AGENTS);
        const agentsToInsert = defaultAgents.filter(a => !existingAgentIds.has(a.id));
        
        if (agentsToInsert.length > 0) {
            const newAgents = agentsToInsert.map(agent => ({
                id: agent.id,
                userId: session.user.id!,
                name: agent.name,
                icon: agent.icon,
                description: agent.description,
                systemPrompt: agent.systemPrompt,
                specialties: JSON.stringify(agent.specialties),
                model: 'gpt-4o',
                tools: JSON.stringify([]),
                isPublic: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            
            await db.insert(agents).values(newAgents);
            
            // Re-fetch to get everything (or just push to array, but re-fetch is safer for order/consistency)
            userAgents = await db.select().from(agents).where(eq(agents.userId, session.user.id));
        }

        return new Response(JSON.stringify(userAgents), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const data = await request.json();
        const newAgent = {
            id: uuidv4(),
            userId: session.user.id,
            name: data.name,
            icon: data.icon,
            description: data.description,
            systemPrompt: data.systemPrompt,
            specialties: JSON.stringify(data.specialties || []),
            model: data.model || 'gpt-4o',
            tools: JSON.stringify(data.tools || []),
            isPublic: data.isPublic ? 1 : 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.insert(agents).values(newAgent);

        return new Response(JSON.stringify(newAgent), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
