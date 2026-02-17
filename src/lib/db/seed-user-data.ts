import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users, prompts } from "./auth-schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

async function seed() {
    console.log("🚀 Starting seeding process...");

    const targetEmail = "b.pdrn.rdz@gmail.com";

    // 1. Find or update user to admin
    const [user] = await db.select().from(users).where(eq(users.email, targetEmail)).limit(1);

    let userId: string;

    if (user) {
        console.log(`👤 Found user: ${user.email}. Setting role to admin.`);
        await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
        userId = user.id;
    } else {
        console.log(`⚠️ User ${targetEmail} not found in database. Creating placeholder user.`);
        userId = uuidv4();
        await db.insert(users).values({
            id: userId,
            email: targetEmail,
            name: "Admin User",
            role: "admin",
        });
    }

    // 2. Clear existing prompts for this user to avoid duplicates if re-running
    await db.delete(prompts).where(eq(prompts.userId, userId));

    // 3. Parse and insert prompts from MD files
    const projectRoot = process.cwd();
    const parentDir = path.join(projectRoot, "..");

    const musicPromptsPath = path.join(parentDir, "MUSIC-PROMPTS.MD");
    const swPromptsPath = path.join(parentDir, "PROMPTS.MD");

    const musicPrompts = parseMusicPrompts(musicPromptsPath, userId);
    const swPrompts = parseSWPrompts(swPromptsPath, userId);

    const allPrompts = [...musicPrompts, ...swPrompts];

    console.log(`📦 Inserting ${allPrompts.length} prompts...`);

    for (const prompt of allPrompts) {
        await db.insert(prompts).values(prompt);
    }

    console.log("✅ Seeding completed successfully!");
}

function parseMusicPrompts(filePath: string, userId: string) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        return [];
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const sections = content.split("## ").slice(1);
    const parsed: any[] = [];

    for (const section of sections) {
        const lines = section.split("\n");
        const category = lines[0].trim().replace(/[^\w\s]/g, "");

        // Find prompts starting with ###
        const items = section.split("### ").slice(1);
        for (const item of items) {
            const itemLines = item.split("\n");
            const title = itemLines[0].trim();
            const template = itemLines.find(l => l.startsWith("> "))?.replace("> ", "").trim() || "";

            if (title && template) {
                parsed.push({
                    id: uuidv4(),
                    userId,
                    title,
                    category: `Music - ${category}`,
                    template,
                    icon: "🎵",
                    tags: JSON.stringify([category.toLowerCase()]),
                    createdAt: new Date(),
                });
            }
        }
    }
    return parsed;
}

function parseSWPrompts(filePath: string, userId: string) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        return [];
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const sections = content.split("---").slice(1);
    const parsed: any[] = [];

    for (const section of sections) {
        const h2Match = section.match(/## (.*)/);
        if (!h2Match) continue;

        const category = h2Match[1].trim().replace(/[^\w\s]/g, "");

        // Find prompts starting with ###
        const items = section.split("### ").slice(1);
        for (const item of items) {
            const itemLines = item.split("\n");
            const titleMatch = itemLines[0].match(/\d+\. (.*)/) || [null, itemLines[0].trim()];
            const title = titleMatch[1];

            const templateLine = itemLines.find(l => l.includes("👉 \"") || l.startsWith("> "));
            const template = templateLine?.match(/["'](.*)["']/) ? templateLine.match(/["'](.*)["']/)![1] : templateLine?.replace(/[👉>]/g, "").trim() || "";

            if (title && template) {
                parsed.push({
                    id: uuidv4(),
                    userId,
                    title,
                    category: `Software - ${category}`,
                    template,
                    icon: "💻",
                    tags: JSON.stringify([category.toLowerCase()]),
                    createdAt: new Date(),
                });
            }
        }
    }
    return parsed;
}

seed().catch(console.error);
