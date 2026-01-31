import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { users, verificationTokens } from '../../../lib/db/auth-schema';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { token, password } = await request.json();

        // Find the token using standard select for better compatibility
        const [verificationToken] = await db.select()
            .from(verificationTokens)
            .where(eq(verificationTokens.token, token))
            .limit(1);

        if (!verificationToken) {
            return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
        }

        // Ensure date comparison is robust
        const now = new Date();
        const expiresAt = new Date(verificationToken.expires);

        if (expiresAt < now) {
            await db.delete(verificationTokens).where(eq(verificationTokens.token, token));
            return new Response(JSON.stringify({ error: 'Token has expired' }), { status: 400 });
        }

        const email = verificationToken.identifier.startsWith('reset:')
            ? verificationToken.identifier.replace('reset:', '')
            : verificationToken.identifier;

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.update(users)
            .set({ password: hashedPassword })
            .where(eq(users.id, user.id));

        await db.delete(verificationTokens).where(eq(verificationTokens.token, token));

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        console.error('Reset Password API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
