"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: "+100", label: "Operaciones concretadas" },
  { value: "5+",   label: "Años de experiencia" },
  { value: "5",    label: "Zonas premium" },
  { value: "100%", label: "Foto profesional incluida" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".stat-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-navy py-16 md:py-20 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cream/10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item opacity-0 flex flex-col items-center justify-center py-8 px-4 md:px-8 text-center"
            >
              <span
                className="font-serif text-gold leading-none"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                {s.value}
              </span>
              <span className="font-sans text-xs text-cream/40 mt-3 tracking-wide max-w-[120px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
