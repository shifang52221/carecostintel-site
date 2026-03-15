# Legacy Structure Notes

Date: 2026-03-12
Project: `f:\www\www7`

## Purpose

This document separates the active Astro site from legacy static-site artifacts that still exist in the repository.

The goal is simple:

- future edits should land in the right files
- generated output should not be hand-edited
- legacy files should not be mistaken for production source

## Active Implementation

The current live implementation should be assumed to come from:

- `src/`
- `public/`
- `astro.config.mjs`

If a page is visible on the current site, the Astro source should be under `src/pages/` unless proven otherwise.

## Legacy Or Non-Source Paths

These paths should be treated as legacy, generated, or non-authoritative by default:

- `dist/`
- root-level `index.html`
- root-level `about/`
- root-level `care-types/`
- root-level `contact/`
- root-level `estimator/`
- root-level `guides/`
- root-level `privacy/`
- root-level `state-costs/`
- `assets/`

## Why This Matters

The repository contains signs of an older static site:

- old root-level HTML directories
- old asset loading patterns
- separate JavaScript under `assets/`

The current Astro implementation uses:

- Astro pages in `src/pages/`
- browser-side enhancement scripts in `public/`

Editing the old root HTML files will usually not change the active Astro build.

## File-Level Working Rules

Use these rules before making changes:

1. If you are changing layout, SEO, shared metadata, or site chrome:
   edit `src/layouts/` or `src/components/`
2. If you are changing content pages:
   edit `src/pages/`
3. If you are changing estimator, state-hub, or guide-hub behavior:
   edit scripts in `public/`
4. If you are checking final output:
   inspect `dist/` after `npm run build`
5. If you are looking at root-level HTML files:
   assume they are legacy unless you have explicit deployment evidence

## Estimator Ownership Boundary

The active estimator experience is currently controlled by:

- `src/pages/estimator/index.astro`
- `public/estimator.js`

Do not assume these older files drive the same behavior:

- `assets/app.js`
- root-level `estimator/`
- `data/state-costs.json`

Those files may still be useful as reference, but they are not the current production default.

## Safe Release Boundary

Before launch work, confirm all changes were made in:

- `src/`
- `public/`

Then verify with:

```bash
npm run build
```

Only review `dist/` after the build finishes.

## If Legacy Cleanup Happens Later

If the team decides to remove or quarantine the old static structure, preferred options are:

1. Move legacy files into a dedicated folder such as `legacy-static-site/`
2. Remove them entirely if there is no deployment dependency
3. Keep them only if there is confirmed operational value

Until that cleanup is complete, keep treating them as read-only reference material.
