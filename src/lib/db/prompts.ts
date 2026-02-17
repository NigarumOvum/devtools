
import { db } from './index';
import { prompts } from './auth-schema';
import { eq, desc } from 'drizzle-orm';
import type { PromptTemplate } from '../ai/prompt-library';

export async function getUserPrompts(userId: string): Promise<PromptTemplate[]> {
    try {
        const userPrompts = await db
            .select()
            .from(prompts)
            .where(eq(prompts.userId, userId))
            .orderBy(desc(prompts.createdAt));

        return userPrompts.map(p => {
            let tags: string[] = [];
            try {
                tags = p.tags ? JSON.parse(p.tags) : [];
            } catch (e) {
                console.warn(`Failed to parse tags for prompt ${p.id}`, e);
            }

            return {
                id: p.id,
                title: p.title,
                category: p.category,
                icon: p.icon || '📝', // Default icon
                template: p.template,
                tags: tags,
                // These fields are not currently in DB, using defaults
                technique: 'standard', 
                outputFormat: 'markdown'
            };
        });
    } catch (error) {
        console.error('Error fetching user prompts:', error);
        return [];
    }
}
