import type { APIRoute } from 'astro';
import { requireUser, jsonResponse, errorResponse } from '../../../lib/api-utils';
import { db } from '../../../lib/db';
import { agents as agentsTable } from '../../../lib/db/auth-schema';
import { eq } from 'drizzle-orm';
import { agentsToMarkdown, parseAgentsMarkdown } from '../../../lib/ai/markdown';

export const GET: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const url = new URL(request.url);
        const idsParam = url.searchParams.get('ids');
        const includePresets = url.searchParams.get('presets') === 'true';

        // fetch DB agents for user
        let userAgents: any[] = [];
        if (!idsParam || idsParam.length > 0) {
            userAgents = await db.select().from(agentsTable).where(eq(agentsTable.userId, userId));
        }

        // filter if ids provided
        let selectedAgents = userAgents;
        if (idsParam) {
            const requested = idsParam.split(',').map(s => s.trim()).filter(Boolean);
            selectedAgents = userAgents.filter(a => requested.includes(a.id));
        }

        const presetMd = includePresets ? agentsToMarkdown(Object.values(await import('../../../lib/ai/agents').then(m => m.AGENTS))) : '';
        const userMd = agentsToMarkdown(selectedAgents.map(a => ({
            id: a.id,
            name: a.name,
            icon: a.icon,
            description: a.description,
            specialties: JSON.parse(a.specialties || '[]'),
            systemPrompt: a.systemPrompt,
        })));

        const body = presetMd + userMd;
        return new Response(body, { status: 200, headers: { 'Content-Type': 'text/markdown' } });
    } catch (err: any) {
        if (err.message === 'Unauthorized') return errorResponse('Unauthorized', 401);
        console.error('Export agents error', err);
        return errorResponse(err.message);
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const { markdown } = await request.json();
        if (typeof markdown !== 'string' || markdown.trim() === '') {
            return errorResponse('markdown is required', 400);
        }

        const parsed = parseAgentsMarkdown(markdown);
        if (parsed.length === 0) {
            return errorResponse('No valid agents found', 400);
        }

        // insert or update each
        for (const agent of parsed) {
            const row = {
                id: agent.id,
                userId,
                name: agent.name,
                icon: agent.icon || '',
                description: agent.description || '',
                systemPrompt: agent.systemPrompt || '',
                specialties: JSON.stringify(agent.specialties || []),
                model: 'gpt-4o',
                tools: JSON.stringify([]),
                isPublic: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await db.insert(agentsTable).values(row)
                // @ts-ignore
                .onConflictDoUpdate({
                    target: agentsTable.id,
                    set: {
                        name: row.name,
                        icon: row.icon,
                        description: row.description,
                        systemPrompt: row.systemPrompt,
                        specialties: row.specialties,
                        updatedAt: row.updatedAt,
                    }
                });
        }

        return jsonResponse({ success: true, imported: parsed.length });
    } catch (err: any) {
        if (err.message === 'Unauthorized') return errorResponse('Unauthorized', 401);
        console.error('Import agents error', err);
        return errorResponse(err.message);
    }
};
