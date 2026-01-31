import { Agent } from '@openai/agents';
import OpenAI from 'openai';

interface CreateAgentOptions {
    name: string;
    instructions: string;
    model?: string;
    tools?: any[];
}

export class OpenAIAgentsService {
    private client: OpenAI;

    constructor() {
        const apiKey = import.meta.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        this.client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    }

    /**
     * Creates a new agent instance using the OpenAI Agents SDK
     */
    async createAgent(options: CreateAgentOptions): Promise<Agent> {
        return new Agent({
            name: options.name,
            instructions: options.instructions,
            model: options.model || 'gpt-4o',
            // tools: options.tools || []
        });
    }

    /**
     * Runs an agent with a user message.
     * Note: In this version of the SDK, we use the client to execute the call 
     * based on the agent's configuration.
     */
    async runAgent(agent: Agent, message: string): Promise<string> {
        console.log(`Running agent: ${agent.name}`);

        try {
            const response = await this.client.chat.completions.create({
                model: (agent.model as string) || 'gpt-4o',
                messages: [
                    { role: 'system', content: agent.instructions as string },
                    { role: 'user', content: message }
                ],
            });

            return response.choices[0]?.message?.content || 'No response from agent.';
        } catch (error: any) {
            console.error('Error in agent execution:', error);
            throw new Error(`Agent execution failed: ${error.message}`);
        }
    }
}

export const openaiAgentsService = new OpenAIAgentsService();
