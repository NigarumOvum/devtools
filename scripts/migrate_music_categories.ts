
import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { prompts } from "../src/lib/db/auth-schema";
import { eq, inArray } from 'drizzle-orm';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
    console.error("Missing database credentials");
    process.exit(1);
}

const client = createClient({ url: dbUrl, authToken: authToken });
const db = drizzle(client);

async function main() {
    console.log("Migrating music categories...");

    // List of music categories to migrate
    const musicCategories = [
        "🌴 Reggae",
        "🎤 Rap / Hip-Hop",
        "🎶 Acústico",
        "🎸 Rock",
        "🤘 Metal"
    ];

    const musicPrompts = await db.select().from(prompts).where(inArray(prompts.category, musicCategories));

    console.log(`Found ${musicPrompts.length} music prompts to migrate.`);

    for (const prompt of musicPrompts) {
        let tags: string[] = [];
        try {
            tags = prompt.tags ? JSON.parse(prompt.tags) : [];
        } catch (e) {
            console.warn(`Failed to parse tags for prompt ${prompt.id}, resetting to empty array.`);
        }

        // Extract clean genre name (remove emoji)
        const genre = prompt.category.replace(/^[^\w\s]+/, '').trim();
        
        // Add genre to tags if not present
        if (!tags.includes(genre)) {
            tags.push(genre);
        }

        // Update prompt
        await db.update(prompts)
            .set({
                category: "🎵 Music",
                tags: JSON.stringify(tags)
            })
            .where(eq(prompts.id, prompt.id));
        
        console.log(`Migrated: ${prompt.title} -> Music [${genre}]`);
    }

    console.log("Migration complete!");
}

main().catch(console.error);
