# Submission Technical Checklist

Date: 2026-03-15
Project: `f:\www\www7`

## Purpose

This checklist confirms whether the site is technically safe to submit to search engines.

## Current Finding Snapshot

Evidence captured on 2026-03-15:

- live homepage currently emits `noindex, nofollow`
- live homepage currently emits `x-site-config=missing-production-site-url`
- live `robots.txt` currently returns `Disallow: /`
- live `sitemap.xml` is currently empty

Root cause identified:

- the deployment path is building without production indexing environment variables
- the required values are `SITE_URL=https://www.carecostintel.com` and `PUBLIC_ALLOW_INDEXING=true`

Release gate:

- do not submit to Google Search Console or Bing until a fresh production deploy confirms corrected output

## Core Domain Checks

- [ ] `http://carecostintel.com` redirects to `https://www.carecostintel.com`
- [ ] `https://carecostintel.com` redirects to `https://www.carecostintel.com`
- [ ] `http://www.carecostintel.com` redirects to `https://www.carecostintel.com`
- [ ] `https://www.carecostintel.com` loads directly

## Core Route Checks

- [ ] `/`
- [ ] `/about/`
- [ ] `/estimator/`
- [ ] `/guides/`
- [ ] `/state-costs/`
- [ ] `/privacy/`
- [ ] `/contact/`
- [ ] `/methodology/`

## Representative Deep Route Checks

- [ ] `/state-costs/california/`
- [ ] `/state-costs/texas/`
- [ ] `/state-costs/florida/`
- [ ] `/guides/assisted-living-costs-2026/`
- [ ] `/guides/quote-collection-guide/`

## Build Verification

Run:

```bash
npm run build
```

Record:

- [ ] build exits successfully
- [ ] route generation completes without failures

## robots.txt Verification

Run:

```bash
Get-Content dist/robots.txt
```

Record:

- [ ] `robots.txt` exists
- [ ] output matches intended indexing posture
- [ ] no accidental `Disallow: /` remains when submission is intended

## sitemap Verification

Run:

```bash
Get-Content dist/sitemap.xml | Select-Object -First 20
```

Record:

- [ ] `sitemap.xml` exists
- [ ] sitemap is not empty
- [ ] URLs use the production domain
- [ ] no localhost URLs appear

## Representative Metadata Checks

Inspect generated files:

- `dist/index.html`
- `dist/about/index.html`
- `dist/estimator/index.html`
- `dist/guides/index.html`
- `dist/state-costs/index.html`

Record:

- [ ] title exists
- [ ] description exists
- [ ] canonical output is correct
- [ ] no localhost leakage remains

## Production Environment Checks

- [ ] `SITE_URL` is set to the production origin when submission is intended
- [ ] `PUBLIC_ALLOW_INDEXING` is intentionally configured for the intended release state
- [ ] deployment entrypoint exports those values into the build process

## Decision

- [ ] Technical submission checks pass
- [ ] Technical submission is blocked pending fixes
