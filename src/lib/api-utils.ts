import { getSession } from 'auth-astro/server';

/**
 * Convenience wrapper that ensures the incoming request has an authenticated user
 * and returns the associated user id.  In a serverless environment the session
 * lookup may invoke a database anyway, but consolidating the check keeps the
 * handlers simpler and reduces repeated logic.
 *
 * Throws an `Error('Unauthorized')` when there is no valid session.
 */
export async function requireUser(request: Request): Promise<string> {
    const session = await getSession(request);
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    return session.user.id;
}

/**
 * Shorthand for creating a JSON response with the appropriate headers.
 */
export function jsonResponse(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

/**
 * Helper for sending an error response.  Pass a status code and message (or
 * object).  This is largely a convenience for keeping the handlers one-liners.
 */
export function errorResponse(message: string | object, status = 500): Response {
    return new Response(JSON.stringify({ error: message }), { status });
}
