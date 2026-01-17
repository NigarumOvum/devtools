import { c as createComponent, r as renderTemplate, b as addAttribute, a as renderHead, g as renderSlot, d as createAstro, m as maybeRenderHead, e as renderComponent } from './astro/server_D3Nh1ros.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
import { g as getSession } from './server_CeMzoKKG.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback, useMemo } from 'react';
import { ref, computed, mergeProps, useSSRContext, watch, onMounted, onUnmounted, defineComponent } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';

const $$Astro$3 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Professional developer tools for frontend and backend developers"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="transition-colors duration-300 bg-slate-50 dark:bg-slate-950 min-h-screen"> <div class="fixed inset-0 overflow-hidden pointer-events-none"> <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl animate-float"></div> <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 rounded-full blur-3xl animate-float" style="animation-delay: 3s;"></div> </div> <div class="relative z-10"> ${renderSlot($$result, $$slots["default"])} </div>  </body></html>`;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/layouts/Layout.astro", void 0);

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" class="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors" aria-label="Toggle dark mode"> <span class="dark:hidden">🌙</span> <span class="hidden dark:inline">☀️</span> </button> `;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/ThemeToggle.astro", void 0);

const languages = {
  en: "English",
  es: "Español"
};
const defaultLang = "en";
const ui = {
  en: {
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.about": "About",
    "sidebar.devTools": "Developer Tools",
    "sidebar.tip": "Click any tool to jump directly to it",
    "category.formatters": "Formatters",
    "category.generators": "Generators",
    "category.converters": "Converters",
    "category.validators": "Validators",
    "category.textTools": "Text Tools",
    // Original tools
    "tools.jsonFormatter": "JSON Formatter",
    "tools.base64": "Base64 Codec",
    "tools.uuidGenerator": "UUID Generator",
    "tools.hashGenerator": "Hash Generator",
    "tools.loremGenerator": "Lorem Ipsum",
    "tools.colorConverter": "Color Converter",
    "tools.timestampConverter": "Timestamp",
    "tools.urlCodec": "URL Codec",
    "tools.regexTester": "Regex Tester",
    "tools.jwtDecoder": "JWT Decoder",
    // New tools
    "tools.markdownPreview": "Markdown Preview",
    "tools.diffChecker": "Diff Checker",
    "tools.cssFormatter": "CSS Formatter",
    "tools.cronParser": "Cron Parser",
    "tools.htmlEntity": "HTML Entities",
    "tools.qrGenerator": "QR Generator",
    "tools.passwordGenerator": "Password Gen",
    "tools.jsonToTs": "JSON → TypeScript",
    "tools.sqlFormatter": "SQL Formatter",
    // Main
    "main.title": "DevTools Pro",
    "main.subtitle": "Professional Developer Tools",
    "main.description": "A comprehensive collection of essential utilities for frontend and backend developers. Fast, secure, and built with modern technologies.",
    "theme.toggle": "Toggle dark mode",
    "common.copy": "Copy",
    "common.copied": "Copied!",
    "common.clear": "Clear",
    "common.generate": "Generate",
    "common.encode": "Encode",
    "common.decode": "Decode",
    "common.format": "Format",
    "common.minify": "Minify",
    "common.test": "Test"
  },
  es: {
    "nav.home": "Inicio",
    "nav.tools": "Herramientas",
    "nav.about": "Acerca de",
    "sidebar.devTools": "Herramientas Dev",
    "sidebar.tip": "Haz clic en cualquier herramienta para ir directamente",
    "category.formatters": "Formateadores",
    "category.generators": "Generadores",
    "category.converters": "Conversores",
    "category.validators": "Validadores",
    "category.textTools": "Herramientas de Texto",
    // Original tools
    "tools.jsonFormatter": "Formateador JSON",
    "tools.base64": "Codec Base64",
    "tools.uuidGenerator": "Generador UUID",
    "tools.hashGenerator": "Generador Hash",
    "tools.loremGenerator": "Lorem Ipsum",
    "tools.colorConverter": "Conversor Color",
    "tools.timestampConverter": "Timestamp",
    "tools.urlCodec": "Codec URL",
    "tools.regexTester": "Tester Regex",
    "tools.jwtDecoder": "Decodificador JWT",
    // New tools
    "tools.markdownPreview": "Vista Markdown",
    "tools.diffChecker": "Comparador Diff",
    "tools.cssFormatter": "Formateador CSS",
    "tools.cronParser": "Parser Cron",
    "tools.htmlEntity": "Entidades HTML",
    "tools.qrGenerator": "Generador QR",
    "tools.passwordGenerator": "Gen. Contraseña",
    "tools.jsonToTs": "JSON → TypeScript",
    "tools.sqlFormatter": "Formateador SQL",
    // Main
    "main.title": "DevTools Pro",
    "main.subtitle": "Herramientas Profesionales",
    "main.description": "Una colección completa de utilidades esenciales para desarrolladores frontend y backend. Rápidas, seguras y construidas con tecnologías modernas.",
    "theme.toggle": "Cambiar modo oscuro",
    "common.copy": "Copiar",
    "common.copied": "¡Copiado!",
    "common.clear": "Limpiar",
    "common.generate": "Generar",
    "common.encode": "Codificar",
    "common.decode": "Decodificar",
    "common.format": "Formatear",
    "common.minify": "Minificar",
    "common.test": "Probar"
  }
};

const $$Astro$2 = createAstro();
const $$LanguageSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const currentPath = Astro2.url.pathname;
  const currentLang = currentPath.split("/")[1] || "en";
  return renderTemplate`${maybeRenderHead()}<div class="relative inline-block text-left"> <select id="language-select" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"> ${Object.entries(languages).map(([lang, label]) => renderTemplate`<option${addAttribute(lang, "value")}${addAttribute(currentLang === lang, "selected")}> ${label} </option>`)} </select> </div> `;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/LanguageSelector.astro", void 0);

function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang;
  return defaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

async function signIn(providerId, options, authorizationParams) {
  const { callbackUrl = window.location.href, redirect = true } = options ?? {};
  const { prefix = "/api/auth", ...opts } = options ?? {};
  const isCredentials = providerId === "credentials";
  const isSupportingReturn = isCredentials;
  const signInUrl = `${prefix}/${"callback" }/${providerId}`;
  const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`;
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(_signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    // @ts-expect-error -- ignore
    body: new URLSearchParams({
      ...opts,
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.clone().json();
  const error = new URL(data.url).searchParams.get("error");
  if (redirect || !isSupportingReturn || !error) {
    window.location.href = data.url ?? callbackUrl;
    if (data.url.includes("#")) window.location.reload();
    return;
  }
  return res;
}
async function signOut(options) {
  const { callbackUrl = window.location.href, prefix = "/api/auth" } = {};
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(`${prefix}/signout`, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    body: new URLSearchParams({
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.json();
  const url = data.url ?? callbackUrl;
  window.location.href = url;
  if (url.includes("#")) window.location.reload();
}

const AuthButton = ({ session }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  if (session) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: session.user?.name }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: session.user?.email })
      ] }),
      session.user?.image ? /* @__PURE__ */ jsx("img", { src: session.user.image, alt: "Profile", className: "w-8 h-8 rounded-full border border-gray-600" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold", children: session.user?.name?.charAt(0) || "U" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => signOut(),
          className: "bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/50 px-4 py-1.5 rounded-lg text-sm transition-all",
          children: "Sign Out"
        }
      )
    ] });
  }
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    if (isRegister) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessage("Success! Check your email to verify.");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result && result.error) {
        setError("Invalid credentials");
        setLoading(false);
      } else {
        window.location.reload();
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setShowEmailForm(true),
        className: "bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20",
        children: "Sign In / Register"
      }
    ) }),
    showEmailForm && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300",
          onClick: () => setShowEmailForm(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white tracking-tight", children: isRegister ? "Join DevTools Pro" : "Sign In" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mt-1", children: isRegister ? "Start your specialized AI journey" : "Welcome back to your dashboard" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowEmailForm(false),
                className: "p-2 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-all",
                "aria-label": "Close modal",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          message && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-500/10 text-emerald-400 text-sm rounded-2xl mb-6 border border-emerald-500/20 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { children: "✅" }),
            " ",
            message
          ] }),
          error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-rose-500/10 text-rose-400 text-sm rounded-2xl mb-6 border border-rose-500/20 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { children: "⚠️" }),
            " ",
            error
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleEmailAuth, className: "space-y-5", children: [
            isRegister && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1", children: "Full Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. Alex Rivera",
                  required: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1", children: "Email Address" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  placeholder: "alex@example.com",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1", children: "Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  placeholder: "••••••••••••",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: loading,
                className: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-2xl font-bold text-white transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 mt-4 active:scale-[0.98]",
                children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  "Processing..."
                ] }) : isRegister ? "Create Account" : "Sign In"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-8 border-t border-slate-800 flex flex-col gap-4 text-center", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsRegister(!isRegister),
                className: "text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors",
                children: isRegister ? "Already an expert? Log in here" : "First time? Join the studio now"
              }
            ),
            !isRegister && /* @__PURE__ */ jsx("a", { href: "/auth/forgot-password", className: "text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4", children: "Restore lost password" })
          ] })
        ] })
      ] })
    ] })
  ] });
};

const $$Astro$1 = createAstro();
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navigation;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const session = await getSession(Astro2.request);
  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: "\u{1F916} AI Studio", href: "/#ai-studio" },
    { name: t("nav.tools"), href: "/#tools" },
    { name: t("nav.about"), href: "/#about" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="glass-card fixed w-full top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between h-16"> <div class="flex items-center gap-3"> <a href="/" class="flex items-center gap-3 group"> <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:shadow-xl group-hover:shadow-accent-500/30 transition-all duration-300"> <span class="text-xl">🛠️</span> </div> <div> <span class="text-xl font-bold gradient-text">DevTools</span> <span class="hidden sm:inline text-slate-400 dark:text-slate-500 text-sm ml-2">Pro</span> </div> </a> </div> <div class="flex items-center gap-4"> <div class="hidden md:flex items-center gap-1"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 
                     px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                     hover:bg-accent-500/10"> ${item.name} </a>`)} </div> <div class="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-700"></div> <div class="hidden md:block"> ${renderComponent($$result, "AuthButton", AuthButton, { "client:load": true, "session": session, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/AuthButton", "client:component-export": "AuthButton" })} </div> ${renderComponent($$result, "LanguageSelector", $$LanguageSelector, {})} <div class="md:hidden"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} </div> <!-- Mobile menu button --> <button id="mobile-menu-btn" class="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle mobile menu"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </div> <!-- Mobile Menu --> <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200/50 dark:border-slate-700/50"> <div class="px-4 py-4 space-y-2"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-accent-500/10 hover:text-accent-600 dark:hover:text-accent-400 font-medium transition-all"> ${item.name} </a>`)} <div class="pt-4 border-t border-slate-200/50 dark:border-slate-700/50"> ${renderComponent($$result, "AuthButton", AuthButton, { "client:load": true, "session": session, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/AuthButton", "client:component-export": "AuthButton" })} </div> </div> </div> </nav> `;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/Navigation.astro", void 0);

const $$Astro = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const toolCategories = [
    {
      name: "\u{1F916} AI Expert Studio",
      icon: "\u2728",
      tools: [
        { name: "Chat with Experts", href: "#ai-studio", icon: "\u{1F4AC}" },
        { name: "Prompt Library", href: "#prompt-library", icon: "\u{1F4DA}" }
      ]
    },
    {
      name: t("category.formatters"),
      icon: "\u2728",
      tools: [
        { name: t("tools.jsonFormatter"), href: "#json-formatter", icon: "\u{1F4CB}" },
        { name: t("tools.base64"), href: "#base64-tool", icon: "\u{1F510}" },
        { name: t("tools.cssFormatter"), href: "#css-formatter", icon: "\u{1F3A8}" },
        { name: t("tools.sqlFormatter"), href: "#sql-formatter", icon: "\u{1F5C3}\uFE0F" }
      ]
    },
    {
      name: t("category.generators"),
      icon: "\u26A1",
      tools: [
        { name: t("tools.uuidGenerator"), href: "#uuid-generator", icon: "\u{1F3B2}" },
        { name: t("tools.hashGenerator"), href: "#hash-generator", icon: "\u{1F512}" },
        { name: t("tools.loremGenerator"), href: "#lorem-generator", icon: "\u{1F4DD}" },
        {
          name: t("tools.passwordGenerator"),
          href: "#password-generator",
          icon: "\u{1F511}"
        },
        { name: t("tools.qrGenerator"), href: "#qr-generator", icon: "\u{1F4F1}" }
      ]
    },
    {
      name: t("category.converters"),
      icon: "\u{1F504}",
      tools: [
        { name: t("tools.colorConverter"), href: "#color-converter", icon: "\u{1F308}" },
        {
          name: t("tools.timestampConverter"),
          href: "#timestamp-converter",
          icon: "\u23F0"
        },
        { name: t("tools.urlCodec"), href: "#url-codec", icon: "\u{1F517}" },
        { name: t("tools.htmlEntity"), href: "#html-entity-encoder", icon: "\u{1F524}" },
        { name: t("tools.jsonToTs"), href: "#json-to-typescript", icon: "\u{1F537}" }
      ]
    },
    {
      name: t("category.validators"),
      icon: "\u2705",
      tools: [
        { name: t("tools.regexTester"), href: "#regex-tester", icon: "\u{1F50D}" },
        { name: t("tools.jwtDecoder"), href: "#jwt-decoder", icon: "\u{1F3AB}" },
        { name: t("tools.cronParser"), href: "#cron-parser", icon: "\u23F1\uFE0F" }
      ]
    },
    {
      name: t("category.textTools"),
      icon: "\u{1F4DD}",
      tools: [
        {
          name: t("tools.markdownPreview"),
          href: "#markdown-preview",
          icon: "\u{1F4C4}"
        },
        { name: t("tools.diffChecker"), href: "#diff-checker", icon: "\u{1F4CA}" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 glass-card border-r border-slate-200/50 dark:border-slate-700/50 hidden md:block overflow-y-auto transition-all duration-300" data-astro-cid-ssfzsv2f> <div class="p-5" data-astro-cid-ssfzsv2f> <div class="flex justify-between items-center mb-6" data-astro-cid-ssfzsv2f> <h2 class="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2" data-astro-cid-ssfzsv2f> <span class="text-xl" data-astro-cid-ssfzsv2f>🧰</span> ${t("sidebar.devTools")} </h2> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-ssfzsv2f": true })} </div> <div class="space-y-4" data-astro-cid-ssfzsv2f> ${toolCategories.map((category) => renderTemplate`<div class="category-group" data-astro-cid-ssfzsv2f> <div class="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-astro-cid-ssfzsv2f> <span data-astro-cid-ssfzsv2f>${category.icon}</span> <span data-astro-cid-ssfzsv2f>${category.name}</span> </div> <ul class="space-y-1" data-astro-cid-ssfzsv2f> ${category.tools.map((tool) => renderTemplate`<li data-astro-cid-ssfzsv2f> <a${addAttribute(tool.href, "href")} class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 
                         hover:bg-gradient-to-r hover:from-accent-500/10 hover:to-primary-500/10 
                         hover:text-accent-600 dark:hover:text-accent-400 
                         transition-all duration-200 group" data-astro-cid-ssfzsv2f> <span class="text-lg group-hover:scale-110 transition-transform duration-200" data-astro-cid-ssfzsv2f> ${tool.icon} </span> <span class="font-medium text-sm" data-astro-cid-ssfzsv2f>${tool.name}</span> </a> </li>`)} </ul> </div>`)} </div> <div class="mt-8 p-4 rounded-xl bg-gradient-to-br from-accent-500/10 to-primary-500/10 border border-accent-500/20" data-astro-cid-ssfzsv2f> <p class="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2" data-astro-cid-ssfzsv2f> <span data-astro-cid-ssfzsv2f>💡</span> <span data-astro-cid-ssfzsv2f>${t("sidebar.tip")}</span> </p> </div> </div> </aside> `;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/Sidebar.astro", void 0);

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }, [input]);
  const minifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }, [input]);
  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  }, [output]);
  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);
  const sampleJson = '{"name":"DevTools","version":"1.0.0","features":["formatting","validation","minification"]}';
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📋" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "JSON Formatter" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Format, validate & minify JSON" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Input JSON" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setInput(sampleJson),
              className: "text-xs text-accent-500 hover:text-accent-600 transition-colors",
              children: "Load sample"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: input,
            onChange: (e) => setInput(e.target.value),
            placeholder: '{"key": "value"}',
            className: "tool-textarea h-32"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs("button", { onClick: formatJson, className: "tool-btn-primary flex-1", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: "✨" }),
          "Format"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: minifyJson, className: "tool-btn-secondary flex-1", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📦" }),
          "Minify"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: clearAll, className: "tool-btn-secondary", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: "🗑️" }),
          "Clear"
        ] })
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "❌" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Invalid JSON:" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-xs", children: error })
      ] }),
      output && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Output" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copyToClipboard,
              className: `text-xs px-3 py-1 rounded-lg transition-all ${copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
              children: copied ? "✓ Copied!" : "📋 Copy"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "code-block overflow-auto max-h-48", children: output })
      ] })
    ] })
  ] });
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch (e) {
      setError(mode === "decode" ? "Invalid Base64 string" : "Encoding failed");
      setOutput("");
    }
  }, [input, mode]);
  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  }, [output]);
  const swapInputOutput = useCallback(() => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
  }, [output, mode]);
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🔐" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "Base64 Codec" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Encode & decode Base64 strings" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setMode("encode");
              setError("");
            },
            className: `flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${mode === "encode" ? "bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📤" }),
              "Encode"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setMode("decode");
              setError("");
            },
            className: `flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${mode === "decode" ? "bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📥" }),
              "Decode"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: mode === "encode" ? "Plain Text" : "Base64 String" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: input,
            onChange: (e) => setInput(e.target.value),
            placeholder: mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode...",
            className: "tool-textarea h-24"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs("button", { onClick: process, className: "tool-btn-primary flex-1", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: mode === "encode" ? "📤" : "📥" }),
          mode === "encode" ? "Encode" : "Decode"
        ] }),
        output && /* @__PURE__ */ jsx("button", { onClick: swapInputOutput, className: "tool-btn-secondary", title: "Use output as input", children: /* @__PURE__ */ jsx("span", { children: "🔄" }) })
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in", children: [
        /* @__PURE__ */ jsx("span", { className: "mr-2", children: "❌" }),
        error
      ] }),
      output && !error && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: mode === "encode" ? "Base64 Output" : "Decoded Text" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copyToClipboard,
              className: `text-xs px-3 py-1 rounded-lg transition-all ${copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
              children: copied ? "✓ Copied!" : "📋 Copy"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "result-display break-all", children: output })
      ] })
    ] })
  ] });
}

function UuidGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const generateUUID = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  };
  const generateUUIDs = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
    setCopied(null);
    setCopiedAll(false);
  }, [count]);
  const copyToClipboard = useCallback(async (uuid, index) => {
    await navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2e3);
  }, []);
  const copyAll = useCallback(async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2e3);
  }, [uuids]);
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🎲" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "UUID Generator" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Generate secure UUID v4 identifiers" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Count" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCount(Math.max(1, count - 1)),
                className: "tool-btn-secondary w-10 h-10 flex items-center justify-center",
                children: "-"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: "50",
                value: count,
                onChange: (e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1))),
                className: "tool-input text-center w-20"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCount(Math.min(50, count + 1)),
                className: "tool-btn-secondary w-10 h-10 flex items-center justify-center",
                children: "+"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: " " }),
          /* @__PURE__ */ jsxs("button", { onClick: generateUUIDs, className: "tool-btn-primary w-full", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "⚡" }),
            "Generate"
          ] })
        ] })
      ] }),
      uuids.length > 0 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: [
            "Generated UUIDs (",
            uuids.length,
            ")"
          ] }),
          uuids.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copyAll,
              className: `text-xs px-3 py-1 rounded-lg transition-all ${copiedAll ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
              children: copiedAll ? "✓ All Copied!" : "📋 Copy All"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto pr-2", children: uuids.map((uuid, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 group",
            children: [
              /* @__PURE__ */ jsx("code", { className: "flex-1 text-sm font-mono text-slate-700 dark:text-slate-300", children: uuid }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => copyToClipboard(uuid, index),
                  className: `px-2 py-1 rounded-lg text-xs transition-all opacity-0 group-hover:opacity-100 ${copied === index ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`,
                  children: copied === index ? "✓" : "📋"
                }
              )
            ]
          },
          index
        )) })
      ] }),
      uuids.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-slate-400 dark:text-slate-500", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-2", children: "🎲" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Click Generate to create UUIDs" })
      ] })
    ] })
  ] });
}

const presets = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&'()*+,;=]+" },
  { name: "Phone", pattern: "\\+?[1-9]\\d{1,14}" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { name: "IPv4", pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}" },
  { name: "Hex Color", pattern: "#[0-9A-Fa-f]{6}\\b" }
];
function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("gm");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");
  const matches = useMemo(() => {
    if (!pattern || !testString) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const results = [];
      let match;
      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (!match[0]) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }
      setError("");
      return results;
    } catch (e) {
      setError(e.message);
      return [];
    }
  }, [pattern, flags, testString]);
  const highlightedText = useMemo(() => {
    if (!pattern || !testString || error || matches.length === 0) return testString;
    try {
      const regex = new RegExp(pattern, flags.replace("g", "") + "g");
      return testString.replace(regex, '<mark class="bg-accent-300 dark:bg-accent-600 px-0.5 rounded">$&</mark>');
    } catch {
      return testString;
    }
  }, [pattern, flags, testString, error, matches]);
  const toggleFlag = useCallback((flag) => {
    setFlags(
      (prev) => prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  }, []);
  const applyPreset = useCallback((preset) => {
    setPattern(preset.pattern);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🔍" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "Regex Tester" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Test regular expressions with live highlighting" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Pattern" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: presets.map((preset) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => applyPreset(preset),
              className: "text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-600 dark:hover:text-accent-400 transition-colors",
              title: preset.pattern,
              children: preset.name
            },
            preset.name
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/20 transition-all", children: [
          /* @__PURE__ */ jsx("span", { className: "pl-4 text-slate-400", children: "/" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: pattern,
              onChange: (e) => setPattern(e.target.value),
              placeholder: "Enter regex pattern...",
              className: "flex-1 px-2 py-3 bg-transparent text-slate-800 dark:text-slate-100 font-mono text-sm focus:outline-none"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "/" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: flags,
              onChange: (e) => setFlags(e.target.value),
              className: "w-12 px-2 py-3 bg-transparent text-accent-500 font-mono text-sm focus:outline-none"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
        { flag: "g", label: "Global", desc: "Find all matches" },
        { flag: "i", label: "Case Insensitive", desc: "Ignore case" },
        { flag: "m", label: "Multiline", desc: "^/$ match line start/end" },
        { flag: "s", label: "Dotall", desc: ". matches newlines" }
      ].map(({ flag, label }) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => toggleFlag(flag),
          className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${flags.includes(flag) ? "bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 ring-1 ring-accent-500/30" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono mr-1", children: flag }),
            label
          ]
        },
        flag
      )) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Test String" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: testString,
            onChange: (e) => setTestString(e.target.value),
            placeholder: "Enter text to test against the pattern...",
            className: "tool-textarea h-24"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in", children: [
        /* @__PURE__ */ jsx("span", { className: "mr-2", children: "❌" }),
        error
      ] }),
      !error && pattern && testString && /* @__PURE__ */ jsxs("div", { className: "space-y-3 animate-fade-in", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: [
          "Matches: ",
          /* @__PURE__ */ jsx("span", { className: `font-bold ${matches.length > 0 ? "text-green-500" : "text-slate-400"}`, children: matches.length })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm font-mono whitespace-pre-wrap break-all text-slate-700 dark:text-slate-300",
            dangerouslySetInnerHTML: { __html: highlightedText }
          }
        ),
        matches.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-h-40 overflow-y-auto", children: [
          matches.slice(0, 10).map((match, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
              "#",
              index + 1
            ] }),
            /* @__PURE__ */ jsx("code", { className: "flex-1 text-accent-600 dark:text-accent-400", children: match.text }),
            /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
              "@",
              match.index
            ] })
          ] }, index)),
          matches.length > 10 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 text-center", children: [
            "...and ",
            matches.length - 10,
            " more matches"
          ] })
        ] })
      ] })
    ] })
  ] });
}

function MarkdownPreview() {
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const sampleMarkdown = `# Hello World

This is a **bold** text and this is *italic*.

## Features
- Live preview
- Syntax highlighting
- Easy to use

### Code Example
\`\`\`javascript
const greeting = "Hello, DevTools!";
console.log(greeting);
\`\`\`

> This is a blockquote

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

[Visit GitHub](https://github.com)`;
  const parseMarkdown = useCallback((text) => {
    let html = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block my-2 overflow-x-auto"><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-sm font-mono">$1</code>').replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-800 dark:text-white">$1</h3>').replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-white">$1</h2>').replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4 text-slate-800 dark:text-white">$1</h1>').replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>').replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>').replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-accent-500 pl-4 py-1 my-2 text-slate-600 dark:text-slate-400 italic">$1</blockquote>').replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-accent-500 hover:text-accent-600 underline">$1</a>').replace(/\|(.+)\|/g, (match) => {
      const cells = match.split("|").filter((cell) => cell.trim() && !cell.includes("---"));
      if (cells.length > 0) {
        const isHeader = !match.includes("---");
        const cellTag = isHeader ? "td" : "th";
        return `<tr>${cells.map((cell) => `<${cellTag} class="border border-slate-300 dark:border-slate-600 px-3 py-2">${cell.trim()}</${cellTag}>`).join("")}</tr>`;
      }
      return "";
    }).replace(/\n\n/g, '</p><p class="my-2 text-slate-700 dark:text-slate-300">').replace(/\n/g, "<br/>");
    return `<div class="prose dark:prose-invert max-w-none"><p class="my-2 text-slate-700 dark:text-slate-300">${html}</p></div>`;
  }, []);
  const copyHtml = useCallback(async () => {
    const html = parseMarkdown(markdown);
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, [markdown, parseMarkdown]);
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📝" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "Markdown Preview" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Live markdown editor & preview" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Markdown" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMarkdown(sampleMarkdown),
              className: "text-xs text-accent-500 hover:text-accent-600 transition-colors",
              children: "Load sample"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: markdown,
            onChange: (e) => setMarkdown(e.target.value),
            placeholder: "# Write your markdown here...",
            className: "tool-textarea h-64 lg:h-80"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Preview" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copyHtml,
              className: `text-xs px-3 py-1 rounded-lg transition-all ${copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
              children: copied ? "✓ Copied!" : "📋 Copy HTML"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-64 lg:h-80 overflow-auto p-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700",
            dangerouslySetInnerHTML: { __html: markdown ? parseMarkdown(markdown) : '<p class="text-slate-400">Preview will appear here...</p>' }
          }
        )
      ] })
    ] })
  ] });
}

function DiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [viewMode, setViewMode] = useState("split");
  const sampleText1 = `function greet(name) {
    console.log("Hello, " + name);
    return true;
}

const users = ["Alice", "Bob"];`;
  const sampleText2 = `function greet(name, title) {
    console.log("Hello, " + title + " " + name);
    return true;
}

const users = ["Alice", "Bob", "Charlie"];`;
  const diff = useMemo(() => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLength = Math.max(lines1.length, lines2.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      const l1 = lines1[i];
      const l2 = lines2[i];
      if (l1 === void 0 && l2 !== void 0) {
        result.push({ line1: "", line2: l2, type: "added", lineNum1: null, lineNum2: i + 1 });
      } else if (l1 !== void 0 && l2 === void 0) {
        result.push({ line1: l1, line2: "", type: "removed", lineNum1: i + 1, lineNum2: null });
      } else if (l1 === l2) {
        result.push({ line1: l1, line2: l2, type: "equal", lineNum1: i + 1, lineNum2: i + 1 });
      } else {
        result.push({ line1: l1, line2: l2, type: "modified", lineNum1: i + 1, lineNum2: i + 1 });
      }
    }
    return result;
  }, [text1, text2]);
  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const modified = diff.filter((d) => d.type === "modified").length;
    return { added, removed, modified };
  }, [diff]);
  const loadSample = useCallback(() => {
    setText1(sampleText1);
    setText2(sampleText2);
  }, []);
  const clearAll = useCallback(() => {
    setText1("");
    setText2("");
  }, []);
  const getLineStyle = (type) => {
    switch (type) {
      case "added":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "removed":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      case "modified":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      default:
        return "text-slate-700 dark:text-slate-300";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📊" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "Diff Checker" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Compare two texts side-by-side" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: loadSample, className: "tool-btn-secondary text-sm", children: "📄 Load Sample" }),
          /* @__PURE__ */ jsx("button", { onClick: clearAll, className: "tool-btn-secondary text-sm", children: "🗑️ Clear" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setViewMode("split"),
              className: `px-3 py-1 text-sm rounded-md transition-all ${viewMode === "split" ? "bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-400"}`,
              children: "Split"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setViewMode("unified"),
              className: `px-3 py-1 text-sm rounded-md transition-all ${viewMode === "unified" ? "bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-400"}`,
              children: "Unified"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", children: "Original" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: text1,
              onChange: (e) => setText1(e.target.value),
              placeholder: "Paste original text here...",
              className: "tool-textarea h-40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", children: "Modified" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: text2,
              onChange: (e) => setText2(e.target.value),
              placeholder: "Paste modified text here...",
              className: "tool-textarea h-40"
            }
          )
        ] })
      ] }),
      (text1 || text2) && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", children: [
            "+",
            stats.added,
            " added"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300", children: [
            "-",
            stats.removed,
            " removed"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300", children: [
            "~",
            stats.modified,
            " modified"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-h-64 overflow-auto rounded-xl border-2 border-slate-200 dark:border-slate-700", children: viewMode === "split" ? /* @__PURE__ */ jsx("table", { className: "w-full text-sm font-mono", children: /* @__PURE__ */ jsx("tbody", { children: diff.map((d, i) => /* @__PURE__ */ jsxs("tr", { className: getLineStyle(d.type), children: [
          /* @__PURE__ */ jsx("td", { className: "px-2 py-0.5 text-slate-400 text-right w-8 border-r border-slate-300 dark:border-slate-600", children: d.lineNum1 || "" }),
          /* @__PURE__ */ jsx("td", { className: "px-2 py-0.5 whitespace-pre-wrap break-all w-1/2 border-r border-slate-300 dark:border-slate-600", children: d.line1 }),
          /* @__PURE__ */ jsx("td", { className: "px-2 py-0.5 text-slate-400 text-right w-8 border-r border-slate-300 dark:border-slate-600", children: d.lineNum2 || "" }),
          /* @__PURE__ */ jsx("td", { className: "px-2 py-0.5 whitespace-pre-wrap break-all", children: d.line2 })
        ] }, i)) }) }) : /* @__PURE__ */ jsx("div", { className: "font-mono text-sm", children: diff.map((d, i) => /* @__PURE__ */ jsxs("div", { className: `px-3 py-0.5 ${getLineStyle(d.type)}`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 mr-2", children: d.type === "added" ? "+" : d.type === "removed" ? "-" : d.type === "modified" ? "~" : " " }),
          d.type === "removed" ? d.line1 : d.line2
        ] }, i)) }) })
      ] })
    ] })
  ] });
}

function JsonToTypescript() {
  const [json, setJson] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const sampleJson = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin", "user"],
  "profile": {
    "age": 30,
    "city": "New York"
  },
  "tags": [
    { "id": 1, "name": "developer" }
  ]
}`;
  const getType = (value) => {
    if (value === null) return "null";
    if (Array.isArray(value)) {
      if (value.length === 0) return "unknown[]";
      const itemType = getType(value[0]);
      return `${itemType}[]`;
    }
    return typeof value;
  };
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const generateInterface = useCallback((obj, name, interfaces) => {
    const lines = [];
    lines.push(`interface ${name} {`);
    for (const [key, value] of Object.entries(obj)) {
      let type;
      if (value === null) {
        type = "null";
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
          const nestedName = capitalize(key.replace(/s$/, ""));
          generateInterface(value[0], nestedName, interfaces);
          type = `${nestedName}[]`;
        } else if (value.length > 0) {
          type = `${getType(value[0])}[]`;
        } else {
          type = "unknown[]";
        }
      } else if (typeof value === "object") {
        const nestedName = capitalize(key);
        generateInterface(value, nestedName, interfaces);
        type = nestedName;
      } else {
        type = typeof value;
      }
      lines.push(`  ${key}: ${type};`);
    }
    lines.push("}");
    const content = lines.join("\n");
    if (!interfaces.some((i) => i.name === name)) {
      interfaces.push({ name, content });
    }
    return content;
  }, []);
  const convert = useCallback(() => {
    try {
      const parsed = JSON.parse(json);
      const interfaces = [];
      if (typeof parsed === "object" && parsed !== null) {
        if (Array.isArray(parsed)) {
          if (parsed.length > 0 && typeof parsed[0] === "object") {
            generateInterface(parsed[0], rootName, interfaces);
            setOutput(`// Array of ${rootName}
type ${rootName}List = ${rootName}[];

${interfaces.map((i) => i.content).reverse().join("\n\n")}`);
          } else {
            setOutput(`type ${rootName} = ${getType(parsed)};`);
          }
        } else {
          generateInterface(parsed, rootName, interfaces);
          setOutput(interfaces.map((i) => i.content).reverse().join("\n\n"));
        }
      } else {
        setOutput(`type ${rootName} = ${typeof parsed};`);
      }
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }, [json, rootName, generateInterface]);
  const copyOutput = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  }, [output]);
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🔷" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "JSON to TypeScript" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Generate TypeScript interfaces from JSON" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-end", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", children: "Root Interface Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: rootName,
              onChange: (e) => setRootName(e.target.value || "Root"),
              className: "tool-input",
              placeholder: "Root"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setJson(sampleJson),
            className: "text-xs text-accent-500 hover:text-accent-600 transition-colors mb-3",
            children: "Load sample"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", children: "JSON Input" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: json,
            onChange: (e) => setJson(e.target.value),
            placeholder: '{"key": "value"}',
            className: "tool-textarea h-40"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: convert, className: "tool-btn-primary w-full", children: [
        /* @__PURE__ */ jsx("span", { className: "mr-2", children: "⚡" }),
        "Generate TypeScript"
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "❌" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Invalid JSON:" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-xs", children: error })
      ] }),
      output && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "TypeScript Output" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copyOutput,
              className: `text-xs px-3 py-1 rounded-lg transition-all ${copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`,
              children: copied ? "✓ Copied!" : "📋 Copy"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "code-block overflow-auto max-h-64 text-sm", children: output })
      ] })
    ] })
  ] });
}

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$5 = {
  __name: 'JwtDecoder',
  setup(__props, { expose: __expose }) {
  __expose();

const token = ref('');
const error = ref('');

const decoded = computed(() => {
  if (!token.value.trim()) return null;
  
  try {
    const parts = token.value.trim().split('.');
    if (parts.length !== 3) {
      error.value = 'Invalid JWT format: expected 3 parts separated by dots';
      return null;
    }
    
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const signature = parts[2];
    
    error.value = '';
    return { header, payload, signature };
  } catch (e) {
    error.value = 'Failed to decode JWT: ' + e.message;
    return null;
  }
});

const isExpired = computed(() => {
  if (!decoded.value?.payload?.exp) return false;
  return decoded.value.payload.exp * 1000 < Date.now();
});

const expiresIn = computed(() => {
  if (!decoded.value?.payload?.exp) return null;
  const diff = decoded.value.payload.exp * 1000 - Date.now();
  if (diff < 0) return null;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h left`;
  if (hours > 0) return `${hours}h left`;
  return `${Math.floor(diff / (1000 * 60))}m left`;
});

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString();
};

const __returned__ = { token, error, decoded, isExpired, expiresIn, formatDate, ref, computed, watch };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))
  }><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg"><span class="text-2xl">🎫</span></div><div><h3 class="text-xl font-bold text-slate-800 dark:text-white">JWT Decoder</h3><p class="text-sm text-slate-500 dark:text-slate-400">Decode &amp; inspect JWT tokens</p></div></div><div class="space-y-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> JWT Token </label><textarea placeholder="Paste your JWT token here..." class="tool-textarea h-24">${
    ssrInterpolate($setup.token)
  }</textarea></div>`);
  if ($setup.error) {
    _push(`<div class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in"><span class="mr-2">❌</span>${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.decoded && !$setup.error) {
    _push(`<div class="space-y-4 animate-fade-in"><div><div class="flex items-center justify-between mb-2"><span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500"></span> Header </span><span class="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">${
      ssrInterpolate($setup.decoded.header?.alg || 'N/A')
    }</span></div><pre class="code-block text-xs overflow-auto">${
      ssrInterpolate(JSON.stringify($setup.decoded.header, null, 2))
    }</pre></div><div><div class="flex items-center justify-between mb-2"><span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-purple-500"></span> Payload </span><div class="flex items-center gap-2">`);
    if ($setup.isExpired) {
      _push(`<span class="text-xs px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"> Expired </span>`);
    } else if ($setup.expiresIn) {
      _push(`<span class="text-xs px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">${ssrInterpolate($setup.expiresIn)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div><pre class="code-block text-xs overflow-auto max-h-48">${ssrInterpolate(JSON.stringify($setup.decoded.payload, null, 2))}</pre></div><div class="grid grid-cols-2 gap-3 text-xs">`);
    if ($setup.decoded.payload?.iat) {
      _push(`<div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-slate-500 dark:text-slate-400">Issued At</span><p class="font-medium text-slate-700 dark:text-slate-300 mt-1">${ssrInterpolate($setup.formatDate($setup.decoded.payload.iat))}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.decoded.payload?.exp) {
      _push(`<div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-slate-500 dark:text-slate-400">Expires</span><p class="font-medium text-slate-700 dark:text-slate-300 mt-1">${ssrInterpolate($setup.formatDate($setup.decoded.payload.exp))}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div><span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2"><span class="w-3 h-3 rounded-full bg-cyan-500"></span> Signature </span><div class="result-display text-xs truncate">${ssrInterpolate($setup.decoded.signature)}</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$setup.token) {
    _push(`<div class="text-center py-8 text-slate-400 dark:text-slate-500"><div class="text-4xl mb-2">🎫</div><p class="text-sm">Paste a JWT token to decode it</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/JwtDecoder.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined
};
const JwtDecoder = /*#__PURE__*/_export_sfc(_sfc_main$5, [['ssrRender',_sfc_ssrRender$5]]);

const _sfc_main$4 = {
  __name: 'TimestampConverter',
  setup(__props, { expose: __expose }) {
  __expose();

const mode = ref('toDate');
const timestamp = ref('');
const timestampUnit = ref('s');
const dateInput = ref('');
const timeInput = ref('00:00');
const currentTimestamp = ref(Math.floor(Date.now() / 1000));

let interval;

onMounted(() => {
  interval = setInterval(() => {
    currentTimestamp.value = Math.floor(Date.now() / 1000);
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const useCurrentTime = () => {
  timestamp.value = currentTimestamp.value.toString();
};

const convertedDate = computed(() => {
  if (!timestamp.value) return null;
  
  try {
    const ts = parseInt(timestamp.value);
    const ms = timestampUnit.value === 'ms' ? ts : ts * 1000;
    const date = new Date(ms);
    
    if (isNaN(date.getTime())) return null;
    
    const now = Date.now();
    const diff = ms - now;
    const absDiff = Math.abs(diff);
    
    let relative;
    if (absDiff < 60000) relative = 'Just now';
    else if (absDiff < 3600000) relative = `${Math.round(absDiff / 60000)} minutes ${diff > 0 ? 'from now' : 'ago'}`;
    else if (absDiff < 86400000) relative = `${Math.round(absDiff / 3600000)} hours ${diff > 0 ? 'from now' : 'ago'}`;
    else relative = `${Math.round(absDiff / 86400000)} days ${diff > 0 ? 'from now' : 'ago'}`;
    
    return {
      local: date.toLocaleString(),
      iso: date.toISOString(),
      relative
    };
  } catch {
    return null;
  }
});

const convertedTimestamp = computed(() => {
  if (!dateInput.value) return null;
  
  try {
    const [year, month, day] = dateInput.value.split('-').map(Number);
    const [hours, minutes] = timeInput.value.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    
    const seconds = Math.floor(date.getTime() / 1000);
    
    return {
      seconds,
      milliseconds: seconds * 1000
    };
  } catch {
    return null;
  }
});

const copyTimestamp = async (value) => {
  await navigator.clipboard.writeText(value.toString());
};

const __returned__ = { mode, timestamp, timestampUnit, dateInput, timeInput, currentTimestamp, get interval() { return interval }, set interval(v) { interval = v; }, useCurrentTime, convertedDate, convertedTimestamp, copyTimestamp, ref, computed, onMounted, onUnmounted };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))
  }><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg"><span class="text-2xl">⏰</span></div><div><h3 class="text-xl font-bold text-slate-800 dark:text-white">Timestamp Converter</h3><p class="text-sm text-slate-500 dark:text-slate-400">Convert between Unix timestamps and dates</p></div></div><div class="space-y-4"><div class="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20"><div class="flex items-center justify-between"><span class="text-sm text-slate-600 dark:text-slate-400">Current Unix Time</span><button class="text-xs px-2 py-1 rounded-lg bg-white/50 dark:bg-slate-700/50 text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"> Use Now </button></div><p class="text-2xl font-bold font-mono text-slate-800 dark:text-white mt-1">${
    ssrInterpolate($setup.currentTimestamp)
  }</p></div><div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl"><button class="${
    ssrRenderClass(['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all', 
            $setup.mode === 'toDate' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'])
  }"><span class="mr-2">📅</span>Timestamp → Date </button><button class="${
    ssrRenderClass(['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            $setup.mode === 'toTimestamp' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'])
  }"><span class="mr-2">🔢</span>Date → Timestamp </button></div>`);
  if ($setup.mode === 'toDate') {
    _push(`<div class="space-y-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Unix Timestamp </label><div class="flex gap-2"><input${
      ssrRenderAttr("value", $setup.timestamp)
    } type="number" placeholder="1702915200" class="tool-input font-mono"><select class="tool-input w-32"><option value="s"${
      (ssrIncludeBooleanAttr((Array.isArray($setup.timestampUnit))
        ? ssrLooseContain($setup.timestampUnit, "s")
        : ssrLooseEqual($setup.timestampUnit, "s"))) ? " selected" : ""
    }>Seconds</option><option value="ms"${
      (ssrIncludeBooleanAttr((Array.isArray($setup.timestampUnit))
        ? ssrLooseContain($setup.timestampUnit, "ms")
        : ssrLooseEqual($setup.timestampUnit, "ms"))) ? " selected" : ""
    }>Milliseconds</option></select></div></div>`);
    if ($setup.convertedDate) {
      _push(`<div class="space-y-3 animate-fade-in"><div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Local Time</span><p class="font-medium text-slate-800 dark:text-white">${
        ssrInterpolate($setup.convertedDate.local)
      }</p></div><div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">UTC / ISO 8601</span><p class="font-mono text-sm text-slate-800 dark:text-white">${
        ssrInterpolate($setup.convertedDate.iso)
      }</p></div><div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Relative</span><p class="font-medium text-slate-800 dark:text-white">${
        ssrInterpolate($setup.convertedDate.relative)
      }</p></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.mode === 'toTimestamp') {
    _push(`<div class="space-y-4"><div class="grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date</label><input${
      ssrRenderAttr("value", $setup.dateInput)
    } type="date" class="tool-input"></div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time</label><input${
      ssrRenderAttr("value", $setup.timeInput)
    } type="time" class="tool-input"></div></div>`);
    if ($setup.convertedTimestamp) {
      _push(`<div class="space-y-3 animate-fade-in"><div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><div class="flex items-center justify-between"><span class="text-xs text-slate-500 dark:text-slate-400">Unix Timestamp (seconds)</span><button class="text-xs px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"> 📋 Copy </button></div><p class="font-mono text-lg font-bold text-slate-800 dark:text-white mt-1">${
        ssrInterpolate($setup.convertedTimestamp.seconds)
      }</p></div><div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><div class="flex items-center justify-between"><span class="text-xs text-slate-500 dark:text-slate-400">Unix Timestamp (milliseconds)</span><button class="text-xs px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"> 📋 Copy </button></div><p class="font-mono text-lg font-bold text-slate-800 dark:text-white mt-1">${
        ssrInterpolate($setup.convertedTimestamp.milliseconds)
      }</p></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/TimestampConverter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};
const TimestampConverter = /*#__PURE__*/_export_sfc(_sfc_main$4, [['ssrRender',_sfc_ssrRender$4]]);

const _sfc_main$3 = {
  __name: 'UrlCodec',
  setup(__props, { expose: __expose }) {
  __expose();

const mode = ref('encode');
const input = ref('');
const copied = ref(false);
const error = ref('');

const placeholders = {
  encode: 'Hello World! Special chars: @#$%^&*()',
  decode: 'Hello%20World%21%20Special%20chars%3A%20%40%23%24%25%5E%26%2A%28%29',
  parse: 'https://example.com/path?name=John&age=30#section'
};

const output = computed(() => {
  if (!input.value.trim()) return '';
  error.value = '';
  
  try {
    if (mode.value === 'encode') {
      return encodeURIComponent(input.value);
    } else if (mode.value === 'decode') {
      return decodeURIComponent(input.value);
    }
  } catch (e) {
    error.value = `Failed to ${mode.value}: ${e.message}`;
  }
  return '';
});

const parsed = computed(() => {
  if (mode.value !== 'parse' || !input.value.trim()) return null;
  
  try {
    const url = new URL(input.value);
    error.value = '';
    return {
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin
    };
  } catch (e) {
    error.value = 'Invalid URL format';
    return null;
  }
});

const parsedParams = computed(() => {
  if (!parsed.value || !input.value) return [];
  try {
    const url = new URL(input.value);
    return Array.from(url.searchParams.entries());
  } catch {
    return [];
  }
});

const copyOutput = async () => {
  if (output.value) {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  }
};

watch(mode, () => {
  error.value = '';
});

const __returned__ = { mode, input, copied, error, placeholders, output, parsed, parsedParams, copyOutput, ref, computed, watch };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))
  }><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-lg"><span class="text-2xl">🔗</span></div><div><h3 class="text-xl font-bold text-slate-800 dark:text-white">URL Codec</h3><p class="text-sm text-slate-500 dark:text-slate-400">Encode, decode &amp; parse URLs</p></div></div><div class="space-y-4"><div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl"><button class="${
    ssrRenderClass(['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            $setup.mode === 'encode' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400'])
  }"><span class="mr-2">📤</span>Encode </button><button class="${
    ssrRenderClass(['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            $setup.mode === 'decode' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400'])
  }"><span class="mr-2">📥</span>Decode </button><button class="${
    ssrRenderClass(['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
            $setup.mode === 'parse' 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-accent-600 dark:text-accent-400' 
              : 'text-slate-600 dark:text-slate-400'])
  }"><span class="mr-2">🔍</span>Parse </button></div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">${
    ssrInterpolate($setup.mode === 'encode' ? 'Plain Text / URL' : $setup.mode === 'decode' ? 'Encoded URL' : 'Full URL')
  }</label><textarea${
    ssrRenderAttr("placeholder", $setup.placeholders[$setup.mode])
  } class="tool-textarea h-24">${
    ssrInterpolate($setup.input)
  }</textarea></div>`);
  if (($setup.mode === 'encode' || $setup.mode === 'decode') && $setup.output) {
    _push(`<div class="animate-fade-in"><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">Result</label><button class="${
      ssrRenderClass(['text-xs px-3 py-1 rounded-lg transition-all',
              $setup.copied 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'])
    }">${
      ssrInterpolate($setup.copied ? '✓ Copied!' : '📋 Copy')
    }</button></div><div class="result-display">${
      ssrInterpolate($setup.output)
    }</div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.mode === 'parse' && $setup.parsed) {
    _push(`<div class="space-y-3 animate-fade-in"><!--[-->`);
    ssrRenderList($setup.parsed, (value, key) => {
      _push(`<div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">${
        ssrInterpolate(key)
      }</span><p class="font-mono text-sm text-slate-800 dark:text-white mt-1 break-all">${
        ssrInterpolate(value || '—')
      }</p></div>`);
    });
    _push(`<!--]-->`);
    if ($setup.parsedParams.length > 0) {
      _push(`<div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Query Parameters</span><div class="mt-2 space-y-2"><!--[-->`);
      ssrRenderList($setup.parsedParams, ([key, val]) => {
        _push(`<div class="flex items-center gap-2 text-sm"><span class="font-medium text-accent-600 dark:text-accent-400">${
          ssrInterpolate(key)
        }</span><span class="text-slate-400">=</span><span class="font-mono text-slate-700 dark:text-slate-300 break-all">${
          ssrInterpolate(val)
        }</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.error) {
    _push(`<div class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in"><span class="mr-2">❌</span>${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/UrlCodec.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const UrlCodec = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3]]);

const sampleCss = `.container{display:flex;flex-direction:column;gap:1rem;padding:20px}.header{background-color:#333;color:white;padding:10px 20px}.button{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border:none;border-radius:8px;padding:12px 24px;cursor:pointer}.button:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.15)}`;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CssFormatter",
  setup(__props, { expose: __expose }) {
    __expose();
    const input = ref("");
    const output = ref("");
    const error = ref("");
    const copied = ref(false);
    const originalSize = computed(() => input.value.length);
    const newSize = computed(() => output.value.length);
    const compressionRatio = computed(() => {
      if (!originalSize.value) return "0%";
      const ratio = (originalSize.value - newSize.value) / originalSize.value * 100;
      return ratio > 0 ? `-${ratio.toFixed(1)}%` : `+${Math.abs(ratio).toFixed(1)}%`;
    });
    function beautify() {
      try {
        let css = input.value.trim();
        css = css.replace(/\{/g, " {\n  ");
        css = css.replace(/;/g, ";\n  ");
        css = css.replace(/\}/g, "\n}\n\n");
        css = css.replace(/\n\s+\n/g, "\n");
        css = css.replace(/\n\n+/g, "\n\n");
        css = css.replace(/\s+\{/g, " {");
        css = css.replace(/:\s*/g, ": ");
        css = css.replace(/  +/g, "  ");
        const lines = css.split("\n");
        const formatted = [];
        let indent = 0;
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed.endsWith("}")) {
            indent = Math.max(0, indent - 1);
          }
          formatted.push("  ".repeat(indent) + trimmed);
          if (trimmed.endsWith("{")) {
            indent++;
          }
        }
        output.value = formatted.join("\n").trim();
        error.value = "";
      } catch (e) {
        error.value = e.message;
        output.value = "";
      }
    }
    function minify() {
      try {
        let css = input.value.trim();
        css = css.replace(/\/\*[\s\S]*?\*\//g, "");
        css = css.replace(/\s+/g, " ");
        css = css.replace(/\s*{\s*/g, "{");
        css = css.replace(/\s*}\s*/g, "}");
        css = css.replace(/\s*;\s*/g, ";");
        css = css.replace(/\s*:\s*/g, ":");
        css = css.replace(/\s*,\s*/g, ",");
        css = css.replace(/;}/g, "}");
        output.value = css.trim();
        error.value = "";
      } catch (e) {
        error.value = e.message;
        output.value = "";
      }
    }
    function loadSample() {
      input.value = sampleCss;
    }
    function clear() {
      input.value = "";
      output.value = "";
      error.value = "";
    }
    async function copyOutput() {
      if (output.value) {
        await navigator.clipboard.writeText(output.value);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      }
    }
    const __returned__ = { input, output, error, copied, sampleCss, originalSize, newSize, compressionRatio, beautify, minify, loadSample, clear, copyOutput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))}><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg"><span class="text-2xl">\u{1F3A8}</span></div><div><h3 class="text-xl font-bold text-slate-800 dark:text-white">CSS Formatter</h3><p class="text-sm text-slate-500 dark:text-slate-400">Beautify &amp; minify CSS code</p></div></div><div class="space-y-4"><div><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">Input CSS</label><button class="text-xs text-accent-500 hover:text-accent-600 transition-colors"> Load sample </button></div><textarea placeholder=".selector { property: value; }" class="tool-textarea h-32">${ssrInterpolate($setup.input)}</textarea></div><div class="flex flex-wrap gap-2"><button class="tool-btn-primary flex-1"><span class="mr-2">\u2728</span>Beautify </button><button class="tool-btn-secondary flex-1"><span class="mr-2">\u{1F4E6}</span>Minify </button><button class="tool-btn-secondary"><span class="mr-2">\u{1F5D1}\uFE0F</span>Clear </button></div>`);
  if ($setup.error) {
    _push(`<div class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in"><div class="flex items-center gap-2"><span>\u274C</span><span class="font-medium">Error:</span></div><p class="mt-1 font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.output) {
    _push(`<div class="animate-fade-in"><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label><div class="flex gap-2 items-center"><span class="text-xs text-slate-500">${ssrInterpolate($setup.originalSize)}B \u2192 ${ssrInterpolate($setup.newSize)}B (${ssrInterpolate($setup.compressionRatio)}) </span><button class="${ssrRenderClass([
      "text-xs px-3 py-1 rounded-lg transition-all",
      $setup.copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
    ])}">${ssrInterpolate($setup.copied ? "\u2713 Copied!" : "\u{1F4CB} Copy")}</button></div></div><pre class="code-block overflow-auto max-h-48">${ssrInterpolate($setup.output)}</pre></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/CssFormatter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CssFormatter = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HtmlEntityEncoder",
  setup(__props, { expose: __expose }) {
    __expose();
    const input = ref("");
    const output = ref("");
    const copied = ref(false);
    const samples = [
      { label: "HTML", value: '<div class="container">Hello & Welcome!</div>' },
      { label: "Symbols", value: "\xA9 2024 DevTools\u2122 \u2014 Pro Edition \u2022 \u20AC99" },
      { label: "Encoded", value: "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;" }
    ];
    const commonEntities = [
      { char: "<", encoded: "&lt;" },
      { char: ">", encoded: "&gt;" },
      { char: "&", encoded: "&amp;" },
      { char: '"', encoded: "&quot;" },
      { char: "'", encoded: "&#39;" },
      { char: "\xA9", encoded: "&copy;" },
      { char: "\xAE", encoded: "&reg;" },
      { char: "\u2122", encoded: "&trade;" }
    ];
    const entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;",
      "\xA9": "&copy;",
      "\xAE": "&reg;",
      "\u2122": "&trade;",
      "\u20AC": "&euro;",
      "\xA3": "&pound;",
      "\xA5": "&yen;",
      "\u2022": "&bull;",
      "\u2014": "&mdash;",
      "\u2013": "&ndash;",
      "\u2026": "&hellip;",
      " ": "&nbsp;"
    };
    const reverseEntityMap = Object.fromEntries(
      Object.entries(entityMap).map(([k, v]) => [v, k])
    );
    function encode() {
      let result = input.value;
      for (const [char, entity] of Object.entries(entityMap)) {
        if (char !== " ") {
          result = result.split(char).join(entity);
        }
      }
      result = result.replace(/[^\x00-\x7F]/g, (char) => {
        return `&#${char.charCodeAt(0)};`;
      });
      output.value = result;
    }
    function decode() {
      let result = input.value;
      for (const [entity, char] of Object.entries(reverseEntityMap)) {
        result = result.split(entity).join(char);
      }
      result = result.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
      result = result.replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      output.value = result;
    }
    function clear() {
      input.value = "";
      output.value = "";
    }
    async function copyOutput() {
      if (output.value) {
        await navigator.clipboard.writeText(output.value);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      }
    }
    async function copyEntity(entity) {
      await navigator.clipboard.writeText(entity);
    }
    const __returned__ = { input, output, copied, samples, commonEntities, entityMap, reverseEntityMap, encode, decode, clear, copyOutput, copyEntity };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))}><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg"><span class="text-2xl">\u{1F524}</span></div><div><h3 class="text-xl font-bold text-slate-800 dark:text-white">HTML Entity Encoder</h3><p class="text-sm text-slate-500 dark:text-slate-400">Encode &amp; decode HTML entities</p></div></div><div class="space-y-4"><div><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">Input</label><div class="flex gap-1"><!--[-->`);
  ssrRenderList($setup.samples, (sample) => {
    _push(`<button class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">${ssrInterpolate(sample.label)}</button>`);
  });
  _push(`<!--]--></div></div><textarea placeholder="Enter text with special characters or HTML entities..." class="tool-textarea h-24">${ssrInterpolate($setup.input)}</textarea></div><div class="flex flex-wrap gap-2"><button class="tool-btn-primary flex-1"><span class="mr-2">\u{1F512}</span>Encode </button><button class="tool-btn-secondary flex-1"><span class="mr-2">\u{1F513}</span>Decode </button><button class="tool-btn-secondary"><span class="mr-2">\u{1F5D1}\uFE0F</span>Clear </button></div>`);
  if ($setup.output) {
    _push(`<div class="animate-fade-in"><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">Output</label><button class="${ssrRenderClass([
      "text-xs px-3 py-1 rounded-lg transition-all",
      $setup.copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
    ])}">${ssrInterpolate($setup.copied ? "\u2713 Copied!" : "\u{1F4CB} Copy")}</button></div><pre class="code-block overflow-auto max-h-32 whitespace-pre-wrap break-all">${ssrInterpolate($setup.output)}</pre></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"><h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Common Entities</h4><div class="grid grid-cols-4 gap-2 text-xs font-mono"><!--[-->`);
  ssrRenderList($setup.commonEntities, (entity) => {
    _push(`<div class="flex items-center justify-between p-2 rounded bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><span class="text-lg">${ssrInterpolate(entity.char)}</span><span class="text-slate-500 dark:text-slate-400">${ssrInterpolate(entity.encoded)}</span></div>`);
  });
  _push(`<!--]--></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/HtmlEntityEncoder.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HtmlEntityEncoder = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const sampleSql = `SELECT u.id, u.name, u.email, COUNT(o.id) as order_count, SUM(o.total) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2024-01-01' AND u.status = 'active' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 0 ORDER BY total_spent DESC LIMIT 10`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SqlFormatter",
  setup(__props, { expose: __expose }) {
    __expose();
    const input = ref("");
    const output = ref("");
    const copied = ref(false);
    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "OR",
      "NOT",
      "IN",
      "LIKE",
      "BETWEEN",
      "JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "OUTER JOIN",
      "FULL JOIN",
      "ON",
      "AS",
      "GROUP BY",
      "ORDER BY",
      "HAVING",
      "LIMIT",
      "OFFSET",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM",
      "CREATE TABLE",
      "ALTER TABLE",
      "DROP TABLE",
      "CREATE INDEX",
      "UNION",
      "UNION ALL",
      "EXCEPT",
      "INTERSECT",
      "CASE",
      "WHEN",
      "THEN",
      "ELSE",
      "END",
      "NULL",
      "IS NULL",
      "IS NOT NULL",
      "ASC",
      "DESC",
      "DISTINCT",
      "ALL",
      "EXISTS",
      "COUNT",
      "SUM",
      "AVG",
      "MIN",
      "MAX"
    ];
    const newlineKeywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "OUTER JOIN",
      "FULL JOIN",
      "JOIN",
      "LIMIT",
      "OFFSET",
      "UNION",
      "UNION ALL",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM"
    ];
    function format() {
      let sql = input.value.trim();
      sql = sql.replace(/\s+/g, " ");
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        sql = sql.replace(regex, keyword);
      }
      for (const keyword of newlineKeywords) {
        const regex = new RegExp(`\\s+${keyword}\\b`, "g");
        sql = sql.replace(regex, `
${keyword}`);
      }
      const lines = sql.split("\n");
      const formatted = [];
      let indent = 0;
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith("FROM") || line.startsWith("WHERE") || line.startsWith("GROUP BY") || line.startsWith("ORDER BY") || line.startsWith("HAVING") || line.startsWith("LIMIT")) {
          indent = 0;
        }
        if (line.startsWith("AND") || line.startsWith("OR")) {
          indent = 1;
        }
        formatted.push("  ".repeat(indent) + line);
        if (line.startsWith("SELECT")) {
          indent = 1;
        }
      }
      output.value = formatted.join("\n");
    }
    function minify() {
      let sql = input.value.trim();
      sql = sql.replace(/\s+/g, " ");
      sql = sql.replace(/\s*,\s*/g, ",");
      sql = sql.replace(/\s*\(\s*/g, "(");
      sql = sql.replace(/\s*\)\s*/g, ")");
      output.value = sql.trim();
    }
    function uppercase() {
      let sql = input.value.trim();
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        sql = sql.replace(regex, keyword);
      }
      output.value = sql;
    }
    function loadSample() {
      input.value = sampleSql;
    }
    function clear() {
      input.value = "";
      output.value = "";
    }
    async function copyOutput() {
      if (output.value) {
        await navigator.clipboard.writeText(output.value);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      }
    }
    const __returned__ = { input, output, copied, sampleSql, keywords, newlineKeywords, format, minify, uppercase, loadSample, clear, copyOutput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))}><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg"><span class="text-2xl">\u{1F5C3}\uFE0F</span></div><div><h3 class="text-xl font-bold text-slate-800 dark:text-white">SQL Formatter</h3><p class="text-sm text-slate-500 dark:text-slate-400">Format &amp; beautify SQL queries</p></div></div><div class="space-y-4"><div><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">SQL Query</label><button class="text-xs text-accent-500 hover:text-accent-600 transition-colors"> Load sample </button></div><textarea placeholder="SELECT * FROM users WHERE id = 1" class="tool-textarea h-32">${ssrInterpolate($setup.input)}</textarea></div><div class="flex flex-wrap gap-2"><button class="tool-btn-primary flex-1"><span class="mr-2">\u2728</span>Format </button><button class="tool-btn-secondary flex-1"><span class="mr-2">\u{1F4E6}</span>Minify </button><button class="tool-btn-secondary"><span class="mr-2">\u{1F520}</span>UPPERCASE </button><button class="tool-btn-secondary"><span class="mr-2">\u{1F5D1}\uFE0F</span>Clear </button></div>`);
  if ($setup.output) {
    _push(`<div class="animate-fade-in"><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300">Formatted SQL</label><button class="${ssrRenderClass([
      "text-xs px-3 py-1 rounded-lg transition-all",
      $setup.copied ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
    ])}">${ssrInterpolate($setup.copied ? "\u2713 Copied!" : "\u{1F4CB} Copy")}</button></div><pre class="code-block overflow-auto max-h-64 text-sm">${ssrInterpolate($setup.output)}</pre></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/SqlFormatter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SqlFormatter = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

/** @returns {void} */

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 * @param {unknown} value
 * @returns {string}
 */
function escape$1(value, is_attr = false) {
	const str = String(value);
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}

/** @returns {string} */
function each(items, fn) {
	items = ensure_array_like(items);
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(items[i], i);
	}
	return str;
}

let on_destroy;

/** @returns {{ render: (props?: {}, { $$slots, context }?: { $$slots?: {}; context?: Map<any, any>; }) => { html: any; css: { code: string; map: any; }; head: string; }; $$render: (result: any, props: any, bindings: any, slots: any, context: any) => any; }} */
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(context || (parent_component ? parent_component.$$.context : [])),
			// these will be immediately discarded
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object()
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css) => css.code)
						.join('\n'),
					map: null // TODO
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}

/** @returns {string} */
function add_attribute(name, value, boolean) {
	if (value == null || (boolean && !value)) return '';
	const assignment = boolean && value === true ? '' : `="${escape$1(value, true)}"`;
	return ` ${name}${assignment}`;
}

/* src/components/svelte/ColorConverter.svelte generated by Svelte v4.2.19 */

const ColorConverter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let hex = '#a855f7';
	let rgb = { r: 168, g: 85, b: 247 };
	let hsl = { h: 271, s: 91, l: 65 };

	return `<div class="tool-card"><div class="flex items-center gap-3 mb-6" data-svelte-h="svelte-idkw7j"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg"><span class="text-2xl">🎨</span></div> <div><h3 class="text-xl font-bold text-slate-800 dark:text-white">Color Converter</h3> <p class="text-sm text-slate-500 dark:text-slate-400">Convert between HEX, RGB &amp; HSL</p></div></div> <div class="space-y-4"> <div class="flex gap-4 items-center"><div class="w-20 h-20 rounded-2xl shadow-lg border-4 border-white dark:border-slate-700 transition-colors" style="${"background-color: " + escape$1(hex, true)}"></div> <div class="flex-1"><input type="color"${add_attribute("value", hex, 0)} class="w-full h-12 rounded-xl cursor-pointer"></div></div>  <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group"><div class="flex items-center justify-between mb-2"><span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-svelte-h="svelte-45h90y">HEX</span> <button class="${"text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 " + escape$1(
		'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
		true
	)}">${escape$1('📋')}</button></div> <input type="text" class="w-full bg-transparent font-mono text-lg text-slate-800 dark:text-white focus:outline-none" maxlength="7"${add_attribute("value", hex, 0)}></div>  <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group"><div class="flex items-center justify-between mb-3"><span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-svelte-h="svelte-144zz28">RGB</span> <button class="${"text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 " + escape$1(
		'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
		true
	)}">${escape$1('📋')}</button></div> <div class="grid grid-cols-3 gap-3"><div><label class="text-xs text-red-500 font-medium" data-svelte-h="svelte-140k9oa">R</label> <input type="number" min="0" max="255" class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"${add_attribute("value", rgb.r, 0)}></div> <div><label class="text-xs text-green-500 font-medium" data-svelte-h="svelte-yzpz5r">G</label> <input type="number" min="0" max="255" class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"${add_attribute("value", rgb.g, 0)}></div> <div><label class="text-xs text-blue-500 font-medium" data-svelte-h="svelte-1lt0yef">B</label> <input type="number" min="0" max="255" class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"${add_attribute("value", rgb.b, 0)}></div></div></div>  <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group"><div class="flex items-center justify-between mb-3"><span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-svelte-h="svelte-2oe8ks">HSL</span> <button class="${"text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 " + escape$1(
		'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
		true
	)}">${escape$1('📋')}</button></div> <div class="grid grid-cols-3 gap-3"><div><label class="text-xs text-slate-500 dark:text-slate-400 font-medium" data-svelte-h="svelte-x6dba">H°</label> <input type="number" min="0" max="360" class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"${add_attribute("value", hsl.h, 0)}></div> <div><label class="text-xs text-slate-500 dark:text-slate-400 font-medium" data-svelte-h="svelte-1amc6ge">S%</label> <input type="number" min="0" max="100" class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"${add_attribute("value", hsl.s, 0)}></div> <div><label class="text-xs text-slate-500 dark:text-slate-400 font-medium" data-svelte-h="svelte-619nl1">L%</label> <input type="number" min="0" max="100" class="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-center font-mono text-slate-800 dark:text-white focus:outline-none focus:border-accent-500"${add_attribute("value", hsl.l, 0)}></div></div></div></div></div>`;
});

/* src/components/svelte/CronParser.svelte generated by Svelte v4.2.19 */

const CronParser = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let expression = "";
	let nextRuns = [];

	const presets = [
		{
			label: "Every minute",
			value: "* * * * *"
		},
		{ label: "Every hour", value: "0 * * * *" },
		{
			label: "Daily at midnight",
			value: "0 0 * * *"
		},
		{
			label: "Weekly on Sunday",
			value: "0 0 * * 0"
		},
		{ label: "Monthly", value: "0 0 1 * *" },
		{
			label: "Every weekday 9am",
			value: "0 9 * * 1-5"
		}
	];

	return `<div class="tool-card"><div class="flex items-center gap-3 mb-6" data-svelte-h="svelte-w006q8"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-lg"><span class="text-2xl">⏰</span></div> <div><h3 class="text-xl font-bold text-slate-800 dark:text-white">Cron Expression Parser</h3> <p class="text-sm text-slate-500 dark:text-slate-400">Parse cron expressions to human-readable text</p></div></div> <div class="space-y-4"><div class="flex flex-wrap gap-2">${each(presets, preset => {
		return `<button class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">${escape$1(preset.label)} </button>`;
	})}</div> <div><label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block" data-svelte-h="svelte-1tkx4yl">Cron Expression</label> <div class="flex gap-2"><input type="text" placeholder="* * * * *" class="tool-input font-mono text-center text-lg tracking-widest"${add_attribute("value", expression, 0)}> <button class="${"tool-btn-secondary px-4 " + escape$1('', true)}">${escape$1("📋")}</button></div></div> <div class="grid grid-cols-5 gap-2 text-center text-xs text-slate-500 dark:text-slate-400" data-svelte-h="svelte-17x3gpn"><div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50"><div class="font-semibold">MIN</div> <div>0-59</div></div> <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50"><div class="font-semibold">HOUR</div> <div>0-23</div></div> <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50"><div class="font-semibold">DOM</div> <div>1-31</div></div> <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50"><div class="font-semibold">MON</div> <div>1-12</div></div> <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50"><div class="font-semibold">DOW</div> <div>0-6</div></div></div> ${``} ${``} ${nextRuns.length > 0
	? `<div><label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block" data-svelte-h="svelte-10vv1v3">Next 5 Runs</label> <div class="space-y-1">${each(nextRuns, (run, i) => {
			return `<div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 p-2 rounded bg-slate-50 dark:bg-slate-800/50"><span class="w-6 h-6 rounded-full bg-accent-500/20 text-accent-600 dark:text-accent-400 flex items-center justify-center text-xs font-bold">${escape$1(i + 1)}</span> <span class="font-mono">${escape$1(run)}</span> </div>`;
		})}</div></div>`
	: ``}</div></div>`;
});

export { $$Layout as $, AuthButton as A, Base64Tool as B, CssFormatter as C, DiffChecker as D, HtmlEntityEncoder as H, JsonFormatter as J, MarkdownPreview as M, RegexTester as R, SqlFormatter as S, TimestampConverter as T, UuidGenerator as U, $$Navigation as a, $$Sidebar as b, ColorConverter as c, UrlCodec as d, JsonToTypescript as e, JwtDecoder as f, getLangFromUrl as g, CronParser as h, create_ssr_component as i, escape$1 as j, each as k, add_attribute as l, useTranslations as u };
