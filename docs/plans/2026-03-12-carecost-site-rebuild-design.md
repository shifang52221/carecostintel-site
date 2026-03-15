# CareCost Intelligence Site Rebuild Design

Date: 2026-03-12
Project: `f:\www\www7`

## Goal

Rework the existing English-language senior care cost planning website into a higher-trust, higher-conversion, SEO-strong publishing and tool platform that is more aligned with Google Search guidance and closer to AdSense-ready quality expectations.

## Product Direction

The site will remain an English-language senior care cost planning site.

Core positioning:

- not an official quote source
- not medical or financial advice
- a decision-support and planning platform for families comparing senior care options

Primary user flow:

1. Understand what the site does on the homepage
2. Use the estimator to model likely monthly and annual costs
3. Validate decisions with state guides and topic guides
4. Move into quote collection, comparison, and planning checklists

## Why This Rebuild Is Needed

The current site already has useful structure, but it is not yet at the level of:

- strong YMYL-style trust signaling
- strong people-first content differentiation
- strong production SEO safety
- strong conversion-focused user experience
- strong AdSense review readiness

Key current gaps:

- production indexing setup is easy to misconfigure
- trust signals are present but not yet strong enough
- many state pages are highly templated
- homepage and content pages are content-heavy but not yet elegant to scan
- repository contains active Astro source plus legacy static artifacts

## Strategic Principles

The rebuild should follow these principles:

1. Trust before growth
2. Clarity before ornament
3. Strong information hierarchy over long text walls
4. Unique decision value over scaled template output
5. Ads must support the product, not define it

## Execution Strategy

The rebuild will happen in four stages.

### Stage 1: Foundation And Compliance

Purpose:

- make the site safely indexable
- clarify source of truth
- strengthen trust and transparency
- reduce AdSense policy risk

Core work:

- fix production indexing, canonical, sitemap, and domain handling
- formalize trust pages and site identity
- strengthen author, reviewer, update, and correction patterns
- isolate or document legacy static artifacts
- reduce ad-strategy ambiguity

### Stage 2: Core Experience Redesign

Purpose:

- improve first-visit clarity
- improve reading flow and decision flow
- make the estimator feel like the core product

Core work:

- rewrite homepage hierarchy and messaging
- improve estimator page narrative and results UX
- improve state guide scanability
- improve guide page rhythm, CTA placement, and sectioning

### Stage 3: SEO Growth Architecture

Purpose:

- make page roles clearer to users and search engines
- improve distinctiveness of state and guide content
- build stronger topic authority

Core work:

- sharpen page-intent boundaries
- create stronger content clusters
- improve internal linking strategy
- make state pages more uniquely useful

### Stage 4: AdSense-Ready Monetization Layer

Purpose:

- prepare for monetization without harming trust or UX

Core work:

- reduce ad clutter risk
- keep ads off low-value and trust pages
- place ads only where content value is already clear
- maintain editorial-first presentation

## Information Architecture

Main navigation should remain focused around four primary entries:

- Cost Estimator
- State Guides
- Care Types
- Planning Guides

Supporting trust and policy pages remain available in the footer and supporting trust surfaces:

- About
- Contact
- Editorial Policy
- Data Sources
- Updates and Corrections
- Privacy
- Terms
- Disclaimer
- Accessibility
- Advertising Disclosure

Page roles:

- Homepage: trust-building and traffic distribution
- Estimator: primary conversion and product page
- State Guides: geography-led research and validation pages
- Care Types: comparison-led understanding pages
- Guides: question-led and scenario-led content pages

## Homepage Design

The homepage should become a high-confidence routing page rather than a broad content collage.

Responsibilities:

- explain the product in under 10 seconds
- reduce ambiguity about what the site is and is not
- route users into estimator, state guides, or core guides

Recommended structure:

1. Clear value proposition
2. Simple explanation of what the estimator does
3. Two primary calls to action
4. One “how it works” or “see methodology” trust support
5. Trust block
6. Three-path routing block based on user intent
7. Selected content hubs and popular state guides

## Estimator Design

The estimator should become the site’s strongest page.

Design goals:

- reduce user friction
- explain why each step matters
- produce more trustworthy outputs
- give the user clear next actions

Key UX changes:

- more guided setup framing
- stronger progress and reassurance language
- better explanation of results
- clearer budget-gap and next-step framing
- stronger links into state guides and relevant guides

The estimator should feel like a planning workstation, not only a form.

## State Guide Design

State pages should evolve from scaled templates into location-aware decision pages.

Each state page should clearly deliver:

- why the state matters
- where pricing may vary locally
- what state-specific regulators or programs matter
- what questions users should ask before accepting a quote
- what the next action should be

State pages should open with concise scanning-friendly value, then expand into deeper sections.

## Guide Page Design

Guide pages should become more readable and more obviously useful.

Each guide should provide:

- a fast summary
- a practical explanation
- clear next actions
- contextual links into the estimator and state pages

The design language should be calm, editorial, reliable, and intentionally structured.

## Trust System Design

The trust layer is essential because the topic sits near YMYL-sensitive territory.

Required elements:

- clearer author bylines
- reviewer or editorial review framing
- author detail pages or richer author boxes
- methodology explanations
- update history and corrections path
- stronger About and Contact credibility
- stronger distinction between editorial information and advertising

The site should make `Who`, `How`, and `Why` visible.

## SEO Design

The SEO approach should emphasize:

- page-role clarity
- unique value per page type
- topic clusters rather than isolated pages
- better internal routing
- better metadata clarity

The site should not expand through sheer page count alone.

Instead, it should improve:

- uniqueness of existing state pages
- authority of care-type and planning clusters
- internal flow between tools and guides
- practical usefulness of content

## AdSense Alignment

No one can guarantee AdSense approval, but the rebuild should align the site with better review readiness.

This means:

- no ad-heavy layout
- no ads in policy-heavy or trust-heavy locations
- no misleading ad placement
- content-first pages
- clean navigation
- clear site identity
- strong original value

Ads should appear as support for a useful product, not as the reason the site exists.

## Risks

### Risk 1: Breaking current indexable structure

Mitigation:

- preserve route structure where possible
- redesign templates incrementally

### Risk 2: Increasing template feel while trying to scale

Mitigation:

- improve page uniqueness before expanding quantity

### Risk 3: Over-designing a trust-sensitive product

Mitigation:

- keep the visual system calm and editorial
- avoid aggressive or gimmicky marketing patterns

### Risk 4: Monetization harming trust

Mitigation:

- delay ad expansion until content and trust layers are strong

## Success Criteria

The rebuild is successful when:

- the production site is safely indexable
- the trust layer is visibly stronger across templates
- the homepage is clearer and more conversion-oriented
- the estimator better supports decision-making
- state and guide pages feel more useful and less templated
- the site is materially closer to Google-friendly quality expectations for search and AdSense review

## Constraints

- The site remains in English.
- The senior care cost planning topic remains unchanged.
- The existing Astro stack remains the implementation base.
- The current estimator remains the core product rather than being replaced.

## Implementation Intent

Implementation should prioritize:

1. technical SEO and trust foundations
2. homepage and estimator experience
3. state and guide template upgrades
4. monetization-safe ad strategy
