import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

// Strip all HTML comments from Markdown before render, so any editorial notes
// left in the source never reach the published HTML.
function remarkStripHtmlComments() {
  return (tree) => {
    visit(tree, 'html', (node) => {
      node.value = node.value.replace(/<!--[\s\S]*?-->/g, '');
    });
  };
}

// Deploy config is driven by env so the same source works for a custom domain
// or a GitHub project page:
//   - Custom domain (default):  SITE_URL=https://deniszhurba.com   BASE_PATH=/
//   - GitHub project page:      SITE_URL=https://<user>.github.io  BASE_PATH=/uk-global-talent
const SITE = process.env.SITE_URL || 'https://www.plsfix.co.uk';
const BASE = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  // Exclude the private, password-gated pages (editor pitch + unplaced draft).
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/for-editors\/?$/.test(page) &&
        !/\/writing\/communications-investment-case\/?$/.test(page),
    }),
  ],
  markdown: { remarkPlugins: [remarkStripHtmlComments] },
  // Content lives one level up in ../website-content (single source of truth),
  // so allow Vite to read outside the site/ project root.
  vite: { server: { fs: { allow: ['..'] } } },
});
