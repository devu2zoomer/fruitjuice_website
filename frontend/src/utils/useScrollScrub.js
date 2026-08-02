import { useEffect, useRef } from "react";

/**
 * useScrollScrub
 * Vanilla replacement for GSAP ScrollTrigger's `scrub + pin` combo.
 *
 * The "pin" part is handled purely in CSS: each section that used to be
 * `pin: true` is a tall wrapper (e.g. `h-[200vh]`) around an inner
 * `sticky top-0 h-screen` panel, which is exactly what ScrollTrigger's pin
 * produces under the hood anyway.
 *
 * This hook just tracks how far the user has scrolled through that tall
 * wrapper (0 -> 1) and calls `onProgress(t)` on every animation frame via
 * a scroll listener, so callers can imperatively drive refs the same way
 * the old `tl.to(...)` calls did — no React re-renders per scroll tick.
 */
export default function useScrollScrub(sectionRef, onProgress) {
  const raf = useRef(null);
  const callback = useRef(onProgress);
  callback.current = onProgress;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const compute = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable <= 0
          ? 0
          : Math.min(1, Math.max(0, -rect.top / scrollable));
      callback.current?.(progress);
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [sectionRef]);
}
