# DA FRESH — Premium Orange Juice Landing Page

A premium, animated landing page for the **DA FRESH** juice brand, built with
React + Vite, Tailwind CSS, and GSAP (ScrollTrigger).

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Requires Node 18+.

## Stack

- **React 18 + Vite** — component architecture, fast dev server
- **Tailwind CSS 3** — utility-first styling, custom design tokens in `tailwind.config.js`
- **GSAP 3 + ScrollTrigger** — all animations (registered once in `src/animations/gsapAnimations.js`)
- **lucide-react** — icon set (menu, stars, plus/accordion, benefit icons)

## Folder structure

```
src/
 |- components/
 |   |- Navbar.jsx        # floating glass pill navbar + mobile menu
 |   |- Hero.jsx           # full-viewport hero, entrance timeline
 |   |- Story.jsx          # 200vh pinned "scatter" scroll section
 |   |- FlavorReveal.jsx   # 200vh pinned three-bottle reveal
 |   |- Products.jsx       # bento grid of benefits
 |   |- Reviews.jsx        # 300vh pinned horizontal-scroll testimonials
 |   |- FAQ.jsx            # accordion with scale/rotation scroll-in
 |   \- Footer.jsx         # links, newsletter, social
 |
 |- animations/
 |   \- gsapAnimations.js # ScrollTrigger registration + shared helpers
 |
 \- assets/
     |- Bottle.jsx         # SVG juice bottle (color/label driven by props)
     \- Orchard.jsx        # SVG orchard collage used in the Story section
```

## A note on assets

The brief's folder structure referenced raster images (bottle.png,
mango.png, watermelon.png, orchard.png, logo.png). No source photography
was supplied, so every product visual was instead hand-built as an inline
SVG React component (Bottle.jsx, Orchard.jsx) — this keeps the page fully
self-contained with nothing to broken-link, renders crisp at any size, and
lets flavor color/label change via props instead of needing three separate
exports. If you have real product photography, swap the <Bottle /> /
<Orchard /> usages for <img> tags pointing at your files — the layout,
sizing classes, and GSAP refs will keep working unchanged.

## Animation notes

- Every scroll animation lives inside a useEffect + gsap.context() so it is
  created and cleaned up per-component (safe for React StrictMode / route
  changes).
- Pinned sections (Story, FlavorReveal, Reviews) use scrub: 1 timelines so
  motion tracks the scrollbar directly rather than auto-playing.
- prefers-reduced-motion is respected globally via index.css.
