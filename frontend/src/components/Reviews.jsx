import { useRef } from "react";
import { Star } from "lucide-react";
import useScrollScrub from "../utils/useScrollScrub";

const REVIEWS = [
  {
    name: "Ananya Rao",
    role: "Yoga Instructor",
    quote:
      "The freshest juice I've ever had delivered. It tastes like it was squeezed five minutes ago, every single time.",
    initials: "AR",
  },
  {
    name: "Karthik Menon",
    role: "Software Engineer",
    quote:
      "Cut sugary drinks from my mornings and never looked back. DA FRESH is now a non-negotiable part of my routine.",
    initials: "KM",
  },
  {
    name: "Sara Thomas",
    role: "Nutritionist",
    quote:
      "I recommend this to clients who want real fruit, not concentrate. The cold-press process really shows in the taste.",
    initials: "ST",
  },
  {
    name: "Devika Nair",
    role: "Marathon Runner",
    quote:
      "My go-to recovery drink after long runs. Clean ingredients and it actually keeps me energized, not sluggish.",
    initials: "DN",
  },
  {
    name: "Rohan Iyer",
    role: "Café Owner",
    quote:
      "We stock DA FRESH at our counter and customers ask for it by name. Quality that speaks for itself.",
    initials: "RI",
  },
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useScrollScrub(sectionRef, (p) => {
    const track = trackRef.current;
    if (!track) return;
    const distance = track.scrollWidth - window.innerWidth + 96; // +96 side padding
    track.style.transform = `translateX(${-Math.max(0, distance) * p}px)`;
  });

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative h-[300vh] bg-pine"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 sm:px-10 mb-10">
          <p className="eyebrow text-leaf mb-4">Loved by thousands</p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-white max-w-lg">
            What Our Drinkers Say
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 px-6 sm:px-10 will-change-transform"
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="shrink-0 w-[300px] sm:w-[360px] rounded-3xl bg-white p-8 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-citrus mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-ink/80 leading-relaxed text-[15px]">
                  “{r.quote}”
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-11 w-11 rounded-full bg-leaf-light text-leaf-dark font-display font-semibold flex items-center justify-center">
                  {r.initials}
                </span>
                <div>
                  <p className="font-semibold text-pine text-sm">{r.name}</p>
                  <p className="text-ink/50 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
