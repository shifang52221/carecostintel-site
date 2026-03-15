# Final State Pages Design

Date: 2026-03-14
Project: `f:\www\www7`

## Goal

Bring the final three remaining legacy-style state cost pages onto the same 2026 rebuild standard already used by the upgraded state pages.

Target pages:

- `src/pages/state-costs/south-dakota/index.astro`
- `src/pages/state-costs/west-virginia/index.astro`
- `src/pages/state-costs/wyoming/index.astro`

## Problem

These three pages still use the older dense state-page pattern:

- long stacked sections
- heavier table and FAQ density
- weaker top-of-page summary framing
- weaker scanability compared to the stronger California-style rebuild pages

This creates a quality mismatch near launch, even though the rest of the state hub has already been upgraded.

## Recommended Approach

Rewrite each of the final three pages to match the newer summary-first state-page model already present in upgraded pages like California.

This means each page should include:

- a cleaner top section with a short state planning framing
- a summary grid with fast-answer style guidance
- early routing into estimator and state hub actions
- official state-source checks presented clearly
- a metro comparison section
- quote-validation and quote-trap guidance
- a compact comparison table
- care-pattern and next-step sections

## Alternatives Considered

### Option 1: Full shared template refactor now

Pros:

- reduces duplication immediately
- creates a cleaner long-term authoring model

Cons:

- larger scope than needed for launch
- higher risk of regressions across many already-upgraded pages
- slower path to finishing the final three pages

### Option 2: Minimal documentation-only sync

Pros:

- fastest possible change
- no code edits

Cons:

- would leave the final three pages visibly inconsistent
- does not actually solve the content-quality mismatch

### Option 3: Direct page rewrites to the proven newer pattern

Pros:

- smallest change that fixes the real problem
- consistent with existing upgraded state pages
- low architectural risk
- fast to verify

Cons:

- some duplication remains until a future shared-template refactor

## Chosen Design

Use Option 3.

Each of the three pages will be rewritten to the same high-level structure:

1. Page metadata object with state, metros, region, updated date, and description.
2. State source list for official verification links.
3. Structured FAQ schema and article schema.
4. Summary-first hero section with strong routing.
5. Market snapshot and guide-usage section.
6. Metro comparison section.
7. Official state checks section.
8. Quote workflow and quote-trap section.
9. City comparison table.
10. Care-pattern section.
11. Final next-step section with estimator and related-guide routing.

## Content Rules

- Do not introduce unsupported numeric averages.
- Keep the existing state-specific metro pairings.
- Preserve official state-source links and state-program context.
- Keep CTAs estimator-first and trust-forward.
- Match tone and scanability of the already-upgraded state pages.

## Verification

Success means:

- all three pages build successfully
- all three pages visually match the newer state-page content model
- backlog docs no longer list these pages as pending
- project next-actions doc reflects that content-standardization gap is cleared
