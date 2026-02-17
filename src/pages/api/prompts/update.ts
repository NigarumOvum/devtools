
import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { prompts } from "../../../lib/db/auth-schema";
import { eq, and } from 'drizzle-orm';

const dbUrl = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN;

const client = createClient({ url: dbUrl, authToken: authToken });
const db = drizzle(client);

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, title, template, tags, category } = body;

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing prompt ID' }), { status: 400 });
        }

        // Verify ownership
        const existingPrompt = await db.select()
            .from(prompts)
            .where(and(eq(prompts.id, id), eq(prompts.userId, session.user.id)))
            .get();

        if (!existingPrompt) {
            return new Response(JSON.stringify({ error: 'Prompt not found or unauthorized' }), { status: 404 });
        }

        // Update
        await db.update(prompts)
            .set({
                title: title || existingPrompt.title,
                template: template || existingPrompt.template,
                tags: tags ? JSON.stringify(tags) : existingPrompt.tags,
                category: category || existingPrompt.category,
            })
            .where(eq(prompts.id, id));

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error('Error updating prompt:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
