import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

export type AIProvider = 'openai' | 'gemini' | 'claude';

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export class AIService {
    private openai?: OpenAI;
    private gemini?: GoogleGenerativeAI;
    private anthropic?: Anthropic;

    constructor() {
        const openaiKey = import.meta.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
        const geminiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        const claudeKey = import.meta.env.CLAUDE_API_KEY || process.env.CLAUDE_API_KEY;

        if (openaiKey) this.openai = new OpenAI({ apiKey: openaiKey });
        if (geminiKey) this.gemini = new GoogleGenerativeAI(geminiKey);
        if (claudeKey) this.anthropic = new Anthropic({ apiKey: claudeKey });
    }

    async chat(provider: AIProvider, messages: ChatMessage[], model?: string) {
        switch (provider) {
            case 'openai':
                return this.chatOpenAI(messages, model || 'gpt-4o');
            case 'gemini':
                return this.chatGemini(messages, model || 'gemini-1.5-pro');
            case 'claude':
                return this.chatClaude(messages, model || 'claude-3-5-sonnet-20240620');
            default:
                throw new Error(`Provider ${provider} not supported`);
        }
    }

    private async chatOpenAI(messages: ChatMessage[], model: string) {
        if (!this.openai) throw new Error('OpenAI API key not configured');
        const response = await this.openai.chat.completions.create({
            model,
            messages,
        });
        return response.choices[0].message.content;
    }

    private async chatGemini(messages: ChatMessage[], model: string) {
        if (!this.gemini) throw new Error('Gemini API key not configured');
        const genModel = this.gemini.getGenerativeModel({ model });

        // Convert messages to Gemini format (simplistic for now)
        const history = messages.slice(0, -1).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));
        const lastMessage = messages[messages.length - 1].content;

        const chat = genModel.startChat({ history });
        const result = await chat.sendMessage(lastMessage);
        return result.response.text();
    }

    private async chatClaude(messages: ChatMessage[], model: string) {
        if (!this.anthropic) throw new Error('Claude API key not configured');
        const system = messages.find(m => m.role === 'system')?.content;
        const userMessages = messages.filter(m => m.role !== 'system').map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
        }));

        const response = await this.anthropic.messages.create({
            model,
            system,
            max_tokens: 4096,
            messages: userMessages,
        });

        // @ts-ignore
        return response.content[0].text;
    }
}

export const aiService = new AIService();
