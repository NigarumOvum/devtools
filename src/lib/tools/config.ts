import type { ToolMeta } from "./types";

/**
 * Single source of truth for all tools: id, title, and runtime type.
 * Adding a new tool = add one entry here + implement the component (Open/Closed).
 */
export const TOOL_LIST: readonly ToolMeta[] = [
  // React
  { id: "json-formatter", title: "JSON Formatter", type: "react" },
  { id: "base64-tool", title: "Base64 Encoder/Decoder", type: "react" },
  { id: "js-minifier", title: "JS Minifier", type: "react" },
  { id: "css-converter", title: "CSS Bridge", type: "react" },
  { id: "uuid-generator", title: "UUID Generator", type: "react" },
  { id: "qr-generator", title: "QR Code Generator", type: "react" },
  { id: "pwa-manifest", title: "PWA Manifest Generator", type: "react" },
  { id: "json-to-typescript", title: "JSON to TypeScript", type: "react" },
  { id: "html-converter", title: "HTML Bridge", type: "react" },
  { id: "regex-tester", title: "Regex Tester", type: "react" },
  { id: "auto-regex", title: "AutoRegex (AI)", type: "react" },
  { id: "a11y-lab", title: "A11y Lab", type: "react" },
  { id: "http-client", title: "HTTP Client", type: "react" },
  { id: "performance-lab", title: "Performance Suite", type: "react" },
  { id: "markdown-preview", title: "Markdown Preview", type: "react" },
  { id: "diff-checker", title: "Diff Checker", type: "react" },
  { id: "html-editor", title: "HTML Editor", type: "react" },
  { id: "layout-generator", title: "Layout Generator", type: "react" },
  // Vue
  { id: "css-formatter", title: "CSS Formatter", type: "vue" },
  { id: "sql-formatter", title: "SQL Formatter", type: "vue" },
  { id: "timestamp-converter", title: "Timestamp Converter", type: "vue" },
  { id: "url-codec", title: "URL Encoder/Decoder", type: "vue" },
  { id: "html-entity-encoder", title: "HTML Entity Encoder", type: "vue" },
  { id: "jwt-decoder", title: "JWT Decoder", type: "vue" },
  // Svelte
  { id: "hash-generator", title: "Hash Generator", type: "svelte" },
  { id: "lorem-generator", title: "Lorem Ipsum Generator", type: "svelte" },
  { id: "password-generator", title: "Password Generator", type: "svelte" },
  { id: "cron-parser", title: "Cron Parser", type: "svelte" },
  { id: "color-converter", title: "Color Converter", type: "svelte" },
] as const;

export type ToolId = (typeof TOOL_LIST)[number]["id"];

const byId = new Map<string, ToolMeta>(TOOL_LIST.map((t) => [t.id, t]));

/** Get tool metadata by slug; returns undefined if not found. */
export function getToolMeta(slug: string | undefined): ToolMeta | undefined {
  return slug ? byId.get(slug) : undefined;
}

/** Check if a slug is a valid tool id. */
export function isValidToolId(slug: string | undefined): slug is ToolId {
  return slug !== undefined && byId.has(slug);
}
