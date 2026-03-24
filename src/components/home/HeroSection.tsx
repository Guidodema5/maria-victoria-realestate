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
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.3 });
      tl.fromTo(".hero-line",    { scaleX: 0 },           { scaleX: 1,   duration: 0.7 })
        .fromTo(".hero-eyebrow", { y: 10, opacity: 0 },   { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-title",   { y: 36, opacity: 0 },   { y: 0, opacity: 1, duration: 0.8 }, "-=0.2")
        .fromTo(".hero-desc",    { y: 20, opacity: 0 },   { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
        .fromTo(".hero-zones",   { y: 14, opacity: 0 },   { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-cta",     { y: 14, opacity: 0 },   { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .fromTo(".hero-badge",   { opacity: 0 },          { opacity: 1,  duration: 0.4 }, "-=0.1")
        .fromTo(".hero-img",     { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, 0);
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex overflow-hidden bg-navy"
      aria-label="Inicio — María Victoria Real Estate"
    >
      {/* ─── BACKGROUND image (visible en todos los dispositivos) ─── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90"
          alt="Propiedad premium en Buenos Aires"
          fill
          priority
          className="hero-img object-cover opacity-0"
          sizes="100vw"
        />
        {/* Overlay oscuro — más intenso en mobile, más suave en desktop derecho */}
        <div className="absolute inset-0 bg-navy/85 lg:bg-gradient-to-r lg:from-navy lg:via-navy/90 lg:to-navy/40" />
      </div>

      {/* ─── CONTENT ──────────────────────────────────────────── */}
      {/*
          pt-28 = 7rem = 112px → navbar ~80px + 32px de aire
          En desktop: max-w-2xl para que el texto quede en el lado izquierdo
      */}
      <div className="relative z-10 w-full flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pb-16 md:pb-24 min-h-screen">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Línea dorada */}
          <div className="hero-line w-10 h-px bg-gold mb-7 origin-left" />

          {/* Eyebrow */}
          <p className="hero-eyebrow font-sans text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-5 opacity-0">
            María Victoria · Agente Inmobiliaria
          </p>

          {/* Título */}
          <h1
            className="hero-title font-serif text-cream leading-[1.06] mb-6 opacity-0"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            Comprá o alquilá<br />
            <span className="text-gold">propiedades</span><br />
            en Buenos Aires.
          </h1>

          {/* Descripción */}
          <p className="hero-desc font-sans text-cream/60 leading-relaxed mb-8 opacity-0"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
            Especialista en zona norte y oeste. Dirección fotográfica<br className="hidden sm:block" />
            profesional incluida para maximizar el valor percibido.
          </p>

          {/* Zonas */}
          <div
            className="hero-zones flex flex-wrap gap-x-5 gap-y-2 mb-10 opacity-0"
            aria-label="Zonas de operación"
          >
            {zones.map((z) => (
              <span key={z} className="flex items-center gap-1.5 font-sans text-xs text-cream/40">
                <MapPin size={10} className="text-gold/60" aria-hidden="true" />
                {z}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="/venta"
              className="hero-cta opacity-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-obsidian font-sans text-xs font-semibold tracking-[0.12em] uppercase hover:bg-gold/90 active:scale-95 transition-all duration-300 group"
            >
              Ver propiedades
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/#contacto"
              className="hero-cta opacity-0 inline-flex items-center justify-center px-8 py-4 border border-cream/25 text-cream/80 font-sans text-xs font-medium tracking-[0.12em] uppercase hover:border-cream/60 hover:text-cream active:scale-95 transition-all duration-300"
            >
              Contactar
            </Link>
          </div>

          {/* Trust badge */}
          <div className="hero-badge opacity-0 flex items-center gap-3 pt-8 border-t border-cream/10">
            <div className="flex gap-0.5" aria-label="5 estrellas" role="img">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-gold fill-gold" aria-hidden="true" />
              ))}
            </div>
            <p className="font-sans text-xs text-cream/40">
              +100 operaciones concretadas · Zona norte y oeste
            </p>
          </div>

        </div>
      </div>

      {/* ─── FLOATING CARD desktop ────────────────────────────── */}
      <div className="hidden lg:flex absolute bottom-12 right-12 xl:right-20 flex-col items-end z-10">
        <div className="bg-navy/80 backdrop-blur-sm border border-cream/10 p-5 max-w-[240px]">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold mb-2">Destacada</p>
          <p className="font-serif text-cream text-base leading-snug mb-1">Casa en Lagoon Pilar</p>
          <p className="font-sans text-xs text-cream/50 mb-3">4 amb · 320 m² · USD 580,000</p>
          <Link
            href="/venta"
            className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.1em] uppercase text-gold hover:text-gold/70 transition-colors duration-300"
            aria-label="Ver propiedades en venta"
          >
            Ver más <ArrowRight size={10} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
