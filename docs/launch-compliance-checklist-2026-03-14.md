# Launch Compliance Checklist

Date: 2026-03-14
Project: `f:\www\www7`

## Purpose

This checklist captures the minimum privacy and consent decisions that must be closed before real public launch and search submission.

It exists to prevent a common failure mode:

- ads or analytics get enabled late
- privacy disclosures already mention cookies or tracking
- no actual consent or preferences system is in place

## Current Project Reality

As of 2026-03-15:

- the site has privacy and advertising disclosure pages
- estimator behavior uses browser storage for local planning data
- there is not yet a real consent banner or preferences center in the active Astro app
- the current recommended submission posture is no ads and no non-essential analytics

This means privacy and consent work is not the immediate blocker only if production really stays in that low-tracking posture.

## Launch Decision Gate

Before submission and launch, answer this question clearly:

### Are analytics, ad tech, or tracking scripts enabled in production?

If the answer is `no`:

- confirm that only necessary or local functionality is active
- confirm privacy and advertising pages do not overstate active tracking behavior
- confirm no third-party tracking scripts were added through layout, tag manager, or deployment settings

If the answer is `yes`:

- do not launch without a real consent and privacy-preferences flow
- do not rely on privacy-policy text alone
- do not load non-essential scripts before user choice is applied where required by your launch plan

## Required Pre-Launch Checks

### 1. Script inventory

Confirm whether production includes any of the following:

- Google Analytics
- Google Tag Manager
- AdSense or other ad network scripts
- Meta Pixel
- Hotjar, Microsoft Clarity, or similar session or behavior tools
- affiliate tracking scripts
- third-party embeds that set tracking cookies

### 2. Browser storage review

Confirm what client storage is used:

- `localStorage`
- `sessionStorage`
- cookies

Document whether each item is:

- necessary for core site behavior
- optional analytics
- optional advertising or targeting

### 3. Consent and preferences

If non-essential tracking is active, confirm all of the following:

- a visible consent banner or equivalent first-visit notice exists
- users can reject non-essential tracking as clearly as they can accept it
- a persistent `Privacy Settings` or similar link exists
- changes in preferences actually affect script loading behavior

### 4. State privacy readiness

Because this site targets the United States and state-level traffic, confirm launch readiness for:

- targeted advertising opt-out expectations
- privacy preference signal handling strategy
- documented approach for California and other state-law traffic

This does not require a fifty-state custom build on day one, but it does require a clear launch position and a real user-choice flow if tracking is enabled.

### 5. Policy alignment

Before launch, verify that these pages match real behavior:

- `/privacy/`
- `/advertising-disclosure/`
- `/terms/`

Check:

- if tracking is not active, do not imply a broader live tracking setup than actually exists
- if tracking is active, explain it consistently with the real implementation
- if browser storage is used locally by the estimator, describe that accurately

## Practical Launch Rule

Use this rule for release:

- no ads and no analytics: launch and search submission may proceed without a consent banner, but privacy wording must still be accurate
- ads or analytics enabled: consent and privacy-preferences work becomes a blocker before launch

## Recommended Implementation When Ready

When this work is scheduled, implement at least:

- a privacy or cookie preferences banner
- categories for `Necessary`, `Analytics`, and `Advertising`
- default non-essential categories off until user choice is applied
- a persistent footer link to reopen preferences
- policy text updated to match the final implementation

## Current Recommended Posture

Current recommended posture for the initial submission phase:

- no advertising scripts
- no non-essential analytics scripts
- no consent banner yet
- accurate privacy and policy wording

## Status

Current status: `Clear for initial search submission only if non-essential tracking remains off`
