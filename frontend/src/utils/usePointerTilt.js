import { useEffect } from "react";
import { lerp } from "./easing";

/**
 * usePointerTilt
 * Replaces `gsap.quickTo(el, "rotationX"/"rotationY", ...)`. Tracks the
 * pointer over `stageRef` and smoothly eases `targetRef`'s rotationX/Y
 * toward the cursor position using a simple exponential-lerp rAF loop —
 * the same "spring toward a moving target" feel quickTo gave us, without
 * the library.
 */
export default function usePointerTilt(stageRef, targetRef, { maxY = 26, maxX = 18, ease = 0.18 } = {}) {
  useEffect(() => {
    const stage = stageRef.current;
    const target = targetRef.current;
    if (!stage || !target) return;

    let current = { x: 0, y: 0 };
    let desired = { x: 0, y: 0 };
    let raf = null;

    const tick = () => {
      current.x = lerp(current.x, desired.x, ease);
      current.y = lerp(current.y, desired.y, ease);
      target.style.transform = `rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const handlePointerMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      desired = { x: -py * maxX, y: px * maxY };
    };

    const handlePointerLeave = () => {
      desired = { x: 0, y: 0 };
    };

    stage.style.perspective = "900px";
    target.style.transformStyle = "preserve-3d";

    stage.addEventListener("mousemove", handlePointerMove);
    stage.addEventListener("mouseleave", handlePointerLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      stage.removeEventListener("mousemove", handlePointerMove);
      stage.removeEventListener("mouseleave", handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stageRef, targetRef, maxX, maxY, ease]);
}
