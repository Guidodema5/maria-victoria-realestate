"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.2 });
      tl.fromTo(".hero-img",     { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }, 0)
        .fromTo(".hero-tag",     { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.4)
        .fromTo(".hero-title",   { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.55)
        .fromTo(".hero-sub",     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.75)
        .fromTo(".hero-cta",     { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.9)
        .fromTo(".hero-zones",   { opacity: 0 },        { opacity: 1, duration: 0.5 }, 1.1);
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-navy"
      aria-label="Inicio — María Victoria Real Estate"
      style={{ height: "100svh", minHeight: "600px", maxHeight: "900px" }}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
        alt="Propiedad premium en Buenos Aires"
        fill
        priority
        className="hero-img object-cover object-center opacity-0"
        sizes="100vw"
      />

      {/* Gradient overlay — stronger at bottom where text lives */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
      {/* Left vignette for desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="container-site pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-lg lg:max-w-2xl">

            {/* Tag */}
            <div className="hero-tag opacity-0 inline-flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/90">
                Agente Inmobiliaria · Buenos Aires
              </span>
            </div>

            {/* Title */}
            <h1
              className="hero-title font-serif text-cream opacity-0 mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 4.2rem)", lineHeight: 1.08 }}
            >
              El valor de una propiedad<br />
              <span className="text-gold italic">está en cómo se percibe.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-sub font-sans text-cream/60 opacity-0 mb-8 leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 1.4vw, 1rem)" }}>
              Especialista en real estate y dirección fotográfica profesional.<br className="hidden sm:block" />
              Zona norte y oeste de Buenos Aires.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/venta"
                className="hero-cta opacity-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-obsidian font-sans text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold/90 active:scale-95 transition-all duration-300 group"
              >
                Ver propiedades
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491144709617"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta opacity-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-cream/25 text-cream/80 font-sans text-[11px] font-medium tracking-[0.14em] uppercase hover:border-cream/60 hover:text-cream active:scale-95 transition-all duration-300"
              >
                <Phone size={13} />
                Contactar ahora
              </a>
            </div>

            {/* Zones */}
            <div className="hero-zones opacity-0 flex flex-wrap gap-x-4 gap-y-1.5 pt-6 border-t border-cream/10">
              {["San Diego", "Lagoon Pilar", "Nordelta", "Morón", "CABA"].map((z) => (
                <span key={z} className="inline-flex items-center gap-1.5 font-sans text-[10px] text-cream/35 tracking-wide">
                  <MapPin size={9} className="text-gold/50" />
                  {z}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat card — desktop only */}
      <div className="hidden lg:block absolute right-12 xl:right-20 bottom-16 z-10">
        <div className="bg-cream/[0.06] backdrop-blur-md border border-cream/10 p-6 w-[200px]">
          <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-gold mb-4">En números</p>
          <div className="space-y-3">
            {[
              { n: "+100", l: "Operaciones" },
              { n: "5+",   l: "Años activa" },
              { n: "100%", l: "Foto profesional" },
            ].map(s => (
              <div key={s.n} className="flex items-baseline gap-2">
                <span className="font-serif text-xl text-gold leading-none">{s.n}</span>
                <span className="font-sans text-[10px] text-cream/40">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
