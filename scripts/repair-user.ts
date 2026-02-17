import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users } from "../src/lib/db/auth-schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

async function repair() {
    const email = "b.pdrn.rdz@gmail.com";
    const password = "xvf8nsxlM!"; // Same as what you used in production

    console.log(`🔧 Repairing user: ${email}...`);

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
        console.error("❌ User not found index database!");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, user.id));

    console.log("✅ Password updated successfully! Try logging in now in production.");
}

repair().catch(console.error);
