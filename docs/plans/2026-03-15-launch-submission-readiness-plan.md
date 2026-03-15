# Launch Submission Readiness Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the site from deployment-stable status into search-submission readiness through a controlled technical audit, trust-content audit, search-console setup, and early indexing observation workflow.

**Architecture:** The work is split into four operating layers: technical submission verification, trust and content verification, search-engine submission, and post-submission observation. The plan intentionally avoids introducing ads or analytics during the initial submission window so the compliance burden stays aligned with actual behavior.

**Tech Stack:** Astro static site, GitHub Actions deployment, BT panel hosting, Google Search Console, Bing Webmaster Tools, XML sitemap, `robots.txt`

---

### Task 1: Refresh the project status and launch route docs

**Files:**
- Modify: `docs/project-status-2026-03-14.md`
- Modify: `docs/project-next-actions-2026-03-14.md`
- Modify: `docs/launch-compliance-checklist-2026-03-14.md`

**Step 1: Update project status to reflect deployment stabilization**

- remove outdated “not yet confirmed” statements that were resolved by the production deployment and route fix
- add that automatic deployment is active
- add that the recent 404 issue was caused by ignored source pages and is now fixed

**Step 2: Reframe next actions around submission readiness**

- replace generic “run QA” wording with the phased route:
  - technical submission audit
  - trust-content audit
  - search-console submission
  - 30-day observation

**Step 3: Align the compliance checklist with current launch posture**

- state that launch is expected to proceed without ads or analytics
- keep consent work as a later requirement if tracking is enabled later

### Task 2: Create a technical submission checklist

**Files:**
- Create: `docs/submission-technical-checklist-2026-03-15.md`

**Step 1: Document the must-pass technical checks**

Include checklist items for:

- domain canonicalization
- homepage and core route accessibility
- representative deep-route accessibility
- `robots.txt`
- `sitemap.xml`
- canonical tags
- production environment values

**Step 2: Add verification commands and evidence slots**

Include commands such as:

```bash
npm run build
Get-Content dist/robots.txt
Get-Content dist/sitemap.xml | Select-Object -First 20
```

### Task 3: Create a trust and content submission checklist

**Files:**
- Create: `docs/submission-trust-content-checklist-2026-03-15.md`

**Step 1: Document representative-page review set**

Include:

- homepage
- about
- estimator
- state-costs hub
- guides hub
- representative state pages
- representative guide pages

**Step 2: Define pass criteria**

Include checks for:

- page purpose clarity
- trust-page reachability
- non-thin structure
- CTA clarity
- policy-to-behavior alignment

### Task 4: Verify production build indexing behavior locally

**Files:**
- Verify existing files only

**Step 1: Run a fresh production build**

Run:

```bash
npm run build
```

Expected:

- Astro build exits successfully
- no route generation failures

**Step 2: Inspect `robots.txt`**

Run:

```bash
Get-Content dist/robots.txt
```

Expected:

- output matches the intended pre-submission indexing state

**Step 3: Inspect `sitemap.xml`**

Run:

```bash
Get-Content dist/sitemap.xml | Select-Object -First 20
```

Expected:

- sitemap is not empty
- URLs use the production domain before submission goes live

### Task 5: Audit representative metadata and route availability

**Files:**
- Verify existing files only

**Step 1: Review representative generated files**

Inspect:

- `dist/index.html`
- `dist/about/index.html`
- `dist/estimator/index.html`
- `dist/guides/index.html`
- `dist/state-costs/index.html`
- one representative deep guide page
- one representative deep state page

**Step 2: Confirm metadata basics**

Check:

- title exists
- description exists
- canonical uses production domain when configured
- no localhost leakage remains in release output

### Task 6: Prepare search-console submission notes

**Files:**
- Create: `docs/search-submission-runbook-2026-03-15.md`

**Step 1: Document Google submission steps**

Include:

- create GSC property for `https://www.carecostintel.com`
- submit `https://www.carecostintel.com/sitemap.xml`
- inspect homepage and representative URLs

**Step 2: Document Bing submission steps**

Include:

- create Bing Webmaster Tools property
- submit the same sitemap
- verify homepage and representative URLs

### Task 7: Create a 30-day post-submission observation plan

**Files:**
- Create: `docs/post-submission-observation-plan-2026-03-15.md`

**Step 1: Define what to watch**

Include:

- crawl errors
- indexing status of core pages
- sitemap health
- canonical issues
- mobile usability issues if surfaced

**Step 2: Define what not to change too soon**

Document that the first two weeks should avoid:

- large URL changes
- major navigation rewrites
- monetization layer additions
- unnecessary structural churn

### Task 8: Save the route in README for day-to-day use

**Files:**
- Modify: `README.md`

**Step 1: Add a “Submission Readiness” section**

Document the new operating sequence:

1. technical audit
2. trust-content audit
3. search submission
4. 30-day observation

**Step 2: Link the new checklists and runbooks**

Add links to:

- technical checklist
- trust-content checklist
- search submission runbook
- observation plan

