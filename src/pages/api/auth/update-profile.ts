import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { users } from '../../../lib/db/auth-schema';
import { eq } from 'drizzle-orm';
import { requireUser, jsonResponse, errorResponse } from '../../../lib/api-utils';

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        const { name } = await request.json();

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return errorResponse('Name is required', 400);
        }

        await db.update(users)
            .set({ name: name.trim() })
            .where(eq(users.id, userId));

        return jsonResponse({ success: true });
    } catch (error: any) {
        console.error('Update profile error:', error);
        return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
