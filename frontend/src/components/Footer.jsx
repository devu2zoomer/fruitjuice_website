import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import useRevealGroup from "../utils/useRevealGroup";

const PRODUCT_LINKS = ["Orange Juice", "Mango Juice", "Watermelon Juice", "Bundles"];

// Lightweight inline social icons (lucide-react dropped brand marks in
// recent versions, so these are hand-drawn to keep the bundle dependency-free).
const SOCIALS = [
  {
    name: "Instagram",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "X",
    path: <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />,
  },
  {
    name: "Facebook",
    path: (
      <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v6H14v-6h2.5l.5-3H14v-2c0-.5.3-1 1-1z" fill="currentColor" stroke="none" />
    ),
  },
  {
    name: "YouTube",
    path: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef(null);

  useRevealGroup(footerRef, { stagger: 0.1, threshold: 0.1 });

  return (
    <footer id="footer" className="bg-pine text-white pt-20 pb-8 px-6 sm:px-10">
      <div
        ref={footerRef}
        className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-8 w-8 rounded-full bg-leaf flex items-center justify-center">
              <span className="h-3.5 w-3.5 rounded-full bg-citrus" />
            </span>
            <span className="font-display font-semibold text-lg">DA FRESH</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Pure, cold-pressed juice made from real fruit, delivered from
            grove to doorstep.
          </p>
        </div>

        {/* Product links */}
        <div>
          <p className="eyebrow text-leaf mb-5">Products</p>
          <ul className="space-y-3 text-sm text-white/70">
            {PRODUCT_LINKS.map((link) => (
              <li key={link}>
                <a href="#/shop" className="hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-2">
          <p className="eyebrow text-leaf mb-5">Stay in the loop</p>
          <p className="text-white/60 text-sm mb-4 max-w-sm">
            Get fresh drops, seasonal flavors, and grove stories in your
            inbox — no spam, ever.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-pill bg-white/10 border border-white/15 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-leaf transition-colors"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="h-11 w-11 shrink-0 rounded-full bg-leaf hover:bg-leaf-dark transition-colors flex items-center justify-center"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="flex items-center gap-4 mt-8">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-leaf transition-colors flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {s.path}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <p>© {new Date().getFullYear()} DA FRESH. All rights reserved.</p>
        <p>Pure. Natural. Refreshing.</p>
      </div>
    </footer>
  );
}
