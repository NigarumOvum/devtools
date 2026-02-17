
import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users, prompts } from "../src/lib/db/auth-schema";
import { eq, sql } from 'drizzle-orm';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
    url: dbUrl!,
    authToken: authToken!,
});

const db = drizzle(client);

async function main() {
    const targetEmail = 'b.pdrn.rdz@gmail.com';
    const foundUsers = await db.select().from(users).where(eq(users.email, targetEmail));
    const user = foundUsers[0];

    const results = await db.select({
        category: prompts.category,
        count: sql<number>`count(*)`
    })
    .from(prompts)
    .where(eq(prompts.userId, user.id))
    .groupBy(prompts.category);

    console.log("Prompt counts by category:");
    results.forEach(r => console.log(`${r.category}: ${r.count}`));
}

main().catch(console.error);
