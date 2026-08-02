/**
 * Bottle.jsx
 * A hand-built SVG juice bottle rendered to read as a photoreal 3D product
 * shot: layered glass gradients, specular highlights, condensation beads,
 * a threaded cap and a foil-edged label. Colors are driven by props so the
 * same silhouette can represent every flavor.
 */
import { useId } from "react";

export default function Bottle({
  liquid = "#FF7A29",
  liquidDark = "#E85F0C",
  label = "ORANGE",
  className = "",
}) {
  const uid = useId().replace(/:/g, "");

  const capId = `cap-${uid}`;
  const capShineId = `capShine-${uid}`;
  const glassId = `glass-${uid}`;
  const liquidId = `liquid-${uid}`;
  const liquidTopId = `liquidTop-${uid}`;
  const labelId = `label-${uid}`;
  const shadowId = `shadow-${uid}`;
  const softId = `soft-${uid}`;
  const rimId = `rim-${uid}`;

  return (
    <svg
      viewBox="0 0 280 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={capId} x1="112" y1="0" x2="168" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A2013" />
          <stop offset="18%" stopColor="#1B4A2C" />
          <stop offset="42%" stopColor="#2E7A47" />
          <stop offset="58%" stopColor="#2E7A47" />
          <stop offset="82%" stopColor="#123420" />
          <stop offset="100%" stopColor="#081B10" />
        </linearGradient>
        <linearGradient id={capShineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={glassId} x1="70" y1="0" x2="210" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B9D9C4" stopOpacity="0.55" />
          <stop offset="14%" stopColor="#EAF6EC" stopOpacity="0.85" />
          <stop offset="32%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="55%" stopColor="#F2F9F3" stopOpacity="0.55" />
          <stop offset="78%" stopColor="#CFE6D6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9FC6AC" stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id={liquidId} x1="80" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={liquidDark} />
          <stop offset="18%" stopColor={liquid} />
          <stop offset="50%" stopColor={liquid} stopOpacity="0.9" />
          <stop offset="82%" stopColor={liquid} />
          <stop offset="100%" stopColor={liquidDark} />
        </linearGradient>
        <radialGradient id={liquidTopId} cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="35%" stopColor={liquid} stopOpacity="0.5" />
          <stop offset="100%" stopColor={liquidDark} stopOpacity="0.35" />
        </radialGradient>

        <linearGradient id={labelId} x1="78" y1="0" x2="202" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0C2416" />
          <stop offset="20%" stopColor="#173B24" />
          <stop offset="50%" stopColor="#1D4A2C" />
          <stop offset="80%" stopColor="#153521" />
          <stop offset="100%" stopColor="#0A1E12" />
        </linearGradient>
        <linearGradient id={rimId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4CBE6E" />
          <stop offset="100%" stopColor="#2E9E4F" />
        </linearGradient>

        <radialGradient id={shadowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B2415" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0B2415" stopOpacity="0" />
        </radialGradient>

        <filter id={softId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      <ellipse cx="140" cy="512" rx="92" ry="18" fill={`url(#${shadowId})`} />

      <rect x="113" y="8" width="54" height="36" rx="9" fill={`url(#${capId})`} />
      <rect x="113" y="8" width="54" height="36" rx="9" fill={`url(#${capShineId})`} />
      {[15, 20, 25, 30, 35].map((y) => (
        <line key={y} x1="117" y1={y} x2="163" y2={y} stroke="#081B10" strokeWidth="1" opacity="0.35" />
      ))}
      <rect x="110" y="40" width="60" height="17" rx="6" fill="#0E2818" />
      <rect x="110" y="40" width="60" height="6" rx="3" fill="#1B4A2C" opacity="0.6" />

      <path d="M123 57 L157 57 L163 100 L117 100 Z" fill={`url(#${glassId})`} stroke="#0C2416" strokeWidth="1.5" opacity="0.9" />

      <path
        id={`body-${uid}`}
        d="M117 100
           C 90 124, 76 154, 76 194
           L 76 434
           C 76 472, 105 500, 140 500
           C 175 500, 204 472, 204 434
           L 204 194
           C 204 154, 190 124, 163 100
           Z"
        fill={`url(#${glassId})`}
        stroke="#0C2416"
        strokeWidth="2"
        opacity="0.95"
      />

      <clipPath id={`clip-${uid}`}>
        <path d="M117 100
           C 90 124, 76 154, 76 194
           L 76 434
           C 76 472, 105 500, 140 500
           C 175 500, 204 472, 204 434
           L 204 194
           C 204 154, 190 124, 163 100
           Z" />
      </clipPath>
      <g clipPath={`url(#clip-${uid})`}>
        <path
          d="M80 236 L200 236 L200 434 C200 470 173 496 140 496 C107 496 80 470 80 434 Z"
          fill={`url(#${liquidId})`}
        />
        <path d="M80 236 L200 236 L200 250 C160 262 116 262 80 250 Z" fill={liquidDark} opacity="0.55" />
        <ellipse cx="118" cy="240" rx="46" ry="10" fill={`url(#${liquidTopId})`} />
        <circle cx="100" cy="300" r="2.4" fill="#FFFFFF" opacity="0.25" />
        <circle cx="150" cy="340" r="1.8" fill="#FFFFFF" opacity="0.2" />
        <circle cx="170" cy="280" r="2" fill="#FFFFFF" opacity="0.2" />
        <circle cx="112" cy="400" r="2.2" fill="#FFFFFF" opacity="0.18" />
      </g>

      <path
        d="M94 128 C84 162 82 196 82 236 L82 410"
        stroke="#FFFFFF"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M94 128 C84 162 82 196 82 236 L82 410"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M196 150 C202 190 202 260 200 340 C199 380 196 410 190 440"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />

      <g opacity="0.55" filter={`url(#${softId})`}>
        <circle cx="108" cy="440" r="3.4" fill="#FFFFFF" />
        <circle cx="168" cy="200" r="2.6" fill="#FFFFFF" />
        <circle cx="182" cy="420" r="2.2" fill="#FFFFFF" />
        <circle cx="96" cy="180" r="2" fill="#FFFFFF" />
      </g>
      <g opacity="0.8">
        <ellipse cx="108" cy="434" rx="2.2" ry="4.4" fill="#FFFFFF" />
        <ellipse cx="168" cy="194" rx="1.8" ry="3.4" fill="#FFFFFF" />
      </g>

      <rect x="76" y="278" width="128" height="114" fill={`url(#${labelId})`} />
      <rect x="76" y="278" width="128" height="5" fill={`url(#${rimId})`} />
      <rect x="76" y="387" width="128" height="5" fill={`url(#${rimId})`} />
      <path d="M84 282 L84 388" stroke="#FFFFFF" strokeWidth="10" opacity="0.05" />

      <text
        x="140"
        y="326"
        textAnchor="middle"
        fill="#FBFBF6"
        fontFamily="'Space Mono', monospace"
        fontSize="12"
        letterSpacing="2"
      >
        DA FRESH
      </text>
      <text
        x="140"
        y="354"
        textAnchor="middle"
        fill="#F3FBF4"
        fontFamily="'Fraunces', serif"
        fontSize="21"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x="140"
        y="372"
        textAnchor="middle"
        fill="#9BC7A6"
        fontFamily="'Space Mono', monospace"
        fontSize="8"
        letterSpacing="3"
      >
        COLD PRESSED
      </text>

      <path d="M92 280 C88 310 88 350 92 386" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.12" />
    </svg>
  );
}
