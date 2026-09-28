// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * Deployment URL settings
 * -----------------------
 * SITE_URL  – the origin the site is served from, e.g. https://username.github.io
 *             or a custom domain such as https://cfal.example.edu
 * BASE_PATH – the sub-path the site lives under:
 *             "/"      for a user/organisation site (username.github.io)
 *             "/cfal"  for a project site          (username.github.io/cfal/)
 *
 * The GitHub Actions workflow (.github/workflows/deploy.yml) fills both in
 * automatically from the repository's Pages settings, so neither needs to be
 * hard-coded here. Override them locally with environment variables, e.g.
 *   SITE_URL=https://username.github.io BASE_PATH=/cfal npm run build
 */
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
