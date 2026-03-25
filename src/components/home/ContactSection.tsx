"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import { submitContact } from "@/lib/supabase/actions";
import { getWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const intentOptions = [
  { value: "vender",  label: "Quiero vender mi propiedad" },
  { value: "alquilar_mia", label: "Quiero alquilar mi propiedad" },
  { value: "comprar", label: "Busco una propiedad para comprar" },
  { value: "alquilar", label: "Busco una propiedad para alquilar" },
] as const;

type Intent = typeof intentOptions[number]["value"];

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  intent: z.string().optional(),
  message: z.string().min(10, "Contanos un poco más (mínimo 10 caracteres)"),
});

type FormData = z.infer<typeof schema>;

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<Intent | "">("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".contact-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
    });
  }, { scope: containerRef });

  const handleIntentClick = (val: Intent) => {
    const next = selectedIntent === val ? "" : val;
    setSelectedIntent(next);
    setValue("intent", next);
  };

  const onSubmit = async (data: FormData) => {
    setServerError("");
    const result = await submitContact({ ...data, intent: selectedIntent || undefined });
    if (result.success) {
      setSent(true);
      reset();
      setSelectedIntent("");
    } else {
      setServerError(result.error || "Error al enviar.");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-navy/20 focus:border-navy py-3 font-sans text-sm text-navy placeholder-cool-gray/60 outline-none transition-colors duration-300";

  const labelClass = "font-sans text-[10px] tracking-[0.15em] uppercase text-navy/50 mb-2 block";

  return (
    <section id="contacto" ref={containerRef} className="py-16 md:py-20 bg-cream">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — text */}
          <div className="contact-content space-y-8">
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">
                Contacto
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
              >
                ¿Querés publicar tu propiedad o encontrar la indicada?
              </h2>
            </div>

            <p className="font-sans text-cool-gray text-base leading-relaxed max-w-sm">
              Hablemos. Contame qué necesitás y encontramos juntos la mejor forma de avanzar.
            </p>

            {/* WhatsApp — gold */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-gold text-white font-sans text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors duration-300"
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>

            {/* Zones */}
            <div className="pt-4 border-t border-navy/10">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-3">
                Zonas de operación
              </p>
              <p className="font-sans text-sm text-cool-gray">
                San Diego · Lagoon Pilar · Nordelta · Morón · CABA
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-content">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-16 text-center">
                <CheckCircle size={48} className="text-gold" strokeWidth={1} />
                <div>
                  <p className="font-serif text-2xl text-navy mb-2">¡Mensaje enviado!</p>
                  <p className="font-sans text-sm text-cool-gray">
                    Te contacto a la brevedad. Gracias por tu interés.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="font-sans text-xs tracking-[0.1em] uppercase text-navy/50 hover:text-navy transition-colors duration-300 underline underline-offset-4"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>

                {/* Intent selector */}
                <div>
                  <label className={labelClass}>¿En qué puedo ayudarte?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {intentOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleIntentClick(opt.value)}
                        className={cn(
                          "text-left px-4 py-3 border font-sans text-xs transition-all duration-200",
                          selectedIntent === opt.value
                            ? "border-gold bg-gold/10 text-navy"
                            : "border-navy/15 text-cool-gray hover:border-navy/40"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClass}>Nombre *</label>
                  <input
                    {...register("name")}
                    id="contact-name"
                    type="text"
                    placeholder="Tu nombre completo"
                    className={inputClass}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p role="alert" className="font-sans text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClass}>Email *</label>
                  <input
                    {...register("email")}
                    id="contact-email"
                    type="email"
                    placeholder="tu@email.com"
                    className={inputClass}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p role="alert" className="font-sans text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>Teléfono (opcional)</label>
                  <input
                    {...register("phone")}
                    id="contact-phone"
                    type="tel"
                    placeholder="+54 11 xxxx xxxx"
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClass}>Mensaje *</label>
                  <textarea
                    {...register("message")}
                    id="contact-message"
                    placeholder="Contame en qué puedo ayudarte..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && (
                    <p role="alert" className="font-sans text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                {serverError && (
                  <p className="font-sans text-xs text-red-500">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-3 px-8 py-4 bg-navy text-cream font-sans text-sm tracking-[0.08em] uppercase hover:bg-navy/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : <><Send size={15} /> Enviar mensaje</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
