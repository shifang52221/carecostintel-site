# Launch Readiness Checklist

Date: 2026-03-12
Project: `f:\www\www7`

## Purpose

This checklist is for the final stretch before public launch.

It focuses on:

- release safety
- SEO correctness
- UX quality
- monetization-safe setup
- maintainable production operations

## 1. Production Configuration

Before opening indexing:

- set `SITE_URL` to the exact production canonical origin
- set `PUBLIC_ALLOW_INDEXING=true` only in real production
- keep `PUBLIC_ALLOW_INDEXING=false` in local, preview, and staging
- confirm `PUBLIC_ADS_ENABLED` matches the intended production ad behavior

Verification:

```bash
npm run build
Get-Content dist/robots.txt
Get-Item dist/sitemap.xml | Select-Object Length
```

Production expectation:

- `robots.txt` allows crawling
- sitemap is populated
- canonical URLs use the real production domain

## 2. Core UX QA

Manually verify these pages on desktop and mobile:

- homepage
- estimator
- state hub
- guide hub
- California guide
- Texas guide
- Florida guide
- assisted living guide
- quote collection guide

Checklist:

- primary buttons are visible and clickable
- no broken layout at narrow widths
- sticky areas do not cover content
- accordions and in-page anchors work
- state and guide links route to the expected page
- estimator form, report, share link, and baseline comparison all work

## 3. SEO QA

Verify:

- page titles are unique and useful
- descriptions are not duplicated across core pages
- canonical tags resolve to production URLs
- trust pages are accessible from header or footer
- core pages expose strong internal links to the estimator, guides, and state pages
- representative guides and state pages include structured data and visible trust signals

Search launch tasks:

- set up Google Search Console for the production domain
- submit the production sitemap after indexing is intentionally opened
- check that key pages render correctly in URL Inspection

## 4. Content Quality Gate

Before public launch, hold content to this rule:

- no page should feel obviously thinner, older, or less trustworthy than the homepage and estimator

Prioritize review of:

- remaining legacy-style state pages
- remaining legacy-style guide pages
- pages with dense templated sections and weak opening summaries

If a page is not ready, it is better to improve it before scaling traffic than to rely on the stronger pages to carry the site.

## 5. Monetization And AdSense Safety

Keep these principles in place:

- ads should not interrupt the primary planning task
- trust and editorial pages must remain easy to access
- the site should read like a helpful product and information resource, not an ad shell
- pages should avoid thin, repetitive, or low-originality content
- medical, legal, and financial boundaries should stay clearly disclosed

Before enabling ads broadly:

- confirm ad placements do not push core content below the fold on mobile
- confirm ad labels and ad areas are visually distinct
- keep the estimator report and trust sections readable even if ads load
- ensure privacy, terms, disclaimer, advertising disclosure, contact, editorial policy, methodology, and data sources pages are all published and linked

## 6. Analytics And Operations

Before launch:

- confirm analytics and consent behavior match the production plan
- confirm error pages and broken-route handling work
- confirm favicon, Open Graph image, and basic share previews are correct
- confirm domain, SSL, and deployment routing are stable

After launch:

- monitor Search Console indexing and coverage
- monitor which pages attract initial impressions
- review whether users enter through guides, state pages, or the homepage
- prioritize next content upgrades based on actual entry pages

## 7. Final Go / No-Go Questions

Ask these before flipping production indexing on:

1. Would a first-time visitor trust the site after landing on any major entry page?
2. Does the estimator feel like a genuine planning tool rather than a thin lead magnet?
3. Are the remaining legacy-style pages good enough to be crawled and judged with the rest of the site?
4. Is the production domain and canonical setup confirmed?
5. Are ads, if enabled, clearly secondary to the user task?

If the answer to any of these is no, fix that issue before opening indexing widely.
