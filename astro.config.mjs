// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Replace with the real domain before launch (used for canonical URLs, sitemap and Open Graph).
  site: 'https://example.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap(), icon({ include: { ph: ['x', 'arrow-left', 'arrow-right', 'arrow-up-right', 'list'] } }), react()],
  vite: { plugins: [tailwindcss()] },
});