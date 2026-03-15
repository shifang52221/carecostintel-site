# Final State Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the final three legacy-style state pages so they match the newer 2026 summary-first state-page standard and remove the remaining content-standardization gap.

**Architecture:** Each target page will be converted from the older dense standalone structure into the newer state-page pattern already used by upgraded state pages such as California. The work stays file-local, preserves state-specific official sources and metro pairings, and avoids broader refactors.

**Tech Stack:** Astro, `.astro` page templates, static content pages, JSON-LD metadata

---

### Task 1: Rewrite `south-dakota`

**Files:**
- Modify: `src/pages/state-costs/south-dakota/index.astro`

**Step 1: Replace the legacy dense page structure**

- Introduce a small `page` metadata object.
- Introduce a `sources` list for official links.
- Add `faqSchema` and `articleSchema`.
- Replace the old section stack with the newer summary-first structure.

**Step 2: Preserve state-specific context**

- Keep `South Dakota`
- Keep `Sioux Falls` and `Rapid City`
- Keep South Dakota official resource links

**Step 3: Verify local content quality**

- Confirm top summary is clear
- Confirm estimator CTA appears early
- Confirm official checks are visible
- Confirm city comparison section exists

### Task 2: Rewrite `west-virginia`

**Files:**
- Modify: `src/pages/state-costs/west-virginia/index.astro`

**Step 1: Replace the legacy dense page structure**

- Introduce a small `page` metadata object.
- Introduce a `sources` list for official links.
- Add `faqSchema` and `articleSchema`.
- Replace the old section stack with the newer summary-first structure.

**Step 2: Preserve state-specific context**

- Keep `West Virginia`
- Keep `Charleston` and `Morgantown`
- Keep West Virginia official resource links

**Step 3: Verify local content quality**

- Confirm top summary is clear
- Confirm estimator CTA appears early
- Confirm official checks are visible
- Confirm city comparison section exists

### Task 3: Rewrite `wyoming`

**Files:**
- Modify: `src/pages/state-costs/wyoming/index.astro`

**Step 1: Replace the legacy dense page structure**

- Introduce a small `page` metadata object.
- Introduce a `sources` list for official links.
- Add `faqSchema` and `articleSchema`.
- Replace the old section stack with the newer summary-first structure.

**Step 2: Preserve state-specific context**

- Keep `Wyoming`
- Keep `Cheyenne` and `Casper`
- Keep Wyoming official resource links

**Step 3: Verify local content quality**

- Confirm top summary is clear
- Confirm estimator CTA appears early
- Confirm official checks are visible
- Confirm city comparison section exists

### Task 4: Sync tracking documents

**Files:**
- Modify: `docs/content-standardization-backlog-2026-03-12.md`
- Modify: `docs/project-status-2026-03-14.md`
- Modify: `docs/project-next-actions-2026-03-14.md`

**Step 1: Remove the final three states from pending work**

- Mark the final three states as upgraded
- Update the summary of remaining state-page work

**Step 2: Refresh project status wording**

- Reflect that the content-standardization gap is effectively cleared for current known state and guide pages
- Shift remaining work emphasis toward QA and launch verification

### Task 5: Verify with a fresh build

**Files:**
- Verify existing build pipeline

**Step 1: Run build**

Run: `npm run build`

**Step 2: Confirm success**

Expected:

- Astro build exits with code 0
- no template syntax errors in the rewritten pages

**Step 3: Report actual verification result**

- If build passes, report that with the command used
- If build fails, report the exact failing area instead of claiming completion
