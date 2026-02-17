import Credentials from "@auth/core/providers/credentials";
import { defineConfig } from "auth-astro";
import { db } from "./src/lib/db";
import { users } from "./src/lib/db/auth-schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export default defineConfig({
    adapter: DrizzleAdapter(db),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                console.log("[Auth] Attempting login for email:", credentials.email);
                const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string)).limit(1);

                if (!user) {
                    console.error("[Auth] User not found in database");
                    return null;
                }

                if (!user.password) {
                    console.error("[Auth] User found but has NO password set (likely created by seed script)");
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);
                console.log("[Auth] Password valid:", isPasswordValid);

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "user";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
});
