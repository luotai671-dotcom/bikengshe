import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://tizibks.com',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
    {
      name: 'sync-sitemap-xml',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const fs = await import('node:fs/promises')
          const sitemapIndexPath = new URL('sitemap-index.xml', dir)
          const sitemapXmlPath = new URL('sitemap.xml', dir)
          try {
            await fs.copyFile(sitemapIndexPath, sitemapXmlPath)
          } catch (e) {
            console.error('[sync-sitemap-xml] Error syncing sitemap:', e)
          }
        },
      },
    },
  ],
  compressHTML: true,
})
