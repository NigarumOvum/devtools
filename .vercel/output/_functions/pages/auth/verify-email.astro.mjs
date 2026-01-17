/* empty css                                              */
import { c as createComponent, r as renderTemplate, a as renderHead, b as addAttribute, d as createAstro } from '../../chunks/astro/server_D3Nh1ros.mjs';
import 'kleur/colors';
import 'clsx';
import { d as db, v as verificationTokens, u as users } from '../../chunks/index_ChiojulR.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$VerifyEmail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VerifyEmail;
  const token = Astro2.url.searchParams.get("token");
  let message = "Verifying your email...";
  let success = false;
  if (token) {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token)
    });
    if (verificationToken && verificationToken.expires > /* @__PURE__ */ new Date()) {
      await db.update(users).set({ emailVerified: /* @__PURE__ */ new Date() }).where(eq(users.email, verificationToken.identifier));
      await db.delete(verificationTokens).where(eq(verificationTokens.token, token));
      message = "Email verified successfully! You can now access all features.";
      success = true;
    } else {
      message = "Invalid or expired verification link.";
    }
  } else {
    message = "Verification token is missing.";
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><title>Verify Email - Multi-Tools</title>${renderHead()}</head> <body class="bg-black text-white min-h-screen flex items-center justify-center p-6"> <div class="max-w-md w-full text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl"> <div${addAttribute(`text-4xl mb-6 ${success ? "text-green-500" : "text-red-500"}`, "class")}> ${success ? "\u2705" : "\u274C"} </div> <h2${addAttribute(`text-2xl font-bold mb-4 ${success ? "text-green-400" : "text-red-400"}`, "class")}> ${success ? "Success!" : "Verification Failed"} </h2> <p class="text-gray-400 mb-8">${message}</p> <a href="/" class="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-2 rounded-lg transition-colors">
Go to Home
</a> </div> </body></html>`;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/auth/verify-email.astro", void 0);

const $$file = "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/auth/verify-email.astro";
const $$url = "/auth/verify-email";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$VerifyEmail,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
