import { useRef } from "react";
import useScrollScrub from "../utils/useScrollScrub";
import { lerp, scrubProgress, easeInOutQuad, easeOutQuad } from "../utils/easing";

/**
 * Real product photography, hotlinked from Pexels (free license, no
 * attribution required: https://www.pexels.com/license/). This sandbox
 * can only reach package registries over the network, not image CDNs, so
 * these can't be downloaded and self-hosted from here — for production,
 * download the files and serve them from /src/assets instead.
 */
const FLAVORS = [
  {
    key: "watermelon",
    label: "WATERMELON",
    photo: "https://images.pexels.com/photos/11009208/pexels-photo-11009208.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "orange",
    label: "ORANGE",
    photo: "https://images.pexels.com/photos/5946790/pexels-photo-5946790.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "mango",
    label: "MANGO",
    photo: "https://images.pexels.com/photos/4955257/pexels-photo-4955257.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function FlavorReveal() {
  const sectionRef = useRef(null);
  const watermelonRef = useRef(null);
  const orangeRef = useRef(null);
  const mangoRef = useRef(null);
  const textRef = useRef(null);

  useScrollScrub(sectionRef, (p) => {
    // Bottles settle in, [0, 0.77]
    const bottleT = scrubProgress(p, 0, 0.769, easeInOutQuad);

    if (orangeRef.current) {
      orangeRef.current.style.transform = `translateX(${lerp(0, -220, bottleT)}px)`;
    }
    if (watermelonRef.current) {
      watermelonRef.current.style.transform = `translateX(${lerp(
        -600,
        0,
        bottleT
      )}px)`;
      watermelonRef.current.style.opacity = String(bottleT);
    }
    if (mangoRef.current) {
      mangoRef.current.style.transform = `translateX(${lerp(600, 0, bottleT)}px)`;
      mangoRef.current.style.opacity = String(bottleT);
    }

    // Copy fades in from the right, [0.38, 1]
    const textT = scrubProgress(p, 0.385, 1, easeOutQuad);
    if (textRef.current) {
      textRef.current.style.opacity = String(textT);
      textRef.current.style.transform = `translateX(${lerp(80, 0, textT)}px)`;
    }
  });

  return (
    <section
      id="flavors"
      ref={sectionRef}
      className="relative h-[200vh] bg-cream"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-10">
        <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          {/* Bottle stage */}
          <div className="relative h-[360px] sm:h-[440px] flex items-center justify-center">
            <div
              ref={watermelonRef}
              className="absolute"
              style={{ transform: "translateX(-600px)", opacity: 0 }}
            >
              <img
                src={FLAVORS[0].photo}
                alt={`Da Fresh ${FLAVORS[0].label.toLowerCase()} juice`}
                className="w-40 sm:w-48 aspect-[3/4] object-cover rounded-[2rem] drop-shadow-xl ring-1 ring-white/40"
              />
            </div>
            <div ref={orangeRef} className="absolute z-10">
              <img
                src={FLAVORS[1].photo}
                alt={`Da Fresh ${FLAVORS[1].label.toLowerCase()} juice`}
                className="w-48 sm:w-60 aspect-[3/4] object-cover rounded-[2.5rem] drop-shadow-2xl ring-1 ring-white/40"
              />
            </div>
            <div
              ref={mangoRef}
              className="absolute"
              style={{ transform: "translateX(600px)", opacity: 0 }}
            >
              <img
                src={FLAVORS[2].photo}
                alt={`Da Fresh ${FLAVORS[2].label.toLowerCase()} juice`}
                className="w-40 sm:w-48 aspect-[3/4] object-cover rounded-[2rem] drop-shadow-xl ring-1 ring-white/40"
              />
            </div>
          </div>

          {/* Copy */}
          <div
            ref={textRef}
            className="text-center lg:text-left"
            style={{ opacity: 0, transform: "translateX(80px)" }}
          >
            <p className="eyebrow text-leaf mb-4">Meet The Lineup</p>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl text-pine leading-tight">
              The Fresh Trio
            </h2>
            <p className="mt-5 text-ink/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Pure, cold pressed and full of life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
