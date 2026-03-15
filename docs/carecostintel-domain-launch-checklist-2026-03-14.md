# CareCostIntel Domain Launch Checklist

Date: 2026-03-14
Project: `f:\www\www7`
Primary domain: `carecostintel.com`

## Goal

This checklist covers the domain-specific work required to move the site from local or staging setup to a real production launch on the newly purchased domain.

## Recommended Canonical Domain

Recommended final canonical origin:

- `https://www.carecostintel.com`

Recommended redirect behavior:

- `https://carecostintel.com` -> `https://www.carecostintel.com`

Reason:

- keeps one consistent canonical host
- avoids split indexing between naked and `www`
- works well with sitemap, canonical tags, and Search Console setup

## 1. Registrar And DNS

Before launch, confirm:

- the domain is active in the registrar account
- nameservers are pointed to the intended hosting or DNS provider
- DNS records exist for both:
  - `carecostintel.com`
  - `www.carecostintel.com`

If the hosting provider supports automatic DNS setup, confirm the final records match the provider instructions.

## 2. Hosting And Domain Attachment

In the deployment platform:

- add `carecostintel.com`
- add `www.carecostintel.com`
- configure the primary production domain as `www.carecostintel.com`
- configure naked-domain redirect to `www`

## 3. SSL

Before launch, confirm:

- HTTPS certificate is issued successfully
- both `carecostintel.com` and `www.carecostintel.com` resolve over HTTPS
- redirect behavior does not create loops

## 4. Environment Variables

For production, set:

```env
SITE_URL=https://www.carecostintel.com
PUBLIC_ALLOW_INDEXING=true
```

Important:

- keep `PUBLIC_ALLOW_INDEXING=false` for local, preview, and staging
- only enable `PUBLIC_ALLOW_INDEXING=true` when you are intentionally ready for public indexing

If ads are planned later, also review:

- `PUBLIC_ADS_ENABLED`

Do not enable ads until launch compliance checks are closed.

## 5. Build Verification

After setting the production domain values, run:

```bash
npm run build
Get-Content dist/robots.txt
Get-Item dist/sitemap.xml | Select-Object Length
```

Verify:

- `robots.txt` allows crawling when production indexing is intended
- sitemap is populated
- sitemap URLs use `https://www.carecostintel.com`
- no `localhost` URLs remain in metadata output

## 6. Metadata And Canonical QA

Check representative pages:

- `/`
- `/estimator/`
- `/state-costs/`
- `/guides/`
- one representative state page
- one representative guide page

Verify:

- canonical tag uses `https://www.carecostintel.com/...`
- Open Graph URLs use the same production origin
- structured data URLs use the same production origin

## 7. Search Console

Set up Google Search Console after domain attachment:

- add the domain property if preferred
- or add the exact URL-prefix property for `https://www.carecostintel.com`
- verify ownership
- submit the production sitemap

Recommended sitemap:

- `https://www.carecostintel.com/sitemap.xml`

## 8. Email And Trust Layer

Recommended initial addresses:

- `hello@carecostintel.com`
- `privacy@carecostintel.com`
- `editorial@carecostintel.com`
- `support@carecostintel.com`

Minimum launch recommendation:

- have at least one real inbox active for contact and trust pages

## 9. Policy And Footer Consistency

Before launch, review:

- `/privacy/`
- `/advertising-disclosure/`
- `/editorial-policy/`
- `/contact/`
- site footer

Verify:

- domain references are correct
- contact email matches the live domain
- policy wording matches real tracking and advertising behavior

## 10. Compliance Reminder

Before enabling analytics or ads on `carecostintel.com`, complete:

- `docs/launch-compliance-checklist-2026-03-14.md`

Rule:

- no ads and no analytics: launch can proceed without consent UI if policy wording is accurate
- ads or analytics enabled: consent and privacy-preferences work becomes a launch blocker

## 11. Final Release Checklist

Before calling the domain launch ready, confirm:

- domain resolves correctly
- SSL works
- canonical host is finalized
- `SITE_URL` is correct
- production build passes
- robots and sitemap are correct
- representative pages render correctly
- Search Console is ready
- contact email is live
- compliance decision is closed

## Status

Current status: `Ready for domain attachment and production configuration`
