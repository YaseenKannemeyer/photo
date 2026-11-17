// Scroll engine: Lenis smooth scrolling and GSAP ScrollTrigger effects.
// Re-initialised on every Astro page transition. All of it is skipped under prefers-reduced-motion.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis: Lenis | null = null;

if (!reduce) {
  // anchors: lets in-page links (the skip link) scroll while Lenis is active. stopInertiaOnNavigate: a click on an
  // internal link does not carry wheel inertia into the next page.
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true, stopInertiaOnNavigate: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function stopScroll(stop: boolean) {
  if (!lenis) return;
  stop ? lenis.stop() : lenis.start();
}

function init() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  lenis?.scrollTo(0, { immediate: true });

  // Horizontal pan: the selected-work section pins at the viewport top and vertical scroll drives the track sideways.
  // When the last print has passed, the pin releases and the page carries on to the series.
  const pan = document.querySelector<HTMLElement>('[data-pan]');
  const track = pan?.querySelector<HTMLElement>('[data-pan-track]');
  const bar = pan?.querySelector<HTMLElement>('[data-pan-progress]');
  let panTween: gsap.core.Tween | null = null;
  if (pan && track && !reduce) {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    panTween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pan,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => { if (bar) bar.style.transform = `scaleX(${self.progress})`; },
      },
    });
  }

  // Prints unmask from the bottom as they enter, the image settling from a slight zoom.
  gsap.utils.toArray<HTMLElement>('[data-unmask]').forEach((el) => {
    if (reduce) return;
    const img = el.querySelector('img');
    // Prints with parallax keep a slight zoom so the image can drift inside its mask.
    const base = el.closest('[data-parallax]') ? 1.15 : 1;
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    if (img) gsap.set(img, { scale: base + 0.12 });
    // The exposure line rides the leading edge of the reveal.
    let line = el.querySelector<HTMLElement>('.expose');
    if (!line) {
      line = document.createElement('span');
      line.className = 'expose';
      line.setAttribute('aria-hidden', 'true');
      el.appendChild(line);
    }
    const proxy = { p: 100 };
    // Prints that start off-screen inside the pan reveal as the pan carries them into view, not when the section arrives.
    const inPan = !!panTween && !!el.closest('[data-pan-track]') && el.getBoundingClientRect().left > window.innerWidth;
    ScrollTrigger.create({
      trigger: el,
      start: inPan ? 'left 92%' : 'top 90%',
      containerAnimation: inPan ? panTween! : undefined,
      once: true,
      onEnter: () => {
        gsap.set(line, { opacity: 1 });
        gsap.to(proxy, {
          p: 0,
          duration: 1.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.style.clipPath = `inset(${proxy.p}% 0% 0% 0%)`;
            line!.style.top = `calc(${proxy.p}% - 1px)`;
          },
          onComplete: () => gsap.to(line, { opacity: 0, duration: 0.5 }),
        });
        if (img) gsap.to(img, { scale: base, duration: 1.6, ease: 'power3.out' });
      },
    });
  });

  // Gentle parallax: the image drifts inside its mask, so the layout around it never moves.
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    if (reduce) return;
    const img = el.querySelector('.print img');
    if (!img) return;
    const amt = Math.min(7, Number(el.dataset.parallax || 40) / 8);
    gsap.fromTo(img, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Hero: the name and photograph drift apart slightly as you leave the first screen.
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero && !reduce) {
    const img = hero.querySelector('[data-hero-media]');
    const text = hero.querySelector('[data-hero-text]');
    if (img) gsap.to(img, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    if (text) gsap.to(text, { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true } });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => ScrollTrigger.getAll().forEach((t) => t.kill()));
