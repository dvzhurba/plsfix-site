# www.plsfix.co.uk — personal site

Static site built with [Astro](https://astro.build). Content lives in
[`../website-content/`](../website-content) as Markdown; this folder is the rendering layer.

## Add or edit content

Add **one Markdown file** to the right folder — the index, tags, and RSS update automatically:

| To add a…   | Put a `.md` file in        | Frontmatter                                   |
| ----------- | -------------------------- | --------------------------------------------- |
| Project     | `../website-content/work/` | `title, role, dates, summary, links, tags, featured` |
| Article     | `../website-content/writing/` | `title, date, summary, publication, external_url, tags, featured` |
| Talk        | `../website-content/talks/` | `title, date, type, venue, url, note`         |
| Recognition | `../website-content/recognition/` | `title, date, type, venue, url, note`  |

Home / About / CV are the single files `home.md` / `about.md` / `cv.md`.

## Run locally

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to site/dist
npm run preview  # serve the production build
```

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds `site/` and
publishes `site/dist`. Turn it on once: repo **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

If the Pages deploy step fails transiently ("Deployment failed, try again later"),
re-run the workflow from the Actions tab, or push any change touching `site/` or
`website-content/` — the workflow only runs on those paths, so an empty commit
won't retrigger it.

### Custom domain

The site is configured for `www.plsfix.co.uk` (`site/public/CNAME`). To deploy elsewhere,
override the build with repo **Variables** `SITE_URL` and `BASE_PATH` (defaults are in
`astro.config.mjs`).

## Before launch — fill these in

- [ ] `site/src/lib/site.ts` — real email + LinkedIn / GitHub / X URLs (footer, contact, JSON-LD `sameAs`).
- [ ] `../website-content` — replace `TODO` source links (award pages, recordings, dated screenshots) and dates.
- [ ] `site/public/og.png` — 1200×630 social-preview image (referenced by every page).
- [ ] `site/public/cv.pdf` — downloadable CV (the CV page links to it).
