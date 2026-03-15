# Project Next Actions

Date: 2026-03-14
Project: `f:\www\www7`

## Summary

The site is close to launch-readiness.

The rewrite pass is complete for the current known page set, but the final verification pass is still open:

- remaining state pages to rewrite: 0
- remaining guide pages to rewrite: 0
- remaining QA validation status: open

## Remaining Content Upgrade Tasks

### State pages still pending strict QA confirmation

- `/state-costs/south-dakota/`
- `/state-costs/west-virginia/`
- `/state-costs/wyoming/`

### Guide pages still pending strict QA confirmation

- representative guide pages still need launch-pass QA even though no rewrite gap is currently identified

## Recommended Immediate Execution Order

### Step 1

Run focused manual QA on the most important entry and conversion pages:

- `/`
- `/estimator/`
- `/state-costs/`
- `/guides/`
- `/state-costs/california/`
- `/state-costs/texas/`
- `/state-costs/florida/`
- `/state-costs/south-dakota/`
- `/state-costs/west-virginia/`
- `/state-costs/wyoming/`
- `/guides/assisted-living-costs-2026/`
- `/guides/quote-collection-guide/`

### Step 2

Run a targeted QA pass on the final three rewritten state pages:

- `/state-costs/south-dakota/`
- `/state-costs/west-virginia/`
- `/state-costs/wyoming/`

Check:

- layout remains stable on mobile
- headings and sections scan cleanly
- internal links route correctly
- estimator CTAs are visible
- trust and reference sections are present

### Step 3

Confirm production release configuration:

- `SITE_URL` uses the final production origin
- `PUBLIC_ALLOW_INDEXING=false` outside production
- `PUBLIC_ALLOW_INDEXING=true` only when launch is intentional

Verification commands:

```bash
npm run build
Get-Content dist/robots.txt
Get-Item dist/sitemap.xml | Select-Object Length
```

### Step 4

Confirm deployment source boundaries:

- Astro source under `src/` is the only active site source
- `public/` is the active browser-script layer
- root-level legacy HTML folders are not part of active deployment
- `dist/` is treated as generated output

## QA Checklist

Use this checklist during final review:

- page title is specific and useful
- meta description is not weak or duplicated
- hero and first section explain the page clearly
- next-step CTAs appear early enough
- estimator links are visible and relevant
- state/guide cross-links feel intentional
- trust pages remain reachable from the layout
- no obvious thin or repetitive sections remain
- page is readable on desktop and narrow mobile widths

## Project Status In One Line

This project is mostly done, and the clearest next move is to run launch QA, confirm production config, and verify deployment boundaries.
