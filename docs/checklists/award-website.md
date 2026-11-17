# Award website: photo (photography portfolio)

Updated: 2026-11-16 · Scope: todo.md phase 1 (full build from empty folder). Round 2 is a full redesign at the user's request.
Status key: [ ] todo · [x] done · [-] n/a (reason) · [!] needs you

## Checklist
- [x] 1. Brief to intent
  - For: prospective clients (art directors, editors, private commissions) judging whether to hire this photographer.
  - One action: send a commission enquiry (Contact page / "Enquire" CTA).
  - Tone: quiet, precise, confident.
  - Proof: the work itself (four series), a short client list, a one-paragraph bio. Name, photos, email are placeholders flagged in Needs you.
- [x] 2. One concept (revised after the user asked for something far more striking)
  - "The darkroom": one locked dark theme, film grain, a hero that develops out of black like a print in a tray, prints unmasking from the bottom as they enter, a wall of selected work you walk past (vertical scroll pans it sideways), series rows that flow with their cover on hover, and a statement that reads itself as you scroll.
  - Rejected: round 1's quiet light "gallery wall" (user: "feels like photos and fonts"); "contact sheet / film-strip chrome" (frame numbers, sprockets: gimmicky AI tell).
- [x] 3. Colour and type system (see System below)
- [x] 4. Motion budget (see Motion below)
- [x] 5. Build (9 pages; `npm run build` and `npx astro check` pass)
- [x] 6. Screenshot (round 2 in award-website-rounds/round-2: `*-walk.png` are stitched viewport frames via `node scripts/walk.mjs`, which is the only honest way to capture pinned and vh-based sections; `interact-*.png` show hover rows, the statement, and the lightbox)
- [ ] 7. Score (user is testing first; Lighthouse home: 100 / 96 → contrast fixed / 100 / 100, LCP 1.0s, CLS 0)
- [ ] 8. Fix lowest first, repeat (paused)
- [ ] 9. Gate (build, typecheck, Lighthouse and console are clean; SEO checklist not yet run as a pass of its own) (lint/typecheck, build, Lighthouse ≥ 90 x4, console clean, SEO checklist)

## Design read
Reading this as: photographer portfolio for commissioning clients, with a cinematic darkroom language, leaning toward Astro static output + Tailwind v4 + Bricolage Grotesque display + Lenis/GSAP scroll motion with React islands only where they earn it.
Dials: DESIGN_VARIANCE 8 · MOTION_INTENSITY 8 · VISUAL_DENSITY 2.

## System
Palette (tokens in src/styles/global.css). One theme, locked dark: a darkroom does not have a light mode. Set: black + white + electric yellow, from design-taste-frontend/references/accent-palettes.md (user's collection, 2026-11-17).
| Role | Value |
| --- | --- |
| background | #0b0b0c |
| surface | #141416 |
| text | #ececea |
| muted text | #8d8d93 (5.8:1 on background) |
| accent | #ecff3a (electric yellow, woven through the photographs: safelight cast as the hero develops, exposure line on every print reveal, place names in captions, the word being read in the statement, yellow tab on hairlines, warm tint in the grain, yellow type on the series hover band, pan progress line, counter in the lightbox; buttons only on hover) |
| accent contrast | #0b0b0c |
| hairline | #27272b |
Type: Bricolage Grotesque Variable (opsz 96) for display at weight 400, tracking -0.03em; Instrument Sans Variable for body. Both self-hosted via @fontsource-variable.
Scale: 13 / 16 / 20 / 28 / 36-60 / 52-136 / 64-208px (top three fluid). Measure 48-56ch.
Corners: all sharp (radius 0). Buttons are solid rectangles or underlined text.

## Motion budget (all off under prefers-reduced-motion; Lenis is not created and every ScrollTrigger is skipped)
User asked for React Bits and Magic UI. Vendored under src/components/reactbits and src/components/magicui (MIT): BlurText, Magnet, FlowingMenu, TextReveal. BlurFade and Lens are vendored but unused after the redesign. The scroll engine is src/scripts/engine.ts (Lenis + GSAP ScrollTrigger), re-initialised on every view transition.
1. Hero entrance: the photograph develops from black (brightness/contrast keyframes, 2.6s) while the name focuses in letter by letter (React Bits BlurText, focus effect) and the copy fades up; leaving the hero, the image and text drift apart (scrubbed).
2. One scroll-reveal pattern: prints unmask from the bottom (clip-path, 1.2s) with the image settling from a slight zoom; prints on the walls also drift a few percent inside their mask (scrubbed parallax).
3. Hover and press feedback: React Bits FlowingMenu rows flow with the cover image; React Bits Magnet on Enquire; prints dim; buttons press (scale 0.98).
4. Page transitions: Astro view transitions crossfade; lightbox crossfade with swipe and arrow keys.
5. Signature moments: the selected-work wall is pinned and panned sideways by vertical scroll (native horizontal scroll-snap on phones); the statement reads itself word by word as you scroll (Magic UI TextReveal).
Deviation: that is six motion sites rather than five. The pan and the statement are both kept because the user asked for a site that feels exceptional and both are motivated (storytelling), not decoration.

## Scores
| Round | Concept | Type | Colour | Layout | Hierarchy | Motion | Responsive | Perf | A11y | Polish | Min |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 (light gallery wall) | not scored: user rejected it as "photos and fonts" | | | | | | | | | | |
| 2 (darkroom) | not scored yet: user testing first; Lighthouse 100/96/100/100 | | | | | | | | | | |

## Needs you
- Photographer's real name (placeholder: Lena Marais), bio, and client list.
- Real photographs: every image in src/assets/photos is a picsum.photos placeholder.
- Contact email, phone, and a form endpoint.
- Domain for the canonical URL and sitemap (placeholder: https://example.com).
