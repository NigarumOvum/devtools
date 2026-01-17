import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { users, verificationTokens } from '../../../lib/db/auth-schema';
import { eq } from 'drizzle-orm';
import { generatePasswordResetToken } from '../../../lib/auth-utils';
import { sendPasswordResetEmail } from '../../../lib/mail';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (user) {
            const token = await generatePasswordResetToken(email);
            await sendPasswordResetEmail(email, token.token);
        }

        // Always return success to prevent user enumeration
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        console.error('Forgot Password API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
