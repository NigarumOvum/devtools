/* empty css                                           */
import { c as createComponent, r as renderTemplate, e as renderComponent, d as createAstro, m as maybeRenderHead } from '../chunks/astro/server_D3Nh1ros.mjs';
import 'kleur/colors';
import { g as getLangFromUrl, $ as $$Layout, u as useTranslations, a as $$Navigation, b as $$Sidebar, A as AuthButton, J as JsonFormatter, B as Base64Tool, C as CssFormatter, S as SqlFormatter, U as UuidGenerator, c as ColorConverter, T as TimestampConverter, d as UrlCodec, H as HtmlEntityEncoder, e as JsonToTypescript, R as RegexTester, f as JwtDecoder, h as CronParser, M as MarkdownPreview, D as DiffChecker } from '../chunks/CronParser_DfQIURl4.mjs';
import { g as getSession } from '../chunks/server_CeMzoKKG.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { A as AGENTS } from '../chunks/agents_Des58lXQ.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const PROMPT_LIBRARY = [
  {
    id: "refactor_react",
    title: "Refactor React Component",
    category: "Frontend",
    template: "Refactor the following React component for better performance and readability: \n\n[CODE_HERE]"
  },
  {
    id: "unit_test_node",
    title: "Generate Node.js Unit Tests",
    category: "Backend",
    template: "Generate comprehensive unit tests for the following Node.js function using Jest: \n\n[CODE_HERE]"
  },
  {
    id: "sql_optimization",
    title: "Optimize SQL Query",
    category: "Database",
    template: "Analyze and optimize the following SQL query for better performance: \n\n[QUERY_HERE]"
  },
  {
    id: "architecture_doc",
    title: "Generate Architecture Document",
    category: "Documentation",
    template: "Create a high-level architecture document for the following project description: \n\n[DESCRIPTION_HERE]"
  }
];

const ExpertChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("senior_se");
  const [provider, setProvider] = useState("openai");
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          roleId: selectedAgent,
          messages: newMessages
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Chat Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden border border-gray-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "select",
          {
            value: selectedAgent,
            onChange: (e) => setSelectedAgent(e.target.value),
            className: "bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 outline-none",
            children: Object.values(AGENTS).map((agent) => /* @__PURE__ */ jsx("option", { value: agent.id, children: agent.name }, agent.id))
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: provider,
            onChange: (e) => setProvider(e.target.value),
            className: "bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 outline-none",
            children: [
              /* @__PURE__ */ jsx("option", { value: "openai", children: "OpenAI (GPT-4o)" }),
              /* @__PURE__ */ jsx("option", { value: "gemini", children: "Gemini Pro" }),
              /* @__PURE__ */ jsx("option", { value: "claude", children: "Claude 3.5 Sonnet" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
        "Agent: ",
        AGENTS[selectedAgent].description
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
      messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-500 mt-10", children: [
        "Start a conversation with the ",
        AGENTS[selectedAgent].name
      ] }),
      messages.map((m, i) => /* @__PURE__ */ jsx("div", { className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] p-3 rounded-lg ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`, children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs opacity-50 mb-1", children: m.role === "user" ? "You" : AGENTS[selectedAgent].name }),
        /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: m.content })
      ] }) }, i)),
      loading && /* @__PURE__ */ jsx("div", { className: "text-gray-400 animate-pulse", children: "Thinking..." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-800 border-t border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend()),
          placeholder: "Type your question...",
          className: "flex-1 bg-gray-700 text-white p-2 rounded border border-gray-600 outline-none resize-none",
          rows: 2
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSend,
          disabled: loading,
          className: "bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-2 rounded text-white font-bold transition-colors",
          children: "Send"
        }
      )
    ] }) })
  ] });
};

const PromptLibrary = ({ onSelect }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-800 border-b border-gray-700", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Prompt Library" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Select a template to start with" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto", children: PROMPT_LIBRARY.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => onSelect(item.template),
        className: "p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg cursor-pointer transition-colors group",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-blue-400 uppercase tracking-wider", children: item.category }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 group-hover:text-blue-400", children: "Use Template →" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: item.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 line-clamp-2 italic", children: [
            '"',
            item.template,
            '"'
          ] })
        ]
      },
      item.id
    )) })
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const session = await getSession(Astro2.request);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("main.title"), "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Sidebar", $$Sidebar, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="min-h-screen pt-20 md:pl-72 transition-all duration-300" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-astro-cid-j7pv25f6> <!-- Hero Section --> <header class="text-center mb-16 animate-fade-in" data-astro-cid-j7pv25f6> <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>⚡</span> <span data-astro-cid-j7pv25f6>19 Essential Developer Tools</span> </div> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-astro-cid-j7pv25f6> <span class="gradient-text" data-astro-cid-j7pv25f6>${t("main.title")}</span> </h1> <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-astro-cid-j7pv25f6> ${t("main.description")} </p> <div class="flex flex-wrap justify-center gap-3 mt-8" data-astro-cid-j7pv25f6> <span class="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium" data-astro-cid-j7pv25f6>
⚛️ React
</span> <span class="px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium" data-astro-cid-j7pv25f6>
💚 Vue
</span> <span class="px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium" data-astro-cid-j7pv25f6>
🔥 Svelte
</span> <span class="px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium" data-astro-cid-j7pv25f6>
🚀 Astro
</span> </div> </header> </div> <!-- AI Multi-Agent Studio Section --> <section id="ai-studio" class="mb-20 scroll-mt-24" data-astro-cid-j7pv25f6> <div class="flex items-center gap-3 mb-8" data-astro-cid-j7pv25f6> <span class="text-3xl" data-astro-cid-j7pv25f6>🤖</span> <h2 class="text-3xl font-bold text-slate-800 dark:text-white" data-astro-cid-j7pv25f6>
AI Expert Multi-Agent Studio
</h2> </div> ${!session ? renderTemplate`<div class="glass-card rounded-2xl p-12 text-center border-dashed border-2 border-slate-300 dark:border-slate-700" data-astro-cid-j7pv25f6> <h3 class="text-2xl font-bold mb-4" data-astro-cid-j7pv25f6>Unlock Expert AI Insights</h3> <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto" data-astro-cid-j7pv25f6>
Consult with Senior Software Engineers and Managers. Sign in to
              access our multi-agent chat powered by OpenAI, Gemini, and Claude.
</p> ${renderComponent($$result2, "AuthButton", AuthButton, { "client:load": true, "session": session, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/AuthButton", "client:component-export": "AuthButton", "data-astro-cid-j7pv25f6": true })} </div>` : renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-astro-cid-j7pv25f6> <div class="lg:col-span-2" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ExpertChat", ExpertChat, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/ExpertChat", "client:component-export": "ExpertChat", "data-astro-cid-j7pv25f6": true })} </div> <div class="space-y-8" data-astro-cid-j7pv25f6> <div id="prompt-library" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "PromptLibrary", PromptLibrary, { "client:load": true, "onSelect": () => {
  }, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/PromptLibrary", "client:component-export": "PromptLibrary", "data-astro-cid-j7pv25f6": true })} </div> <div class="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl" data-astro-cid-j7pv25f6> <h3 class="font-bold text-blue-400 mb-2 italic" data-astro-cid-j7pv25f6>
Pro Tip: Multi-Agent Synergy
</h3> <p class="text-xs text-gray-400" data-astro-cid-j7pv25f6>
Switch between OpenAI for logic, Claude for nuanced code, and
                  Gemini for data-heavy tasks to get the best of all worlds.
</p> </div> </div> </div>`} </section> <!-- Formatters Section --> <section id="tools" class="mb-16" data-astro-cid-j7pv25f6> <div class="flex items-center gap-3 mb-8" data-astro-cid-j7pv25f6> <span class="text-2xl" data-astro-cid-j7pv25f6>✨</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-j7pv25f6> ${t("category.formatters")} </h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-j7pv25f6> <div id="json-formatter" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "JsonFormatter", JsonFormatter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/JsonFormatter", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="base64-tool" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Base64Tool", Base64Tool, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/Base64Tool", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="css-formatter" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CssFormatter", CssFormatter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/CssFormatter.vue", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="sql-formatter" class="animate-slide-up" style="animation-delay: 0.4s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SqlFormatter", SqlFormatter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/SqlFormatter.vue", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> </section> <!-- Generators Section --> <section class="mb-16" data-astro-cid-j7pv25f6> <div class="flex items-center gap-3 mb-8" data-astro-cid-j7pv25f6> <span class="text-2xl" data-astro-cid-j7pv25f6>⚡</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-j7pv25f6> ${t("category.generators")} </h2> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-astro-cid-j7pv25f6> <div id="uuid-generator" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "UuidGenerator", UuidGenerator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/UuidGenerator", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="color-converter" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ColorConverter", ColorConverter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/ColorConverter.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="timestamp-converter" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "TimestampConverter", TimestampConverter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/TimestampConverter.vue", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="url-codec" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "UrlCodec", UrlCodec, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/UrlCodec.vue", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="html-entity-encoder" class="animate-slide-up" style="animation-delay: 0.4s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HtmlEntityEncoder", HtmlEntityEncoder, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/HtmlEntityEncoder.vue", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="json-to-typescript" class="animate-slide-up" style="animation-delay: 0.5s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "JsonToTypescript", JsonToTypescript, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/JsonToTypescript", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> <!-- Validators & Testers Section --> <section class="mb-16" data-astro-cid-j7pv25f6> <div class="flex items-center gap-3 mb-8" data-astro-cid-j7pv25f6> <span class="text-2xl" data-astro-cid-j7pv25f6>✅</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-j7pv25f6> ${t("category.validators")} </h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-j7pv25f6> <div id="regex-tester" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "RegexTester", RegexTester, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/RegexTester", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="jwt-decoder" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "JwtDecoder", JwtDecoder, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/JwtDecoder.vue", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="cron-parser" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CronParser", CronParser, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/CronParser.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> </section> <!-- Text Tools Section --> <section class="mb-16" data-astro-cid-j7pv25f6> <div class="flex items-center gap-3 mb-8" data-astro-cid-j7pv25f6> <span class="text-2xl" data-astro-cid-j7pv25f6>📝</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-j7pv25f6> ${t("category.textTools")} </h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-j7pv25f6> <div id="markdown-preview" class="animate-slide-up lg:col-span-2" style="animation-delay: 0.1s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "MarkdownPreview", MarkdownPreview, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/MarkdownPreview", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <div id="diff-checker" class="animate-slide-up lg:col-span-2" style="animation-delay: 0.2s;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "DiffChecker", DiffChecker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/DiffChecker", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> </section> <!-- About Section --> <section id="about" class="mb-16" data-astro-cid-j7pv25f6> <div class="glass-card rounded-2xl p-8 md:p-12" data-astro-cid-j7pv25f6> <div class="max-w-3xl mx-auto text-center" data-astro-cid-j7pv25f6> <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-4" data-astro-cid-j7pv25f6>
About DevTools Pro
</h2> <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" data-astro-cid-j7pv25f6>
Built with Astro's Islands architecture, this toolkit showcases
              seamless integration of React, Vue, and Svelte components. All
              tools run entirely in your browser — no data is ever sent to any
              server.
</p> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" data-astro-cid-j7pv25f6> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-j7pv25f6> <div class="text-3xl font-bold gradient-text" data-astro-cid-j7pv25f6>19</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-j7pv25f6>
Tools
</div> </div> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-j7pv25f6> <div class="text-3xl font-bold gradient-text" data-astro-cid-j7pv25f6>3</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-j7pv25f6>
Frameworks
</div> </div> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-j7pv25f6> <div class="text-3xl font-bold gradient-text" data-astro-cid-j7pv25f6>0</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-j7pv25f6>
Data Sent
</div> </div> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-j7pv25f6> <div class="text-3xl font-bold gradient-text" data-astro-cid-j7pv25f6>∞</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-j7pv25f6>
Free Uses
</div> </div> </div> </div> </div> </section> <!-- Footer --> <footer class="text-center text-sm text-slate-500 dark:text-slate-400 py-8 border-t border-slate-200 dark:border-slate-800" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>Built with ❤️ using Astro, React, Vue & Svelte</p> </footer> </section> </main> ` })} `;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/index.astro", void 0);

const $$file = "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
