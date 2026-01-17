/* empty css                                              */
import { c as createComponent, r as renderTemplate, a as renderHead, e as renderComponent, d as createAstro } from '../../chunks/astro/server_D3Nh1ros.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => window.location.href = "/", 2e3);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full mx-auto p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-white", children: "Reset Password" }),
    message && /* @__PURE__ */ jsx("div", { className: "p-3 bg-green-900/30 text-green-400 rounded-lg mb-6 border border-green-500/30", children: message }),
    error && /* @__PURE__ */ jsx("div", { className: "p-3 bg-red-900/30 text-red-400 rounded-lg mb-6 border border-red-500/30", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "New Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            required: true,
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            required: true,
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50",
          children: loading ? "Resetting..." : "Reset Password"
        }
      )
    ] })
  ] });
};

const $$Astro = createAstro();
const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ResetPassword;
  const token = Astro2.url.searchParams.get("token") || "";
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><title>Reset Password - Multi-Tools</title>${renderHead()}</head> <body class="bg-black text-white min-h-screen flex items-center justify-center"> ${token ? renderTemplate`${renderComponent($$result, "ResetPasswordForm", ResetPasswordForm, { "client:load": true, "token": token, "client:component-hydration": "load", "client:component-path": "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/components/auth/ResetPasswordForm", "client:component-export": "ResetPasswordForm" })}` : renderTemplate`<div class="text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl"> <h2 class="text-2xl font-bold text-red-400 mb-4">
Invalid Link
</h2> <p class="text-gray-400 mb-6">
The password reset link is missing or invalid.
</p> <a href="/" class="text-blue-400 hover:underline">
Go back home
</a> </div>`} </body></html>`;
}, "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/auth/reset-password.astro", void 0);

const $$file = "/Users/brealypadronrodriguezm4/Downloads/Projects Node-React/Multi-tools/src/pages/auth/reset-password.astro";
const $$url = "/auth/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ResetPassword,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
