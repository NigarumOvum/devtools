import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../../lib/db';
import { agents } from '../../../lib/db/auth-schema';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const userAgents = await db.select().from(agents).where(eq(agents.userId, session.user.id));
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
