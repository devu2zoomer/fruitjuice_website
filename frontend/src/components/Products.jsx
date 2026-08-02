import { useRef } from "react";
import { ShieldPlus, Zap, Citrus, Snowflake } from "lucide-react";
import useRevealGroup from "../utils/useRevealGroup";

const BENEFITS = [
  {
    title: "Immunity Boosted",
    desc: "Packed with antioxidants that help your body defend itself, day after day.",
    icon: ShieldPlus,
    span: "lg:col-span-2 lg:row-span-1",
    tone: "text-white",
    image:
      "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=1600&q=80",
    overlay: "from-leaf-dark/90 via-leaf-dark/55 to-leaf-dark/20",
  },
  {
    title: "Natural Energy",
    desc: "No crash, no jitters — just clean fructose energy from real fruit.",
    icon: Zap,
    span: "lg:col-span-1 lg:row-span-3",
    tone: "text-white",
    image:
      "https://images.unsplash.com/photo-1514489024785-d5ba8dfb2198?auto=format&fit=crop&w=1200&q=80",
    overlay: "from-pine/95 via-pine/60 to-pine/25",
  },
  {
    title: "Vitamin C Rich",
    desc: "One bottle covers your daily dose, straight from the source.",
    icon: Citrus,
    span: "lg:col-span-2 lg:row-span-1",
    tone: "text-white",
    image:
      "https://images.unsplash.com/photo-1741461638883-d312143aea0d?auto=format&fit=crop&w=1200&q=80",
    overlay: "from-citrus/90 via-ink/40 to-ink/10",
  },
  {
    title: "Cold Press Technology",
    desc: "Slow-extracted at low temperature to lock in flavor and nutrients.",
    icon: Snowflake,
    span: "lg:col-span-2 lg:row-span-1",
    tone: "text-white",
    image:
      "https://images.unsplash.com/photo-1578323851363-cf6a1a6afbb6?auto=format&fit=crop&w=1600&q=80",
    overlay: "from-ink/85 via-ink/50 to-ink/20",
  },
];

export default function Products() {
  const gridRef = useRef(null);

  // Each card fades/scales up into place as it enters the viewport.
  useRevealGroup(gridRef, { selector: ".bento-card", stagger: 0.12 });

  return (
    <section className="py-28 px-6 sm:px-10 bg-cream">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow text-leaf mb-4">Why DA FRESH</p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-pine">
            Goodness in Every Bottle
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5"
        >
          {BENEFITS.map(({ title, desc, icon: Icon, span, tone, image, overlay }) => (
            <div
              key={title}
              className={`bento-card group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between shadow-card border border-black/5 transition-transform duration-300 hover:-translate-y-1.5 ${span} ${tone}`}
            >
              {/* Real photo background */}
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Gradient overlay for legibility + brand tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${overlay}`}
              />

              <Icon size={30} className="relative opacity-95 drop-shadow" />
              <div className="relative mt-8">
                <h3 className="font-display font-semibold text-2xl mb-2 drop-shadow-sm">
                  {title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed drop-shadow-sm">{desc}</p>
              </div>
              {/* Decorative glow on hover */}
              <span className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
