"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/properties/PropertyCard";
import type { Property } from "@/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".featured-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".featured-title", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".property-card-item",
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".properties-grid",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".featured-cta",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: ".featured-cta", start: "top 90%" },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-py bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="featured-title">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-3">
              Selección
            </p>
            <h2 className="font-serif text-navy leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)" }}>
              Propiedades seleccionadas
            </h2>
          </div>
          <Link
            href="/venta"
            className="featured-cta flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase text-navy/60 hover:text-navy transition-colors duration-300 group self-start sm:self-auto"
          >
            Ver todas
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="properties-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((property, i) => (
            <div key={property.id} className="property-card-item">
              <PropertyCard property={property} priority={i === 0} />
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="featured-cta mt-12 md:mt-16 text-center">
          <Link
            href="/venta"
            className="inline-flex items-center gap-3 px-8 py-4 border border-navy text-navy font-sans text-sm tracking-[0.08em] uppercase hover:bg-navy hover:text-cream transition-all duration-400 group"
          >
            Ver todas las propiedades
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
