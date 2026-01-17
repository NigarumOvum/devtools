import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { users } from '../../../lib/db/auth-schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { generateVerificationToken } from '../../../lib/auth-utils';
import { sendVerificationEmail } from '../../../lib/mail';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { name, email, password } = await request.json();

        const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email already in use' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        await db.insert(users).values({
            id: userId,
            name,
            email,
            password: hashedPassword,
        });

        const token = await generateVerificationToken(email);
        await sendVerificationEmail(email, token.token);

        return new Response(JSON.stringify({ success: true, message: 'User registered. Please check your email for verification.' }), { status: 201 });
    } catch (error: any) {
        console.error('Registration API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
