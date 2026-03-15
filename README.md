# CareCost Intelligence Site

This repository contains the current Astro implementation of the `CareCost Intelligence` website.

## What Powers Production

The active site is the Astro app built from:

- `src/` for pages, layouts, components, and styles
- `public/` for browser-side scripts and static assets used by the Astro site
- `astro.config.mjs` for Astro configuration

If you are changing the live website, start in `src/` or `public/`.

## What Not To Edit By Default

Treat these paths as non-source unless you intentionally need them:

- `dist/` generated build output
- root-level `index.html`
- root-level `about/`, `care-types/`, `contact/`, `estimator/`, `guides/`, `privacy/`, `state-costs/`
- `assets/`

Those root-level HTML folders and `assets/` belong to an older static-site structure and should not be treated as the current source of truth.

See [docs/legacy-structure-notes.md](/f:/www/www7/docs/legacy-structure-notes.md) for the detailed boundary.

## What The Site Does

This is a tool-first senior care cost planning site.

Primary user flow:

1. Land on the homepage and trust pages
2. Use the estimator to model a monthly and annual care-cost range
3. Validate assumptions with state guides
4. Use care-type and planning guides to compare options and collect quotes

## Key Active Files

Most important files for ongoing work:

- `src/layouts/BaseLayout.astro`
- `src/components/Footer.astro`
- `src/pages/index.astro`
- `src/pages/estimator/index.astro`
- `src/pages/state-costs/index.astro`
- `src/pages/guides/index.astro`
- `src/styles/global.css`
- `public/estimator.js`
- `public/state-tools.js`
- `public/guide-tools.js`

## Development Commands

Install dependencies:

```bash
npm install
```

Start local dev server:

```bash
npm run dev
```

Build static site:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Production Indexing Contract

The site should only be indexable when both of these are true:

1. `SITE_URL` is set to the real production origin, such as `https://www.example.com`
2. `PUBLIC_ALLOW_INDEXING=true`

Safe defaults:

- local development: `PUBLIC_ALLOW_INDEXING=false`
- preview or staging: `PUBLIC_ALLOW_INDEXING=false`
- production: set the real `SITE_URL`, then enable `PUBLIC_ALLOW_INDEXING=true`

Quick verification before release:

```bash
npm run build
Get-Content dist/robots.txt
Get-Item dist/sitemap.xml | Select-Object Length
```

Expected production behavior:

- `robots.txt` contains `Allow: /`
- sitemap URLs use the live production domain

Expected non-production behavior:

- `robots.txt` contains `Disallow: /`
- sitemap output is empty

## Release Checklist

Before a real launch, verify:

1. `SITE_URL` points to the real production domain.
2. `PUBLIC_ALLOW_INDEXING=true` is only enabled for production.
3. `npm run build` completes successfully.
4. `dist/robots.txt` and `dist/sitemap.xml` match the intended environment.
5. Homepage, estimator, state hub, guide hub, and representative state/guide pages render correctly on mobile and desktop.
6. No work was accidentally done in legacy root-level HTML files instead of `src/`.

## Important Notes

- The active estimator behavior is driven by `public/estimator.js`.
- `public/state-tools.js` enhances the state hub and state pages.
- `public/guide-tools.js` adapts guide links and in-page navigation behavior.
- Do not assume `data/state-costs.json` powers the live Astro estimator without verifying the current code path first.
- `robots.txt` and sitemap generation are handled under `src/pages/`.

## Maintenance Docs

Architecture and cleanup audit:

- [docs/site-maintenance-audit-2026-03-12.md](/f:/www/www7/docs/site-maintenance-audit-2026-03-12.md)

Legacy boundary notes:

- [docs/legacy-structure-notes.md](/f:/www/www7/docs/legacy-structure-notes.md)

Launch readiness checklist:

- [docs/launch-readiness-checklist-2026-03-12.md](/f:/www/www7/docs/launch-readiness-checklist-2026-03-12.md)

Content standardization backlog:

- [docs/content-standardization-backlog-2026-03-12.md](/f:/www/www7/docs/content-standardization-backlog-2026-03-12.md)
