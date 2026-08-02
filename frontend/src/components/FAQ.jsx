import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import useRevealGroup from "../utils/useRevealGroup";

const FAQS = [
  {
    q: "How long does juice stay fresh?",
    a: "Unopened, our cold-pressed bottles stay fresh for up to 14 days when refrigerated. Once opened, we recommend finishing within 48 hours to enjoy peak flavor and nutrients.",
  },
  {
    q: "Is there added sugar?",
    a: "Never. Every bottle contains 100% fruit and nothing else — no added sugar, preservatives, concentrates, or water. What you taste is exactly what the fruit gives.",
  },
  {
    q: "Where are oranges sourced?",
    a: "Our oranges are hand-picked from small, sun-drenched groves that farm without synthetic pesticides, then cold-pressed within hours of harvest to lock in freshness.",
  },
];

export default function FAQ() {
  const listRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  // Cards spiral in (rotate + scale from the center), staggered, and stay
  // revealed once triggered — no flashing in/out on reload or fast scrolls.
  useRevealGroup(listRef, { selector: ".faq-card", stagger: 0.15, once: true });

  return (
    <section className="py-28 px-6 sm:px-10 bg-mist">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <p className="eyebrow text-leaf mb-4">Good to know</p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-pine">
            Frequently Asked Questions
          </h2>
        </div>

        <div ref={listRef} className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="faq-card bg-white rounded-2xl shadow-card border border-black/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 sm:px-7 py-5 text-left"
                >
                  <span className="font-display font-semibold text-lg text-pine">
                    {item.q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-leaf transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out px-6 sm:px-7"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    paddingBottom: isOpen ? "1.5rem" : "0rem",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="text-ink/70 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
