import { useRef } from "react";
import { Leaf, Sparkles } from "lucide-react";
import useScrollScrub from "../utils/useScrollScrub";
import { lerp, scrubProgress, easeInOutQuad, easeOutCubic } from "../utils/easing";

// Direction keywords on each orchard piece map to a scatter vector.
const VECTORS = {
  up: { x: 0, y: -260 },
  down: { x: 0, y: 260 },
  left: { x: -260, y: 0 },
  right: { x: 260, y: 0 },
  "up-left": { x: -220, y: -220 },
  "up-right": { x: 220, y: -220 },
  "down-left": { x: -220, y: 220 },
  "down-right": { x: 220, y: 220 },
};

/**
 * Real photography, hotlinked from Pexels (free license, no attribution
 * required: https://www.pexels.com/license/). This sandbox can only reach
 * package registries over the network, not image CDNs, so these can't be
 * downloaded and self-hosted from here — for production, download the
 * files and serve them from /src/assets instead.
 */
const PIECES = [
  { key: "sun", dir: "up", top: "20%", left: "50%", size: "clamp(70px,14vw,130px)", photo: "https://images.pexels.com/photos/6424619/pexels-photo-6424619.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { key: "leaf-ul", dir: "up-left", top: "30%", left: "30%", size: "clamp(56px,10vw,92px)", photo: "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { key: "leaf-ur", dir: "up-right", top: "30%", left: "70%", size: "clamp(56px,10vw,92px)", photo: "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { key: "leaf-l", dir: "left", top: "55%", left: "20%", size: "clamp(60px,11vw,100px)", photo: "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { key: "leaf-r", dir: "right", top: "55%", left: "80%", size: "clamp(60px,11vw,100px)", photo: "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { key: "leaf-dl", dir: "down-left", top: "78%", left: "31.7%", size: "clamp(56px,10vw,92px)", photo: "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { key: "leaf-dr", dir: "down-right", top: "78%", left: "68.3%", size: "clamp(56px,10vw,92px)", photo: "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { key: "orange-ul", dir: "up-left", top: "43%", left: "25%", size: "clamp(34px,6.5vw,56px)", photo: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg?auto=compress&cs=tinysrgb&w=160" },
  { key: "orange-ur", dir: "up-right", top: "43%", left: "75%", size: "clamp(34px,6.5vw,56px)", photo: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg?auto=compress&cs=tinysrgb&w=160" },
  { key: "orange-d", dir: "down", top: "87%", left: "50%", size: "clamp(38px,7vw,62px)", photo: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg?auto=compress&cs=tinysrgb&w=160" },
  { key: "orange-dl", dir: "down-left", top: "67%", left: "36.7%", size: "clamp(28px,5vw,44px)", photo: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg?auto=compress&cs=tinysrgb&w=160" },
  { key: "orange-dr", dir: "down-right", top: "67%", left: "63.3%", size: "clamp(28px,5vw,44px)", photo: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg?auto=compress&cs=tinysrgb&w=160" },
  { key: "drop-l", dir: "left", top: "23%", left: "40%", size: "clamp(18px,3.5vw,28px)", photo: "https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?auto=compress&cs=tinysrgb&w=120" },
  { key: "drop-r", dir: "right", top: "23%", left: "60%", size: "clamp(18px,3.5vw,28px)", photo: "https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?auto=compress&cs=tinysrgb&w=120" },
];

export default function Story() {
  const sectionRef = useRef(null);
  const orchardWrapRef = useRef(null);
  const coreRef = useRef(null);
  const contentRef = useRef(null);
  const badgesRef = useRef(null);
  const pieceRefs = useRef({});

  useScrollScrub(sectionRef, (p) => {
    // Step 1 + 2: pieces scatter, core recedes, wrap zooms — all [0, 0.83]
    const scatterT = scrubProgress(p, 0, 0.83, easeInOutQuad);
    PIECES.forEach(({ key, dir }) => {
      const el = pieceRefs.current[key];
      if (!el) return;
      const vec = VECTORS[dir] || { x: 0, y: -200 };
      el.style.transform = `translate(-50%, -50%) translate(${vec.x * scatterT}px, ${
        vec.y * scatterT
      }px)`;
      el.style.opacity = String(1 - scatterT);
    });

    if (coreRef.current) {
      coreRef.current.style.transform = `translate(-50%, -50%) scale(${lerp(
        1,
        0.55,
        scatterT
      )})`;
      coreRef.current.style.opacity = String(lerp(1, 0.15, scatterT));
    }
    if (orchardWrapRef.current) {
      orchardWrapRef.current.style.transform = `scale(${lerp(1, 1.15, scatterT)})`;
    }

    // Step 3: copy fades into the empty center, [0.29, 0.96]
    const contentT = scrubProgress(p, 0.292, 0.958, easeOutCubic);
    if (contentRef.current) {
      contentRef.current.style.opacity = String(contentT);
      contentRef.current.style.transform = `translateY(${lerp(40, 0, contentT)}px)`;
    }

    // Badges, [0.5, 1]
    const badgeT = scrubProgress(p, 0.5, 1, easeOutCubic);
    if (badgesRef.current) {
      Array.from(badgesRef.current.children).forEach((child, i) => {
        const localT = scrubProgress(badgeT, i * 0.12, i * 0.12 + 0.7, (t) => t);
        child.style.opacity = String(localT);
        child.style.transform = `translateY(${lerp(20, 0, localT)}px)`;
      });
    }
  });

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-mist">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Orchard collage, positioned to fill the pinned viewport */}
        <div
          ref={orchardWrapRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[70vw] max-w-[560px] aspect-square">
            {PIECES.map(({ key, dir, top, left, size, photo }) => (
              <img
                key={key}
                ref={(el) => (pieceRefs.current[key] = el)}
                src={photo}
                alt=""
                data-dir={dir}
                className="orchard-piece absolute rounded-full object-cover shadow-md ring-2 ring-white/70"
                style={{
                  top,
                  left,
                  width: size,
                  height: size,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {/* Center orange — stays put as the anchor */}
            <img
              ref={coreRef}
              // "Orange Fruit" (whole + sliced half) by Pixabay, CC0
              // https://www.pexels.com/photo/orange-fruit-161559/
              src="https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Whole and sliced fresh orange"
              className="orchard-core absolute rounded-full object-cover shadow-xl ring-4 ring-white"
              style={{
                top: "55%",
                left: "50%",
                width: "clamp(180px,36vw,260px)",
                height: "clamp(180px,36vw,260px)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>

        {/* Center content that reveals as pieces scatter away */}
        <div
          ref={contentRef}
          className="relative z-10 max-w-xl text-center"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <p className="eyebrow text-leaf mb-4 flex items-center justify-center gap-2">
            <Leaf size={14} /> Our Story
          </p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-pine leading-tight">
            Born from Nature&rsquo;s Purest Essence
          </h2>
          <p className="mt-6 text-ink/70 text-base sm:text-lg leading-relaxed">
            At DA FRESH, we believe the best things in life are simple. Our
            mission is to capture the unfiltered energy of nature and bottle
            it without compromise.
          </p>

          <div
            ref={badgesRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-sm font-semibold text-pine shadow-card"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              <Sparkles size={14} className="text-leaf" /> 100% Organic
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-sm font-semibold text-pine shadow-card"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              <Leaf size={14} className="text-leaf" /> Sugar Free
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
