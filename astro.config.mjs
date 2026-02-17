import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import auth from 'auth-astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), vue(), svelte(), tailwind(), auth()],
  env: {
    schema: {
      TURSO_DATABASE_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      TURSO_AUTH_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
});