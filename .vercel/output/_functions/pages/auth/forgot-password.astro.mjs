/* empty css                                              */
import { c as createComponent, r as renderTemplate, a as renderHead, e as renderComponent } from '../../chunks/astro/server_D3Nh1ros.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessage("If an account exists with that email, we have sent a reset link.");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full mx-auto p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-white", children: "Forgot Password" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6 text-sm", children: "Enter your email and we'll send you a link to reset your password." }),
    message && /* @__PURE__ */ jsx("div", { className: "p-3 bg-green-900/30 text-green-400 rounded-lg mb-6 border border-green-500/30", children: message }),
    error && /* @__PURE__ */ jsx("div", { className: "p-3 bg-red-900/30 text-red-400 rounded-lg mb-6 border border-red-500/30", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            required: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors",
            placeholder: "you@example.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50",
          children: loading ? "Sending..." : "Send Reset Link"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-sm text-blue-400 hover:underline", children: "Back to Login" }) })
  ] });
};

const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><title>Forgot Password - Multi-Tools</title>${renderHead()}</head> <body class="bg-black text-white min-h-screen flex items-center justify-center"> ${renderComponent($$result, "ForgotPasswordForm", ForgotPasswordForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/auth/ForgotPasswordForm", "client:component-export": "ForgotPasswordForm" })} </body></html>`;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/auth/forgot-password.astro", void 0);

const $$file = "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/auth/forgot-password.astro";
const $$url = "/auth/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ForgotPassword,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
