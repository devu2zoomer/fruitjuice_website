/**
 * easing.js
 * Tiny math + easing helpers used to hand-roll the scroll-scrubbed and
 * time-based animations that used to be powered by GSAP. Keeping these
 * pure/stateless makes it easy to reuse them from plain scroll listeners
 * and requestAnimationFrame loops.
 */

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

export const lerp = (a, b, t) => a + (b - a) * t;

// Roughly matches GSAP's "power2.inOut"
export const easeInOutQuad = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Roughly matches GSAP's "power3.out"
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Roughly matches GSAP's "power2.out"
export const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

// Roughly matches GSAP's "back.out(1.6)"
export const easeOutBack = (t, overshoot = 1.6) => {
  const c1 = overshoot;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/**
 * Remap a value from [start, end] of the input range to a 0..1 progress,
 * clamped, then run it through an easing curve. Mirrors the small
 * "start -> end -> scrub" building block GSAP's ScrollTrigger provided.
 */
export function scrubProgress(value, start, end, ease = (t) => t) {
  if (end === start) return 0;
  const t = clamp01((value - start) / (end - start));
  return ease(t);
}
