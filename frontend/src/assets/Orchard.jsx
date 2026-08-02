/**
 * Orchard.jsx
 * A collage of individually-classed SVG pieces representing a sun-kissed
 * orange grove. Story.jsx targets each `.orchard-piece` with GSAP and
 * animates them apart while a center orange (`.orchard-core`) stays put,
 * shrinking into the background as copy fades in over it.
 */
export default function Orchard({ className = "" }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sun */}
      <circle className="orchard-piece" data-dir="up" cx="300" cy="120" r="70" fill="#FFE7C2" />

      {/* Leaves scattered around center */}
      <ellipse className="orchard-piece" data-dir="up-left" cx="180" cy="180" rx="46" ry="26" fill="#2E9E4F" transform="rotate(-30 180 180)" />
      <ellipse className="orchard-piece" data-dir="up-right" cx="420" cy="180" rx="46" ry="26" fill="#1F7A3B" transform="rotate(30 420 180)" />
      <ellipse className="orchard-piece" data-dir="left" cx="120" cy="330" rx="52" ry="28" fill="#2E9E4F" transform="rotate(20 120 330)" />
      <ellipse className="orchard-piece" data-dir="right" cx="480" cy="330" rx="52" ry="28" fill="#1F7A3B" transform="rotate(-20 480 330)" />
      <ellipse className="orchard-piece" data-dir="down-left" cx="190" cy="470" rx="48" ry="26" fill="#2E9E4F" transform="rotate(15 190 470)" />
      <ellipse className="orchard-piece" data-dir="down-right" cx="410" cy="470" rx="48" ry="26" fill="#1F7A3B" transform="rotate(-15 410 470)" />

      {/* Small oranges dotted around */}
      <circle className="orchard-piece" data-dir="up-left" cx="150" cy="260" r="20" fill="#FF7A29" />
      <circle className="orchard-piece" data-dir="up-right" cx="450" cy="260" r="20" fill="#FF9A50" />
      <circle className="orchard-piece" data-dir="down" cx="300" cy="520" r="22" fill="#FF7A29" />
      <circle className="orchard-piece" data-dir="down-left" cx="220" cy="400" r="16" fill="#FF9A50" />
      <circle className="orchard-piece" data-dir="down-right" cx="380" cy="400" r="16" fill="#FF7A29" />

      {/* Water droplets */}
      <circle className="orchard-piece" data-dir="left" cx="240" cy="140" r="8" fill="#BFE7CB" />
      <circle className="orchard-piece" data-dir="right" cx="360" cy="140" r="8" fill="#BFE7CB" />

      {/* Center orange — stays put as the anchor */}
      <g className="orchard-core">
        <circle cx="300" cy="330" r="110" fill="#FF7A29" />
        <circle cx="300" cy="330" r="110" fill="url(#orangeShade)" />
        <g stroke="#E85F0C" strokeWidth="2" opacity="0.5">
          <line x1="300" y1="220" x2="300" y2="440" />
          <line x1="200" y1="260" x2="400" y2="400" />
          <line x1="200" y1="400" x2="400" y2="260" />
        </g>
        <circle cx="300" cy="330" r="110" fill="none" stroke="#F3FBF4" strokeWidth="4" />
        <ellipse cx="270" cy="290" rx="28" ry="16" fill="#FFFFFF" opacity="0.25" />
      </g>

      <defs>
        <radialGradient id="orangeShade" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#FF9A50" />
          <stop offset="100%" stopColor="#E85F0C" />
        </radialGradient>
      </defs>
    </svg>
  );
}
