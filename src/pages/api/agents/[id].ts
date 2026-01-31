import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../../lib/db';
import { agents } from '../../../lib/db/auth-schema';
import { eq, and } from 'drizzle-orm';

export const GET: APIRoute = async ({ params, request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;
    if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

    try {
        const [agent] = await db.select().from(agents).where(
            and(eq(agents.id, id), eq(agents.userId, session.user.id))
        );

        if (!agent) {
            return new Response(JSON.stringify({ error: 'Agent not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(agent), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const PUT: APIRoute = async ({ params, request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;
    if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

    try {
        const data = await request.json();
        const updateData = {
            name: data.name,
            icon: data.icon,
            description: data.description,
            systemPrompt: data.systemPrompt,
            specialties: data.specialties ? JSON.stringify(data.specialties) : undefined,
            model: data.model,
            tools: data.tools ? JSON.stringify(data.tools) : undefined,
            isPublic: data.isPublic !== undefined ? (data.isPublic ? 1 : 0) : undefined,
            updatedAt: new Date(),
        };

        await db.update(agents).set(updateData).where(
            and(eq(agents.id, id), eq(agents.userId, session.user.id))
        );

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params, request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;
    if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

    try {
        await db.delete(agents).where(
            and(eq(agents.id, id), eq(agents.userId, session.user.id))
        );

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
