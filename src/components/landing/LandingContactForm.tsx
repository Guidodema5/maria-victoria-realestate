"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { submitContact } from "@/lib/supabase/actions";
import { ZONES } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Teléfono requerido"),
  property_type: z.string().optional(),
  zone: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  variant: "vender" | "comprar";
  redirectTo: string;
}

export default function LandingContactForm({ variant, redirectTo }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    const parts: string[] = [];
    if (data.property_type) parts.push(`Tipo: ${data.property_type}`);
    if (data.zone) parts.push(`Zona: ${data.zone}`);
    if (data.budget) parts.push(`Presupuesto: ${data.budget}`);
    if (data.message) parts.push(data.message);

    const result = await submitContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message:
        parts.length > 0
          ? parts.join(" · ")
          : variant === "vender"
          ? "Solicita tasación — sin datos adicionales"
          : "Consulta compra/inversión — sin datos adicionales",
      intent: variant === "vender" ? "vender-landing" : "comprar-landing",
    });

    if (result.success) {
      router.push(redirectTo);
    } else {
      setServerError(result.error || "Error al enviar. Intentá de nuevo.");
    }
  };

  const inp =
    "w-full bg-white/5 border border-cream/20 focus:border-gold px-4 py-3.5 font-sans text-sm text-cream placeholder-cream/30 outline-none transition-colors duration-300";
  const lbl =
    "font-sans text-[10px] tracking-[0.15em] uppercase text-cream/50 mb-1.5 block";
  const err = "font-sans text-xs text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={lbl}>Nombre *</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Tu nombre completo"
            className={inp}
            autoComplete="name"
          />
          {errors.name && <p className={err}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={lbl}>Teléfono *</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+54 11 xxxx xxxx"
            className={inp}
            autoComplete="tel"
          />
          {errors.phone && <p className={err}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={lbl}>Email *</label>
        <input
          {...register("email")}
          type="email"
          placeholder="tu@email.com"
          className={inp}
          autoComplete="email"
        />
        {errors.email && <p className={err}>{errors.email.message}</p>}
      </div>

      {/* Variant-specific selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {variant === "vender" ? (
          <div>
            <label className={lbl}>Tipo de propiedad</label>
            <select
              {...register("property_type")}
              className={`${inp} appearance-none`}
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <option value="" style={{ background: "#1B2A4A" }}>
                Seleccioná...
              </option>
              {["Casa", "Departamento", "PH", "Lote", "Local", "Otro"].map(
                (t) => (
                  <option key={t} value={t} style={{ background: "#1B2A4A" }}>
                    {t}
                  </option>
                )
              )}
            </select>
          </div>
        ) : (
          <div>
            <label className={lbl}>Presupuesto</label>
            <select
              {...register("budget")}
              className={`${inp} appearance-none`}
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <option value="" style={{ background: "#1B2A4A" }}>
                Seleccioná...
              </option>
              {[
                "Hasta USD 100.000",
                "USD 100.000 – 200.000",
                "USD 200.000 – 400.000",
                "Más de USD 400.000",
                "A definir",
              ].map((b) => (
                <option key={b} value={b} style={{ background: "#1B2A4A" }}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className={lbl}>
            {variant === "vender" ? "Zona" : "Zona preferida"}
          </label>
          <select
            {...register("zone")}
            className={`${inp} appearance-none`}
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <option value="" style={{ background: "#1B2A4A" }}>
              {variant === "comprar" ? "Cualquier zona" : "Seleccioná..."}
            </option>
            {ZONES.map((z) => (
              <option key={z} value={z} style={{ background: "#1B2A4A" }}>
                {z}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={lbl}>
          {variant === "vender"
            ? "Descripción breve (opcional)"
            : "¿Qué estás buscando? (opcional)"}
        </label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder={
            variant === "vender"
              ? "Ej: Casa 3 ambientes con jardín en Parque Leloir..."
              : "Ej: Busco casa con pileta, 3 dormitorios, en country..."
          }
          className={`${inp} resize-none`}
        />
      </div>

      {serverError && <p className={err}>{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-gold text-obsidian font-sans text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-gold/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={14} />
        {isSubmitting
          ? "Enviando..."
          : variant === "vender"
          ? "Solicitar tasación gratuita"
          : "Enviar consulta"}
      </button>

      <p className="font-sans text-[10px] text-cream/25 text-center leading-relaxed">
        Sin spam. Te respondemos en menos de 24 horas.
      </p>
    </form>
  );
}
