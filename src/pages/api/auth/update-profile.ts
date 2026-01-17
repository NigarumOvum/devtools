import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { db } from '../../../lib/db';
import { users } from '../../../lib/db/auth-schema';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);

        if (!session?.user?.id) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const body = await request.json();
        const { name } = body;

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return new Response(JSON.stringify({ error: 'Name is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await db.update(users)
            .set({ name: name.trim() })
            .where(eq(users.id, session.user.id));

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Update profile error:', error);
        return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
