import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../../lib/db';
import { prompts } from '../../../lib/db/auth-schema';
import { eq, desc } from 'drizzle-orm';

import { PROMPT_LIBRARY } from '../../../lib/ai/prompt-library';

export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        // Fetch existing prompts for the user
        let userPrompts = await db
            .select()
            .from(prompts)
            .where(eq(prompts.userId, session.user.id))
            .orderBy(desc(prompts.createdAt));

        // If no prompts exist, seed the default library
        if (userPrompts.length === 0) {
            const newPrompts = PROMPT_LIBRARY.map(prompt => ({
                id: prompt.id,
                userId: session.user.id!,
                title: prompt.title,
                category: prompt.category,
                icon: prompt.icon,
                template: prompt.template,
                tags: JSON.stringify(prompt.tags),
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            await db.insert(prompts).values(newPrompts);

            // Re-fetch
            userPrompts = await db
                .select()
                .from(prompts)
                .where(eq(prompts.userId, session.user.id))
                .orderBy(desc(prompts.createdAt));
        }

        const formattedPrompts = userPrompts.map(p => {
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
                tags: tags,
                technique: 'standard',
                outputFormat: 'markdown'
            };
        });

        return new Response(JSON.stringify(formattedPrompts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
