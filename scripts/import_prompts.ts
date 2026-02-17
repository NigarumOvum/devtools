
import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users, prompts } from "../src/lib/db/auth-schema";
import { eq, and } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
    console.log(`Looking for user: ${targetEmail}`);

    const foundUsers = await db.select().from(users).where(eq(users.email, targetEmail));

    if (foundUsers.length === 0) {
        console.error(`User ${targetEmail} not found!`);
        process.exit(1);
    }

    const user = foundUsers[0];
    console.log(`Found user: ${user.id}`);

    // Clear existing prompts for this user to avoid duplicates/mismatched data
    // await db.delete(prompts).where(eq(prompts.userId, user.id));
    // console.log(`Cleared existing prompts for user ${user.id}`);

    // Parse MUSIC-PROMPTS.MD
    // await importMusicPrompts(user.id);
    
    // Parse PROMPTS.MD
    await importDevPrompts(user.id);

    console.log("Done!");
}

async function importMusicPrompts(userId: string) {
    const filePath = path.join(process.cwd(), 'MUSIC-PROMPTS.MD');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    console.log(`Parsing ${filePath}...`);
    
    const lines = content.split('\n');
    let currentCategory = '';
    let currentTitle = '';
    let currentTemplate = '';
    let currentDetails: string[] = [];
    
    // Regex for parsing
    const categoryRegex = /^##\s+(.+)/;
    const titleRegex = /^###\s+(?:[\d\.]+\s*)?(.+)/;
    const templateRegex = /^>\s+(.+)/;
    const detailRegex = /^-\s+(.+)/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // New Category
        if (categoryRegex.test(line)) {
            // Save previous prompt if exists BEFORE updating category
            if (currentTitle) {
                await savePrompt(userId, currentCategory, currentTitle, currentTemplate, currentDetails);
                currentTitle = '';
                currentTemplate = '';
                currentDetails = [];
            }

            currentCategory = line.match(categoryRegex)![1].trim();
            continue;
        }

        // New Title (Prompt)
        if (titleRegex.test(line)) {
            // Save previous prompt if exists
            if (currentTitle) {
                await savePrompt(userId, currentCategory, currentTitle, currentTemplate, currentDetails);
            }
            
            // Reset for new prompt
            currentTitle = line.match(titleRegex)![1].trim();
            currentTemplate = '';
            currentDetails = [];
            continue;
        }

        // Template content
        if (templateRegex.test(line)) {
            const text = line.match(templateRegex)![1].trim();
            currentTemplate = currentTemplate ? currentTemplate + '\n' + text : text;
            continue;
        }

        // Details
        if (detailRegex.test(line)) {
            const detail = line.match(detailRegex)![1].trim();
            // Skip "Table of Contents" items which are links
            if (detail.startsWith('[')) continue;
            currentDetails.push(detail);
            continue;
        }
    }
    
    // Save last prompt
    if (currentTitle && currentCategory) {
        await savePrompt(userId, currentCategory, currentTitle, currentTemplate, currentDetails);
    }
}

async function importDevPrompts(userId: string) {
    const filePath = path.join(process.cwd(), 'PROMPTS.MD');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    console.log(`Parsing ${filePath}...`);
    
    const lines = content.split('\n');
    let currentCategory = '';
    let currentTitle = '';
    let currentTemplate = '';
    
    // Regex for parsing
    const categoryRegex = /^##\s+(.+)/;
    const titleRegex = /^###\s+(?:[\d\.]+\s*)?(.+)/;
    const templateRegex = /^👉\s+"?([^"]+)"?/; // Matches 👉 "Content" or 👉 Content

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // New Category
        if (categoryRegex.test(line)) {
            // Save previous prompt if exists BEFORE updating category
            if (currentTitle) {
                 await savePrompt(userId, currentCategory, currentTitle, currentTemplate, []);
                 currentTitle = '';
                 currentTemplate = '';
            }

            currentCategory = line.match(categoryRegex)![1].trim();
            // Clean up emojis from category if needed, but keeping them is fine
            continue;
        }

        // New Title (Prompt)
        if (titleRegex.test(line)) {
            // Save previous prompt
            if (currentTitle) {
                 await savePrompt(userId, currentCategory, currentTitle, currentTemplate, []);
            }
            
            currentTitle = line.match(titleRegex)![1].trim();
            currentTemplate = '';
            continue;
        }

        // Template content
        // In PROMPTS.MD, the template might span multiple lines after 👉
        // But usually it starts with 👉. 
        // If we are inside a prompt and see text that is not a new header, it might be part of template.
        // However, based on file content, it seems to be single block usually, or the parser needs to be robust.
        // Let's assume it starts with 👉 and might continue until next empty line or header.
        
        if (line.startsWith('👉')) {
             let text = line.substring(2).trim();
             // Don't strip quotes yet, wait until we have the full block
             
             currentTemplate = text;
             
             // Check next lines for continuation
             let j = i + 1;
             while (j < lines.length) {
                 const rawNextLine = lines[j];
                 const nextLine = rawNextLine.trim();
                 
                 // Stop only on Headers, Separators, or new Prompt start
                 if (nextLine.startsWith('##') || nextLine.startsWith('---') || nextLine.startsWith('👉')) {
                     break;
                 }
                 
                 // Append line (preserve empty lines as newlines)
                 if (nextLine === '') {
                     currentTemplate += '\n';
                 } else {
                     currentTemplate += '\n' + rawNextLine;
                 }
                 
                 j++;
                 i++; // Advance main loop
             }
             
             // Clean up wrapping quotes if present
             currentTemplate = currentTemplate.trim();
             if (currentTemplate.startsWith('"') && currentTemplate.endsWith('"')) {
                 currentTemplate = currentTemplate.substring(1, currentTemplate.length - 1);
             } else if (currentTemplate.startsWith('"')) {
                 // Maybe it lost the end quote or it's multi-paragraph?
                 // Just remove start quote
                 currentTemplate = currentTemplate.substring(1);
             }
        }
    }
    
    // Save last prompt
    if (currentTitle && currentCategory && currentTemplate) {
        await savePrompt(userId, currentCategory, currentTitle, currentTemplate, []);
    }
}

async function savePrompt(userId: string, category: string, title: string, template: string, details: string[]) {
    if (!template) return;

    // Combine template and details
    let fullTemplate = template;
    if (details.length > 0) {
        fullTemplate += '\n\nDetails:\n' + details.map(d => `- ${d}`).join('\n');
    }

    // Check if exists to avoid duplicates
    const existingPrompt = await db.select()
        .from(prompts)
        .where(
            and(
                eq(prompts.userId, userId),
                eq(prompts.title, title),
                eq(prompts.category, category)
            )
        )
        .get();
    
    const now = new Date();
    
    try {
        if (existingPrompt) {
            // Update
            await db.update(prompts)
                .set({
                    template: fullTemplate,
                    // Don't update tags or other fields if not necessary
                })
                .where(eq(prompts.id, existingPrompt.id));
            console.log(`Updated: [${category}] ${title}`);
        } else {
            // Insert
            const id = uuidv4();
            await db.insert(prompts).values({
                id: id,
                userId: userId,
                title: title,
                category: category,
                template: fullTemplate,
                createdAt: now,
                tags: JSON.stringify([]),
            });
            console.log(`Added: [${category}] ${title}`);
        }
    } catch (e) {
        console.error(`Failed to save: ${title}`, e);
    }
}

main().catch(console.error);
