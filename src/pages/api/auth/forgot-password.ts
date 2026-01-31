import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { users, verificationTokens } from '../../../lib/db/auth-schema';
import { eq } from 'drizzle-orm';
import { generatePasswordResetToken } from '../../../lib/auth-utils';
import { sendPasswordResetEmail } from '../../../lib/mail';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
        }

        console.log(`Password reset requested for: ${email}`);
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (user) {
            console.log(`Generating reset token for user: ${email}`);
            const token = await generatePasswordResetToken(email);

            try {
                await sendPasswordResetEmail(email, token.token);
                console.log(`Reset email sent to: ${email}`);
            } catch (mailError: any) {
                console.error(`Failed to send reset email to ${email}:`, mailError);
                // We still return 200 to prevent user enumeration, but log the failure
            }
        } else {
            console.log(`User not found for password reset: ${email}`);
        }

        // Always return success to prevent user enumeration
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        console.error('Forgot Password API Error:', error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }), { status: 500 });
    }
};
