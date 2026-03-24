"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: "+100", label: "Operaciones concretadas", sublabel: "en zona norte y oeste" },
  { value: "5+", label: "Años de trayectoria", sublabel: "en real estate premium" },
  { value: "5", label: "Zonas premium", sublabel: "San Diego · Pilar · Nordelta · Morón · CABA" },
  { value: "100%", label: "Foto profesional", sublabel: "incluida en cada operación" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".stat-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-cream border-y border-navy/10 py-14 md:py-18">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-navy/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item px-6 md:px-10 first:pl-0 last:pr-0 text-center lg:text-left py-4 lg:py-0"
            >
              <p
                className="font-serif text-navy leading-none mb-1"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                {stat.value}
              </p>
              <p className="font-sans text-xs font-semibold text-navy/70 leading-snug mb-0.5 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="font-sans text-[11px] text-cool-gray leading-tight">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
