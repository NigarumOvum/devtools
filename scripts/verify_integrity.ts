
import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users, prompts } from "../src/lib/db/auth-schema";
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
    console.error("Missing database credentials in .env");
    process.exit(1);
}

const client = createClient({
    url: dbUrl,
    authToken: authToken,
});

const db = drizzle(client);

async function main() {
    const targetEmail = 'b.pdrn.rdz@gmail.com';
    console.log(`Verifying prompts for user: ${targetEmail}`);

    const foundUsers = await db.select().from(users).where(eq(users.email, targetEmail));

    if (foundUsers.length === 0) {
        console.error(`User ${targetEmail} not found!`);
        process.exit(1);
    }

    const user = foundUsers[0];
    
    // Get all prompts from DB
    const dbPrompts = await db.select().from(prompts).where(eq(prompts.userId, user.id));
    const dbTitles = new Set(dbPrompts.map(p => p.title));
    console.log(`Found ${dbPrompts.length} prompts in the database.`);

    // Parse files to get expected prompts
    const musicPrompts = parseMarkdown('MUSIC-PROMPTS.MD');
    const devPrompts = parseMarkdown('PROMPTS.MD');
    
    const allExpectedPrompts = [...musicPrompts, ...devPrompts];
    console.log(`Found ${allExpectedPrompts.length} prompts in the markdown files.`);

    // Compare
    const missingInDb = allExpectedPrompts.filter(p => !dbTitles.has(p.title));
    const extraInDb = dbPrompts.filter(p => !allExpectedPrompts.some(e => e.title === p.title));

    if (missingInDb.length === 0 && extraInDb.length === 0) {
        console.log("\n✅ SUCCESS: Database matches markdown files exactly!");
    } else {
        console.log("\n❌ DISCREPANCIES FOUND:");
        
        if (missingInDb.length > 0) {
            console.log(`\nMissing in DB (${missingInDb.length}):`);
            missingInDb.forEach(p => console.log(` - [${p.category}] ${p.title}`));
        }

        if (extraInDb.length > 0) {
            console.log(`\nExtra in DB (orphaned or renamed) (${extraInDb.length}):`);
            extraInDb.forEach(p => console.log(` - [${p.category}] ${p.title}`));
        }
    }
}

function parseMarkdown(filename: string) {
    const filePath = path.join(process.cwd(), filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    const prompts: { category: string, title: string }[] = [];
    let currentCategory = '';
    let currentTitle = '';
    let hasTemplate = false;
    
    const categoryRegex = /^##\s+(.+)/;
    const titleRegex = /^###\s+(?:[\d\.]+\s*)?(.+)/;
    const templateRegex = /^(>|👉)/;

    for (const line of lines) {
        if (categoryRegex.test(line)) {
             // If previous title had a template, push it
             if (currentTitle && hasTemplate) {
                  prompts.push({ category: currentCategory, title: currentTitle });
             }

             currentCategory = line.match(categoryRegex)![1].trim();
             currentTitle = '';
             hasTemplate = false;
        } else if (titleRegex.test(line)) {
            // Check if previous title was valid (had template) - though here we just list expectations.
            // A title is only a prompt if it has a template.
            if (currentTitle && hasTemplate) {
                 prompts.push({ category: currentCategory, title: currentTitle });
            }

            currentTitle = line.match(titleRegex)![1].trim();
            hasTemplate = false;
        } else if (templateRegex.test(line.trim())) {
            hasTemplate = true;
        }
    }
    
    // Check last prompt
    if (currentTitle && hasTemplate) {
        prompts.push({ category: currentCategory, title: currentTitle });
    }
    
    return prompts;
}

main().catch(console.error);
