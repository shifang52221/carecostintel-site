# Policy Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the privacy and advertising disclosure pages with the site's real no-ads, no-non-essential-analytics launch posture.

**Architecture:** This change updates only content-layer Astro pages plus one lightweight verification script. The script acts as a regression guard for policy wording because the repository does not have a dedicated test runner.

**Tech Stack:** Astro static pages, Node.js verification script, GitHub Actions deployment

---

### Task 1: Add a policy wording regression check

**Files:**
- Create: `scripts/verify-policy-copy.cjs`

**Step 1: Write the failing verification script**

The script should:

- read `src/pages/privacy/index.astro`
- read `src/pages/advertising-disclosure/index.astro`
- fail if active-state phrases remain
- fail if current-state phrases are missing

**Step 2: Run the script to verify it fails**

Run:

```bash
node scripts/verify-policy-copy.cjs
```

Expected:

- the script exits with a non-zero status
- output shows current active-state policy phrases are still present

### Task 2: Rewrite the privacy page for current-state accuracy

**Files:**
- Modify: `src/pages/privacy/index.astro`

**Step 1: Update the title description and section labels**

- remove meta wording that implies active cookies or analytics
- replace the active analytics section with current tracking status language

**Step 2: Update section copy**

- state that non-essential analytics and advertising technologies are not currently active
- state that affiliate or partner monetization links are not currently active
- keep future-change language conditional

### Task 3: Rewrite the advertising disclosure page for current-state accuracy

**Files:**
- Modify: `src/pages/advertising-disclosure/index.astro`

**Step 1: Update the title description and intro**

- describe the page as current status plus future disclosure rules

**Step 2: Update section copy**

- state that ads and affiliate arrangements are not currently active
- preserve disclosure guardrails for future monetization
- remove active tracking language

### Task 4: Verify and document

**Files:**
- Verify existing files only

**Step 1: Run the policy verification script**

Run:

```bash
node scripts/verify-policy-copy.cjs
```

Expected:

- exit code 0
- confirmation that both policy pages match current launch posture

**Step 2: Run a production build**

Run:

```bash
npm run build
```

Expected:

- Astro build exits successfully

**Step 3: Commit**

```bash
git add docs/plans/2026-03-16-policy-alignment-design.md docs/plans/2026-03-16-policy-alignment-plan.md scripts/verify-policy-copy.cjs src/pages/privacy/index.astro src/pages/advertising-disclosure/index.astro
git commit -m "fix: align policy pages with launch posture"
```
