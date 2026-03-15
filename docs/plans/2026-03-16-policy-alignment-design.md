# Policy Alignment Design

Date: 2026-03-16
Project: `f:\www\www7`

## Goal

Align public policy pages with the site's current real-world launch posture before search submission.

## Current Problem

The live site currently operates without active advertising scripts, affiliate monetization, or non-essential analytics. However, the public `privacy` and `advertising-disclosure` pages still read as if those systems are already active.

That creates three risks:

- policy wording conflicts with actual site behavior
- trust review can fail because disclosure pages overstate tracking and monetization
- search-submission readiness is weakened by avoidable credibility gaps

## Design Direction

The policy pages should describe the current state first and only describe future monetization or tracking as conditional future behavior.

This means:

- `privacy` should state that estimator inputs run locally in the browser and that non-essential analytics and advertising technologies are not currently active
- `advertising-disclosure` should state that ads and affiliate relationships are not currently active on the site
- any future-state language should be written in conditional form such as "if introduced later"

## Page-Level Design

### Privacy

Keep:

- browser-local estimator processing
- no server-side storage of estimator inputs
- what sensitive data is not collected
- link and third-party site boundary notes
- retention and contact sections

Change:

- replace the active "Analytics and advertising" section with a "Current tracking status" section
- remove wording that says analytics or advertising tools are currently in use
- remove wording that implies affiliate or partner links are already active
- adjust the meta description so it no longer claims active cookies or analytics

### Advertising Disclosure

Keep:

- editorial independence principles
- labeling and separation rules
- future placement guardrails
- contact path

Change:

- reframe the page as a current non-monetized disclosure with future guardrails
- remove wording that says the site currently earns from ads or affiliate links
- remove wording that says advertising networks currently use cookies on this site
- adjust the meta description so it reflects current inactive status plus future disclosure rules

## Verification Strategy

Because the repository does not have an existing test framework, use a lightweight Node verification script that reads the two Astro page source files and asserts:

- banned active-state phrases are absent
- required current-state phrases are present

Then rebuild the site and manually inspect the live output after deployment.
