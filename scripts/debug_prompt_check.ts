
import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { prompts, users } from "../src/lib/db/auth-schema";
import { eq, and, like } from 'drizzle-orm';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
    console.error("Missing database credentials");
    process.exit(1);
}

const client = createClient({ url: dbUrl, authToken: authToken });
const db = drizzle(client);

async function main() {
    const targetEmail = 'b.pdrn.rdz@gmail.com';
    const user = await db.select().from(users).where(eq(users.email, targetEmail)).get();

    if (!user) {
        console.error("User not found");
        return;
    }

    // Search for the specific prompt
    const prompt = await db.select()
        .from(prompts)
        .where(
            and(
                eq(prompts.userId, user.id),
                like(prompts.title, '%Maintainable, Scalable Project Structure%')
            )
        )
        .get();

    if (prompt) {
        console.log("FOUND PROMPT:");
        console.log("Title:", prompt.title);
        console.log("Category:", prompt.category);
        console.log("Template:", prompt.template);
        console.log("Tags:", prompt.tags);
    } else {
        console.log("PROMPT NOT FOUND!");
        // List all titles to see what happened
        const allPrompts = await db.select({ title: prompts.title }).from(prompts).where(eq(prompts.userId, user.id));
        console.log("Available titles:", allPrompts.map(p => p.title));
    }
}

main();
