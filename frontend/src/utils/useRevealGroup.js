import { useEffect } from "react";

/**
 * useRevealGroup
 * Vanilla replacement for the old `scrollFadeIn` GSAP/ScrollTrigger helper.
 * Watches `containerRef` and toggles a `.reveal-in` class on every element
 * matched by `selector` (or every direct child, if no selector is given)
 * whenever the container crosses into/out of the viewport — reproducing
 * GSAP's `toggleActions: "play none none reverse"` (replays on the way
 * back up too).
 *
 * Actual motion (opacity/transform/stagger) lives in CSS via the
 * `.reveal-item` / `.reveal-in` classes in index.css, driven by each
 * item's `--reveal-delay` custom property for the stagger.
 */
export default function useRevealGroup(
  containerRef,
  {
    selector = null,
    stagger = 0.12,
    threshold = 0.2,
    rootMargin = "0px 0px -10% 0px",
    once = false,
  } = {}
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = selector
      ? Array.from(container.querySelectorAll(selector))
      : Array.from(container.children);

    items.forEach((el, i) => {
      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", `${i * stagger}s`);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((el) => el.classList.add("reveal-in"));
          if (once) observer.disconnect();
        } else if (!once) {
          items.forEach((el) => el.classList.remove("reveal-in"));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, selector, stagger, threshold, rootMargin, once]);
}
