"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Camera, BarChart2, Eye, Heart } from "lucide-react";
import LogoColdwell from "@/components/logo/LogoColdwell";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const differentials = [
  {
    icon: Camera,
    title: "Dirección fotográfica profesional",
    desc: "Cada propiedad se presenta con criterio estético y dirección de imagen.",
  },
  {
    icon: BarChart2,
    title: "Presentación estratégica",
    desc: "Posicionamiento en portales y redes con enfoque en el resultado.",
  },
  {
    icon: Eye,
    title: "Posicionamiento, no solo publicación",
    desc: "Tu propiedad se destaca por cómo se percibe, no solo por dónde aparece.",
  },
  {
    icon: Heart,
    title: "Acompañamiento cercano",
    desc: "Estoy con vos en cada etapa del proceso, con criterio y discreción.",
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [photoError, setPhotoError] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Image reveal
      gsap.fromTo(
        ".about-image",
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 80%",
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        ".about-text-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-text-block",
            start: "top 75%",
          },
        }
      );

      // Differentials stagger
      gsap.fromTo(
        ".differential-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".differentials-grid",
            start: "top 80%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      id="sobre-mi"
      ref={containerRef}
      className="py-16 md:py-20 bg-cream"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Photo */}
          <div className="about-image relative">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden">
              {photoError ? (
                /* Elegant placeholder when photo not yet uploaded */
                <div className="w-full h-full bg-navy flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-serif text-3xl text-gold">MV</span>
                  </div>
                  <p className="font-sans text-xs text-cream/40 tracking-widest uppercase text-center px-6">
                    María Victoria<br />Real Estate
                  </p>
                </div>
              ) : (
                <Image
                  src="/maria-victoria.jpg"
                  alt="María Victoria — Agente Inmobiliaria"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setPhotoError(true)}
                />
              )}
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/40 hidden md:block" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gold/10 hidden md:block" />
            </div>
          </div>

          {/* Right — Text */}
          <div className="about-text-block space-y-10">
            <div className="space-y-6">
              <p className="about-text-item font-sans text-[10px] tracking-[0.25em] uppercase text-gold">
                Sobre mí
              </p>
              <h2 className="about-text-item font-serif text-navy leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Mi trabajo empieza donde la mayoría termina:{" "}
                <em className="not-italic text-gold">en la mirada.</em>
              </h2>
              <div className="about-text-item space-y-4 text-cool-gray font-sans text-base leading-relaxed">
                <p>
                  Soy María Victoria, especialista en real estate y fotógrafa. Entiendo que hoy, antes de una visita, hay una imagen. Y en ese primer instante se define todo.
                </p>
                <p>
                  Por eso, cada propiedad que trabajo es pensada estratégicamente y presentada con una dirección estética cuidada, donde la luz, los espacios y los detalles construyen una sensación: la de querer estar ahí.
                </p>
                <p>
                  No se trata solo de vender. Se trata de posicionar correctamente un activo. Trabajo con propiedades seleccionadas, acompañando a clientes que buscan algo más que una operación: buscan criterio, discreción y resultados.
                </p>
              </div>
            </div>

            {/* Differentials */}
            <div className="differentials-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentials.map((item) => (
                <div key={item.title} className="differential-item flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30 text-gold">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-navy mb-1">{item.title}</p>
                    <p className="font-sans text-xs text-cool-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coldwell Banker affiliation — al pie */}
            <div className="about-text-item pt-6 border-t border-navy/10 flex items-center gap-4">
              <div className="flex-shrink-0 bg-navy px-3 py-2 flex items-center justify-center rounded-sm">
                <LogoColdwell height={28} />
              </div>
              <span className="font-sans text-xs text-cool-gray leading-snug">
                Asociada a<br />
                <strong className="text-navy font-medium">Coldwell Banker Wings</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
