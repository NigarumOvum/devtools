/* empty css                                           */
import { c as createComponent, r as renderTemplate, e as renderComponent, d as createAstro, m as maybeRenderHead } from '../chunks/astro/server_D3Nh1ros.mjs';
import 'kleur/colors';
import { i as create_ssr_component, j as escape, k as each, l as add_attribute, g as getLangFromUrl, $ as $$Layout, u as useTranslations, a as $$Navigation, b as $$Sidebar, J as JsonFormatter, B as Base64Tool, C as CssFormatter, S as SqlFormatter, U as UuidGenerator, c as ColorConverter, T as TimestampConverter, d as UrlCodec, H as HtmlEntityEncoder, e as JsonToTypescript, R as RegexTester, f as JwtDecoder, h as CronParser, M as MarkdownPreview, D as DiffChecker } from '../chunks/CronParser_DfQIURl4.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);
  const qrUrl = text ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=png&margin=10` : "";
  const downloadQr = useCallback(() => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrUrl]);
  const copyQrUrl = useCallback(async () => {
    if (!qrUrl) return;
    await navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, [qrUrl]);
  const presets = [
    { label: "URL", value: "https://example.com" },
    { label: "Email", value: "mailto:hello@example.com" },
    { label: "Phone", value: "tel:+1234567890" },
    { label: "WiFi", value: "WIFI:T:WPA;S:NetworkName;P:password123;;" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📱" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "QR Code Generator" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Generate QR codes from text or URLs" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Content" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: presets.map((preset) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setText(preset.value),
              className: "text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors",
              children: preset.label
            },
            preset.label
          )) })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: text,
            onChange: (e) => setText(e.target.value),
            placeholder: "Enter text, URL, email, phone number, or WiFi credentials...",
            className: "tool-textarea h-24"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Size:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: "128",
            max: "512",
            step: "64",
            value: size,
            onChange: (e) => setSize(parseInt(e.target.value)),
            className: "flex-1 accent-accent-500"
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-600 dark:text-slate-400 w-16", children: [
          size,
          "px"
        ] })
      ] }),
      text && /* @__PURE__ */ jsx("div", { className: "animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: qrUrl,
            alt: "Generated QR Code",
            className: "rounded-lg shadow-lg",
            style: { width: Math.min(size, 256), height: Math.min(size, 256) }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs("button", { onClick: downloadQr, className: "tool-btn-primary", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "⬇️" }),
            "Download PNG"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copyQrUrl,
              className: `tool-btn-secondary ${copied ? "bg-green-100 dark:bg-green-900/30" : ""}`,
              children: copied ? "✓ Copied!" : "🔗 Copy URL"
            }
          )
        ] })
      ] }) }),
      !text && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-slate-400", children: [
        /* @__PURE__ */ jsx("span", { className: "text-4xl mb-2 block", children: "📱" }),
        /* @__PURE__ */ jsx("p", { children: "Enter content above to generate a QR code" })
      ] })
    ] })
  ] });
}

/* src/components/svelte/HashGenerator.svelte generated by Svelte v4.2.19 */

async function hashText(algorithm, text) {
	const encoder = new TextEncoder();
	const data = encoder.encode(text);
	const hashBuffer = await crypto.subtle.digest(algorithm, data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const HashGenerator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let input = '';
	let results = {};
	let copied = '';
	const algorithms = ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-1'];

	async function generateHashes() {
		if (!input.trim()) {
			results = {};
			return;
		}
		const newResults = {};

		for (const algo of algorithms) {
			try {
				newResults[algo] = await hashText(algo, input);
			} catch(e) {
				newResults[algo] = 'Error: ' + e.message;
			}
		}

		results = newResults;
	}

	{
		{
			generateHashes();
		}
	}

	return `<div class="tool-card"><div class="flex items-center gap-3 mb-6" data-svelte-h="svelte-15n5et4"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg"><span class="text-2xl">🔒</span></div> <div><h3 class="text-xl font-bold text-slate-800 dark:text-white">Hash Generator</h3> <p class="text-sm text-slate-500 dark:text-slate-400">Generate SHA hashes from text</p></div></div> <div class="space-y-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" data-svelte-h="svelte-7xcj6g">Input Text</label> <textarea placeholder="Enter text to hash..." class="tool-textarea h-24">${escape("")}</textarea></div> ${Object.keys(results).length > 0
	? `<div class="space-y-3 animate-fade-in">${each(algorithms, algo => {
			return `<div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group"><div class="flex items-center justify-between mb-2"><span class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">${escape(algo)}</span> <button class="${"text-xs px-2 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 " + escape(
				copied === algo
				? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 opacity-100'
				: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
				true
			)}">${escape(copied === algo ? '✓ Copied' : '📋 Copy')} </button></div> <code class="text-xs font-mono text-slate-700 dark:text-slate-300 break-all block">${escape(results[algo] || '—')}</code> </div>`;
		})}</div>`
	: `<div class="text-center py-8 text-slate-400 dark:text-slate-500" data-svelte-h="svelte-4uj347"><div class="text-4xl mb-2">🔒</div> <p class="text-sm">Enter text to generate hashes</p></div>`} <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800" data-svelte-h="svelte-1dtsmxc"><p class="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2"><span>⚠️</span> <span>For security, use SHA-256 or higher. SHA-1 is shown for compatibility but is considered weak.</span></p></div></div></div>`;
});

/* src/components/svelte/LoremGenerator.svelte generated by Svelte v4.2.19 */

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const LoremGenerator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let paragraphs = 3;
	let output = '';

	const words = [
		'lorem',
		'ipsum',
		'dolor',
		'sit',
		'amet',
		'consectetur',
		'adipiscing',
		'elit',
		'sed',
		'do',
		'eiusmod',
		'tempor',
		'incididunt',
		'ut',
		'labore',
		'et',
		'dolore',
		'magna',
		'aliqua',
		'enim',
		'ad',
		'minim',
		'veniam',
		'quis',
		'nostrud',
		'exercitation',
		'ullamco',
		'laboris',
		'nisi',
		'aliquip',
		'ex',
		'ea',
		'commodo',
		'consequat',
		'duis',
		'aute',
		'irure',
		'in',
		'reprehenderit',
		'voluptate',
		'velit',
		'esse',
		'cillum',
		'fugiat',
		'nulla',
		'pariatur',
		'excepteur',
		'sint',
		'occaecat',
		'cupidatat',
		'non',
		'proident',
		'sunt',
		'culpa',
		'qui',
		'officia',
		'deserunt',
		'mollit',
		'anim',
		'id',
		'est',
		'laborum',
		'vitae',
		'elementum',
		'curabitur',
		'gravida',
		'arcu',
		'ac',
		'tortor',
		'dignissim',
		'convallis',
		'tellus',
		'rutrum',
		'pellentesque',
		'habitant',
		'morbi',
		'tristique',
		'senectus',
		'netus',
		'malesuada',
		'fames',
		'turpis',
		'egestas',
		'integer',
		'feugiat',
		'scelerisque',
		'varius',
		'nunc',
		'vel',
		'risus',
		'commodo',
		'viverra',
		'maecenas'
	];

	function randomWord() {
		return words[Math.floor(Math.random() * words.length)];
	}

	function generateSentence() {
		const length = 8 + Math.floor(Math.random() * 12);
		const sentence = Array.from({ length }, randomWord);
		sentence[0] = capitalize(sentence[0]);
		return sentence.join(' ') + '.';
	}

	function generateParagraph() {
		const sentenceCount = 4 + Math.floor(Math.random() * 4);
		return Array.from({ length: sentenceCount }, generateSentence).join(' ');
	}

	function generate() {
		output = Array.from({ length: paragraphs }, generateParagraph).join('\n\n');
	}

	// Generate initial content
	generate();

	return `<div class="tool-card"><div class="flex items-center gap-3 mb-6" data-svelte-h="svelte-wwkg0y"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg"><span class="text-2xl">📝</span></div> <div><h3 class="text-xl font-bold text-slate-800 dark:text-white">Lorem Ipsum</h3> <p class="text-sm text-slate-500 dark:text-slate-400">Generate placeholder text</p></div></div> <div class="space-y-4"><div class="flex items-center gap-4"><div class="flex-1"><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" data-svelte-h="svelte-17ztyeo">Paragraphs</label> <div class="flex items-center gap-2"><button class="tool-btn-secondary w-10 h-10 flex items-center justify-center" data-svelte-h="svelte-10nj9s3">-</button> <input type="number" min="1" max="20" class="tool-input text-center w-20"${add_attribute("value", paragraphs, 0)}> <button class="tool-btn-secondary w-10 h-10 flex items-center justify-center" data-svelte-h="svelte-1awbpzi">+</button></div></div> <div class="flex-1"><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" data-svelte-h="svelte-wh4v2p"> </label> <button class="tool-btn-primary w-full" data-svelte-h="svelte-12r1usi"><span class="mr-2">🔄</span>Regenerate</button></div></div> <div><div class="flex items-center justify-between mb-2"><label class="text-sm font-medium text-slate-700 dark:text-slate-300" data-svelte-h="svelte-aqblw0">Generated Text</label> <button class="${"text-xs px-3 py-1 rounded-lg transition-all " + escape(
		'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600',
		true
	)}">${escape('📋 Copy All')}</button></div> <div class="result-display h-48 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">${escape(output)}</div></div> <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500"><span>${escape(paragraphs)} paragraphs</span> <span>${escape(output.split(' ').length)} words</span> <span>${escape(output.length)} characters</span></div></div></div>`;
});

/* src/components/svelte/PasswordGenerator.svelte generated by Svelte v4.2.19 */

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const PasswordGenerator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let length = 16;
	let includeUppercase = true;
	let includeLowercase = true;
	let includeNumbers = true;
	let includeSymbols = true;
	let excludeAmbiguous = false;
	let password = "";
	let strength = 0;
	let strengthLabel = "";
	let history = [];

	function generatePassword() {
		let chars = "";
		chars += uppercaseChars;
		chars += lowercaseChars;
		chars += numberChars;
		chars += symbolChars;

		if (!chars) {
			password = "";
			return;
		}

		let result = "";
		const array = new Uint32Array(length);
		crypto.getRandomValues(array);

		for (let i = 0; i < length; i++) {
			result += chars[array[i] % chars.length];
		}

		password = result;
		calculateStrength();

		if (password && !history.includes(password)) {
			history = [password, ...history.slice(0, 4)];
		}
	}

	function calculateStrength() {
		let score = 0;
		score += 1;
		score += 1;
		score += 1;
		let variety = 0;
		variety++;
		variety++;
		variety++;
		variety++;
		score += variety;
		const charsetSize = (26 ) + (26 ) + (10 ) + (26 );
		const entropy = length * Math.log2(charsetSize);
		if (entropy >= 60) score += 1;
		if (entropy >= 80) score += 1;
		if (entropy >= 100) score += 1;
		strength = Math.min(score, 10);
		if (strength <= 3) strengthLabel = "Weak"; else if (strength <= 5) strengthLabel = "Fair"; else if (strength <= 7) strengthLabel = "Good"; else strengthLabel = "Strong";
	}

	function getStrengthColor() {
		if (strength <= 3) return "bg-red-500";
		if (strength <= 5) return "bg-yellow-500";
		if (strength <= 7) return "bg-blue-500";
		return "bg-green-500";
	}

	generatePassword();

	return `<div class="tool-card"><div class="flex items-center gap-3 mb-6" data-svelte-h="svelte-p79ky1"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-lg"><span class="text-2xl">🔑</span></div> <div><h3 class="text-xl font-bold text-slate-800 dark:text-white">Password Generator</h3> <p class="text-sm text-slate-500 dark:text-slate-400">Generate secure random passwords</p></div></div> <div class="space-y-4"> <div class="relative"><input type="text" readonly class="tool-input font-mono text-lg tracking-wide pr-20"${add_attribute("value", password, 0)}> <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1"><button class="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" title="Generate new" data-svelte-h="svelte-1lbps6">🔄</button> <button class="${"p-2 rounded-lg transition-colors " + escape(
		'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600',
		true
	)}" title="Copy">${escape("📋")}</button></div></div>  <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-600 dark:text-slate-400" data-svelte-h="svelte-1sgsf8a">Strength</span> <span class="${"font-medium " + escape(
		strength <= 3
		? 'text-red-500'
		: strength <= 5
			? 'text-yellow-500'
			: strength <= 7 ? 'text-blue-500' : 'text-green-500',
		true
	)}">${escape(strengthLabel)}</span></div> <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="${"h-full transition-all duration-300 " + escape(getStrengthColor(), true)}" style="${"width: " + escape(strength * 10, true) + "%"}"></div></div></div>  <div><div class="flex justify-between text-sm mb-2"><label class="text-slate-700 dark:text-slate-300 font-medium" data-svelte-h="svelte-42pqpe">Length</label> <span class="font-mono text-slate-600 dark:text-slate-400">${escape(length)}</span></div> <input type="range" min="4" max="64" class="w-full accent-accent-500"${add_attribute("value", length, 0)}></div>  <div class="grid grid-cols-2 gap-3"><label class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><input type="checkbox" class="w-4 h-4 accent-accent-500"${add_attribute("checked", includeUppercase, 1)}> <span class="text-sm text-slate-700 dark:text-slate-300" data-svelte-h="svelte-uk2a3y">Uppercase (A-Z)</span></label> <label class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><input type="checkbox" class="w-4 h-4 accent-accent-500"${add_attribute("checked", includeLowercase, 1)}> <span class="text-sm text-slate-700 dark:text-slate-300" data-svelte-h="svelte-15l1hs1">Lowercase (a-z)</span></label> <label class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><input type="checkbox" class="w-4 h-4 accent-accent-500"${add_attribute("checked", includeNumbers, 1)}> <span class="text-sm text-slate-700 dark:text-slate-300" data-svelte-h="svelte-xgbvx2">Numbers (0-9)</span></label> <label class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><input type="checkbox" class="w-4 h-4 accent-accent-500"${add_attribute("checked", includeSymbols, 1)}> <span class="text-sm text-slate-700 dark:text-slate-300" data-svelte-h="svelte-mcalrd">Symbols (!@#$)</span></label></div> <label class="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><input type="checkbox" class="w-4 h-4 accent-accent-500"${add_attribute("checked", excludeAmbiguous, 1)}> <span class="text-sm text-slate-700 dark:text-slate-300" data-svelte-h="svelte-1fl156e">Exclude ambiguous characters (i, l, 1, L, o, 0, O)</span></label> <button class="tool-btn-primary w-full" data-svelte-h="svelte-1hyx6at"><span class="mr-2">⚡</span>Generate New Password</button>  ${history.length > 1
	? `<div><label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block" data-svelte-h="svelte-1r50yuu">Recent Passwords</label> <div class="space-y-1">${each(history.slice(1), pwd => {
			return `<div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm font-mono text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" role="button" tabindex="0"><span class="truncate">${escape(pwd)}</span> <span class="text-xs text-slate-400" data-svelte-h="svelte-u39u74">Click to copy</span> </div>`;
		})}</div></div>`
	: ``}</div></div>`;
});

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("main.title"), "data-astro-cid-7pewbour": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-7pewbour": true })} ${renderComponent($$result2, "Sidebar", $$Sidebar, { "data-astro-cid-7pewbour": true })} ${maybeRenderHead()}<main class="min-h-screen pt-20 md:pl-72 transition-all duration-300" data-astro-cid-7pewbour> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-astro-cid-7pewbour> <!-- Hero Section --> <header class="text-center mb-16 animate-fade-in" data-astro-cid-7pewbour> <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6" data-astro-cid-7pewbour> <span data-astro-cid-7pewbour>⚡</span> <span data-astro-cid-7pewbour>19 Herramientas Esenciales para Desarrolladores</span> </div> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-astro-cid-7pewbour> <span class="gradient-text" data-astro-cid-7pewbour>${t("main.title")}</span> </h1> <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-astro-cid-7pewbour> ${t("main.description")} </p> <div class="flex flex-wrap justify-center gap-3 mt-8" data-astro-cid-7pewbour> <span class="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium" data-astro-cid-7pewbour>
⚛️ React
</span> <span class="px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium" data-astro-cid-7pewbour>
💚 Vue
</span> <span class="px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium" data-astro-cid-7pewbour>
🔥 Svelte
</span> <span class="px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium" data-astro-cid-7pewbour>
🚀 Astro
</span> </div> </header> <!-- Formatters Section --> <section id="tools" class="mb-16" data-astro-cid-7pewbour> <div class="flex items-center gap-3 mb-8" data-astro-cid-7pewbour> <span class="text-2xl" data-astro-cid-7pewbour>✨</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-7pewbour>${t("category.formatters")}</h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-7pewbour> <div id="json-formatter" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "JsonFormatter", JsonFormatter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/JsonFormatter", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="base64-tool" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "Base64Tool", Base64Tool, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/Base64Tool", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="css-formatter" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "CssFormatter", CssFormatter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/CssFormatter.vue", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="sql-formatter" class="animate-slide-up" style="animation-delay: 0.4s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "SqlFormatter", SqlFormatter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/SqlFormatter.vue", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> </div> </section> <!-- Generators Section --> <section class="mb-16" data-astro-cid-7pewbour> <div class="flex items-center gap-3 mb-8" data-astro-cid-7pewbour> <span class="text-2xl" data-astro-cid-7pewbour>⚡</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-7pewbour>${t("category.generators")}</h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" data-astro-cid-7pewbour> <div id="uuid-generator" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "UuidGenerator", UuidGenerator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/UuidGenerator", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="hash-generator" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "HashGenerator", HashGenerator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/HashGenerator.svelte", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="lorem-generator" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "LoremGenerator", LoremGenerator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/LoremGenerator.svelte", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="password-generator" class="animate-slide-up" style="animation-delay: 0.4s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "PasswordGenerator", PasswordGenerator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/PasswordGenerator.svelte", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="qr-generator" class="animate-slide-up" style="animation-delay: 0.5s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "QrCodeGenerator", QrCodeGenerator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/QrCodeGenerator", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> </div> </section> <!-- Converters Section --> <section class="mb-16" data-astro-cid-7pewbour> <div class="flex items-center gap-3 mb-8" data-astro-cid-7pewbour> <span class="text-2xl" data-astro-cid-7pewbour>🔄</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-7pewbour>${t("category.converters")}</h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" data-astro-cid-7pewbour> <div id="color-converter" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "ColorConverter", ColorConverter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/ColorConverter.svelte", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="timestamp-converter" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "TimestampConverter", TimestampConverter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/TimestampConverter.vue", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="url-codec" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "UrlCodec", UrlCodec, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/UrlCodec.vue", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="html-entity-encoder" class="animate-slide-up" style="animation-delay: 0.4s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "HtmlEntityEncoder", HtmlEntityEncoder, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/HtmlEntityEncoder.vue", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="json-to-typescript" class="animate-slide-up" style="animation-delay: 0.5s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "JsonToTypescript", JsonToTypescript, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/JsonToTypescript", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> </div> </section> <!-- Validators & Testers Section --> <section class="mb-16" data-astro-cid-7pewbour> <div class="flex items-center gap-3 mb-8" data-astro-cid-7pewbour> <span class="text-2xl" data-astro-cid-7pewbour>✅</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-7pewbour>${t("category.validators")}</h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-7pewbour> <div id="regex-tester" class="animate-slide-up" style="animation-delay: 0.1s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "RegexTester", RegexTester, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/RegexTester", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="jwt-decoder" class="animate-slide-up" style="animation-delay: 0.2s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "JwtDecoder", JwtDecoder, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/vue/JwtDecoder.vue", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="cron-parser" class="animate-slide-up" style="animation-delay: 0.3s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "CronParser", CronParser, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/svelte/CronParser.svelte", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> </div> </section> <!-- Text Tools Section --> <section class="mb-16" data-astro-cid-7pewbour> <div class="flex items-center gap-3 mb-8" data-astro-cid-7pewbour> <span class="text-2xl" data-astro-cid-7pewbour>📝</span> <h2 class="text-2xl font-bold text-slate-800 dark:text-white" data-astro-cid-7pewbour>${t("category.textTools")}</h2> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-7pewbour> <div id="markdown-preview" class="animate-slide-up lg:col-span-2" style="animation-delay: 0.1s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "MarkdownPreview", MarkdownPreview, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/MarkdownPreview", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> <div id="diff-checker" class="animate-slide-up lg:col-span-2" style="animation-delay: 0.2s;" data-astro-cid-7pewbour> ${renderComponent($$result2, "DiffChecker", DiffChecker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/react/DiffChecker", "client:component-export": "default", "data-astro-cid-7pewbour": true })} </div> </div> </section> <!-- About Section --> <section id="about" class="mb-16" data-astro-cid-7pewbour> <div class="glass-card rounded-2xl p-8 md:p-12" data-astro-cid-7pewbour> <div class="max-w-3xl mx-auto text-center" data-astro-cid-7pewbour> <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-4" data-astro-cid-7pewbour>Acerca de DevTools Pro</h2> <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed" data-astro-cid-7pewbour>
Construido con la arquitectura Islands de Astro, este kit de herramientas muestra una integración 
              perfecta de componentes React, Vue y Svelte. Todas las herramientas se ejecutan completamente 
              en tu navegador — ningún dato se envía a ningún servidor.
</p> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" data-astro-cid-7pewbour> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-7pewbour> <div class="text-3xl font-bold gradient-text" data-astro-cid-7pewbour>19</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-7pewbour>Herramientas</div> </div> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-7pewbour> <div class="text-3xl font-bold gradient-text" data-astro-cid-7pewbour>3</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-7pewbour>Frameworks</div> </div> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-7pewbour> <div class="text-3xl font-bold gradient-text" data-astro-cid-7pewbour>0</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-7pewbour>Datos Enviados</div> </div> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50" data-astro-cid-7pewbour> <div class="text-3xl font-bold gradient-text" data-astro-cid-7pewbour>∞</div> <div class="text-sm text-slate-500 dark:text-slate-400" data-astro-cid-7pewbour>Usos Gratis</div> </div> </div> </div> </div> </section> <!-- Footer --> <footer class="text-center text-sm text-slate-500 dark:text-slate-400 py-8 border-t border-slate-200 dark:border-slate-800" data-astro-cid-7pewbour> <p data-astro-cid-7pewbour>Construido con ❤️ usando Astro, React, Vue & Svelte</p> </footer> </div> </main> ` })} `;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/es/index.astro", void 0);

const $$file = "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/es/index.astro";
const $$url = "/es";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
