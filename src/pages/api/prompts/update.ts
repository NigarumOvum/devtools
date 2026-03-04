
import type { APIRoute } from 'astro';
import { eq, and } from 'drizzle-orm';

import { requireUser, jsonResponse, errorResponse } from '../../../lib/api-utils';
import { db } from '../../../lib/db';
import { prompts } from '../../../lib/db/auth-schema';
import { clearUserPromptCache } from '../../../lib/cache';

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const body = await request.json();
        const { id, title, template, tags, category } = body;

        if (!id) {
            return errorResponse('Missing prompt ID', 400);
        }

        const existingPrompt = await db
            .select()
            .from(prompts)
            .where(and(eq(prompts.id, id), eq(prompts.userId, userId)))
            .get();

        if (!existingPrompt) {
            return errorResponse('Prompt not found or unauthorized', 404);
        }

        await db.update(prompts)
            .set({
                title: title || existingPrompt.title,
                template: template || existingPrompt.template,
                tags: tags ? JSON.stringify(tags) : existingPrompt.tags,
                category: category || existingPrompt.category,
            })
            .where(eq(prompts.id, id));

        clearUserPromptCache(userId);
        return jsonResponse({ success: true });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Error updating prompt:', err);
        return errorResponse('Internal Server Error');
    }
};
