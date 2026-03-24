"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, Star } from "lucide-react";

gsap.registerPlugin(useGSAP);

const zones = ["San Diego", "Lagoon Pilar", "Nordelta", "CABA"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: 0.2 })
        .fromTo(".hero-eyebrow", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
        .fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
        .fromTo(".hero-zones", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-cta", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .fromTo(".hero-badge", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-image", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }, 0);
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col lg:flex-row overflow-hidden"
      aria-label="Inicio — María Victoria Real Estate"
    >
      {/* ── MOBILE background image (hidden on lg+) ─── */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
      </div>

      {/* ── LEFT PANEL ──────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 md:px-16 xl:px-24 pt-32 pb-14 lg:bg-navy lg:pt-0 lg:pb-0 min-h-[100svh] lg:min-h-0">

        {/* Accent line */}
        <div className="hero-line w-10 h-px bg-gold mb-8 origin-left" />

        {/* Eyebrow */}
        <p className="hero-eyebrow font-sans text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-5 opacity-0">
          María Victoria · Agente Inmobiliaria
        </p>

        {/* Title */}
        <h1
          className="hero-title font-serif text-cream leading-[1.05] mb-6 opacity-0"
          style={{ fontSize: "clamp(2.4rem, 4.5vw, 5rem)" }}
        >
          Comprá o alquilá<br />
          <span className="text-gold">propiedades</span><br />
          en Buenos Aires.
        </h1>

        {/* Description */}
        <p className="hero-desc font-sans text-cream/60 text-base leading-relaxed max-w-sm mb-8 opacity-0">
          Especialista en zona norte y oeste. Cada propiedad se presenta con dirección fotográfica profesional para maximizar su valor percibido.
        </p>

        {/* Zones */}
        <div className="hero-zones flex flex-wrap gap-x-4 gap-y-2 mb-10 opacity-0" aria-label="Zonas de operación">
          {zones.map((z) => (
            <span key={z} className="flex items-center gap-1.5 font-sans text-xs text-cream/40">
              <MapPin size={10} className="text-gold/60" aria-hidden="true" />
              {z}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/venta"
            className="hero-cta opacity-0 inline-flex items-center justify-center gap-2 px-7 py-4 bg-gold text-obsidian font-sans text-xs font-semibold tracking-[0.12em] uppercase hover:bg-gold/90 transition-all duration-300 group"
          >
            Ver propiedades
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/#contacto"
            className="hero-cta opacity-0 inline-flex items-center justify-center px-7 py-4 border border-cream/20 text-cream/80 font-sans text-xs font-medium tracking-[0.12em] uppercase hover:border-cream/60 hover:text-cream transition-all duration-300"
          >
            Contactar
          </Link>
        </div>

        {/* Trust badge */}
        <div className="hero-badge opacity-0 flex items-center gap-3 mt-10 pt-8 border-t border-cream/10">
          <div className="flex -space-x-1" aria-label="5 estrellas" role="img">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="text-gold fill-gold" aria-hidden="true" />
            ))}
          </div>
          <p className="font-sans text-xs text-cream/40">
            +100 operaciones concretadas en zona norte y oeste
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — IMAGE (desktop only) ──────────────────────── */}
      <div className="hero-image opacity-0 relative hidden lg:block lg:w-[48%]">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90"
          alt="Propiedad premium en Buenos Aires"
          fill
          priority
          className="object-cover"
          sizes="48vw"
        />
        {/* Edge gradient into left panel */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent" aria-hidden="true" />

        {/* Floating property card */}
        <div className="absolute bottom-12 left-8 max-w-[260px] bg-navy/90 backdrop-blur-sm p-5 border border-cream/10">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold mb-2">Destacada</p>
          <p className="font-serif text-cream text-base leading-snug mb-1">Casa en Lagoon Pilar</p>
          <p className="font-sans text-xs text-cream/50">4 amb · 320 m² · USD 580,000</p>
          <Link
            href="/venta"
            className="inline-flex items-center gap-1.5 mt-3 font-sans text-[10px] tracking-[0.1em] uppercase text-gold hover:text-gold/70 transition-colors duration-300"
            aria-label="Ver propiedades en venta"
          >
            Ver más <ArrowRight size={10} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
