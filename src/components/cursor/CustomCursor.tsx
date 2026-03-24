"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterLink = () => {
      ring?.classList.add("scale-150", "opacity-60");
      dot?.classList.add("scale-0");
    };

    const onMouseLeaveLink = () => {
      ring?.classList.remove("scale-150", "opacity-60");
      dot?.classList.remove("scale-0");
    };

    const onMouseEnterImage = () => {
      ring?.classList.add("scale-[2.5]", "opacity-30");
      dot?.classList.add("scale-0");
    };

    const onMouseLeaveImage = () => {
      ring?.classList.remove("scale-[2.5]", "opacity-30");
      dot?.classList.remove("scale-0");
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      // Ring follows with lag
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1);
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove);

    // Attach hover listeners to interactive elements
    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
      document.querySelectorAll("img, [data-cursor='image']").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterImage);
        el.addEventListener("mouseleave", onMouseLeaveImage);
      });
    };

    addListeners();

    // Re-attach on DOM changes (for dynamically loaded content)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold pointer-events-none z-[9999] transition-all duration-300 ease-out hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
