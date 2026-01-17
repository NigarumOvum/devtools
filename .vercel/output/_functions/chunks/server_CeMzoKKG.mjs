import { Auth } from '@auth/core';
import { parseString } from 'set-cookie-parser';
import '@auth/core/providers/discord';
import '@auth/core/providers/google';
import Credentials from '@auth/core/providers/credentials';
import Email from '@auth/core/providers/email';
import { d as db, u as users } from './index_ChiojulR.mjs';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

const defineConfig = (config) => {
  config.prefix ??= "/api/auth";
  config.basePath = config.prefix;
  return config;
};

const authConfig = defineConfig({
  adapter: DrizzleAdapter(db),
  providers: [
    Email({
      server: {
        host: undefined                                 ,
        port: undefined                                 ,
        auth: {
          user: undefined                                 ,
          pass: undefined                                     
        }
      },
      from: undefined                          
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const [user] = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
        if (!user || !user.password) return null;
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AstroAuthHandler(prefix, options = authConfig) {
  return async ({ cookies, request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) return;
    const res = await Auth(request, options);
    if (["callback", "signin", "signout"].includes(action)) {
      const getSetCookie = res.headers.getSetCookie();
      if (getSetCookie.length > 0) {
        getSetCookie.forEach((cookie) => {
          const { name, value, ...options2 } = parseString(cookie);
          cookies.set(name, value, options2);
        });
        res.headers.delete("Set-Cookie");
      }
    }
    return res;
  };
}
function AstroAuth(options = authConfig) {
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign(__vite_import_meta_env__, { AUTH_SECRET: "ROJ5OtAK2nCuXx8LadrClHR6bYBoC5r35XDRDQGP9MQ=", AUTH_TRUST_HOST: "true", NODE: process.env.NODE, _: process.env._, NODE_ENV: process.env.NODE_ENV });
  options.secret ??= AUTH_SECRET;
  options.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
  const { prefix = "/api/auth", ...authOptions } = options;
  const handler = AstroAuthHandler(prefix, authOptions);
  return {
    async GET(context) {
      return await handler(context);
    },
    async POST(context) {
      return await handler(context);
    }
  };
}
async function getSession(req, options = authConfig) {
  options.secret ??= "ROJ5OtAK2nCuXx8LadrClHR6bYBoC5r35XDRDQGP9MQ=";
  options.trustHost ??= true;
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(new Request(url, { headers: req.headers }), options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}

export { AstroAuth as A, getSession as g };
