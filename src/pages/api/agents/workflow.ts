import type { APIRoute } from 'astro';
import { jsonResponse, errorResponse, requireUser } from '../../../lib/api-utils';
import { runWorkflow } from '../../../lib/ai/workflow';

export const POST: APIRoute = async ({ request }) => {
    try {
        const userId = await requireUser(request);
        // workflow request contains agent IDs and message
        const { agentIds, message, provider, model } = await request.json();

        if (!Array.isArray(agentIds) || agentIds.length === 0) {
            return errorResponse('agentIds must be a non-empty array', 400);
        }
        if (typeof message !== 'string' || message.trim().length === 0) {
            return errorResponse('message is required', 400);
        }

        // provider default to openai
        const prov = provider || 'openai';
        const results = await runWorkflow(userId, prov, agentIds, message, model);
        return jsonResponse({ results });
    } catch (err: any) {
        if (err.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        console.error('Workflow API error', err);
        return errorResponse(err.message);
    }
};
