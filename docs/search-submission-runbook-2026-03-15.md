# Search Submission Runbook

Date: 2026-03-15
Project: `f:\www\www7`
Canonical property: `https://www.carecostintel.com`
Primary sitemap: `https://www.carecostintel.com/sitemap.xml`

## Purpose

This runbook defines the exact order for submitting the site to Google and Bing after technical and trust audits pass.

## Preconditions

Do not submit until all of the following are true:

- live homepage returns `index, follow`
- live `robots.txt` allows crawling
- live `sitemap.xml` is populated and uses `https://www.carecostintel.com`
- representative core and deep routes load successfully
- privacy, advertising, and trust wording match actual launch behavior
- the initial launch posture remains no ads and no non-essential analytics

## Google Search Console

Recommended property:

- URL-prefix property for `https://www.carecostintel.com`

Submission order:

1. Sign in to Google Search Console.
2. Add or open the property for `https://www.carecostintel.com`.
3. Verify ownership if the property is new.
4. Open the `Sitemaps` report.
5. Submit `https://www.carecostintel.com/sitemap.xml`.
6. Use URL Inspection for:
   - `https://www.carecostintel.com/`
   - `https://www.carecostintel.com/estimator/`
   - `https://www.carecostintel.com/state-costs/california/`
   - `https://www.carecostintel.com/guides/quote-collection-guide/`
7. If inspection shows the page can be indexed, request indexing for the homepage and one or two representative pages only.

What to record:

- date submitted
- property type used
- sitemap submission status
- any coverage or crawl warnings surfaced immediately

## Bing Webmaster Tools

Submission order:

1. Sign in to Bing Webmaster Tools.
2. Add or open the site for `https://www.carecostintel.com`.
3. Verify ownership if needed.
4. Submit `https://www.carecostintel.com/sitemap.xml`.
5. Check that the sitemap is accepted without obvious fetch or format errors.
6. Inspect the homepage and one representative deep URL inside Bing Webmaster Tools if the interface exposes URL inspection for the property.

What to record:

- date submitted
- verification method
- sitemap acceptance status
- any crawl or indexing warnings surfaced immediately

## Immediate Post-Submission Checks

Within the same day, confirm:

- `site:carecostintel.com` is not used as a success metric yet
- Google Search Console shows the sitemap as submitted
- Bing Webmaster Tools shows the sitemap as submitted
- no one enables ads, analytics, or major content churn during the first observation window

## Notes

- sitemap submission is a crawl hint, not a guarantee of indexing
- keep the sitemap at the site root and keep URLs absolute
- do not submit while `robots.txt` still blocks crawling

## Reference Links

- Google Search Central: https://developers.google.com/search/docs/monitor-debug/search-console-start
- Google Search Central sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Bing Webmaster Tools: https://www.bing.com/webmasters/
- Bing Webmaster documentation: https://learn.microsoft.com/en-us/bingwebmaster/
