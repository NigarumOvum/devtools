import type { APIRoute } from 'astro';
import { eq, and } from 'drizzle-orm';

import { jsonResponse, errorResponse, requireUser } from '../../../lib/api-utils';
import {
    fetchUserAgents,
    clearUserAgentCache,
} from '../../../lib/cache';
import { db } from '../../../lib/db';
import { agents } from '../../../lib/db/auth-schema';

async function getCachedAgent(userId: string, id: string) {
    const list = await fetchUserAgents(userId);
    return list.find((a: any) => a.id === id);
}

export const GET: APIRoute = async ({ params, request }) => {
    try {
        const userId = await requireUser(request);
        const { id } = params;
        if (!id) return errorResponse('Missing ID', 400);

        const agent = await getCachedAgent(userId, id);
        if (!agent) {
            return errorResponse('Agent not found', 404);
        }
        return jsonResponse(agent);
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Agent GET by id error', err);
        return errorResponse(err.message);
    }
};

export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const userId = await requireUser(request);
        const { id } = params;
        if (!id) return errorResponse('Missing ID', 400);

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
            and(eq(agents.id, id), eq(agents.userId, userId))
        );
        clearUserAgentCache(userId);
        return jsonResponse({ success: true });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Agent PUT error', err);
        return errorResponse(err.message);
    }
};

export const DELETE: APIRoute = async ({ params, request }) => {
    try {
        const userId = await requireUser(request);
        const { id } = params;
        if (!id) return errorResponse('Missing ID', 400);

        await db.delete(agents).where(
            and(eq(agents.id, id), eq(agents.userId, userId))
        );
        clearUserAgentCache(userId);
        return jsonResponse({ success: true });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Agent DELETE error', err);
        return errorResponse(err.message);
    }
};

