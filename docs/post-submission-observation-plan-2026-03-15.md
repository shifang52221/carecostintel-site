# Post-Submission Observation Plan

Date: 2026-03-15
Project: `f:\www\www7`
Observation window: first 30 days after sitemap submission

## Purpose

This plan keeps the launch stable after submission so crawl and indexing signals are easier to interpret.

## What To Watch

Track these items during the first 30 days:

- sitemap fetch and parse status
- crawl errors
- indexed page count trend
- canonical issues
- pages discovered but not indexed
- mobile usability issues if surfaced
- manual action or security notifications

## Review Rhythm

Use this minimum cadence:

- Day 1: confirm sitemap acceptance and homepage inspection status
- Day 3: review crawl and coverage signals again
- Day 7: review representative core and deep URLs
- Day 14: review whether indexing is spreading beyond the homepage
- Day 30: summarize what is indexed, what is excluded, and whether the site is ready for the next phase

## Representative URL Set

Use the same review set each time:

- `https://www.carecostintel.com/`
- `https://www.carecostintel.com/about/`
- `https://www.carecostintel.com/estimator/`
- `https://www.carecostintel.com/state-costs/`
- `https://www.carecostintel.com/guides/`
- `https://www.carecostintel.com/state-costs/california/`
- `https://www.carecostintel.com/guides/quote-collection-guide/`

## What Not To Change Too Soon

Avoid these during the first two weeks unless a critical bug forces action:

- large URL changes
- canonical host changes
- major navigation rewrites
- mass content rewrites
- ad or analytics script additions
- unnecessary design churn

## Escalation Rules

Escalate and investigate before changing content strategy if any of the following appear:

- `robots.txt` unexpectedly blocks crawling again
- sitemap becomes empty or inaccessible
- homepage remains excluded after technical signals are correct
- canonical tags revert to localhost or the wrong host
- a large group of pages shows the same exclusion reason

## Exit Criteria

The first observation window is considered healthy when:

- sitemap remains valid
- core pages are indexed or clearly progressing toward indexing
- no major crawl or canonical errors remain
- trust and policy pages stay aligned with real site behavior

## Next-Phase Recommendation

Only after the 30-day window looks stable should the project consider:

- non-essential analytics
- monetization experiments
- larger content structure changes
