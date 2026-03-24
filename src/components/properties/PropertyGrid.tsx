"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".grid-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
        }
      );
    });
  }, { scope: containerRef });

  if (properties.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-serif text-2xl text-navy/30 mb-3">Sin resultados</p>
        <p className="font-sans text-sm text-cool-gray">
          Probá cambiando los filtros de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {properties.map((property, i) => (
        <div key={property.id} className="grid-card">
          <PropertyCard property={property} priority={i < 3} />
        </div>
      ))}
    </div>
  );
}
