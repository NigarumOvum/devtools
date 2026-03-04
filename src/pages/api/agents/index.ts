import type { APIRoute } from 'astro';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { jsonResponse, errorResponse, requireUser } from '../../../lib/api-utils';
import {
    fetchUserAgents,
    clearUserAgentCache,
} from '../../../lib/cache';
import { db } from '../../../lib/db';
import { agents } from '../../../lib/db/auth-schema';
import { AGENTS } from '../../../lib/ai/agents';

async function ensureAgentsSeeded(userId: string) {
    const defaultRows = Object.values(AGENTS).map((agent) => ({
        id: agent.id,
        userId,
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

    await db
        .insert(agents)
        .values(defaultRows)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .onConflictDoNothing();

    clearUserAgentCache(userId);
}

export const GET: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);

        let userAgents = await fetchUserAgents(userId);

        if (userAgents.length === 0) {
            await ensureAgentsSeeded(userId);
            userAgents = await fetchUserAgents(userId);
        }

        // ETag logic -- stringify agents array (could be large but it's only per user)
        const payload = JSON.stringify(userAgents);
        const etag = `W/"${Buffer.from(payload).toString('base64')}"`;
        if (request.headers.get('if-none-match') === etag) {
            return new Response(null, { status: 304 });
        }
        return new Response(payload, {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'ETag': etag },
        });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Agents GET error', err);
        return errorResponse(err.message);
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const data = await request.json();
        const newAgent = {
            id: uuidv4(),
            userId,
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
        clearUserAgentCache(userId);

        return jsonResponse(newAgent, 201);
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Agents POST error', err);
        return errorResponse(err.message);
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
