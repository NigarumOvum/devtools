import { g as getSession } from '../../chunks/server_CeMzoKKG.mjs';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';
import { g as getAgentPrompt } from '../../chunks/agents_Des58lXQ.mjs';
export { renderers } from '../../renderers.mjs';

class AIService {
  openai;
  gemini;
  anthropic;
  constructor() {
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const claudeKey = process.env.CLAUDE_API_KEY;
    if (openaiKey) this.openai = new OpenAI({ apiKey: openaiKey });
    if (geminiKey) this.gemini = new GoogleGenerativeAI(geminiKey);
    if (claudeKey) this.anthropic = new Anthropic({ apiKey: claudeKey });
  }
  async chat(provider, messages, model) {
    switch (provider) {
      case "openai":
        return this.chatOpenAI(messages, model || "gpt-4o");
      case "gemini":
        return this.chatGemini(messages, model || "gemini-1.5-pro");
      case "claude":
        return this.chatClaude(messages, model || "claude-3-5-sonnet-20240620");
      default:
        throw new Error(`Provider ${provider} not supported`);
    }
  }
  async chatOpenAI(messages, model) {
    if (!this.openai) throw new Error("OpenAI API key not configured");
    const response = await this.openai.chat.completions.create({
      model,
      messages
    });
    return response.choices[0].message.content;
  }
  async chatGemini(messages, model) {
    if (!this.gemini) throw new Error("Gemini API key not configured");
    const genModel = this.gemini.getGenerativeModel({ model });
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));
    const lastMessage = messages[messages.length - 1].content;
    const chat = genModel.startChat({ history });
    const result = await chat.sendMessage(lastMessage);
    return result.response.text();
  }
  async chatClaude(messages, model) {
    if (!this.anthropic) throw new Error("Claude API key not configured");
    const system = messages.find((m) => m.role === "system")?.content;
    const userMessages = messages.filter((m) => m.role !== "system").map((m) => ({
      role: m.role,
      content: m.content
    }));
    const response = await this.anthropic.messages.create({
      model,
      system,
      max_tokens: 4096,
      messages: userMessages
    });
    return response.content[0].text;
  }
}
const aiService = new AIService();

const POST = async ({ request }) => {
  const session = await getSession(request);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const { provider, messages, roleId, model } = await request.json();
    const chatMessages = [];
    if (roleId) {
      chatMessages.push({ role: "system", content: getAgentPrompt(roleId) });
    }
    chatMessages.push(...messages);
    const response = await aiService.chat(provider, chatMessages, model);
    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("AI API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
