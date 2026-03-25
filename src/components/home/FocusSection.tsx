"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pillars = [
  {
    label: "Criterio",
    title: "Selección de propiedades premium",
    desc: "No trabajo con cualquier propiedad. Elijo operar con activos que tienen potencial real de posicionamiento.",
  },
  {
    label: "Imagen",
    title: "Dirección fotográfica incluida",
    desc: "Cada propiedad se fotografía con intención. La luz, el encuadre y los detalles construyen la percepción de valor.",
  },
  {
    label: "Resultados",
    title: "Posicionamiento que vende",
    desc: "El objetivo no es publicar. Es que la propiedad se perciba correctamente y genere las consultas indicadas.",
  },
];

export default function FocusSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".focus-headline",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".focus-headline", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".focus-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".focus-divider", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".pillar-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: ".pillars-grid", start: "top 80%" },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 md:py-20 bg-navy overflow-hidden">
      <div className="container-site">
        {/* Main headline */}
        <div className="mb-12 md:mb-16 text-center">
          <h2
            className="focus-headline font-serif text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            No es solo real estate.
            <br />
            <em className="text-gold not-italic">Es estrategia + imagen.</em>
          </h2>
        </div>

        {/* Divider */}
        <div
          className="focus-divider h-px bg-cream/10 mb-12 md:mb-16 origin-left"
          style={{ transformOrigin: "left" }}
        />

        {/* Three pillars */}
        <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar, i) => (
            <div key={pillar.label} className="pillar-item">
              {/* Number */}
              <p className="font-serif text-6xl md:text-7xl text-cream/5 font-bold leading-none mb-6 select-none">
                0{i + 1}
              </p>
              {/* Label */}
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">
                {pillar.label}
              </p>
              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl text-cream leading-snug mb-4">
                {pillar.title}
              </h3>
              {/* Description */}
              <p className="font-sans text-sm text-cream/50 leading-relaxed">
                {pillar.desc}
              </p>
              {/* Accent line */}
              <div className="mt-8 w-12 h-px bg-gold/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
