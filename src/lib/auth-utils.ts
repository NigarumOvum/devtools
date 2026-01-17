import { db } from './db';
import { verificationTokens, users } from './db/auth-schema';
import { v4 as uuidv4 } from 'uuid';
import { eq, and } from 'drizzle-orm';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    const existingToken = await db.query.verificationTokens.findFirst({
        where: eq(verificationTokens.identifier, email),
    });

    if (existingToken) {
        await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
    }

    const [verificationToken] = await db.insert(verificationTokens).values({
        identifier: email,
        token,
        expires,
    }).returning();

    return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    // We reuse verificationTokens table for simplicity in this project or create a new one
    // For now, let's use the identifier+token combo

    const [passwordResetToken] = await db.insert(verificationTokens).values({
        identifier: `reset:${email}`,
        token,
        expires,
    }).returning();

    return passwordResetToken;
};
