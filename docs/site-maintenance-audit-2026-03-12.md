# Site Maintenance Audit

Date: 2026-03-12
Project: `f:\www\www7`

## Purpose

This document captures the current site architecture, the active source-of-truth files, legacy artifacts still present in the repository, and the highest-priority maintenance actions.

## Current Product Positioning

The site is a planning-focused senior care cost product under the `CareCost Intelligence` brand.

Primary user flow:

1. Read homepage positioning and trust signals.
2. Use the estimator to model a monthly and annual care-cost range.
3. Validate assumptions with state guides and care-type guides.
4. Move to quote collection and decision checklists.

This is not a simple marketing site. It is a tool-first SEO content site with the estimator as the main conversion point.

## Active Source Of Truth

The current active implementation is the Astro site in `src/` plus browser scripts in `public/`.

Key source-of-truth paths:

- `src/layouts/BaseLayout.astro`
- `src/components/Nav.astro`
- `src/components/Footer.astro`
- `src/pages/`
- `src/styles/global.css`
- `public/estimator.js`
- `public/state-tools.js`
- `public/guide-tools.js`
- `astro.config.mjs`

Build output:

- `dist/`

This output should be treated as generated artifacts, not hand-maintained source.

## High-Level Site Map

Core pages:

- `/` home and trust-building entry
- `/estimator/` interactive cost calculator and report flow
- `/state-costs/` state guide hub
- `/care-types/` care-type comparison hub
- `/guides/` long-form guide hub

Trust and compliance pages:

- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`
- `/disclaimer/`
- `/accessibility/`
- `/advertising-disclosure/`
- `/editorial-policy/`
- `/data-sources/`
- `/updates/`
- `/glossary/`
- `/sitemap/`

Deep content:

- 50 state pages plus DC under `src/pages/state-costs/*/index.astro`
- Multiple long-form guides under `src/pages/guides/*/index.astro`

## Architecture Notes

### Rendering

- Astro static output
- Shared layout handles SEO, metadata, schema, breadcrumb markup, top and bottom ad slots, reading progress, and back-to-top behavior

### Styling

- Global styling is centralized in `src/styles/global.css`
- Visual system is consistent across landing pages, guide pages, tool pages, and legal pages

### Client-side behavior

- `public/estimator.js` powers the calculator, validation, scenario comparison, report rendering, share links, and URL state persistence
- `public/state-tools.js` enhances state pages and state index navigation
- `public/guide-tools.js` adapts guide CTAs based on query params and current context

### SEO and indexing

- `src/pages/robots.txt.js` controls open vs blocked crawling based on environment flags
- `src/pages/sitemap.xml.js` generates sitemap entries from Astro page files
- Shared layout injects canonical, Open Graph, Twitter, and JSON-LD schema

## Legacy And Duplicate Assets Still In Repo

The repository currently contains older static-site artifacts alongside the Astro source.

Likely legacy or pre-Astro files:

- `index.html`
- `about/`
- `care-types/`
- `contact/`
- `estimator/`
- `guides/`
- `privacy/`
- `state-costs/`
- `assets/`

These directories contain standalone HTML and asset files that look like an earlier static site version.

Evidence:

- `assets/app.js` fetches `/state-costs.json` and uses a separate data-loading model from the current Astro estimator
- `state-costs/index.html` still references `/data/state-costs.json` as if the benchmark table is data-driven
- The current Astro build instead uses `src/` and `public/`, not `assets/`

## Data Reality Check

The repo contains:

- `data/state-costs.json`
- `data/weights.json`

Important observation:

- The active Astro estimator in `public/estimator.js` does not currently read from `data/state-costs.json`
- The active estimator contains its own weights and calculation rules in the script itself
- The older legacy `assets/app.js` is the code path that still expects `/state-costs.json`

Practical implication:

`data/` is not currently the live source of truth for the active estimator experience.

## Risks And Maintenance Traps

### Risk 1: Editing the wrong site

Because old static HTML pages exist beside the Astro source, it is easy to edit a file that no longer controls production behavior.

### Risk 2: Split logic across old and new implementations

Estimator logic exists in at least two places:

- active: `public/estimator.js`
- legacy: `assets/app.js`

This creates drift risk and confusion about which logic matters.

### Risk 3: Generated output committed beside source

`dist/` is present in the repository. That is fine if intentional for deployment, but it increases the chance of someone editing generated files or reviewing stale output as if it were source.

### Risk 4: Large template duplication in content pages

State pages and many guides appear highly templated. This is efficient, but it also means content quality and factual drift can propagate at scale if a base pattern is weak.

### Risk 5: Repository is not a Git working tree here

`git status` failed because this workspace is not currently recognized as a Git repository. Branch-based cleanup workflows are not available unless the real repo root is elsewhere.

## Recommended Maintenance Order

### 1. Declare the source of truth

Adopt the following rule for future work:

- Edit `src/` and `public/` for live site behavior
- Treat `dist/` as generated output
- Treat root-level static HTML directories as legacy until proven necessary

### 2. Quarantine or document legacy files

Choose one of these approaches:

- move old static files into a clearly named `legacy-static-site/` folder
- or keep them in place but add a repository note that they are not the active implementation

### 3. Consolidate estimator data ownership

Pick one canonical source for estimator configuration:

- keep config in `public/estimator.js`
- or move calculation constants into shared JSON loaded by the active implementation

Until that decision is made, avoid updating `data/state-costs.json` under the assumption that it changes the live Astro estimator.

### 4. Standardize content generation

The state pages are structurally similar enough that they would benefit from a stronger content-generation system or shared data model.

This would reduce:

- repeated copy blocks
- link inconsistencies
- manual drift across 50+ state pages

### 5. Add a maintainer readme

Add a short maintainer guide that explains:

- what powers production
- what is legacy
- how to build
- how to preview
- what not to edit

## Progress Since Audit

As of the latest rebuild pass on 2026-03-12:

- the trust and compliance layer has been strengthened
- the homepage has been rebuilt into a clearer routing page
- the estimator has been upgraded into a more guided decision workspace
- the guide hub and state hub have been restructured for stronger UX and SEO scanability
- representative state pages and representative guide pages have been rewritten around stronger summaries, next actions, and official-reference pathways

This means the main architecture direction is now clearer than it was at audit time:

- Astro under `src/` is the active implementation
- `public/` scripts are the live enhancement layer
- root static HTML should be treated even more clearly as legacy material

## Current Launch Boundary

The project is now closer to a controlled launch, but maintainers should still treat the following items as launch blockers or pre-launch checks:

- confirm that remaining long-tail pages match the newer UX/content quality standard
- verify production environment values for `SITE_URL` and `PUBLIC_ALLOW_INDEXING`
- run a full manual QA pass on homepage, estimator, guide hub, state hub, and key deep pages
- confirm legacy root HTML files are not part of the real deployment path

## Maintainer References

Use these files together:

- `README.md` for the working rules and release checklist
- `docs/legacy-structure-notes.md` for active-versus-legacy boundaries
- this audit for architecture context and risk tracking

## Suggested Next Tasks

Best next tasks in priority order:

1. Create a maintainer README that marks `src/` and `public/` as the active site.
2. Audit whether root-level static HTML folders are still deployed anywhere.
3. Remove or quarantine legacy static assets if they are no longer needed.
4. Refactor estimator constants so data ownership is explicit.
5. Refactor state pages into a stronger template + data pipeline.

## Safe Working Rule

If a future change affects production pages, start by checking the matching Astro file under `src/pages/` and any related script in `public/`. Do not begin from root-level `index.html` or `assets/` unless you are intentionally maintaining the legacy static version.
