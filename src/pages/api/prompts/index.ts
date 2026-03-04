import type { APIRoute } from 'astro';
import { eq, desc } from 'drizzle-orm';

import { PROMPT_LIBRARY } from '../../../lib/ai/prompt-library';
import { jsonResponse, errorResponse, requireUser } from '../../../lib/api-utils';
import {
    fetchUserPrompts,
    clearUserPromptCache,
} from '../../../lib/cache';
import { db } from '../../../lib/db';
import { prompts } from '../../../lib/db/auth-schema';

async function ensurePromptsSeeded(userId: string) {
    // perform a single "upsert" so that concurrent requests don't fight
    const defaultRows = PROMPT_LIBRARY.map((prompt) => ({
        id: prompt.id,
        userId,
        title: prompt.title,
        category: prompt.category,
        icon: prompt.icon,
        template: prompt.template,
        tags: JSON.stringify(prompt.tags),
        createdAt: new Date(),
    }));

    // use onConflict to avoid duplicate inserts when the row already exists
    await db
        .insert(prompts)
        .values(defaultRows)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Drizzle's typings for "onConflictDoNothing" are awkward
        .onConflictDoNothing();

    // clearing cache so the next fetch returns the latest state
    clearUserPromptCache(userId);
}

export const GET: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);

        // fast path: cached prompts
        let userPrompts = await fetchUserPrompts(userId);

        if (userPrompts.length === 0) {
            await ensurePromptsSeeded(userId);
            userPrompts = await fetchUserPrompts(userId);
        }

        const formatted = userPrompts.map((p: any) => {
            let tags: string[] = [];
            try {
                tags = p.tags ? JSON.parse(p.tags) : [];
            } catch (e) {
                console.warn(`Failed to parse tags for prompt ${p.id}`, e);
            }
            return {
                id: p.id,
                title: p.title,
                category: p.category,
                icon: p.icon || '📝',
                template: p.template,
                tags,
                technique: 'standard',
                outputFormat: 'markdown',
            };
        });

        // compute simple ETag so clients can avoid downloading data repeatedly
        const payload = JSON.stringify(formatted);
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
        console.error('Prompts GET error', err);
        return errorResponse(err.message);
    }
};
