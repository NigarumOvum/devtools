import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CW6-G6uX.mjs';
import { manifest } from './manifest_DYvullit.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page2 = () => import('./pages/api/ai.astro.mjs');
const _page3 = () => import('./pages/api/auth/forgot-password.astro.mjs');
const _page4 = () => import('./pages/api/auth/register.astro.mjs');
const _page5 = () => import('./pages/api/auth/reset-password.astro.mjs');
const _page6 = () => import('./pages/auth/forgot-password.astro.mjs');
const _page7 = () => import('./pages/auth/reset-password.astro.mjs');
const _page8 = () => import('./pages/auth/verify-email.astro.mjs');
const _page9 = () => import('./pages/es.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/auth-astro/src/api/[...auth].ts", _page1],
    ["src/pages/api/ai.ts", _page2],
    ["src/pages/api/auth/forgot-password.ts", _page3],
    ["src/pages/api/auth/register.ts", _page4],
    ["src/pages/api/auth/reset-password.ts", _page5],
    ["src/pages/auth/forgot-password.astro", _page6],
    ["src/pages/auth/reset-password.astro", _page7],
    ["src/pages/auth/verify-email.astro", _page8],
    ["src/pages/es/index.astro", _page9],
    ["src/pages/index.astro", _page10]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
