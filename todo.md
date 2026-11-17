# Todo: photo

Updated: 2026-11-16 · Source: /todo "create a premium photography website"
Status key: [ ] todo · [~] in progress · [x] done · [-] skipped (reason) · [!] needs you

## Phase 1: Build the site — skill: award-website
Goal: A premium photography portfolio site built from scratch in this empty folder, scored at 8/10 or better on every criterion.
- [x] 1.1 Stack chosen and project scaffolded (builds cleanly with `npm run build`)
- [x] 1.2 One strong concept with a real colour and type system, documented in the tracker
- [x] 1.3 Pages built: home (hero + featured work), portfolio/galleries, about, contact; responsive on phone and desktop
- [x] 1.4 Image handling: lazy loading, responsive sizes, lightbox for gallery images
- [x] 1.5 Motion only where it matters, with reduced-motion fallback
- [-] 1.6 (paused: user asked to test it themselves first) Self-review loop: every criterion at least 8/10 on desktop and mobile screenshots
- [-] 1.7 (paused: user asked to test it themselves first; build and typecheck pass, Lighthouse not yet run) Gate passed: build, Lighthouse, SEO checklist (titles, meta, sitemap, robots, favicon, OG image, alt text, 404)
Done when: `npm run build` passes, the score sheet shows all criteria ≥ 8, and the SEO checklist has no open items.
Detail: docs/checklists/award-website.md

## Phase 2: Launch readiness — skill: legal-compliance
Goal: The site can go live without legal or accessibility surprises.
- [ ] 2.1 Privacy policy and terms pages linked from the footer
- [ ] 2.2 Contact form handling documented (where submissions go, consent copy)
- [ ] 2.3 Licenses recorded for fonts and placeholder imagery; placeholder photos flagged for replacement
- [ ] 2.4 Colour contrast and keyboard navigation checked on every page
Done when: the legal-compliance tracker has no open items that apply to a portfolio site.
Detail: docs/checklists/legal-compliance.md

## Blocked / needs you
- [!] Photographer's name, real photos, contact email, form endpoint and domain are unknown — placeholders used; replace before launch.

## Log
- 2026-11-16 Created from /todo "create a premium photography website"; 2 phases, 11 tasks
- 2026-11-16 Phase 1 started (award-website)
- 2026-11-16 Phase 1 built: Astro + Tailwind v4 + React islands (React Bits BlurText and Magnet, Magic UI BlurFade and Lens); 9 pages, build and typecheck pass. Scoring loop and Lighthouse gate paused at user request; `/todo` resumes at 1.6.
- 2026-11-16 Redesigned as "the darkroom" after user feedback (too plain): locked dark theme, Bricolage Grotesque display, Lenis + GSAP scroll engine, pinned horizontal wall, FlowingMenu series, TextReveal statement, view transitions. Lighthouse home 100/96/100/100 (contrast flag fixed). User testing before the scoring loop runs.
- 2026-11-17 Accent switched to electric yellow (#ecff3a) from the user's palette collection, now in design-taste-frontend/references/accent-palettes.md; applied to buttons, marquee band, progress line, active nav, hovers, favicon.
- 2026-11-17 User: yellow on buttons was not it. Accent re-woven into the imagery (safelight develop, exposure line, caption place names, reading highlight, hairline tabs, tinted grain); buttons back to white, yellow on hover only.
