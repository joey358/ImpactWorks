# Connected Community Hero — Design Spec

**Date:** 2026-04-22
**Scope:** Redesign the homepage hero + stats block on Impact Works. No changes to navigation, brand palette, typography, or sections below the hero (Problem, Solution, Ecosystem, CTA).
**Branch:** `staging/lighter-design` (builds on existing `/preview/*` scaffolding)
**Replaces:** current dark-navy `section-dark` hero on `app/page.tsx` and the second dark-navy stats section further down the page.

## Problem

The current homepage leads with a dark-navy "space-y" hero (glowing arcs, network SVG, navy-900 backdrop) and uses a second dark-navy section for the stats block. Stakeholder feedback: too dark, too corporate, fights the warm human mission of a community-services platform. Early v1 experiments at `/preview/warm`, `/preview/split`, `/preview/sunlight` softened the tone but were photo-heavy or generic — the v1 drafts solved the "too dark" problem without delivering a distinctive hook.

## Goals

1. Replace the dark hero with a lighter, warmer, community-human composition.
2. Deliver a distinctive visual hook that encodes *what Impact Works actually does* (connects people to services) rather than relying on generic nonprofit imagery.
3. Eliminate the second dark-navy moment (stats block) by folding stats into the hero as a transition band.
4. Keep brand palette, typography, copy voice, and all downstream sections unchanged.
5. Keep live `/` untouched until design is approved; build on `staging/lighter-design`.

## Non-Goals

- No re-brand. Brand palette (`#E8751A`, `#2E8BC0`, `#3DAA5C`, `#F5A623`) and type (Plus Jakarta Sans, JetBrains Mono) stay locked.
- No changes to `app/about`, `app/platform`, `app/impact`, `app/partners`, `app/contact`, `app/expansion`.
- No changes to `components/Nav.tsx` or `components/Footer.tsx`.
- No changes to the Problem, Solution, Ecosystem, or CTA sections. These are already light and performing fine.
- No new dependencies. Animation uses existing `framer-motion` + SVG.

## Design: "Connected Community" (α)

### Composition

Two-column desktop layout inside `max-w-site mx-auto`, 12-column grid:

- **Left column (cols 1–6):** copy stack — eyebrow, headline, body, CTAs.
- **Right column (cols 7–12):** photo canvas with overlaid service-wire layer.
- **Mobile (<768px):** photo becomes a full-bleed background behind the copy stack at 30% opacity; service-wire layer hides.

A warm cream gradient (`from-[#FDFAF3] via-white to-[#F8FAFC]`) washes the hero background; a soft radial orange accent (`bg-gradient-radial from-brand-orange/8`) sits top-right. No dark surfaces anywhere in the hero.

### Copy stack (left column)

| Element | Treatment | Content |
|---|---|---|
| Eyebrow | `font-mono · uppercase · tracking-[0.2em] · text-brand-orange · text-xs` | `Community Impact Platform` |
| Headline | `font-display · font-extrabold · text-hero · text-slate-900` | `Connecting Communities to ` + `<span class="gradient-text-orange">Critical Services</span>` |
| Body | `font-display · body-text · text-slate-600 · max-w-lg` | `We connect people to the help they need and the organizations that provide it — in one coordinated network.` (shortened from 38→22 words) |
| Primary CTA | `.btn-primary` (existing) | `Explore Linksy →` → `/platform` |
| Secondary CTA | New `.btn-outline-light` (border-slate-300 on white) | `See Community Impact` → `/impact` |

All copy elements animate in with the same `initial/animate/transition` pattern used today (opacity + 10–30px Y translate, `ease: [0.16, 1, 0.3, 1]`, staggered 0.1s).

### Photo canvas (right column)

- Container: `relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl`
- Image: `<Image src="/images/community-hero.jpg" fill priority className="object-cover object-center" />`
- **Warm duotone wash overlay:** `bg-gradient-to-tr from-brand-orange/25 via-transparent to-brand-blue/15` — ties photo to palette without desaturating the golden hour warmth.
- Soft inner vignette at bottom (`bg-gradient-to-t from-black/20 to-transparent`, bottom 30%) — ensures service chips pop against the photo edge.
- Subtle parallax on scroll: `translateY` up to 8px based on scroll position. Disabled under `prefers-reduced-motion`.

### Service-wire layer (the distinctive hook)

Six service chips float around the photo edges — three along the right side (extending outside the photo container into the hero whitespace), three along the bottom of the photo. Each chip is a small pill:

- Styles: `bg-white · shadow-md · rounded-xl · px-4 py-2 · flex items-center gap-2`
- Content: small colored dot (`w-2 h-2 rounded-full`) + label in `font-mono text-xs text-slate-700`
- Labels + colors:
  - Housing — `brand-blue`
  - Food — `brand-green`
  - Healthcare — `brand-orange`
  - Mental Health — `slate-700`
  - Jobs — `brand-gold`
  - Childcare — `brand-blue`

**SVG wire animation:**

A single absolutely-positioned SVG sits over the right column (`pointer-events-none`, behind the chips but over the photo overlay). It contains 6 paths, each connecting one of three anchor points *inside* the photo (roughly over the group of people, hand-positioned in SVG coords) to one of the 6 chips.

Paths are hand-drawn dashed lines:
- `stroke="#E8751A"` at `opacity="0.6"`
- `strokeWidth="1.5"`
- `strokeDasharray="4 6"`
- `strokeLinecap="round"`

On hero mount, each path animates in via `framer-motion`'s `pathLength` 0→1, staggered 150ms between paths (orders: center→top-right, center→mid-right, center→bottom-right, center→bottom-center-left, center→bottom-center, center→bottom-center-right).

After all paths finish drawing (~1.2s total), a small `3px` circle in the chip's color begins traveling along each path via `animateMotion`, looping every 4–6s (offset per path so they don't all fire at once). This creates the "service being matched" feel — gentle, ambient, not attention-grabbing.

**Reduced-motion fallback:** Paths render fully drawn at mount; traveling dots are suppressed; chips are static.

### Floating "Live Network" badge (optional accent)

A small white card in the bottom-left, extending just outside the photo container:

```
┌─────────────────────┐
│ LIVE NETWORK         │  ← font-mono · text-[10px] · tracking-widest · brand-orange
│ 9 sectors,           │  ← font-display · font-bold · text-slate-800
│ one coordinated      │  ← font-display · font-bold · text-slate-800
│ response.            │
└─────────────────────┘
```

- `bg-white · rounded-2xl · shadow-xl · border border-slate-100 · p-4 · w-48`
- Hidden on mobile (`hidden md:block`)
- Can be removed if composition feels busy in review

### Stats band (fold into hero as horizon)

The existing separate dark-navy stats section is **removed entirely**. In its place, a cream transition band sits flush against the bottom of the hero:

- Container: full-bleed, `bg-[#FFF4E0]`, `py-8 md:py-10`, `border-y border-brand-orange/10`
- Content: `max-w-site mx-auto · grid grid-cols-2 md:grid-cols-4 · divide-x divide-brand-orange/15`
- Each stat cell: center-aligned, `px-4`
  - Numeral: `font-mono · text-3xl md:text-4xl · text-brand-orange · font-bold · tabular-nums`
  - Label: `text-xs md:text-sm · text-slate-600 · mt-1`

Stats:
- `1,500+` — Residents Connected
- `50+` — Partner Organizations
- `4,000+` — Referrals Made
- `100%` — Real-Time Data Access

The band serves as the **visual horizon line** between the hero and the Problem section. It replaces what was previously a large standalone dark-navy block further down the page.

## Component architecture

### New component

`components/ConnectedCommunityHero.tsx` — client component, encapsulates:
- The two-column layout
- The copy stack with motion
- The photo canvas + overlays
- The service-wire SVG (internal constant for anchor points + chip positions)
- The chip pills (data-driven from a local array)
- The optional "Live Network" badge
- The cream stats band immediately below

Props:
```ts
type Props = {
  showNetworkBadge?: boolean; // default true
};
```

### Updated files

- `app/page.tsx` — replace the current `<section className="relative min-h-screen flex items-center section-dark overflow-hidden">` hero block *and* the separate dark stats section further down the page with `<ConnectedCommunityHero />`. All other sections remain.
- `app/globals.css` — add a new `.btn-outline-light` utility under `@layer components` (mirrors `.btn-outline-dark` but tuned for white backgrounds).

### Unchanged files

- `components/HeroArcs.tsx`, `components/HeroNetworkSVG.tsx`, `components/CountUp.tsx`, `components/ScrollReveal.tsx` — remain for use on other pages. `CountUp` is no longer used on the home page (static stat strings in the band); leave the component in place for `/impact`.
- `tailwind.config.ts` — no changes. Existing brand colors, fonts, shadows, max-width already sufficient.
- `components/Nav.tsx`, `components/Footer.tsx` — no changes.

## Data flow

Static content only. All stats, chip labels, and copy strings live inside `ConnectedCommunityHero.tsx` as local constants — consistent with how the current `app/page.tsx` handles the sectors list.

## Error handling

- `<Image>` uses Next's built-in loading with `priority` so no layout shift on hero image. Fallback: Next renders the alt text if the image 404s (we've verified `public/images/community-hero.jpg` exists on disk).
- If `framer-motion` motion is disabled globally via `prefers-reduced-motion`, the CSS media query already in `globals.css` clamps animation duration to `0.01ms`, which effectively freezes paths and chips in their end state.
- No external data, no network calls, no error states required.

## Accessibility

- Photo has descriptive alt text: `"A diverse group of community members standing together at sunset"`.
- Service-wire SVG is marked `role="presentation"` + `aria-hidden="true"` — the wires are decorative; the chips themselves carry the semantic information.
- Each chip is rendered as a plain `<div>` (not a link or button) — they are labels, not interactive.
- Headline is a single `<h1>`; eyebrow is a `<p>`. No additional heading-level noise.
- Keyboard focus remains on the two CTAs only. No new tab stops introduced.
- Color contrast: orange numerals on cream band checked against `#FFF4E0` — `#E8751A` @ 4.7:1 meets WCAG AA for large text (all stat numerals qualify as large).

## Testing / verification

This is UI-only and has no logic worth unit-testing. Verification is visual:

1. `npm run build` must succeed (static export, no runtime errors).
2. Desktop (1440px): two-column layout renders correctly; all 6 wires draw; chips positioned as specified; stats band full-width below hero.
3. Mobile (375px): photo becomes background at 30%; wires + chips hidden; copy stack stacks; stats band becomes 2-col grid.
4. Prefers-reduced-motion: paths render instantly fully-drawn; no traveling dots; no parallax.
5. `/preview/connected` route (see Rollout) matches the spec.
6. Lighthouse score on hero should remain ≥ 90 for performance (no regression from current).

## Rollout plan

1. Build `ConnectedCommunityHero.tsx`.
2. Add `app/preview/connected/page.tsx` — renders the new hero + existing `HomeLightSections`. This gives stakeholders a fourth variant to compare against v1 warm/split/sunlight before committing to `/`.
3. Push to `staging/lighter-design`, verify on Vercel preview URL.
4. Once approved: swap `app/page.tsx` hero + delete the old dark stats section. Keep `/preview/*` routes available for historical comparison or delete before merging to `main` — decision deferred to merge time.
5. Merge `staging/lighter-design` → `main` only after Joey approves the visual on preview.

## Out of scope (decisions deferred)

- Whether to remove the v1 `/preview/warm`, `/preview/split`, `/preview/sunlight` routes before the final merge to `main`. Will decide at merge time.
- Whether the "Live Network" floating badge stays or goes. Will decide after seeing it rendered.
- Whether to apply the same lightening treatment to the hero on `/platform`, `/impact`, etc. — explicitly not in this spec's scope.
