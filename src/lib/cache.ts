import LRU from 'lru-cache';
import { db } from './db';
import { agents, prompts } from './db/auth-schema';
import { eq, desc } from 'drizzle-orm';

// in-memory short lived caches to avoid hitting the database for things that
// are frequently requested within the same cold-start.  TTL is conservative —
// at most one minute, which is sufficient to avoid repeated selects during a
// single user interaction but small enough not to stale useful updates.
const AGENT_CACHE_TTL = 60_000; // milliseconds
const PROMPT_CACHE_TTL = 60_000;

export const agentCache = new LRU<string, any>({ max: 1000, ttl: AGENT_CACHE_TTL });
export const promptCache = new LRU<string, any>({ max: 1000, ttl: PROMPT_CACHE_TTL });

export async function fetchUserAgents(userId: string) {
    const key = `agents:${userId}`;
    const cached = agentCache.get(key);
    if (cached) {
        return cached;
    }
    const rows = await db.select().from(agents).where(eq(agents.userId, userId));
    agentCache.set(key, rows);
    return rows;
}

export async function fetchUserPrompts(userId: string) {
    const key = `prompts:${userId}`;
    const cached = promptCache.get(key);
    if (cached) {
        return cached;
    }
    const rows = await db
        .select()
        .from(prompts)
        .where(eq(prompts.userId, userId))
        .orderBy(desc(prompts.createdAt));
    promptCache.set(key, rows);
    return rows;
}

export function clearUserAgentCache(userId: string) {
    agentCache.delete(`agents:${userId}`);
}

export function clearUserPromptCache(userId: string) {
    promptCache.delete(`prompts:${userId}`);
}
