import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { jsonResponse, errorResponse } from '../../../lib/api-utils';

export const GET: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        if (!session || !session.user) {
            return errorResponse('Unauthorized', 401);
        }
        return jsonResponse({ session });
    } catch (err: any) {
        console.error('Auth/me error', err);
        return errorResponse(err.message);
    }
};
