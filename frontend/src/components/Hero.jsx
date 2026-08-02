import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "../assets/orange.png";
import usePointerTilt from "../utils/usePointerTilt";

const BLOBS_PER_STREAM = 4;

const STREAM_PATHS = [
  "M 60 600 C 15 520, 45 460, 95 420 C 155 372, 65 322, 40 262 C 12 198, 95 158, 145 118 C 195 78, 158 42, 200 12",
  "M 340 600 C 385 520, 355 460, 305 420 C 245 372, 335 322, 360 262 C 388 198, 305 158, 255 118 C 205 78, 242 42, 200 12",
];

const STREAM_COLORS = ["#f7941e", "#fac775", "#d85a30"];

export default function Hero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const pathsRef = useRef([]);
  const pathLengths = useRef([]);

  // 3D tilt: the bottle sits in a perspective stage and rotates on its
  // X/Y axes toward the cursor, so it reads as an actual 3D object.
  usePointerTilt(stageRef, tiltRef);

  // Juice-flow draw-in, scrubbed to how far we've scrolled through the hero.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    pathLengths.current = pathsRef.current.map((p) => p?.getTotalLength() ?? 0);
    pathsRef.current.forEach((p, i) => {
      if (!p) return;
      p.style.strokeDasharray = pathLengths.current[i];
      p.style.strokeDashoffset = pathLengths.current[i];
    });

    let raf = null;
    const compute = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      pathsRef.current.forEach((p, i) => {
        if (!p) return;
        p.style.strokeDashoffset = pathLengths.current[i] * (1 - progress);
      });
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
relative
min-h-screen
flex
items-center
overflow-hidden
pt-28
pb-16
px-6
sm:px-10
lg:px-16
"
    >
      <div
        className="
mx-auto
max-w-7xl
w-full
grid
lg:grid-cols-2
gap-16
items-center
"
      >
        {/* LEFT CONTENT */}
        <div>
          <p
            className="
anim-fade-up
text-leaf
font-semibold
mb-5
"
            style={{ "--delay": "0s" }}
          >
            100% Cold-Pressed · Zero Additives
          </p>

          <h1
            className="
font-display
font-semibold
text-[13vw]
sm:text-6xl
lg:text-7xl
leading-[0.98]
text-pine
"
          >
            <span className="anim-fade-up block" style={{ "--delay": "0.18s" }}>
              Sunshine,
            </span>
            <span
              className="anim-fade-up block text-leaf"
              style={{ "--delay": "0.3s" }}
            >
              Bottled Fresh.
            </span>
          </h1>

          <p
            className="
anim-fade-up
mt-7
text-base
sm:text-lg
text-ink/70
max-w-md
leading-relaxed
"
            style={{ "--delay": "0.5s" }}
          >
            No concentrate, no preservatives. Just real oranges pressed fresh
            from the farm directly into your bottle.
          </p>

          <div
            className="
mt-9
flex
flex-wrap
gap-4
"
          >
            <a
              href="#/shop"
              className="
anim-fade-up
inline-flex
items-center
gap-2
rounded-pill
bg-leaf
text-white
font-semibold
px-7
py-3.5
shadow-card
"
              style={{ "--delay": "0.68s" }}
            >
              Start Shopping
              <ArrowRight size={18} />
            </a>

            <a
              href="#reviews"
              className="
anim-fade-up
rounded-pill
border
border-pine/15
text-pine
font-semibold
px-7
py-3.5
"
              style={{ "--delay": "0.78s" }}
            >
              Reviews
            </a>
          </div>
        </div>

        {/* RIGHT BOTTLE AREA */}
        <div
          ref={stageRef}
          className="
relative
flex
justify-center
items-center
h-[420px]
sm:h-[520px]
lg:h-[600px]
"
        >
          <div
            className="
anim-pop
absolute
w-[420px]
h-[420px]
rounded-full
bg-[radial-gradient(circle,rgba(46,158,79,.3),transparent_70%)]
"
            style={{ "--delay": "0.5s" }}
          />

          {/* SVG JUICE FLOW */}
          <svg
            className="
absolute
w-full
h-full
"
            viewBox="0 0 400 640"
          >
            <defs>
              <linearGradient id="juiceGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#d85a30" />
                <stop offset="100%" stopColor="#fac775" />
              </linearGradient>
            </defs>

            {STREAM_PATHS.map((d, i) => (
              <path
                key={i}
                ref={(el) => (pathsRef.current[i] = el)}
                d={d}
                fill="none"
                stroke="url(#juiceGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity=".6"
              />
            ))}

            {/* Juice blobs travel the same paths on a continuous loop —
                handled natively by SVG's <animateMotion>, no JS ticking. */}
            {STREAM_PATHS.map((d, streamIndex) =>
              Array.from({ length: BLOBS_PER_STREAM }).map((_, i) => (
                <circle
                  key={`${streamIndex}-${i}`}
                  r={5 - (i % 3) * 0.8}
                  fill={STREAM_COLORS[(streamIndex + i) % STREAM_COLORS.length]}
                >
                  <animateMotion
                    path={d}
                    dur="3.2s"
                    begin={`${-(i * 0.8)}s`}
                    repeatCount="indefinite"
                    rotate="0"
                    calcMode="linear"
                  />
                </circle>
              ))
            )}
          </svg>

          {/* Entrance (slide in from the right) */}
          <div
            className="anim-slide-in-right relative z-10"
            style={{ "--delay": "0.85s" }}
          >
            {/* Gentle continuous float, independent of the entrance transform */}
            <div className="anim-float">
              {/* Pointer-tilt target: JS drives this element's transform directly */}
              <div ref={tiltRef}>
                {/*
                  Real photo: "Orange Juice in a Glass Bottle" by Timur Weber, Pexels
                  https://www.pexels.com/photo/orange-juice-in-a-glass-bottle-8679338/
                  Pexels License (free for commercial use, no attribution required):
                  https://www.pexels.com/license/
                */}
                <img
                  src={Logo}
                  alt="Da Fresh cold-pressed orange juice bottle"
                  className="
w-56
sm:w-72
lg:w-80
aspect-[3/4]
object-cover
rounded-[2.5rem]
drop-shadow-2xl
ring-1
ring-white/40
"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
