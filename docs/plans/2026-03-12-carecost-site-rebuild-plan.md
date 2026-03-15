# CareCost Site Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the current CareCost Intelligence Astro site into a clearer, more trustworthy, more SEO-ready, and more AdSense-friendly product without changing the topic or language.

**Architecture:** Keep Astro as the site framework and improve the platform in layers: first production SEO and trust infrastructure, then homepage and estimator experience, then state/guide templates, and finally monetization-safe ad behavior. Avoid broad route changes; improve shared templates and core pages first so long-tail content inherits better quality.

**Tech Stack:** Astro 5, static output, Tailwind CSS via global stylesheet, vanilla browser JavaScript in `public/`

---

### Task 1: Audit and lock the production indexing configuration

**Files:**
- Modify: `f:\www\www7\README.md`
- Modify: `f:\www\www7\src\pages\robots.txt.js`
- Modify: `f:\www\www7\src\pages\sitemap.xml.js`
- Modify: `f:\www\www7\src\layouts\BaseLayout.astro`
- Modify: `f:\www\www7\.env.example`

**Step 1: Write the failing test**

There is no existing automated test harness in this repo. Use a verification-first static-output check instead of a unit test.

Define the failure condition:

- production build should not emit `Disallow: /` when production indexing is enabled
- canonical and sitemap output should not use `http://localhost:4321` in production mode

**Step 2: Run verification to confirm current failure mode**

Run:

```bash
npm run build
Get-Content dist/robots.txt
Get-Content dist/sitemap.xml -TotalCount 5
```

Expected current behavior:

- build succeeds
- local build can still emit blocked robots output or localhost sitemap values if production env is not explicitly configured

**Step 3: Write minimal implementation**

Implement a safer documented production-indexing contract:

- clarify required env values in `.env.example`
- ensure `README.md` explains how production indexing should be enabled
- tighten `robots.txt`, sitemap, and canonical behavior so production configuration is explicit and maintainable

**Step 4: Run verification to confirm the improvement**

Run:

```bash
npm run build
Get-Content dist/robots.txt
Get-Content dist/sitemap.xml -TotalCount 5
```

Expected:

- build succeeds
- behavior is clearly tied to production env setup
- repository docs make the production-safe configuration obvious

**Step 5: Commit**

Cannot commit here because `f:\www\www7` is not currently a Git working tree.

### Task 2: Strengthen the trust and identity layer across templates

**Files:**
- Modify: `f:\www\www7\src\layouts\BaseLayout.astro`
- Modify: `f:\www\www7\src\components\Footer.astro`
- Modify: `f:\www\www7\src\pages\about\index.astro`
- Modify: `f:\www\www7\src\pages\contact\index.astro`
- Modify: `f:\www\www7\src\pages\editorial-policy\index.astro`
- Modify: `f:\www\www7\src\pages\data-sources\index.astro`
- Modify: `f:\www\www7\src\pages\updates\index.astro`
- Create: `f:\www\www7\src\pages\methodology\index.astro`

**Step 1: Write the failing test**

Use a content-completeness checklist as the failing condition:

- site should expose who runs the site
- site should explain editorial review and methodology
- site should provide an obvious corrections path
- site should provide a stronger contact surface

Current failure:

- trust signals exist but are not yet strong enough or consistently centralized

**Step 2: Run verification to confirm current gap**

Run:

```bash
Get-Content src/pages/about/index.astro
Get-Content src/pages/contact/index.astro
Get-Content src/pages/editorial-policy/index.astro
Get-Content src/pages/data-sources/index.astro
Get-Content src/pages/updates/index.astro
```

Expected:

- pages exist
- trust content is present but incomplete or too generic for a stronger YMYL-style presentation

**Step 3: Write minimal implementation**

Implement:

- a clearer site-identity story
- a stronger methodology page
- stronger corrections/update framing
- improved footer-level trust navigation

**Step 4: Run verification to confirm the improvement**

Run:

```bash
npm run build
```

Expected:

- build succeeds
- trust-layer pages and global navigation remain valid

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.

### Task 3: Rebuild the homepage into a high-trust routing page

**Files:**
- Modify: `f:\www\www7\src\pages\index.astro`
- Modify: `f:\www\www7\src\styles\global.css`

**Step 1: Write the failing test**

Use a page-structure checklist:

- homepage should explain the site in one clear value proposition
- homepage should route users into estimator, state guides, or planning content
- homepage should show trust without drowning the hero in text

Current failure:

- homepage contains useful information, but the structure is still closer to a content collage than a strong first-visit conversion page

**Step 2: Run verification to confirm current gap**

Run:

```bash
Get-Content src/pages/index.astro
```

Expected:

- current homepage is content-rich but not yet optimized around intent-based routing and trust-first hierarchy

**Step 3: Write minimal implementation**

Implement:

- new hero
- stronger trust block
- three-path intent routing
- cleaner homepage section order

**Step 4: Run verification to confirm the improvement**

Run:

```bash
npm run build
```

Expected:

- build succeeds
- homepage remains valid and styled

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.

### Task 4: Upgrade the estimator page into the primary decision workspace

**Files:**
- Modify: `f:\www\www7\src\pages\estimator\index.astro`
- Modify: `f:\www\www7\public\estimator.js`
- Modify: `f:\www\www7\src\styles\global.css`

**Step 1: Write the failing test**

Use a behavior checklist:

- estimator should better explain why inputs matter
- result area should better explain what to do next
- the page should feel guided rather than purely form-driven

Current failure:

- estimator is functional and valuable, but trust framing and decision support can be improved substantially

**Step 2: Run verification to confirm current gap**

Run:

```bash
Get-Content src/pages/estimator/index.astro
Get-Content public/estimator.js
```

Expected:

- calculator logic exists
- current experience is strong but still more utilitarian than premium decision-support UX

**Step 3: Write minimal implementation**

Implement:

- clearer setup language
- stronger reassurance copy
- improved results framing
- stronger state-guide and guide routing from outcomes

**Step 4: Run verification to confirm the improvement**

Run:

```bash
npm run build
```

Expected:

- build succeeds
- estimator scripts still load and page output remains valid

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.

### Task 5: Refactor state-guide templates for stronger uniqueness and scanability

**Files:**
- Modify: `f:\www\www7\src\styles\global.css`
- Modify: representative state pages first, including:
  - `f:\www\www7\src\pages\state-costs\index.astro`
  - `f:\www\www7\src\pages\state-costs\california\index.astro`
  - `f:\www\www7\src\pages\state-costs\texas\index.astro`
  - `f:\www\www7\src\pages\state-costs\florida\index.astro`

**Step 1: Write the failing test**

Use a template-quality checklist:

- state pages should open with fast-value summaries
- state pages should feel location-aware, not just long-form template blocks
- state guide hub should better route by user need

Current failure:

- current pages are useful but highly templated and visually dense

**Step 2: Run verification to confirm current gap**

Run:

```bash
Get-Content src/pages/state-costs/index.astro
Get-Content src/pages/state-costs/california/index.astro -TotalCount 220
```

Expected:

- current state content is extensive but can be improved for uniqueness and scanning

**Step 3: Write minimal implementation**

Implement:

- stronger state-page opening modules
- improved state hub UX
- enhanced location-specific decision cues

**Step 4: Run verification to confirm the improvement**

Run:

```bash
npm run build
```

Expected:

- build succeeds
- representative state pages render correctly

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.

### Task 6: Rebuild guide templates into stronger topic-cluster pages

**Files:**
- Modify: `f:\www\www7\src\pages\guides\index.astro`
- Modify: representative guide pages first, including:
  - `f:\www\www7\src\pages\guides\assisted-living-costs-2026\index.astro`
  - `f:\www\www7\src\pages\guides\memory-care-costs\index.astro`
  - `f:\www\www7\src\pages\guides\price-factors\index.astro`
  - `f:\www\www7\src\pages\guides\quote-collection-guide\index.astro`
- Modify: `f:\www\www7\public\guide-tools.js`

**Step 1: Write the failing test**

Use a content-role checklist:

- guides should answer a specific question quickly
- guides should have stronger summaries and next steps
- guides should link more intentionally into estimator and state pages

Current failure:

- current guides are informative but still too text-heavy and too similar in rhythm

**Step 2: Run verification to confirm current gap**

Run:

```bash
Get-Content src/pages/guides/index.astro
Get-Content src/pages/guides/assisted-living-costs-2026/index.astro -TotalCount 220
```

Expected:

- guide content is solid but can be improved for search intent clarity and page usability

**Step 3: Write minimal implementation**

Implement:

- stronger top summaries
- better reading rhythm
- stronger guide-to-tool and guide-to-state pathways

**Step 4: Run verification to confirm the improvement**

Run:

```bash
npm run build
```

Expected:

- build succeeds
- representative guide pages remain valid and better structured

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.

### Task 7: Clean up repository guidance and legacy boundaries

**Files:**
- Modify: `f:\www\www7\README.md`
- Modify: `f:\www\www7\docs\site-maintenance-audit-2026-03-12.md`
- Create: `f:\www\www7\docs\legacy-structure-notes.md`

**Step 1: Write the failing test**

Use a maintainer-safety checklist:

- repo should clearly identify active vs legacy assets
- future editors should know what not to modify

Current failure:

- current documentation helps, but repository guidance can be made clearer if implementation work proceeds in phases

**Step 2: Run verification to confirm current gap**

Run:

```bash
Get-Content README.md
Get-Content docs/site-maintenance-audit-2026-03-12.md
```

Expected:

- documentation exists
- legacy handling notes can be expanded as rebuild work progresses

**Step 3: Write minimal implementation**

Implement:

- stronger maintainer instructions
- legacy boundary notes
- rebuild roadmap linkage

**Step 4: Run verification to confirm the improvement**

Run:

```bash
Get-Content README.md
Get-Content docs/legacy-structure-notes.md
```

Expected:

- documentation clearly separates current implementation from legacy artifacts

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.

### Task 8: Run final rebuild verification

**Files:**
- Verify only: `f:\www\www7\dist\`

**Step 1: Write the failing test**

Use final verification goals:

- build must succeed
- representative pages must still render
- robots and sitemap behavior must match intended environment configuration

**Step 2: Run verification to confirm current state**

Run:

```bash
npm run build
Get-Content dist/robots.txt
Get-Content dist/sitemap.xml -TotalCount 10
```

Expected:

- final site still builds cleanly
- output files reflect the intended environment contract

**Step 3: Write minimal implementation**

No new implementation. This task is verification and release readiness only.

**Step 4: Run verification to confirm success**

Run:

```bash
npm run build
Get-Content dist/robots.txt
Get-Content dist/sitemap.xml -TotalCount 10
```

Expected:

- clean successful build
- no broken output assumptions

**Step 5: Commit**

Cannot commit here because the directory is not a Git working tree.
