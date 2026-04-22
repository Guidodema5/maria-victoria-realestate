import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import LogoMV from "@/components/logo/LogoMV";

export const metadata: Metadata = {
  title: "¡Gracias! Te contactamos pronto | María Victoria Real Estate",
  description: "Recibimos tu solicitud de tasación. Te respondemos en menos de 24 horas.",
  robots: { index: false, follow: false }, // noindex para páginas de thank-you
};

export default function VenderGraciasPage() {
  return (
    <main className="min-h-screen bg-navy flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-md">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center bg-gold/15 border border-gold/30">
              <CheckCircle size={40} className="text-gold" strokeWidth={1.2} />
            </div>
          </div>

          {/* Tag */}
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
            Solicitud recibida
          </p>

          {/* Headline */}
          <h1
            className="font-serif text-cream mb-5 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            ¡Gracias por<br />
            <span className="text-gold italic">contactarme!</span>
          </h1>

          {/* Body */}
          <p className="font-sans text-cream/60 text-sm leading-relaxed mb-8">
            Recibí tu solicitud de tasación. Te respondo dentro de las próximas 24 horas con un análisis de mercado de tu propiedad.
          </p>

          {/* What to expect */}
          <div className="bg-white/[0.05] border border-cream/10 p-6 mb-8 text-left space-y-3">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/80 mb-3">
              Próximos pasos
            </p>
            {[
              "Te llamo o escribo por WhatsApp para coordinar la visita",
              "Analizo el mercado y preparo la valoración de tu propiedad",
              "Te presento la estrategia de venta personalizada",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-serif text-gold/60 text-sm leading-tight flex-shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                <p className="font-sans text-sm text-cream/65">{step}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/5491133616566?text=Hola%20Mar%C3%ADa%20Victoria%2C%20acabo%20de%20completar%20el%20formulario%20de%20tasaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-obsidian font-sans text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-gold/90 transition-all duration-300"
            >
              <Phone size={13} />
              Escribir por WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-cream/20 text-cream/70 font-sans text-[11px] tracking-[0.12em] uppercase hover:border-cream/50 hover:text-cream transition-all duration-300"
            >
              Ir al inicio
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-cream/10 py-6 px-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <LogoMV height={50} />
          <p className="font-sans text-[10px] text-cream/25">
            © {new Date().getFullYear()} María Victoria Real Estate
          </p>
        </div>
      </footer>
    </main>
  );
}
