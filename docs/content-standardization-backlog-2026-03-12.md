# Content Standardization Backlog

Date: 2026-03-12
Project: `f:\www\www7`

## Purpose

This backlog tracks which pages already reflect the stronger 2026 rebuild standard and which pages still need to be upgraded.

The target standard includes:

- stronger opening summary
- clearer next-step pathways
- better reading rhythm and scanability
- stronger estimator and state-guide routing
- visible trust and official-reference context

## Already Upgraded To The Newer Standard

Core pages:

- `/`
- `/estimator/`
- `/guides/`
- `/state-costs/`

Representative deep pages:

- `/state-costs/california/`
- `/state-costs/texas/`
- `/state-costs/florida/`
- `/state-costs/new-york/`
- `/state-costs/pennsylvania/`
- `/state-costs/illinois/`
- `/state-costs/ohio/`
- `/state-costs/arizona/`
- `/state-costs/washington/`
- `/guides/assisted-living-costs-2026/`
- `/guides/memory-care-costs/`
- `/guides/price-factors/`
- `/guides/quote-collection-guide/`
- `/guides/cost-planning-checklist/`
- `/guides/affording-assisted-living/`
- `/guides/nursing-home-costs/`
- `/guides/home-care-vs-assisted/`
- `/guides/care-tier-pricing/`
- `/guides/choosing-a-facility-checklist/`
- `/guides/assisted-vs-nursing-home/`
- `/guides/home-care-hourly-vs-live-in/`
- `/guides/move-in-fees/`
- `/state-costs/massachusetts/`
- `/state-costs/north-carolina/`
- `/state-costs/georgia/`
- `/state-costs/virginia/`
- `/state-costs/colorado/`
- `/state-costs/michigan/`
- `/state-costs/new-jersey/`
- `/state-costs/maryland/`
- `/state-costs/tennessee/`
- `/state-costs/indiana/`
- `/state-costs/missouri/`
- `/state-costs/wisconsin/`
- `/state-costs/oregon/`
- `/state-costs/minnesota/`
- `/state-costs/south-carolina/`
- `/state-costs/connecticut/`
- `/state-costs/nevada/`
- `/state-costs/utah/`
- `/state-costs/new-hampshire/`
- `/state-costs/rhode-island/`
- `/state-costs/vermont/`
- `/state-costs/delaware/`
- `/state-costs/maine/`
- `/state-costs/kansas/`
- `/state-costs/alabama/`
- `/state-costs/alaska/`
- `/state-costs/arkansas/`
- `/state-costs/district-of-columbia/`
- `/state-costs/hawaii/`
- `/state-costs/idaho/`
- `/state-costs/iowa/`
- `/state-costs/kentucky/`
- `/state-costs/louisiana/`
- `/state-costs/mississippi/`
- `/state-costs/montana/`
- `/state-costs/nebraska/`
- `/state-costs/new-mexico/`
- `/state-costs/north-dakota/`
- `/state-costs/oklahoma/`
- `/state-costs/south-dakota/`
- `/state-costs/west-virginia/`
- `/state-costs/wyoming/`

## Remaining Guide Pages That Still Use The Older Dense Pattern

- none currently identified in `src/pages/guides/*/index.astro`
- final launch QA still required before treating the guide set as closed

## Remaining State Pages That Still Use The Older Dense Pattern

- none currently identified in `src/pages/state-costs/*/index.astro`
- strict QA still required for the final rewritten set before treating the sweep as fully closed

## Recommended Next Execution Order

Batch C completed:

- `assisted-vs-nursing-home`
- `home-care-hourly-vs-live-in`
- `move-in-fees`
- `massachusetts`
- `north-carolina`
- `georgia`

Batch D completed:

- `virginia`
- `colorado`
- `michigan`

Batch E:

- `new-jersey`
- `maryland`
- `tennessee`

Batch F:

- `indiana`
- `missouri`
- `wisconsin`

Batch G:

- `oregon`
- `minnesota`
- `south-carolina`

Batch H:

- `connecticut`
- `nevada`
- `utah`

Batch I:

- `new-hampshire`
- `rhode-island`
- `vermont`

Batch J:

- `delaware`
- `maine`
- `kansas`

Batch K:

- `alabama`
- `alaska`
- `arkansas`

Batch L:

- `district-of-columbia`
- `hawaii`
- `idaho`

Batch M:

- `iowa`
- `kentucky`
- `louisiana`

Batch N:

- `mississippi`
- `montana`
- `nebraska`

Batch O:

- `new-mexico`
- `north-dakota`
- `oklahoma`

Batch P rewritten:

- `south-dakota`
- `west-virginia`
- `wyoming`

- final long-tail state rewrite completed
- final long-tail state QA pending
- final documentation cleanup
- shared state-template refactor exploration

## Future Refactor Recommendation

The remaining state pages are similar enough that they should eventually move toward a stronger shared data-driven template.

Benefits:

- less repeated copy
- easier factual updates
- cleaner city/program/source management
- lower risk of drift across 50+ pages

Until that refactor happens, use this backlog to keep upgrades deliberate and consistent.
